-- LIMINAL SPACE — 정규화 스키마 (전체 테이블화)
-- Supabase 대시보드 → SQL Editor 에 붙여넣고 실행하세요.
-- 다국어 필드는 _ko/_en/_vi 로 평면화. 지점/클래스는 안정 text ID(PK)를 사용하고 신청은 그 ID를 참조합니다.

-- [정리] 이전 버전 테이블 제거 (신청 컬럼 구조가 바뀌었으므로 한 번 비웁니다)
--  ※ 테스트 데이터만 있을 때 안전. 실데이터가 쌓였다면 먼저 백업하세요.
drop table if exists public.applications cascade;
drop table if exists public.kv cascade;

-- 지점
create table if not exists public.branches (
  id text primary key,
  name text not null,
  contact text default '',
  link text default '',
  location_ko text default '', location_en text default '', location_vi text default '',
  hours_ko text default '', hours_en text default '', hours_vi text default '',
  instagram text default '', facebook text default '', linktree text default '',
  sort int default 0
);
-- (이미 branches가 있는 경우 대비) 운영시간·링크트리·지점명 다국어 컬럼 보강
alter table public.branches add column if not exists linktree text default '';
alter table public.branches add column if not exists name_en text default '';
alter table public.branches add column if not exists name_vi text default '';
alter table public.branches add column if not exists hours_ko text default '';
alter table public.branches add column if not exists hours_en text default '';
alter table public.branches add column if not exists hours_vi text default '';

-- 사이트 정보 (브랜드명 · EST 연도 · 저작권 연도) 단일 행
create table if not exists public.site_info (
  id text primary key,
  brand_name text default 'LIMINAL SPACE',
  est_year text default '',
  copyright_year text default '',
  gallery_json text default '[]',
  partners_json text default '[]',
  galleryfolders_json text default '[]'
);
-- 기존 site_info에 갤러리·협업·폴더 JSON 컬럼 보강
alter table public.site_info add column if not exists gallery_json text default '[]';
alter table public.site_info add column if not exists partners_json text default '[]';
alter table public.site_info add column if not exists galleryfolders_json text default '[]';
alter table public.site_info add column if not exists space_json text default '[]';
alter table public.site_info add column if not exists spacefolders_json text default '[]';
-- 베트남 전자상거래(Decree 52/2013·85/2021) 푸터 표시용 사업자 정보 + Bộ Công Thương 신고 뱃지
alter table public.site_info add column if not exists biz_name text default '';
alter table public.site_info add column if not exists biz_address text default '';
alter table public.site_info add column if not exists biz_tax text default '';
alter table public.site_info add column if not exists biz_phone text default '';
alter table public.site_info add column if not exists biz_email text default '';
alter table public.site_info add column if not exists moit_url text default '';
alter table public.site_info add column if not exists moit_logo text default '';

-- 클래스 (지점별)
create table if not exists public.classes (
  id text primary key,
  branch_id text references public.branches(id) on delete cascade,
  sort int default 0,
  name_ko text default '', name_en text default '', name_vi text default '',
  desc_ko text default '', desc_en text default '', desc_vi text default '',
  active boolean not null default true,
  inquiry_only boolean not null default false
);
create index if not exists classes_branch_idx on public.classes(branch_id);
-- 기존 classes에 문의전용 컬럼 보강
alter table public.classes add column if not exists inquiry_only boolean not null default false;

-- 상세설정 (용량·가격·상세설명)
create table if not exists public.class_details (
  id text primary key,
  branch_id text references public.branches(id) on delete cascade,
  class_id text references public.classes(id) on delete cascade,
  volume int,
  price_krw text default '', price_vnd text default '', price_usd text default '',
  disc_type text default 'none', disc_val text default '',
  detail_ko text default '', detail_en text default '', detail_vi text default ''
);
create index if not exists class_details_class_idx on public.class_details(class_id);
-- 기존 테이블에 할인 컬럼 추가(이미 운영 중인 DB 대응)
alter table public.class_details add column if not exists disc_type text default 'none';
alter table public.class_details add column if not exists disc_val text default '';

-- 기본값 시간대 (지점별 하루치)
create table if not exists public.default_slots (
  id text primary key,
  branch_id text references public.branches(id) on delete cascade,
  class_id text references public.classes(id) on delete set null,
  time text,
  cap int default 0,
  sort int default 0
);
create index if not exists default_slots_branch_idx on public.default_slots(branch_id);

-- 날짜별 시간대 (개별 설정/휴무)
create table if not exists public.schedule_slots (
  id text primary key,
  branch_id text references public.branches(id) on delete cascade,
  sched_date text not null,
  class_id text references public.classes(id) on delete set null,
  time text,
  cap int default 0
);
create index if not exists schedule_slots_bd_idx on public.schedule_slots(branch_id, sched_date);

-- 휴무(설정됐지만 시간대 0개)인 날짜 기록용
create table if not exists public.schedule_days (
  branch_id text references public.branches(id) on delete cascade,
  sched_date text not null,
  primary key (branch_id, sched_date)
);

-- 신청 (지점/클래스를 ID로 참조)
create table if not exists public.applications (
  id bigint primary key,
  created_at timestamptz not null default now(),
  branch_id text references public.branches(id) on delete set null,
  class_id text references public.classes(id) on delete set null,
  size text,
  want_date text,
  want_time text,
  people text,
  name text, phone text, email text, nationality text, msg text,
  sns_facebook text default '', sns_instagram text default '',
  status text not null default 'new'
);
create index if not exists applications_date_idx on public.applications(want_date);
-- 기존 applications에 SNS 컬럼 보강
alter table public.applications add column if not exists sns_facebook text default '';
alter table public.applications add column if not exists sns_instagram text default '';
-- 결제(예정)금액 + 예약금(예약금 로직은 추후 — 컬럼만 미리 둠)
alter table public.applications add column if not exists amount text default '';
alter table public.applications add column if not exists deposit text default '';
create index if not exists applications_branch_idx on public.applications(branch_id);

-- RLS (공개 데모/간단 비밀번호 모드: anon 읽기·쓰기 허용)
do $$
declare t text;
begin
  foreach t in array array['branches','classes','class_details','default_slots','schedule_slots','schedule_days','applications','site_info']
  loop
    execute format('alter table public.%I enable row level security;', t);
    execute format('drop policy if exists %I_all on public.%I;', t, t);
    execute format('create policy %I_all on public.%I for all using (true) with check (true);', t, t);
  end loop;
end $$;
