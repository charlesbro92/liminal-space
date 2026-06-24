-- ============================================================
-- LIMINAL SPACE — Zalo ZNS 자동발송용 토큰 저장 테이블
-- (Supabase SQL Editor에서 1회 실행)
-- ------------------------------------------------------------
-- Zalo OA access_token은 짧게 만료(약 1시간)되고, refresh_token은
-- 갱신할 때마다 새 값으로 "회전(rotate)"됩니다. 그래서 토큰을
-- DB에 보관하고 Edge Function이 만료 직전 자동 갱신·저장합니다.
-- ============================================================

create table if not exists public.zalo_token (
  id          int primary key default 1,         -- 항상 단일 행(1)만 사용
  access_token  text,
  refresh_token text,
  expires_at    timestamptz,                       -- access_token 만료 시각
  updated_at    timestamptz default now()
);

-- 단일 행 보장(없으면 빈 행 생성)
insert into public.zalo_token (id) values (1)
on conflict (id) do nothing;

-- RLS: anon은 접근 불가(토큰은 Edge Function의 service_role로만 접근)
alter table public.zalo_token enable row level security;
-- (정책을 만들지 않으면 anon/auth 모두 차단됨. service_role은 RLS 우회.)

-- ------------------------------------------------------------
-- 최초 1회: 잘로에서 발급받은 refresh_token을 여기에 넣어 주세요.
-- (access_token은 비워둬도 Edge Function이 첫 실행 때 자동 발급)
--   update public.zalo_token
--     set refresh_token = '여기에_최초_refresh_token',
--         expires_at = now()        -- 즉시 갱신을 유도
--   where id = 1;
-- ------------------------------------------------------------

-- (선택) 발송 로그 테이블 — 성공/실패 추적용
create table if not exists public.zalo_log (
  id          bigint generated always as identity primary key,
  created_at  timestamptz default now(),
  app_id      bigint,                              -- applications.id
  phone       text,
  ok          boolean,
  detail      text                                 -- 응답/에러 요약
);
alter table public.zalo_log enable row level security;
