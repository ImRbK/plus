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
import { getSession, setSession, signIn, signOut, isAdmin, getOwnClient, getAllClients, getWeightProgress, signUp, createClientProfile, deleteClientProfile, updateClientProfile, getClientWorkouts, getWorkoutExercises, createWorkout, deleteWorkout, createExercise, deleteExercise, getNutritionPlans, getMeals, createNutritionPlan, deleteNutritionPlan, createMeal, deleteMeal, addWeightProgress, deleteWeightProgress, getCheckIns, createCheckIn, deleteCheckIn, type Session } from './supabase'

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
  { component: P35_ActionPlan, title: 'Plano de Ação Final' }, { component: P36_ThankYou, title: 'Obrigado' },
  { component: P37_QRCode, title: 'Código QR / Coaching' },
]

const GOLD = '#D4AF37'
const WHITE = '#FFFFFF'
const SECTIONS = [
  { label: 'Introdução', range: [0, 3] }, { label: 'Nutrição', range: [4, 16] },
  { label: 'Treino', range: [17, 24] }, { label: 'FAQ e Ferramentas', range: [25, 36] },
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

function Dashboard({ session, admin, onLogout }: { session: Session, admin: boolean, onLogout:()=>void }) {
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
    <header style={dashHeader}><div style={brand}>MASSA<span>+</span></div><div style={{display:'flex',alignItems:'center',gap:14}}><span style={muted}>{admin?'ADMINISTRADOR':session.user.email}</span><button onClick={()=>{signOut();onLogout()}} style={ghostButton}>SAIR</button></div></header>
    <main style={{width:'min(1180px,calc(100% - 32px))', margin:'0 auto', padding:'48px 0 80px'}}>
      <div style={eyebrow}>{admin?'PAINEL DE ADMINISTRAÇÃO':'ÁREA DO CLIENTE'}</div>
      <h1 style={title}>{admin?'Gestão MASSA+':`Olá${client?.full_name ? `, ${client.full_name.split(' ')[0]}` : ''}.`}</h1>
      <p style={muted}>{admin?'Gerir clientes e preparar a próxima fase da plataforma.':'Aqui vais encontrar o teu plano, evolução e ferramentas personalizadas.'}</p>
      {loading ? <div style={card}>A carregar…</div> : error ? <div style={errorStyle}>{error}</div> : admin ? <AdminView clients={clients} session={session} onClientsChange={setClients}/> : <ClientView client={client} weights={weights}/>} 
    </main>
  </div>
}

function AdminView({clients, session, onClientsChange}:{clients:any[], session:Session, onClientsChange:(clients:any[])=>void}) {
  const [open, setOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState<any>(null)
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
      const auth = await signUp(form.email.trim(), form.password)
      const userId = auth?.user?.id
      if(!userId) throw new Error('A conta foi criada mas o Supabase não devolveu o ID do utilizador. Verifica a configuração de confirmação de email.')
      await createClientProfile(session.access_token, {
        id:userId, full_name:form.full_name.trim(), email:form.email.trim(),
        initial_weight:form.initial_weight?Number(form.initial_weight):null,
        current_weight:form.current_weight?Number(form.current_weight):null,
        height:form.height?Number(form.height):null, goal_weight:form.goal_weight?Number(form.goal_weight):null,
        goal:form.goal.trim()||null, start_date:form.start_date||null
      })
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
        <div style={{display:'flex',alignItems:'center',gap:10,marginLeft:'auto'}}><div style={{textAlign:'right'}}><strong>{c.current_weight ?? '—'} kg</strong><div style={small}>objetivo {c.goal_weight ?? '—'} kg</div></div><button onClick={()=>setSelectedClient(c)} style={ghostButton}>ABRIR</button><button onClick={()=>remove(c)} style={dangerButton}>ELIMINAR</button></div>
      </div>)}</div>}
    </div>
    <div style={card}><div style={cardTitle}>FERRAMENTAS DISPONÍVEIS</div><div style={featureGrid}>{['Treinos personalizados','Planos alimentares','Check-ins semanais','Peso e progresso'].map(x=><div key={x} style={feature}>{x}<span>ABRIR CLIENTE</span></div>)}</div></div>

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


function ClientManager({client, session, onBack, onClientUpdated}:{client:any,session:Session,onBack:()=>void,onClientUpdated:(c:any)=>void}) {
  const [tab,setTab]=useState<'overview'|'workout'|'nutrition'|'checkin'>('overview')
  const [weights,setWeights]=useState<any[]>([])
  const [workouts,setWorkouts]=useState<any[]>([])
  const [nutrition,setNutrition]=useState<any[]>([])
  const [checkins,setCheckins]=useState<any[]>([])
  const [busy,setBusy]=useState(false)
  const [message,setMessage]=useState('')
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
      const updated=await updateClientProfile(session.access_token,client.id,{
        full_name:profile.full_name.trim(), email:profile.email.trim(),
        initial_weight:profile.initial_weight===''?null:Number(profile.initial_weight),
        current_weight:profile.current_weight===''?null:Number(profile.current_weight),
        height:profile.height===''?null:Number(profile.height),
        goal_weight:profile.goal_weight===''?null:Number(profile.goal_weight),
        goal:profile.goal.trim()||null,start_date:profile.start_date||null
      })
      setMessage('Perfil guardado.')
      if(updated) onClientUpdated(updated)
    }catch(e:any){setMessage(e.message||'Não foi possível guardar.')}finally{setBusy(false)}
  }

  return <div style={{display:'grid',gap:18,marginTop:28}}>
    <div style={{display:'flex',alignItems:'center',gap:12}}>
      <button onClick={onBack} style={ghostButton}>← CLIENTES</button>
      <div><div style={eyebrow}>CLIENTE</div><h2 style={{...title,fontSize:36,margin:4}}>{client.full_name}</h2></div>
    </div>
    <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
      {([['overview','PERFIL'],['workout','TREINO'],['nutrition','NUTRIÇÃO'],['checkin','CHECK-INS']] as const).map(([k,l])=><button key={k} onClick={()=>setTab(k)} style={{...ghostButton,color:tab===k?GOLD:undefined,borderColor:tab===k?'rgba(212,175,55,.35)':undefined}}>{l}</button>)}
    </div>
    {message && <div style={message.startsWith('Erro')||message.includes('não')?<errorStyle:successStyle}>{message}</div>}
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
      <div style={card}><div style={cardTitle}>PESO / PROGRESSO</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
          <div><div style={labelStyle}>INICIAL</div><div style={bigNumber}>{client.initial_weight??'—'}<small> kg</small></div></div>
          <div><div style={labelStyle}>ATUAL</div><div style={bigNumber}>{client.current_weight??'—'}<small> kg</small></div></div>
        </div>
        <WeightManager client={client} session={session} weights={weights} onRefresh={load}/>
      </div>
    </div>}
    {tab==='workout' && <WorkoutManager client={client} session={session} workouts={workouts} onRefresh={load}/>}
    {tab==='nutrition' && <NutritionManager client={client} session={session} plans={nutrition} onRefresh={load}/>}
    {tab==='checkin' && <CheckinManager client={client} session={session} checkins={checkins} onRefresh={load}/>}
  </div>
}

function WeightManager({client,session,weights,onRefresh}:{client:any,session:Session,weights:any[],onRefresh:()=>void}) {
  const [weight,setWeight]=useState(''),[date,setDate]=useState(new Date().toISOString().slice(0,10)),[saving,setSaving]=useState(false)
  const add=async(e:React.FormEvent)=>{e.preventDefault();setSaving(true);try{await addWeightProgress(session.access_token,{client_id:client.id,weight:Number(weight),recorded_at:date});await updateClientProfile(session.access_token,client.id,{current_weight:Number(weight)});setWeight('');onRefresh()}finally{setSaving(false)}}
  return <div style={{marginTop:24}}><div style={cardTitle}>REGISTAR PESO</div><form onSubmit={add} style={{display:'grid',gridTemplateColumns:'1fr 1fr auto',gap:8}}><input value={weight} onChange={e=>setWeight(e.target.value)} type="number" step=".1" placeholder="Peso kg" required style={inputStyle}/><input value={date} onChange={e=>setDate(e.target.value)} type="date" style={inputStyle}/><button disabled={saving} style={goldButton}>ADICIONAR</button></form><div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:14}}>{weights.map(w=><div key={w.id} style={weightPill}>{w.weight} kg <span>{w.recorded_at}</span><button onClick={async()=>{await deleteWeightProgress(session.access_token,w.id);onRefresh()}} style={{...ghostButton,padding:'2px 5px',marginLeft:5}}>×</button></div>)}</div></div>
}

function WorkoutManager({client,session,workouts,onRefresh}:{client:any,session:Session,workouts:any[],onRefresh:()=>void}) {
  const [name,setName]=useState(''),[description,setDescription]=useState(''),[open,setOpen]=useState<number|null>(null),[ex,setEx]=useState<Record<number,any[]>>({})
  const add=async(e:React.FormEvent)=>{e.preventDefault();await createWorkout(session.access_token,{client_id:client.id,name:name.trim(),description:description.trim()||null});setName('');setDescription('');onRefresh()}
  const loadEx=async(id:number)=>{setOpen(id);setEx({...ex,[id]:await getWorkoutExercises(session.access_token,id)})}
  return <div style={{display:'grid',gap:12}}>
    <div style={card}><div style={cardTitle}>NOVO PLANO DE TREINO</div><form onSubmit={add} style={{display:'grid',gap:8}}><input value={name} onChange={e=>setName(e.target.value)} placeholder="Nome (ex.: Treino A — Peito/Tríceps)" required style={inputStyle}/><input value={description} onChange={e=>setDescription(e.target.value)} placeholder="Descrição" style={inputStyle}/><button style={goldButton}>CRIAR TREINO</button></form></div>
    {workouts.length===0?<div style={card}><p style={muted}>Ainda não existem treinos.</p></div>:workouts.map(w=><div key={w.id} style={card}>
      <div style={{display:'flex',justifyContent:'space-between',gap:10,alignItems:'center'}}><div><div style={cardTitle}>{w.name}</div><p style={{...muted,margin:0}}>{w.description||'Sem descrição.'}</p></div><div style={{display:'flex',gap:8}}><button onClick={()=>loadEx(w.id)} style={ghostButton}>{open===w.id?'FECHAR':'EXERCÍCIOS'}</button><button onClick={async()=>{await deleteWorkout(session.access_token,w.id);onRefresh()}} style={dangerButton}>ELIMINAR</button></div></div>
      {open===w.id && <ExerciseEditor session={session} workout={w} exercises={ex[w.id]||[]} onRefresh={()=>loadEx(w.id)}/>}
    </div>)}
  </div>
}

function ExerciseEditor({session,workout,exercises,onRefresh}:{session:Session,workout:any,exercises:any[],onRefresh:()=>void}) {
  const [name,setName]=useState(''),[sets,setSets]=useState(''),[reps,setReps]=useState(''),[rest,setRest]=useState(''),[notes,setNotes]=useState('')
  const add=async(e:React.FormEvent)=>{e.preventDefault();await createExercise(session.access_token,{workout_id:workout.id,name:name.trim(),sets:sets?Number(sets):null,reps:reps||null,rest_seconds:rest?Number(rest):null,notes:notes||null,exercise_order:exercises.length});setName('');setSets('');setReps('');setRest('');setNotes('');onRefresh()}
  return <div style={{marginTop:20,paddingTop:18,borderTop:'1px solid rgba(255,255,255,.08)'}}><div style={cardTitle}>EXERCÍCIOS</div>
    <div style={{display:'grid',gap:6,marginBottom:14}}>{exercises.map(x=><div key={x.id} style={row}><div><strong>{x.name}</strong><div style={small}>{x.sets??'—'} séries × {x.reps??'—'} reps {x.rest_seconds?` · ${x.rest_seconds}s descanso`:''}</div>{x.notes&&<div style={small}>{x.notes}</div>}</div><button onClick={async()=>{await deleteExercise(session.access_token,x.id);onRefresh()}} style={dangerButton}>×</button></div>)}</div>
    <form onSubmit={add} style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',gap:8}}><input value={name} onChange={e=>setName(e.target.value)} placeholder="Exercício" required style={inputStyle}/><input value={sets} onChange={e=>setSets(e.target.value)} placeholder="Séries" type="number" style={inputStyle}/><input value={reps} onChange={e=>setReps(e.target.value)} placeholder="Reps" style={inputStyle}/><input value={rest} onChange={e=>setRest(e.target.value)} placeholder="Desc. s" type="number" style={inputStyle}/><input value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Notas técnicas" style={{...inputStyle,gridColumn:'1/-1'}}/><button style={{...goldButton,gridColumn:'1/-1'}}>ADICIONAR EXERCÍCIO</button></form>
  </div>
}

function NutritionManager({client,session,plans,onRefresh}:{client:any,session:Session,plans:any[],onRefresh:()=>void}) {
  const [name,setName]=useState(''),[cal,setCal]=useState(''),[protein,setProtein]=useState(''),[carbs,setCarbs]=useState(''),[fats,setFats]=useState(''),[open,setOpen]=useState<number|null>(null),[meals,setMeals]=useState<Record<number,any[]>>({})
  const add=async(e:React.FormEvent)=>{e.preventDefault();await createNutritionPlan(session.access_token,{client_id:client.id,name:name.trim(),calories:cal?Number(cal):null,protein:protein?Number(protein):null,carbohydrates:carbs?Number(carbs):null,fats:fats?Number(fats):null});setName('');setCal('');setProtein('');setCarbs('');setFats('');onRefresh()}
  const loadMeals=async(id:number)=>{setOpen(id);setMeals({...meals,[id]:await getMeals(session.access_token,id)})}
  return <div style={{display:'grid',gap:12}}>
    <div style={card}><div style={cardTitle}>NOVO PLANO ALIMENTAR</div><form onSubmit={add} style={{display:'grid',gap:8}}><input value={name} onChange={e=>setName(e.target.value)} placeholder="Nome (ex.: Ganho de massa — 3000 kcal)" required style={inputStyle}/><div style={formGrid}><input value={cal} onChange={e=>setCal(e.target.value)} placeholder="Calorias" type="number" style={inputStyle}/><input value={protein} onChange={e=>setProtein(e.target.value)} placeholder="Proteína g" type="number" step=".1" style={inputStyle}/><input value={carbs} onChange={e=>setCarbs(e.target.value)} placeholder="Hidratos g" type="number" step=".1" style={inputStyle}/><input value={fats} onChange={e=>setFats(e.target.value)} placeholder="Gordura g" type="number" step=".1" style={inputStyle}/></div><button style={goldButton}>CRIAR PLANO</button></form></div>
    {plans.map(p=><div key={p.id} style={card}><div style={{display:'flex',justifyContent:'space-between',gap:10,alignItems:'center'}}><div><div style={cardTitle}>{p.name}</div><div style={small}>{p.calories??'—'} kcal · P {p.protein??'—'}g · HC {p.carbohydrates??'—'}g · G {p.fats??'—'}g</div></div><div style={{display:'flex',gap:8}}><button onClick={()=>loadMeals(p.id)} style={ghostButton}>{open===p.id?'FECHAR':'REFEIÇÕES'}</button><button onClick={async()=>{await deleteNutritionPlan(session.access_token,p.id);onRefresh()}} style={dangerButton}>ELIMINAR</button></div></div>{open===p.id&&<MealEditor session={session} plan={p} meals={meals[p.id]||[]} onRefresh={()=>loadMeals(p.id)}/>}</div>)}
  </div>
}

function MealEditor({session,plan,meals,onRefresh}:{session:Session,plan:any,meals:any[],onRefresh:()=>void}) {
  const [name,setName]=useState(''),[cal,setCal]=useState(''),[protein,setProtein]=useState(''),[carbs,setCarbs]=useState(''),[fats,setFats]=useState(''),[ingredients,setIngredients]=useState(''),[preparation,setPreparation]=useState('')
  const add=async(e:React.FormEvent)=>{e.preventDefault();await createMeal(session.access_token,{nutrition_plan_id:plan.id,name:name.trim(),calories:cal?Number(cal):null,protein:protein?Number(protein):null,carbohydrates:carbs?Number(carbs):null,fats:fats?Number(fats):null,ingredients:ingredients||null,preparation:preparation||null,meal_order:meals.length});setName('');setCal('');setProtein('');setCarbs('');setFats('');setIngredients('');setPreparation('');onRefresh()}
  return <div style={{marginTop:20,paddingTop:18,borderTop:'1px solid rgba(255,255,255,.08)'}}><div style={cardTitle}>REFEIÇÕES</div>
    {meals.map(m=><div key={m.id} style={row}><div><strong>{m.name}</strong><div style={small}>{m.calories??'—'} kcal · P {m.protein??'—'}g · HC {m.carbohydrates??'—'}g · G {m.fats??'—'}g</div>{m.ingredients&&<div style={small}>{m.ingredients}</div>}</div><button onClick={async()=>{await deleteMeal(session.access_token,m.id);onRefresh()}} style={dangerButton}>×</button></div>)}
    <form onSubmit={add} style={{display:'grid',gap:8,marginTop:10}}><input value={name} onChange={e=>setName(e.target.value)} placeholder="Refeição (ex.: Pequeno-almoço)" required style={inputStyle}/><div style={formGrid}><input value={cal} onChange={e=>setCal(e.target.value)} placeholder="Kcal" type="number" style={inputStyle}/><input value={protein} onChange={e=>setProtein(e.target.value)} placeholder="Proteína" type="number" step=".1" style={inputStyle}/><input value={carbs} onChange={e=>setCarbs(e.target.value)} placeholder="Hidratos" type="number" step=".1" style={inputStyle}/><input value={fats} onChange={e=>setFats(e.target.value)} placeholder="Gordura" type="number" step=".1" style={inputStyle}/></div><input value={ingredients} onChange={e=>setIngredients(e.target.value)} placeholder="Alimentos / quantidades" style={inputStyle}/><input value={preparation} onChange={e=>setPreparation(e.target.value)} placeholder="Preparação" style={inputStyle}/><button style={goldButton}>ADICIONAR REFEIÇÃO</button></form>
  </div>
}

function CheckinManager({client,session,checkins,onRefresh}:{client:any,session:Session,checkins:any[],onRefresh:()=>void}) {
  const [weight,setWeight]=useState(''),[training,setTraining]=useState(''),[nutrition,setNutrition]=useState(''),[sleep,setSleep]=useState(''),[notes,setNotes]=useState('')
  const add=async(e:React.FormEvent)=>{e.preventDefault();await createCheckIn(session.access_token,{client_id:client.id,weight:weight?Number(weight):null,training_rating:training?Number(training):null,nutrition_rating:nutrition?Number(nutrition):null,sleep_rating:sleep?Number(sleep):null,notes:notes||null});setWeight('');setTraining('');setNutrition('');setSleep('');setNotes('');onRefresh()}
  return <div style={{display:'grid',gap:12}}><div style={card}><div style={cardTitle}>REGISTAR CHECK-IN</div><form onSubmit={add} style={{display:'grid',gap:8}}><div style={formGrid}><input value={weight} onChange={e=>setWeight(e.target.value)} placeholder="Peso kg" type="number" step=".1" style={inputStyle}/><input value={training} onChange={e=>setTraining(e.target.value)} placeholder="Treino 1-10" type="number" min="1" max="10" style={inputStyle}/><input value={nutrition} onChange={e=>setNutrition(e.target.value)} placeholder="Nutrição 1-10" type="number" min="1" max="10" style={inputStyle}/><input value={sleep} onChange={e=>setSleep(e.target.value)} placeholder="Sono 1-10" type="number" min="1" max="10" style={inputStyle}/></div><textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Observações / feedback" style={{...inputStyle,minHeight:100,resize:'vertical'}}/><button style={goldButton}>GUARDAR CHECK-IN</button></form></div>{checkins.length===0?<div style={card}><p style={muted}>Ainda não existem check-ins.</p></div>:<div style={card}><div style={cardTitle}>HISTÓRICO</div>{checkins.map(c=><div key={c.id} style={row}><div><strong>{c.created_at?.slice(0,10)}</strong><div style={small}>Peso {c.weight??'—'} kg · Treino {c.training_rating??'—'}/10 · Nutrição {c.nutrition_rating??'—'}/10 · Sono {c.sleep_rating??'—'}/10</div>{c.notes&&<div style={small}>{c.notes}</div>}</div><button onClick={async()=>{await deleteCheckIn(session.access_token,c.id);onRefresh()}} style={dangerButton}>×</button></div>)}</div>}</div>
}
function ClientView({client,weights}:{client:any,weights:any[]}) { return <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:18,marginTop:28}}>{!client?<div style={{...card,gridColumn:'1/-1'}}><div style={cardTitle}>PERFIL</div><p style={muted}>A tua conta está criada, mas ainda não foi associada a um perfil MASSA+. O administrador terá de configurar os teus dados.</p></div>:<><div style={card}><div style={cardTitle}>OBJETIVO</div><div style={bigNumber}>{client.current_weight ?? client.initial_weight ?? '—'} <small>kg</small></div><p style={muted}>Objetivo: {client.goal_weight ?? '—'} kg</p></div><div style={card}><div style={cardTitle}>DADOS</div><p style={text}><b>Altura:</b> {client.height ?? '—'} cm</p><p style={text}><b>Objetivo:</b> {client.goal ?? '—'}</p><p style={text}><b>Início:</b> {client.start_date ?? '—'}</p></div><div style={{...card,gridColumn:'1/-1'}}><div style={cardTitle}>EVOLUÇÃO DO PESO</div>{weights.length<2?<p style={muted}>Ainda não há registos suficientes para mostrar a evolução. {weights.length===1?'Existe 1 registo.':''}</p>:<div style={{display:'flex',gap:10,flexWrap:'wrap'}}>{weights.map(w=><div key={w.id} style={weightPill}>{w.weight} kg <span>{w.recorded_at}</span></div>)}</div>}</div></>}</div> }

function Ebook() {
  const [current, setCurrent] = useState(0), [menuOpen,setMenuOpen]=useState(false), [scale,setScale]=useState(1)
  const PAGE_W=794,PAGE_H=1123
  useEffect(()=>{const f=()=>{const w=window.innerWidth-120,h=window.innerHeight-140;setScale(Math.min(1,w/PAGE_W,h/PAGE_H))};f();window.addEventListener('resize',f);return()=>window.removeEventListener('resize',f)},[])
  const prev=useCallback(()=>setCurrent(c=>Math.max(0,c-1)),[]), next=useCallback(()=>setCurrent(c=>Math.min(PAGES.length-1,c+1)),[])
  useEffect(()=>{const onKey=(e:KeyboardEvent)=>{if(e.key==='ArrowRight'||e.key==='ArrowDown')next();if(e.key==='ArrowLeft'||e.key==='ArrowUp')prev();if(e.key==='Escape')setMenuOpen(false)};window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey)},[prev,next])
  const CurrentPage=PAGES[current].component
  return <div style={{minHeight:'100vh',background:'linear-gradient(135deg,#141414 0%,#1C1C1C 50%,#111 100%)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',overflow:'hidden',position:'relative',userSelect:'none'}}>
    <div style={{position:'absolute',width:PAGE_W*scale+60,height:PAGE_H*scale+60,background:'radial-gradient(ellipse,rgba(212,175,55,.06) 0%,transparent 70%)',borderRadius:'50%',pointerEvents:'none'}}/>
    <div style={{position:'fixed',top:0,left:0,right:0,height:48,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 24px',background:'rgba(11,11,11,.9)',backdropFilter:'blur(12px)',borderBottom:'1px solid rgba(212,175,55,.12)',zIndex:100}}>
      <div style={{display:'flex',alignItems:'center',gap:10}}><span style={{fontFamily:"'League Spartan',sans-serif",fontSize:13,fontWeight:800,letterSpacing:'.25em',color:GOLD}}>MASSA+</span><span style={{width:1,height:16,background:'rgba(255,255,255,.1)'}}/><span style={{fontFamily:"'Inter',sans-serif",fontSize:10,color:'rgba(255,255,255,.35)',letterSpacing:'.06em'}}>O Guia Completo para Construir Músculo</span></div>
      <div style={{display:'flex',gap:4}}>{SECTIONS.map(({label,range})=><button key={label} onClick={()=>setCurrent(range[0])} style={{background:current>=range[0]&&current<=range[1]?'rgba(212,175,55,.15)':'transparent',border:current>=range[0]&&current<=range[1]?'1px solid rgba(212,175,55,.3)':'1px solid transparent',color:current>=range[0]&&current<=range[1]?GOLD:'rgba(255,255,255,.35)',fontFamily:"'League Spartan',sans-serif",fontSize:9,fontWeight:700,letterSpacing:'.14em',textTransform:'uppercase',padding:'5px 10px',cursor:'pointer'}}>{label}</button>)}</div>
      <div style={{display:'flex',alignItems:'center',gap:12}}><span style={{fontFamily:"'League Spartan',sans-serif",fontSize:11,color:'rgba(255,255,255,.35)'}}><span style={{color:GOLD,fontWeight:700}}>{current+1}</span> / {PAGES.length}</span><button onClick={()=>setMenuOpen(o=>!o)} style={ghostButton}>PÁGINAS</button><button onClick={()=>{window.location.hash='area'}} style={ghostButton}>ÁREA</button></div>
    </div>
    {menuOpen&&<div style={{position:'fixed',top:48,right:0,width:260,height:'calc(100vh - 48px)',background:'rgba(11,11,11,.97)',borderLeft:'1px solid rgba(212,175,55,.15)',overflowY:'auto',zIndex:99,padding:'16px 0'}}>{PAGES.map((p,i)=><button key={i} onClick={()=>{setCurrent(i);setMenuOpen(false)}} style={{display:'flex',alignItems:'center',gap:10,width:'100%',padding:'9px 16px',background:i===current?'rgba(212,175,55,.1)':'transparent',border:'none',borderLeft:i===current?`2px solid ${GOLD}`:'2px solid transparent',cursor:'pointer',textAlign:'left'}}><span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:12,color:i===current?GOLD:'rgba(255,255,255,.25)',minWidth:24}}>{i+1}</span><span style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:i===current?WHITE:'rgba(255,255,255,.45)'}}>{p.title}</span></button>)}</div>}
    <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',paddingTop:48,paddingBottom:72,width:'100%'}} onClick={()=>menuOpen&&setMenuOpen(false)}>
      <button onClick={prev} disabled={current===0} style={{...arrowStyle,left:16,color:current===0?'rgba(255,255,255,.15)':GOLD}}>{'←'}</button>
      <div style={{transform:`scale(${scale})`,transformOrigin:'center center',boxShadow:'0 32px 80px rgba(0,0,0,.6),0 0 0 1px rgba(212,175,55,.08)'}}><CurrentPage/></div>
      <button onClick={next} disabled={current===PAGES.length-1} style={{...arrowStyle,right:menuOpen?276:16,color:current===PAGES.length-1?'rgba(255,255,255,.15)':GOLD}}>{'→'}</button>
    </div>
    <div style={{position:'fixed',bottom:0,left:0,right:menuOpen?260:0,height:52,display:'flex',alignItems:'center',background:'rgba(11,11,11,.88)',backdropFilter:'blur(12px)',borderTop:'1px solid rgba(255,255,255,.05)',zIndex:100,padding:'0 50px'}}><div style={{flex:1,height:3,background:'rgba(255,255,255,.06)',borderRadius:2,position:'relative',overflow:'hidden'}}><div style={{position:'absolute',left:0,top:0,height:'100%',width:`${((current+1)/PAGES.length)*100}%`,background:GOLD,transition:'width .3s ease'}}/></div><div style={{marginLeft:14,fontFamily:"'Inter',sans-serif",fontSize:10,color:'rgba(255,255,255,.3)',whiteSpace:'nowrap',minWidth:120,textAlign:'right'}}>{PAGES[current].title}</div><div style={{marginLeft:14,display:'flex',gap:2}}>{PAGES.map((_,i)=><button key={i} onClick={()=>setCurrent(i)} style={{width:i===current?16:6,height:6,borderRadius:3,background:i===current?GOLD:'rgba(255,255,255,.12)',border:'none',cursor:'pointer',padding:0}}/>)}</div></div>
  </div>
}

export default function App(){
  const [mode,setMode]=useState<'ebook'|'login'|'dashboard'>(()=>window.location.hash==='#area'?'login':'ebook')
  const [session,setSessionState]=useState<Session|null>(getSession())
  const [admin,setAdmin]=useState(false)
  useEffect(()=>{if(session){isAdmin(session.access_token).then(setAdmin).catch(()=>setAdmin(false))}},[session])
  const login=(s:Session,a:boolean)=>{setSessionState(s);setAdmin(a);setMode('dashboard');window.location.hash='area'}
  const logout=()=>{setSessionState(null);setAdmin(false);setMode('ebook');window.location.hash=''}
  useEffect(()=>{const onHash=()=>{if(window.location.hash==='#area')setMode(session?'dashboard':'login');else setMode('ebook')};window.addEventListener('hashchange',onHash);return()=>window.removeEventListener('hashchange',onHash)},[session])
  if(mode==='login') return <Login onLogin={login}/>
  if(mode==='dashboard'&&session) return <Dashboard session={session} admin={admin} onLogout={logout}/>
  return <Ebook/>
}

const shellStyle:any={minHeight:'100vh',background:'radial-gradient(circle at top,#1c1c1c,#080808 60%)',display:'grid',placeItems:'center',padding:24,color:WHITE}
const panelStyle:any={width:'min(440px,100%)',background:'#111',border:'1px solid rgba(212,175,55,.18)',padding:'40px',boxShadow:'0 24px 70px rgba(0,0,0,.5)'}
const brand:any={fontFamily:"'League Spartan',sans-serif",fontWeight:900,letterSpacing:'.22em',fontSize:20,color:GOLD}
const eyebrow:any={fontFamily:"'League Spartan',sans-serif",fontSize:10,letterSpacing:'.18em',color:GOLD,marginTop:36}
const title:any={fontFamily:"'League Spartan',sans-serif",fontSize:'clamp(30px,5vw,48px)',lineHeight:.95,textTransform:'uppercase',margin:'10px 0 12px',color:WHITE}
const muted:any={color:'rgba(255,255,255,.48)',fontFamily:"'Inter',sans-serif",fontSize:13,lineHeight:1.6}
const inputStyle:any={background:'#0b0b0b',border:'1px solid rgba(255,255,255,.12)',color:WHITE,padding:'13px 14px',fontSize:14,outline:'none'}
const goldButton:any={background:GOLD,border:'none',color:'#0b0b0b',fontFamily:"'League Spartan',sans-serif",fontWeight:800,letterSpacing:'.12em',padding:'14px',cursor:'pointer'}
const ghostButton:any={background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.1)',color:'rgba(255,255,255,.65)',fontFamily:"'League Spartan',sans-serif",fontSize:9,fontWeight:700,letterSpacing:'.14em',padding:'6px 10px',cursor:'pointer'}
const dangerButton:any={background:'transparent',border:'1px solid rgba(192,57,43,.35)',color:'#e7a19a',fontFamily:"'League Spartan',sans-serif",fontSize:9,fontWeight:700,letterSpacing:'.12em',padding:'7px 9px',cursor:'pointer'}
const closeButton:any={background:'transparent',border:'1px solid rgba(255,255,255,.12)',color:'rgba(255,255,255,.65)',fontSize:22,width:34,height:34,cursor:'pointer'}
const labelStyle:any={fontFamily:"'League Spartan',sans-serif",fontSize:9,letterSpacing:'.12em',color:'rgba(255,255,255,.45)'}
const successStyle:any={background:'rgba(46,160,67,.12)',border:'1px solid rgba(46,160,67,.3)',color:'#9fe0a7',padding:'10px 12px',fontSize:12}
const formGrid:any={display:'grid',gridTemplateColumns:'repeat(2,minmax(0,1fr))',gap:10}
const modalBackdrop:any={position:'fixed',inset:0,background:'rgba(0,0,0,.72)',backdropFilter:'blur(8px)',display:'grid',placeItems:'center',padding:20,zIndex:300}
const modal:any={width:'min(680px,100%)',maxHeight:'90vh',overflowY:'auto',background:'#111',border:'1px solid rgba(212,175,55,.2)',padding:28,boxShadow:'0 30px 100px rgba(0,0,0,.65)'}
const errorStyle:any={background:'rgba(192,57,43,.12)',border:'1px solid rgba(192,57,43,.3)',color:'#f0a49b',padding:'10px 12px',fontSize:12}
const dashboardShell:any={minHeight:'100vh',background:'linear-gradient(135deg,#0b0b0b,#171717 55%,#0b0b0b)',color:WHITE}
const dashHeader:any={height:64,borderBottom:'1px solid rgba(212,175,55,.12)',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 24px',background:'rgba(11,11,11,.88)',backdropFilter:'blur(12px)'}
const card:any={background:'rgba(255,255,255,.035)',border:'1px solid rgba(255,255,255,.08)',padding:24}
const cardTitle:any={fontFamily:"'League Spartan',sans-serif",fontSize:11,letterSpacing:'.16em',color:GOLD,marginBottom:18}
const row:any={display:'flex',justifyContent:'space-between',alignItems:'center',padding:'14px 0',borderBottom:'1px solid rgba(255,255,255,.06)',fontFamily:"'Inter',sans-serif"}
const small:any={fontSize:11,color:'rgba(255,255,255,.4)',marginTop:4}
const text:any={fontFamily:"'Inter',sans-serif",fontSize:13,color:'rgba(255,255,255,.72)'}
const bigNumber:any={fontFamily:"'League Spartan',sans-serif",fontSize:52,fontWeight:800,color:WHITE}
const weightPill:any={border:'1px solid rgba(212,175,55,.22)',background:'rgba(212,175,55,.06)',padding:'10px 12px',fontFamily:"'League Spartan',sans-serif",color:WHITE}
const featureGrid:any={display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:10}
const feature:any={border:'1px solid rgba(255,255,255,.07)',padding:16,fontFamily:"'Inter',sans-serif",fontSize:13,display:'flex',justifyContent:'space-between',gap:12}
const arrowStyle:any={position:'fixed',top:'50%',transform:'translateY(-50%)',background:'rgba(212,175,55,.12)',border:'1px solid rgba(212,175,55,.25)',width:40,height:40,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',fontSize:18,transition:'all .15s',zIndex:10}
