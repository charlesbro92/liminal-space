# 잘로(Zalo) 신청완료 자동발송 설정 가이드

신청이 접수되면 신청자에게 **잘로 ZNS(Zalo Notification Service)**로 예약완료 메시지를 자동 발송합니다.
구성: `applications` INSERT → **Supabase Database Webhook** → **Edge Function `zalo-notify`** → 잘로 ZNS API.

> ZNS는 거래성(예약확인·일정안내) 알림 채널입니다. 광고/홍보 문구는 금지이고, **사전 승인된 템플릿**만 보낼 수 있으며, 건당 약 **300동(≈16원)**이 과금됩니다. 보내려면 **잘로 OA 사업자 인증**이 필요하고, 수신자는 그 번호로 잘로를 쓰는 사용자여야 합니다.

---

## A. 잘로 쪽 준비 (사장님 계정으로 진행 — 심사 필요)

1. **잘로 OA 개설 & 사업자/브랜드 인증**
   - https://oa.zalo.me 에서 Official Account 생성 → 사업자 인증(Verified).
2. **개발자 앱 연결**
   - https://developers.zalo.me 에서 앱 생성 → 위 OA 연결.
   - **App ID**, **App Secret(secret_key)** 확보.
3. **ZNS "예약확인" 템플릿 작성 → 승인 요청**
   - OA 콘솔의 ZNS 메뉴에서 템플릿 생성. 파라미터(치환값)를 정의합니다.
   - 본 함수 기본 파라미터: `name`, `class`, `branch`, `date`, `time`, `people`
     (템플릿 파라미터 이름을 이와 다르게 만들면, Edge Function의 `template_data` key를 거기에 맞춰 수정)
   - 승인까지 보통 1~2일.
4. **ZNS 잔액 충전** (건당 과금).
5. **최초 refresh_token 발급**
   - 개발자 콘솔의 OAuth 절차(권한 동의 → authorization code → access/refresh token 교환)로
     **refresh_token**을 1회 발급받습니다. (이후 갱신은 함수가 자동 처리·회전 저장)

## B. Supabase 준비

1. **SQL 실행** — `supabase/sql/zalo_token.sql` 를 SQL Editor에서 1회 실행
   (토큰 보관 테이블 `zalo_token`, 로그 테이블 `zalo_log` 생성).
2. **최초 refresh_token 입력**
   ```sql
   update public.zalo_token
     set refresh_token = '발급받은_refresh_token', expires_at = now()
   where id = 1;
   ```
3. **Edge Function 배포** (로컬에 Supabase CLI 설치 후)
   ```bash
   supabase functions deploy zalo-notify --project-ref <프로젝트참조>
   ```
4. **시크릿 등록** (코드에 직접 넣지 말 것)
   ```bash
   supabase secrets set \
     ZALO_APP_ID=... \
     ZALO_APP_SECRET=... \
     ZALO_TEMPLATE_ID=... \
     WEBHOOK_SECRET=$(openssl rand -hex 16)
   ```
   (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`는 런타임이 자동 주입)
5. **Database Webhook 연결**
   - Dashboard → Database → Webhooks → Create
   - Table: `applications`, Events: **Insert**
   - Type: **HTTP Request**, Method: POST
   - URL: `https://<프로젝트>.functions.supabase.co/zalo-notify`
   - HTTP Headers에 `x-webhook-secret: <위 WEBHOOK_SECRET와 동일값>` 추가

## C. 테스트
- 사이트에서 실제 번호로 신청 → 잘로 메시지 수신 확인.
- 실패 시 `zalo_log` 테이블의 `detail`에 잘로 응답/에러가 남습니다.
  - `error -124` 류: access_token 문제 → refresh_token 재확인
  - 전화번호 형식: `+84 …` 로 저장되며 함수가 `84…`로 정규화합니다(베트남 번호 가정).

## 비용 요약
- ZNS 발송 건당 약 300동(≈16원). 템플릿 구성(버튼/이미지 등)에 따라 변동.

## 참고 링크
- 잘로 OA ZNS 안내: https://oa.zalo.me/home/documents/guides/zalo-notification-service_9187280180949502968
- 잘로 개발자 문서: https://developers.zalo.me/docs
- ZNS 템플릿 생성 API: https://developers.zalo.me/docs/zalo-notification-service/quan-ly-tai-san/tao-template
