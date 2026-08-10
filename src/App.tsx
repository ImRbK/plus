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
import { getSession, setSession, signIn, signOut, isAdmin, getOwnClient, getAllClients, getWeightProgress, type Session } from './supabase'

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
      {loading ? <div style={card}>A carregar…</div> : error ? <div style={errorStyle}>{error}</div> : admin ? <AdminView clients={clients}/> : <ClientView client={client} weights={weights}/>} 
    </main>
  </div>
}

function AdminView({clients}:{clients:any[]}) { return <div style={{display:'grid',gap:18,marginTop:28}}><div style={card}><div style={cardTitle}>CLIENTES</div>{clients.length===0?<p style={muted}>Ainda não existem perfis de cliente. Na próxima fase vamos adicionar o fluxo para criares clientes diretamente daqui.</p>:<div style={{display:'grid',gap:8}}>{clients.map(c=><div key={c.id} style={row}><div><strong>{c.full_name}</strong><div style={small}>{c.email||'Sem email'}</div></div><div style={{textAlign:'right'}}><strong>{c.current_weight ?? '—'} kg</strong><div style={small}>objetivo {c.goal_weight ?? '—'} kg</div></div></div>)}</div>}</div><div style={card}><div style={cardTitle}>PRÓXIMAS FERRAMENTAS</div><div style={featureGrid}>{['Treinos personalizados','Planos alimentares','Check-ins semanais','Gráficos de progresso'].map(x=><div key={x} style={feature}>{x}<span>EM BREVE</span></div>)}</div></div></div> }

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
