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

const PAGES = [
  { component: P01_Cover, title: 'Capa' },
  { component: P02_Copyright, title: 'Direitos de Autor' },
  { component: P03_AboutAuthor, title: 'Sobre o Autor' },
  { component: P04_TOC, title: 'Índice' },
  { component: P05_ChapterDivider, title: 'Divisor — Cap. 1' },
  { component: P06_MuscleGrowth, title: 'Crescimento Muscular' },
  { component: P07_Calories, title: 'Calorias' },
  { component: P08_Macros, title: 'Macronutrientes' },
  { component: P09_Protein, title: 'Guia de Proteína' },
  { component: P10_Carbs, title: 'Hidratos de Carbono' },
  { component: P11_Fats, title: 'Gorduras Alimentares' },
  { component: P12_MealBuilding, title: 'Construção de Refeições' },
  { component: P13_GroceryList, title: 'Lista de Compras' },
  { component: P14_FoodsEat, title: 'Alimentos a Consumir' },
  { component: P15_FoodsAvoid, title: 'Alimentos a Evitar' },
  { component: P16_MealPlan, title: 'Plano Alimentar' },
  { component: P17_Shakes, title: 'Batidos Hipercalóricos' },
  { component: P18_TrainingDivider, title: 'Divisor — Treino' },
  { component: P19_WorkoutFundamentals, title: 'Fundamentos do Treino' },
  { component: P20_ProgressiveOverload, title: 'Sobrecarga Progressiva' },
  { component: P21_WorkoutProgram, title: 'Programa de 4 Dias' },
  { component: P22_Technique, title: 'Técnica de Exercício' },
  { component: P23_Recovery, title: 'Recuperação' },
  { component: P24_Sleep, title: 'Sono' },
  { component: P25_Supplements, title: 'Suplementos' },
  { component: P26_FAQ, title: 'Perguntas Frequentes' },
  { component: P27_Mistakes, title: 'Erros Comuns' },
  { component: P28_TransformationPlan, title: 'Plano de 12 Semanas' },
  { component: P29_ProgressTracker, title: 'Registo de Progresso' },
  { component: P30_WorkoutLog, title: 'Diário de Treino' },
  { component: P31_GroceryChecklist, title: 'Lista de Compras Imprimível' },
  { component: P32_HabitTracker, title: 'Registo de Hábitos' },
  { component: P33_WeeklyPlanner, title: 'Planeador Semanal' },
  { component: P34_BeforeAfter, title: 'Antes e Depois' },
  { component: P35_ActionPlan, title: 'Plano de Ação Final' },
  { component: P36_ThankYou, title: 'Obrigado' },
  { component: P37_QRCode, title: 'Código QR / Coaching' },
]

const GOLD = '#D4AF37'
const WHITE = '#FFFFFF'

const SECTIONS = [
  { label: 'Introdução', range: [0, 3] },
  { label: 'Nutrição', range: [4, 16] },
  { label: 'Treino', range: [17, 24] },
  { label: 'FAQ e Ferramentas', range: [25, 36] },
]

export default function App() {
  const [current, setCurrent] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scale, setScale] = useState(1)

  const PAGE_W = 794
  const PAGE_H = 1123

  useEffect(() => {
    function handleResize() {
      const availW = window.innerWidth - 120
      const availH = window.innerHeight - 140
      const scaleW = availW / PAGE_W
      const scaleH = availH / PAGE_H
      setScale(Math.min(1, scaleW, scaleH))
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const prev = useCallback(() => setCurrent((c) => Math.max(0, c - 1)), [])
  const next = useCallback(() => setCurrent((c) => Math.min(PAGES.length - 1, c + 1)), [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next()
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prev()
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next])

  const CurrentPage = PAGES[current].component

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #141414 0%, #1C1C1C 50%, #111 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
        userSelect: 'none',
      }}
    >
      {/* Ambient glow behind page */}
      <div
        style={{
          position: 'absolute',
          width: PAGE_W * scale + 60,
          height: PAGE_H * scale + 60,
          background: 'radial-gradient(ellipse, rgba(212,175,55,0.06) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      {/* Top bar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          background: 'rgba(11,11,11,0.9)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(212,175,55,0.12)',
          zIndex: 100,
        }}
      >
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span
            style={{
              fontFamily: "'League Spartan', sans-serif",
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: '0.25em',
              color: GOLD,
            }}
          >
            MASSA+
          </span>
          <span
            style={{
              width: 1,
              height: 16,
              background: 'rgba(255,255,255,0.1)',
            }}
          />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 10,
              color: 'rgba(255,255,255,0.35)',
              letterSpacing: '0.06em',
            }}
          >
            O Guia Completo para Construir Músculo
          </span>
        </div>

        {/* Section nav */}
        <div style={{ display: 'flex', gap: 4 }}>
          {SECTIONS.map(({ label, range }) => {
            const active = current >= range[0] && current <= range[1]
            return (
              <button
                key={label}
                onClick={() => setCurrent(range[0])}
                style={{
                  background: active ? 'rgba(212,175,55,0.15)' : 'transparent',
                  border: active ? '1px solid rgba(212,175,55,0.3)' : '1px solid transparent',
                  color: active ? GOLD : 'rgba(255,255,255,0.35)',
                  fontFamily: "'League Spartan', sans-serif",
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  padding: '5px 10px',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {label}
              </button>
            )
          })}
        </div>

        {/* Page indicator + menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span
            style={{
              fontFamily: "'League Spartan', sans-serif",
              fontSize: 11,
              color: 'rgba(255,255,255,0.35)',
            }}
          >
            <span style={{ color: GOLD, fontWeight: 700 }}>{current + 1}</span>
            <span style={{ margin: '0 4px' }}>/</span>
            {PAGES.length}
          </span>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.5)',
              fontFamily: "'League Spartan', sans-serif",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              padding: '5px 10px',
              cursor: 'pointer',
            }}
          >
            Páginas
          </button>
        </div>
      </div>

      {/* Pages menu overlay */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 48,
            right: 0,
            width: 260,
            height: 'calc(100vh - 48px)',
            background: 'rgba(11,11,11,0.97)',
            borderLeft: '1px solid rgba(212,175,55,0.15)',
            overflowY: 'auto',
            zIndex: 99,
            padding: '16px 0',
          }}
        >
          {PAGES.map((page, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); setMenuOpen(false) }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                width: '100%',
                padding: '9px 16px',
                background: i === current ? 'rgba(212,175,55,0.1)' : 'transparent',
                border: 'none',
                borderLeft: i === current ? `2px solid ${GOLD}` : '2px solid transparent',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <span
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 12,
                  color: i === current ? GOLD : 'rgba(255,255,255,0.25)',
                  minWidth: 24,
                }}
              >
                {i + 1}
              </span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  color: i === current ? WHITE : 'rgba(255,255,255,0.45)',
                }}
              >
                {page.title}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Main page display area */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 48,
          paddingBottom: 72,
          width: '100%',
        }}
        onClick={() => menuOpen && setMenuOpen(false)}
      >
        {/* Prev arrow */}
        <button
          onClick={prev}
          disabled={current === 0}
          style={{
            position: 'fixed',
            left: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            background: current === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(212,175,55,0.12)',
            border: `1px solid ${current === 0 ? 'rgba(255,255,255,0.06)' : 'rgba(212,175,55,0.25)'}`,
            color: current === 0 ? 'rgba(255,255,255,0.15)' : GOLD,
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: current === 0 ? 'default' : 'pointer',
            fontSize: 18,
            transition: 'all 0.15s',
            zIndex: 10,
          }}
        >
          ←
        </button>

        {/* Page container with scale */}
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
            boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.08)',
          }}
        >
          <CurrentPage />
        </div>

        {/* Next arrow */}
        <button
          onClick={next}
          disabled={current === PAGES.length - 1}
          style={{
            position: 'fixed',
            right: menuOpen ? 276 : 16,
            top: '50%',
            transform: 'translateY(-50%)',
            background: current === PAGES.length - 1 ? 'rgba(255,255,255,0.03)' : 'rgba(212,175,55,0.12)',
            border: `1px solid ${current === PAGES.length - 1 ? 'rgba(255,255,255,0.06)' : 'rgba(212,175,55,0.25)'}`,
            color: current === PAGES.length - 1 ? 'rgba(255,255,255,0.15)' : GOLD,
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: current === PAGES.length - 1 ? 'default' : 'pointer',
            fontSize: 18,
            transition: 'all 0.15s',
            zIndex: 10,
          }}
        >
          →
        </button>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: menuOpen ? 260 : 0,
          height: 52,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
          background: 'rgba(11,11,11,0.88)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          zIndex: 100,
          padding: '0 56px',
        }}
      >
        {/* Progress dots / bar */}
        <div
          style={{
            flex: 1,
            height: 3,
            background: 'rgba(255,255,255,0.06)',
            borderRadius: 2,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              width: `${((current + 1) / PAGES.length) * 100}%`,
              background: GOLD,
              transition: 'width 0.3s ease',
            }}
          />
        </div>

        <div
          style={{
            marginLeft: 14,
            fontFamily: "'Inter', sans-serif",
            fontSize: 10,
            color: 'rgba(255,255,255,0.3)',
            whiteSpace: 'nowrap',
            minWidth: 120,
            textAlign: 'right',
          }}
        >
          {PAGES[current].title}
        </div>

        <div style={{ marginLeft: 14, display: 'flex', gap: 2 }}>
          {/* Mini dot nav - show groups of dots */}
          {PAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? 16 : 6,
                height: 6,
                borderRadius: 3,
                background: i === current ? GOLD : 'rgba(255,255,255,0.12)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.2s',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
