import React from 'react'

// ─── Design Tokens ─────────────────────────────────────────────────────────────

export const GOLD = '#D4AF37'
export const GOLD_DIM = 'rgba(212,175,55,0.12)'
export const BLACK = '#0B0B0B'
export const WHITE = '#FFFFFF'
export const GRAY = '#F5F5F5'
export const GRAY_MID = '#888888'
export const GRAY_DARK = '#1A1A1A'
export const GRAY_BORDER = '#E0E0E0'
export const DANGER = '#C0392B'
export const SUCCESS = '#27AE60'

// ─── Page Wrapper ──────────────────────────────────────────────────────────────

export function Page({
  children,
  dark = false,
  bg,
  style = {},
}: {
  children: React.ReactNode
  dark?: boolean
  bg?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      style={{
        width: 794,
        height: 1123,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: bg ?? (dark ? BLACK : WHITE),
        color: dark ? WHITE : BLACK,
        fontFamily: "'Inter', sans-serif",
        flexShrink: 0,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

// ─── Footer ────────────────────────────────────────────────────────────────────

export function Footer({
  pageNumber,
  chapter,
  dark = false,
}: {
  pageNumber: number
  chapter?: string
  dark?: boolean
}) {
  const textColor = dark ? 'rgba(255,255,255,0.32)' : GRAY_MID
  const ruleColor = dark ? 'rgba(212,175,55,0.2)' : GRAY_BORDER

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 26,
        left: 56,
        right: 56,
      }}
    >
      <div style={{ height: 1, background: ruleColor, marginBottom: 9 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span
          style={{
            fontFamily: "'League Spartan', sans-serif",
            fontSize: 8,
            fontWeight: 800,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: GOLD,
          }}
        >
          MASSA+
        </span>
        {chapter ? (
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 7.5,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: textColor,
            }}
          >
            {chapter}
          </span>
        ) : (
          <span />
        )}
        <span
          style={{
            fontFamily: "'League Spartan', sans-serif",
            fontSize: 9,
            fontWeight: 500,
            color: textColor,
            minWidth: 18,
            textAlign: 'right',
          }}
        >
          {pageNumber}
        </span>
      </div>
    </div>
  )
}

// ─── Gold Rule ─────────────────────────────────────────────────────────────────

export function GoldRule({
  width = '100%',
  height = 2,
  opacity = 1,
}: {
  width?: string | number
  height?: number
  opacity?: number
}) {
  return <div style={{ height, background: GOLD, width, opacity }} />
}

// ─── Thin Rule ─────────────────────────────────────────────────────────────────

export function ThinRule({ dark = false, color }: { dark?: boolean; color?: string }) {
  return (
    <div
      style={{
        height: 1,
        background: color ?? (dark ? 'rgba(255,255,255,0.1)' : GRAY_BORDER),
      }}
    />
  )
}

// ─── Section Label ─────────────────────────────────────────────────────────────

export function Label({
  children,
  size = 9,
  color = GOLD,
}: {
  children: React.ReactNode
  size?: number
  color?: string
}) {
  return (
    <div
      style={{
        fontFamily: "'League Spartan', sans-serif",
        fontSize: size,
        fontWeight: 800,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color,
        marginBottom: 10,
      }}
    >
      {children}
    </div>
  )
}

// ─── Page Title ────────────────────────────────────────────────────────────────

export function PageTitle({
  children,
  dark = false,
  size = 34,
  style = {},
}: {
  children: React.ReactNode
  dark?: boolean
  size?: number
  style?: React.CSSProperties
}) {
  return (
    <h1
      style={{
        fontFamily: "'League Spartan', sans-serif",
        fontSize: size,
        fontWeight: 800,
        lineHeight: 1.03,
        color: dark ? WHITE : BLACK,
        margin: '0 0 6px 0',
        letterSpacing: '-0.01em',
        ...style,
      }}
    >
      {children}
    </h1>
  )
}

// ─── Body Text ─────────────────────────────────────────────────────────────────

export function Body({
  children,
  size = 12.5,
  color = '#444',
  style = {},
}: {
  children: React.ReactNode
  size?: number
  color?: string
  style?: React.CSSProperties
}) {
  return (
    <p
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: size,
        lineHeight: 1.78,
        color,
        margin: 0,
        ...style,
      }}
    >
      {children}
    </p>
  )
}

// ─── Tips Box ──────────────────────────────────────────────────────────────────

export function TipsBox({
  title = 'Pro Tip',
  children,
}: {
  title?: string
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        borderLeft: `3px solid ${GOLD}`,
        background: GOLD_DIM,
        padding: '13px 17px',
      }}
    >
      <div
        style={{
          fontFamily: "'League Spartan', sans-serif",
          fontSize: 8,
          fontWeight: 800,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: GOLD,
          marginBottom: 5,
        }}
      >
        ★ {title}
      </div>
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 11.5,
          lineHeight: 1.65,
          color: '#333',
        }}
      >
        {children}
      </div>
    </div>
  )
}

// ─── Warning Box ───────────────────────────────────────────────────────────────

export function WarningBox({
  title = 'Warning',
  children,
}: {
  title?: string
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        borderLeft: `3px solid ${DANGER}`,
        background: 'rgba(192,57,43,0.05)',
        padding: '13px 17px',
      }}
    >
      <div
        style={{
          fontFamily: "'League Spartan', sans-serif",
          fontSize: 8,
          fontWeight: 800,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: DANGER,
          marginBottom: 5,
        }}
      >
        ⚠ {title}
      </div>
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 11.5,
          lineHeight: 1.65,
          color: '#333',
        }}
      >
        {children}
      </div>
    </div>
  )
}

// ─── Quote Block ───────────────────────────────────────────────────────────────

export function Quote({
  children,
  attribution,
  dark = false,
  size = 20,
}: {
  children: React.ReactNode
  attribution?: string
  dark?: boolean
  size?: number
}) {
  return (
    <div style={{ borderLeft: `3px solid ${GOLD}`, paddingLeft: 18, paddingTop: 4, paddingBottom: 4 }}>
      <div
        style={{
          fontFamily: "'League Spartan', sans-serif",
          fontSize: size,
          fontWeight: 600,
          lineHeight: 1.3,
          color: dark ? WHITE : BLACK,
          marginBottom: attribution ? 8 : 0,
        }}
      >
        "{children}"
      </div>
      {attribution && (
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 9.5,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: GOLD,
          }}
        >
          — {attribution}
        </div>
      )}
    </div>
  )
}

// ─── Callout Box ───────────────────────────────────────────────────────────────

export function Callout({
  children,
  bg = BLACK,
  color = WHITE,
  padding = '16px 20px',
}: {
  children: React.ReactNode
  bg?: string
  color?: string
  padding?: string
}) {
  return (
    <div
      style={{
        background: bg,
        padding,
        color,
        fontFamily: "'Inter', sans-serif",
        fontSize: 12,
        lineHeight: 1.68,
      }}
    >
      {children}
    </div>
  )
}

// ─── Checklist Item ────────────────────────────────────────────────────────────

export function CheckItem({
  children,
  checked = false,
  print = false,
}: {
  children: React.ReactNode
  checked?: boolean
  print?: boolean
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 9,
        paddingBottom: 8,
        marginBottom: 8,
        borderBottom: `1px solid ${GRAY_BORDER}`,
      }}
    >
      <div
        style={{
          width: 14,
          height: 14,
          border: checked ? 'none' : `1.5px solid ${print ? '#AAA' : '#CCC'}`,
          background: checked ? GOLD : 'transparent',
          flexShrink: 0,
          marginTop: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {checked && (
          <span style={{ color: BLACK, fontSize: 8, fontWeight: 800, lineHeight: 1 }}>✓</span>
        )}
      </div>
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 11.5,
          lineHeight: 1.5,
          color: BLACK,
        }}
      >
        {children}
      </span>
    </div>
  )
}

// ─── Exercise Card ─────────────────────────────────────────────────────────────

export function ExerciseCard({
  index = 1,
  name,
  sets,
  reps,
  rest,
  muscle,
  tip,
}: {
  index?: number
  name: string
  sets: string
  reps: string
  rest: string
  muscle: string
  tip?: string
}) {
  return (
    <div style={{ border: `1px solid ${GRAY_BORDER}`, display: 'flex' }}>
      <div
        style={{
          width: 36,
          background: GOLD,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          fontFamily: "'League Spartan', sans-serif",
          fontSize: 14,
          fontWeight: 800,
          color: BLACK,
        }}
      >
        {index}
      </div>
      <div style={{ flex: 1, padding: '11px 13px' }}>
        <div
          style={{
            fontFamily: "'League Spartan', sans-serif",
            fontSize: 13,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            marginBottom: 7,
          }}
        >
          {name}
        </div>
        <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
          {[
            { label: 'Sets', value: sets },
            { label: 'Reps', value: reps },
            { label: 'Rest', value: rest },
            { label: 'Target', value: muscle },
          ].map(({ label, value }) => (
            <div key={label}>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 7.5,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: GRAY_MID,
                  marginBottom: 1,
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontFamily: "'League Spartan', sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {value}
              </div>
            </div>
          ))}
        </div>
        {tip && (
          <div
            style={{
              marginTop: 7,
              fontFamily: "'Inter', sans-serif",
              fontSize: 10,
              color: GRAY_MID,
              fontStyle: 'italic',
              lineHeight: 1.45,
            }}
          >
            {tip}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Meal Card ─────────────────────────────────────────────────────────────────

export function MealCard({
  meal,
  time,
  calories,
  protein,
  carbs,
  fat,
  foods,
}: {
  meal: string
  time: string
  calories: number
  protein: number
  carbs: number
  fat: number
  foods: string[]
}) {
  return (
    <div style={{ border: `1px solid ${GRAY_BORDER}`, padding: '11px 13px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 7,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'League Spartan', sans-serif",
              fontSize: 12,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            {meal}
          </div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 9,
              color: GRAY_MID,
              marginTop: 1,
            }}
          >
            {time}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 22,
              color: GOLD,
              lineHeight: 1,
            }}
          >
            {calories}
          </span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 8.5,
              color: GRAY_MID,
              marginLeft: 2,
            }}
          >
            kcal
          </span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 14, marginBottom: 7 }}>
        {[
          { label: 'P', value: `${protein}g`, color: '#E74C3C' },
          { label: 'C', value: `${carbs}g`, color: '#E67E22' },
          { label: 'F', value: `${fat}g`, color: '#3498DB' },
        ].map(({ label, value, color }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: color,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 9,
                color: GRAY_MID,
              }}
            >
              {label}:{' '}
            </span>
            <span
              style={{
                fontFamily: "'League Spartan', sans-serif",
                fontSize: 10,
                fontWeight: 600,
              }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>
      <div style={{ height: 1, background: GRAY_BORDER, marginBottom: 7 }} />
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 10.5,
          color: '#555',
          lineHeight: 1.5,
        }}
      >
        {foods.join(' · ')}
      </div>
    </div>
  )
}

// ─── Big Stat Display ──────────────────────────────────────────────────────────

export function BigStat({
  value,
  unit = '',
  label,
  dark = false,
}: {
  value: string
  unit?: string
  label: string
  dark?: boolean
}) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 56,
          lineHeight: 1,
          color: GOLD,
          letterSpacing: '0.02em',
        }}
      >
        {value}
        {unit && (
          <span
            style={{
              fontSize: 22,
              color: dark ? 'rgba(255,255,255,0.4)' : GRAY_MID,
            }}
          >
            {unit}
          </span>
        )}
      </div>
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 8.5,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: dark ? 'rgba(255,255,255,0.38)' : GRAY_MID,
          marginTop: 4,
        }}
      >
        {label}
      </div>
    </div>
  )
}

// ─── Numbered Item ─────────────────────────────────────────────────────────────

export function NumItem({
  number,
  title,
  body,
  dark = false,
  compact = false,
}: {
  number: number
  title: string
  body: string
  dark?: boolean
  compact?: boolean
}) {
  return (
    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
      <div
        style={{
          width: compact ? 28 : 34,
          height: compact ? 28 : 34,
          background: GOLD,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          fontFamily: "'League Spartan', sans-serif",
          fontSize: compact ? 13 : 15,
          fontWeight: 800,
          color: BLACK,
        }}
      >
        {number}
      </div>
      <div>
        <div
          style={{
            fontFamily: "'League Spartan', sans-serif",
            fontSize: compact ? 12 : 13,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: dark ? WHITE : BLACK,
            marginBottom: 3,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: compact ? 11 : 11.5,
            lineHeight: 1.62,
            color: dark ? 'rgba(255,255,255,0.55)' : '#555',
          }}
        >
          {body}
        </div>
      </div>
    </div>
  )
}

// ─── Photo ─────────────────────────────────────────────────────────────────────

export function Photo({
  src,
  alt,
  w,
  h,
  overlay = false,
  overlayOpacity = 0.45,
  grayscale = false,
}: {
  src: string
  alt: string
  w: string | number
  h: string | number
  overlay?: boolean
  overlayOpacity?: number
  grayscale?: boolean
}) {
  return (
    <div
      style={{
        width: w,
        height: h,
        position: 'relative',
        overflow: 'hidden',
        background: GRAY_DARK,
        flexShrink: 0,
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          filter: grayscale ? 'grayscale(100%)' : 'none',
        }}
      />
      {overlay && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: BLACK,
            opacity: overlayOpacity,
          }}
        />
      )}
    </div>
  )
}

// ─── Supplement Card ───────────────────────────────────────────────────────────

export function SupCard({
  name,
  dose,
  timing,
  benefit,
  icon,
}: {
  name: string
  dose: string
  timing: string
  benefit: string
  icon: string
}) {
  return (
    <div
      style={{
        border: `1px solid ${GRAY_BORDER}`,
        padding: '14px 14px 12px',
        background: WHITE,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
        <div
          style={{
            fontFamily: "'League Spartan', sans-serif",
            fontSize: 13,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}
        >
          {name}
        </div>
        <span style={{ fontSize: 18, lineHeight: 1 }}>{icon}</span>
      </div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
        <div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 7.5,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: GRAY_MID,
              marginBottom: 1,
            }}
          >
            Dose
          </div>
          <div
            style={{
              fontFamily: "'League Spartan', sans-serif",
              fontSize: 12,
              fontWeight: 700,
              color: GOLD,
            }}
          >
            {dose}
          </div>
        </div>
        <div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 7.5,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: GRAY_MID,
              marginBottom: 1,
            }}
          >
            Timing
          </div>
          <div
            style={{
              fontFamily: "'League Spartan', sans-serif",
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {timing}
          </div>
        </div>
      </div>
      <div style={{ height: 1, background: GRAY_BORDER, marginBottom: 8 }} />
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 10.5,
          lineHeight: 1.55,
          color: '#555',
        }}
      >
        {benefit}
      </div>
    </div>
  )
}
