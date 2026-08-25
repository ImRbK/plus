alter table public.check_ins
  add column if not exists coach_feedback text,
  add column if not exists reviewed_at timestamptz;

create index if not exists check_ins_reviewed_at_idx
  on public.check_ins (reviewed_at);
