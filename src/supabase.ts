const SUPABASE_URL = 'https://hopluplbpywekkvzvmyu.supabase.co'
const SUPABASE_KEY = 'sb_publishable_ElMRU2w_cduTLyftuwOHLA_3tK24vlt'

export type Session = {
  access_token: string
  refresh_token?: string
  user: { id: string; email?: string }
}

const SESSION_KEY = 'massa_plus_session'

export function getSession(): Session | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function setSession(session: Session | null) {
  if (session) localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  else localStorage.removeItem(SESSION_KEY)
}

async function request(path: string, options: RequestInit = {}, token?: string) {
  const headers = new Headers(options.headers)
  headers.set('apikey', SUPABASE_KEY)
  headers.set('Content-Type', 'application/json')
  if (token) headers.set('Authorization', `Bearer ${token}`)
  const response = await fetch(`${SUPABASE_URL}${path}`, { ...options, headers })
  const text = await response.text()
  let data: any = null
  try { data = text ? JSON.parse(text) : null } catch { data = text }
  if (!response.ok) {
    const message = data?.msg || data?.message || data?.error_description || data?.error || 'Erro de comunicação com o Supabase.'
    throw new Error(message)
  }
  return data
}

export async function signIn(email: string, password: string): Promise<Session> {
  const data = await request('/auth/v1/token?grant_type=password', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
  const session: Session = {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    user: { id: data.user.id, email: data.user.email },
  }
  setSession(session)
  return session
}


export async function createClientViaFunction(token: string, profile: {
  email: string
  password: string
  full_name: string
  initial_weight?: number | null
  current_weight?: number | null
  height?: number | null
  goal_weight?: number | null
  goal?: string | null
  start_date?: string | null
}) {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/create-client`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(profile),
  })
  const text = await response.text()
  let data: any = null
  try { data = text ? JSON.parse(text) : null } catch { data = text }
  if (!response.ok) {
    throw new Error(data?.error || data?.message || 'Não foi possível criar o cliente.')
  }
  return data
}

export async function createClientProfile(token: string, profile: {
  id: string
  full_name: string
  email: string
  initial_weight?: number | null
  current_weight?: number | null
  height?: number | null
  goal_weight?: number | null
  goal?: string | null
  start_date?: string | null
}) {
  const rows = await request('/rest/v1/clients', {
    method: 'POST',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify(profile),
  }, token)
  return rows?.[0] ?? null
}

export async function deleteClientProfile(token: string, clientId: string) {
  await request(`/rest/v1/clients?id=eq.${encodeURIComponent(clientId)}`, {
    method: 'DELETE',
  }, token)
}

export function signOut() {
  setSession(null)
}

export async function isAdmin(token: string) {
  return Boolean(await request('/rest/v1/rpc/is_admin', { method: 'POST', body: '{}' }, token))
}

export async function getOwnClient(token: string, userId: string) {
  const rows = await request(`/rest/v1/clients?id=eq.${encodeURIComponent(userId)}&select=*`, { method: 'GET' }, token)
  return rows?.[0] ?? null
}

export async function getAllClients(token: string) {
  return await request('/rest/v1/clients?select=*&order=created_at.desc', { method: 'GET' }, token)
}

export async function getWeightProgress(token: string, clientId: string) {
  return await request(`/rest/v1/weight_progress?client_id=eq.${encodeURIComponent(clientId)}&select=*&order=recorded_at.asc`, { method: 'GET' }, token)
}


export async function updateClientProfile(token: string, clientId: string, profile: Record<string, any>) {
  const rows = await request(`/rest/v1/clients?id=eq.${encodeURIComponent(clientId)}`, {
    method: 'PATCH',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify(profile),
  }, token)
  return rows?.[0] ?? null
}

export async function getClientWorkouts(token: string, clientId: string) {
  return await request(`/rest/v1/workout_plans?client_id=eq.${encodeURIComponent(clientId)}&select=*&order=created_at.asc`, {method:'GET'}, token)
}
export async function getWorkoutExercises(token: string, workoutId: number) {
  return await request(`/rest/v1/exercises?workout_id=eq.${workoutId}&select=*&order=exercise_order.asc,id.asc`, {method:'GET'}, token)
}
export async function createWorkout(token: string, data: any) {
  const rows = await request('/rest/v1/workout_plans', {method:'POST',headers:{Prefer:'return=representation'},body:JSON.stringify(data)}, token)
  return rows?.[0] ?? null
}
export async function deleteWorkout(token: string, id: number) {
  await request(`/rest/v1/workout_plans?id=eq.${id}`, {method:'DELETE'}, token)
}
export async function createExercise(token: string, data: any) {
  const rows = await request('/rest/v1/exercises', {method:'POST',headers:{Prefer:'return=representation'},body:JSON.stringify(data)}, token)
  return rows?.[0] ?? null
}
export async function deleteExercise(token: string, id: number) {
  await request(`/rest/v1/exercises?id=eq.${id}`, {method:'DELETE'}, token)
}

export async function getNutritionPlans(token: string, clientId: string) {
  return await request(`/rest/v1/nutrition_plans?client_id=eq.${encodeURIComponent(clientId)}&select=*&order=created_at.asc`, {method:'GET'}, token)
}
export async function getMeals(token: string, planId: number) {
  return await request(`/rest/v1/meals?nutrition_plan_id=eq.${planId}&select=*&order=meal_order.asc,id.asc`, {method:'GET'}, token)
}
export async function createNutritionPlan(token: string, data: any) {
  const rows = await request('/rest/v1/nutrition_plans', {method:'POST',headers:{Prefer:'return=representation'},body:JSON.stringify(data)}, token)
  return rows?.[0] ?? null
}
export async function deleteNutritionPlan(token: string, id: number) {
  await request(`/rest/v1/nutrition_plans?id=eq.${id}`, {method:'DELETE'}, token)
}
export async function createMeal(token: string, data: any) {
  const rows = await request('/rest/v1/meals', {method:'POST',headers:{Prefer:'return=representation'},body:JSON.stringify(data)}, token)
  return rows?.[0] ?? null
}
export async function deleteMeal(token: string, id: number) {
  await request(`/rest/v1/meals?id=eq.${id}`, {method:'DELETE'}, token)
}

export async function addWeightProgress(token: string, data: any) {
  const rows = await request('/rest/v1/weight_progress', {method:'POST',headers:{Prefer:'return=representation'},body:JSON.stringify(data)}, token)
  return rows?.[0] ?? null
}
export async function deleteWeightProgress(token: string, id: number) {
  await request(`/rest/v1/weight_progress?id=eq.${id}`, {method:'DELETE'}, token)
}

export async function getCheckIns(token: string, clientId: string) {
  return await request(`/rest/v1/check_ins?client_id=eq.${encodeURIComponent(clientId)}&select=*&order=created_at.desc`, {method:'GET'}, token)
}
export async function createCheckIn(token: string, data: any) {
  const rows = await request('/rest/v1/check_ins', {method:'POST',headers:{Prefer:'return=representation'},body:JSON.stringify(data)}, token)
  return rows?.[0] ?? null
}
export async function deleteCheckIn(token: string, id: number) {
  await request(`/rest/v1/check_ins?id=eq.${id}`, {method:'DELETE'}, token)
}
