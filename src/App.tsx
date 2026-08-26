import { useState, useEffect, useCallback } from 'react'
import {
  P01_Cover, P02_Copyright, P03_AboutAuthor, P04_TOC,
  P05_ChapterDivider, P06_MuscleGrowth, P07_Calories, P08_Macros,
  P09_Protein, P10_Carbs, P11_Fats, P12_MealBuilding,
  P13_GroceryList, P14_FoodsEat, P15_FoodsAvoid, P16_MealPlan,
  P17_Shakes, P18_TrainingDivider, P19_WorkoutFundamentals,
  P20_ProgressiveOverload, P21_WorkoutProgram, P22_Technique,
  P23_Recovery, P24_Sleep, P25_Supplements, P26_FAQ,
  P27_Mistakes, P28_TransformationPlan, P29_ProgressTracker,
  P30_WorkoutLog, P31_GroceryChecklist, P32_HabitTracker,
  P33_WeeklyPlanner, P34_BeforeAfter, P35_ActionPlan,
  P36_ThankYou, P37_QRCode,
} from './ebook/pages'
import {
  P38_FatLossDivider, P39_FatLossFoundations, P40_CalorieDeficit,
  P41_FatLossMacros, P42_CuttingMealPlan, P43_TrainingAndCardio,
  P44_Plateaus, P45_FatLossPlan,
} from './ebook/lossPages'
import { getSession, setSession, signIn, signOut, refreshSession, isAdmin, getOwnClient, getAllClients, getWeightProgress, createClientViaFunction, deleteClientProfile, updateClientProfile, uploadBeforePhoto, getClientWorkouts, getWorkoutExercises, createWorkout, updateWorkout, deleteWorkout, createExercise, deleteExercise, getWorkoutSessions, createWorkoutSession, createExerciseLogs, getCoachNotes, createCoachNote, deleteCoachNote, getClientTasks, createClientTask, updateClientTask, deleteClientTask, getMonthlyAssessments, createMonthlyAssessment, updateMonthlyAssessment, deleteMonthlyAssessment, uploadAssessmentPhoto, getSupplements, createSupplement, updateSupplement, deleteSupplement, getClientIntake, saveClientIntake, reviewClientIntake, getNutritionPlans, getMeals, createNutritionPlan, deleteNutritionPlan, createMeal, deleteMeal, addWeightProgress, deleteWeightProgress, getCheckIns, createCheckIn, deleteCheckIn, updateCheckIn, type Session } from './supabase'

const PAGES = [
  { component: P01_Cover, title: 'Capa' }, { component: P02_Copyright, title: 'Direitos de Autor' },
  { component: P03_AboutAuthor, title: 'Sobre o Autor' }, { component: P04_TOC, title: 'Índice' },
  { component: P05_ChapterDivider, title: 'Divisor — Cap. 1' }, { component: P06_MuscleGrowth, title: 'Crescimento Muscular' },
  { component: P07_Calories, title: 'Calorias' }, { component: P08_Macros, title: 'Macronutrientes' },
  { component: P09_Protein, title: 'Guia de Proteína' }, { component: P10_Carbs, title: 'Hidratos de Carbono' },
  { component: P11_Fats, title: 'Gorduras Alimentares' }, { component: P12_MealBuilding, title: 'Construção de Refeições' },
  { component: P13_GroceryList, title: 'Lista de Compras' }, { component: P14_FoodsEat, title: 'Alimentos a Consumir' },
  { component: P15_FoodsAvoid, title: 'Alimentos a Evitar' }, { component: P16_MealPlan, title: 'Plano Alimentar' },
  { component: P17_Shakes, title: 'Batidos Hipercalóricos' }, { component: P18_TrainingDivider, title: 'Divisor — Treino' },
  { component: P19_WorkoutFundamentals, title: 'Fundamentos do Treino' }, { component: P20_ProgressiveOverload, title: 'Sobrecarga Progressiva' },
  { component: P21_WorkoutProgram, title: 'Programa de 4 Dias' }, { component: P22_Technique, title: 'Técnica de Exercício' },
  { component: P23_Recovery, title: 'Recuperação' }, { component: P24_Sleep, title: 'Sono' },
  { component: P25_Supplements, title: 'Suplementos' }, { component: P26_FAQ, title: 'Perguntas Frequentes' },
  { component: P27_Mistakes, title: 'Erros Comuns' }, { component: P28_TransformationPlan, title: 'Plano de 12 Semanas' },
  { component: P29_ProgressTracker, title: 'Registo de Progresso' }, { component: P30_WorkoutLog, title: 'Diário de Treino' },
  { component: P31_GroceryChecklist, title: 'Lista de Compras Imprimível' }, { component: P32_HabitTracker, title: 'Registo de Hábitos' },
  { component: P33_WeeklyPlanner, title: 'Planeador Semanal' }, { component: P34_BeforeAfter, title: 'Antes e Depois' },
  { component: P35_ActionPlan, title: 'Plano de Ação Final' },
  { component: P38_FatLossDivider, title: 'Perda de Gordura' },
  { component: P39_FatLossFoundations, title: 'Fundamentos da Perda de Gordura' },
  { component: P40_CalorieDeficit, title: 'Défice Calórico' },
  { component: P41_FatLossMacros, title: 'Macros e Saciedade' },
  { component: P42_CuttingMealPlan, title: 'Plano Alimentar de Definição' },
  { component: P43_TrainingAndCardio, title: 'Treino, Passos e Cardio' },
  { component: P44_Plateaus, title: 'Plateaus e Ajustes' },
  { component: P45_FatLossPlan, title: 'Plano de 12 Semanas — Definição' },
  { component: P36_ThankYou, title: 'Obrigado' },
  { component: P37_QRCode, title: 'Código QR / Coaching' },
]

const SUPABASE_FUNCTION_URL = 'https://hopluplbpywekkvzvmyu.supabase.co/functions/v1'
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_ElMRU2w_cduTLyftuwOHLA_3tK24vlt'

async function updateClientEmailViaFunction(token: string, userId: string, email: string) {
  const response = await fetch(`${SUPABASE_FUNCTION_URL}/update-client-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_PUBLISHABLE_KEY,
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      user_id: userId,
      email: email.trim(),
    }),
  })

  const text = await response.text()
  let data: any = null
  try { data = text ? JSON.parse(text) : null } catch { data = text }

  if (!response.ok) {
    throw new Error(data?.error || data?.message || 'Não foi possível alterar o email do cliente.')
  }

  return data
}

const GOLD = '#D4AF37'
const WHITE = '#FFFFFF'
const DAY_MS = 24 * 60 * 60 * 1000

function dateOnly(value?: string | null) {
  if (!value) return null
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

function formatDate(value?: string | null) {
  const date = dateOnly(value)
  return date ? new Intl.DateTimeFormat('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' }).format(date) : '—'
}

function nextCheckinDate(checkins: any[]) {
  const latest = dateOnly(checkins[0]?.created_at)
  const next = latest ? new Date(latest.getTime() + 7 * DAY_MS) : new Date()
  next.setHours(0, 0, 0, 0)
  return next
}

function trainingWeekStreak(sessions: any[]) {
  const weeks=[...new Set(sessions.map(item=>{
    const date=new Date(item.completed_at)
    date.setHours(0,0,0,0)
    date.setDate(date.getDate()-((date.getDay()+6)%7))
    return date.getTime()
  }))].sort((a,b)=>b-a)
  if(!weeks.length)return 0
  let streak=1
  for(let index=1;index<weeks.length;index++){
    if(weeks[index-1]-weeks[index]===7*DAY_MS)streak++
    else break
  }
  return streak
}
const SECTIONS = [
  { label: 'Introdução', range: [0, 3] }, { label: 'Ganhar Massa', range: [4, 16] },
  { label: 'Treino', range: [17, 24] }, { label: 'FAQ', range: [25, 27] },
  { label: 'Perder Gordura', range: [35, 42] },
]

function Login({ onLogin }: { onLogin: (s: Session, admin: boolean) => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setError(''); setLoading(true)
    try { const session = await signIn(email.trim(), password); onLogin(session, await isAdmin(session.access_token)) }
    catch (err: any) { setError(err.message || 'Não foi possível entrar.') }
    finally { setLoading(false) }
  }
  return <div style={shellStyle}>
    <div style={panelStyle}>
      <div style={brand}>MASSA<span>+</span></div>
      <div style={eyebrow}>ÁREA PRIVADA</div>
      <h1 style={title}>Entrar na tua conta</h1>
      <p style={muted}>Acede ao teu treino, nutrição e progresso.</p>
      <form onSubmit={submit} style={{ display:'grid', gap:12, marginTop:28 }}>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email" required style={inputStyle}/>
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" required style={inputStyle}/>
        {error && <div style={errorStyle}>{error}</div>}
        <button disabled={loading} style={goldButton}>{loading ? 'A entrar…' : 'ENTRAR'}</button>
      </form>
      <p style={{...muted, fontSize:11, marginTop:18}}>O acesso é criado pelo administrador do MASSA+.</p>
    </div>
  </div>
}

function Dashboard({ session, admin, onLogout, onEbook }: { session: Session, admin: boolean, onLogout:()=>void, onEbook:()=>void }) {
  const [client, setClient] = useState<any>(null)
  const [clients, setClients] = useState<any[]>([])
  const [weights, setWeights] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => {
    (async()=>{
      try {
        if (admin) setClients(await getAllClients(session.access_token))
        else {
          const c = await getOwnClient(session.access_token, session.user.id)
          setClient(c)
          if (c) setWeights(await getWeightProgress(session.access_token, c.id))
        }
      } catch(e:any) { setError(e.message || 'Erro ao carregar dados.') }
      finally { setLoading(false) }
    })()
  }, [session, admin])
  return <div style={dashboardShell}>
    <header className="dashboard-header" style={dashHeader}><div style={brand}>MASSA<span>+</span></div><div style={{display:'flex',alignItems:'center',gap:8}}><span className="dashboard-identity" style={muted}>{admin?'ADMINISTRADOR':session.user.email}</span><button onClick={onEbook} style={ghostButton}>E-BOOK</button><button onClick={()=>{signOut();onLogout()}} style={dangerButton}>TERMINAR SESSÃO</button></div></header>
    <main className="dashboard-main" style={{width:'min(1180px,calc(100% - 32px))', margin:'0 auto', padding:'48px 0 80px'}}>
      <div style={eyebrow}>{admin?'PAINEL DE ADMINISTRAÇÃO':'ÁREA DO CLIENTE'}</div>
      <h1 style={title}>{admin?'Gestão MASSA+':`Olá${client?.full_name ? `, ${client.full_name.split(' ')[0]}` : ''}.`}</h1>
      <p style={muted}>{admin?'Gerir clientes e preparar a próxima fase da plataforma.':'Aqui vais encontrar o teu plano, evolução e ferramentas personalizadas.'}</p>
      {loading ? <div style={card}>A carregar…</div> : error ? <div style={errorStyle}>{error}</div> : admin ? <AdminView clients={clients} session={session} onClientsChange={setClients}/> : <ClientView client={client} weights={weights} session={session} onProgressUpdated={async()=>{const freshClient=await getOwnClient(session.access_token,session.user.id);setClient(freshClient);if(freshClient)setWeights(await getWeightProgress(session.access_token,freshClient.id))}}/>} 
    </main>
  </div>
}

function AdminView({clients, session, onClientsChange}:{clients:any[], session:Session, onClientsChange:(clients:any[])=>void}) {
  const [open, setOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState<any>(null)
  const [selectedTab, setSelectedTab] = useState<'overview'|'workout'|'nutrition'|'checkin'|'assessment'|'supplements'|'intake'>('overview')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [form, setForm] = useState({full_name:'', email:'', password:'', initial_weight:'', current_weight:'', height:'', goal_weight:'', goal:'', start_date:new Date().toISOString().slice(0,10)})

  const update = (key:string, value:string) => setForm(f=>({...f,[key]:value}))
  const reset = () => setForm({full_name:'', email:'', password:'', initial_weight:'', current_weight:'', height:'', goal_weight:'', goal:'', start_date:new Date().toISOString().slice(0,10)})

  const create = async (e:React.FormEvent) => {
    e.preventDefault(); setError(''); setSuccess(''); setSaving(true)
    try {
      if(form.password.length < 6) throw new Error('A password do cliente deve ter pelo menos 6 caracteres.')
      const result = await createClientViaFunction(session.access_token, {
        email:form.email.trim(), password:form.password, full_name:form.full_name.trim(),
        initial_weight:form.initial_weight?Number(form.initial_weight):null,
        current_weight:form.current_weight?Number(form.current_weight):null,
        height:form.height?Number(form.height):null, goal_weight:form.goal_weight?Number(form.goal_weight):null,
        goal:form.goal.trim()||null, start_date:form.start_date||null
      })
      if(!result?.user_id) throw new Error('O Supabase não devolveu o ID do novo cliente.')
      const fresh=await getAllClients(session.access_token); onClientsChange(fresh)
      setSuccess('Cliente criado com sucesso.')
      reset()
      setTimeout(()=>{setOpen(false);setSuccess('')},900)
    } catch(e:any) { setError(e.message || 'Não foi possível criar o cliente.') }
    finally { setSaving(false) }
  }

  const remove = async (client:any) => {
    if(!window.confirm(`Eliminar o perfil de ${client.full_name}? Esta ação remove os dados do perfil, mas não apaga automaticamente a conta de autenticação.`)) return
    try { await deleteClientProfile(session.access_token, client.id); onClientsChange(await getAllClients(session.access_token)) }
    catch(e:any){ setError(e.message || 'Não foi possível eliminar o perfil.') }
  }

  if (selectedClient) {
    return <ClientManager
      client={selectedClient}
      session={session}
      initialTab={selectedTab}
      onBack={()=>setSelectedClient(null)}
      onClientUpdated={(c)=>{ setSelectedClient(c); onClientsChange(clients.map(x=>x.id===c.id?c:x)) }}
    />
  }

  return <div style={{display:'grid',gap:18,marginTop:28}}>
    <div style={card}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:16,marginBottom:18,flexWrap:'wrap'}}>
        <div><div style={cardTitle}>CLIENTES</div><p style={{...muted,margin:0}}>Cria e gere os perfis dos teus clientes.</p></div>
        <button onClick={()=>{setOpen(true);setError('');setSuccess('')}} style={goldButton}>+ ADICIONAR CLIENTE</button>
      </div>
      {error && !open && <div style={{...errorStyle,marginBottom:14}}>{error}</div>}
      {clients.length===0?<p style={muted}>Ainda não existem perfis de cliente.</p>:<div style={{display:'grid',gap:8}}>{clients.map(c=><div key={c.id} style={{...row,flexWrap:'wrap',gap:12}}>
        <div><strong>{c.full_name}</strong><div style={small}>{c.email||'Sem email'}</div></div>
        <div style={{display:'flex',alignItems:'center',gap:10,marginLeft:'auto'}}><div style={{textAlign:'right'}}><strong>{c.current_weight ?? '—'} kg</strong><div style={small}>objetivo {c.goal_weight ?? '—'} kg</div></div><button onClick={()=>{setSelectedTab('overview');setSelectedClient(c)}} style={ghostButton}>ABRIR</button><button onClick={()=>remove(c)} style={dangerButton}>ELIMINAR</button></div>
      </div>)}</div>}
    </div>
    <AdminControlCenter clients={clients} session={session} onOpen={(client,tab)=>{setSelectedTab(tab);setSelectedClient(client)}}/>

    {open && <div style={modalBackdrop}>
      <div style={modal}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:20}}><div><div style={cardTitle}>NOVO CLIENTE</div><h2 style={{...title,fontSize:32,marginTop:4}}>Criar perfil</h2></div><button onClick={()=>setOpen(false)} style={closeButton}>×</button></div>
        <p style={muted}>Cria a conta de acesso e o perfil MASSA+ do cliente.</p>
        <form onSubmit={create} style={{display:'grid',gap:10,marginTop:20}}>
          <input value={form.full_name} onChange={e=>update('full_name',e.target.value)} placeholder="Nome completo" required style={inputStyle}/>
          <input value={form.email} onChange={e=>update('email',e.target.value)} placeholder="Email" type="email" required style={inputStyle}/>
          <input value={form.password} onChange={e=>update('password',e.target.value)} placeholder="Password inicial (mín. 6 caracteres)" type="password" required style={inputStyle}/>
          <div style={formGrid}><input value={form.initial_weight} onChange={e=>update('initial_weight',e.target.value)} placeholder="Peso inicial (kg)" type="number" step="0.1" style={inputStyle}/><input value={form.current_weight} onChange={e=>update('current_weight',e.target.value)} placeholder="Peso atual (kg)" type="number" step="0.1" style={inputStyle}/><input value={form.height} onChange={e=>update('height',e.target.value)} placeholder="Altura (cm)" type="number" step="1" style={inputStyle}/><input value={form.goal_weight} onChange={e=>update('goal_weight',e.target.value)} placeholder="Peso objetivo (kg)" type="number" step="0.1" style={inputStyle}/></div>
          <input value={form.goal} onChange={e=>update('goal',e.target.value)} placeholder="Objetivo (ex.: Ganho de massa muscular)" style={inputStyle}/>
          <label style={labelStyle}>DATA DE INÍCIO<input value={form.start_date} onChange={e=>update('start_date',e.target.value)} type="date" style={{...inputStyle,marginTop:6,width:'100%'}}/></label>
          {error && <div style={errorStyle}>{error}</div>}
          {success && <div style={successStyle}>{success}</div>}
          <button disabled={saving} style={{...goldButton,marginTop:6}}>{saving?'A CRIAR…':'CRIAR CLIENTE'}</button>
        </form>
      </div>
    </div>}
  </div>
}

function AdminControlCenter({clients,session,onOpen}:{clients:any[],session:Session,onOpen:(client:any,tab:'overview'|'workout'|'nutrition'|'checkin'|'assessment'|'supplements'|'intake')=>void}){
  const [data,setData]=useState<Record<string,{workouts:any[],nutrition:any[],checkins:any[],weights:any[],sessions:any[],tasks:any[],intake:any}>>({})
  const [loading,setLoading]=useState(true)
  const [error,setError]=useState('')

  const load=useCallback(async()=>{
    if(clients.length===0){setData({});setLoading(false);return}
    setLoading(true);setError('')
    try{
      const rows=await Promise.all(clients.map(async(client)=>{
        const [workouts,nutrition,checkins,weights,sessions,tasks,intake]=await Promise.all([
          getClientWorkouts(session.access_token,client.id),
          getNutritionPlans(session.access_token,client.id),
          getCheckIns(session.access_token,client.id),
          getWeightProgress(session.access_token,client.id),
          getWorkoutSessions(session.access_token,client.id),
          getClientTasks(session.access_token,client.id),
          getClientIntake(session.access_token,client.id),
        ])
        return [client.id,{workouts,nutrition,checkins,weights,sessions,tasks,intake}] as const
      }))
      setData(Object.fromEntries(rows))
    }catch(e:any){setError(e.message||'Não foi possível carregar o resumo das ferramentas.')}finally{setLoading(false)}
  },[clients,session.access_token])

  useEffect(()=>{load()},[load])

  const totalWorkouts=clients.reduce((sum,c)=>sum+(data[c.id]?.workouts.length||0),0)
  const totalNutrition=clients.reduce((sum,c)=>sum+(data[c.id]?.nutrition.length||0),0)
  const totalCheckins=clients.reduce((sum,c)=>sum+(data[c.id]?.checkins.length||0),0)
  const totalWeights=clients.reduce((sum,c)=>sum+(data[c.id]?.weights.length||0),0)
  const withoutWorkout=clients.filter(c=>(data[c.id]?.workouts.length||0)===0)
  const withoutNutrition=clients.filter(c=>(data[c.id]?.nutrition.length||0)===0)
  const withoutCheckin=clients.filter(c=>(data[c.id]?.checkins.length||0)===0)
  const withoutProgress=clients.filter(c=>(data[c.id]?.weights.length||0)<2)
  const inactiveClients=clients.filter(c=>{
    const latest=data[c.id]?.sessions[0]?.completed_at
    return !latest||Date.now()-new Date(latest).getTime()>7*DAY_MS
  })
  const totalSessions=clients.reduce((sum,c)=>sum+(data[c.id]?.sessions.length||0),0)
  const openTasks=clients.flatMap(c=>(data[c.id]?.tasks||[]).filter(task=>!task.is_completed).map(task=>({client:c,task})))
  const pendingCheckins=clients.flatMap(c=>(data[c.id]?.checkins||[]).filter(item=>!item.reviewed_at).map(item=>({client:c,item})))
  const intakeAlerts=clients.filter(c=>data[c.id]?.intake?.submitted_at&&!data[c.id]?.intake?.reviewed_at)
  const latestCheckinClient=clients
    .map(c=>({client:c,date:data[c.id]?.checkins[0]?.created_at||''}))
    .sort((a,b)=>b.date.localeCompare(a.date))[0]?.client

  const cards=[
    {key:'workout',label:'TREINOS',value:totalWorkouts,unit:'planos criados',missing:withoutWorkout,description:withoutWorkout.length?`${withoutWorkout.length} cliente${withoutWorkout.length===1?'':'s'} ainda sem treino`:'Todos os clientes têm treino',tab:'workout' as const,target:withoutWorkout[0]||clients[0]},
    {key:'nutrition',label:'NUTRIÇÃO',value:totalNutrition,unit:'planos alimentares',missing:withoutNutrition,description:withoutNutrition.length?`${withoutNutrition.length} cliente${withoutNutrition.length===1?'':'s'} ainda sem plano`:'Todos os clientes têm plano',tab:'nutrition' as const,target:withoutNutrition[0]||clients[0]},
    {key:'checkin',label:'CHECK-INS',value:totalCheckins,unit:'registos recebidos',missing:withoutCheckin,description:withoutCheckin.length?`${withoutCheckin.length} cliente${withoutCheckin.length===1?'':'s'} sem check-in`:'Todos já enviaram check-in',tab:'checkin' as const,target:withoutCheckin[0]||latestCheckinClient||clients[0]},
    {key:'progress',label:'PROGRESSO',value:totalWeights,unit:'pesagens guardadas',missing:withoutProgress,description:withoutProgress.length?`${withoutProgress.length} cliente${withoutProgress.length===1?'':'s'} com poucos registos`:'Progresso atualizado',tab:'overview' as const,target:withoutProgress[0]||clients[0]},
    {key:'activity',label:'ATIVIDADE',value:totalSessions,unit:'treinos concluídos',missing:inactiveClients,description:inactiveClients.length?`${inactiveClients.length} cliente${inactiveClients.length===1?'':'s'} sem treinar há 7 dias`:'Todos treinaram nos últimos 7 dias',tab:'workout' as const,target:inactiveClients[0]||clients[0]},
  ]

  return <div style={card}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:16,flexWrap:'wrap',marginBottom:18}}>
      <div><div style={cardTitle}>CENTRO DE CONTROLO</div><p style={{...muted,margin:'-8px 0 0'}}>Resumo da plataforma e atalhos para o próximo trabalho.</p></div>
      <button onClick={load} disabled={loading} style={ghostButton}>{loading?'A ATUALIZAR…':'ATUALIZAR DADOS'}</button>
    </div>
    {error&&<div style={{...errorStyle,marginBottom:14}}>{error}</div>}
    {clients.length===0?<div style={emptyToolState}>Cria um cliente para ativares o centro de controlo.</div>:loading?<div style={emptyToolState}>A calcular o resumo dos clientes…</div>:<>
      <div style={controlGrid}>{cards.map(tool=><button key={tool.key} onClick={()=>tool.target&&onOpen(tool.target,tool.tab)} style={controlCard}>
        <div style={{display:'flex',justifyContent:'space-between',gap:12,alignItems:'flex-start'}}><span style={controlLabel}>{tool.label}</span><span style={{...statusDot,background:tool.missing.length?'#d6a72a':'#4ca66a'}}/></div>
        <div style={controlNumber}>{tool.value}</div>
        <div style={controlUnit}>{tool.unit}</div>
        <div style={{...controlStatus,color:tool.missing.length?'#e4bd54':'#81c990'}}>{tool.description}</div>
        <div style={controlAction}>{tool.target?`ABRIR ${tool.target.full_name?.split(' ')[0]?.toUpperCase()||'CLIENTE'} →`:'SEM CLIENTES'}</div>
      </button>)}</div>
      {(withoutWorkout.length>0||withoutNutrition.length>0||inactiveClients.length>0)&&<div style={{marginTop:18,paddingTop:17,borderTop:'1px solid rgba(255,255,255,.07)'}}>
        <div style={cardTitle}>AÇÕES RECOMENDADAS</div>
        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
          {withoutWorkout.slice(0,3).map(c=><button key={`w-${c.id}`} onClick={()=>onOpen(c,'workout')} style={actionChip}>＋ Criar treino para {c.full_name}</button>)}
          {withoutNutrition.slice(0,3).map(c=><button key={`n-${c.id}`} onClick={()=>onOpen(c,'nutrition')} style={actionChip}>＋ Criar nutrição para {c.full_name}</button>)}
          {inactiveClients.slice(0,3).map(c=><button key={`a-${c.id}`} onClick={()=>onOpen(c,'workout')} style={actionChip}>⚠ {c.full_name} sem treino recente</button>)}
        </div>
      </div>}
      <div style={{marginTop:18,paddingTop:17,borderTop:'1px solid rgba(255,255,255,.07)'}}><div style={cardTitle}>CAIXA DE ENTRADA</div><div style={{display:'grid',gap:8}}>
        {pendingCheckins.map(({client,item})=><button key={`ci-${item.id}`} onClick={()=>onOpen(client,'checkin')} style={inboxRow}><span><b>NOVO CHECK-IN</b> · {client.full_name}</span><small>{formatDate(item.created_at)}</small></button>)}
        {openTasks.filter(({task})=>task.due_date&&task.due_date<=new Date().toISOString().slice(0,10)).map(({client,task})=><button key={`t-${task.id}`} onClick={()=>onOpen(client,'overview')} style={inboxRow}><span><b>TAREFA PENDENTE</b> · {client.full_name} · {task.title}</span><small>{task.due_date}</small></button>)}
        {inactiveClients.map(client=><button key={`inactive-${client.id}`} onClick={()=>onOpen(client,'workout')} style={inboxRow}><span><b>SEM TREINO RECENTE</b> · {client.full_name}</span><small>ABRIR →</small></button>)}
        {intakeAlerts.map(client=><button key={`intake-${client.id}`} onClick={()=>onOpen(client,'intake')} style={inboxRow}><span><b>FICHA INICIAL RECEBIDA</b> · {client.full_name}</span><small>REVER →</small></button>)}
        {pendingCheckins.length===0&&openTasks.filter(({task})=>task.due_date&&task.due_date<=new Date().toISOString().slice(0,10)).length===0&&inactiveClients.length===0&&intakeAlerts.length===0&&<div style={emptyToolState}>Não tens assuntos urgentes. Tudo em ordem.</div>}
      </div></div>
    </>}
  </div>
}


function ClientManager({client, session, initialTab='overview', onBack, onClientUpdated}:{client:any,session:Session,initialTab?:'overview'|'workout'|'nutrition'|'checkin'|'assessment'|'supplements'|'intake',onBack:()=>void,onClientUpdated:(c:any)=>void}) {
  const [tab,setTab]=useState<'overview'|'workout'|'nutrition'|'checkin'|'assessment'|'supplements'|'intake'>(initialTab)
  const [weights,setWeights]=useState<any[]>([])
  const [workouts,setWorkouts]=useState<any[]>([])
  const [nutrition,setNutrition]=useState<any[]>([])
  const [checkins,setCheckins]=useState<any[]>([])
  const [busy,setBusy]=useState(false)
  const [message,setMessage]=useState('')
  const [photoBusy,setPhotoBusy]=useState(false)
  const [profile,setProfile]=useState({full_name:client.full_name||'',email:client.email||'',initial_weight:client.initial_weight??'',current_weight:client.current_weight??'',height:client.height??'',goal_weight:client.goal_weight??'',goal:client.goal||'',start_date:client.start_date||''})
  const load=async()=>{
    setBusy(true)
    try {
      const [w,wo,n,ci]=await Promise.all([
        getWeightProgress(session.access_token,client.id),
        getClientWorkouts(session.access_token,client.id),
        getNutritionPlans(session.access_token,client.id),
        getCheckIns(session.access_token,client.id)
      ])
      setWeights(w); setWorkouts(wo); setNutrition(n); setCheckins(ci)
    } catch(e:any){setMessage(e.message||'Erro ao carregar dados.')} finally{setBusy(false)}
  }
  useEffect(()=>{load()},[client.id])

  const saveProfile=async(e:React.FormEvent)=>{
    e.preventDefault(); setBusy(true); setMessage('')
    try{
      const newEmail = profile.email.trim()
      const oldEmail = (client.email || '').trim()

      if (newEmail && newEmail.toLowerCase() !== oldEmail.toLowerCase()) {
        await updateClientEmailViaFunction(session.access_token, client.id, newEmail)
      }

      const updated=await updateClientProfile(session.access_token,client.id,{
        full_name:profile.full_name.trim(), email:newEmail,
        initial_weight:profile.initial_weight===''?null:Number(profile.initial_weight),
        current_weight:profile.current_weight===''?null:Number(profile.current_weight),
        height:profile.height===''?null:Number(profile.height),
        goal_weight:profile.goal_weight===''?null:Number(profile.goal_weight),
        goal:profile.goal.trim()||null,start_date:profile.start_date||null
      })
      setMessage('Perfil guardado com sucesso.')
      if(updated) onClientUpdated(updated)
    }catch(e:any){setMessage(e.message||'Não foi possível guardar as alterações.')}finally{setBusy(false)}
  }

  const messageStyle = message.startsWith('Erro') || message.includes('não') ? errorStyle : successStyle

  const saveBeforePhoto=async(file?:File)=>{
    if(!file)return
    setPhotoBusy(true);setMessage('')
    try{
      const before_photo_url=await uploadBeforePhoto(session.access_token,client.id,file)
      const updated=await updateClientProfile(session.access_token,client.id,{before_photo_url})
      if(updated)onClientUpdated(updated)
      setMessage('Fotografia inicial guardada com sucesso.')
    }catch(e:any){setMessage(e.message||'Não foi possível guardar a fotografia.')}finally{setPhotoBusy(false)}
  }

  return <div style={{display:'grid',gap:18,marginTop:28}}>
    <div style={{display:'flex',alignItems:'center',gap:12}}>
      <button onClick={onBack} style={ghostButton}>← CLIENTES</button>
      <div><div style={eyebrow}>CLIENTE</div><h2 style={{...title,fontSize:36,margin:4}}>{client.full_name}</h2></div>
    </div>
    <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
      {([['overview','PERFIL'],['intake','FICHA INICIAL'],['workout','TREINO'],['nutrition','NUTRIÇÃO'],['checkin','CHECK-INS'],['assessment','REAVALIAÇÕES'],['supplements','SUPLEMENTAÇÃO']] as const).map(([k,l])=><button key={k} onClick={()=>setTab(k)} style={{...ghostButton,color:tab===k?GOLD:undefined,borderColor:tab===k?'rgba(212,175,55,.48)':undefined,background:tab===k?'rgba(212,175,55,.11)':ghostButton.background,boxShadow:tab===k?'0 0 0 1px rgba(212,175,55,.08) inset':ghostButton.boxShadow}}>{l}</button>)}
    </div>
    {message && <div style={messageStyle}>{message}</div>}
    {busy && <div style={muted}>A carregar…</div>}
    {tab==='overview' && <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:18}}>
      <div style={card}><div style={cardTitle}>DADOS DO CLIENTE</div>
        <form onSubmit={saveProfile} style={{display:'grid',gap:10}}>
          <input value={profile.full_name} onChange={e=>setProfile({...profile,full_name:e.target.value})} placeholder="Nome" style={inputStyle}/>
          <input value={profile.email} onChange={e=>setProfile({...profile,email:e.target.value})} placeholder="Email" type="email" style={inputStyle}/>
          <div style={formGrid}><input value={profile.initial_weight} onChange={e=>setProfile({...profile,initial_weight:e.target.value})} placeholder="Peso inicial" type="number" step=".1" style={inputStyle}/><input value={profile.current_weight} onChange={e=>setProfile({...profile,current_weight:e.target.value})} placeholder="Peso atual" type="number" step=".1" style={inputStyle}/><input value={profile.height} onChange={e=>setProfile({...profile,height:e.target.value})} placeholder="Altura cm" type="number" style={inputStyle}/><input value={profile.goal_weight} onChange={e=>setProfile({...profile,goal_weight:e.target.value})} placeholder="Objetivo kg" type="number" step=".1" style={inputStyle}/></div>
          <input value={profile.goal} onChange={e=>setProfile({...profile,goal:e.target.value})} placeholder="Objetivo" style={inputStyle}/>
          <label style={labelStyle}>DATA DE INÍCIO<input value={profile.start_date} onChange={e=>setProfile({...profile,start_date:e.target.value})} type="date" style={{...inputStyle,width:'100%',marginTop:6}}/></label>
          <button disabled={busy} style={goldButton}>GUARDAR PERFIL</button>
        </form>
      </div>
      <div style={card} className="before-photo-card"><div style={cardTitle}>FOTOGRAFIA INICIAL · ANTES</div>
        <div className="before-photo-frame">{client.before_photo_url?<img src={client.before_photo_url} alt={`Fotografia inicial de ${client.full_name}`} />:<div className="before-photo-empty"><b>SEM FOTOGRAFIA</b><span>Adiciona uma imagem frontal do início da transformação.</span></div>}</div>
        <label className="before-photo-upload">{photoBusy?'A ENVIAR…':client.before_photo_url?'ALTERAR FOTOGRAFIA':'ADICIONAR FOTOGRAFIA'}<input disabled={photoBusy} type="file" accept="image/jpeg,image/png,image/webp" onChange={e=>saveBeforePhoto(e.target.files?.[0])}/></label>
        <p style={{...muted,fontSize:11,marginBottom:0}}>JPG, PNG ou WebP · máximo 5 MB.</p>
      </div>
      <div style={card}><div style={cardTitle}>PESO / PROGRESSO</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
          <div><div style={labelStyle}>INICIAL</div><div style={bigNumber}>{client.initial_weight??'—'}<small> kg</small></div></div>
          <div><div style={labelStyle}>ATUAL</div><div style={bigNumber}>{client.current_weight??'—'}<small> kg</small></div></div>
        </div>
        <WeightManager client={client} session={session} weights={weights} onRefresh={load}/>
      </div>
      <div style={{gridColumn:'1/-1'}}><WeightProgressChart client={client} weights={weights}/></div>
      <div style={{gridColumn:'1/-1'}}><CoachWorkspace client={client} session={session}/></div>
    </div>}
    {tab==='workout' && <WorkoutManager client={client} session={session} workouts={workouts} onRefresh={load}/>}
    {tab==='nutrition' && <NutritionManager client={client} session={session} plans={nutrition} onRefresh={load}/>}
    {tab==='checkin' && <CheckinManager client={client} session={session} checkins={checkins} onRefresh={load}/>}
    {tab==='assessment' && <AdminAssessments client={client} session={session}/>}
    {tab==='supplements' && <SupplementManager client={client} session={session}/>}
    {tab==='intake' && <AdminIntake client={client} session={session}/>}
  </div>
}

function CoachWorkspace({client,session}:{client:any,session:Session}){
  const [notes,setNotes]=useState<any[]>([]),[tasks,setTasks]=useState<any[]>([])
  const [note,setNote]=useState(''),[titleText,setTitleText]=useState(''),[details,setDetails]=useState(''),[dueDate,setDueDate]=useState('')
  const [saving,setSaving]=useState(false),[message,setMessage]=useState('')
  const load=useCallback(async()=>{try{const [nextNotes,nextTasks]=await Promise.all([getCoachNotes(session.access_token,client.id),getClientTasks(session.access_token,client.id)]);setNotes(nextNotes);setTasks(nextTasks)}catch(e:any){setMessage(e.message||'Não foi possível carregar a organização do cliente.')}},[session.access_token,client.id])
  useEffect(()=>{load()},[load])
  const addNote=async(e:React.FormEvent)=>{e.preventDefault();setSaving(true);setMessage('');try{await createCoachNote(session.access_token,{client_id:client.id,note:note.trim()});setNote('');await load();setMessage('Nota privada guardada.')}catch(e:any){setMessage(e.message||'Não foi possível guardar a nota.')}finally{setSaving(false)}}
  const addTask=async(e:React.FormEvent)=>{e.preventDefault();setSaving(true);setMessage('');try{await createClientTask(session.access_token,{client_id:client.id,title:titleText.trim(),details:details.trim()||null,due_date:dueDate||null});setTitleText('');setDetails('');setDueDate('');await load();setMessage('Tarefa atribuída ao cliente.')}catch(e:any){setMessage(e.message||'Não foi possível criar a tarefa.')}finally{setSaving(false)}}
  return <div style={coachWorkspaceGrid}>
    <div style={card}><div style={cardTitle}>NOTAS PRIVADAS</div><p style={{...muted,marginTop:-7}}>Visíveis apenas para o administrador.</p><form onSubmit={addNote} style={{display:'grid',gap:8}}><textarea value={note} onChange={e=>setNote(e.target.value)} required placeholder="Lesões, preferências, estratégia ou assunto para o próximo contacto…" style={{...inputStyle,minHeight:90,resize:'vertical'}}/><button disabled={saving} style={goldButton}>GUARDAR NOTA</button></form><div style={{display:'grid',gap:7,marginTop:14}}>{notes.map(item=><div key={item.id} style={privateNote}><div style={small}>{formatDate(item.created_at)}</div><p style={{...text,whiteSpace:'pre-wrap',margin:'7px 0'}}>{item.note}</p><button onClick={async()=>{await deleteCoachNote(session.access_token,item.id);load()}} style={dangerButton}>ELIMINAR</button></div>)}</div></div>
    <div style={card}><div style={cardTitle}>TAREFAS DO CLIENTE</div><p style={{...muted,marginTop:-7}}>Aparecem na conta do cliente até serem concluídas.</p><form onSubmit={addTask} style={{display:'grid',gap:8}}><input value={titleText} onChange={e=>setTitleText(e.target.value)} required placeholder="Ex.: Enviar fotografias de progresso" style={inputStyle}/><textarea value={details} onChange={e=>setDetails(e.target.value)} placeholder="Instruções adicionais (opcional)" style={{...inputStyle,minHeight:65,resize:'vertical'}}/><label style={labelStyle}>PRAZO<input value={dueDate} onChange={e=>setDueDate(e.target.value)} type="date" style={{...inputStyle,width:'100%',marginTop:6}}/></label><button disabled={saving} style={goldButton}>ATRIBUIR TAREFA</button></form><div style={{display:'grid',gap:7,marginTop:14}}>{tasks.map(item=><div key={item.id} style={{...taskRow,opacity:item.is_completed?0.62:1}}><div><b>{item.title}</b><div style={small}>{item.is_completed?'CONCLUÍDA':item.due_date?`Prazo: ${item.due_date}`:'Sem prazo'}</div></div><button onClick={async()=>{await deleteClientTask(session.access_token,item.id);load()}} style={dangerButton}>ELIMINAR</button></div>)}</div></div>
    {message&&<div style={{...(message.includes('guardada')||message.includes('atribuída')?successStyle:errorStyle),gridColumn:'1/-1'}}>{message}</div>}
  </div>
}

function AdminAssessments({client,session}:{client:any,session:Session}){
  const [items,setItems]=useState<any[]>([]),[feedback,setFeedback]=useState<Record<number,string>>({}),[message,setMessage]=useState('')
  const load=useCallback(async()=>{try{const rows=await getMonthlyAssessments(session.access_token,client.id);setItems(rows);setFeedback(Object.fromEntries(rows.map((x:any)=>[x.id,x.coach_feedback||''])))}catch(e:any){setMessage(e.message)}},[session.access_token,client.id])
  useEffect(()=>{load()},[load])
  return <div style={{display:'grid',gap:14}}><div style={trainingAdminHero}><div><div style={eyebrow}>REAVALIAÇÃO MENSAL</div><h3 style={{...title,fontSize:30}}>Evolução de {client.full_name?.split(' ')[0]}</h3></div><div style={reviewCount}><b>{items.length}</b><span>REGISTOS</span></div></div>{message&&<div style={errorStyle}>{message}</div>}{items.length===0?<div style={emptyAdminState}>O cliente ainda não enviou uma reavaliação.</div>:items.map(item=><div key={item.id} style={card}><div style={{display:'flex',justifyContent:'space-between',gap:12}}><div><div style={cardTitle}>{formatDate(item.assessment_date)}</div><b>{item.weight??'—'} kg · satisfação {item.satisfaction??'—'}/10</b></div><button onClick={async()=>{await deleteMonthlyAssessment(session.access_token,item.id);load()}} style={dangerButton}>ELIMINAR</button></div><div style={measurementGrid}>{[['CINTURA',item.waist],['PEITO',item.chest],['BRAÇO',item.arm],['PERNA',item.thigh],['ANCA',item.hips]].map(([label,value])=><div style={checkinMetric} key={label}><span>{label}</span><b>{value??'—'} cm</b></div>)}</div><AssessmentPhotos item={item}/>{item.client_notes&&<div style={clientNote}><b>OBSERVAÇÕES</b><p>{item.client_notes}</p></div>}<textarea value={feedback[item.id]||''} onChange={e=>setFeedback({...feedback,[item.id]:e.target.value})} placeholder="Comentário e objetivo para o próximo mês…" style={{...inputStyle,width:'100%',minHeight:85,marginTop:12}}/><button onClick={async()=>{await updateMonthlyAssessment(session.access_token,item.id,{coach_feedback:feedback[item.id]||null,reviewed_at:new Date().toISOString()});load()}} style={{...goldButton,width:'100%',marginTop:8}}>GUARDAR FEEDBACK</button></div>)}</div>
}

function AdminIntake({client,session}:{client:any,session:Session}){
  const [item,setItem]=useState<any>(null),[message,setMessage]=useState('')
  const load=useCallback(async()=>setItem(await getClientIntake(session.access_token,client.id)),[session.access_token,client.id]);useEffect(()=>{load().catch(e=>setMessage(e.message))},[load])
  if(!item)return <div style={emptyAdminState}>A ficha inicial ainda não foi preenchida pelo cliente.</div>
  const sections=[['DADOS E OBJETIVO',[['Nascimento',item.birth_date],['Telefone',item.phone],['Profissão',item.profession],['Emergência',item.emergency_contact],['Objetivo detalhado',item.goal_detail],['Prazo',item.target_date]]],['TREINO',[['Experiência',item.training_experience],['Dias/semana',item.training_days],['Minutos/sessão',item.session_minutes],['Local',item.training_location],['Equipamento',item.equipment],['Preferências',item.exercise_preferences],['Limitações/dor',item.limitations]]],['ALIMENTAÇÃO',[['Refeições/dia',item.meals_per_day],['Horários',item.meal_schedule],['Alimentos preferidos',item.preferred_foods],['Não gosta',item.disliked_foods],['Alergias/intolerâncias',item.allergies],['Suplementos atuais',item.current_supplements],['Água',item.water_liters?`${item.water_liters} L`:'—'],['Álcool',item.alcohol]]],['ROTINA E SAÚDE',[['Sono',item.sleep_hours?`${item.sleep_hours} h`:'—'],['Qualidade do sono',item.sleep_quality?`${item.sleep_quality}/10`:'—'],['Stress',item.stress_level?`${item.stress_level}/10`:'—'],['Atividade diária',item.daily_activity],['Condições médicas',item.medical_conditions],['Medicação',item.medication],['Cirurgias',item.surgeries],['Restrições médicas',item.medical_restrictions]]]] as const
  return <div style={{display:'grid',gap:14}}><div style={trainingAdminHero}><div><div style={eyebrow}>FICHA INICIAL</div><h3 style={{...title,fontSize:30}}>{client.full_name}</h3><p style={{...muted,margin:0}}>Enviada em {formatDate(item.submitted_at)}</p></div><span style={{...reviewBadge,color:item.reviewed_at?'#81c990':GOLD}}>{item.reviewed_at?'REVISTA':'POR REVER'}</span></div>{sections.map(([titleText,fields])=><div key={titleText} style={card}><div style={cardTitle}>{titleText}</div><div style={intakeGrid}>{fields.map(([label,value])=><div key={label} style={intakeField}><span>{label}</span><b>{value??'—'}</b></div>)}</div></div>)}{!item.truth_confirmed&&<div style={errorStyle}>O cliente não confirmou a declaração de veracidade.</div>}<button onClick={async()=>{await reviewClientIntake(session.access_token,client.id);setMessage('Ficha marcada como revista.');load()}} disabled={Boolean(item.reviewed_at)} style={goldButton}>{item.reviewed_at?'FICHA REVISTA':'MARCAR COMO REVISTA'}</button>{message&&<div style={successStyle}>{message}</div>}</div>
}

function SupplementManager({client,session}:{client:any,session:Session}){
  const [items,setItems]=useState<any[]>([]),[name,setName]=useState(''),[dosage,setDosage]=useState(''),[timing,setTiming]=useState(''),[instructions,setInstructions]=useState(''),[message,setMessage]=useState('')
  const load=useCallback(async()=>setItems(await getSupplements(session.access_token,client.id)),[session.access_token,client.id]);useEffect(()=>{load().catch(e=>setMessage(e.message))},[load])
  const add=async(e:React.FormEvent)=>{e.preventDefault();try{await createSupplement(session.access_token,{client_id:client.id,name:name.trim(),dosage:dosage.trim(),timing:timing.trim()||null,instructions:instructions.trim()||null});setName('');setDosage('');setTiming('');setInstructions('');await load()}catch(e:any){setMessage(e.message)}}
  return <div style={{display:'grid',gap:14}}><div style={nutritionAdminHero}><div><div style={eyebrow}>PROTOCOLO</div><h3 style={{...title,fontSize:30}}>Suplementação de {client.full_name?.split(' ')[0]}</h3></div></div><div style={card}><form onSubmit={add} style={{display:'grid',gap:9}}><div style={formGrid}><input value={name} onChange={e=>setName(e.target.value)} required placeholder="Suplemento" style={inputStyle}/><input value={dosage} onChange={e=>setDosage(e.target.value)} required placeholder="Dose (ex.: 5 g)" style={inputStyle}/></div><input value={timing} onChange={e=>setTiming(e.target.value)} placeholder="Horário/momento" style={inputStyle}/><textarea value={instructions} onChange={e=>setInstructions(e.target.value)} placeholder="Instruções e observações" style={{...inputStyle,minHeight:70}}/><button style={goldButton}>ADICIONAR SUPLEMENTO</button></form>{message&&<div style={errorStyle}>{message}</div>}</div><div style={{display:'grid',gap:8}}>{items.map(item=><div key={item.id} style={{...card,display:'flex',justifyContent:'space-between',gap:12,alignItems:'center',opacity:item.is_active?1:.55}}><div><b>{item.name} · {item.dosage}</b><div style={small}>{item.timing||'Sem horário'}{item.instructions?` · ${item.instructions}`:''}</div></div><div style={{display:'flex',gap:6}}><button onClick={async()=>{await updateSupplement(session.access_token,item.id,{is_active:!item.is_active});load()}} style={ghostButton}>{item.is_active?'PAUSAR':'ATIVAR'}</button><button onClick={async()=>{await deleteSupplement(session.access_token,item.id);load()}} style={dangerButton}>ELIMINAR</button></div></div>)}</div></div>
}

function AssessmentPhotos({item}:{item:any}){return <div className="assessment-photos" style={assessmentPhotos}>{([['FRENTE',item.photo_front_url],['LADO',item.photo_side_url],['COSTAS',item.photo_back_url]] as const).map(([label,url])=><div key={label}><span style={labelStyle}>{label}</span><div className="assessment-photo" style={assessmentPhoto}>{url?<img src={url} alt={`Fotografia ${label.toLowerCase()}`}/>:<small>Sem fotografia</small>}</div></div>)}</div>}

function WeightManager({client,session,weights,onRefresh}:{client:any,session:Session,weights:any[],onRefresh:()=>void}) {
  const [weight,setWeight]=useState(''),[date,setDate]=useState(new Date().toISOString().slice(0,10)),[saving,setSaving]=useState(false)
  const add=async(e:React.FormEvent)=>{e.preventDefault();setSaving(true);try{await addWeightProgress(session.access_token,{client_id:client.id,weight:Number(weight),recorded_at:date});await updateClientProfile(session.access_token,client.id,{current_weight:Number(weight)});setWeight('');onRefresh()}finally{setSaving(false)}}
  return <div style={{marginTop:24}}><div style={cardTitle}>REGISTAR PESO</div><form onSubmit={add} className="weight-entry-form"><input value={weight} onChange={e=>setWeight(e.target.value)} type="number" step=".1" placeholder="Peso kg" required style={inputStyle}/><input value={date} onChange={e=>setDate(e.target.value)} type="date" style={inputStyle}/><button disabled={saving} style={goldButton}>ADICIONAR</button></form><div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:14}}>{weights.map(w=><div key={w.id} style={weightPill}>{w.weight} kg <span>{w.recorded_at}</span><button onClick={async()=>{await deleteWeightProgress(session.access_token,w.id);onRefresh()}} style={{...ghostButton,padding:'2px 5px',marginLeft:5}}>×</button></div>)}</div></div>
}

function WorkoutManager({client,session,workouts,onRefresh}:{client:any,session:Session,workouts:any[],onRefresh:()=>void}) {
  const [name,setName]=useState(''),[description,setDescription]=useState('')
  const [formOpen,setFormOpen]=useState(workouts.length===0),[open,setOpen]=useState<number|null>(null),[ex,setEx]=useState<Record<number,any[]>>({})
  const [saving,setSaving]=useState(false),[message,setMessage]=useState('')
  const [editingId,setEditingId]=useState<number|null>(null),[editName,setEditName]=useState(''),[editing,setEditing]=useState(false)
  const [completedSessions,setCompletedSessions]=useState<any[]>([])

  useEffect(()=>{
    let cancelled=false
    const loadAllExercises=async()=>{
      try{
        const rows=await Promise.all(workouts.map(async workout=>[workout.id,await getWorkoutExercises(session.access_token,workout.id)] as const))
        if(!cancelled)setEx(Object.fromEntries(rows))
      }catch(e:any){if(!cancelled)setMessage(e.message||'Não foi possível carregar os exercícios dos treinos.')}
    }
    loadAllExercises()
    return()=>{cancelled=true}
  },[workouts,session.access_token])
  useEffect(()=>{getWorkoutSessions(session.access_token,client.id).then(setCompletedSessions).catch(()=>setCompletedSessions([]))},[client.id,session.access_token])

  const resetForm=()=>{setName('');setDescription('')}
  const add=async(e:React.FormEvent)=>{
    e.preventDefault();setSaving(true);setMessage('')
    try{await createWorkout(session.access_token,{client_id:client.id,name:name.trim(),description:description.trim()||null});resetForm();setFormOpen(false);setMessage('Treino criado com sucesso.');onRefresh()}
    catch(e:any){setMessage(e.message||'Não foi possível criar o treino.')}finally{setSaving(false)}
  }
  const loadEx=async(id:number)=>{
    if(open===id){setOpen(null);return}
    setOpen(id);setMessage('')
    try{const rows=await getWorkoutExercises(session.access_token,id);setEx(current=>({...current,[id]:rows}))}
    catch(e:any){setMessage(e.message||'Não foi possível carregar os exercícios.')}
  }
  const removeWorkout=async(workout:any)=>{
    if(!window.confirm(`Eliminar “${workout.name}” e os exercícios associados?`))return
    try{await deleteWorkout(session.access_token,workout.id);if(open===workout.id)setOpen(null);onRefresh()}
    catch(e:any){setMessage(e.message||'Não foi possível eliminar o treino.')}
  }
  const duplicateWorkout=(workout:any)=>{setName(`${workout.name} — cópia`);setDescription(workout.description||'');setFormOpen(true);window.scrollTo({top:0,behavior:'smooth'})}
  const startEditing=(workout:any)=>{setEditingId(workout.id);setEditName(workout.name||'');setMessage('')}
  const cancelEditing=()=>{setEditingId(null);setEditName('')}
  const saveWorkoutName=async(e:React.FormEvent,workout:any)=>{
    e.preventDefault()
    const nextName=editName.trim()
    if(!nextName){setMessage('O nome do treino não pode ficar vazio.');return}
    setEditing(true);setMessage('')
    try{
      await updateWorkout(session.access_token,workout.id,{name:nextName})
      cancelEditing();setMessage('Nome do treino guardado com sucesso.');onRefresh()
    }catch(e:any){setMessage(e.message||'Não foi possível alterar o nome do treino.')}
    finally{setEditing(false)}
  }

  return <div style={{display:'grid',gap:16}}>
    <div style={trainingAdminHero}>
      <div><div style={eyebrow}>PROGRAMAÇÃO DE TREINO</div><h3 style={{...title,fontSize:30,marginBottom:8}}>Treinos de {client.full_name?.split(' ')[0]||'cliente'}</h3><div style={{display:'flex',gap:8,flexWrap:'wrap'}}><span style={adminInfoPill}>PESO <b>{client.current_weight??'—'} kg</b></span><span style={adminInfoPill}>OBJETIVO <b>{client.goal_weight??'—'} kg</b></span><span style={adminInfoPill}>TREINOS <b>{workouts.length}</b></span></div></div>
      <button onClick={()=>{setFormOpen(v=>!v);setMessage('')}} style={goldButton}>{formOpen?'FECHAR':'＋ NOVO TREINO'}</button>
    </div>

    {message&&<div style={message.includes('sucesso')?successStyle:errorStyle}>{message}</div>}

    {formOpen&&<div style={{...card,borderColor:'rgba(212,175,55,.25)'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:12}}><div><div style={cardTitle}>NOVO TREINO</div><p style={{...muted,marginTop:-8}}>Cria a sessão e adiciona os exercícios logo a seguir.</p></div><button type="button" onClick={()=>{resetForm();setFormOpen(false)}} style={closeButton}>×</button></div>
      <form onSubmit={add} style={{display:'grid',gap:10,marginTop:16}}>
        <label style={labelStyle}>NOME DO TREINO<input value={name} onChange={e=>setName(e.target.value)} placeholder="Ex.: Treino A — Peito e Tríceps" required style={{...inputStyle,width:'100%',marginTop:6}}/></label>
        <label style={labelStyle}>DESCRIÇÃO / ORIENTAÇÃO<textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Ex.: Foco em força, controlar a fase excêntrica e não treinar até à falha." style={{...inputStyle,width:'100%',minHeight:82,resize:'vertical',marginTop:6}}/></label>
        <button disabled={saving} style={goldButton}>{saving?'A CRIAR…':'CRIAR TREINO E ADICIONAR EXERCÍCIOS'}</button>
      </form>
    </div>}

    {workouts.length===0&&!formOpen&&<div style={emptyAdminState}><div style={{fontSize:34}}>＋</div><div style={cardTitle}>AINDA NÃO EXISTEM TREINOS</div><p style={muted}>Cria o primeiro treino personalizado deste cliente.</p><button onClick={()=>setFormOpen(true)} style={goldButton}>CRIAR PRIMEIRO TREINO</button></div>}

    {workouts.map((workout,index)=>{
      const exercises=ex[workout.id]||[]
      const totalSets=exercises.reduce((sum,item)=>sum+(Number(item.sets)||0),0)
      return <div key={workout.id} style={{...card,padding:0,overflow:'hidden'}}>
        <div style={{height:3,background:index===0?GOLD:'rgba(255,255,255,.12)'}}/>
        <div style={{padding:24}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:16,flexWrap:'wrap'}}>
            <div style={{flex:1,minWidth:240}}><div style={{...eyebrow,marginTop:0}}>TREINO {String(index+1).padStart(2,'0')}</div>{editingId===workout.id?<form onSubmit={e=>saveWorkoutName(e,workout)} style={{display:'flex',gap:7,alignItems:'center',flexWrap:'wrap',margin:'7px 0 8px'}}><input autoFocus value={editName} onChange={e=>setEditName(e.target.value)} required aria-label="Novo nome do treino" style={{...inputStyle,flex:'1 1 240px'}}/><button disabled={editing} style={{...goldButton,padding:'10px 13px'}}>{editing?'A GUARDAR…':'GUARDAR'}</button><button type="button" disabled={editing} onClick={cancelEditing} style={ghostButton}>CANCELAR</button></form>:<h3 style={{...title,fontSize:27,marginBottom:5}}>{workout.name}</h3>}<p style={{...muted,margin:0}}>{workout.description||'Sem orientação adicional.'}</p></div>
            <div style={{display:'flex',gap:7,flexWrap:'wrap'}}><button onClick={()=>startEditing(workout)} disabled={editingId!==null} style={ghostButton}>EDITAR</button><button onClick={()=>duplicateWorkout(workout)} style={ghostButton}>DUPLICAR</button><button onClick={()=>loadEx(workout.id)} style={{...goldButton,padding:'10px 13px'}}>{open===workout.id?'FECHAR TREINO':'GERIR EXERCÍCIOS'}</button><button onClick={()=>removeWorkout(workout)} style={dangerButton}>ELIMINAR</button></div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))',gap:8,marginTop:20}}><div style={trainingStat}><span>EXERCÍCIOS</span><b>{exercises.length}</b></div><div style={trainingStat}><span>SÉRIES TOTAIS</span><b>{totalSets}</b></div><div style={trainingStat}><span>ESTADO</span><b style={{fontSize:14,color:open===workout.id&&exercises.length>0?'#81c990':'#e4bd54'}}>{open===workout.id?(exercises.length?'CONFIGURADO':'INCOMPLETO'):'ABRIR'}</b></div></div>
          {open===workout.id&&<div style={{marginTop:22,paddingTop:22,borderTop:'1px solid rgba(255,255,255,.08)'}}><ExerciseEditor session={session} workout={workout} exercises={exercises} onRefresh={()=>loadExercisesAfterChange(workout.id,setEx,session.access_token)}/></div>}
        </div>
      </div>
    })}
    <div style={card}><div style={cardTitle}>HISTÓRICO DE TREINOS CONCLUÍDOS</div>{completedSessions.length===0?<p style={muted}>O cliente ainda não concluiu nenhum treino na plataforma.</p>:<div style={{display:'grid',gap:8}}>{completedSessions.map(item=>{const workout=workouts.find(row=>row.id===item.workout_id);return <div key={item.id} style={adminSessionRow}><div><b>{workout?.name||'Treino'}</b><div style={small}>{formatDate(item.completed_at)}</div></div><span>{item.exercise_logs?.length||0} exercícios</span></div>})}</div>}</div>
  </div>
}

function ExerciseEditor({session,workout,exercises,onRefresh}:{session:Session,workout:any,exercises:any[],onRefresh:()=>void}) {
  const [name,setName]=useState(''),[sets,setSets]=useState(''),[reps,setReps]=useState(''),[rest,setRest]=useState(''),[notes,setNotes]=useState('')
  const [formOpen,setFormOpen]=useState(exercises.length===0),[saving,setSaving]=useState(false),[error,setError]=useState('')
  const add=async(e:React.FormEvent)=>{e.preventDefault();setSaving(true);setError('');try{await createExercise(session.access_token,{workout_id:workout.id,name:name.trim(),sets:sets?Number(sets):null,reps:reps||null,rest_seconds:rest?Number(rest):null,notes:notes.trim()||null,exercise_order:exercises.length});setName('');setSets('');setReps('');setRest('');setNotes('');setFormOpen(false);onRefresh()}catch(e:any){setError(e.message||'Não foi possível adicionar o exercício.')}finally{setSaving(false)}}
  const remove=async(exercise:any)=>{if(!window.confirm(`Eliminar o exercício “${exercise.name}”?`))return;try{await deleteExercise(session.access_token,exercise.id);onRefresh()}catch(e:any){setError(e.message||'Não foi possível eliminar o exercício.')}}
  const duplicate=(exercise:any)=>{setName(`${exercise.name} — variação`);setSets(exercise.sets?.toString()||'');setReps(exercise.reps||'');setRest(exercise.rest_seconds?.toString()||'');setNotes(exercise.notes||'');setFormOpen(true)}
  return <div>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12,marginBottom:14}}><div><div style={cardTitle}>EXERCÍCIOS</div><p style={{...muted,margin:'-9px 0 0'}}>{exercises.length} exercício{exercises.length===1?'':'s'} · {exercises.reduce((sum,item)=>sum+(Number(item.sets)||0),0)} séries no total</p></div><button onClick={()=>setFormOpen(v=>!v)} style={ghostButton}>{formOpen?'FECHAR':'＋ ADICIONAR EXERCÍCIO'}</button></div>
    {error&&<div style={{...errorStyle,marginBottom:12}}>{error}</div>}
    {exercises.length===0&&!formOpen&&<p style={muted}>Ainda não existem exercícios neste treino.</p>}
    <div style={{display:'grid',gap:9}}>{exercises.map((exercise,index)=><div key={exercise.id} style={adminExerciseCard}>
      <div style={exerciseOrder}>{String(index+1).padStart(2,'0')}</div>
      <div style={{flex:1,minWidth:0}}><strong style={{fontFamily:"'League Spartan',sans-serif",fontSize:16}}>{exercise.name}</strong><div style={{display:'flex',gap:7,flexWrap:'wrap',marginTop:9}}><span style={exerciseMetric}><b>{exercise.sets??'—'}</b> SÉRIES</span><span style={exerciseMetric}><b>{exercise.reps??'—'}</b> REPS</span><span style={exerciseMetric}><b>{exercise.rest_seconds??'—'}s</b> DESCANSO</span></div>{exercise.notes&&<p style={{...muted,margin:'10px 0 0'}}>{exercise.notes}</p>}</div>
      <div style={{display:'flex',gap:6,flexWrap:'wrap'}}><button onClick={()=>duplicate(exercise)} style={ghostButton}>DUPLICAR</button><button onClick={()=>remove(exercise)} style={dangerButton}>ELIMINAR</button></div>
    </div>)}</div>
    {formOpen&&<form onSubmit={add} style={{display:'grid',gap:9,marginTop:16,padding:18,border:'1px solid rgba(212,175,55,.2)',background:'rgba(212,175,55,.035)'}}>
      <div style={cardTitle}>NOVO EXERCÍCIO</div>
      <label style={labelStyle}>NOME<input value={name} onChange={e=>setName(e.target.value)} placeholder="Ex.: Supino inclinado com halteres" required style={{...inputStyle,width:'100%',marginTop:6}}/></label>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))',gap:8}}><label style={labelStyle}>SÉRIES<input value={sets} onChange={e=>setSets(e.target.value)} placeholder="4" type="number" min="1" style={{...inputStyle,width:'100%',marginTop:6}}/></label><label style={labelStyle}>REPETIÇÕES<input value={reps} onChange={e=>setReps(e.target.value)} placeholder="8–12" style={{...inputStyle,width:'100%',marginTop:6}}/></label><label style={labelStyle}>DESCANSO (S)<input value={rest} onChange={e=>setRest(e.target.value)} placeholder="90" type="number" min="0" style={{...inputStyle,width:'100%',marginTop:6}}/></label></div>
      <label style={labelStyle}>NOTAS TÉCNICAS<textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Execução, intensidade, cadência ou alternativas…" style={{...inputStyle,width:'100%',minHeight:78,resize:'vertical',marginTop:6}}/></label>
      <button disabled={saving} style={goldButton}>{saving?'A GUARDAR…':'GUARDAR EXERCÍCIO'}</button>
    </form>}
  </div>
}

async function loadExercisesAfterChange(workoutId:number,setExercises:React.Dispatch<React.SetStateAction<Record<number,any[]>>>,token:string){
  const rows=await getWorkoutExercises(token,workoutId)
  setExercises(current=>({...current,[workoutId]:rows}))
}

function NutritionManager({client,session,plans,onRefresh}:{client:any,session:Session,plans:any[],onRefresh:()=>void}) {
  const [name,setName]=useState(''),[cal,setCal]=useState(''),[protein,setProtein]=useState(''),[carbs,setCarbs]=useState(''),[fats,setFats]=useState('')
  const [formOpen,setFormOpen]=useState(plans.length===0),[open,setOpen]=useState<number|null>(null),[meals,setMeals]=useState<Record<number,any[]>>({})
  const [saving,setSaving]=useState(false),[message,setMessage]=useState('')

  const resetForm=()=>{setName('');setCal('');setProtein('');setCarbs('');setFats('')}
  const add=async(e:React.FormEvent)=>{
    e.preventDefault();setSaving(true);setMessage('')
    try{
      await createNutritionPlan(session.access_token,{client_id:client.id,name:name.trim(),calories:cal?Number(cal):null,protein:protein?Number(protein):null,carbohydrates:carbs?Number(carbs):null,fats:fats?Number(fats):null})
      resetForm();setFormOpen(false);setMessage('Plano alimentar criado com sucesso.');onRefresh()
    }catch(e:any){setMessage(e.message||'Não foi possível criar o plano alimentar.')}finally{setSaving(false)}
  }
  const loadMeals=async(id:number)=>{
    if(open===id){setOpen(null);return}
    setMessage('');setOpen(id)
    try{setMeals(current=>({...current,[id]:current[id]||[]}));const rows=await getMeals(session.access_token,id);setMeals(current=>({...current,[id]:rows}))}
    catch(e:any){setMessage(e.message||'Não foi possível carregar as refeições.')}
  }
  const removePlan=async(plan:any)=>{
    if(!window.confirm(`Eliminar o plano “${plan.name}” e as refeições associadas?`))return
    try{await deleteNutritionPlan(session.access_token,plan.id);if(open===plan.id)setOpen(null);onRefresh()}
    catch(e:any){setMessage(e.message||'Não foi possível eliminar o plano.')}
  }
  const duplicatePlan=(plan:any)=>{
    setName(`${plan.name} — cópia`);setCal(plan.calories?.toString()||'');setProtein(plan.protein?.toString()||'');setCarbs(plan.carbohydrates?.toString()||'');setFats(plan.fats?.toString()||'');setFormOpen(true);window.scrollTo({top:0,behavior:'smooth'})
  }

  return <div style={{display:'grid',gap:16}}>
    <div style={nutritionAdminHero}>
      <div>
        <div style={eyebrow}>PLANEAMENTO NUTRICIONAL</div>
        <h3 style={{...title,fontSize:30,marginBottom:8}}>Plano de {client.full_name?.split(' ')[0]||'cliente'}</h3>
        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
          <span style={adminInfoPill}>ATUAL <b>{client.current_weight??'—'} kg</b></span>
          <span style={adminInfoPill}>OBJETIVO <b>{client.goal_weight??'—'} kg</b></span>
          <span style={adminInfoPill}>PLANOS <b>{plans.length}</b></span>
        </div>
      </div>
      <button onClick={()=>{setFormOpen(v=>!v);setMessage('')}} style={goldButton}>{formOpen?'FECHAR':'＋ NOVO PLANO'}</button>
    </div>

    {message&&<div style={message.includes('sucesso')?successStyle:errorStyle}>{message}</div>}

    {formOpen&&<div style={{...card,borderColor:'rgba(212,175,55,.25)'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:12}}><div><div style={cardTitle}>NOVO PLANO ALIMENTAR</div><p style={{...muted,marginTop:-8}}>Define primeiro o objetivo diário. Depois adiciona as refeições.</p></div><button type="button" onClick={()=>{resetForm();setFormOpen(false)}} style={closeButton}>×</button></div>
      <form onSubmit={add} style={{display:'grid',gap:10,marginTop:16}}>
        <label style={labelStyle}>NOME DO PLANO<input value={name} onChange={e=>setName(e.target.value)} placeholder="Ex.: Ganho de massa — 3000 kcal" required style={{...inputStyle,width:'100%',marginTop:6}}/></label>
        <div style={formGrid}>
          <label style={labelStyle}>CALORIAS<input value={cal} onChange={e=>setCal(e.target.value)} placeholder="3000" type="number" min="0" style={{...inputStyle,width:'100%',marginTop:6}}/></label>
          <label style={labelStyle}>PROTEÍNA (G)<input value={protein} onChange={e=>setProtein(e.target.value)} placeholder="180" type="number" min="0" step=".1" style={{...inputStyle,width:'100%',marginTop:6}}/></label>
          <label style={labelStyle}>HIDRATOS (G)<input value={carbs} onChange={e=>setCarbs(e.target.value)} placeholder="400" type="number" min="0" step=".1" style={{...inputStyle,width:'100%',marginTop:6}}/></label>
          <label style={labelStyle}>GORDURA (G)<input value={fats} onChange={e=>setFats(e.target.value)} placeholder="75" type="number" min="0" step=".1" style={{...inputStyle,width:'100%',marginTop:6}}/></label>
        </div>
        <button disabled={saving} style={goldButton}>{saving?'A CRIAR…':'CRIAR PLANO E ADICIONAR REFEIÇÕES'}</button>
      </form>
    </div>}

    {plans.length===0&&!formOpen&&<div style={emptyAdminState}><div style={{fontSize:34}}>＋</div><div style={cardTitle}>AINDA NÃO EXISTEM PLANOS</div><p style={muted}>Cria o primeiro plano alimentar deste cliente.</p><button onClick={()=>setFormOpen(true)} style={goldButton}>CRIAR PRIMEIRO PLANO</button></div>}

    {plans.map((plan,index)=>{
      const planMeals=meals[plan.id]||[]
      const totals=planMeals.reduce((sum:any,m:any)=>({calories:sum.calories+(Number(m.calories)||0),protein:sum.protein+(Number(m.protein)||0),carbohydrates:sum.carbohydrates+(Number(m.carbohydrates)||0),fats:sum.fats+(Number(m.fats)||0)}),{calories:0,protein:0,carbohydrates:0,fats:0})
      return <div key={plan.id} style={{...card,padding:0,overflow:'hidden'}}>
        <div style={{height:3,background:index===0?GOLD:'rgba(255,255,255,.12)'}}/>
        <div style={{padding:24}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:16,flexWrap:'wrap'}}>
            <div><div style={{...eyebrow,marginTop:0}}>{index===0?'PLANO PRINCIPAL':'PLANO ALTERNATIVO'}</div><h3 style={{...title,fontSize:27,marginBottom:4}}>{plan.name}</h3><div style={small}>{open===plan.id?`${planMeals.length} refeições configuradas`:'Abre o plano para gerir as refeições'}</div></div>
            <div style={{display:'flex',gap:7,flexWrap:'wrap'}}><button onClick={()=>duplicatePlan(plan)} style={ghostButton}>DUPLICAR</button><button onClick={()=>loadMeals(plan.id)} style={{...goldButton,padding:'10px 13px'}}>{open===plan.id?'FECHAR PLANO':'GERIR REFEIÇÕES'}</button><button onClick={()=>removePlan(plan)} style={dangerButton}>ELIMINAR</button></div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(110px,1fr))',gap:8,marginTop:20}}>
            <div style={adminMacroCard}><span>CALORIAS</span><b>{plan.calories??'—'}</b><small>kcal</small></div>
            <div style={adminMacroCard}><span>PROTEÍNA</span><b>{plan.protein??'—'}</b><small>g</small></div>
            <div style={adminMacroCard}><span>HIDRATOS</span><b>{plan.carbohydrates??'—'}</b><small>g</small></div>
            <div style={adminMacroCard}><span>GORDURA</span><b>{plan.fats??'—'}</b><small>g</small></div>
          </div>
          {open===plan.id&&<div style={{marginTop:22,paddingTop:22,borderTop:'1px solid rgba(255,255,255,.08)'}}>
            {planMeals.length>0&&<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(120px,1fr))',gap:7,marginBottom:18}}><div style={totalPill}>SOMA DAS REFEIÇÕES</div><div style={totalPill}><b>{totals.calories}</b> kcal</div><div style={totalPill}>P <b>{totals.protein}</b> g</div><div style={totalPill}>HC <b>{totals.carbohydrates}</b> g</div><div style={totalPill}>G <b>{totals.fats}</b> g</div></div>}
            <MealEditor session={session} plan={plan} meals={planMeals} onRefresh={()=>loadMealsAfterChange(plan.id,setMeals,session.access_token)}/>
          </div>}
        </div>
      </div>
    })}
  </div>
}

function MealEditor({session,plan,meals,onRefresh}:{session:Session,plan:any,meals:any[],onRefresh:()=>void}) {
  const [name,setName]=useState(''),[cal,setCal]=useState(''),[protein,setProtein]=useState(''),[carbs,setCarbs]=useState(''),[fats,setFats]=useState(''),[ingredients,setIngredients]=useState(''),[preparation,setPreparation]=useState('')
  const [formOpen,setFormOpen]=useState(meals.length===0),[saving,setSaving]=useState(false),[error,setError]=useState('')
  const add=async(e:React.FormEvent)=>{e.preventDefault();setSaving(true);setError('');try{await createMeal(session.access_token,{nutrition_plan_id:plan.id,name:name.trim(),calories:cal?Number(cal):null,protein:protein?Number(protein):null,carbohydrates:carbs?Number(carbs):null,fats:fats?Number(fats):null,ingredients:ingredients||null,preparation:preparation||null,meal_order:meals.length});setName('');setCal('');setProtein('');setCarbs('');setFats('');setIngredients('');setPreparation('');setFormOpen(false);onRefresh()}catch(e:any){setError(e.message||'Não foi possível adicionar a refeição.')}finally{setSaving(false)}}
  const remove=async(meal:any)=>{if(!window.confirm(`Eliminar a refeição “${meal.name}”?`))return;try{await deleteMeal(session.access_token,meal.id);onRefresh()}catch(e:any){setError(e.message||'Não foi possível eliminar a refeição.')}}
  return <div>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12,marginBottom:14}}><div><div style={cardTitle}>REFEIÇÕES</div><p style={{...muted,margin:'-9px 0 0'}}>Organiza os alimentos pela ordem em que o cliente os deve consumir.</p></div><button onClick={()=>setFormOpen(v=>!v)} style={ghostButton}>{formOpen?'FECHAR':'＋ ADICIONAR REFEIÇÃO'}</button></div>
    {error&&<div style={{...errorStyle,marginBottom:12}}>{error}</div>}
    {meals.length===0&&!formOpen&&<p style={muted}>Ainda não existem refeições neste plano.</p>}
    <div style={{display:'grid',gap:9}}>{meals.map((m,index)=><div key={m.id} style={adminMealCard}><div style={mealOrder}>{String(index+1).padStart(2,'0')}</div><div style={{flex:1,minWidth:0}}><div style={{display:'flex',justifyContent:'space-between',gap:10,flexWrap:'wrap'}}><strong style={{fontFamily:"'League Spartan',sans-serif",fontSize:16}}>{m.name}</strong><span style={{color:GOLD,fontFamily:"'League Spartan',sans-serif",fontSize:13}}>{m.calories??'—'} kcal</span></div><div style={{...small,marginTop:7}}>P {m.protein??'—'}g · HC {m.carbohydrates??'—'}g · G {m.fats??'—'}g</div>{m.ingredients&&<div style={{...small,whiteSpace:'pre-wrap',marginTop:8}}>{m.ingredients}</div>}</div><button onClick={()=>remove(m)} style={dangerButton}>ELIMINAR</button></div>)}</div>
    {formOpen&&<form onSubmit={add} style={{display:'grid',gap:9,marginTop:16,padding:18,border:'1px solid rgba(212,175,55,.2)',background:'rgba(212,175,55,.035)'}}>
      <div style={cardTitle}>NOVA REFEIÇÃO</div>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Nome (ex.: Pequeno-almoço)" required style={inputStyle}/>
      <div style={formGrid}><input value={cal} onChange={e=>setCal(e.target.value)} placeholder="Calorias" type="number" min="0" style={inputStyle}/><input value={protein} onChange={e=>setProtein(e.target.value)} placeholder="Proteína g" type="number" min="0" step=".1" style={inputStyle}/><input value={carbs} onChange={e=>setCarbs(e.target.value)} placeholder="Hidratos g" type="number" min="0" step=".1" style={inputStyle}/><input value={fats} onChange={e=>setFats(e.target.value)} placeholder="Gordura g" type="number" min="0" step=".1" style={inputStyle}/></div>
      <textarea value={ingredients} onChange={e=>setIngredients(e.target.value)} placeholder={'Alimentos e quantidades\nEx.: 100 g aveia\n300 ml leite\n1 banana'} style={{...inputStyle,minHeight:92,resize:'vertical'}}/>
      <textarea value={preparation} onChange={e=>setPreparation(e.target.value)} placeholder="Modo de preparação (opcional)" style={{...inputStyle,minHeight:72,resize:'vertical'}}/>
      <button disabled={saving} style={goldButton}>{saving?'A GUARDAR…':'GUARDAR REFEIÇÃO'}</button>
    </form>}
  </div>
}

async function loadMealsAfterChange(planId:number,setMeals:React.Dispatch<React.SetStateAction<Record<number,any[]>>>,token:string){
  const rows=await getMeals(token,planId)
  setMeals(current=>({...current,[planId]:rows}))
}

function CheckinManager({client,session,checkins,onRefresh}:{client:any,session:Session,checkins:any[],onRefresh:()=>void}) {
  const pending=checkins.filter(item=>!item.reviewed_at).length
  return <div style={{display:'grid',gap:14}}>
    <div style={checkinAdminHero}><div><div style={eyebrow}>ACOMPANHAMENTO</div><h3 style={{...title,fontSize:30,marginBottom:7}}>Check-ins de {client.full_name?.split(' ')[0]}</h3><p style={{...muted,margin:0}}>Revê cada semana e envia uma orientação clara ao cliente.</p></div><div style={reviewCount}><b>{pending}</b><span>POR REVER</span></div></div>
    {checkins.length===0?<div style={emptyAdminState}><div style={cardTitle}>AINDA NÃO EXISTEM CHECK-INS</div><p style={muted}>Quando o cliente enviar o primeiro check-in, aparecerá aqui.</p></div>:checkins.map((item,index)=><AdminCheckinCard key={item.id} item={item} index={checkins.length-index} session={session} onRefresh={onRefresh}/>) }
  </div>
}

function AdminCheckinCard({item,index,session,onRefresh}:{item:any,index:number,session:Session,onRefresh:()=>void}){
  const [feedback,setFeedback]=useState(item.coach_feedback||'')
  const [saving,setSaving]=useState(false),[message,setMessage]=useState('')
  const save=async()=>{
    setSaving(true);setMessage('')
    try{await updateCheckIn(session.access_token,item.id,{coach_feedback:feedback.trim()||null,reviewed_at:new Date().toISOString()});setMessage('Feedback enviado ao cliente.');onRefresh()}
    catch(e:any){setMessage(e.message||'Não foi possível guardar o feedback.')}finally{setSaving(false)}
  }
  return <div style={{...card,borderColor:item.reviewed_at?'rgba(76,166,106,.2)':'rgba(212,175,55,.22)'}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:14,flexWrap:'wrap'}}><div><div style={{display:'flex',gap:8,alignItems:'center'}}><div style={cardTitle}>CHECK-IN {String(index).padStart(2,'0')}</div><span style={{...reviewBadge,color:item.reviewed_at?'#81c990':'#e4bd54',borderColor:item.reviewed_at?'rgba(76,166,106,.3)':'rgba(212,175,55,.25)'}}>{item.reviewed_at?'REVISTO':'NOVO'}</span></div><div style={small}>{item.created_at?.slice(0,10)||'—'}</div></div><button onClick={async()=>{if(window.confirm('Eliminar este check-in?')){await deleteCheckIn(session.access_token,item.id);onRefresh()}}} style={dangerButton}>ELIMINAR</button></div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(105px,1fr))',gap:8,margin:'17px 0'}}><div style={checkinMetric}><span>PESO</span><b>{item.weight??'—'} kg</b></div><div style={checkinMetric}><span>TREINO</span><b>{item.training_rating??'—'}/10</b></div><div style={checkinMetric}><span>NUTRIÇÃO</span><b>{item.nutrition_rating??'—'}/10</b></div><div style={checkinMetric}><span>SONO</span><b>{item.sleep_rating??'—'}/10</b></div><div style={checkinMetric}><span>ENERGIA</span><b>{item.energy_rating??'—'}/10</b></div><div style={checkinMetric}><span>APETITE</span><b>{item.appetite_rating??'—'}/10</b></div></div>
    {item.notes&&<div style={clientNote}><div style={labelStyle}>OBSERVAÇÕES DO CLIENTE</div><p style={{...text,margin:'8px 0 0'}}>{item.notes}</p></div>}
    <div style={{marginTop:14}}><label style={labelStyle}>RESPOSTA DO TREINADOR<textarea value={feedback} onChange={e=>setFeedback(e.target.value)} placeholder="Ex.: Excelente semana. Mantém as calorias e tenta melhorar o sono…" style={{...inputStyle,width:'100%',minHeight:95,resize:'vertical',marginTop:7}}/></label><button onClick={save} disabled={saving||!feedback.trim()} style={{...goldButton,width:'100%',marginTop:8}}>{saving?'A GUARDAR…':item.reviewed_at?'ATUALIZAR FEEDBACK':'ENVIAR FEEDBACK E MARCAR COMO REVISTO'}</button></div>
    {message&&<div style={{...(message.includes('enviado')?successStyle:errorStyle),marginTop:10}}>{message}</div>}
  </div>
}
function WeightProgressChart({client,weights}:{client:any,weights:any[]}){
  const [period,setPeriod]=useState<'30'|'90'|'all'>('all')
  const startRecord=client.initial_weight!=null?{id:'initial',weight:Number(client.initial_weight),recorded_at:client.start_date||weights[0]?.recorded_at||new Date().toISOString().slice(0,10)}:null
  const allRecords=[...(startRecord?[startRecord]:[]),...weights]
    .filter((item,index,array)=>Number.isFinite(Number(item.weight))&&array.findIndex(x=>x.id===item.id)===index)
    .sort((a,b)=>String(a.recorded_at).localeCompare(String(b.recorded_at)))
  const cutoff=period==='all'?null:new Date(Date.now()-Number(period)*86400000)
  const records=cutoff?allRecords.filter(item=>new Date(item.recorded_at)>=cutoff):allRecords
  const shown=records.length?records:allRecords.slice(-1)
  const values=shown.map(item=>Number(item.weight))
  const goal=client.goal_weight==null?null:Number(client.goal_weight)
  const scaleValues=goal==null?values:[...values,goal]
  const rawMin=Math.min(...scaleValues),rawMax=Math.max(...scaleValues)
  const padding=Math.max(1,(rawMax-rawMin)*.18)
  const min=rawMin-padding,max=rawMax+padding,span=max-min||1
  const points=shown.map((item,index)=>({
    ...item,
    x:shown.length===1?50:4+(index/(shown.length-1))*92,
    y:36-((Number(item.weight)-min)/span)*32,
  }))
  const pointString=points.map(p=>`${p.x},${p.y}`).join(' ')
  const goalY=goal==null?null:36-((goal-min)/span)*32
  const first=points[0],last=points[points.length-1]
  const change=first&&last?Number((Number(last.weight)-Number(first.weight)).toFixed(1)):0
  const remaining=goal!=null&&last?Number((goal-Number(last.weight)).toFixed(1)):null
  const direction=change>0?'subiu':change<0?'desceu':'manteve-se'

  if(!shown.length)return <div style={emptyChart}><div style={cardTitle}>EVOLUÇÃO DO PESO</div><p style={muted}>Ainda não existem pesagens. O primeiro peso enviado num check-in aparecerá aqui.</p></div>

  return <div style={progressCard}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:14,flexWrap:'wrap'}}>
      <div><div style={cardTitle}>EVOLUÇÃO DO PESO</div><p style={{...muted,margin:'-8px 0 0'}}>Acompanha a tendência, não apenas um dia isolado.</p></div>
      <div style={{display:'flex',gap:5}}>{([['30','30 DIAS'],['90','90 DIAS'],['all','TOTAL']] as const).map(([key,label])=><button key={key} onClick={()=>setPeriod(key)} style={{...chartFilter,background:period===key?GOLD:'rgba(255,255,255,.04)',color:period===key?'#080808':'rgba(255,255,255,.55)',borderColor:period===key?GOLD:'rgba(255,255,255,.1)'}}>{label}</button>)}</div>
    </div>
    <div style={progressStats}>
      <div style={chartStat}><span>INÍCIO</span><b>{first?.weight??'—'} kg</b></div>
      <div style={chartStat}><span>ATUAL</span><b>{last?.weight??'—'} kg</b></div>
      <div style={chartStat}><span>VARIAÇÃO</span><b style={{color:change===0?WHITE:GOLD}}>{change>0?'+':''}{change} kg</b></div>
      <div style={chartStat}><span>OBJETIVO</span><b>{goal??'—'} kg</b></div>
    </div>
    <div style={chartShell}>
      <div style={chartYAxis}><span>{max.toFixed(1)}</span><span>{((max+min)/2).toFixed(1)}</span><span>{min.toFixed(1)}</span></div>
      <svg viewBox="0 0 100 40" preserveAspectRatio="none" role="img" aria-label={`Gráfico do peso: começou em ${first?.weight} kg e está em ${last?.weight} kg`} style={{width:'100%',height:'100%',overflow:'visible'}}>
        {[4,20,36].map(y=><line key={y} x1="0" x2="100" y1={y} y2={y} stroke="rgba(255,255,255,.07)" strokeWidth=".25"/>) }
        {goalY!=null&&<line x1="0" x2="100" y1={goalY} y2={goalY} stroke="rgba(212,175,55,.35)" strokeWidth=".45" strokeDasharray="2 2"/>}
        {points.length>1&&<polyline points={pointString} fill="none" stroke={GOLD} strokeWidth="1.1" vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round"/>}
        {points.map(point=><circle key={point.id} cx={point.x} cy={point.y} r="1.25" fill={GOLD} stroke="#111" strokeWidth=".55" vectorEffect="non-scaling-stroke"/>)}
      </svg>
      {goalY!=null&&<div style={{...goalMarker,top:`${(goalY/40)*100}%`}}>OBJETIVO {goal} KG</div>}
    </div>
    <div style={{display:'flex',justifyContent:'space-between',gap:10,marginTop:8}}><span style={chartDate}>{first?.recorded_at}</span><span style={chartDate}>{last?.recorded_at}</span></div>
    <div style={trendMessage}>Neste período, o teu peso <b>{direction}</b> {Math.abs(change)} kg.{remaining!=null&&<> Distância atual ao objetivo: <b>{Math.abs(remaining)} kg</b>.</>}</div>
  </div>
}

function ClientView({client,weights,session,onProgressUpdated}:{client:any,weights:any[],session:Session,onProgressUpdated:()=>Promise<void>}) {
  const [tab,setTab]=useState<'profile'|'workout'|'nutrition'|'checkin'|'tasks'|'assessment'|'supplements'|'intake'>('profile')
  const [workouts,setWorkouts]=useState<any[]>([])
  const [exercisesByWorkout,setExercisesByWorkout]=useState<Record<string,any[]>>({})
  const [loadingWorkouts,setLoadingWorkouts]=useState(false)
  const [workoutError,setWorkoutError]=useState('')
  const [workoutSessions,setWorkoutSessions]=useState<any[]>([])
  const [nutritionPlans,setNutritionPlans]=useState<any[]>([])
  const [mealsByPlan,setMealsByPlan]=useState<Record<string,any[]>>({})
  const [loadingNutrition,setLoadingNutrition]=useState(false)
  const [nutritionError,setNutritionError]=useState('')
  const [clientCheckins,setClientCheckins]=useState<any[]>([])
  const [loadingCheckins,setLoadingCheckins]=useState(false)
  const [checkinError,setCheckinError]=useState('')
  const [clientTasks,setClientTasks]=useState<any[]>([])
  const [assessments,setAssessments]=useState<any[]>([]),[supplements,setSupplements]=useState<any[]>([])
  const [clientIntake,setClientIntake]=useState<any>(null)

  const loadWorkouts=useCallback(async()=>{
    if(!client?.id) return
    setLoadingWorkouts(true)
    setWorkoutError('')
    try {
      const plans=await getClientWorkouts(session.access_token,client.id)
      const exerciseLists=await Promise.all(
        plans.map((plan:any)=>getWorkoutExercises(session.access_token,plan.id))
      )
      const grouped:Record<string,any[]>={}
      plans.forEach((plan:any,index:number)=>{grouped[String(plan.id)]=exerciseLists[index]||[]})
      setWorkouts(plans)
      setExercisesByWorkout(grouped)
      setWorkoutSessions(await getWorkoutSessions(session.access_token,client.id))
    } catch(e:any) {
      setWorkoutError(e.message||'Não foi possível carregar os teus treinos.')
    } finally {
      setLoadingWorkouts(false)
    }
  },[client?.id,session.access_token])

  const loadNutrition=useCallback(async()=>{
    if(!client?.id) return
    setLoadingNutrition(true)
    setNutritionError('')
    try {
      const plans=await getNutritionPlans(session.access_token,client.id)
      const mealLists=await Promise.all(
        plans.map((plan:any)=>getMeals(session.access_token,plan.id))
      )
      const grouped:Record<string,any[]>={}
      plans.forEach((plan:any,index:number)=>{grouped[String(plan.id)]=mealLists[index]||[]})
      setNutritionPlans(plans)
      setMealsByPlan(grouped)
    } catch(e:any) {
      setNutritionError(e.message||'Não foi possível carregar o teu plano alimentar.')
    } finally {
      setLoadingNutrition(false)
    }
  },[client?.id,session.access_token])

  const loadClientCheckins=useCallback(async()=>{
    if(!client?.id)return
    setLoadingCheckins(true);setCheckinError('')
    try{setClientCheckins(await getCheckIns(session.access_token,client.id))}
    catch(e:any){setCheckinError(e.message||'Não foi possível carregar os teus check-ins.')}
    finally{setLoadingCheckins(false)}
  },[client?.id,session.access_token])
  const loadClientTasks=useCallback(async()=>{if(client?.id)setClientTasks(await getClientTasks(session.access_token,client.id))},[client?.id,session.access_token])
  const loadAssessments=useCallback(async()=>{if(client?.id)setAssessments(await getMonthlyAssessments(session.access_token,client.id))},[client?.id,session.access_token])
  const loadSupplements=useCallback(async()=>{if(client?.id)setSupplements(await getSupplements(session.access_token,client.id))},[client?.id,session.access_token])
  const loadIntake=useCallback(async()=>{if(client?.id)setClientIntake(await getClientIntake(session.access_token,client.id))},[client?.id,session.access_token])

  useEffect(()=>{loadWorkouts()},[loadWorkouts])
  useEffect(()=>{loadNutrition()},[loadNutrition])
  useEffect(()=>{loadClientCheckins()},[loadClientCheckins])
  useEffect(()=>{loadClientTasks()},[loadClientTasks])
  useEffect(()=>{loadAssessments()},[loadAssessments]);useEffect(()=>{loadSupplements()},[loadSupplements])
  useEffect(()=>{loadIntake()},[loadIntake])

  if(!client) return <div style={{...card,marginTop:28}}><div style={cardTitle}>PERFIL</div><p style={muted}>A tua conta está criada, mas ainda não foi associada a um perfil MASSA+. O administrador terá de configurar os teus dados.</p></div>

  const currentWeight=Number(client.current_weight??client.initial_weight)
  const initialWeight=Number(client.initial_weight)
  const goalWeight=Number(client.goal_weight)
  const hasProgressData=Number.isFinite(currentWeight)&&Number.isFinite(initialWeight)&&Number.isFinite(goalWeight)&&goalWeight!==initialWeight
  const progressPercent=hasProgressData?Math.max(0,Math.min(100,Math.round(((currentWeight-initialWeight)/(goalWeight-initialWeight))*100))):0
  const nextCheckin=nextCheckinDate(clientCheckins)
  const checkinDue=nextCheckin.getTime()<=new Date().setHours(0,0,0,0)
  const weekStart=Date.now()-7*DAY_MS
  const sessionsThisWeek=workoutSessions.filter(item=>new Date(item.completed_at).getTime()>=weekStart).length
  const activeWeeks=trainingWeekStreak(workoutSessions)
  const pendingTasks=clientTasks.filter(item=>!item.is_completed)

  return <div style={{display:'grid',gap:18,marginTop:28}}>
    <div style={clientDashboardGrid}>
      <div style={dashboardMetricCard}><span>PESO ATUAL</span><b>{Number.isFinite(currentWeight)?currentWeight:'—'} <small>kg</small></b><small>Início: {client.initial_weight??'—'} kg</small></div>
      <div style={dashboardMetricCard}><span>OBJETIVO</span><b>{client.goal_weight??'—'} <small>kg</small></b><small>{client.goal||'Objetivo definido pelo treinador'}</small></div>
      <div style={dashboardMetricCard}><span>PROGRESSO</span><b>{hasProgressData?`${progressPercent}%`:'—'}</b><div style={progressTrack}><div style={{...progressFill,width:`${progressPercent}%`}}/></div></div>
      <button onClick={()=>setTab('checkin')} style={{...dashboardMetricCard,...nextCheckinCard,borderColor:checkinDue?'rgba(212,175,55,.45)':'rgba(255,255,255,.08)'}}><span>PRÓXIMO CHECK-IN</span><b>{checkinDue?'DISPONÍVEL':formatDate(nextCheckin.toISOString())}</b><small>{checkinDue?'Preenche o acompanhamento desta semana':'Abre 7 dias após o último envio'}</small></button>
      <button onClick={()=>setTab('workout')} style={{...dashboardMetricCard,...nextCheckinCard}}><span>ATIVIDADE</span><b>{sessionsThisWeek} <small>treinos</small></b><small>Sequência: {activeWeeks} semana{activeWeeks===1?'':'s'} ativa{activeWeeks===1?'':'s'}</small></button>
      <button onClick={()=>setTab('tasks')} style={{...dashboardMetricCard,...nextCheckinCard,borderColor:pendingTasks.length?'rgba(212,175,55,.4)':'rgba(255,255,255,.08)'}}><span>TAREFAS</span><b>{pendingTasks.length}</b><small>{pendingTasks.length?'Tarefas por concluir':'Tudo concluído'}</small></button>
      <button onClick={()=>setTab('intake')} style={{...dashboardMetricCard,...nextCheckinCard,borderColor:clientIntake?.submitted_at?'rgba(76,166,106,.25)':'rgba(212,175,55,.5)'}}><span>FICHA INICIAL</span><b>{clientIntake?.submitted_at?'CONCLUÍDA':'PREENCHER'}</b><small>{clientIntake?.submitted_at?'Dados enviados ao treinador':'Necessária para personalizar o plano'}</small></button>
    </div>
    <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
      {([['profile','PERFIL'],['intake','FICHA INICIAL'],['workout','TREINO'],['nutrition','NUTRIÇÃO'],['checkin','CHECK-IN'],['tasks',`TAREFAS${pendingTasks.length?` (${pendingTasks.length})`:''}`],['assessment','REAVALIAÇÃO'],['supplements','SUPLEMENTAÇÃO']] as const).map(([key,label])=><button key={key} onClick={()=>setTab(key)} style={{...ghostButton,color:tab===key?GOLD:undefined,borderColor:tab===key?'rgba(212,175,55,.48)':undefined,background:tab===key?'rgba(212,175,55,.11)':ghostButton.background,boxShadow:tab===key?'0 0 0 1px rgba(212,175,55,.08) inset':ghostButton.boxShadow}}>{label}</button>)}
    </div>

    {tab==='profile'&&<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:18}}>
      <div style={card}><div style={cardTitle}>OBJETIVO</div><div style={bigNumber}>{client.current_weight ?? client.initial_weight ?? '—'} <small>kg</small></div><p style={muted}>Objetivo: {client.goal_weight ?? '—'} kg</p></div>
      <div style={card}><div style={cardTitle}>DADOS</div><p style={text}><b>Altura:</b> {client.height ?? '—'} cm</p><p style={text}><b>Objetivo:</b> {client.goal ?? '—'}</p><p style={text}><b>Início:</b> {client.start_date ?? '—'}</p></div>
      <div style={card} className="before-photo-card"><div style={cardTitle}>O MEU PONTO DE PARTIDA</div><div className="before-photo-frame client-photo-frame">{client.before_photo_url?<img src={client.before_photo_url} alt="A minha fotografia inicial"/>:<div className="before-photo-empty"><b>FOTOGRAFIA INICIAL</b><span>O teu treinador ainda não adicionou a fotografia do início.</span></div>}</div></div>
      <div style={{gridColumn:'1/-1'}}><ExercisePerformance sessions={workoutSessions} exercisesByWorkout={exercisesByWorkout}/></div>
      <div style={{gridColumn:'1/-1'}}><WeightProgressChart client={client} weights={weights}/></div>
    </div>}

    {tab==='workout'&&<div style={{display:'grid',gap:14}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:14,flexWrap:'wrap'}}>
        <div><div style={cardTitle}>O TEU PLANO DE TREINO</div><p style={{...muted,margin:0}}>Planos e exercícios atribuídos pelo teu treinador.</p></div>
        <button onClick={loadWorkouts} disabled={loadingWorkouts} style={ghostButton}>{loadingWorkouts?'A CARREGAR…':'ATUALIZAR'}</button>
      </div>
      {loadingWorkouts&&<div style={card}>A carregar treinos…</div>}
      {!loadingWorkouts&&workoutError&&<div style={errorStyle}>{workoutError}</div>}
      {!loadingWorkouts&&!workoutError&&workouts.length===0&&<div style={card}><div style={cardTitle}>AINDA SEM TREINO</div><p style={muted}>Ainda não tens nenhum plano de treino atribuído. Quando o teu treinador o criar, aparecerá aqui automaticamente.</p></div>}
      {!loadingWorkouts&&!workoutError&&workouts.map((workout:any,index:number)=>{
        const exercises=exercisesByWorkout[String(workout.id)]||[]
        return <ClientWorkoutCard key={workout.id} workout={workout} exercises={exercises} index={index} client={client} session={session} onCompleted={loadWorkouts}/>
      })}
    </div>}

    {tab==='nutrition'&&<div style={{display:'grid',gap:14}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:14,flexWrap:'wrap'}}>
        <div><div style={cardTitle}>O TEU PLANO ALIMENTAR</div><p style={{...muted,margin:0}}>Objetivos diários e refeições preparados pelo teu treinador.</p></div>
        <button onClick={loadNutrition} disabled={loadingNutrition} style={ghostButton}>{loadingNutrition?'A CARREGAR…':'ATUALIZAR'}</button>
      </div>
      {loadingNutrition&&<div style={card}>A carregar nutrição…</div>}
      {!loadingNutrition&&nutritionError&&<div style={errorStyle}>{nutritionError}</div>}
      {!loadingNutrition&&!nutritionError&&nutritionPlans.length===0&&<div style={card}><div style={cardTitle}>AINDA SEM PLANO ALIMENTAR</div><p style={muted}>Ainda não tens um plano alimentar atribuído. Quando o teu treinador o criar, aparecerá aqui automaticamente.</p></div>}
      {!loadingNutrition&&!nutritionError&&nutritionPlans.map((plan:any,index:number)=>{
        const meals=mealsByPlan[String(plan.id)]||[]
        return <div key={plan.id} style={clientNutritionPlan}>
          <div style={nutritionPlanAccent}/>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:14,flexWrap:'wrap'}}>
            <div><div style={{...eyebrow,marginTop:0}}>PLANO {String(index+1).padStart(2,'0')}</div><h2 style={{...title,fontSize:32,margin:'7px 0 0'}}>{plan.name||'Plano alimentar'}</h2></div>
            <div style={mealCountBadge}><b>{meals.length}</b><span>REFEIÇ{meals.length===1?'ÃO':'ÕES'}</span></div>
          </div>
          <div style={clientMacroGrid}>
            <div style={nutritionMacroStyle('#D4AF37','rgba(212,175,55,.09)')}><div style={macroIcon}>K</div><span style={macroLabel}>CALORIAS</span><b style={macroValue}>{plan.calories??'—'}</b><small style={macroHint}>KCAL / DIA</small></div>
            <div style={nutritionMacroStyle('#FF6B6B','rgba(255,107,107,.085)')}><div style={macroIcon}>P</div><span style={macroLabel}>PROTEÍNA</span><b style={macroValue}>{plan.protein??'—'}<small style={{fontSize:13}}> g</small></b><small style={macroHint}>RECUPERAÇÃO</small></div>
            <div style={nutritionMacroStyle('#4DA3FF','rgba(77,163,255,.085)')}><div style={macroIcon}>HC</div><span style={macroLabel}>HIDRATOS</span><b style={macroValue}>{plan.carbohydrates??'—'}<small style={{fontSize:13}}> g</small></b><small style={macroHint}>ENERGIA</small></div>
            <div style={nutritionMacroStyle('#A78BFA','rgba(167,139,250,.085)')}><div style={macroIcon}>G</div><span style={macroLabel}>GORDURA</span><b style={macroValue}>{plan.fats??'—'}<small style={{fontSize:13}}> g</small></b><small style={macroHint}>EQUILÍBRIO</small></div>
          </div>
          {meals.length===0?<p style={muted}>Este plano ainda não tem refeições.</p>:<div style={{display:'grid',gap:10}}>
            {meals.map((meal:any,mealIndex:number)=><div key={meal.id} style={clientMealCard}>
              <div style={{display:'flex',alignItems:'flex-start',gap:12}}>
                <div style={clientMealNumber}>{String(mealIndex+1).padStart(2,'0')}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',gap:12,flexWrap:'wrap'}}>
                    <strong style={{fontFamily:"'League Spartan',sans-serif",fontSize:17,color:WHITE}}>{meal.name||'Refeição'}</strong>
                    <span style={mealCalories}>{meal.calories??'—'} <small>kcal</small></span>
                  </div>
                  <div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:10}}>
                    <span style={mealMacroStyle('#FF6B6B','rgba(255,107,107,.08)')}><b>P</b> {meal.protein??'—'} g</span>
                    <span style={mealMacroStyle('#4DA3FF','rgba(77,163,255,.08)')}><b>HC</b> {meal.carbohydrates??'—'} g</span>
                    <span style={mealMacroStyle('#A78BFA','rgba(167,139,250,.08)')}><b>G</b> {meal.fats??'—'} g</span>
                  </div>
                  {meal.ingredients&&<div style={mealDetailBox}><div style={labelStyle}>ALIMENTOS / QUANTIDADES</div><p style={{...text,whiteSpace:'pre-wrap',margin:'7px 0 0',lineHeight:1.65}}>{meal.ingredients}</p></div>}
                  {meal.preparation&&<div style={{...mealDetailBox,borderLeftColor:'#4DA3FF'}}><div style={{...labelStyle,color:'#72B6FF'}}>PREPARAÇÃO</div><p style={{...muted,whiteSpace:'pre-wrap',margin:'7px 0 0'}}>{meal.preparation}</p></div>}
                </div>
              </div>
            </div>)}
          </div>}
        </div>
      })}
    </div>}

    {tab==='checkin'&&<ClientCheckinView client={client} session={session} checkins={clientCheckins} loading={loadingCheckins} error={checkinError} onRefresh={loadClientCheckins} onProgressUpdated={onProgressUpdated}/>}
    {tab==='tasks'&&<ClientTasks tasks={clientTasks} session={session} onRefresh={loadClientTasks}/>} 
    {tab==='assessment'&&<ClientAssessment client={client} session={session} items={assessments} onRefresh={loadAssessments}/>} 
    {tab==='supplements'&&<ClientSupplements items={supplements}/>} 
    {tab==='intake'&&<ClientIntakeForm client={client} session={session} value={clientIntake} onRefresh={loadIntake}/>} 
  </div>
}

function ClientTasks({tasks,session,onRefresh}:{tasks:any[],session:Session,onRefresh:()=>Promise<void>}){
  const toggle=async(item:any)=>{await updateClientTask(session.access_token,item.id,{is_completed:!item.is_completed,completed_at:item.is_completed?null:new Date().toISOString()});await onRefresh()}
  return <div style={card}><div style={eyebrow}>PLANO DE AÇÃO</div><h2 style={{...title,fontSize:30,marginBottom:7}}>As tuas tarefas</h2><p style={{...muted,marginTop:0}}>Pequenas ações definidas pelo teu treinador para manteres o progresso.</p>{tasks.length===0?<div style={emptyToolState}>Não tens tarefas atribuídas.</div>:<div style={{display:'grid',gap:9,marginTop:18}}>{tasks.map(item=><button key={item.id} onClick={()=>toggle(item)} style={{...clientTaskCard,borderColor:item.is_completed?'rgba(76,166,106,.25)':'rgba(212,175,55,.18)',opacity:item.is_completed?0.65:1}}><span style={{...taskCheck,background:item.is_completed?'#4ca66a':'transparent'}}>{item.is_completed?'✓':''}</span><span style={{flex:1}}><b>{item.title}</b>{item.details&&<small>{item.details}</small>}<small>{item.due_date?`Prazo: ${item.due_date}`:'Sem prazo definido'}</small></span><strong>{item.is_completed?'CONCLUÍDA':'MARCAR'}</strong></button>)}</div>}</div>
}

function ClientIntakeForm({client,session,value,onRefresh}:{client:any,session:Session,value:any,onRefresh:()=>Promise<void>}){
  const blank:any={birth_date:'',phone:'',profession:'',emergency_contact:'',goal_detail:'',target_date:'',training_experience:'',training_days:'',session_minutes:'',training_location:'',equipment:'',exercise_preferences:'',limitations:'',meals_per_day:'',meal_schedule:'',preferred_foods:'',disliked_foods:'',allergies:'',current_supplements:'',water_liters:'',alcohol:'',sleep_hours:'',sleep_quality:'',stress_level:'',daily_activity:'',medical_conditions:'',medication:'',surgeries:'',medical_restrictions:'',truth_confirmed:false}
  const [form,setForm]=useState<any>(blank),[saving,setSaving]=useState(false),[message,setMessage]=useState('')
  useEffect(()=>{if(value)setForm({...blank,...value})},[value])
  const set=(key:string,next:any)=>setForm((current:any)=>({...current,[key]:next}))
  const textArea=(key:string,label:string,placeholder='')=><label style={labelStyle}>{label}<textarea value={form[key]||''} onChange={e=>set(key,e.target.value)} placeholder={placeholder} style={{...inputStyle,width:'100%',minHeight:68,marginTop:6}}/></label>
  const submit=async(e:React.FormEvent)=>{e.preventDefault();setSaving(true);setMessage('');try{if(!form.truth_confirmed)throw new Error('Confirma a declaração antes de enviar.');const numeric=['training_days','session_minutes','meals_per_day','water_liters','sleep_hours','sleep_quality','stress_level'];const payload={...form,client_id:client.id,submitted_at:new Date().toISOString()};delete payload.id;delete payload.created_at;delete payload.updated_at;delete payload.reviewed_at;numeric.forEach(key=>payload[key]=payload[key]===''?null:Number(payload[key]));await saveClientIntake(session.access_token,payload);setMessage('Ficha inicial enviada ao treinador.');await onRefresh()}catch(e:any){setMessage(e.message)}finally{setSaving(false)}}
  return <form onSubmit={submit} style={{display:'grid',gap:14}}><div style={trainingAdminHero}><div><div style={eyebrow}>ONBOARDING</div><h2 style={{...title,fontSize:30}}>A tua ficha inicial</h2><p style={{...muted,margin:0}}>Estas respostas permitem personalizar o treino e a alimentação.</p></div><span style={{...reviewBadge,color:value?.submitted_at?'#81c990':GOLD}}>{value?.submitted_at?'ENVIADA':'POR PREENCHER'}</span></div>
    <div style={card}><div style={cardTitle}>DADOS E OBJETIVO</div><div style={formGrid}><input value={form.birth_date||''} onChange={e=>set('birth_date',e.target.value)} type="date" style={inputStyle}/><input value={form.phone||''} onChange={e=>set('phone',e.target.value)} placeholder="Telefone" style={inputStyle}/><input value={form.profession||''} onChange={e=>set('profession',e.target.value)} placeholder="Profissão" style={inputStyle}/><input value={form.emergency_contact||''} onChange={e=>set('emergency_contact',e.target.value)} placeholder="Contacto de emergência" style={inputStyle}/></div>{textArea('goal_detail','OBJETIVO DETALHADO','O que pretendes alcançar e porquê?')}<label style={labelStyle}>PRAZO PRETENDIDO<input value={form.target_date||''} onChange={e=>set('target_date',e.target.value)} type="date" style={{...inputStyle,width:'100%',marginTop:6}}/></label></div>
    <div style={card}><div style={cardTitle}>TREINO</div><div style={formGrid}><select value={form.training_experience||''} onChange={e=>set('training_experience',e.target.value)} style={inputStyle}><option value="">Experiência</option><option>Iniciante</option><option>Intermédia</option><option>Avançada</option></select><input value={form.training_days||''} onChange={e=>set('training_days',e.target.value)} type="number" min="0" max="7" placeholder="Dias por semana" style={inputStyle}/><input value={form.session_minutes||''} onChange={e=>set('session_minutes',e.target.value)} type="number" min="10" placeholder="Minutos por sessão" style={inputStyle}/><input value={form.training_location||''} onChange={e=>set('training_location',e.target.value)} placeholder="Ginásio, casa…" style={inputStyle}/></div>{textArea('equipment','EQUIPAMENTO DISPONÍVEL')}{textArea('exercise_preferences','PREFERÊNCIAS DE EXERCÍCIOS')}{textArea('limitations','DORES, LESÕES OU LIMITAÇÕES')}</div>
    <div style={card}><div style={cardTitle}>ALIMENTAÇÃO</div><div style={formGrid}><input value={form.meals_per_day||''} onChange={e=>set('meals_per_day',e.target.value)} type="number" min="1" placeholder="Refeições por dia" style={inputStyle}/><input value={form.water_liters||''} onChange={e=>set('water_liters',e.target.value)} type="number" min="0" step=".1" placeholder="Água por dia (L)" style={inputStyle}/></div>{textArea('meal_schedule','HORÁRIOS HABITUAIS')}{textArea('preferred_foods','ALIMENTOS PREFERIDOS')}{textArea('disliked_foods','ALIMENTOS QUE NÃO GOSTAS')}{textArea('allergies','ALERGIAS OU INTOLERÂNCIAS')}{textArea('current_supplements','SUPLEMENTOS ATUAIS')}{textArea('alcohol','CONSUMO DE ÁLCOOL')}</div>
    <div style={card}><div style={cardTitle}>ROTINA, RECUPERAÇÃO E SAÚDE</div><div style={formGrid}><input value={form.sleep_hours||''} onChange={e=>set('sleep_hours',e.target.value)} type="number" min="0" max="24" step=".5" placeholder="Horas de sono" style={inputStyle}/><input value={form.sleep_quality||''} onChange={e=>set('sleep_quality',e.target.value)} type="number" min="1" max="10" placeholder="Qualidade do sono 1–10" style={inputStyle}/><input value={form.stress_level||''} onChange={e=>set('stress_level',e.target.value)} type="number" min="1" max="10" placeholder="Stress 1–10" style={inputStyle}/></div>{textArea('daily_activity','ATIVIDADE DIÁRIA / TIPO DE TRABALHO')}{textArea('medical_conditions','CONDIÇÕES MÉDICAS RELEVANTES')}{textArea('medication','MEDICAÇÃO')}{textArea('surgeries','CIRURGIAS ANTERIORES')}{textArea('medical_restrictions','RESTRIÇÕES OU RECOMENDAÇÕES MÉDICAS')}<div style={supplementNotice}>Esta ficha não substitui avaliação médica. Se existir dor, doença, medicação ou restrição, procura orientação de um profissional de saúde.</div><label style={{...text,display:'flex',gap:9,alignItems:'flex-start'}}><input checked={Boolean(form.truth_confirmed)} onChange={e=>set('truth_confirmed',e.target.checked)} type="checkbox"/>Confirmo que as informações fornecidas são verdadeiras e completas.</label></div>
    <button disabled={saving} style={goldButton}>{saving?'A ENVIAR…':value?.submitted_at?'ATUALIZAR E REENVIAR FICHA':'ENVIAR FICHA INICIAL'}</button>{message&&<div style={message.includes('enviada')?successStyle:errorStyle}>{message}</div>}
  </form>
}

function ClientAssessment({client,session,items,onRefresh}:{client:any,session:Session,items:any[],onRefresh:()=>Promise<void>}){
  const [form,setForm]=useState({weight:client.current_weight?.toString()||'',waist:'',chest:'',arm:'',thigh:'',hips:'',satisfaction:'',notes:''})
  const [photos,setPhotos]=useState<Record<string,File|undefined>>({}),[saving,setSaving]=useState(false),[message,setMessage]=useState('')
  const latest=items[0],canSubmit=!latest||Date.now()-new Date(latest.assessment_date).getTime()>=28*DAY_MS
  const submit=async(e:React.FormEvent)=>{e.preventDefault();setSaving(true);setMessage('');try{if(!canSubmit)throw new Error('A próxima reavaliação fica disponível 28 dias após a anterior.');const urls:any={};for(const side of ['front','side','back'] as const){if(photos[side])urls[`photo_${side}_url`]=await uploadAssessmentPhoto(session.access_token,client.id,side,photos[side]!)}await createMonthlyAssessment(session.access_token,{client_id:client.id,assessment_date:new Date().toISOString().slice(0,10),weight:form.weight?Number(form.weight):null,waist:form.waist?Number(form.waist):null,chest:form.chest?Number(form.chest):null,arm:form.arm?Number(form.arm):null,thigh:form.thigh?Number(form.thigh):null,hips:form.hips?Number(form.hips):null,satisfaction:form.satisfaction?Number(form.satisfaction):null,client_notes:form.notes.trim()||null,...urls});setMessage('Reavaliação enviada ao treinador.');await onRefresh()}catch(e:any){setMessage(e.message)}finally{setSaving(false)}}
  const field=(key:keyof typeof form,placeholder:string)=><input value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})} type="number" min="0" step=".1" placeholder={placeholder} style={inputStyle}/>
  return <div style={{display:'grid',gap:14}}><div style={card}><div style={eyebrow}>REAVALIAÇÃO MENSAL</div><h2 style={{...title,fontSize:30}}>Regista a tua evolução</h2>{!canSubmit&&<div style={checkinLocked}>Já enviaste a reavaliação deste período.</div>}<form onSubmit={submit} style={{display:'grid',gap:10,marginTop:18}}><div style={formGrid}>{field('weight','Peso kg')}{field('waist','Cintura cm')}{field('chest','Peito cm')}{field('arm','Braço cm')}{field('thigh','Perna cm')}{field('hips','Anca cm')}</div><input value={form.satisfaction} onChange={e=>setForm({...form,satisfaction:e.target.value})} type="number" min="1" max="10" placeholder="Satisfação com o mês (1–10)" style={inputStyle}/><textarea value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} placeholder="Como correu o mês? O que melhorou e o que foi mais difícil?" style={{...inputStyle,minHeight:90}}/><div style={photoUploadGrid}>{(['front','side','back'] as const).map(side=><label key={side} style={photoUploadLabel}>{side==='front'?'FRENTE':side==='side'?'LADO':'COSTAS'}<input type="file" accept="image/*" onChange={e=>setPhotos({...photos,[side]:e.target.files?.[0]})}/><small>{photos[side]?.name||'Escolher fotografia'}</small></label>)}</div><button disabled={saving||!canSubmit} style={goldButton}>{saving?'A ENVIAR…':'ENVIAR REAVALIAÇÃO'}</button>{message&&<div style={message.includes('enviada')?successStyle:errorStyle}>{message}</div>}</form></div>{items.map(item=><div key={item.id} style={card}><div style={cardTitle}>{formatDate(item.assessment_date)} · {item.weight??'—'} kg</div><AssessmentPhotos item={item}/>{item.coach_feedback&&<div style={coachReply}><b>FEEDBACK DO TREINADOR</b><p>{item.coach_feedback}</p></div>}</div>)}</div>
}

function ClientSupplements({items}:{items:any[]}){const active=items.filter(item=>item.is_active);return <div style={card}><div style={eyebrow}>SUPLEMENTAÇÃO</div><h2 style={{...title,fontSize:30}}>O teu protocolo</h2><div style={supplementNotice}>Segue apenas o protocolo definido para ti. Em caso de doença, medicação, gravidez, alergia ou reação adversa, confirma com um médico ou farmacêutico.</div>{active.length===0?<div style={emptyToolState}>Não tens suplementação ativa.</div>:<div style={{display:'grid',gap:9,marginTop:18}}>{active.map(item=><div key={item.id} style={supplementCard}><div style={supplementIcon}>＋</div><div><b>{item.name}</b><div style={small}>DOSE · {item.dosage}</div><div style={small}>MOMENTO · {item.timing||'Conforme indicação'}</div>{item.instructions&&<p style={{...text,marginBottom:0}}>{item.instructions}</p>}</div></div>)}</div>}</div>}

function ExercisePerformance({sessions,exercisesByWorkout}:{sessions:any[],exercisesByWorkout:Record<string,any[]>}){
  const exercises=Object.values(exercisesByWorkout).flat()
  const rows=exercises.map(exercise=>{
    const logs=sessions.flatMap(item=>(item.exercise_logs||[]).map((log:any)=>({...log,completed_at:item.completed_at}))).filter((log:any)=>log.exercise_id===exercise.id).sort((a:any,b:any)=>String(b.completed_at).localeCompare(String(a.completed_at)))
    const weighted=logs.filter((log:any)=>log.weight!=null&&Number.isFinite(Number(log.weight)))
    const best=weighted.length?Math.max(...weighted.map((log:any)=>Number(log.weight))):null
    const delta=weighted.length>1?Number((Number(weighted[0].weight)-Number(weighted[1].weight)).toFixed(1)):null
    return {exercise,latest:logs[0],best,delta}
  }).filter(item=>item.latest)
  return <div style={progressCard}><div style={cardTitle}>DESEMPENHO NOS EXERCÍCIOS</div><p style={{...muted,margin:'-8px 0 16px'}}>Compara a última sessão e acompanha os teus recordes pessoais.</p>{rows.length===0?<p style={muted}>Conclui um treino com carga e repetições para começares a ver a evolução.</p>:<div style={performanceGrid}>{rows.map(item=><div key={item.exercise.id} style={performanceCard}><strong>{item.exercise.name||'Exercício'}</strong><div style={performanceValues}><span>ÚLTIMO <b>{item.latest.weight??'—'} kg × {item.latest.reps}</b></span><span>RECORDE <b>{item.best??'—'} kg</b></span><span>EVOLUÇÃO <b style={{color:item.delta==null?WHITE:item.delta>=0?'#81c990':'#ff8585'}}>{item.delta==null?'—':`${item.delta>0?'+':''}${item.delta} kg`}</b></span></div></div>)}</div>}</div>
}

function ClientWorkoutCard({workout,exercises,index,client,session,onCompleted}:{workout:any,exercises:any[],index:number,client:any,session:Session,onCompleted:()=>Promise<void>}){
  const [openExercise,setOpenExercise]=useState<number|null>(exercises[0]?.id??null)
  const [entries,setEntries]=useState<Record<string,{weight:string,reps:string,rir:string}>>({})
  const [history,setHistory]=useState<any[]>([])
  const [saving,setSaving]=useState(false)
  const [message,setMessage]=useState('')
  const totalSets=exercises.reduce((sum,item)=>sum+(Number(item.sets)||0),0)
  const loadHistory=useCallback(async()=>{try{setHistory(await getWorkoutSessions(session.access_token,client.id,workout.id))}catch(e:any){setMessage(e.message||'Não foi possível carregar o histórico.')}},[session.access_token,client.id,workout.id])
  useEffect(()=>{loadHistory()},[loadHistory])
  const updateEntry=(id:number,key:'weight'|'reps'|'rir',value:string)=>setEntries(current=>({...current,[id]:{weight:'',reps:'',rir:'',...current[id],[key]:value}}))
  const finish=async()=>{
    setSaving(true);setMessage('')
    try{
      const completed=exercises.filter(exercise=>entries[exercise.id]?.reps)
      if(!completed.length)throw new Error('Regista as repetições de pelo menos um exercício.')
      const workoutSession=await createWorkoutSession(session.access_token,{client_id:client.id,workout_id:workout.id,completed_at:new Date().toISOString()})
      if(!workoutSession?.id)throw new Error('Não foi possível criar a sessão de treino.')
      await createExerciseLogs(session.access_token,completed.map(exercise=>({session_id:workoutSession.id,exercise_id:exercise.id,weight:entries[exercise.id].weight===''?null:Number(entries[exercise.id].weight),reps:Number(entries[exercise.id].reps),rir:entries[exercise.id].rir===''?null:Number(entries[exercise.id].rir)})))
      setEntries({});setMessage('Treino concluído e progressão guardada.');await Promise.all([loadHistory(),onCompleted()])
    }catch(e:any){setMessage(e.message||'Não foi possível guardar o treino.')}finally{setSaving(false)}
  }
  return <div style={clientWorkoutPlan}>
    <div style={workoutPlanAccent}/>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:16,flexWrap:'wrap'}}>
      <div><div style={{...eyebrow,marginTop:0}}>TREINO {String(index+1).padStart(2,'0')}</div><h2 style={{...title,fontSize:32,margin:'7px 0 5px'}}>{workout.name||workout.title||'Plano de treino'}</h2>{workout.description&&<p style={{...muted,margin:0,maxWidth:650}}>{workout.description}</p>}</div>
      <div style={{display:'flex',gap:7}}><div style={workoutCountBadge}><b>{exercises.length}</b><span>EXERCÍCIOS</span></div><div style={workoutCountBadge}><b>{totalSets}</b><span>SÉRIES</span></div></div>
    </div>
    {exercises.length===0?<div style={emptyWorkoutState}><div style={cardTitle}>TREINO EM PREPARAÇÃO</div><p style={muted}>O teu treinador ainda não adicionou exercícios a este plano.</p></div>:<div style={{display:'grid',gap:9,marginTop:22}}>
      {exercises.map((exercise:any,exerciseIndex:number)=>{
        const isOpen=openExercise===exercise.id
        return <div key={exercise.id} style={{...clientExerciseCard,borderColor:isOpen?'rgba(212,175,55,.24)':'rgba(255,255,255,.085)'}}>
          <button onClick={()=>setOpenExercise(isOpen?null:exercise.id)} style={exerciseHeader} aria-expanded={isOpen}>
            <div style={clientExerciseNumber}>{String(exerciseIndex+1).padStart(2,'0')}</div>
            <div style={{flex:1,minWidth:0,textAlign:'left'}}><strong style={{fontFamily:"'League Spartan',sans-serif",fontSize:16,color:WHITE}}>{exercise.name||exercise.exercise_name||'Exercício'}</strong><div style={{...small,marginTop:4}}>{isOpen?'Ocultar detalhes':'Ver execução e detalhes'}</div></div>
            <span style={{...exerciseChevron,transform:isOpen?'rotate(45deg)':'none'}}>＋</span>
          </button>
          <div style={clientExerciseMetrics}>
            <div style={exerciseMetricStyle('#D4AF37','rgba(212,175,55,.075)')}><span>SÉRIES</span><b>{exercise.sets??'—'}</b></div>
            <div style={exerciseMetricStyle('#4DA3FF','rgba(77,163,255,.075)')}><span>REPETIÇÕES</span><b>{exercise.reps??exercise.repetitions??'—'}</b></div>
            <div style={exerciseMetricStyle('#A78BFA','rgba(167,139,250,.075)')}><span>DESCANSO</span><b>{exercise.rest??exercise.rest_seconds??'—'}{(exercise.rest??exercise.rest_seconds)!=null?'s':''}</b></div>
          </div>
          {isOpen&&<div style={exerciseDetails}>
            {exercise.notes?<><div style={{...labelStyle,color:'#E7C75E'}}>NOTAS DO TREINADOR</div><p style={{...text,margin:'8px 0 0',lineHeight:1.65}}>{exercise.notes}</p></>:<p style={{...muted,margin:0}}>Mantém uma execução controlada e respeita as séries, repetições e descanso indicados.</p>}
            <div style={exerciseLogGrid}><label style={labelStyle}>CARGA (KG)<input value={entries[exercise.id]?.weight||''} onChange={e=>updateEntry(exercise.id,'weight',e.target.value)} type="number" min="0" step=".5" placeholder="Ex.: 80" style={{...inputStyle,width:'100%',marginTop:6}}/></label><label style={labelStyle}>REPETIÇÕES<input value={entries[exercise.id]?.reps||''} onChange={e=>updateEntry(exercise.id,'reps',e.target.value)} type="number" min="1" placeholder="Ex.: 10" style={{...inputStyle,width:'100%',marginTop:6}}/></label><label style={labelStyle}>RIR<input value={entries[exercise.id]?.rir||''} onChange={e=>updateEntry(exercise.id,'rir',e.target.value)} type="number" min="0" max="10" placeholder="Ex.: 2" style={{...inputStyle,width:'100%',marginTop:6}}/></label></div>
          </div>}
        </div>
      })}
    </div>}
    {exercises.length>0&&<div style={{marginTop:16}}><button onClick={finish} disabled={saving} style={{...goldButton,width:'100%'}}>{saving?'A GUARDAR…':'CONCLUIR TREINO E GUARDAR PROGRESSÃO'}</button>{message&&<div style={{...(message.includes('guardada')?successStyle:errorStyle),marginTop:9}}>{message}</div>}</div>}
    <div style={{marginTop:18,paddingTop:16,borderTop:'1px solid rgba(255,255,255,.08)'}}><div style={cardTitle}>ÚLTIMAS SESSÕES</div>{history.length===0?<p style={muted}>Ainda não existem sessões concluídas.</p>:<div style={{display:'grid',gap:7}}>{history.slice(0,5).map(item=><div key={item.id} style={sessionHistoryRow}><b>{formatDate(item.completed_at)}</b><span>{item.exercise_logs?.length||0} exercícios registados</span></div>)}</div>}</div>
  </div>
}

function ClientCheckinView({client,session,checkins,loading,error,onRefresh,onProgressUpdated}:{client:any,session:Session,checkins:any[],loading:boolean,error:string,onRefresh:()=>Promise<void>,onProgressUpdated:()=>Promise<void>}){
  const [weight,setWeight]=useState(client.current_weight?.toString()||'')
  const [training,setTraining]=useState('')
  const [nutrition,setNutrition]=useState('')
  const [sleep,setSleep]=useState('')
  const [energy,setEnergy]=useState('')
  const [appetite,setAppetite]=useState('')
  const [notes,setNotes]=useState('')
  const [saving,setSaving]=useState(false)
  const [message,setMessage]=useState('')
  const ratings=Array.from({length:10},(_,i)=>i+1)
  const nextCheckin=nextCheckinDate(checkins)
  const checkinDue=nextCheckin.getTime()<=new Date().setHours(0,0,0,0)

  const submit=async(e:React.FormEvent)=>{
    e.preventDefault();setSaving(true);setMessage('')
    try{
      if(!checkinDue)throw new Error(`O próximo check-in fica disponível em ${formatDate(nextCheckin.toISOString())}.`)
      if(!training||!nutrition||!sleep||!energy||!appetite)throw new Error('Preenche todas as avaliações antes de enviar.')
      const numericWeight=weight?Number(weight):null
      if(numericWeight!==null&&(!Number.isFinite(numericWeight)||numericWeight<=0))throw new Error('Introduz um peso válido.')
      await createCheckIn(session.access_token,{client_id:client.id,weight:numericWeight,training_rating:Number(training),nutrition_rating:Number(nutrition),sleep_rating:Number(sleep),energy_rating:Number(energy),appetite_rating:Number(appetite),notes:notes.trim()||null})
      if(numericWeight!==null){
        await addWeightProgress(session.access_token,{client_id:client.id,weight:numericWeight,recorded_at:new Date().toISOString().slice(0,10)})
        await updateClientProfile(session.access_token,client.id,{current_weight:numericWeight})
      }
      setTraining('');setNutrition('');setSleep('');setEnergy('');setAppetite('');setNotes('')
      setMessage('Check-in enviado com sucesso. O teu treinador já o pode consultar.')
      await Promise.all([onRefresh(),onProgressUpdated()])
    }catch(e:any){setMessage(e.message||'Não foi possível enviar o check-in.')}finally{setSaving(false)}
  }

  return <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:16,alignItems:'start'}}>
    <div style={card}>
      <div style={eyebrow}>ACOMPANHAMENTO SEMANAL</div>
      <h2 style={{...title,fontSize:30,marginBottom:8}}>Como correu a tua semana?</h2>
      <p style={{...muted,marginTop:0}}>Responde com sinceridade. Esta informação ajuda o teu treinador a ajustar o plano.</p>
      {!loading&&!checkinDue&&<div style={checkinLocked}>Já enviaste o check-in desta semana. O próximo fica disponível em <b>{formatDate(nextCheckin.toISOString())}</b>.</div>}
      <form onSubmit={submit} style={{display:'grid',gap:16,marginTop:24}}>
        <label style={labelStyle}>PESO ATUAL (KG)<input value={weight} onChange={e=>setWeight(e.target.value)} type="number" min="0" step=".1" placeholder="Ex.: 74.5" style={{...inputStyle,width:'100%',marginTop:7}}/></label>
        <RatingField label="COMO CORREU O TREINO?" value={training} onChange={setTraining} ratings={ratings}/>
        <RatingField label="COMO CORREU A ALIMENTAÇÃO?" value={nutrition} onChange={setNutrition} ratings={ratings}/>
        <RatingField label="COMO ESTEVE O SONO?" value={sleep} onChange={setSleep} ratings={ratings}/>
        <RatingField label="COMO ESTEVE A ENERGIA?" value={energy} onChange={setEnergy} ratings={ratings}/>
        <RatingField label="COMO ESTEVE O APETITE?" value={appetite} onChange={setAppetite} ratings={ratings}/>
        <label style={labelStyle}>OBSERVAÇÕES<textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Dificuldades, progressos, fome, dores ou algo que queiras partilhar…" style={{...inputStyle,width:'100%',minHeight:110,resize:'vertical',marginTop:7}}/></label>
        {message&&<div style={message.includes('sucesso')?successStyle:errorStyle}>{message}</div>}
        <button disabled={saving||loading||!checkinDue} style={goldButton}>{saving?'A ENVIAR…':checkinDue?'ENVIAR CHECK-IN':'CHECK-IN SEMANAL JÁ ENVIADO'}</button>
      </form>
    </div>

    <div style={{display:'grid',gap:12}}>
      <div style={checkinTip}><div style={cardTitle}>ESCALA DE AVALIAÇÃO</div><p style={{...muted,margin:0}}><b style={{color:WHITE}}>1–3</b> Difícil · <b style={{color:WHITE}}>4–6</b> Razoável · <b style={{color:WHITE}}>7–8</b> Bom · <b style={{color:WHITE}}>9–10</b> Excelente</p></div>
      <div style={card}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:10}}><div style={cardTitle}>HISTÓRICO</div><button onClick={onRefresh} disabled={loading} style={ghostButton}>ATUALIZAR</button></div>
        {loading?<p style={muted}>A carregar check-ins…</p>:error?<div style={errorStyle}>{error}</div>:checkins.length===0?<p style={muted}>Ainda não enviaste nenhum check-in.</p>:<div style={{display:'grid',gap:9}}>{checkins.map((item,index)=><div key={item.id} style={clientCheckinCard}>
          <div style={{display:'flex',justifyContent:'space-between',gap:10}}><div style={{display:'flex',gap:7,alignItems:'center'}}><strong style={{fontFamily:"'League Spartan',sans-serif"}}>CHECK-IN {String(checkins.length-index).padStart(2,'0')}</strong><span style={{...reviewBadge,color:item.reviewed_at?'#81c990':'#e4bd54'}}>{item.reviewed_at?'RESPONDIDO':'A AGUARDAR'}</span></div><span style={small}>{item.created_at?.slice(0,10)||'—'}</span></div>
          <div style={{display:'flex',gap:6,flexWrap:'wrap',marginTop:10}}><span style={checkinScore}>TREINO <b>{item.training_rating??'—'}/10</b></span><span style={checkinScore}>NUTRIÇÃO <b>{item.nutrition_rating??'—'}/10</b></span><span style={checkinScore}>SONO <b>{item.sleep_rating??'—'}/10</b></span><span style={checkinScore}>ENERGIA <b>{item.energy_rating??'—'}/10</b></span><span style={checkinScore}>APETITE <b>{item.appetite_rating??'—'}/10</b></span></div>
          <div style={{...small,marginTop:9}}>Peso: {item.weight??'—'} kg</div>
          {item.notes&&<p style={{...muted,margin:'9px 0 0'}}>{item.notes}</p>}
          {item.coach_feedback&&<div style={coachReply}><div style={labelStyle}>RESPOSTA DO TREINADOR</div><p style={{...text,margin:'8px 0 0'}}>{item.coach_feedback}</p></div>}
        </div>)}</div>}
      </div>
    </div>
  </div>
}

function RatingField({label,value,onChange,ratings}:{label:string,value:string,onChange:(value:string)=>void,ratings:number[]}){
  return <div><div style={labelStyle}>{label}</div><div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:5,marginTop:8}}>{ratings.map(r=><button key={r} type="button" onClick={()=>onChange(String(r))} aria-pressed={value===String(r)} style={{...ratingButton,background:value===String(r)?GOLD:'rgba(255,255,255,.035)',borderColor:value===String(r)?GOLD:'rgba(255,255,255,.1)',color:value===String(r)?'#090909':'rgba(255,255,255,.65)'}}>{r}</button>)}</div></div>
}

function GoalChooser({onSelect,onClose}:{onSelect:(page:number)=>void,onClose:()=>void}){
  return <div style={journeyBackdrop}>
    <div style={journeyModal}>
      <div style={{...brand,fontSize:17}}>MASSA<span>+</span></div>
      <div style={eyebrow}>ESCOLHE O TEU PERCURSO</div>
      <h2 style={{...title,fontSize:'clamp(32px,5vw,52px)',maxWidth:680}}>Qual é o teu objetivo?</h2>
      <p style={{...muted,maxWidth:620,marginBottom:24}}>Podes consultar todo o e-book a qualquer momento. Esta escolha leva-te diretamente ao conteúdo mais relevante.</p>
      <div style={journeyGrid}>
        <button onClick={()=>onSelect(4)} style={journeyCard}>
          <span style={journeyNumber}>01</span><span style={journeyTag}>CONSTRUIR</span>
          <strong>GANHAR MASSA MUSCULAR</strong>
          <small>Calorias, macros, refeições, hipertrofia e progressão.</small>
          <span style={journeyAction}>COMEÇAR PERCURSO →</span>
        </button>
        <button onClick={()=>onSelect(35)} style={{...journeyCard,background:'linear-gradient(145deg,rgba(212,175,55,.12),rgba(255,255,255,.025))',borderColor:'rgba(212,175,55,.3)'}}>
          <span style={journeyNumber}>02</span><span style={journeyTag}>DEFINIR</span>
          <strong>PERDER GORDURA</strong>
          <small>Défice, saciedade, cardio, plateaus e plano de 12 semanas.</small>
          <span style={journeyAction}>COMEÇAR PERCURSO →</span>
        </button>
      </div>
      <button onClick={onClose} style={{...ghostButton,marginTop:18}}>VER O E-BOOK COMPLETO</button>
    </div>
  </div>
}

function ToolsPanel({onClose,onGo}:{onClose:()=>void,onGo:(page:number)=>void}){
  const [sex,setSex]=useState<'male'|'female'>('male')
  const [age,setAge]=useState('30'),[weight,setWeight]=useState('75'),[height,setHeight]=useState('175')
  const [activity,setActivity]=useState('1.55'),[goal,setGoal]=useState<'gain'|'maintain'|'loss'>('gain')
  const w=Number(weight),h=Number(height),a=Number(age)
  const bmr=w&&h&&a?10*w+6.25*h-5*a+(sex==='male'?5:-161):0
  const maintenance=Math.round(bmr*Number(activity))
  const target=goal==='gain'?Math.round(maintenance*1.10):goal==='loss'?Math.round(maintenance*.85):maintenance
  const links=[
    ['REGISTO DE PROGRESSO','Peso, medidas e evolução',28],['DIÁRIO DE TREINO','Séries, repetições e cargas',29],
    ['LISTA DE COMPRAS','Checklist alimentar',30],['HÁBITOS','Consistência diária',31],
    ['PLANEADOR SEMANAL','Organiza treino e refeições',32],['ANTES E DEPOIS','Registo visual',33],
  ] as const
  return <div style={toolsBackdrop}>
    <div style={toolsModal}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:20}}><div><div style={eyebrow}>FERRAMENTAS MASSA+</div><h2 style={{...title,fontSize:38}}>Calcula. Planeia. Regista.</h2><p style={{...muted,margin:0}}>Recursos rápidos para transformar informação em ação.</p></div><button onClick={onClose} style={closeButton}>×</button></div>
      <div style={toolsLayout}>
        <div style={calculatorCard}>
          <div style={cardTitle}>CALCULADORA DE CALORIAS</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
            <select value={sex} onChange={e=>setSex(e.target.value as 'male'|'female')} style={inputStyle}><option value="male">Masculino</option><option value="female">Feminino</option></select>
            <input value={age} onChange={e=>setAge(e.target.value)} type="number" min="18" placeholder="Idade" style={inputStyle}/>
            <input value={weight} onChange={e=>setWeight(e.target.value)} type="number" min="1" step=".1" placeholder="Peso kg" style={inputStyle}/>
            <input value={height} onChange={e=>setHeight(e.target.value)} type="number" min="1" placeholder="Altura cm" style={inputStyle}/>
            <select value={activity} onChange={e=>setActivity(e.target.value)} style={{...inputStyle,gridColumn:'1/-1'}}><option value="1.2">Sedentário</option><option value="1.375">Atividade ligeira</option><option value="1.55">Atividade moderada</option><option value="1.725">Muito ativo</option></select>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:6,marginTop:9}}>{([['gain','GANHAR'],['maintain','MANTER'],['loss','PERDER']] as const).map(([k,l])=><button key={k} onClick={()=>setGoal(k)} style={{...goalToggle,background:goal===k?GOLD:'rgba(255,255,255,.04)',color:goal===k?'#080808':'rgba(255,255,255,.55)',borderColor:goal===k?GOLD:'rgba(255,255,255,.1)'}}>{l}</button>)}</div>
          <div style={calculatorResult}><span>ESTIMATIVA DIÁRIA</span><b>{target||'—'}</b><small>kcal</small><div>Manutenção estimada: {maintenance||'—'} kcal</div></div>
          <p style={{...muted,fontSize:10,marginBottom:0}}>Estimativa inicial pela fórmula Mifflin–St Jeor. Ajusta através da tendência do peso e procura acompanhamento profissional quando necessário.</p>
        </div>
        <div><div style={cardTitle}>MODELOS DO E-BOOK</div><div style={toolLinksGrid}>{links.map(([name,desc,page])=><button key={name} onClick={()=>onGo(page)} style={toolLinkCard}><strong>{name}</strong><small>{desc}</small><span>ABRIR →</span></button>)}</div></div>
      </div>
    </div>
  </div>
}

function Ebook() {
  const [current, setCurrent] = useState(0), [menuOpen,setMenuOpen]=useState(false), [scale,setScale]=useState(1)
  const [goalOpen,setGoalOpen]=useState(true),[toolsOpen,setToolsOpen]=useState(false)
  const PAGE_W=794,PAGE_H=1123
  useEffect(()=>{const f=()=>{const sideSpace=window.innerWidth<700?32:120;const w=window.innerWidth-sideSpace,h=window.innerHeight-140;setScale(Math.min(1,w/PAGE_W,h/PAGE_H))};f();window.addEventListener('resize',f);return()=>window.removeEventListener('resize',f)},[])
  const prev=useCallback(()=>setCurrent(c=>Math.max(0,c-1)),[]), next=useCallback(()=>setCurrent(c=>Math.min(PAGES.length-1,c+1)),[])
  useEffect(()=>{const onKey=(e:KeyboardEvent)=>{if(e.key==='ArrowRight'||e.key==='ArrowDown')next();if(e.key==='ArrowLeft'||e.key==='ArrowUp')prev();if(e.key==='Escape')setMenuOpen(false)};window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey)},[prev,next])
  const CurrentPage=PAGES[current].component
  return <div style={{minHeight:'100vh',background:'linear-gradient(135deg,#141414 0%,#1C1C1C 50%,#111 100%)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',overflow:'hidden',position:'relative',userSelect:'none'}}>
    <div style={{position:'absolute',width:PAGE_W*scale+60,height:PAGE_H*scale+60,background:'radial-gradient(ellipse,rgba(212,175,55,.06) 0%,transparent 70%)',borderRadius:'50%',pointerEvents:'none'}}/>
    <div className="ebook-header" style={{position:'fixed',top:0,left:0,right:0,height:48,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 24px',background:'rgba(11,11,11,.9)',backdropFilter:'blur(12px)',borderBottom:'1px solid rgba(212,175,55,.12)',zIndex:100}}>
      <div className="ebook-brand" style={{display:'flex',alignItems:'center',gap:10}}><span style={{fontFamily:"'League Spartan',sans-serif",fontSize:13,fontWeight:800,letterSpacing:'.25em',color:GOLD}}>MASSA+</span><span className="ebook-brand-rule" style={{width:1,height:16,background:'rgba(255,255,255,.1)'}}/><span className="ebook-subtitle" style={{fontFamily:"'Inter',sans-serif",fontSize:10,color:'rgba(255,255,255,.35)',letterSpacing:'.06em'}}>Ganhar músculo · Perder gordura · Transformar</span></div>
      <div className="ebook-section-nav" style={{display:'flex',gap:4}}>{SECTIONS.map(({label,range})=><button key={label} onClick={()=>setCurrent(range[0])} style={{background:current>=range[0]&&current<=range[1]?'rgba(212,175,55,.15)':'transparent',border:current>=range[0]&&current<=range[1]?'1px solid rgba(212,175,55,.3)':'1px solid transparent',color:current>=range[0]&&current<=range[1]?GOLD:'rgba(255,255,255,.35)',fontFamily:"'League Spartan',sans-serif",fontSize:9,fontWeight:700,letterSpacing:'.14em',textTransform:'uppercase',padding:'5px 10px',cursor:'pointer'}}>{label}</button>)}<button onClick={()=>setToolsOpen(true)} style={{...ghostButton,color:current>=28&&current<=34?GOLD:undefined}}>FERRAMENTAS</button></div>
      <div className="ebook-actions" style={{display:'flex',alignItems:'center',gap:12}}><span className="ebook-page-count" style={{fontFamily:"'League Spartan',sans-serif",fontSize:11,color:'rgba(255,255,255,.35)'}}><span style={{color:GOLD,fontWeight:700}}>{current+1}</span> / {PAGES.length}</span><button className="ebook-mobile-tools" onClick={()=>setToolsOpen(true)} style={ghostButton}>FERRAM.</button><button onClick={()=>setMenuOpen(o=>!o)} style={ghostButton}>PÁGINAS</button><button onClick={()=>{window.location.hash='area'}} style={ghostButton}>ÁREA</button></div>
    </div>
    {menuOpen&&<div style={{position:'fixed',top:48,right:0,width:260,height:'calc(100vh - 48px)',background:'rgba(11,11,11,.97)',borderLeft:'1px solid rgba(212,175,55,.15)',overflowY:'auto',zIndex:99,padding:'16px 0'}}>{PAGES.map((p,i)=><button key={i} onClick={()=>{setCurrent(i);setMenuOpen(false)}} style={{display:'flex',alignItems:'center',gap:10,width:'100%',padding:'9px 16px',background:i===current?'rgba(212,175,55,.1)':'transparent',border:'none',borderLeft:i===current?`2px solid ${GOLD}`:'2px solid transparent',cursor:'pointer',textAlign:'left'}}><span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:12,color:i===current?GOLD:'rgba(255,255,255,.25)',minWidth:24}}>{i+1}</span><span style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:i===current?WHITE:'rgba(255,255,255,.45)'}}>{p.title}</span></button>)}</div>}
    <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',paddingTop:48,paddingBottom:72,width:'100%'}} onClick={()=>menuOpen&&setMenuOpen(false)}>
      <button onClick={prev} disabled={current===0} style={{...arrowStyle,left:16,color:current===0?'rgba(255,255,255,.15)':GOLD}}>{'←'}</button>
      <div style={{transform:`scale(${scale})`,transformOrigin:'center center',boxShadow:'0 32px 80px rgba(0,0,0,.6),0 0 0 1px rgba(212,175,55,.08)'}}><CurrentPage/></div>
      <button onClick={next} disabled={current===PAGES.length-1} style={{...arrowStyle,right:menuOpen?276:16,color:current===PAGES.length-1?'rgba(255,255,255,.15)':GOLD}}>{'→'}</button>
    </div>
    <div className="ebook-footer" style={{position:'fixed',bottom:0,left:0,right:menuOpen?260:0,height:52,display:'flex',alignItems:'center',background:'rgba(11,11,11,.88)',backdropFilter:'blur(12px)',borderTop:'1px solid rgba(255,255,255,.05)',zIndex:100,padding:'0 50px'}}><div style={{flex:1,height:3,background:'rgba(255,255,255,.06)',borderRadius:2,position:'relative',overflow:'hidden'}}><div style={{position:'absolute',left:0,top:0,height:'100%',width:`${((current+1)/PAGES.length)*100}%`,background:GOLD,transition:'width .3s ease'}}/></div><div className="ebook-current-title" style={{marginLeft:14,fontFamily:"'Inter',sans-serif",fontSize:10,color:'rgba(255,255,255,.3)',whiteSpace:'nowrap',minWidth:120,textAlign:'right'}}>{PAGES[current].title}</div><div className="ebook-dots" style={{marginLeft:14,display:'flex',gap:2}}>{PAGES.map((_,i)=><button key={i} onClick={()=>setCurrent(i)} style={{width:i===current?16:6,height:6,borderRadius:3,background:i===current?GOLD:'rgba(255,255,255,.12)',border:'none',cursor:'pointer',padding:0}}/>)}</div></div>
    {goalOpen&&<GoalChooser onSelect={page=>{setCurrent(page);setGoalOpen(false)}} onClose={()=>setGoalOpen(false)}/>} 
    {toolsOpen&&<ToolsPanel onClose={()=>setToolsOpen(false)} onGo={page=>{setCurrent(page);setToolsOpen(false)}}/>}
  </div>
}

export default function App(){
  const [session,setSessionState]=useState<Session|null>(getSession())
  const [mode,setMode]=useState<'ebook'|'login'|'dashboard'>(()=>window.location.hash==='#area'?(getSession()?'dashboard':'login'):'ebook')
  const [admin,setAdmin]=useState(false)
  useEffect(()=>{if(session){isAdmin(session.access_token).then(setAdmin).catch(()=>setAdmin(false))}},[session])
  useEffect(()=>{
    const renew=async()=>{const stored=getSession();if(!stored?.refresh_token)return;try{setSessionState(await refreshSession(stored))}catch{signOut();setSessionState(null);setAdmin(false);if(window.location.hash==='#area')setMode('login')}}
    renew();const timer=window.setInterval(renew,45*60*1000);return()=>window.clearInterval(timer)
  },[])
  const login=(s:Session,a:boolean)=>{setSessionState(s);setAdmin(a);setMode('dashboard');window.location.hash='area'}
  const logout=()=>{setSessionState(null);setAdmin(false);setMode('ebook');window.location.hash=''}
  const openEbook=()=>{setMode('ebook');window.location.hash=''}
  useEffect(()=>{const onHash=()=>{if(window.location.hash==='#area')setMode(session?'dashboard':'login');else setMode('ebook')};window.addEventListener('hashchange',onHash);return()=>window.removeEventListener('hashchange',onHash)},[session])
  if(mode==='login') return <Login onLogin={login}/>
  if(mode==='dashboard'&&session) return <Dashboard session={session} admin={admin} onLogout={logout} onEbook={openEbook}/>
  return <Ebook/>
}

const shellStyle:any={minHeight:'100vh',background:'radial-gradient(circle at top,#1c1c1c,#080808 60%)',display:'grid',placeItems:'center',padding:24,color:WHITE}
const panelStyle:any={width:'min(440px,100%)',background:'linear-gradient(145deg,#151515,#0d0d0d)',border:'1px solid rgba(212,175,55,.22)',borderRadius:18,padding:'40px',boxShadow:'0 28px 90px rgba(0,0,0,.62),0 0 0 1px rgba(255,255,255,.025) inset'}
const brand:any={fontFamily:"'League Spartan',sans-serif",fontWeight:900,letterSpacing:'.22em',fontSize:20,color:GOLD}
const eyebrow:any={fontFamily:"'League Spartan',sans-serif",fontSize:10,letterSpacing:'.18em',color:GOLD,marginTop:36}
const title:any={fontFamily:"'League Spartan',sans-serif",fontSize:'clamp(30px,5vw,48px)',lineHeight:.95,textTransform:'uppercase',margin:'10px 0 12px',color:WHITE}
const muted:any={color:'rgba(255,255,255,.48)',fontFamily:"'Inter',sans-serif",fontSize:13,lineHeight:1.6}
const inputStyle:any={background:'rgba(5,5,5,.72)',border:'1px solid rgba(255,255,255,.14)',borderRadius:8,color:WHITE,padding:'13px 14px',fontSize:14,outline:'none',boxShadow:'0 1px 0 rgba(255,255,255,.025) inset'}
const goldButton:any={background:'linear-gradient(135deg,#E2C45A,#C89E28)',border:'1px solid rgba(255,226,128,.45)',borderRadius:8,color:'#0b0b0b',fontFamily:"'League Spartan',sans-serif",fontWeight:900,letterSpacing:'.12em',padding:'13px 16px',minHeight:44,cursor:'pointer',boxShadow:'0 8px 22px rgba(212,175,55,.18),0 1px 0 rgba(255,255,255,.35) inset'}
const ghostButton:any={background:'linear-gradient(145deg,rgba(255,255,255,.07),rgba(255,255,255,.025))',border:'1px solid rgba(255,255,255,.14)',borderRadius:7,color:'rgba(255,255,255,.78)',fontFamily:"'League Spartan',sans-serif",fontSize:9,fontWeight:800,letterSpacing:'.13em',padding:'9px 12px',minHeight:36,cursor:'pointer',boxShadow:'0 4px 14px rgba(0,0,0,.16)'}
const dangerButton:any={background:'rgba(192,57,43,.07)',border:'1px solid rgba(224,85,72,.42)',borderRadius:7,color:'#f1aaa3',fontFamily:"'League Spartan',sans-serif",fontSize:9,fontWeight:800,letterSpacing:'.11em',padding:'9px 11px',minHeight:36,cursor:'pointer'}
const closeButton:any={background:'rgba(255,255,255,.045)',border:'1px solid rgba(255,255,255,.14)',borderRadius:9,color:'rgba(255,255,255,.72)',fontSize:22,width:38,height:38,cursor:'pointer'}
const labelStyle:any={fontFamily:"'League Spartan',sans-serif",fontSize:9,letterSpacing:'.12em',color:'rgba(255,255,255,.45)'}
const successStyle:any={background:'rgba(46,160,67,.12)',border:'1px solid rgba(46,160,67,.3)',color:'#9fe0a7',padding:'10px 12px',fontSize:12}
const formGrid:any={display:'grid',gridTemplateColumns:'repeat(2,minmax(0,1fr))',gap:10}
const modalBackdrop:any={position:'fixed',inset:0,background:'rgba(0,0,0,.72)',backdropFilter:'blur(8px)',display:'grid',placeItems:'center',padding:20,zIndex:300}
const modal:any={width:'min(680px,100%)',maxHeight:'90vh',overflowY:'auto',background:'linear-gradient(145deg,#151515,#0c0c0c)',border:'1px solid rgba(212,175,55,.22)',borderRadius:16,padding:28,boxShadow:'0 30px 100px rgba(0,0,0,.7)'}
const errorStyle:any={background:'rgba(192,57,43,.12)',border:'1px solid rgba(192,57,43,.3)',color:'#f0a49b',padding:'10px 12px',fontSize:12}
const dashboardShell:any={minHeight:'100vh',background:'linear-gradient(135deg,#0b0b0b,#171717 55%,#0b0b0b)',color:WHITE}
const dashHeader:any={height:64,borderBottom:'1px solid rgba(212,175,55,.12)',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 24px',background:'rgba(11,11,11,.88)',backdropFilter:'blur(12px)'}
const card:any={background:'linear-gradient(145deg,rgba(255,255,255,.05),rgba(255,255,255,.018))',border:'1px solid rgba(255,255,255,.09)',borderRadius:12,padding:24,boxShadow:'0 12px 34px rgba(0,0,0,.18),0 1px 0 rgba(255,255,255,.025) inset'}
const cardTitle:any={fontFamily:"'League Spartan',sans-serif",fontSize:11,letterSpacing:'.16em',color:GOLD,marginBottom:18}
const row:any={display:'flex',justifyContent:'space-between',alignItems:'center',padding:'14px 0',borderBottom:'1px solid rgba(255,255,255,.06)',fontFamily:"'Inter',sans-serif"}
const small:any={fontSize:11,color:'rgba(255,255,255,.4)',marginTop:4}
const text:any={fontFamily:"'Inter',sans-serif",fontSize:13,color:'rgba(255,255,255,.72)'}
const bigNumber:any={fontFamily:"'League Spartan',sans-serif",fontSize:52,fontWeight:800,color:WHITE}
const weightPill:any={border:'1px solid rgba(212,175,55,.22)',background:'rgba(212,175,55,.06)',padding:'10px 12px',fontFamily:"'League Spartan',sans-serif",color:WHITE}
const workoutMetric:any={border:'1px solid rgba(212,175,55,.18)',background:'rgba(212,175,55,.06)',padding:'7px 9px',fontFamily:"'Inter',sans-serif",fontSize:11,color:'rgba(255,255,255,.75)'}
const nutritionSummary:any={border:'1px solid rgba(212,175,55,.18)',background:'rgba(212,175,55,.05)',padding:'14px 12px',display:'grid',gap:5,textAlign:'center',fontFamily:"'League Spartan',sans-serif",color:WHITE}
const clientWorkoutPlan:any={...card,position:'relative',overflow:'hidden',background:'linear-gradient(145deg,rgba(255,255,255,.045),rgba(0,0,0,.16))',padding:26}
const workoutPlanAccent:any={position:'absolute',left:0,right:0,top:0,height:3,background:'linear-gradient(90deg,#D4AF37,#4DA3FF,#A78BFA)'}
const workoutCountBadge:any={minWidth:76,border:'1px solid rgba(212,175,55,.17)',background:'rgba(212,175,55,.05)',padding:'9px 11px',display:'grid',justifyItems:'center',gap:2,fontFamily:"'League Spartan',sans-serif",color:GOLD}
const emptyWorkoutState:any={marginTop:20,border:'1px dashed rgba(255,255,255,.1)',padding:28,textAlign:'center'}
const clientExerciseCard:any={overflow:'hidden',border:'1px solid rgba(255,255,255,.085)',background:'linear-gradient(145deg,rgba(0,0,0,.3),rgba(255,255,255,.018))'}
const exerciseHeader:any={width:'100%',display:'flex',alignItems:'center',gap:12,background:'transparent',border:'none',color:WHITE,padding:15,cursor:'pointer'}
const clientExerciseNumber:any={width:34,height:34,border:'1px solid rgba(212,175,55,.24)',background:'rgba(212,175,55,.06)',display:'grid',placeItems:'center',fontFamily:"'League Spartan',sans-serif",fontSize:10,color:GOLD,flex:'0 0 auto'}
const exerciseChevron:any={width:28,height:28,border:'1px solid rgba(255,255,255,.1)',display:'grid',placeItems:'center',fontSize:16,color:'rgba(255,255,255,.5)',transition:'transform .2s ease'}
const clientExerciseMetrics:any={display:'grid',gridTemplateColumns:'repeat(3,minmax(0,1fr))',gap:7,padding:'0 15px 15px'}
const exerciseMetricStyle=(color:string,background:string):any=>({border:`1px solid ${color}2f`,borderTop:`2px solid ${color}`,background,padding:'10px 11px',display:'flex',justifyContent:'space-between',alignItems:'center',gap:8,fontFamily:"'League Spartan',sans-serif",fontSize:8,letterSpacing:'.07em',color})
const exerciseDetails:any={borderTop:'1px solid rgba(255,255,255,.07)',borderLeft:'3px solid rgba(212,175,55,.55)',background:'rgba(212,175,55,.035)',padding:'13px 15px',margin:'0 15px 15px'}
const clientNutritionPlan:any={...card,position:'relative',overflow:'hidden',background:'linear-gradient(145deg,rgba(255,255,255,.045),rgba(0,0,0,.16))',padding:26}
const nutritionPlanAccent:any={position:'absolute',left:0,right:0,top:0,height:3,background:'linear-gradient(90deg,#D4AF37,#FF6B6B,#4DA3FF,#A78BFA)'}
const mealCountBadge:any={border:'1px solid rgba(212,175,55,.18)',background:'rgba(212,175,55,.055)',padding:'9px 13px',display:'grid',justifyItems:'center',gap:2,fontFamily:"'League Spartan',sans-serif",color:GOLD}
const clientMacroGrid:any={display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:9,margin:'22px 0 24px'}
const nutritionMacroStyle=(color:string,background:string):any=>({position:'relative',overflow:'hidden',border:`1px solid ${color}33`,borderTop:`3px solid ${color}`,background,padding:'16px 14px',display:'grid',gap:5,fontFamily:"'League Spartan',sans-serif",color})
const macroLabel:any={fontSize:8,letterSpacing:'.14em',opacity:.78}
const macroValue:any={fontSize:27,lineHeight:1,color:WHITE}
const macroHint:any={fontSize:7,letterSpacing:'.1em',opacity:.55}
const macroIcon:any={position:'absolute',right:11,top:9,width:28,height:28,border:'1px solid currentColor',borderRadius:'50%',display:'grid',placeItems:'center',fontSize:8,fontWeight:900,opacity:.42}
const clientMealCard:any={position:'relative',overflow:'hidden',border:'1px solid rgba(255,255,255,.085)',background:'linear-gradient(145deg,rgba(0,0,0,.3),rgba(255,255,255,.018))',padding:18}
const clientMealNumber:any={width:32,height:32,border:'1px solid rgba(212,175,55,.25)',background:'rgba(212,175,55,.06)',display:'grid',placeItems:'center',fontFamily:"'League Spartan',sans-serif",fontSize:10,color:GOLD,flex:'0 0 auto'}
const mealCalories:any={background:'rgba(212,175,55,.08)',border:'1px solid rgba(212,175,55,.18)',color:GOLD,padding:'6px 9px',fontFamily:"'League Spartan',sans-serif",fontSize:13}
const mealMacroStyle=(color:string,background:string):any=>({border:`1px solid ${color}33`,background,color,padding:'7px 9px',fontFamily:"'League Spartan',sans-serif",fontSize:9,letterSpacing:'.04em'})
const mealDetailBox:any={marginTop:14,borderLeft:'2px solid rgba(212,175,55,.5)',background:'rgba(255,255,255,.025)',padding:'11px 13px'}
const nutritionAdminHero:any={background:'linear-gradient(135deg,rgba(212,175,55,.10),rgba(255,255,255,.025))',border:'1px solid rgba(212,175,55,.18)',padding:24,display:'flex',justifyContent:'space-between',alignItems:'center',gap:20,flexWrap:'wrap'}
const trainingAdminHero:any={background:'linear-gradient(135deg,rgba(212,175,55,.10),rgba(255,255,255,.025))',border:'1px solid rgba(212,175,55,.18)',padding:24,display:'flex',justifyContent:'space-between',alignItems:'center',gap:20,flexWrap:'wrap'}
const adminInfoPill:any={border:'1px solid rgba(255,255,255,.09)',background:'rgba(0,0,0,.22)',padding:'8px 10px',fontFamily:"'League Spartan',sans-serif",fontSize:10,letterSpacing:'.08em',color:'rgba(255,255,255,.5)'}
const trainingStat:any={border:'1px solid rgba(255,255,255,.08)',background:'rgba(0,0,0,.2)',padding:13,display:'flex',justifyContent:'space-between',alignItems:'center',gap:10,fontFamily:"'League Spartan',sans-serif",fontSize:9,letterSpacing:'.1em',color:'rgba(255,255,255,.45)'}
const adminExerciseCard:any={border:'1px solid rgba(255,255,255,.08)',background:'rgba(0,0,0,.2)',padding:14,display:'flex',alignItems:'flex-start',gap:13,flexWrap:'wrap'}
const exerciseOrder:any={width:30,height:30,border:'1px solid rgba(212,175,55,.24)',display:'grid',placeItems:'center',fontFamily:"'League Spartan',sans-serif",fontSize:11,color:GOLD,flex:'0 0 auto'}
const exerciseMetric:any={border:'1px solid rgba(212,175,55,.14)',background:'rgba(212,175,55,.04)',padding:'6px 8px',fontFamily:"'League Spartan',sans-serif",fontSize:9,letterSpacing:'.05em',color:'rgba(255,255,255,.5)'}
const adminMacroCard:any={border:'1px solid rgba(255,255,255,.08)',background:'rgba(0,0,0,.2)',padding:14,display:'grid',gridTemplateColumns:'1fr auto',alignItems:'end',gap:4,fontFamily:"'League Spartan',sans-serif"}
const totalPill:any={border:'1px solid rgba(212,175,55,.15)',background:'rgba(212,175,55,.045)',padding:'9px 10px',fontFamily:"'Inter',sans-serif",fontSize:10,color:'rgba(255,255,255,.65)',textAlign:'center'}
const adminMealCard:any={border:'1px solid rgba(255,255,255,.08)',background:'rgba(0,0,0,.2)',padding:14,display:'flex',alignItems:'flex-start',gap:13}
const mealOrder:any={width:30,height:30,border:'1px solid rgba(212,175,55,.24)',display:'grid',placeItems:'center',fontFamily:"'League Spartan',sans-serif",fontSize:11,color:GOLD,flex:'0 0 auto'}
const emptyAdminState:any={...card,textAlign:'center',display:'grid',justifyItems:'center',gap:8,padding:'46px 24px'}
const ratingButton:any={minHeight:40,border:'1px solid rgba(255,255,255,.1)',fontFamily:"'League Spartan',sans-serif",fontSize:13,fontWeight:800,cursor:'pointer'}
const checkinTip:any={background:'linear-gradient(135deg,rgba(212,175,55,.09),rgba(255,255,255,.025))',border:'1px solid rgba(212,175,55,.18)',padding:20}
const clientCheckinCard:any={border:'1px solid rgba(255,255,255,.08)',background:'rgba(0,0,0,.2)',padding:14}
const checkinScore:any={border:'1px solid rgba(212,175,55,.15)',background:'rgba(212,175,55,.045)',padding:'7px 8px',fontFamily:"'League Spartan',sans-serif",fontSize:9,letterSpacing:'.06em',color:'rgba(255,255,255,.55)'}
const checkinAdminHero:any={background:'linear-gradient(135deg,rgba(212,175,55,.10),rgba(255,255,255,.025))',border:'1px solid rgba(212,175,55,.18)',padding:24,display:'flex',justifyContent:'space-between',alignItems:'center',gap:20,flexWrap:'wrap'}
const reviewCount:any={width:92,height:72,border:'1px solid rgba(212,175,55,.22)',background:'rgba(0,0,0,.18)',display:'grid',placeItems:'center',alignContent:'center',gap:2,fontFamily:"'League Spartan',sans-serif",color:GOLD}
const reviewBadge:any={border:'1px solid rgba(212,175,55,.2)',padding:'3px 5px',fontFamily:"'League Spartan',sans-serif",fontSize:7,letterSpacing:'.08em',whiteSpace:'nowrap'}
const checkinMetric:any={border:'1px solid rgba(255,255,255,.08)',background:'rgba(0,0,0,.18)',padding:12,display:'grid',gap:5,fontFamily:"'League Spartan',sans-serif",fontSize:9,color:'rgba(255,255,255,.4)'}
const clientNote:any={borderLeft:`3px solid ${GOLD}`,background:'rgba(212,175,55,.045)',padding:'12px 14px'}
const coachReply:any={marginTop:12,border:'1px solid rgba(76,166,106,.22)',background:'rgba(76,166,106,.07)',padding:'12px 13px'}
const clientDashboardGrid:any={display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(190px,1fr))',gap:10}
const dashboardMetricCard:any={border:'1px solid rgba(255,255,255,.08)',background:'linear-gradient(145deg,rgba(255,255,255,.045),rgba(0,0,0,.18))',padding:17,textAlign:'left',color:WHITE,display:'grid',gap:7,fontFamily:"'League Spartan',sans-serif",minHeight:116}
const nextCheckinCard:any={cursor:'pointer',width:'100%'}
const progressTrack:any={height:5,background:'rgba(255,255,255,.08)',overflow:'hidden',marginTop:4}
const progressFill:any={height:'100%',background:GOLD,transition:'width .3s ease'}
const checkinLocked:any={border:'1px solid rgba(212,175,55,.2)',background:'rgba(212,175,55,.06)',padding:'11px 12px',fontFamily:"'Inter',sans-serif",fontSize:12,color:'rgba(255,255,255,.7)'}
const exerciseLogGrid:any={display:'grid',gridTemplateColumns:'repeat(3,minmax(0,1fr))',gap:8,marginTop:14}
const sessionHistoryRow:any={display:'flex',justifyContent:'space-between',gap:10,border:'1px solid rgba(255,255,255,.07)',background:'rgba(0,0,0,.18)',padding:'10px 12px',fontFamily:"'Inter',sans-serif",fontSize:11,color:'rgba(255,255,255,.6)'}
const adminSessionRow:any={display:'flex',justifyContent:'space-between',alignItems:'center',gap:12,border:'1px solid rgba(255,255,255,.08)',background:'rgba(0,0,0,.16)',padding:'12px 14px',fontFamily:"'Inter',sans-serif",fontSize:12,color:'rgba(255,255,255,.65)'}
const performanceGrid:any={display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:9}
const performanceCard:any={border:'1px solid rgba(255,255,255,.08)',background:'rgba(0,0,0,.18)',padding:14,fontFamily:"'League Spartan',sans-serif",display:'grid',gap:12}
const performanceValues:any={display:'grid',gridTemplateColumns:'repeat(3,minmax(0,1fr))',gap:6,fontSize:8,color:'rgba(255,255,255,.4)'}
const inboxRow:any={display:'flex',justifyContent:'space-between',alignItems:'center',gap:12,width:'100%',border:'1px solid rgba(212,175,55,.16)',background:'rgba(212,175,55,.045)',padding:'11px 13px',textAlign:'left',color:'rgba(255,255,255,.72)',fontFamily:"'Inter',sans-serif",fontSize:11,cursor:'pointer'}
const coachWorkspaceGrid:any={display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:14}
const privateNote:any={borderLeft:`3px solid ${GOLD}`,background:'rgba(212,175,55,.045)',padding:'11px 12px'}
const taskRow:any={display:'flex',justifyContent:'space-between',alignItems:'center',gap:10,border:'1px solid rgba(255,255,255,.08)',background:'rgba(0,0,0,.18)',padding:'11px 12px',fontFamily:"'Inter',sans-serif",fontSize:12}
const clientTaskCard:any={display:'flex',alignItems:'center',gap:12,width:'100%',border:'1px solid rgba(212,175,55,.18)',background:'rgba(0,0,0,.18)',padding:'14px',textAlign:'left',color:WHITE,cursor:'pointer',fontFamily:"'Inter',sans-serif"}
const taskCheck:any={width:27,height:27,border:'1px solid rgba(212,175,55,.35)',display:'grid',placeItems:'center',flex:'0 0 auto',color:WHITE,fontWeight:800}
const measurementGrid:any={display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(105px,1fr))',gap:7,margin:'16px 0'}
const assessmentPhotos:any={display:'grid',gridTemplateColumns:'repeat(3,minmax(0,1fr))',gap:8,marginTop:14}
const assessmentPhoto:any={aspectRatio:'3/4',marginTop:6,border:'1px solid rgba(255,255,255,.1)',borderRadius:8,background:'rgba(0,0,0,.25)',display:'grid',placeItems:'center',overflow:'hidden',color:'rgba(255,255,255,.35)'}
const photoUploadGrid:any={display:'grid',gridTemplateColumns:'repeat(3,minmax(0,1fr))',gap:8}
const photoUploadLabel:any={border:'1px dashed rgba(212,175,55,.3)',borderRadius:8,background:'rgba(212,175,55,.04)',padding:12,display:'grid',gap:6,textAlign:'center',fontFamily:"'League Spartan',sans-serif",fontSize:9,color:GOLD,cursor:'pointer'}
const supplementNotice:any={borderLeft:`3px solid ${GOLD}`,background:'rgba(212,175,55,.06)',padding:'12px 14px',fontFamily:"'Inter',sans-serif",fontSize:11,lineHeight:1.55,color:'rgba(255,255,255,.65)',margin:'14px 0'}
const supplementCard:any={display:'flex',alignItems:'flex-start',gap:13,border:'1px solid rgba(212,175,55,.17)',borderRadius:10,background:'linear-gradient(145deg,rgba(212,175,55,.07),rgba(0,0,0,.18))',padding:15}
const supplementIcon:any={width:34,height:34,borderRadius:'50%',background:GOLD,color:'#090909',display:'grid',placeItems:'center',fontWeight:900,flex:'0 0 auto'}
const intakeGrid:any={display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(190px,1fr))',gap:8}
const intakeField:any={border:'1px solid rgba(255,255,255,.08)',borderRadius:8,background:'rgba(0,0,0,.18)',padding:'11px 12px',display:'grid',gap:5,fontFamily:"'Inter',sans-serif",fontSize:11,color:'rgba(255,255,255,.45)'}
const controlGrid:any={display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(210px,1fr))',gap:10}
const controlCard:any={background:'linear-gradient(145deg,rgba(255,255,255,.035),rgba(0,0,0,.16))',border:'1px solid rgba(255,255,255,.08)',padding:18,textAlign:'left',color:WHITE,cursor:'pointer',display:'grid',gap:5,fontFamily:"'Inter',sans-serif"}
const controlLabel:any={fontFamily:"'League Spartan',sans-serif",fontSize:10,letterSpacing:'.15em',color:GOLD}
const statusDot:any={width:8,height:8,borderRadius:'50%',boxShadow:'0 0 10px currentColor'}
const controlNumber:any={fontFamily:"'League Spartan',sans-serif",fontSize:38,fontWeight:900,lineHeight:1,marginTop:12}
const controlUnit:any={fontSize:10,color:'rgba(255,255,255,.38)'}
const controlStatus:any={fontSize:11,marginTop:10,minHeight:17}
const controlAction:any={fontFamily:"'League Spartan',sans-serif",fontSize:9,letterSpacing:'.1em',color:'rgba(255,255,255,.65)',marginTop:12,paddingTop:12,borderTop:'1px solid rgba(255,255,255,.07)'}
const actionChip:any={background:'rgba(212,175,55,.06)',border:'1px solid rgba(212,175,55,.18)',color:'#e4bd54',padding:'9px 11px',fontFamily:"'League Spartan',sans-serif",fontSize:9,letterSpacing:'.06em',cursor:'pointer'}
const emptyToolState:any={border:'1px dashed rgba(255,255,255,.1)',padding:28,textAlign:'center',fontFamily:"'Inter',sans-serif",fontSize:12,color:'rgba(255,255,255,.4)'}
const featureGrid:any={display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:10}
const feature:any={border:'1px solid rgba(255,255,255,.07)',padding:16,fontFamily:"'Inter',sans-serif",fontSize:13,display:'flex',justifyContent:'space-between',gap:12}
const arrowStyle:any={position:'fixed',top:'50%',transform:'translateY(-50%)',background:'rgba(212,175,55,.12)',border:'1px solid rgba(212,175,55,.25)',width:40,height:40,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',fontSize:18,transition:'all .15s',zIndex:10}
const journeyBackdrop:any={position:'fixed',inset:0,zIndex:500,background:'rgba(0,0,0,.84)',backdropFilter:'blur(14px)',display:'grid',placeItems:'center',padding:20,color:WHITE}
const journeyModal:any={width:'min(900px,100%)',background:'linear-gradient(145deg,#151515,#090909)',border:'1px solid rgba(212,175,55,.22)',padding:'clamp(24px,5vw,48px)',boxShadow:'0 35px 120px rgba(0,0,0,.7)'}
const journeyGrid:any={display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:12}
const journeyCard:any={position:'relative',background:'rgba(255,255,255,.025)',border:'1px solid rgba(255,255,255,.1)',padding:24,color:WHITE,textAlign:'left',cursor:'pointer',display:'grid',gap:10,minHeight:225,fontFamily:"'Inter',sans-serif"}
const journeyNumber:any={position:'absolute',right:18,top:12,fontFamily:"'Bebas Neue',sans-serif",fontSize:54,color:'rgba(255,255,255,.045)'}
const journeyTag:any={fontFamily:"'League Spartan',sans-serif",fontSize:9,letterSpacing:'.18em',color:GOLD}
const journeyAction:any={fontFamily:"'League Spartan',sans-serif",fontSize:9,letterSpacing:'.11em',color:GOLD,marginTop:'auto',paddingTop:14,borderTop:'1px solid rgba(255,255,255,.08)'}
const toolsBackdrop:any={position:'fixed',inset:0,zIndex:500,background:'rgba(0,0,0,.82)',backdropFilter:'blur(12px)',display:'grid',placeItems:'center',padding:18,color:WHITE}
const toolsModal:any={width:'min(1060px,100%)',maxHeight:'92vh',overflowY:'auto',background:'#111',border:'1px solid rgba(212,175,55,.2)',padding:'clamp(22px,4vw,38px)',boxShadow:'0 35px 120px rgba(0,0,0,.7)'}
const toolsLayout:any={display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:22,marginTop:26}
const calculatorCard:any={background:'linear-gradient(145deg,rgba(212,175,55,.08),rgba(255,255,255,.025))',border:'1px solid rgba(212,175,55,.18)',padding:20}
const goalToggle:any={border:'1px solid rgba(255,255,255,.1)',padding:'9px 5px',fontFamily:"'League Spartan',sans-serif",fontSize:8,letterSpacing:'.08em',cursor:'pointer'}
const calculatorResult:any={display:'grid',gridTemplateColumns:'1fr auto auto',alignItems:'end',gap:5,background:'#090909',border:'1px solid rgba(255,255,255,.08)',padding:16,margin:'12px 0',fontFamily:"'League Spartan',sans-serif"}
const toolLinksGrid:any={display:'grid',gridTemplateColumns:'repeat(2,minmax(0,1fr))',gap:8}
const toolLinkCard:any={background:'rgba(255,255,255,.025)',border:'1px solid rgba(255,255,255,.09)',padding:14,color:WHITE,textAlign:'left',cursor:'pointer',display:'grid',gap:6,fontFamily:"'Inter',sans-serif"}
const progressCard:any={...card,background:'linear-gradient(145deg,rgba(212,175,55,.055),rgba(255,255,255,.025))',borderColor:'rgba(212,175,55,.16)'}
const progressStats:any={display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(115px,1fr))',gap:8,margin:'20px 0'}
const chartStat:any={border:'1px solid rgba(255,255,255,.08)',background:'rgba(0,0,0,.18)',padding:12,display:'grid',gap:5,fontFamily:"'League Spartan',sans-serif",fontSize:9,letterSpacing:'.08em',color:'rgba(255,255,255,.4)'}
const chartFilter:any={border:'1px solid rgba(255,255,255,.1)',padding:'7px 9px',fontFamily:"'League Spartan',sans-serif",fontSize:8,letterSpacing:'.08em',cursor:'pointer'}
const chartShell:any={height:250,position:'relative',marginLeft:38,borderLeft:'1px solid rgba(255,255,255,.08)',borderBottom:'1px solid rgba(255,255,255,.08)',padding:'8px 8px 4px'}
const chartYAxis:any={position:'absolute',right:'calc(100% + 9px)',top:5,bottom:3,display:'flex',flexDirection:'column',justifyContent:'space-between',fontFamily:"'Inter',sans-serif",fontSize:8,color:'rgba(255,255,255,.3)',textAlign:'right'}
const goalMarker:any={position:'absolute',right:8,transform:'translateY(-50%)',background:'#17140a',border:'1px solid rgba(212,175,55,.25)',color:GOLD,padding:'3px 5px',fontFamily:"'League Spartan',sans-serif",fontSize:7,letterSpacing:'.07em'}
const chartDate:any={fontFamily:"'Inter',sans-serif",fontSize:8,color:'rgba(255,255,255,.3)'}
const trendMessage:any={marginTop:14,borderLeft:`3px solid ${GOLD}`,background:'rgba(212,175,55,.06)',padding:'11px 13px',fontFamily:"'Inter',sans-serif",fontSize:10.5,lineHeight:1.55,color:'rgba(255,255,255,.62)'}
const emptyChart:any={...card,gridColumn:'1/-1',borderStyle:'dashed',textAlign:'center',padding:'38px 24px'}
