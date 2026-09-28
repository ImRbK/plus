export type Goal = 'fat-loss' | 'hypertrophy' | 'strength' | 'maintenance'
export type Level = 'beginner' | 'intermediate' | 'advanced'
export type Equipment = 'gym' | 'home' | 'machines'
export type Split = 'auto' | 'full-body' | 'upper-lower' | 'ppl'
export type Pattern = 'squat' | 'hinge' | 'push' | 'pull' | 'shoulder' | 'core' | 'arms'
export type Options = { goal: Goal; level: Level; days: number; minutes: number; equipment: Equipment; split: Split; notes: string; excluded: Pattern[] }
export type DraftExercise = { name: string; sets: number; reps: string; rest_seconds: number; rir: number; notes: string; pattern: Pattern }
export type DraftWorkout = { name: string; description: string; day: string; exercises: DraftExercise[] }
export const goals: Record<Goal,string> = { 'fat-loss':'Perda de gordura', hypertrophy:'Hipertrofia', strength:'Força', maintenance:'Manutenção' }
export const levels: Record<Level,string> = { beginner:'Iniciante', intermediate:'Intermédio', advanced:'Avançado' }
export const equipments: Record<Equipment,string> = { gym:'Ginásio completo', home:'Casa — halteres e elástico', machines:'Máquinas' }
export const splits: Record<Split,string> = { auto:'Automático', 'full-body':'Corpo inteiro', 'upper-lower':'Superior / inferior', ppl:'Push / Pull / Legs' }
export const patterns: Record<Pattern,string> = { squat:'Dominante de joelho', hinge:'Anca / posteriores', push:'Empurrar horizontal', pull:'Puxar', shoulder:'Ombros', core:'Abdominais / core', arms:'Braços' }
const library: Record<Equipment,Record<Pattern,string[]>> = {
  gym:{squat:['Leg press','Agachamento goblet'],hinge:['Leg curl sentado','Peso morto romeno com halteres'],push:['Chest press','Supino com halteres'],pull:['Remada sentada na polia','Puxada na polia'],shoulder:['Elevação lateral com halteres','Shoulder press na máquina'],core:['Dead bug','Pallof press'],arms:['Curl de bíceps na polia','Extensão de tríceps na polia']},
  home:{squat:['Agachamento goblet','Agachamento para cadeira estável'],hinge:['Peso morto romeno com halteres','Ponte de glúteos no chão'],push:['Supino no chão com halteres','Flexão com joelhos apoiados'],pull:['Remada com halteres','Remada sentada com elástico à volta dos pés'],shoulder:['Elevação lateral com halteres','Press sentado com halteres'],core:['Dead bug','Bird dog'],arms:['Curl de bíceps com halteres','Extensão de tríceps com halter']},
  machines:{squat:['Leg press','Hack squat'],hinge:['Leg curl sentado','Leg curl deitado'],push:['Chest press','Chest press inclinado'],pull:['Remada na máquina','Puxada na máquina'],shoulder:['Elevação lateral na máquina','Shoulder press na máquina'],core:['Abdominal na máquina','Rotação de tronco na máquina'],arms:['Bíceps na máquina','Tríceps na máquina']},
}
export function availableSplits(days:number): Split[] {
  return ['auto', ...(days<=3?['full-body' as const]:[]), ...(days>=4?['upper-lower' as const]:[]), ...([3,6].includes(days)?['ppl' as const]:[])]
}
const schedule: Record<number,string[]> = {1:['Segunda'],2:['Segunda','Quinta'],3:['Segunda','Quarta','Sexta'],4:['Segunda','Terça','Quinta','Sexta'],5:['Segunda','Terça','Quarta','Sexta','Sábado'],6:['Segunda','Terça','Quarta','Quinta','Sexta','Sábado']}
const sessions: Record<string,Pattern[]> = { 'Corpo inteiro':['squat','push','pull','hinge','shoulder','core'], Superior:['push','pull','shoulder','pull','arms','core'], Inferior:['squat','hinge','squat','hinge','core'], Push:['push','shoulder','push','arms','core'], Pull:['pull','pull','arms','core'], Legs:['squat','hinge','squat','hinge','core'] }
// Includes an 8 minute warm-up, ~45 s execution/set and 1 minute setup/exercise.
export function estimatedMinutes(exercises:DraftExercise[]):number {
  return Math.ceil(8+exercises.reduce((n,e)=>n+1+e.sets*.75+Math.max(0,e.sets-1)*e.rest_seconds/60,0))
}
export function totals(plan:DraftWorkout[]) {
  return { exercises:plan.reduce((n,w)=>n+w.exercises.length,0), sets:plan.reduce((n,w)=>n+w.exercises.reduce((s,e)=>s+e.sets,0),0) }
}
export function generatePlan(o:Options, variation=0):DraftWorkout[] {
  if(!Number.isInteger(o.days)||o.days<1||o.days>6||o.minutes<30||o.minutes>90||!availableSplits(o.days).includes(o.split)) throw new Error('Escolhe uma combinação válida de dias, duração e divisão.')
  if(!goals[o.goal]||!levels[o.level]||!equipments[o.equipment]) throw new Error('Configuração inválida.')
  const split=o.split==='auto'?(o.days<=3?'full-body':o.days===6?'ppl':'upper-lower'):o.split
  const names=split==='full-body'?Array(o.days).fill('Corpo inteiro'):split==='ppl'?['Push','Pull','Legs','Push','Pull','Legs'].slice(0,o.days):o.days===5?['Superior','Inferior','Push','Pull','Legs']:Array.from({length:o.days},(_,i)=>i%2?'Inferior':'Superior')
  return names.map((label:string,i:number)=>{
    const seen=new Set<string>()
    const chosen=sessions[label].filter(p=>!o.excluded.includes(p))
    const exercises:DraftExercise[]=chosen.map((pattern,idx)=>{
      let candidates=library[o.equipment][pattern]
      if(pattern==='arms'&&label==='Push') candidates=candidates.filter(n=>n.includes('tríceps')||n.includes('Tríceps'))
      if(pattern==='arms'&&label==='Pull') candidates=candidates.filter(n=>n.includes('bíceps')||n.includes('Bíceps'))
      const offset=(variation+i+idx)%candidates.length
      const name=candidates[offset]
      const actualName=seen.has(name)?candidates.find(n=>!seen.has(n))||name:name
      seen.add(actualName)
      const compound=['squat','push','pull'].includes(pattern)
      const strength=o.goal==='strength'&&compound&&o.level!=='beginner'
      const sets=o.level==='beginner'?2:o.goal==='hypertrophy'?(o.level==='advanced'?4:3):o.goal==='strength'?3:2
      return {name:actualName,sets,reps:strength?'4–6':pattern==='core'?'10–12':compound?'8–12':'10–15',rest_seconds:strength?180:compound?120:75,rir:o.level==='beginner'?3:o.goal==='fat-loss'?3:2,pattern,notes:pattern==='core'?'Repetições por lado quando aplicável. Movimento lento e controlado.':'Controlar a descida e manter amplitude confortável. Ajustar a carga para cumprir o RIR.'}
    })
    // Preserve movement coverage before removing optional accessory exercises.
    while(estimatedMinutes(exercises)>o.minutes){
      const reducible=[...exercises].reverse().find(e=>e.sets>2)
      if(reducible) reducible.sets--
      else if(exercises.length>3) exercises.pop()
      else break
    }
    if(exercises.length<2) throw new Error('As exclusões deixam esta divisão sem exercícios suficientes. Altera a divisão ou prepara o treino manualmente.')
    return {name:`Treino ${String.fromCharCode(65+i)} — ${label}`,day:schedule[o.days][i],description:`${schedule[o.days][i]} · ${goals[o.goal]} · ${levels[o.level]} · ${equipments[o.equipment]}. Aquecimento: 8 min, incluindo séries leves de aproximação. Duração estimada: ${estimatedMinutes(exercises)} min (limite ${o.minutes} min). ${o.goal==='fat-loss'?'Volume moderado para preservar força e massa muscular durante a perda de gordura. ':''}Aumentar a carga gradualmente ao atingir o topo das repetições com o RIR previsto.${o.notes.trim()?` Notas do treinador: ${o.notes.trim()}`:''}`,exercises}
  })
}
export function validatePlan(plan:DraftWorkout[]):string {
  if(!plan.length||plan.length>6) return 'O plano deve ter entre 1 e 6 sessões.'
  for(const w of plan){
    if(!w.name.trim()||w.name.length>160||w.description.length>4000||!w.exercises.length||w.exercises.length>12) return 'Revê os nomes e o número de exercícios de cada sessão.'
    for(const e of w.exercises) if(!e.name.trim()||e.name.length>160||!Number.isInteger(e.sets)||e.sets<1||e.sets>8||!e.reps.trim()||e.reps.length>40||!Number.isInteger(e.rest_seconds)||e.rest_seconds<30||e.rest_seconds>300||!Number.isInteger(e.rir)||e.rir<0||e.rir>5||e.notes.length>2000) return 'Preenche os exercícios: 1–8 séries, repetições, descanso 30–300 s e RIR 0–5.'
  }
  return ''
}
export function toPayload(plan:DraftWorkout[]) {
  const error=validatePlan(plan); if(error) throw new Error(error)
  return plan.map(w=>({name:w.name.trim(),description:w.description.trim().replace(/Duração estimada: \d+ min/,`Duração estimada: ${estimatedMinutes(w.exercises)} min`),exercises:w.exercises.map((e,i)=>({name:e.name.trim(),sets:e.sets,reps:e.reps.trim(),rest_seconds:e.rest_seconds,notes:`RIR ${e.rir}. ${e.notes.trim()}`,exercise_order:i}))}))
}
