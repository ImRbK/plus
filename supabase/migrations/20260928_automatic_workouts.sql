-- Run once in the Supabase SQL Editor before publishing the frontend.
-- Existing tables and RLS remain in place. No existing rows are modified.
begin;
alter table public.workout_plans add column if not exists generation_request_id uuid;
alter table public.workout_plans add column if not exists generation_fingerprint text;
alter table public.workout_plans add column if not exists generation_day smallint;
create unique index if not exists workout_generation_request_day
  on public.workout_plans(client_id,generation_request_id,generation_day)
  where generation_request_id is not null;
create unique index if not exists workout_generation_content_day
  on public.workout_plans(client_id,generation_fingerprint,generation_day)
  where generation_fingerprint is not null;

create or replace function public.save_generated_workouts(p_client_id uuid,p_request_id uuid,p_plan jsonb)
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare
  w jsonb; e jsonb; w_id public.workout_plans.id%type;
  ids jsonb := '[]'::jsonb; fingerprint text; day_index integer := 0;
  exercise_index integer; previous_fingerprint text; existing_count integer;
begin
  if auth.uid() is null or not coalesce(public.is_admin(),false) then
    raise exception 'Apenas administradores podem gerar treinos.' using errcode='42501';
  end if;
  if p_client_id is null or p_request_id is null then raise exception 'Cliente e identificador obrigatórios.'; end if;
  if jsonb_typeof(p_plan) is distinct from 'array' then raise exception 'Plano inválido.'; end if;
  if jsonb_array_length(p_plan) not between 1 and 6 then raise exception 'Escolhe 1 a 6 sessões.'; end if;
  if not exists(select 1 from public.clients where id=p_client_id) then raise exception 'Cliente não encontrado ou sem acesso.'; end if;
  -- Serialize submissions for this client, including simultaneous browser tabs.
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_client_id::text, 9282026));
  fingerprint := pg_catalog.md5(p_plan::text);
  select generation_fingerprint into previous_fingerprint from public.workout_plans
    where client_id=p_client_id and generation_request_id=p_request_id limit 1;
  if found and previous_fingerprint is distinct from fingerprint then
    raise exception 'Este identificador já foi usado para outro plano. Reabre o gerador.';
  end if;
  select count(*),coalesce(jsonb_agg(id order by generation_day),'[]'::jsonb) into existing_count,ids
    from public.workout_plans where client_id=p_client_id
    and (generation_request_id=p_request_id or generation_fingerprint=fingerprint);
  if existing_count>0 then
    if existing_count<>jsonb_array_length(p_plan) then
      raise exception 'Este plano já foi guardado e parcialmente removido. Revê os treinos existentes antes de gerar uma nova proposta.';
    end if;
    return jsonb_build_object('duplicate',true,'workout_ids',ids);
  end if;
  ids := '[]'::jsonb;
  for w in select value from jsonb_array_elements(p_plan) loop
    if jsonb_typeof(w) is distinct from 'object'
      or coalesce(length(trim(w->>'name')),0) not between 1 and 160
      or coalesce(length(w->>'description'),0)>4000 then raise exception 'Nome ou descrição de sessão inválidos.'; end if;
    if jsonb_typeof(w->'exercises') is distinct from 'array' then raise exception 'Exercícios inválidos.'; end if;
    if jsonb_array_length(w->'exercises') not between 1 and 12 then raise exception 'Cada sessão precisa de 1 a 12 exercícios.'; end if;
    insert into public.workout_plans(client_id,name,description,generation_request_id,generation_fingerprint,generation_day)
      values(p_client_id,trim(w->>'name'),w->>'description',p_request_id,fingerprint,day_index)
      returning id into w_id;
    ids := ids || jsonb_build_array(w_id);
    exercise_index := 0;
    for e in select value from jsonb_array_elements(w->'exercises') loop
      if jsonb_typeof(e) is distinct from 'object'
        or coalesce(length(trim(e->>'name')),0) not between 1 and 160
        or coalesce(e->>'sets','') !~ '^[1-8]$'
        or coalesce(length(trim(e->>'reps')),0) not between 1 and 40
        or coalesce(e->>'rest_seconds','') !~ '^[0-9]{2,3}$'
        or coalesce(length(e->>'notes'),0)>2100 then raise exception 'Exercício inválido.'; end if;
      if (e->>'rest_seconds')::integer not between 30 and 300 then raise exception 'Descanso inválido.'; end if;
      insert into public.exercises(workout_id,name,sets,reps,rest_seconds,notes,exercise_order)
        values(w_id,trim(e->>'name'),(e->>'sets')::integer,trim(e->>'reps'),(e->>'rest_seconds')::integer,e->>'notes',exercise_index);
      exercise_index := exercise_index+1;
    end loop;
    day_index := day_index+1;
  end loop;
  return jsonb_build_object('duplicate',false,'workout_ids',ids);
end;
$$;
revoke all on function public.save_generated_workouts(uuid,uuid,jsonb) from public, anon;
grant execute on function public.save_generated_workouts(uuid,uuid,jsonb) to authenticated;
notify pgrst, 'reload schema';
commit;
