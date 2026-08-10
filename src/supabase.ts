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
