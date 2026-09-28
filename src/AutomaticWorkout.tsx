import { useRef, useState } from 'react'
import { saveGeneratedWorkouts, type Session } from './supabase'
import { availableSplits, equipments, estimatedMinutes, generatePlan, goals, levels, patterns, splits, toPayload, totals, validatePlan, type DraftWorkout, type Options, type Pattern } from './workoutGenerator'
import './automaticWorkout.css'

export function AutomaticWorkout({clientId,session,existingCount,onSaved}:{clientId:string;session:Session;existingCount:number;onSaved:()=>void}) {
  const [opened,setOpened]=useState(false)
  const [options,setOptions]=useState<Options>({goal:'fat-loss',level:'beginner',days:3,minutes:45,equipment:'gym',split:'auto',notes:'',excluded:[]})
  const [plan,setPlan]=useState<DraftWorkout[]>([])
  const [variation,setVariation]=useState(0),[editing,setEditing]=useState(false),[reviewed,setReviewed]=useState(false)
  const [saving,setSaving]=useState(false),[message,setMessage]=useState(''),[saved,setSaved]=useState(false)
  const requestId=useRef(crypto.randomUUID()),inFlight=useRef(false)
  // Once submitted, keep the payload frozen until a successful retry. The server may
  // have committed even when the response is lost; the same key must keep its meaning.
  const [attempted,setAttempted]=useState(false)
  const configure=(patch:Partial<Options>)=>{setOptions(o=>({...o,...patch}));setPlan([]);setReviewed(false);setMessage('');setSaved(false);setAttempted(false)}
  const generate=()=>{
    try{const next=generatePlan(options,variation);setPlan(next);setVariation(v=>v+1);setEditing(false);setReviewed(false);setSaved(false);setAttempted(false);requestId.current=crypto.randomUUID();setMessage('')}
    catch(e){setMessage((e as Error).message)}
  }
  const edit=(wi:number,ei:number,field:string,value:string|number)=>{setPlan(rows=>rows.map((w,i)=>i!==wi?w:{...w,exercises:w.exercises.map((e,j)=>j!==ei?e:{...e,[field]:value})}));setReviewed(false)}
  const save=async()=>{
    if(inFlight.current||saved) return
    const error=validatePlan(plan);if(error){setMessage(error);return}
    if(!reviewed){setMessage('Confirma a revisão do plano antes de guardar.');return}
    inFlight.current=true;setSaving(true);setAttempted(true);setMessage('')
    try{
      const result=await saveGeneratedWorkouts(session.access_token,clientId,requestId.current,toPayload(plan))
      setSaved(true);setEditing(false);setMessage(result.duplicate?'Este plano já estava guardado. Não foram criados duplicados.':'Plano semanal guardado com sucesso.')
      onSaved()
    }catch(e){setMessage(`${(e as Error).message} Podes repetir Guardar com segurança; o plano está bloqueado para manter a mesma gravação.`)}
    finally{inFlight.current=false;setSaving(false)}
  }
  const count=totals(plan), locked=saving||attempted&&!saved
  return <section className="auto-workout">
    <button className="aw-primary" type="button" aria-expanded={opened} onClick={()=>setOpened(v=>!v)}> {opened?'FECHAR GERADOR':'GERAR TREINO AUTOMÁTICO'}</button>
    {opened&&<div className="aw-panel">
      <h3>Uma semana de treino, pronta a ajustar</h3><p>Escolhe o perfil, gera uma proposta e revê antes de guardar para este cliente.</p>
      <fieldset disabled={locked} className="aw-fields">
        <label>Objetivo<select value={options.goal} onChange={e=>configure({goal:e.target.value as Options['goal']})}>{Object.entries(goals).map(([v,n])=><option key={v} value={v}>{n}</option>)}</select></label>
        <label>Nível<select value={options.level} onChange={e=>configure({level:e.target.value as Options['level']})}>{Object.entries(levels).map(([v,n])=><option key={v} value={v}>{n}</option>)}</select></label>
        <label>Dias por semana<select value={options.days} onChange={e=>configure({days:Number(e.target.value),split:'auto'})}>{[1,2,3,4,5,6].map(n=><option key={n}>{n}</option>)}</select></label>
        <label>Duração por sessão<select value={options.minutes} onChange={e=>configure({minutes:Number(e.target.value)})}>{[30,45,60,75,90].map(n=><option key={n} value={n}>{n} minutos</option>)}</select></label>
        <label>Local / equipamento<select value={options.equipment} onChange={e=>configure({equipment:e.target.value as Options['equipment']})}>{Object.entries(equipments).map(([v,n])=><option key={v} value={v}>{n}</option>)}</select></label>
        <label>Preferência de divisão<select value={options.split} onChange={e=>configure({split:e.target.value as Options['split']})}>{availableSplits(options.days).map(v=><option key={v} value={v}>{splits[v]}</option>)}</select></label>
        <label className="aw-wide">Limitações, lesões e notas<textarea maxLength={1500} value={options.notes} onChange={e=>configure({notes:e.target.value})} placeholder="Regista aqui o que precisa de ser considerado na revisão."/></label>
        <div className="aw-wide"><p>As notas são incluídas no plano, mas não são interpretadas clinicamente. Seleciona os movimentos a excluir e revê as alternativas para este cliente.</p><div className="aw-checks">{Object.entries(patterns).map(([v,n])=><label key={v}><input type="checkbox" checked={options.excluded.includes(v as Pattern)} onChange={e=>configure({excluded:e.target.checked?[...options.excluded,v as Pattern]:options.excluded.filter(p=>p!==v)})}/>{n}</label>)}</div></div>
      </fieldset>
      <div className="aw-actions"><button type="button" className="aw-primary" disabled={locked} onClick={generate}>{plan.length?'GERAR DE NOVO':'GERAR PRÉ-VISUALIZAÇÃO'}</button>{plan.length>0&&!saved&&<button type="button" disabled={locked} onClick={()=>setEditing(v=>!v)}>{editing?'VER RESUMO':'EDITAR'}</button>}</div>
      {plan.length>0&&<>
        <div className="aw-summary"><b>{plan.length} sessões</b><b>{count.exercises} exercícios</b><b>{count.sets} séries / semana</b></div>
        <p>Os dias sem sessão são de recuperação. A duração é uma estimativa e será recalculada ao editar séries e descansos. RIR = repetições que ainda conseguirias fazer.</p>
        {options.days===1&&<p className="aw-notice">Uma sessão por semana é uma opção de disponibilidade reduzida. Considera duas ou mais quando possível.</p>}
        {options.equipment==='home'&&<p className="aw-notice">Este plano de casa requer halteres, elástico e uma cadeira estável. Confirma que estão disponíveis.</p>}
        {plan.map((w,wi)=><article className="aw-session" key={wi}>
          <h4>{w.day} · {w.name}</h4><p>{w.exercises.length} exercícios · {w.exercises.reduce((n,e)=>n+e.sets,0)} séries · ~{estimatedMinutes(w.exercises)} min</p>
          {estimatedMinutes(w.exercises)>options.minutes&&<p className="aw-notice">Esta sessão ultrapassa a duração escolhida. Ajusta as séries, os descansos ou os exercícios.</p>}
          {editing?<fieldset disabled={locked} className="aw-fields"><label className="aw-wide">Nome da sessão<input maxLength={160} value={w.name} onChange={e=>{setPlan(p=>p.map((v,i)=>i===wi?{...v,name:e.target.value}:v));setReviewed(false)}}/></label><label className="aw-wide">Orientações<textarea maxLength={4000} value={w.description} onChange={e=>{setPlan(p=>p.map((v,i)=>i===wi?{...v,description:e.target.value}:v));setReviewed(false)}}/></label></fieldset>:<p>{w.description}</p>}
          {w.exercises.map((e,ei)=><div className="aw-exercise" key={ei}>{editing?<fieldset disabled={locked} className="aw-fields">
            <label className="aw-wide">Exercício {ei+1}<input maxLength={160} value={e.name} onChange={v=>edit(wi,ei,'name',v.target.value)}/></label>
            <label>Séries<input type="number" min={1} max={8} value={e.sets} onChange={v=>edit(wi,ei,'sets',Number(v.target.value))}/></label>
            <label>Repetições<input maxLength={40} value={e.reps} onChange={v=>edit(wi,ei,'reps',v.target.value)}/></label>
            <label>Descanso (s)<input type="number" min={30} max={300} value={e.rest_seconds} onChange={v=>edit(wi,ei,'rest_seconds',Number(v.target.value))}/></label>
            <label>RIR<input type="number" min={0} max={5} value={e.rir} onChange={v=>edit(wi,ei,'rir',Number(v.target.value))}/></label>
            <label className="aw-wide">Notas<textarea maxLength={2000} value={e.notes} onChange={v=>edit(wi,ei,'notes',v.target.value)}/></label>
            <button type="button" disabled={w.exercises.length<=1} onClick={()=>{setPlan(p=>p.map((v,i)=>i===wi?{...v,exercises:v.exercises.filter((_,j)=>j!==ei)}:v));setReviewed(false)}}>REMOVER EXERCÍCIO</button>
          </fieldset>:<><b>{ei+1}. {e.name}</b><span>{e.sets} × {e.reps} · {e.rest_seconds}s descanso · RIR {e.rir}</span><small>{e.notes}</small></>}</div>)}
        </article>)}
        {!saved&&<><p>Serão adicionadas {plan.length} sessões. Os {existingCount} treinos atuais serão mantidos. «Gerar de novo» altera apenas esta proposta.</p><label className="aw-review"><input type="checkbox" disabled={locked} checked={reviewed} onChange={e=>setReviewed(e.target.checked)}/>Revi os exercícios, equipamento, volume e limitações deste cliente.</label><button className="aw-primary" type="button" disabled={saving||!reviewed||!!validatePlan(plan)} onClick={save}>{saving?'A GUARDAR…':attempted?'REPETIR GUARDAR':'GUARDAR PLANO SEMANAL'}</button></>}
      </>}
      {message&&<p className="aw-notice" role="status">{message}</p>}
    </div>}
  </section>
}
