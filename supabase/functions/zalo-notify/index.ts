// ============================================================
// LIMINAL SPACE — Zalo ZNS 신청완료 자동발송 (Supabase Edge Function)
// ------------------------------------------------------------
// 트리거: applications 테이블 INSERT (Supabase Database Webhook)
// 동작:  웹훅 수신 → OA 토큰 확보(만료 시 자동 갱신·저장)
//        → 전화번호 84… 정규화 → 클래스/지점명 조회 → ZNS 템플릿 발송
//
// 필요한 시크릿 (supabase secrets set 으로 등록, 코드에 직접 넣지 말 것):
//   ZALO_APP_ID         잘로 앱 ID
//   ZALO_APP_SECRET     잘로 앱 시크릿(secret_key)
//   ZALO_TEMPLATE_ID    승인된 ZNS 템플릿 ID
//   WEBHOOK_SECRET      (선택) 웹훅 위변조 방지용 공유 비밀값
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY  ← Edge 런타임이 자동 주입
// ============================================================

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL  = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY   = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const APP_ID        = Deno.env.get("ZALO_APP_ID")!;
const APP_SECRET    = Deno.env.get("ZALO_APP_SECRET")!;
const TEMPLATE_ID   = Deno.env.get("ZALO_TEMPLATE_ID")!;
const WEBHOOK_SECRET = Deno.env.get("WEBHOOK_SECRET") || "";

const db = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

// ---- 베트남 전화번호 정규화: "+84 0912.." / "0912.." / "912.." → "84912.." ----
function normVNPhone(raw: string): string {
  let d = (raw || "").replace(/[^0-9]/g, "");
  if (d.startsWith("840")) d = "84" + d.slice(3);     // 84 + 0… → 0 제거
  else if (d.startsWith("84")) { /* 그대로 */ }
  else if (d.startsWith("0")) d = "84" + d.slice(1);   // 국내표기 0 제거
  else d = "84" + d;                                    // 국가번호 없는 순수 번호
  return d;
}

// ---- OA access_token 확보(만료 2분 전이면 refresh) ----
async function getAccessToken(): Promise<string> {
  const { data: row } = await db.from("zalo_token").select("*").eq("id", 1).single();
  const now = Date.now();
  const exp = row?.expires_at ? new Date(row.expires_at).getTime() : 0;

  if (row?.access_token && exp > now + 120_000) return row.access_token; // 아직 유효

  // refresh_token으로 새 토큰 발급
  if (!row?.refresh_token) throw new Error("zalo_token.refresh_token 없음 — 최초 refresh_token을 DB에 넣어주세요.");
  const body = new URLSearchParams({
    refresh_token: row.refresh_token,
    app_id: APP_ID,
    grant_type: "refresh_token",
  });
  const r = await fetch("https://oauth.zaloapp.com/v4/oa/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", secret_key: APP_SECRET },
    body,
  });
  const j = await r.json();
  if (!j.access_token) throw new Error("토큰 갱신 실패: " + JSON.stringify(j));

  // 새 토큰 저장(refresh_token은 회전되므로 반드시 갱신 저장)
  const newExp = new Date(now + (Number(j.expires_in) || 3600) * 1000).toISOString();
  await db.from("zalo_token").update({
    access_token: j.access_token,
    refresh_token: j.refresh_token || row.refresh_token,
    expires_at: newExp,
    updated_at: new Date().toISOString(),
  }).eq("id", 1);

  return j.access_token;
}

// ---- 이름 조회(클래스/지점) ----
async function lookupName(table: string, id: string | null): Promise<string> {
  if (!id) return "";
  const { data } = await db.from(table).select("name").eq("id", id).single();
  return data?.name || "";
}

async function log(app_id: number, phone: string, ok: boolean, detail: string) {
  try { await db.from("zalo_log").insert({ app_id, phone, ok, detail: detail.slice(0, 500) }); } catch (_) { /* noop */ }
}

Deno.serve(async (req) => {
  // 웹훅 비밀값 검증(설정한 경우)
  if (WEBHOOK_SECRET && req.headers.get("x-webhook-secret") !== WEBHOOK_SECRET) {
    return new Response("forbidden", { status: 403 });
  }

  let payload: any;
  try { payload = await req.json(); } catch { return new Response("bad json", { status: 400 }); }

  // Supabase DB Webhook 형식: { type:"INSERT", table:"applications", record:{...} }
  const rec = payload?.record;
  if (payload?.type !== "INSERT" || !rec) return new Response("ignored", { status: 200 });

  try {
    const phone = normVNPhone(rec.phone || "");
    if (phone.length < 9) { await log(rec.id, phone, false, "전화번호 없음/형식 오류"); return new Response("no phone", { status: 200 }); }

    const className  = await lookupName("classes", rec.class_id);
    const branchName = await lookupName("branches", rec.branch_id);

    const token = await getAccessToken();

    // ⚠️ template_data의 key는 승인된 ZNS 템플릿의 파라미터 이름과 정확히 일치해야 합니다.
    //    아래는 예시(name/class/date/time/people/branch). 템플릿에 맞게 조정하세요.
    const template_data: Record<string, string> = {
      name: rec.name || "",
      class: className,
      branch: branchName,
      date: rec.want_date || "",
      time: rec.want_time || "",
      people: String(rec.people || "1"),
    };

    const r = await fetch("https://business.openapi.zalo.me/message/template", {
      method: "POST",
      headers: { "Content-Type": "application/json", access_token: token },
      body: JSON.stringify({ phone, template_id: TEMPLATE_ID, template_data, tracking_id: String(rec.id) }),
    });
    const j = await r.json();
    const ok = j?.error === 0;
    await log(rec.id, phone, ok, JSON.stringify(j));
    return new Response(JSON.stringify({ ok, zalo: j }), {
      status: 200, headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    await log(rec?.id, rec?.phone || "", false, String(e));
    return new Response(JSON.stringify({ ok: false, error: String(e) }), {
      status: 200, headers: { "Content-Type": "application/json" },
    });
  }
});
