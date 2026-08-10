import {
  Page,
  Footer,
  GoldRule,
  ThinRule,
  Label,
  PageTitle,
  Body,
  TipsBox,
  WarningBox,
  Quote,
  Callout,
  CheckItem,
  ExerciseCard,
  MealCard,
  BigStat,
  NumItem,
  SupCard,
  GOLD,
  BLACK,
  WHITE,
  GRAY,
  GRAY_MID,
  GRAY_DARK,
  GRAY_BORDER,
  DANGER,
  SUCCESS,
} from "./components"

// ─── URLs das imagens ──────────────────────────────────────────────────────────

const IMG = {
  cover:
    "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=794&h=1123&fit=crop&auto=format",
  author:
    "https://images.unsplash.com/photo-1634215556911-69df7d0acf1f?w=320&h=1123&fit=crop&auto=format",
  physique:
    "https://images.unsplash.com/photo-1610997519153-d572d10899ea?w=400&h=560&fit=crop&auto=format",
  physiqueDark:
    "https://images.unsplash.com/photo-1674361398440-73029de0d8cd?w=794&h=560&fit=crop&auto=format",
  dumbbell:
    "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=340&fit=crop&auto=format",
  barbell:
    "https://images.unsplash.com/photo-1534368270820-9de3d8053204?w=680&h=260&fit=crop&auto=format",
  liftAction:
    "https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?w=400&h=480&fit=crop&auto=format",
  gymGroup:
    "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?w=680&h=280&fit=crop&auto=format",
  food: "https://images.unsplash.com/photo-1543352632-5a4b24e4d2a6?w=400&h=300&fit=crop&auto=format",
  mealPrep:
    "https://images.unsplash.com/photo-1543352632-fea6d4f83e78?w=680&h=260&fit=crop&auto=format",
  dimGym:
    "https://images.unsplash.com/photo-1554344728-77cf90d9ed26?w=794&h=580&fit=crop&auto=format",
  womanTrain:
    "https://images.unsplash.com/photo-1605296867724-fa87a8ef53fd?w=380&h=500&fit=crop&auto=format",
  womanBarbell:
    "https://images.unsplash.com/photo-1722925541142-5db2668ca492?w=380&h=500&fit=crop&auto=format",
  blackPhysique:
    "https://images.unsplash.com/photo-1610312856669-2cee66b2949c?w=380&h=560&fit=crop&auto=format",
}

// ─── Página 1: Capa ────────────────────────────────────────────────────────────

export function P01_Cover() {
  return (
    <Page dark>
      <div style={{ position: "absolute", inset: 0 }}>
        <img
          src={IMG.cover}
          alt="Atleta em treino"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(160deg, rgba(11,11,11,0.25) 0%, rgba(11,11,11,0.55) 45%, rgba(11,11,11,0.97) 100%)",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          top: 38,
          left: 56,
          right: 56,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontFamily: "'League Spartan', sans-serif",
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: GOLD,
          }}
        >
          MASSA+
        </span>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 9,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.42)",
          }}
        >
          O Guia Completo · 2026
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 72,
          left: 56,
          right: 56,
          zIndex: 2,
        }}
      >
        <GoldRule width={52} />
        <div style={{ marginTop: 22, marginBottom: 6 }}>
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 104,
              lineHeight: 0.85,
              color: WHITE,
              letterSpacing: "0.01em",
            }}
          >
            MASSA<span style={{ color: GOLD }}>+</span>
          </div>
        </div>
        <div
          style={{
            fontFamily: "'League Spartan', sans-serif",
            fontSize: 14.5,
            fontWeight: 300,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.75)",
            marginBottom: 30,
          }}
        >
          O Guia Completo para Construir Músculo
        </div>
        <div
          style={{
            height: 1,
            background: "rgba(212,175,55,0.35)",
            marginBottom: 18,
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 10.5,
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.04em",
            }}
          >
            Nutrição · Treino · Recuperação · Mentalidade
          </span>
          <span
            style={{
              fontFamily: "'League Spartan', sans-serif",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: GOLD,
            }}
          >
            PRIMEIRA EDIÇÃO
          </span>
        </div>
      </div>
    </Page>
  )
}

// ─── Página 2: Direitos de Autor ───────────────────────────────────────────────

export function P02_Copyright() {
  return (
    <Page>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "72px 100px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 30,
            letterSpacing: "0.12em",
            color: GOLD,
            marginBottom: 3,
          }}
        >
          MASSA+
        </div>
        <div
          style={{
            fontFamily: "'League Spartan', sans-serif",
            fontSize: 8.5,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: GRAY_MID,
            marginBottom: 44,
          }}
        >
          O Guia Completo para Construir Músculo
        </div>
        <GoldRule width={40} />
        <div style={{ margin: "40px 0" }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              lineHeight: 1.85,
              color: "#555",
              marginBottom: 20,
            }}
          >
            © 2026 MASSA+ Publicações. Todos os direitos reservados.
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              lineHeight: 1.82,
              color: "#777",
              maxWidth: 440,
              margin: "0 auto",
            }}
          >
            Nenhuma parte desta publicação pode ser reproduzida, distribuída ou
            transmitida de qualquer forma ou por qualquer meio — incluindo
            fotocópia, gravação ou outros métodos eletromagnéticos ou mecânicos
            — sem autorização prévia por escrito do editor, exceto em citações
            breves incorporadas em análises críticas e outros usos não
            comerciais permitidos pela lei de direitos de autor.
          </p>
        </div>
        <GoldRule width={40} />
        <div
          style={{
            marginTop: 40,
            display: "flex",
            flexDirection: "column",
            gap: 9,
            textAlign: "left",
          }}
        >
          {[
            ["Autor", "Ruben Freitas"],
            ["Edição", "MASSA+"],
            ["Conteúdo e Design", "Ruben Freitas"],
            ["Fotografia", "Unsplash"],
            ["Primeira Edição", "2026"],
          ].map(([label, value]) => (
            <div
              key={label}
              style={{ display: "flex", gap: 16, justifyContent: "center" }}
            >
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 10,
                  color: GRAY_MID,
                  width: 110,
                  textAlign: "right",
                  flexShrink: 0,
                }}
              >
                {label}
              </span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 10,
                  color: BLACK,
                  width: 220,
                }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 52,
            fontFamily: "'Inter', sans-serif",
            fontSize: 9,
            color: "#CCC",
            textAlign: "center",
            letterSpacing: "0.06em",
          }}
        >
          Impresso em Portugal
          <br />
          massaplus.com · @massaplus
        </div>
      </div>
    </Page>
  )
}

// ─── Página 3: Sobre o Autor ───────────────────────────────────────────────────

export function P03_AboutAuthor() {
  return (
    <Page>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 310,
          height: "100%",
          background: BLACK,
        }}
      >
        <img
          src={IMG.author}
          alt="Ruebn Freitas"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.75,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, transparent 50%, rgba(11,11,11,0.7) 100%)",
          }}
        />
        <div style={{ position: "absolute", bottom: 56, left: 32 }}>
          <GoldRule width={32} />
          <div style={{ marginTop: 14 }}>
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 30,
                color: WHITE,
                lineHeight: 1,
                letterSpacing: "0.05em",
              }}
            >
              Ruben
              <br />
              Freitas
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 8,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: GOLD,
                marginTop: 8,
              }}
            >
              CSCS · CISSN
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 330,
          right: 52,
          top: 68,
          bottom: 72,
        }}
      >
        <Label>Sobre o Autor</Label>
        <PageTitle size={28}>
          Construído com
          <br />
          Foco em Crescimento Muscular
        </PageTitle>
        <div style={{ marginTop: 14, marginBottom: 18 }}>
          <GoldRule width={42} />
        </div>
        {[
          "Tenho 21 anos e uma paixão enorme pelo treino, fitness e evolução física. Estou a construir o meu próprio caminho nesta área, sempre à procura de aprender mais, testar novas abordagens e melhorar todos os dias.",
          "Acredito que os grandes resultados começam com consistência, disciplina e vontade de evoluir. O meu objetivo é partilhar aquilo que vou aprendendo ao longo do caminho de forma simples, prática e fácil de aplicar.",
          "Criei este projeto com o objetivo de tornar o fitness mais simples e acessível, reunindo conhecimento, dedicação e uma abordagem prática para ajudar quem também quer evoluir e alcançar os seus objetivos.",
        ].map((text, i) => (
          <Body key={i} style={{ marginBottom: 14 }}>
            {text}
          </Body>
        ))}
        <div style={{ marginTop: 20, marginBottom: 20 }}>
          <ThinRule />
        </div>
        <Label size={8}>Base e Abordagem</Label>{" "}
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {" "}
          {[
            "Foco em hipertrofia e desenvolvimento de massa muscular",
            "Princípios de treino baseados em evidência",
            "Estratégias práticas de nutrição e progressão",
            "Abordagem centrada na consistência e evolução a longo prazo",
          ].map((cred, i) => (
            <div
              key={i}
              style={{ display: "flex", alignItems: "flex-start", gap: 8 }}
            >
              <div
                style={{
                  width: 5,
                  height: 5,
                  background: GOLD,
                  flexShrink: 0,
                  marginTop: 4,
                }}
              />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  color: "#555",
                  lineHeight: 1.4,
                }}
              >
                {cred}
              </span>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: 24,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
          }}
        >
          {[
            { value: "100%", label: "BASEADO EM EVIDÊNCIA" },
            { value: "4", label: "ESTRATÉGIAS PRÁTICAS" },
            { value: "1", label: "OBJETIVO PRINCIPAL" },
          ].map(({ value, label }) => (
            <div
              key={label}
              style={{
                background: GRAY,
                padding: "14px 10px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 26,
                  color: GOLD,
                  lineHeight: 1,
                }}
              >
                {value}
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 8,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: GRAY_MID,
                  marginTop: 3,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer pageNumber={3} chapter="Sobre o Autor" />
    </Page>
  )
}

// ─── Página 4: Índice ──────────────────────────────────────────────────────────

export function P04_TOC() {
  const capitulosA = [
    { num: "01", title: "A Ciência do Crescimento Muscular", page: 6 },
    { num: "02", title: "Compreender as Calorias", page: 7 },
    { num: "03", title: "Dominar os Macronutrientes", page: 8 },
    { num: "04", title: "O Plano da Proteína", page: 9 },
    { num: "05", title: "Hidratos de Carbono para Performance", page: 10 },
    { num: "06", title: "As Gorduras Alimentares Explicadas", page: 11 },
    { num: "07", title: "Construir a Refeição Perfeita", page: 12 },
    { num: "08", title: "A Lista de Compras MASSA+", page: 13 },
    { num: "09", title: "Alimentos que Constroem Músculo", page: 14 },
    { num: "10", title: "Alimentos que Sabotam os Ganhos", page: 15 },
    { num: "11", title: "O Plano Alimentar de 7 Dias", page: 16 },
    { num: "12", title: "Receitas de Batidos Hipercalóricos", page: 17 },
  ]
  const capitulosB = [
    { num: "13", title: "Fundamentos do Treino", page: 18 },
    { num: "14", title: "O Poder da Sobrecarga Progressiva", page: 19 },
    { num: "15", title: "Programa de Hipertrofia de 4 Dias", page: 20 },
    { num: "16", title: "Masterclass de Técnica de Exercício", page: 21 },
    { num: "17", title: "Recuperação e Regeneração", page: 22 },
    { num: "18", title: "Sono: A Tua Arma Secreta", page: 23 },
    { num: "19", title: "Guia de Suplementação", page: 24 },
    { num: "20", title: "Perguntas Frequentes", page: 25 },
    { num: "21", title: "Erros Comuns a Evitar", page: 26 },
    { num: "22", title: "Plano de Transformação de 12 Semanas", page: 27 },
    { num: "A1", title: "Registo de Progresso", page: 28 },
    { num: "A2", title: "Ferramentas e Modelos", page: 29 },
  ]

  const Linha = ({
    num,
    title,
    page,
  }: {
    num: string
    title: string
    page: number
  }) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        paddingBottom: 7,
        marginBottom: 7,
        borderBottom: `1px solid ${GRAY_BORDER}`,
      }}
    >
      <span
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 13,
          color: GOLD,
          minWidth: 26,
          letterSpacing: "0.04em",
        }}
      >
        {num}
      </span>
      <span
        style={{
          fontFamily: "'League Spartan', sans-serif",
          fontSize: 11.5,
          fontWeight: 500,
          color: BLACK,
          flex: 1,
          marginLeft: 8,
        }}
      >
        {title}
      </span>
      <span
        style={{
          fontFamily: "'League Spartan', sans-serif",
          fontSize: 11,
          fontWeight: 700,
          color: GRAY_MID,
          minWidth: 24,
          textAlign: "right",
        }}
      >
        {page}
      </span>
    </div>
  )

  return (
    <Page>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 4,
          height: "100%",
          background: GOLD,
        }}
      />
      <div style={{ padding: "60px 56px 72px 68px" }}>
        <Label>Conteúdo</Label>
        <div
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 58,
            lineHeight: 0.9,
            color: BLACK,
            letterSpacing: "0.02em",
            marginBottom: 32,
          }}
        >
          ÍNDICE
          <br />
          <span style={{ color: GOLD }}>GERAL</span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0 40px",
          }}
        >
          <div>
            <Label size={8} color={GRAY_MID}>
              Parte Um — Nutrição
            </Label>
            {capitulosA.map((c) => (
              <Linha key={c.num} {...c} />
            ))}
          </div>
          <div>
            <Label size={8} color={GRAY_MID}>
              Parte Dois — Treino e Ferramentas
            </Label>
            {capitulosB.map((c) => (
              <Linha key={c.num} {...c} />
            ))}
          </div>
        </div>
      </div>
      <Footer pageNumber={4} />
    </Page>
  )
}

// ─── Página 5: Divisor — Capítulo 1 ───────────────────────────────────────────

export function P05_ChapterDivider() {
  return (
    <Page dark>
      <div
        style={{
          position: "absolute",
          right: -20,
          top: -20,
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 420,
          lineHeight: 1,
          color: "rgba(255,255,255,0.03)",
          letterSpacing: "-0.02em",
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        1
      </div>
      <div
        style={{
          position: "absolute",
          left: 56,
          top: "50%",
          transform: "translateY(-50%)",
          width: 3,
          height: 180,
          background: GOLD,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 80,
          top: "50%",
          transform: "translateY(-50%)",
          right: 56,
        }}
      >
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 9,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: GOLD,
            marginBottom: 14,
          }}
        >
          Parte Um · Nutrição
        </div>
        <div
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 14,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
            marginBottom: 12,
          }}
        >
          Capítulo 01
        </div>
        <div
          style={{
            fontFamily: "'League Spartan', sans-serif",
            fontSize: 52,
            fontWeight: 800,
            lineHeight: 1.0,
            color: WHITE,
            marginBottom: 24,
          }}
        >
          A Ciência
          <br />
          do Crescimento
          <br />
          <span style={{ color: GOLD }}>Muscular</span>
        </div>
        <GoldRule width={56} />
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            lineHeight: 1.75,
            color: "rgba(255,255,255,0.5)",
            marginTop: 20,
            maxWidth: 480,
          }}
        >
          Antes de construir músculo de forma inteligente, é necessário
          compreender os mecanismos fundamentais que impulsionam a hipertrofia —
          e perceber porque é que a maioria das abordagens de treino falha nesse
          ponto.
        </p>
      </div>
      <Footer pageNumber={5} dark />
    </Page>
  )
}

// ─── Página 6: Crescimento Muscular ───────────────────────────────────────────

export function P06_MuscleGrowth() {
  return (
    <Page>
      <div style={{ padding: "60px 56px 72px" }}>
        <Label>Capítulo 01</Label>
        <PageTitle size={36}>
          A Ciência do Crescimento
          <br />
          Muscular
        </PageTitle>
        <div style={{ marginTop: 14, marginBottom: 20 }}>
          <GoldRule width={44} />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0 40px",
            marginBottom: 24,
          }}
        >
          <div>
            <Body style={{ marginBottom: 14 }}>
              A hipertrofia muscular — o termo científico para o crescimento do
              músculo — ocorre quando o stress mecânico e metabólico do treino é
              suficiente para desencadear uma cascata de sinalização anabólica
              nas fibras musculares.
            </Body>
            <Body>
              O resultado é o aumento da síntese proteica, a ativação das
              células satélite e, ao longo do tempo, um aumento líquido das
              proteínas miofibrilares e sarcoplasmáticas — ou seja, tecido
              muscular maior e mais denso.
            </Body>
          </div>
          <div>
            <Quote attribution="Brad Schoenfeld, PhD" size={15}>
              O crescimento muscular não é um evento único — é uma resposta
              adaptativa sustentada a um desafio mecânico progressivo.
            </Quote>
          </div>
        </div>

        <Label size={8} color={GRAY_MID}>
          Os Três Mecanismos da Hipertrofia
        </Label>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            marginBottom: 24,
          }}
        >
          {[
            {
              number: 1,
              title: "Tensão Mecânica",
              body: "O principal motor do crescimento muscular. Gerada por cargas elevadas ao longo de uma amplitude de movimento completa. É por isso que a sobrecarga progressiva — aumentar consistentemente o peso ou as repetições — é inegociável. Os músculos têm de experimentar tensão suficiente para ativar a síntese proteica.",
            },
            {
              number: 2,
              title: "Stress Metabólico",
              body: 'A sensação de "bomba" durante o treino. Ocorre quando subprodutos metabólicos (lactato, iões de hidrogénio) se acumulam no músculo. Contribui para o inchaço celular e a libertação de hormonas anabólicas. Atingido com cargas moderadas (60–75% de 1RM), repetições moderadas (8–20) e pausas mais curtas.',
            },
            {
              number: 3,
              title: "Dano Muscular",
              body: "Microrroturas nas fibras musculares resultantes da fase excêntrica (descida do peso). Desencadeia uma resposta de reparação inflamatória que resulta em tecido mais forte e mais espesso. Presente em qualquer exercício novo, mas a sua contribuição para a hipertrofia a longo prazo é menos significativa do que a tensão e o stress.",
            },
          ].map((item) => (
            <NumItem key={item.number} {...item} />
          ))}
        </div>

        <ThinRule />
        <div style={{ marginTop: 18 }}>
          <TipsBox title="Insight Fundamental">
            Os três mecanismos contribuem para o crescimento muscular, mas a{" "}
            <strong>tensão mecânica é o principal fator</strong>. Concentra a
            maior parte do treino em ficar progressivamente mais forte na faixa
            de 6–20 repetições antes de perseguir a bomba muscular.
          </TipsBox>
        </div>
      </div>
      <Footer pageNumber={6} chapter="A Ciência do Crescimento Muscular" />
    </Page>
  )
}

// ─── Página 7: Calorias ────────────────────────────────────────────────────────

export function P07_Calories() {
  return (
    <Page>
      <div
        style={{ position: "absolute", top: 0, left: 0, right: 0, height: 240 }}
      >
        <img
          src={IMG.physiqueDark}
          alt="Físico"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(11,11,11,0.1), rgba(255,255,255,1) 95%)",
          }}
        />
        <div style={{ position: "absolute", top: 36, left: 56, right: 56 }}>
          <Label>Capítulo 02</Label>
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 52,
              color: WHITE,
              lineHeight: 0.95,
              letterSpacing: "0.02em",
            }}
          >
            CALORIAS
          </div>
        </div>
      </div>

      <div style={{ padding: "260px 56px 72px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 1,
            background: GRAY_BORDER,
            marginBottom: 28,
          }}
        >
          {[
            { value: "+350", unit: "kcal", label: "Excedente para Lean Bulk" },
            { value: "0,25", unit: "kg", label: "Ganho Semanal de Peso" },
            { value: "20%", unit: "", label: "Excedente Máximo Recomendado" },
            { value: "8–12", unit: "sem", label: "Por Fase de Bulking" },
          ].map(({ value, unit, label }) => (
            <div
              key={label}
              style={{
                background: WHITE,
                padding: "16px 0",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 32,
                  color: GOLD,
                  lineHeight: 1,
                }}
              >
                {value}
                <span
                  style={{
                    fontSize: 14,
                    color: GRAY_MID,
                    fontFamily: "'Inter', sans-serif",
                    marginLeft: 2,
                  }}
                >
                  {unit}
                </span>
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 8,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: GRAY_MID,
                  marginTop: 3,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0 36px",
            marginBottom: 22,
          }}
        >
          <div>
            <Label size={8} color={GRAY_MID}>
              A Regra Fundamental
            </Label>
            <Body style={{ marginBottom: 12 }}>
              O músculo só pode ser construído quando consomes consistentemente
              mais calorias do que gastas. A isto chama-se{" "}
              <strong>excedente calórico</strong>. O excedente não precisa de
              ser grande — 250 a 500 kcal acima da manutenção é o ponto ideal
              para ganhos limpos.
            </Body>
            <Body>
              Um excedente demasiado grande (mais de 1.000 kcal) resulta em
              acumulação excessiva de gordura a par do músculo. O objetivo do
              MASSA+ é construir músculo com mínima acumulação de gordura — um
              processo chamado <em>lean bulking</em>.
            </Body>
          </div>
          <div>
            <Label size={8} color={GRAY_MID}>
              Calcular o Teu TDEE
            </Label>
            <div
              style={{
                background: BLACK,
                padding: "16px",
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.75)",
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  color: GOLD,
                  fontWeight: 600,
                  marginBottom: 6,
                  fontFamily: "'League Spartan', sans-serif",
                  fontSize: 10,
                  letterSpacing: "0.1em",
                }}
              >
                MIFFLIN-ST JEOR (MASCULINO)
              </div>
              TMB = (10 × peso kg) + (6,25 × altura cm) − (5 × idade) + 5
              <br />
              <br />
              <span style={{ color: GOLD }}>
                TDEE = TMB × Fator de Atividade
              </span>
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 10.5,
                color: "#555",
                lineHeight: 1.6,
              }}
            >
              Fatores: Sedentário ×1,2 · Ligeiro ×1,375 · Moderado ×1,55 · Ativo
              ×1,725
            </div>
          </div>
        </div>

        <WarningBox title="Não Excedas +20% de Excedente">
          Consumir mais de 20% acima do teu TDEE aumenta drasticamente o ganho
          de gordura sem aumentar proporcionalmente a taxa de síntese muscular.
          A síntese proteica muscular tem um limite máximo — as calorias acima
          desse limite vão diretamente para as reservas de gordura.
        </WarningBox>
      </div>

      <Footer pageNumber={7} chapter="Compreender as Calorias" />
    </Page>
  )
}

// ─── Página 8: Macronutrientes ─────────────────────────────────────────────────

export function P08_Macros() {
  return (
    <Page>
      <div style={{ padding: "60px 56px 72px" }}>
        <Label>Capítulo 03</Label>
        <PageTitle size={36}>Dominar os Macronutrientes</PageTitle>
        <div style={{ marginTop: 14, marginBottom: 22 }}>
          <GoldRule width={44} />
        </div>
        <Body style={{ marginBottom: 22 }}>
          Os três macronutrientes — proteína, hidratos de carbono e gordura —
          desempenham cada um um papel distinto no crescimento muscular, na
          performance e na composição corporal. Acertar nos macros é a decisão
          nutricional com maior impacto que podes tomar.
        </Body>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
            marginBottom: 28,
          }}
        >
          {[
            {
              label: "Proteína",
              color: "#E74C3C",
              target: "1,8–2,2g / kg PC",
              calories: "4 kcal / g",
              role: "O principal bloco de construção do tecido muscular. Fornece aminoácidos para a síntese proteica. Não pode ser armazenada — tem de ser consumida consistentemente ao longo do dia.",
              foods: [
                "Peito de frango",
                "Carne magra",
                "Ovos inteiros",
                "Iogurte grego",
                "Proteína whey",
              ],
            },
            {
              label: "Hidratos de Carbono",
              color: "#E67E22",
              target: "4–6g / kg PC",
              calories: "4 kcal / g",
              role: "Combustível primário para treino de alta intensidade. Reabastece o glicogênio muscular. Estimula a libertação de insulina que transporta nutrientes para as células musculares. Não tenhas medo dos hidratos — são o teu combustível de performance.",
              foods: [
                "Arroz branco",
                "Aveia",
                "Batata-doce",
                "Banana",
                "Massa",
              ],
            },
            {
              label: "Gordura Alimentar",
              color: "#3498DB",
              target: "0,7–1,1g / kg PC",
              calories: "9 kcal / g",
              role: "Essencial para a produção de testosterona, lubrificação articular, absorção de vitaminas (A, D, E, K) e integridade da membrana celular. Dietas com pouca gordura suprimem os níveis de hormonas anabólicas.",
              foods: [
                "Azeite extra virgem",
                "Abacate",
                "Salmão",
                "Amêndoas",
                "Ovos inteiros",
              ],
            },
          ].map(({ label, color, target, calories, role, foods }) => (
            <div
              key={label}
              style={{ border: `1px solid ${GRAY_BORDER}`, padding: 16 }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    fontFamily: "'League Spartan', sans-serif",
                    fontSize: 14,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    color,
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: color,
                    marginTop: 3,
                  }}
                />
              </div>
              <div
                style={{
                  height: 2,
                  background: color,
                  marginBottom: 10,
                  opacity: 0.3,
                }}
              />
              <div style={{ marginBottom: 8 }}>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 8,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: GRAY_MID,
                    marginBottom: 2,
                  }}
                >
                  Objetivo Diário
                </div>
                <div
                  style={{
                    fontFamily: "'League Spartan', sans-serif",
                    fontSize: 13,
                    fontWeight: 700,
                    color,
                  }}
                >
                  {target}
                </div>
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 10.5,
                  lineHeight: 1.65,
                  color: "#555",
                  marginBottom: 10,
                }}
              >
                {role}
              </div>
              <ThinRule />
              <div style={{ marginTop: 8 }}>
                {foods.map((f, i) => (
                  <div
                    key={i}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 10,
                      color: "#444",
                      padding: "2px 0",
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <div
                      style={{
                        width: 3,
                        height: 3,
                        background: color,
                        borderRadius: "50%",
                        flexShrink: 0,
                      }}
                    />
                    {f}
                  </div>
                ))}
              </div>
              <div
                style={{
                  marginTop: 8,
                  fontFamily: "'League Spartan', sans-serif",
                  fontSize: 9,
                  color: GRAY_MID,
                }}
              >
                {calories}
              </div>
            </div>
          ))}
        </div>

        <Callout bg={BLACK}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'League Spartan', sans-serif",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: GOLD,
                  marginBottom: 6,
                }}
              >
                Exemplo: Atleta de 80 kg · Bulk de 3.000 kcal
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11.5,
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.5,
                }}
              >
                Proteína: 180g (720 kcal) · Hidratos: 350g (1.400 kcal) ·
                Gordura: 98g (880 kcal)
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 40,
                  color: GOLD,
                  lineHeight: 1,
                }}
              >
                3.000
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 9,
                  color: "rgba(255,255,255,0.4)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                kcal / dia
              </div>
            </div>
          </div>
        </Callout>
      </div>
      <Footer pageNumber={8} chapter="Dominar os Macronutrientes" />
    </Page>
  )
}

// ─── Página 9: Guia de Proteína ────────────────────────────────────────────────

export function P09_Protein() {
  const fontes = [
    {
      food: "Peito de Frango (100g)",
      protein: "31g",
      fat: "3,6g",
      notes: "O padrão de ouro — magro e versátil",
    },
    {
      food: "Carne de Vaca Magra (100g)",
      protein: "26g",
      fat: "10g",
      notes: "Rico em creatina natural e zinco",
    },
    {
      food: "Ovos Inteiros (2 grandes)",
      protein: "13g",
      fat: "10g",
      notes: "Perfil completo de aminoácidos essenciais",
    },
    {
      food: "Salmão (100g)",
      protein: "25g",
      fat: "13g",
      notes: "Rico em ómega-3 anti-inflamatórios",
    },
    {
      food: "Iogurte Grego (200g)",
      protein: "20g",
      fat: "2g",
      notes: "Proteína caseína — ideal antes de dormir",
    },
    {
      food: "Proteína Whey (1 dose)",
      protein: "25g",
      fat: "2g",
      notes: "Absorção mais rápida — ideal pós-treino",
    },
    {
      food: "Queijo Cottage (200g)",
      protein: "24g",
      fat: "4g",
      notes: "Alto teor de caseína — libertação lenta",
    },
    {
      food: "Atum em Lata (100g)",
      protein: "29g",
      fat: "1g",
      notes: "Maior rácio proteína:caloria disponível",
    },
  ]

  return (
    <Page>
      <div style={{ padding: "60px 56px 72px" }}>
        <Label>Capítulo 04</Label>
        <PageTitle size={36}>O Plano da Proteína</PageTitle>
        <div style={{ marginTop: 14, marginBottom: 18 }}>
          <GoldRule width={44} />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0 36px",
            marginBottom: 26,
          }}
        >
          <div>
            <Body style={{ marginBottom: 12 }}>
              A proteína é o único macronutriente que constrói músculo
              diretamente. Sem proteína adequada, o corpo não consegue reparar o
              dano muscular provocado pelo treino — e o crescimento muscular
              para por completo, independentemente da intensidade com que
              treinas.
            </Body>
            <Body>
              Tem como objetivo{" "}
              <strong>
                1,8–2,2g de proteína por quilograma de peso corporal
              </strong>{" "}
              por dia. Para um atleta de 80 kg, isso representa 144–176g de
              proteína diária, distribuída em 4–6 refeições para otimizar a
              síntese proteica muscular.
            </Body>
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            {[
              { value: "1,8–2,2g", label: "Por kg de peso corporal" },
              { value: "4–5", label: "Refeições proteicas por dia" },
              { value: "30–50g", label: "Por refeição (utilização máx.)" },
              { value: "2h", label: "Janela anabólica pós-treino" },
            ].map(({ value, label }) => (
              <div
                key={label}
                style={{
                  background: GRAY,
                  padding: "12px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 26,
                    color: GOLD,
                    lineHeight: 1,
                  }}
                >
                  {value}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 8,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: GRAY_MID,
                    marginTop: 3,
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Label size={8} color={GRAY_MID}>
          Melhores Fontes de Proteína — Ordenadas por Qualidade
        </Label>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 70px 60px 2fr",
            background: BLACK,
            padding: "7px 12px",
            gap: 8,
          }}
        >
          {["Fonte Alimentar", "Proteína", "Gordura", "Notas"].map((h) => (
            <div
              key={h}
              style={{
                fontFamily: "'League Spartan', sans-serif",
                fontSize: 8.5,
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: GOLD,
              }}
            >
              {h}
            </div>
          ))}
        </div>

        {fontes.map((s, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 70px 60px 2fr",
              padding: "7px 12px",
              gap: 8,
              background: i % 2 === 0 ? WHITE : GRAY,
              borderBottom: `1px solid ${GRAY_BORDER}`,
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                color: BLACK,
              }}
            >
              {s.food}
            </span>
            <span
              style={{
                fontFamily: "'League Spartan', sans-serif",
                fontSize: 11,
                fontWeight: 700,
                color: "#E74C3C",
              }}
            >
              {s.protein}
            </span>
            <span
              style={{
                fontFamily: "'League Spartan', sans-serif",
                fontSize: 11,
                fontWeight: 600,
                color: GRAY_MID,
              }}
            >
              {s.fat}
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 10,
                color: "#666",
                fontStyle: "italic",
              }}
            >
              {s.notes}
            </span>
          </div>
        ))}

        <div style={{ marginTop: 18 }}>
          <TipsBox title="O Timing É Importante">
            Consome 30–50g de proteína de digestão rápida (whey ou carne magra)
            nas 2 horas após o treino para maximizar a janela anabólica.
            Adiciona uma fonte de caseína de digestão lenta (queijo cottage ou
            iogurte grego) antes de dormir para prevenir o catabolismo noturno.
          </TipsBox>
        </div>
      </div>
      <Footer pageNumber={9} chapter="O Plano da Proteína" />
    </Page>
  )
}

// ─── Página 10: Hidratos de Carbono ───────────────────────────────────────────

export function P10_Carbs() {
  return (
    <Page>
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 360,
          height: 360,
        }}
      >
        <img
          src={IMG.food}
          alt="Nutrição"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom left, transparent 50%, rgba(255,255,255,1) 90%)",
          }}
        />
      </div>

      <div style={{ padding: "60px 56px 72px" }}>
        <Label>Capítulo 05</Label>
        <PageTitle size={36}>
          Hidratos de Carbono
          <br />
          para Performance
        </PageTitle>
        <div style={{ marginTop: 14, marginBottom: 18 }}>
          <GoldRule width={44} />
        </div>

        <div style={{ maxWidth: 380, marginBottom: 28 }}>
          <Body style={{ marginBottom: 12 }}>
            Os hidratos de carbono são a fonte de combustível preferida do corpo
            para treino de alta intensidade. Repõem o glicogênio muscular — a
            forma de armazenamento de glucose utilizada durante levantamentos
            pesados — e desencadeiam um pico de insulina que transporta
            nutrientes diretamente para as células musculares após o treino.
          </Body>
          <Body>
            Não tenhas medo dos hidratos de carbono. A investigação é clara:
            atletas com dietas mais ricas em hidratos treinam mais intensamente,
            recuperam mais rápido e constroem mais músculo do que os que
            restringem os hidratos.
          </Body>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px 36px",
            marginBottom: 24,
          }}
        >
          <div style={{ borderTop: `3px solid ${SUCCESS}`, paddingTop: 14 }}>
            <div
              style={{
                fontFamily: "'League Spartan', sans-serif",
                fontSize: 13,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: SUCCESS,
                marginBottom: 10,
              }}
            >
              ✓ Melhores Fontes
            </div>
            {[
              ["Arroz Branco", "45g HC / chávena cozida"],
              ["Aveia", "27g HC / 100g seca"],
              ["Batata-Doce", "20g HC / 100g"],
              ["Banana", "27g HC por unidade"],
              ["Massa (cozida)", "31g HC / chávena"],
              ["Pão Integral", "15g HC / fatia"],
            ].map(([food, macro]) => (
              <div
                key={food}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "5px 0",
                  borderBottom: `1px solid ${GRAY_BORDER}`,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    color: BLACK,
                  }}
                >
                  {food}
                </span>
                <span
                  style={{
                    fontFamily: "'League Spartan', sans-serif",
                    fontSize: 10,
                    fontWeight: 600,
                    color: GRAY_MID,
                  }}
                >
                  {macro}
                </span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: `3px solid ${GOLD}`, paddingTop: 14 }}>
            <div
              style={{
                fontFamily: "'League Spartan', sans-serif",
                fontSize: 13,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: GOLD,
                marginBottom: 10,
              }}
            >
              Protocolo de Timing
            </div>
            {[
              {
                time: "Pré-Treino (1–2h)",
                detail:
                  "HC complexos: 40–80g. Arroz, aveia, batata. Abastece a sessão.",
              },
              {
                time: "Durante o Treino",
                detail:
                  "Opcional: 20–40g HC simples se a sessão ultrapassar 90 min.",
              },
              {
                time: "Pós-Treino",
                detail:
                  "HC rápidos: 60–100g. Arroz branco, banana. Maximiza a reposição de glicogênio.",
              },
              {
                time: "Restantes Refeições",
                detail:
                  "Distribui os restantes hidratos de forma equilibrada no pequeno-almoço e almoço.",
              },
            ].map(({ time, detail }) => (
              <div key={time} style={{ marginBottom: 12 }}>
                <div
                  style={{
                    fontFamily: "'League Spartan', sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    color: BLACK,
                    marginBottom: 3,
                  }}
                >
                  {time}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 10.5,
                    color: "#666",
                    lineHeight: 1.5,
                  }}
                >
                  {detail}
                </div>
              </div>
            ))}
          </div>
        </div>

        <TipsBox title="Arroz Branco vs. Arroz Integral">
          Para construção muscular, o arroz branco é frequentemente superior ao
          integral após o treino. Digere mais rapidamente, causando um pico de
          insulina mais pronunciado que acelera a reposição de glicogênio. O
          arroz integral é ideal para outras refeições onde a digestão lenta é
          preferível.
        </TipsBox>
      </div>
      <Footer pageNumber={10} chapter="Hidratos de Carbono para Performance" />
    </Page>
  )
}

// ─── Página 11: Gorduras ───────────────────────────────────────────────────────

export function P11_Fats() {
  return (
    <Page>
      <div style={{ padding: "60px 56px 72px" }}>
        <Label>Capítulo 06</Label>
        <PageTitle size={36}>As Gorduras Alimentares Explicadas</PageTitle>
        <div style={{ marginTop: 14, marginBottom: 20 }}>
          <GoldRule width={44} />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0 36px",
            marginBottom: 28,
          }}
        >
          <div>
            <Body style={{ marginBottom: 14 }}>
              A gordura foi injustamente demonizada durante décadas. A verdade é
              que a gordura alimentar é <em>essencial</em> para o crescimento
              muscular — especialmente para manter os níveis de testosterona,
              regular a inflamação e absorver as vitaminas lipossolúveis
              críticas para a função anabólica.
            </Body>
            <Body>
              Mantém a gordura em 25–35% das calorias totais. Valores abaixo
              deste intervalo suprimem significativamente a produção de
              testosterona. Valores acima afastam os hidratos de carbono
              necessários para a performance no treino.
            </Body>
          </div>
          <div>
            <Quote size={17} attribution="Journal of Applied Physiology, 2021">
              Atletas com dietas pobres em gordura apresentaram níveis de
              testosterona 12–15% mais baixos em comparação com os que consumiam
              gordura adequada.
            </Quote>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
            marginBottom: 24,
          }}
        >
          <div style={{ border: `2px solid ${SUCCESS}`, padding: 16 }}>
            <div
              style={{
                fontFamily: "'League Spartan', sans-serif",
                fontSize: 12,
                fontWeight: 800,
                textTransform: "uppercase",
                color: SUCCESS,
                letterSpacing: "0.1em",
                marginBottom: 12,
              }}
            >
              ✓ Consome Estas Gorduras
            </div>
            {[
              { fat: "Azeite Extra Virgem", type: "Monoinsaturada" },
              { fat: "Abacate", type: "Monoinsaturada" },
              { fat: "Ovos Inteiros", type: "Saturada + Insaturada" },
              {
                fat: "Peixe Gordo (salmão, sardinha)",
                type: "Ómega-3 Polinsaturada",
              },
              { fat: "Amêndoas / Nozes", type: "Polinsaturada" },
              { fat: "Óleo de Coco (moderado)", type: "Saturada (MCTs)" },
              { fat: "Manteiga de Qualidade", type: "Saturada + CLA" },
            ].map(({ fat, type }) => (
              <div
                key={fat}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "5px 0",
                  borderBottom: `1px solid ${GRAY_BORDER}`,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    color: BLACK,
                  }}
                >
                  {fat}
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 9,
                    color: GRAY_MID,
                    textAlign: "right",
                    maxWidth: 100,
                  }}
                >
                  {type}
                </span>
              </div>
            ))}
          </div>

          <div style={{ border: `2px solid ${DANGER}`, padding: 16 }}>
            <div
              style={{
                fontFamily: "'League Spartan', sans-serif",
                fontSize: 12,
                fontWeight: 800,
                textTransform: "uppercase",
                color: DANGER,
                letterSpacing: "0.1em",
                marginBottom: 12,
              }}
            >
              ✗ Limita Estas Gorduras
            </div>
            {[
              {
                fat: "Gorduras Trans (óleos parcialmente hidrogenados)",
                reason: "Altamente inflamatórias",
              },
              {
                fat: "Óleos Vegetais / de Sementes (soja, milho)",
                reason: "Ricos em ómega-6, inflamatórios",
              },
              {
                fat: "Alimentos Fritos",
                reason: "Gorduras oxidadas — pró-inflamatórias",
              },
              {
                fat: "Margarina",
                reason: "Frequentemente contém gorduras trans",
              },
              {
                fat: "Snacks Processados",
                reason: "Gorduras de baixa qualidade ocultas",
              },
            ].map(({ fat, reason }) => (
              <div
                key={fat}
                style={{
                  padding: "5px 0",
                  borderBottom: `1px solid ${GRAY_BORDER}`,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    color: BLACK,
                  }}
                >
                  {fat}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 9.5,
                    color: DANGER,
                  }}
                >
                  {reason}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Callout bg={GRAY} color={BLACK}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 44,
                color: GOLD,
                lineHeight: 1,
                flexShrink: 0,
              }}
            >
              9
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'League Spartan', sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  color: BLACK,
                  marginBottom: 3,
                }}
              >
                A Gordura Tem 9 Calorias Por Grama
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  color: "#555",
                  lineHeight: 1.55,
                }}
              >
                A gordura é muito calórica — mais do dobro da proteína ou dos
                hidratos. Regista-a com atenção. Uma simples colher de sopa de
                azeite acrescenta 120 kcal a uma refeição. Pequenas quantidades
                têm um grande impacto calórico.
              </div>
            </div>
          </div>
        </Callout>
      </div>
      <Footer pageNumber={11} chapter="As Gorduras Alimentares Explicadas" />
    </Page>
  )
}

// ─── Página 12: Construção de Refeições ───────────────────────────────────────

export function P12_MealBuilding() {
  return (
    <Page>
      <div style={{ padding: "60px 56px 72px" }}>
        <Label>Capítulo 07</Label>
        <PageTitle size={36}>Construir a Refeição Perfeita</PageTitle>
        <div style={{ marginTop: 14, marginBottom: 20 }}>
          <GoldRule width={44} />
        </div>
        <Body style={{ maxWidth: 560, marginBottom: 28 }}>
          Cada refeição que fazes deve ser construída com intenção. A Fórmula de
          Refeição MASSA+ é simples: começa com uma âncora proteica, adiciona
          uma fonte de hidratos, adiciona uma fonte de gordura e preenche o
          resto com vegetais. Repete 4–5 vezes por dia.
        </Body>

        <div style={{ display: "flex", gap: 2, marginBottom: 28 }}>
          {[
            {
              step: "01",
              label: "Proteína",
              detail: "30–50g de proteína magra ancora cada refeição",
              color: "#E74C3C",
              example: "Frango, vaca, peixe, ovos",
            },
            {
              step: "02",
              label: "Hidrato de Carbono",
              detail: "HC complexo para energia sustentada",
              color: "#E67E22",
              example: "Arroz, aveia, batata",
            },
            {
              step: "03",
              label: "Gordura Saudável",
              detail: "Pequena quantidade para absorção de nutrientes",
              color: "#3498DB",
              example: "Azeite, abacate, frutos secos",
            },
            {
              step: "04",
              label: "Vegetais",
              detail: "Fibra, micronutrientes e saciedade",
              color: SUCCESS,
              example: "Brócolos, espinafres, pimentos",
            },
          ].map(({ step, label, detail, color, example }) => (
            <div
              key={step}
              style={{
                flex: 1,
                borderTop: `3px solid ${color}`,
                padding: "14px 12px",
                background: GRAY,
              }}
            >
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 32,
                  color,
                  lineHeight: 1,
                  marginBottom: 4,
                }}
              >
                {step}
              </div>
              <div
                style={{
                  fontFamily: "'League Spartan', sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  marginBottom: 6,
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 10.5,
                  color: "#555",
                  lineHeight: 1.55,
                  marginBottom: 6,
                }}
              >
                {detail}
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 9.5,
                  color,
                  fontStyle: "italic",
                }}
              >
                ex. {example}
              </div>
            </div>
          ))}
        </div>

        <Label size={8} color={GRAY_MID}>
          Exemplo de Refeição — Almoço Pós-Treino
        </Label>
        <div
          style={{
            border: `1px solid ${GRAY_BORDER}`,
            padding: "16px 20px",
            marginBottom: 22,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 16,
              marginBottom: 14,
            }}
          >
            {[
              {
                food: "200g Peito de Frango",
                macro: "62g proteína · 4g gordura",
              },
              {
                food: "250g Arroz Branco Cozido",
                macro: "55g HC · 2g gordura",
              },
              { food: "1 c. sopa Azeite", macro: "0g HC · 14g gordura" },
              { food: "Brócolos Cozidos (200g)", macro: "14g HC · 0g gordura" },
            ].map(({ food, macro }) => (
              <div key={food}>
                <div
                  style={{
                    fontFamily: "'League Spartan', sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    marginBottom: 3,
                  }}
                >
                  {food}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 9.5,
                    color: GRAY_MID,
                  }}
                >
                  {macro}
                </div>
              </div>
            ))}
          </div>
          <ThinRule />
          <div style={{ marginTop: 10, display: "flex", gap: 24 }}>
            {[
              { label: "Total Calorias", value: "720 kcal", gold: true },
              { label: "Proteína", value: "62g" },
              { label: "HC", value: "71g" },
              { label: "Gordura", value: "18g" },
            ].map(({ label, value, gold }) => (
              <div key={label}>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 8,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: GRAY_MID,
                    marginBottom: 2,
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    fontFamily: "'League Spartan', sans-serif",
                    fontSize: 14,
                    fontWeight: 700,
                    color: gold ? GOLD : BLACK,
                  }}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <TipsBox title="A Preparação de Refeições Salva os Ganhos">
          Prepara as refeições de 4–5 dias cada domingo. Cozinha grandes
          quantidades de arroz, frango grelhado e vegetais assados. A preparação
          consistente de refeições é o melhor preditor de aderência nutricional
          a longo prazo.
        </TipsBox>
      </div>
      <Footer pageNumber={12} chapter="Construir a Refeição Perfeita" />
    </Page>
  )
}

// ─── Página 13: Lista de Compras ───────────────────────────────────────────────

export function P13_GroceryList() {
  const col = (title: string, items: string[], color: string) => (
    <div>
      <div
        style={{
          borderTop: `2px solid ${color}`,
          paddingTop: 12,
          marginBottom: 10,
        }}
      >
        <div
          style={{
            fontFamily: "'League Spartan', sans-serif",
            fontSize: 11,
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color,
          }}
        >
          {title}
        </div>
      </div>
      {items.map((item) => (
        <CheckItem key={item} print>
          {item}
        </CheckItem>
      ))}
    </div>
  )

  return (
    <Page>
      <div style={{ padding: "60px 56px 72px" }}>
        <Label>Capítulo 08</Label>
        <PageTitle size={36}>A Lista de Compras MASSA+</PageTitle>
        <div style={{ marginTop: 14, marginBottom: 20 }}>
          <GoldRule width={44} />
        </div>
        <Body style={{ marginBottom: 24, maxWidth: 560 }}>
          Abastece a tua cozinha com estes alimentos essenciais para construção
          muscular e nunca estarás a mais de 30 minutos de uma refeição de alta
          qualidade. Mantém a dispensa cheia — a fome é o inimigo dos ganhos.
        </Body>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
          }}
        >
          {col(
            "Proteínas",
            [
              "Peito de frango (2 kg)",
              "Carne moída magra (1 kg)",
              "Filetes de salmão (500g)",
              "Atum em lata (×6)",
              "Ovos inteiros (×18)",
              "Claras de ovo (1L)",
              "Iogurte grego (×4)",
              "Queijo cottage (500g)",
              "Proteína whey (se necessário)",
            ],
            "#E74C3C",
          )}
          {col(
            "Hidratos de Carbono",
            [
              "Arroz branco (saco 2 kg)",
              "Aveia rolada (1 kg)",
              "Batatas-doces (×6)",
              "Massa (500g)",
              "Pão integral",
              "Bananas (×8)",
              "Maçãs (×6)",
              "Mirtilos (1 emb.)",
              "Mel (pós-treino)",
            ],
            "#E67E22",
          )}
          {col(
            "Gorduras e Extras",
            [
              "Azeite extra virgem",
              "Abacates (×4)",
              "Amêndoas (200g)",
              "Manteiga de amendoim natural",
              "Chocolate negro 70%+",
              "Óleo de coco",
              "Farinha de linhaça",
              "Mistura de frutos secos (200g)",
            ],
            "#3498DB",
          )}
          {col(
            "Vegetais",
            [
              "Brócolos (2 cabeças)",
              "Espinafres baby (emb.)",
              "Pimentos (×6)",
              "Espargos (molho)",
              "Cogumelos (500g)",
              "Alho (cabeça)",
              "Tomate cherry (emb.)",
              "Curgete (×3)",
              "Feijão verde (emb.)",
            ],
            SUCCESS,
          )}
        </div>
      </div>
      <Footer pageNumber={13} chapter="A Lista de Compras MASSA+" />
    </Page>
  )
}

// ─── Página 14: Alimentos a Consumir ──────────────────────────────────────────

export function P14_FoodsEat() {
  const alimentos = [
    {
      name: "Salmão",
      badge: "#1",
      reason:
        "Alto teor de proteína + ómega-3 anti-inflamatórios que reduzem a dor muscular e melhoram a velocidade de recuperação",
    },
    {
      name: "Ovos Inteiros",
      badge: "#2",
      reason:
        "Perfil completo de aminoácidos, colina para a função neural, gordura alimentar que apoia a testosterona",
    },
    {
      name: "Peito de Frango",
      badge: "#3",
      reason:
        "O padrão de ouro da proteína magra — 31g por 100g com gordura mínima, infinitamente versátil",
    },
    {
      name: "Iogurte Grego",
      badge: "#4",
      reason:
        "Mistura de caseína de digestão lenta e whey rápida. Probióticos apoiam a saúde intestinal e a absorção de nutrientes",
    },
    {
      name: "Arroz Branco",
      badge: "#5",
      reason:
        "HC de digestão rápida sem irritação intestinal. Combustível perfeito para pré e pós-treino",
    },
    {
      name: "Batata-Doce",
      badge: "#6",
      reason:
        "HC complexos com beta-caroteno, vitamina C e potássio essencial para a contração muscular",
    },
    {
      name: "Carne de Vaca (90/10)",
      badge: "#7",
      reason:
        "Creatina natural, zinco, B12, ferro e proteína completa num único alimento",
    },
    {
      name: "Aveia",
      badge: "#8",
      reason:
        "Baixo índice glicémico, rica em fibra, energia sustentada. O beta-glucano apoia a saúde cardiovascular",
    },
    {
      name: "Abacate",
      badge: "#9",
      reason:
        "Gorduras monoinsaturadas que apoiam a testosterona, potássio e ácido oleico anti-inflamatório",
    },
    {
      name: "Brócolos",
      badge: "#10",
      reason:
        "O DIM apoia o metabolismo saudável dos estrogénios. Vitamina K2, C e cálcio para a densidade óssea",
    },
  ]

  return (
    <Page>
      <div style={{ padding: "60px 56px 72px" }}>
        <Label>Capítulo 09</Label>
        <PageTitle size={36}>Alimentos que Constroem Músculo</PageTitle>
        <div style={{ marginTop: 14, marginBottom: 20 }}>
          <GoldRule width={44} />
        </div>
        <Body style={{ marginBottom: 24, maxWidth: 600 }}>
          Estes são os dez alimentos com maior impacto para o crescimento
          muscular. Constrói o teu plano alimentar em torno deles e já estarás
          80% do caminho para uma nutrição ótima.
        </Body>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {alimentos.map((food, i) => (
            <div
              key={food.name}
              style={{
                display: "flex",
                gap: 16,
                padding: "12px 0",
                borderBottom: `1px solid ${GRAY_BORDER}`,
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  minWidth: 36,
                  height: 36,
                  background: i < 3 ? GOLD : GRAY,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 15,
                  color: i < 3 ? BLACK : GRAY_MID,
                  flexShrink: 0,
                }}
              >
                {food.badge}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'League Spartan', sans-serif",
                    fontSize: 13,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    marginBottom: 3,
                  }}
                >
                  {food.name}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    lineHeight: 1.55,
                    color: "#555",
                  }}
                >
                  {food.reason}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer pageNumber={14} chapter="Alimentos que Constroem Músculo" />
    </Page>
  )
}

// ─── Página 15: Alimentos a Evitar ────────────────────────────────────────────

export function P15_FoodsAvoid() {
  return (
    <Page>
      <div style={{ padding: "60px 56px 72px" }}>
        <Label>Capítulo 10</Label>
        <PageTitle size={36}>Alimentos que Sabotam os Ganhos</PageTitle>
        <div style={{ marginTop: 14, marginBottom: 20 }}>
          <GoldRule width={44} />
        </div>
        <Body style={{ marginBottom: 28, maxWidth: 600 }}>
          Construir músculo já é suficientemente difícil sem consumires
          alimentos que trabalham ativamente contra ti. Estes alimentos suprimem
          a sinalização anabólica, aumentam a inflamação, prejudicam a
          recuperação e perturbam o ambiente hormonal necessário para o
          crescimento.
        </Body>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            marginBottom: 24,
          }}
        >
          {[
            {
              title: "Álcool",
              severity: "EVITAR COMPLETAMENTE",
              color: DANGER,
              detail:
                "Suprime diretamente a produção de testosterona em até 23%. Inibe a síntese proteica muscular durante 24–48 horas após o consumo. Prejudica a qualidade do sono, desidrata o tecido muscular e acrescenta calorias vazias sem qualquer benefício anabólico. Mesmo 2 bebidas por semana afetam visivelmente a composição corporal.",
            },
            {
              title:
                "Alimentos Ultra-Processados (batatas fritas, bolachas, fast food)",
              severity: "LIMITAR FORTEMENTE",
              color: "#E67E22",
              detail:
                "Ricos em óleos de ómega-6 inflamatórios, açúcares refinados e aditivos artificiais que promovem a inflamação sistémica — o inimigo da recuperação. Não oferecem micronutrientes, substituem alimentos de qualidade e provocam ingestão excessiva devido à sua palatabilidade artificial.",
            },
            {
              title: "Bebidas Açucaradas",
              severity: "ELIMINAR",
              color: DANGER,
              detail:
                "Calorias líquidas que causam picos de glicemia, resistência à insulina a longo prazo e substituem alimentos nutritivos sem proporcionar saciedade. Uma garrafa de 500ml de refrigerante acrescenta 200 calorias vazias e zero proteína, fibra ou micronutrientes.",
            },
            {
              title: "Gorduras Trans (óleos parcialmente hidrogenados)",
              severity: "ELIMINAR",
              color: DANGER,
              detail:
                'A gordura alimentar mais inflamatória que existe. Prejudica a função da membrana celular, reduz a testosterona e aumenta o risco cardiovascular. Encontrada em margarina, produtos de padaria industrial e alimentos fritos. Verifica os rótulos para "óleos parcialmente hidrogenados".',
            },
            {
              title: "Soja em Excesso (não fermentada)",
              severity: "CONSUMO MODERADO",
              color: "#E67E22",
              detail:
                "Contém fitoestrogénios que podem influenciar o equilíbrio hormonal em doses elevadas. A soja fermentada (tempeh, miso) é adequada. Evita fazer da soja não fermentada a tua principal fonte de proteína enquanto atleta masculino.",
            },
          ].map(({ title, severity, color, detail }) => (
            <div
              key={title}
              style={{
                borderLeft: `3px solid ${color}`,
                padding: "12px 16px",
                background:
                  color === DANGER
                    ? "rgba(192,57,43,0.04)"
                    : "rgba(230,126,34,0.04)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 6,
                }}
              >
                <div
                  style={{
                    fontFamily: "'League Spartan', sans-serif",
                    fontSize: 13,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  {title}
                </div>
                <span
                  style={{
                    fontFamily: "'League Spartan', sans-serif",
                    fontSize: 8,
                    fontWeight: 800,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color,
                    flexShrink: 0,
                    marginLeft: 12,
                  }}
                >
                  {severity}
                </span>
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  lineHeight: 1.6,
                  color: "#444",
                }}
              >
                {detail}
              </div>
            </div>
          ))}
        </div>

        <Callout bg={BLACK}>
          <strong
            style={{
              color: GOLD,
              fontFamily: "'League Spartan', sans-serif",
              fontSize: 11,
              letterSpacing: "0.08em",
            }}
          >
            A REGRA DOS 90/10:
          </strong>{" "}
          <span
            style={{
              color: "rgba(255,255,255,0.65)",
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
            }}
          >
            Come alimentos inteiros e nutritivos 90% do tempo. Os restantes 10%
            das refeições podem incluir escolhas menos ideais sem comprometer o
            teu progresso. A perfeição não é sustentável — a consistência é.
          </span>
        </Callout>
      </div>
      <Footer pageNumber={15} chapter="Alimentos que Sabotam os Ganhos" />
    </Page>
  )
}

// ─── Página 16: Plano Alimentar ────────────────────────────────────────────────

export function P16_MealPlan() {
  const refeicoes = [
    {
      meal: "Refeição 1 — Pequeno-Almoço",
      time: "7:00",
      calories: 620,
      protein: 45,
      carbs: 72,
      fat: 16,
      foods: [
        "4 ovos inteiros",
        "100g aveia com mel",
        "1 banana",
        "Café preto",
      ],
    },
    {
      meal: "Refeição 2 — Lanche da Manhã",
      time: "10:00",
      calories: 380,
      protein: 35,
      carbs: 40,
      fat: 8,
      foods: [
        "200g iogurte grego",
        "50g mirtilos",
        "1 c. sopa mel",
        "30g amêndoas",
      ],
    },
    {
      meal: "Refeição 3 — Almoço",
      time: "13:00",
      calories: 750,
      protein: 60,
      carbs: 80,
      fat: 18,
      foods: [
        "220g peito de frango",
        "280g arroz branco cozido",
        "Brócolos cozidos",
        "1 c. sopa azeite",
      ],
    },
    {
      meal: "Refeição 4 — Pré-Treino",
      time: "16:00",
      calories: 480,
      protein: 30,
      carbs: 65,
      fat: 10,
      foods: ["1 dose proteína whey", "1 banana", "60g aveia", "5g creatina"],
    },
    {
      meal: "Refeição 5 — Jantar Pós-Treino",
      time: "19:30",
      calories: 820,
      protein: 55,
      carbs: 90,
      fat: 24,
      foods: [
        "250g carne moída magra",
        "300g batata-doce",
        "Espargos",
        "½ abacate",
      ],
    },
  ]

  return (
    <Page>
      <div style={{ padding: "60px 56px 72px" }}>
        <Label>Capítulo 11</Label>
        <PageTitle size={32}>Plano Alimentar de 7 Dias</PageTitle>
        <div style={{ marginTop: 14, marginBottom: 12 }}>
          <GoldRule width={44} />
        </div>

        <div style={{ display: "flex", gap: 2, marginBottom: 24 }}>
          {[
            { label: "Calorias Diárias", value: "3.050", gold: true },
            { label: "Proteína Total", value: "225g" },
            { label: "HC Total", value: "347g" },
            { label: "Gordura Total", value: "76g" },
            { label: "Peso Alvo", value: "80 kg" },
          ].map(({ label, value, gold }) => (
            <div
              key={label}
              style={{
                flex: 1,
                background: gold ? GOLD : BLACK,
                padding: "10px 8px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 20,
                  color: gold ? BLACK : GOLD,
                  lineHeight: 1,
                }}
              >
                {value}
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 7.5,
                  color: gold ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.4)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginTop: 3,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {refeicoes.map((refeicao) => (
            <MealCard key={refeicao.meal} {...refeicao} />
          ))}
        </div>
      </div>
      <Footer pageNumber={16} chapter="O Plano Alimentar de 7 Dias" />
    </Page>
  )
}

// ─── Página 17: Batidos Hipercalóricos ─────────────────────────────────────────

export function P17_Shakes() {
  const batidos = [
    {
      name: "O Construtor de Massa",
      calories: 900,
      protein: 55,
      carbs: 120,
      fat: 22,
      ingredients: [
        "2 doses de whey (baunilha)",
        "2 chávenas de leite gordo",
        "2 c. sopa de manteiga de amendoim",
        "1 banana grande",
        "60g de aveia (triturada)",
        "1 c. sopa de mel",
        "5g de creatina",
      ],
      color: GOLD,
    },
    {
      name: "Batido de Manhã",
      calories: 650,
      protein: 45,
      carbs: 80,
      fat: 15,
      ingredients: [
        "1,5 doses whey (chocolate)",
        "1,5 chávenas leite vegetal",
        "1 banana",
        "60g aveia",
        "30g pepitas de chocolate negro",
        "1 chávena espinafres (imperceptível)",
      ],
      color: "#3498DB",
    },
    {
      name: "Recuperação Pós-Treino",
      calories: 520,
      protein: 50,
      carbs: 65,
      fat: 8,
      ingredients: [
        "2 doses whey (sem sabor)",
        "300ml água",
        "200ml sumo de laranja",
        "1 banana",
        "5g creatina",
        "3g leucina",
        "Cubos de gelo",
      ],
      color: "#E74C3C",
    },
    {
      name: "Batido Antes de Dormir",
      calories: 440,
      protein: 40,
      carbs: 35,
      fat: 16,
      ingredients: [
        "1 dose proteína caseína",
        "1 chávena leite gordo",
        "2 c. sopa manteiga de amêndoa",
        "1 c. chá canela",
        "½ banana",
        "Suplemento ZMA",
      ],
      color: "#9B59B6",
    },
  ]

  return (
    <Page>
      <div style={{ padding: "60px 56px 72px" }}>
        <Label>Capítulo 12</Label>
        <PageTitle size={32}>Receitas de Batidos Hipercalóricos</PageTitle>
        <div style={{ marginTop: 14, marginBottom: 16 }}>
          <GoldRule width={44} />
        </div>
        <Body style={{ marginBottom: 24, maxWidth: 580 }}>
          Quando os alimentos sólidos se tornam difíceis de consumir em
          quantidade suficiente, as calorias líquidas são os teus melhores
          aliados. Estes batidos concentram calorias e proteína sérias em apenas
          5 minutos de preparação.
        </Body>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
        >
          {batidos.map((batido) => (
            <div
              key={batido.name}
              style={{ border: `1.5px solid ${GRAY_BORDER}`, padding: 16 }}
            >
              <div
                style={{
                  height: 3,
                  background: batido.color,
                  marginBottom: 12,
                }}
              />
              <div
                style={{
                  fontFamily: "'League Spartan', sans-serif",
                  fontSize: 14,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.03em",
                  marginBottom: 8,
                }}
              >
                {batido.name}
              </div>
              <div style={{ display: "flex", gap: 14, marginBottom: 12 }}>
                {[
                  { label: "kcal", value: batido.calories.toString() },
                  { label: "proteína", value: `${batido.protein}g` },
                  { label: "HC", value: `${batido.carbs}g` },
                  { label: "gordura", value: `${batido.fat}g` },
                ].map(({ label, value }) => (
                  <div key={label} style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: 18,
                        color: batido.color,
                        lineHeight: 1,
                      }}
                    >
                      {value}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 7.5,
                        color: GRAY_MID,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        marginTop: 1,
                      }}
                    >
                      {label}
                    </div>
                  </div>
                ))}
              </div>
              <ThinRule />
              <div style={{ marginTop: 10 }}>
                <div
                  style={{
                    fontFamily: "'League Spartan', sans-serif",
                    fontSize: 8.5,
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: GRAY_MID,
                    marginBottom: 6,
                  }}
                >
                  Ingredientes
                </div>
                {batido.ingredients.map((ing) => (
                  <div
                    key={ing}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      marginBottom: 3,
                    }}
                  >
                    <div
                      style={{
                        width: 3,
                        height: 3,
                        background: batido.color,
                        borderRadius: "50%",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 10.5,
                        color: "#444",
                      }}
                    >
                      {ing}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer pageNumber={17} chapter="Receitas de Batidos Hipercalóricos" />
    </Page>
  )
}

// ─── Página 18: Divisor — Treino ───────────────────────────────────────────────

export function P18_TrainingDivider() {
  return (
    <Page dark>
      <div style={{ position: "absolute", inset: 0 }}>
        <img
          src={IMG.dimGym}
          alt="Ginásio"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.5,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(11,11,11,0.95) 50%, rgba(11,11,11,0.3) 100%)",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 56,
          top: "50%",
          transform: "translateY(-50%)",
          right: "45%",
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 9,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: GOLD,
            marginBottom: 14,
          }}
        >
          Parte Dois · Treino
        </div>
        <div
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 14,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
            marginBottom: 12,
          }}
        >
          Capítulo 13
        </div>
        <div
          style={{
            fontFamily: "'League Spartan', sans-serif",
            fontSize: 48,
            fontWeight: 800,
            lineHeight: 1.0,
            color: WHITE,
            marginBottom: 22,
          }}
        >
          Fundamentos
          <br />
          do <span style={{ color: GOLD }}>Treino</span>
        </div>
        <GoldRule width={52} />
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            lineHeight: 1.75,
            color: "rgba(255,255,255,0.5)",
            marginTop: 18,
            maxWidth: 380,
          }}
        >
          Os princípios que regem todos os bons programas de treino —
          compreendê-los tornará cada sessão mais produtiva do que tudo o que já
          fizeste anteriormente.
        </p>
      </div>
      <Footer pageNumber={18} dark />
    </Page>
  )
}

// ─── Página 19: Fundamentos do Treino ─────────────────────────────────────────

export function P19_WorkoutFundamentals() {
  return (
    <Page>
      <div style={{ padding: "60px 56px 72px" }}>
        <Label>Capítulo 13</Label>
        <PageTitle size={36}>Fundamentos do Treino</PageTitle>
        <div style={{ marginTop: 14, marginBottom: 20 }}>
          <GoldRule width={44} />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0 36px",
            marginBottom: 28,
          }}
        >
          <div>
            <Body style={{ marginBottom: 14 }}>
              Antes de tocares num único peso, interioriza estes princípios.
              Eles determinam a qualidade de todas as sessões de treino que
              farás alguma vez. Ignora qualquer um deles e os teus resultados
              serão permanentemente limitados.
            </Body>
            <Quote size={15} attribution="Reg Park">
              Quem não se preocupa em aprender os fundamentos nunca dominará o
              avançado.
            </Quote>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              {
                label: "Faixa de Repetições para Hipertrofia",
                value: "6 – 20",
              },
              { label: "Séries por Músculo por Semana", value: "10 – 20" },
              { label: "Sessões por Músculo por Semana", value: "2×" },
              { label: "Pausa entre Séries (compostos)", value: "2–4 min" },
              { label: "Pausa entre Séries (isolamento)", value: "60–90 s" },
              { label: "Sessões de Treino por Semana", value: "4 dias" },
            ].map(({ label, value }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "9px 12px",
                  background: GRAY,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    color: "#444",
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontFamily: "'League Spartan', sans-serif",
                    fontSize: 13,
                    fontWeight: 700,
                    color: GOLD,
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Label size={8} color={GRAY_MID}>
          Os Seis Princípios Inegociáveis
        </Label>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 14,
            marginBottom: 22,
          }}
        >
          {[
            {
              n: 1,
              title: "Sobrecarga Progressiva",
              body: "Acrescenta peso, repetições ou séries em cada sessão ou semana. Se não estás a progredir, não estás a crescer. Esta é a regra mestre de todo o treino.",
            },
            {
              n: 2,
              title: "Exercícios Compostos Primeiro",
              body: "Agachamento, Peso Morto, Supino, Remada, Press de Ombros. Treina-os pesado no início de cada sessão, quando estás descansado e em plenas capacidades neurais.",
            },
            {
              n: 3,
              title: "Amplitude de Movimento Completa",
              body: "Repetições parciais constroem músculos parciais. Agachamento profundo, curl completo de bíceps, alongamento total do peitoral. Os músculos crescem mais na posição alongada sob carga.",
            },
            {
              n: 4,
              title: "Ligação Mente-Músculo",
              body: "Sente cada repetição no músculo alvo. Contrai no pico da contração. 70% do estímulo vem para onde diriges a atenção.",
            },
            {
              n: 5,
              title: "Fase Excêntrica Controlada",
              body: "Baixa o peso em 2–3 segundos. A fase negativa (descida) causa o maior dano mecânico e é onde nasce grande parte do sinal de crescimento.",
            },
            {
              n: 6,
              title: "Diário de Treino Consistente",
              body: "Se não registas pesos e repetições, não tens forma de garantir a sobrecarga progressiva. Usa o diário de treino no apêndice em cada sessão.",
            },
          ].map(({ n, title, body }) => (
            <NumItem key={n} number={n} title={title} body={body} compact />
          ))}
        </div>

        <TipsBox title="A Dose Mínima Eficaz">
          Não precisas de treinar 6 dias por semana para maximizar o crescimento
          muscular. A investigação mostra consistentemente que 4 sessões bem
          estruturadas com volume adequado produzem resultados indistinguíveis
          de divisões de 6 dias — com uma recuperação dramaticamente melhor.
        </TipsBox>
      </div>
      <Footer pageNumber={19} chapter="Fundamentos do Treino" />
    </Page>
  )
}

// ─── Página 20: Sobrecarga Progressiva ────────────────────────────────────────

export function P20_ProgressiveOverload() {
  return (
    <Page>
      <div style={{ padding: "60px 56px 72px" }}>
        <Label>Capítulo 14</Label>
        <PageTitle size={36}>O Poder da Sobrecarga Progressiva</PageTitle>
        <div style={{ marginTop: 14, marginBottom: 20 }}>
          <GoldRule width={44} />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0 36px",
            marginBottom: 26,
          }}
        >
          <Body>
            A sobrecarga progressiva é o conceito mais importante em todo o
            treino de resistência. É o princípio de que os músculos devem ser
            progressivamente desafiados com exigências crescentes ao longo do
            tempo para continuarem a adaptar-se e a crescer. Sem ela, todo o
            treino se torna manutenção.
          </Body>
          <BigStat
            value="5–10"
            unit="%"
            label="Objetivo de aumento semanal de força"
          />
        </div>

        <Label size={8} color={GRAY_MID}>
          Seis Métodos de Sobrecarga Progressiva
        </Label>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            marginBottom: 24,
          }}
        >
          {[
            {
              n: 1,
              title: "Adicionar Peso",
              body: "O método mais direto. Aumenta a carga na barra. Mesmo adicionar 2,5 kg por sessão cria ganhos de força significativos ao longo de meses.",
            },
            {
              n: 2,
              title: "Adicionar Repetições",
              body: "Atinge o limite superior da tua faixa de reps (ex.: 12) antes de adicionar peso. Dupla progressão: primeiro as reps, depois o peso.",
            },
            {
              n: 3,
              title: "Adicionar Séries",
              body: "Aumenta o volume semanal total acrescentando uma série extra por exercício. Monitoriza a recuperação — volume excessivo prejudica o progresso.",
            },
            {
              n: 4,
              title: "Reduzir as Pausas",
              body: "Fazer o mesmo trabalho em menos tempo aumenta a densidade do treino. Reduz a pausa em 15 segundos por semana mantendo a performance.",
            },
            {
              n: 5,
              title: "Abrandar a Fase Excêntrica",
              body: "Aumenta o tempo sob tensão controlando a fase de descida. Negativas de 3 segundos com o mesmo peso criam um novo estímulo.",
            },
            {
              n: 6,
              title: "Aumentar a Frequência",
              body: "Trabalha cada grupo muscular mais vezes por semana. Passar de uma para duas sessões semanais pode acelerar o crescimento se a recuperação o permitir.",
            },
          ].map(({ n, title, body }) => (
            <NumItem key={n} number={n} title={title} body={body} compact />
          ))}
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
        >
          <TipsBox title="O Método de Dupla Progressão">
            Escolhe uma faixa de reps (ex.: 8–12). Começa no mínimo (8 reps). A
            cada semana, tenta adicionar uma repetição. Quando atinges o máximo
            (12 reps), adiciona 2,5–5 kg e regressa às 8 reps. Repete. Este é o
            método de progressão mais fiável para atletas naturais.
          </TipsBox>
          <WarningBox title="Sinais de que Precisas de um Deload">
            Dor articular persistente, força em queda durante 2+ semanas, sono
            perturbado, motivação zero para treinar. Programa uma semana de
            deload a cada 6–8 semanas: reduz o volume em 50% e o peso em 40%. As
            semanas de deload são onde o músculo é realmente construído.
          </WarningBox>
        </div>
      </div>
      <Footer pageNumber={20} chapter="O Poder da Sobrecarga Progressiva" />
    </Page>
  )
}

// ─── Página 21: Programa de 4 Dias ────────────────────────────────────────────

export function P21_WorkoutProgram() {
  const dias = [
    {
      day: "Dia A",
      focus: "Peito · Ombros · Tríceps",
      color: "#E74C3C",
      exercises: [
        {
          index: 1,
          name: "Supino com Barra",
          sets: "4",
          reps: "6–8",
          rest: "3 min",
          muscle: "Peito",
          tip: "Retrai as omoplatas. Barra toca no peitoral inferior. Press explosivo.",
        },
        {
          index: 2,
          name: "Supino Inclinado c/ Halteres",
          sets: "3",
          reps: "8–12",
          rest: "2 min",
          muscle: "Peitoral Superior",
        },
        {
          index: 3,
          name: "Press de Ombros em Pé",
          sets: "3",
          reps: "8–10",
          rest: "2 min",
          muscle: "Ombros",
          tip: "Core contraído. Pressiona em direção ao teto.",
        },
        {
          index: 4,
          name: "Elevações Laterais",
          sets: "4",
          reps: "12–15",
          rest: "75 s",
          muscle: "Deltóides Laterais",
        },
        {
          index: 5,
          name: "Pushdown de Tríceps (cabo)",
          sets: "3",
          reps: "12–15",
          rest: "60 s",
          muscle: "Tríceps",
        },
        {
          index: 6,
          name: "Extensão de Tríceps Overhead",
          sets: "3",
          reps: "10–12",
          rest: "60 s",
          muscle: "Cabeça Longa",
        },
      ],
    },
    {
      day: "Dia B",
      focus: "Costas · Bíceps · Deltóides Posteriores",
      color: "#3498DB",
      exercises: [
        {
          index: 1,
          name: "Peso Morto Convencional",
          sets: "4",
          reps: "4–6",
          rest: "4 min",
          muscle: "Costas Completas",
          tip: "Dobragem na anca. Barra rente ao corpo. Empurra pelo calcanhar.",
        },
        {
          index: 2,
          name: "Dominadas / Puxada no Cabo",
          sets: "4",
          reps: "6–10",
          rest: "2 min",
          muscle: "Grande Dorsal",
        },
        {
          index: 3,
          name: "Remada Curvada c/ Barra",
          sets: "3",
          reps: "8–10",
          rest: "2 min",
          muscle: "Costas Médias",
          tip: "Puxa para o umbigo. Controla a descida.",
        },
        {
          index: 4,
          name: "Remada no Cabo Sentado",
          sets: "3",
          reps: "10–12",
          rest: "90 s",
          muscle: "Rombóides",
        },
        {
          index: 5,
          name: "Curl de Bíceps c/ Barra EZ",
          sets: "3",
          reps: "10–12",
          rest: "75 s",
          muscle: "Bíceps",
        },
        {
          index: 6,
          name: "Face Pulls",
          sets: "3",
          reps: "15–20",
          rest: "60 s",
          muscle: "Deltóides Post.",
        },
      ],
    },
  ]

  return (
    <Page>
      <div style={{ padding: "52px 56px 68px" }}>
        <Label>Capítulo 15</Label>
        <PageTitle size={32}>Programa de Hipertrofia de 4 Dias</PageTitle>
        <div style={{ marginTop: 12, marginBottom: 14 }}>
          <GoldRule width={44} />
        </div>

        <div style={{ display: "flex", gap: 2, marginBottom: 22 }}>
          {[
            "Seg — Dia A",
            "Ter — Dia B",
            "Qua — REST",
            "Qui — Dia C",
            "Sex — Dia D",
            "Sáb — REST",
            "Dom — REST",
          ].map((d) => {
            const isRest = d.includes("REST")
            return (
              <div
                key={d}
                style={{
                  flex: 1,
                  padding: "8px 4px",
                  textAlign: "center",
                  background: isRest ? GRAY : BLACK,
                }}
              >
                <div
                  style={{
                    fontFamily: "'League Spartan', sans-serif",
                    fontSize: 9,
                    fontWeight: 700,
                    color: isRest ? GRAY_MID : GOLD,
                    letterSpacing: "0.08em",
                  }}
                >
                  {d}
                </div>
              </div>
            )
          })}
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}
        >
          {dias.map((dia) => (
            <div key={dia.day}>
              <div
                style={{
                  borderTop: `2px solid ${dia.color}`,
                  paddingTop: 12,
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 22,
                    color: dia.color,
                    lineHeight: 1,
                  }}
                >
                  {dia.day}
                </div>
                <div
                  style={{
                    fontFamily: "'League Spartan', sans-serif",
                    fontSize: 10,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: GRAY_MID,
                    marginTop: 2,
                  }}
                >
                  {dia.focus}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {dia.exercises.map((ex) => (
                  <ExerciseCard key={ex.index} {...ex} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 14, background: GRAY, padding: "10px 14px" }}>
          <span
            style={{
              fontFamily: "'League Spartan', sans-serif",
              fontSize: 8.5,
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: GRAY_MID,
            }}
          >
            Nota:{" "}
          </span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 10.5,
              color: "#555",
            }}
          >
            Os Dias C e D (Pernas e Força Superior) encontram-se na página
            seguinte. Completa os 4 dias antes de reiniciar o ciclo.
          </span>
        </div>
      </div>
      <Footer pageNumber={21} chapter="Programa de Hipertrofia de 4 Dias" />
    </Page>
  )
}

// ─── Página 22: Técnica de Exercício ──────────────────────────────────────────

export function P22_Technique() {
  return (
    <Page>
      <div style={{ padding: "60px 56px 72px" }}>
        <Label>Capítulo 16</Label>
        <PageTitle size={36}>Masterclass de Técnica de Exercício</PageTitle>
        <div style={{ marginTop: 14, marginBottom: 20 }}>
          <GoldRule width={44} />
        </div>
        <Body style={{ marginBottom: 24, maxWidth: 580 }}>
          A técnica perfeita não é uma questão de ego — é maximizar o estímulo
          no músculo alvo e minimizar o risco de lesão. Estes quatro movimentos
          são a base de qualquer programa sério de hipertrofia.
        </Body>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
        >
          {[
            {
              name: "Agachamento Livre",
              color: "#E74C3C",
              target: "Quadríceps, Glúteos, Isquiotibiais",
              setup:
                "Barra nos trapézios superiores. Pés à largura dos ombros, dedos virados 30° para fora. Coluna neutra.",
              cues: [
                "Contrai o core antes de descer",
                "Quebra nas ancas e nos joelhos simultaneamente",
                "Joelhos alinham com os dedos durante todo o movimento",
                "Desce até paralelo ou abaixo — sem atalhos",
                "Empurra pelos calcanhares para subir",
                "Contrai os glúteos no lockout",
              ],
            },
            {
              name: "Supino com Barra",
              color: "#3498DB",
              target: "Peitoral, Deltóides Anteriores, Tríceps",
              setup:
                "Retrai e desce as omoplatas. Apoia os pés. Ligeira curvatura na região lombar.",
              cues: [
                "Pega 1,5× a largura dos ombros",
                "Barra desce ao peitoral inferior",
                "Toca no peitoral inferior — sem ressalto",
                "Cotovelos a 45–75° do corpo",
                "Impulso das pernas no chão",
                "Press até ao lockout completo",
              ],
            },
            {
              name: "Peso Morto Convencional",
              color: GOLD,
              target: "Cadeia Posterior Completa, Trapézios, Grande Dorsal",
              setup:
                "Barra sobre o meio do pé. Stance à largura das ancas. Pega pronada à largura das pernas.",
              cues: [
                "Recua as ancas para alcançar a barra",
                "Grande dorsal ativado, peito alto, costas planas",
                "Empurra o chão para longe (cue de leg press)",
                "Barra sobe rente à perna e coxa",
                "Ancas e ombros sobem juntos",
                "Lockout: fica em pé, contrai os glúteos",
              ],
            },
            {
              name: "Remada Curvada",
              color: SUCCESS,
              target: "Grande Dorsal, Rombóides, Deltóides Post., Bíceps",
              setup:
                "Stance à largura das ancas. Inclinação a 45°. Pega prona ou supina, à largura dos ombros.",
              cues: [
                "Costas planas — sem curvatura",
                "Puxa a barra para o umbigo",
                "Lidera com os cotovelos, não com as mãos",
                "Contrai as omoplatas no topo",
                "Controla a descida — 2 segundos",
                "Não hiperextendas no lockout",
              ],
            },
          ].map(({ name, color, target, setup, cues }) => (
            <div
              key={name}
              style={{ border: `1px solid ${GRAY_BORDER}`, padding: 14 }}
            >
              <div style={{ height: 3, background: color, marginBottom: 10 }} />
              <div
                style={{
                  fontFamily: "'League Spartan', sans-serif",
                  fontSize: 14,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  marginBottom: 3,
                }}
              >
                {name}
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 9,
                  color: GRAY_MID,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                {target}
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 10,
                  color: "#555",
                  lineHeight: 1.5,
                  marginBottom: 10,
                  fontStyle: "italic",
                  borderLeft: `2px solid ${GRAY_BORDER}`,
                  paddingLeft: 8,
                }}
              >
                Setup: {setup}
              </div>
              <div>
                {cues.map((cue, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 6,
                      marginBottom: 4,
                    }}
                  >
                    <div
                      style={{
                        width: 4,
                        height: 4,
                        background: color,
                        borderRadius: "50%",
                        flexShrink: 0,
                        marginTop: 4,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 10.5,
                        color: "#444",
                        lineHeight: 1.4,
                      }}
                    >
                      {cue}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer pageNumber={22} chapter="Masterclass de Técnica de Exercício" />
    </Page>
  )
}

// ─── Página 23: Recuperação ────────────────────────────────────────────────────

export function P23_Recovery() {
  return (
    <Page>
      <div style={{ padding: "60px 56px 72px" }}>
        <Label>Capítulo 17</Label>
        <PageTitle size={36}>Recuperação e Regeneração</PageTitle>
        <div style={{ marginTop: 14, marginBottom: 20 }}>
          <GoldRule width={44} />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0 36px",
            marginBottom: 28,
          }}
        >
          <Body>
            Não cresces no ginásio. Cresces durante a recuperação. O treino é o
            estímulo — a recuperação é onde acontece a adaptação. Se
            sistematicamente reduzes a recuperação, os teus resultados serão uma
            fração do teu potencial.
          </Body>
          <Quote size={15} attribution="Ruben Freitas">
            Dorme mais. Come mais. Recupera melhor. Estas não são atividades
            passivas — são investimentos ativos no teu físico.
          </Quote>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
            marginBottom: 24,
          }}
        >
          {[
            {
              title: "Sono",
              icon: "🌙",
              hours: "7–9h",
              color: "#9B59B6",
              points: [
                "90% da GH libertada durante o sono profundo",
                "A testosterona regenera durante a noite",
                "Reparação neural e consolidação de habilidades",
                "Inflamação resolvida durante os ciclos REM",
              ],
            },
            {
              title: "Timing Nutricional",
              icon: "🍗",
              hours: "Após 2h",
              color: "#E74C3C",
              points: [
                "Proteína nas 2h após o treino",
                "HC imediatamente após o treino",
                "Alimentos anti-inflamatórios pós-treino",
                "Creatina diária — timing flexível",
              ],
            },
            {
              title: "Recuperação Ativa",
              icon: "🚶",
              hours: "20–30 min",
              color: SUCCESS,
              points: [
                "Caminhada leve nos dias de descanso",
                "Foam rolling nas áreas tensas",
                "Trabalho de mobilidade dinâmica",
                "Natação ou ciclismo leve são adequados",
              ],
            },
          ].map(({ title, icon, hours, color, points }) => (
            <div
              key={title}
              style={{ border: `1px solid ${GRAY_BORDER}`, padding: 14 }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 8,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "'League Spartan', sans-serif",
                      fontSize: 14,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {title}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 20,
                      color,
                      lineHeight: 1,
                      marginTop: 2,
                    }}
                  >
                    {hours}
                  </div>
                </div>
                <span style={{ fontSize: 22 }}>{icon}</span>
              </div>
              <div
                style={{
                  height: 2,
                  background: color,
                  marginBottom: 10,
                  opacity: 0.35,
                }}
              />
              {points.map((p) => (
                <div
                  key={p}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 6,
                    marginBottom: 5,
                  }}
                >
                  <div
                    style={{
                      width: 4,
                      height: 4,
                      background: color,
                      borderRadius: "50%",
                      flexShrink: 0,
                      marginTop: 4,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 10.5,
                      color: "#555",
                      lineHeight: 1.4,
                    }}
                  >
                    {p}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <Label size={8} color={GRAY_MID}>
          Tempo Mínimo de Recuperação Entre Sessões
        </Label>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 2,
          }}
        >
          {[
            { group: "Peito", time: "48h" },
            { group: "Costas", time: "48–72h" },
            { group: "Pernas", time: "72h" },
            { group: "Ombros", time: "48h" },
            { group: "Bíceps", time: "48h" },
            { group: "Tríceps", time: "48h" },
            { group: "Gémeos", time: "24h" },
            { group: "Abdominais", time: "24–48h" },
          ].map(({ group, time }) => (
            <div
              key={group}
              style={{
                background: GRAY,
                padding: "10px 8px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "'League Spartan', sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  marginBottom: 3,
                }}
              >
                {group}
              </div>
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 18,
                  color: GOLD,
                  lineHeight: 1,
                }}
              >
                {time}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 20 }}>
          <WarningBox title="O Sobretreino É Real">
            Sintomas incluem: força em queda durante 2+ semanas consecutivas,
            dor muscular persistente que não resolve, insónia ou fadiga
            excessiva, libido zero e frequência cardíaca em repouso elevada. A
            solução é sempre a mesma: come mais, dorme mais, treina menos.
          </WarningBox>
        </div>
      </div>
      <Footer pageNumber={23} chapter="Recuperação e Regeneração" />
    </Page>
  )
}

// ─── Página 24: Sono ───────────────────────────────────────────────────────────

export function P24_Sleep() {
  return (
    <Page dark bg="#0D0D14">
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(212,175,55,0.15) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.4,
        }}
      />
      <div
        style={{ position: "relative", padding: "60px 56px 72px", zIndex: 2 }}
      >
        <Label>Capítulo 18</Label>
        <div
          style={{
            fontFamily: "'League Spartan', sans-serif",
            fontSize: 48,
            fontWeight: 800,
            lineHeight: 1.0,
            color: WHITE,
            marginBottom: 6,
          }}
        >
          Sono:
          <br />A Tua Arma
          <br />
          <span style={{ color: GOLD }}>Secreta</span>
        </div>
        <div style={{ marginTop: 18, marginBottom: 24 }}>
          <GoldRule width={44} />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0 40px",
            marginBottom: 32,
          }}
        >
          <Body color="rgba(255,255,255,0.62)">
            90% da hormona de crescimento é libertada durante o sono de ondas
            lentas (fases 3 e 4). Falhar consistentemente os objetivos de sono
            suprime a hormona anabólica mais poderosa que o teu corpo produz —
            de forma gratuita.
          </Body>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {[
              { stat: "90%", label: "Da GH diária libertada durante o sono" },
              {
                stat: "23%",
                label: "Queda de testosterona após 1 semana com 5h de sono",
              },
              {
                stat: "40%",
                label: "Redução nos ganhos musculares com sono deficiente",
              },
            ].map(({ stat, label }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  paddingBottom: 10,
                  marginBottom: 6,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 32,
                    color: GOLD,
                    lineHeight: 1,
                    flexShrink: 0,
                    minWidth: 70,
                  }}
                >
                  {stat}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    color: "rgba(255,255,255,0.45)",
                    lineHeight: 1.4,
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Label size={8}>Protocolo de Otimização do Sono</Label>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
            marginBottom: 24,
          }}
        >
          {[
            {
              time: "Noite (20–22h)",
              actions: [
                "Reduz as luzes e evita luz azul dos ecrãs",
                "Para de comer 2h antes de dormir (em défice)",
                "Toma suplemento ZMA / magnésio",
                "Temperatura do quarto: 18–20°C",
              ],
            },
            {
              time: "Protocolo ao Deitar",
              actions: [
                "Horários de dormir e acordar consistentes",
                "Quarto totalmente às escuras",
                "Sem telemóvel nos 30 min antes de dormir",
                "Respiração profunda ou relaxamento muscular progressivo",
              ],
            },
            {
              time: "Ambiente de Sono",
              actions: [
                "Colchão e almofada de qualidade são essenciais",
                "Ruído branco em ambientes urbanos",
                "Sem animais de estimação na cama",
                "Quarto fresco — temperatura corporal tem de baixar para adormecer",
              ],
            },
            {
              time: "Protocolo Matinal",
              actions: [
                "Exposição à luz natural nos primeiros 30 min",
                "Evita carregar no snooze — completa ciclos de sono",
                "Atrasa a cafeína 90 min após acordar (adenosina)",
                "Regista as horas de sono totais semanalmente",
              ],
            },
          ].map(({ time, actions }) => (
            <div
              key={time}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "12px 14px",
              }}
            >
              <div
                style={{
                  fontFamily: "'League Spartan', sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: GOLD,
                  marginBottom: 8,
                }}
              >
                {time}
              </div>
              {actions.map((a) => (
                <div
                  key={a}
                  style={{ display: "flex", gap: 6, marginBottom: 5 }}
                >
                  <div
                    style={{
                      width: 4,
                      height: 4,
                      background: GOLD,
                      borderRadius: "50%",
                      flexShrink: 0,
                      marginTop: 4,
                      opacity: 0.6,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 10.5,
                      color: "rgba(255,255,255,0.5)",
                      lineHeight: 1.4,
                    }}
                  >
                    {a}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div
          style={{
            border: "1px solid rgba(212,175,55,0.25)",
            padding: "14px 18px",
            background: "rgba(212,175,55,0.05)",
          }}
        >
          <div
            style={{
              fontFamily: "'League Spartan', sans-serif",
              fontSize: 9,
              fontWeight: 800,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: GOLD,
              marginBottom: 5,
            }}
          >
            ★ Objetivo
          </div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.6,
            }}
          >
            7–9 horas de sono de qualidade por noite. Regista com uma app ou
            smartwatch durante 2 semanas. Se estás a fazer uma média inferior a
            7h, melhorar o sono fará mais pelos teus ganhos do que qualquer
            suplemento ou mudança de programa de treino.
          </div>
        </div>
      </div>
      <Footer pageNumber={24} dark chapter="Sono: A Tua Arma Secreta" />
    </Page>
  )
}

// ─── Página 25: Suplementos ────────────────────────────────────────────────────

export function P25_Supplements() {
  return (
    <Page>
      <div style={{ padding: "60px 56px 72px" }}>
        <Label>Capítulo 19</Label>
        <PageTitle size={36}>Guia de Suplementação</PageTitle>
        <div style={{ marginTop: 14, marginBottom: 14 }}>
          <GoldRule width={44} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <Callout bg={BLACK}>
            <strong
              style={{
                color: GOLD,
                fontFamily: "'League Spartan', sans-serif",
                fontSize: 10,
                letterSpacing: "0.1em",
              }}
            >
              IMPORTANTE:
            </strong>{" "}
            <span
              style={{
                color: "rgba(255,255,255,0.6)",
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
              }}
            >
              Os suplementos representam aproximadamente 5% dos teus resultados.
              Os outros 95% são treino, nutrição e sono. Não compres suplementos
              antes de corrigir os fundamentos. Estão listados por ordem
              decrescente de evidência científica.
            </span>
          </Callout>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 14,
          }}
        >
          <SupCard
            name="Creatina Monoidratada"
            dose="3–5g / dia"
            timing="A qualquer hora"
            benefit="O suplemento mais estudado da história. Aumenta a regeneração de ATP para ganhos de força de 5–8%. Melhora a retenção de água nas células musculares criando um ambiente anabólico."
            icon="💪"
          />
          <SupCard
            name="Proteína Whey"
            dose="25–50g"
            timing="Pós-treino"
            benefit="A proteína completa de absorção mais rápida. Fecha a janela anabólica nos 30 min após o treino. Usa apenas se for difícil atingir os objetivos de proteína com alimentos inteiros."
            icon="🥛"
          />
          <SupCard
            name="Cafeína"
            dose="200–400mg"
            timing="Pré-treino"
            benefit="Demonstrado aumentar a força em 3–10%, reduzir o esforço percebido e melhorar o foco e a mobilização de gordura durante o treino. Faz ciclos para prevenir a tolerância."
            icon="☕"
          />
          <SupCard
            name="Vitamina D3 + K2"
            dose="2.000–5.000 UI D3"
            timing="Com refeição"
            benefit="Mais de 70% dos atletas são deficientes. Produção de testosterona, função imune, absorção de cálcio e densidade óssea dependem de níveis ótimos de D3."
            icon="☀️"
          />
          <SupCard
            name="Ómega-3 Óleo de Peixe"
            dose="2–4g EPA+DHA"
            timing="Com refeição"
            benefit="Anti-inflamatório, reduz a intensidade e duração das DOMS, apoia a saúde articular, melhora a sensibilidade à insulina e pode reduzir a resposta do cortisol ao treino."
            icon="🐟"
          />
          <SupCard
            name="Glicinato de Magnésio"
            dose="300–400mg"
            timing="Pré-sono"
            benefit="Essencial para mais de 300 reações enzimáticas. A maioria dos atletas é deficiente por perdas no suor. Melhora a qualidade do sono, reduz cãibras musculares e apoia a produção de testosterona."
            icon="🧘"
          />
        </div>

        <div style={{ marginTop: 18 }}>
          <TipsBox title="Compra Apenas Produtos com Certificação de Terceiros">
            Procura as certificações NSF Certified for Sport, Informed Sport ou
            USP em cada suplemento. A indústria de suplementos tem fraca
            regulamentação — estas certificações confirmam que o produto contém
            o que afirma, sem substâncias proibidas.
          </TipsBox>
        </div>
      </div>
      <Footer pageNumber={25} chapter="Guia de Suplementação" />
    </Page>
  )
}

// ─── Página 26: Perguntas Frequentes ──────────────────────────────────────────

export function P26_FAQ() {
  const faqs = [
    {
      q: "Quanto tempo demora a ver crescimento muscular real?",
      a: "Espera mudanças visíveis após 8–12 semanas de treino consistente e nutrição adequada. As adaptações neurais (ganhos de força sem músculo visível) acontecem nas primeiras 4 semanas. A hipertrofia real torna-se evidente depois disso.",
    },
    {
      q: "Posso construir músculo e perder gordura ao mesmo tempo?",
      a: "Sim — mas apenas em condições específicas: és iniciante (primeiros 1–2 anos de treino), regressas após uma pausa, ou tens gordura corporal significativa (acima de 20% em homens). Atletas avançados devem escolher um objetivo de cada vez.",
    },
    {
      q: "Quantas calorias devo comer por dia?",
      a: "Calcula o teu TDEE (ver página 7) e adiciona 250–400 kcal para um lean bulk. Começa por aí durante 4 semanas, monitoriza o peso e ajusta. Deves ganhar 0,1–0,25 kg por semana num lean bulk.",
    },
    {
      q: "Posso treinar com músculos doridos?",
      a: "DOMS ligeiras — sim, podes treinar. Trabalhar um músculo dorido a menor intensidade pode até acelerar a recuperação através do aumento do fluxo sanguíneo. Dor intensa ou dor aguda — descansa completamente e investiga a causa.",
    },
    {
      q: "Preciso de treinar até à falha muscular em cada série?",
      a: "Não. Treinar até à falha em todas as séries é contraproducente. Deixa 1–3 repetições em reserva na maioria das séries. Treina até à falha ocasionalmente na última série de exercícios de isolamento. A falha em movimentos compostos aumenta o risco de lesão sem benefício proporcional.",
    },
    {
      q: "E se falhar um treino?",
      a: 'Falhaste e segues em frente. Uma sessão falhada tem impacto zero mensurável no crescimento muscular. Não tentes "compensar" com volume extra. A consistência ao longo de semanas e meses é o que importa — não a perfeição numa semana específica.',
    },
    {
      q: "Devo usar máquinas ou pesos livres?",
      a: "Ambos. Os pesos livres (barras e halteres) são superiores para movimentos compostos e construção de força funcional. As máquinas oferecem melhor isolamento, curvas de tensão consistentes e segurança para séries até à falha. Inclui ambos em cada programa.",
    },
    {
      q: "Qual é o melhor horário para treinar?",
      a: "O melhor horário é aquele em que treinas com mais consistência. Fisiologicamente, o final da tarde (15–19h) é quando a temperatura corporal, testosterona e força atingem o pico. Mas uma rotina matinal consistente supera sempre uma tarde inconsistente.",
    },
  ]

  return (
    <Page>
      <div style={{ padding: "60px 56px 72px" }}>
        <Label>Capítulo 20</Label>
        <PageTitle size={36}>Perguntas Frequentes</PageTitle>
        <div style={{ marginTop: 14, marginBottom: 22 }}>
          <GoldRule width={44} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{
                borderBottom: `1px solid ${GRAY_BORDER}`,
                padding: "14px 0",
              }}
            >
              <div
                style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
              >
                <span
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 18,
                    color: GOLD,
                    lineHeight: 1.2,
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  P
                </span>
                <div>
                  <div
                    style={{
                      fontFamily: "'League Spartan', sans-serif",
                      fontSize: 13,
                      fontWeight: 700,
                      color: BLACK,
                      marginBottom: 5,
                      lineHeight: 1.3,
                    }}
                  >
                    {faq.q}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 11.5,
                      lineHeight: 1.68,
                      color: "#555",
                    }}
                  >
                    {faq.a}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer pageNumber={26} chapter="Perguntas Frequentes" />
    </Page>
  )
}

// ─── Página 27: Erros Comuns ───────────────────────────────────────────────────

export function P27_Mistakes() {
  const erros = [
    {
      title: "Não Comer o Suficiente",
      fix: "Regista as calorias durante 2 semanas. Se não estás a ganhar 0,1–0,25 kg/semana, não estás em excedente. Adiciona 200 kcal por dia e reavalia.",
    },
    {
      title: "Sono Insuficiente (< 7 horas)",
      fix: "Torna o sono inegociável. Define uma hora de dormir consistente. Sem treino tardio nem estimulantes após as 16h. Os ganhos vivem no sono.",
    },
    {
      title: "Sem Sobrecarga Progressiva",
      fix: "Regista cada sessão. Se não consegues superar os números da semana anterior após 3 tentativas, o exercício/peso é demasiado pesado. Reduz e constrói gradualmente.",
    },
    {
      title: "Saltar o Treino de Pernas",
      fix: "O treino de pernas produz respostas hormonais anabólicas sistémicas. Um bom treino de pernas impulsiona o crescimento da parte superior do corpo. Treina pernas duas vezes por semana — sem exceções.",
    },
    {
      title: "Cardio em Excesso",
      fix: "O cardio excessivo bloqueia o crescimento muscular. Mantém o cardio em 2–3 sessões de baixa intensidade de 20–30 min nos dias de descanso. Nunca deve interferir com a recuperação do treino de força.",
    },
    {
      title: "Mudar de Programa Constantemente",
      fix: "Mantém o mesmo programa durante no mínimo 12 semanas. As primeiras 4 semanas são adaptação neural — sem crescimento visível. Os resultados exigem paciência e consistência.",
    },
    {
      title: "Treinar com Má Técnica",
      fix: "Levantar ego com má técnica constrói lesões, não músculo. Filma-te de lado nos movimentos compostos uma vez por mês para avaliar a técnica.",
    },
    {
      title: "Negligenciar a Fase Excêntrica",
      fix: "Controla cada repetição na descida em 2–3 segundos. A fase de descida cria tanto — ou mais — dano mecânico quanto a fase concêntrica. Abranda.",
    },
  ]

  return (
    <Page>
      <div style={{ padding: "60px 56px 72px" }}>
        <Label>Capítulo 21</Label>
        <PageTitle size={36}>Erros Comuns a Evitar</PageTitle>
        <div style={{ marginTop: 14, marginBottom: 20 }}>
          <GoldRule width={44} />
        </div>
        <Body style={{ marginBottom: 24, maxWidth: 600 }}>
          Estes 8 erros custam à pessoa média 30–50% dos seus resultados
          potenciais. Lê cada um com atenção e avalia honestamente os teus
          hábitos atuais.
        </Body>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {erros.map((m, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 0,
                border: `1px solid ${GRAY_BORDER}`,
              }}
            >
              <div
                style={{
                  width: 36,
                  background: DANGER,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontFamily: "'League Spartan', sans-serif",
                  fontSize: 15,
                  fontWeight: 800,
                  color: WHITE,
                }}
              >
                {i + 1}
              </div>
              <div style={{ flex: 1, padding: "11px 14px" }}>
                <div
                  style={{
                    fontFamily: "'League Spartan', sans-serif",
                    fontSize: 13,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    color: DANGER,
                    marginBottom: 4,
                  }}
                >
                  {m.title}
                </div>
                <div
                  style={{ display: "flex", gap: 6, alignItems: "flex-start" }}
                >
                  <span
                    style={{
                      fontFamily: "'League Spartan', sans-serif",
                      fontSize: 8.5,
                      fontWeight: 800,
                      letterSpacing: "0.15em",
                      color: SUCCESS,
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  >
                    SOLUÇÃO:{" "}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 11,
                      lineHeight: 1.55,
                      color: "#444",
                    }}
                  >
                    {m.fix}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer pageNumber={27} chapter="Erros Comuns a Evitar" />
    </Page>
  )
}

// ─── Página 28: Plano de 12 Semanas ───────────────────────────────────────────

export function P28_TransformationPlan() {
  const semanas = [
    {
      wk: "1–4",
      phase: "Fundação",
      color: "#3498DB",
      focus: [
        "Domina a técnica em todos os movimentos compostos",
        "Estabelece a linha de base calórica e atinge os objetivos de proteína diariamente",
        "Cria rotina de preparação de refeições e sistema de compras",
        "Regista cada treino e cada refeição — sem exceções",
        "Dorme no mínimo 7 horas por noite",
      ],
      kpi: "Ganho de 0,1–0,25 kg/sem",
    },
    {
      wk: "5–8",
      phase: "Volume",
      color: GOLD,
      focus: [
        "Adiciona 2–4 séries por sessão nos movimentos principais",
        "Aumenta o volume semanal em 20% em relação à Fase 1",
        "Adiciona uma refeição proteica extra (quinta refeição)",
        "Introduz técnicas avançadas: drop sets, rest-pause",
        "Reavalia e aumenta as calorias em 150 kcal se o ganho estagnar",
      ],
      kpi: "Ganho de 0,25–0,35 kg/sem",
    },
    {
      wk: "9–12",
      phase: "Intensidade",
      color: "#E74C3C",
      focus: [
        "Foca na força máxima: faixa de 4–8 reps nos compostos",
        "Deload na semana 10 (reduz volume 50%, peso 40%)",
        "Tira fotos e medições de progresso na semana 12",
        "Planeia o próximo ciclo de 12 semanas com base nos pontos fracos",
        "Agenda análise de sangue e painel hormonal",
      ],
      kpi: "Pico de força + fotos",
    },
  ]

  return (
    <Page>
      <div style={{ padding: "60px 56px 72px" }}>
        <Label>Capítulo 22</Label>
        <PageTitle size={32}>Plano de Transformação de 12 Semanas</PageTitle>
        <div style={{ marginTop: 14, marginBottom: 20 }}>
          <GoldRule width={44} />
        </div>
        <Body style={{ marginBottom: 24, maxWidth: 620 }}>
          Esta estrutura de 12 semanas foi concebida para te desenvolver
          sistematicamente através de três fases — cada uma construindo sobre a
          anterior. Segue-a exatamente como está escrita. Não saltes à frente
          nem modifiques fases individuais.
        </Body>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            marginBottom: 24,
          }}
        >
          {semanas.map(({ wk, phase, color, focus, kpi }, idx) => (
            <div key={wk} style={{ border: `1px solid ${GRAY_BORDER}` }}>
              <div style={{ display: "flex", alignItems: "stretch" }}>
                <div
                  style={{
                    background: color,
                    width: 80,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "16px 8px",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 8,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: BLACK,
                      opacity: 0.6,
                      marginBottom: 4,
                    }}
                  >
                    Semanas
                  </div>
                  <div
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 24,
                      color: BLACK,
                      lineHeight: 1,
                    }}
                  >
                    {wk}
                  </div>
                </div>
                <div style={{ flex: 1, padding: "14px 18px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: 10,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'League Spartan', sans-serif",
                        fontSize: 16,
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        color,
                      }}
                    >
                      Fase {idx + 1}: {phase}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 9.5,
                        color,
                        border: `1px solid ${color}`,
                        padding: "3px 8px",
                        flexShrink: 0,
                        marginLeft: 12,
                      }}
                    >
                      {kpi}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "2px 16px",
                    }}
                  >
                    {focus.map((f, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 6,
                          paddingBottom: 5,
                        }}
                      >
                        <div
                          style={{
                            width: 4,
                            height: 4,
                            background: color,
                            borderRadius: "50%",
                            flexShrink: 0,
                            marginTop: 4,
                          }}
                        />
                        <span
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 10.5,
                            color: "#555",
                            lineHeight: 1.45,
                          }}
                        >
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Callout bg={BLACK}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            {[
              { label: "Ganho Muscular Esperado", value: "3–5 kg" },
              { label: "Aumento de Força", value: "15–25%" },
              { label: "Aderência Necessária", value: "90%+" },
            ].map(({ label, value }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 28,
                    color: GOLD,
                    lineHeight: 1,
                  }}
                >
                  {value}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 8.5,
                    color: "rgba(255,255,255,0.4)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginTop: 3,
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </Callout>
      </div>
      <Footer pageNumber={28} chapter="Plano de Transformação de 12 Semanas" />
    </Page>
  )
}

// ─── Página 29: Registo de Progresso ──────────────────────────────────────────

function CaixaInput({ label, unit = "" }: { label: string unit?: string }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 8.5,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: GRAY_MID,
          marginBottom: 5,
        }}
      >
        {label}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div
          style={{
            flex: 1,
            height: 32,
            border: `1.5px solid ${GRAY_BORDER}`,
            background: GRAY,
          }}
        />
        {unit && (
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 10,
              color: GRAY_MID,
              width: 28,
            }}
          >
            {unit}
          </span>
        )}
      </div>
    </div>
  )
}

export function P29_ProgressTracker() {
  return (
    <Page>
      <div style={{ padding: "60px 56px 72px" }}>
        <Label>Apêndice A1</Label>
        <PageTitle size={36}>Registo de Progresso</PageTitle>
        <div style={{ marginTop: 14, marginBottom: 20 }}>
          <GoldRule width={44} />
        </div>
        <Body style={{ marginBottom: 24, maxWidth: 580 }}>
          Regista as tuas medidas no início de cada fase de 4 semanas — sempre à
          mesma hora do dia (manhã, em jejum), nas mesmas condições. A
          consistência nas medições é tão importante quanto a consistência no
          treino.
        </Body>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
            marginBottom: 28,
          }}
        >
          {["Semana 1 (Início)", "Semana 4", "Semana 8", "Semana 12"].map(
            (label) => (
              <div
                key={label}
                style={{ background: GRAY, padding: "14px 12px" }}
              >
                <div
                  style={{
                    fontFamily: "'League Spartan', sans-serif",
                    fontSize: 9.5,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    color: GOLD,
                    marginBottom: 16,
                  }}
                >
                  {label}
                </div>
                {[
                  { label: "Data", unit: "" },
                  { label: "Peso Corporal", unit: "kg" },
                  { label: "Peito", unit: "cm" },
                  { label: "Ombros", unit: "cm" },
                  { label: "Cintura", unit: "cm" },
                  { label: "Ancas", unit: "cm" },
                  { label: "Braço D. (contraído)", unit: "cm" },
                  { label: "Braço E. (contraído)", unit: "cm" },
                  { label: "Coxa D.", unit: "cm" },
                  { label: "Coxa E.", unit: "cm" },
                  { label: "% Gordura Corporal", unit: "%" },
                ].map(({ label: l, unit }) => (
                  <CaixaInput key={l} label={l} unit={unit} />
                ))}
              </div>
            ),
          )}
        </div>

        <Label size={8} color={GRAY_MID}>
          Marcos de Força
        </Label>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 2,
            marginBottom: 18,
          }}
        >
          <div style={{ background: BLACK, padding: "8px 10px" }}>
            <div
              style={{
                fontFamily: "'League Spartan', sans-serif",
                fontSize: 8.5,
                color: GOLD,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Exercício
            </div>
            {["Agachamento", "Supino", "Peso Morto", "Press de Ombros"].map(
              (ex) => (
                <div
                  key={ex}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 10.5,
                    color: "rgba(255,255,255,0.5)",
                    padding: "8px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {ex}
                </div>
              ),
            )}
          </div>
          {["1RM Semana 1", "1RM Semana 6", "1RM Semana 12"].map((col) => (
            <div key={col} style={{ background: GRAY, padding: "8px 10px" }}>
              <div
                style={{
                  fontFamily: "'League Spartan', sans-serif",
                  fontSize: 8.5,
                  color: GRAY_MID,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                {col}
              </div>
              {["", "", "", ""].map((_, i) => (
                <div
                  key={i}
                  style={{
                    height: 16,
                    background: GRAY_BORDER,
                    margin: "4px 0",
                    marginBottom: 8,
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        <TipsBox title="Protocolo Fotográfico">
          Tira fotos de frente, de lado e de costas a cada 4 semanas, na mesma
          iluminação, mesmo local, mesma hora do dia (manhã, em jejum). Usa a
          mesma roupa. As fotos de progresso revelam mudanças que a balança e a
          fita métrica não conseguem captar.
        </TipsBox>
      </div>
      <Footer pageNumber={29} chapter="Registo de Progresso" />
    </Page>
  )
}

// ─── Página 30: Diário de Treino ───────────────────────────────────────────────

export function P30_WorkoutLog() {
  return (
    <Page>
      <div style={{ padding: "60px 56px 72px" }}>
        <Label>Apêndice A2</Label>
        <PageTitle size={36}>Diário de Treino Imprimível</PageTitle>
        <div style={{ marginTop: 14, marginBottom: 16 }}>
          <GoldRule width={44} />
        </div>
        <Body style={{ marginBottom: 20, maxWidth: 580 }}>
          Usa este diário durante cada sessão de treino. Regista a data,
          exercícios, séries, repetições e peso utilizado. Compara com sessões
          anteriores para garantir a sobrecarga progressiva.
        </Body>

        <div
          style={{
            display: "flex",
            gap: 2,
            marginBottom: 10,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {[
            "Data:",
            "____________",
            "Dia:",
            "____________",
            "Sessão:",
            "____________",
            "Peso Corporal:",
            "______ kg",
          ].map((item, i) => (
            <div
              key={i}
              style={{
                fontFamily: item.includes("_")
                  ? "none"
                  : "'League Spartan', sans-serif",
                fontSize: 10,
                color: item.includes("_") ? GRAY_BORDER : BLACK,
                fontWeight: item.includes("_") ? 400 : 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                whiteSpace: "nowrap",
                flex: item.includes("_") ? 1 : 0,
              }}
            >
              {item}
            </div>
          ))}
        </div>
        <ThinRule />

        <div style={{ marginTop: 16 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 60px 50px 60px 60px 60px 60px 1fr",
              gap: 4,
              background: BLACK,
              padding: "8px 10px",
              marginBottom: 2,
            }}
          >
            {[
              "Exercício",
              "Série 1",
              "Série 2",
              "Série 3",
              "Série 4",
              "Série 5",
              "RP?",
              "Notas",
            ].map((h) => (
              <div
                key={h}
                style={{
                  fontFamily: "'League Spartan', sans-serif",
                  fontSize: 8,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: GOLD,
                }}
              >
                {h}
              </div>
            ))}
          </div>
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 60px 50px 60px 60px 60px 60px 1fr",
                gap: 4,
                background: i % 2 === 0 ? WHITE : GRAY,
                padding: "0 10px",
                borderBottom: `1px solid ${GRAY_BORDER}`,
              }}
            >
              <div
                style={{ height: 32, borderRight: `1px solid ${GRAY_BORDER}` }}
              />
              {Array.from({ length: 5 }).map((_, j) => (
                <div
                  key={j}
                  style={{
                    height: 32,
                    borderRight: `1px solid ${GRAY_BORDER}`,
                  }}
                />
              ))}
              <div
                style={{ height: 32, borderRight: `1px solid ${GRAY_BORDER}` }}
              />
              <div style={{ height: 32 }} />
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 20,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}
        >
          <div style={{ background: GRAY, padding: "12px 14px" }}>
            <Label size={8}>Notas e Cues de Técnica</Label>
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                style={{
                  height: 20,
                  borderBottom: `1px solid ${GRAY_BORDER}`,
                  marginBottom: 8,
                }}
              />
            ))}
          </div>
          <div style={{ background: GRAY, padding: "12px 14px" }}>
            <Label size={8}>Energia e Motivação (1–10)</Label>
            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
                marginTop: 8,
              }}
            >
              {["Energia", "Humor", "Qualidade Sono", "Bomba", "Foco"].map(
                (m) => (
                  <div key={m} style={{ flex: 1, minWidth: 80 }}>
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 9,
                        color: GRAY_MID,
                        marginBottom: 4,
                      }}
                    >
                      {m}
                    </div>
                    <div
                      style={{
                        height: 22,
                        background: WHITE,
                        border: `1px solid ${GRAY_BORDER}`,
                      }}
                    />
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer pageNumber={30} chapter="Diário de Treino" />
    </Page>
  )
}

// ─── Página 31: Lista de Compras Imprimível ────────────────────────────────────

export function P31_GroceryChecklist() {
  return (
    <Page>
      <div style={{ padding: "60px 56px 72px" }}>
        <Label>Apêndice A3</Label>
        <PageTitle size={36}>Lista de Compras Semanal</PageTitle>
        <div style={{ marginTop: 14, marginBottom: 14 }}>
          <GoldRule width={44} />
        </div>

        <div
          style={{
            display: "flex",
            gap: 32,
            marginBottom: 22,
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span
              style={{
                fontFamily: "'League Spartan', sans-serif",
                fontSize: 10,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: BLACK,
              }}
            >
              Semana de:
            </span>
            <div
              style={{
                width: 140,
                height: 22,
                border: `1.5px solid ${GRAY_BORDER}`,
              }}
            />
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span
              style={{
                fontFamily: "'League Spartan', sans-serif",
                fontSize: 10,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: BLACK,
              }}
            >
              Orçamento:
            </span>
            <div
              style={{
                width: 100,
                height: 22,
                border: `1.5px solid ${GRAY_BORDER}`,
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
          }}
        >
          {[
            {
              cat: "Proteínas",
              color: "#E74C3C",
              items: [
                "Peito frango (2 kg)",
                "Carne moída magra (1 kg)",
                "Filetes salmão (500g)",
                "Atum em lata (×6)",
                "Ovos inteiros (×18)",
                "Claras de ovo (1L)",
                "Iogurte grego (×4)",
                "Queijo cottage (500g)",
                "Whey (se necessário)",
              ],
            },
            {
              cat: "Hidratos de Carbono",
              color: "#E67E22",
              items: [
                "Arroz branco (saco 2 kg)",
                "Aveia rolada (1 kg)",
                "Batatas-doces (×6)",
                "Massa (500g)",
                "Pão integral",
                "Bananas (×8)",
                "Maçãs (×6)",
                "Mirtilos (emb.)",
                "Mel (pequeno frasco)",
              ],
            },
            {
              cat: "Gorduras e Extras",
              color: "#3498DB",
              items: [
                "Azeite extra virgem",
                "Abacates (×4)",
                "Amêndoas (200g)",
                "Manteiga amendoim natural",
                "Chocolate negro 70%+",
                "Óleo de coco",
                "Farinha de linhaça",
                "Frutos secos (200g)",
              ],
            },
            {
              cat: "Vegetais",
              color: SUCCESS,
              items: [
                "Brócolos (2 cabeças)",
                "Espinafres baby (emb.)",
                "Pimentos (×6)",
                "Espargos (molho)",
                "Cogumelos (500g)",
                "Alho (cabeça)",
                "Tomate cherry (emb.)",
                "Curgete (×3)",
                "Feijão verde (emb.)",
              ],
            },
          ].map(({ cat, color, items }) => (
            <div key={cat}>
              <div
                style={{
                  borderTop: `3px solid ${color}`,
                  paddingTop: 10,
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    fontFamily: "'League Spartan', sans-serif",
                    fontSize: 11,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color,
                  }}
                >
                  {cat}
                </div>
              </div>
              {items.map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "5px 0",
                    borderBottom: `1px solid ${GRAY_BORDER}`,
                  }}
                >
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      border: `1.5px solid #CCC`,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 10.5,
                      color: BLACK,
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Footer pageNumber={31} chapter="Lista de Compras" />
    </Page>
  )
}

// ─── Página 32: Registo de Hábitos ────────────────────────────────────────────

export function P32_HabitTracker() {
  const habitos = [
    "Atingir objetivo de proteína (≥ 1,8g/kg)",
    "Atingir objetivo calórico (±100 kcal)",
    "Beber 2,5L+ de água",
    "Tomar creatina",
    "Treinar ou recuperação ativa",
    "Dormir 7+ horas na noite anterior",
    "Sem álcool",
  ]

  return (
    <Page>
      <div style={{ padding: "60px 56px 72px" }}>
        <Label>Apêndice A4</Label>
        <PageTitle size={36}>Registo de Hábitos Diários</PageTitle>
        <div style={{ marginTop: 14, marginBottom: 14 }}>
          <GoldRule width={44} />
        </div>
        <Body style={{ marginBottom: 22, maxWidth: 580 }}>
          Regista estes 7 hábitos inegociáveis diariamente durante 30 dias. A
          investigação mostra que empilhar hábitos — construir múltiplos hábitos
          em simultâneo — cria resultados compostos. Aponta para 90%+ de
          aderência cada semana.
        </Body>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span
              style={{
                fontFamily: "'League Spartan', sans-serif",
                fontSize: 10,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
              }}
            >
              Mês:
            </span>
            <div
              style={{
                width: 120,
                height: 22,
                border: `1.5px solid ${GRAY_BORDER}`,
              }}
            />
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            {[
              { color: GOLD, label: "✓ Feito" },
              { color: DANGER, label: "✗ Falhado" },
              { color: GRAY_BORDER, label: "○ Dia livre" },
            ].map(({ color, label }) => (
              <div
                key={label}
                style={{ display: "flex", alignItems: "center", gap: 4 }}
              >
                <div style={{ width: 10, height: 10, background: color }} />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 9,
                    color: GRAY_MID,
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `180px repeat(31, 1fr)`,
              gap: 1,
              marginBottom: 2,
            }}
          >
            <div style={{ background: BLACK, padding: "6px 8px" }}>
              <span
                style={{
                  fontFamily: "'League Spartan', sans-serif",
                  fontSize: 8,
                  color: GOLD,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Hábito
              </span>
            </div>
            {Array.from({ length: 31 }, (_, i) => (
              <div
                key={i}
                style={{
                  background: BLACK,
                  padding: "6px 2px",
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "'League Spartan', sans-serif",
                    fontSize: 8,
                    color: "rgba(255,255,255,0.5)",
                    fontWeight: 700,
                  }}
                >
                  {i + 1}
                </span>
              </div>
            ))}
          </div>

          {habitos.map((habito, hi) => (
            <div
              key={habito}
              style={{
                display: "grid",
                gridTemplateColumns: `180px repeat(31, 1fr)`,
                gap: 1,
                marginBottom: 1,
              }}
            >
              <div
                style={{
                  background: hi % 2 === 0 ? GRAY : WHITE,
                  padding: "8px 8px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 10,
                    color: BLACK,
                    lineHeight: 1.3,
                  }}
                >
                  {habito}
                </span>
              </div>
              {Array.from({ length: 31 }, (_, di) => (
                <div
                  key={di}
                  style={{
                    background: hi % 2 === 0 ? GRAY : WHITE,
                    border: `1px solid ${GRAY_BORDER}`,
                    height: 30,
                  }}
                />
              ))}
            </div>
          ))}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: `180px repeat(31, 1fr)`,
              gap: 1,
              marginTop: 4,
            }}
          >
            <div style={{ background: BLACK, padding: "7px 8px" }}>
              <span
                style={{
                  fontFamily: "'League Spartan', sans-serif",
                  fontSize: 8,
                  color: GOLD,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Pontuação Diária
              </span>
            </div>
            {Array.from({ length: 31 }, (_, i) => (
              <div
                key={i}
                style={{
                  background: BLACK,
                  border: `1px solid rgba(255,255,255,0.06)`,
                  height: 30,
                }}
              />
            ))}
          </div>
        </div>

        <div
          style={{
            marginTop: 16,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 10,
          }}
        >
          {["Semana 1 %", "Semana 2 %", "Semana 3 %", "Semana 4 %"].map((w) => (
            <div key={w} style={{ background: GRAY, padding: "10px 12px" }}>
              <div
                style={{
                  fontFamily: "'League Spartan', sans-serif",
                  fontSize: 9,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: GRAY_MID,
                  marginBottom: 8,
                }}
              >
                Aderência {w}
              </div>
              <div
                style={{
                  height: 24,
                  background: WHITE,
                  border: `1px solid ${GRAY_BORDER}`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <Footer pageNumber={32} chapter="Registo de Hábitos Diários" />
    </Page>
  )
}

// ─── Página 33: Planeador Semanal ─────────────────────────────────────────────

export function P33_WeeklyPlanner() {
  const dias = [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
    "Domingo",
  ]
  const horas = [
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
  ]

  return (
    <Page>
      <div style={{ padding: "52px 56px 64px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 14,
          }}
        >
          <div>
            <Label>Apêndice A5</Label>
            <PageTitle size={28}>Planeador Semanal</PageTitle>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <span
              style={{
                fontFamily: "'League Spartan', sans-serif",
                fontSize: 10,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Semana de:
            </span>
            <div
              style={{
                width: 130,
                height: 22,
                border: `1.5px solid ${GRAY_BORDER}`,
              }}
            />
          </div>
        </div>
        <GoldRule width={44} />

        <div style={{ marginTop: 16 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "52px repeat(7, 1fr)",
              gap: 1,
              marginBottom: 2,
            }}
          >
            <div style={{ background: WHITE }} />
            {dias.map((dia) => (
              <div
                key={dia}
                style={{
                  background: BLACK,
                  padding: "8px 4px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "'League Spartan', sans-serif",
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: WHITE,
                  }}
                >
                  {dia.slice(0, 3)}
                </div>
                <div
                  style={{
                    height: 16,
                    background: "rgba(255,255,255,0.05)",
                    marginTop: 4,
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                />
              </div>
            ))}
          </div>

          {horas.map((hora, ti) => (
            <div
              key={hora}
              style={{
                display: "grid",
                gridTemplateColumns: "52px repeat(7, 1fr)",
                gap: 1,
                marginBottom: 1,
              }}
            >
              <div
                style={{
                  background: ti % 2 === 0 ? GRAY : WHITE,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  paddingRight: 6,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 8,
                    color: GRAY_MID,
                  }}
                >
                  {hora}
                </span>
              </div>
              {dias.map((dia) => (
                <div
                  key={`${dia}-${hora}`}
                  style={{
                    background: ti % 2 === 0 ? GRAY : WHITE,
                    border: `1px solid ${GRAY_BORDER}`,
                    height: 22,
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 12,
            display: "flex",
            gap: 20,
            alignItems: "center",
          }}
        >
          {[
            { color: "rgba(212,175,55,0.35)", label: "Treino" },
            { color: "rgba(231,76,60,0.25)", label: "Preparação Refeições" },
            { color: "rgba(52,152,219,0.25)", label: "Recuperação" },
            { color: "rgba(39,174,96,0.25)", label: "Descanso/Sono" },
          ].map(({ color, label }) => (
            <div
              key={label}
              style={{ display: "flex", alignItems: "center", gap: 5 }}
            >
              <div
                style={{
                  width: 18,
                  height: 12,
                  background: color,
                  border: `1px solid ${GRAY_BORDER}`,
                }}
              />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 9,
                  color: GRAY_MID,
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
      <Footer pageNumber={33} chapter="Planeador Semanal" />
    </Page>
  )
}

// ─── Página 34: Antes e Depois ─────────────────────────────────────────────────

export function P34_BeforeAfter() {
  return (
    <Page>
      <div style={{ padding: "60px 56px 72px" }}>
        <Label>Apêndice A6</Label>
        <PageTitle size={36}>Modelo Antes e Depois</PageTitle>
        <div style={{ marginTop: 14, marginBottom: 20 }}>
          <GoldRule width={44} />
        </div>
        <Body style={{ marginBottom: 24, maxWidth: 580 }}>
          Documenta a tua transformação fotograficamente. Usa esta página para
          comparar o teu ponto de partida com os resultados das 12 semanas. A
          evidência visual é o motivador mais poderoso para o próximo ciclo de
          treino.
        </Body>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
            marginBottom: 24,
          }}
        >
          {["ANTES — Semana 1", "DEPOIS — Semana 12"].map((label, idx) => (
            <div key={label}>
              <div
                style={{
                  fontFamily: "'League Spartan', sans-serif",
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: idx === 0 ? GRAY_MID : GOLD,
                  marginBottom: 10,
                }}
              >
                {label}
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 6,
                  marginBottom: 14,
                }}
              >
                {["Frente", "Lado", "Costas"].map((vista) => (
                  <div key={vista}>
                    <div
                      style={{
                        height: 220,
                        background: GRAY,
                        border: `1.5px dashed ${GRAY_BORDER}`,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6,
                      }}
                    >
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          background: GRAY_BORDER,
                          flexShrink: 0,
                        }}
                      />
                      <div
                        style={{
                          width: 20,
                          height: 40,
                          background: GRAY_BORDER,
                          borderRadius: "50% 50% 0 0 / 20% 20% 0 0",
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 9,
                          color: GRAY_MID,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                        }}
                      >
                        {vista}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ background: GRAY, padding: 12 }}>
                {[
                  ["Data", "_____________"],
                  ["Peso", "________ kg"],
                  ["% Gordura", "________%"],
                  ["Peito", "________ cm"],
                  ["Cintura", "________ cm"],
                  ["Braços", "________ cm"],
                ].map(([label2, blank]) => (
                  <div
                    key={label2}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "5px 0",
                      borderBottom: `1px solid ${GRAY_BORDER}`,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 10,
                        color: GRAY_MID,
                      }}
                    >
                      {label2}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 10,
                        color: GRAY_BORDER,
                      }}
                    >
                      {blank}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Callout bg={BLACK}>
          <div
            style={{
              fontFamily: "'League Spartan', sans-serif",
              fontSize: 10,
              color: GOLD,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            Protocolo Fotográfico
          </div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.6,
            }}
          >
            Fotografa sempre à mesma hora (manhã, em jejum é o ideal). Usa o
            mesmo fundo, mesma iluminação, mesma distância da câmara. A luz
            natural lateral de uma janela revela a definição muscular melhor do
            que a luz de teto.
          </div>
        </Callout>
      </div>
      <Footer pageNumber={34} chapter="Antes e Depois" />
    </Page>
  )
}

// ─── Página 35: Plano de Ação Final ───────────────────────────────────────────

export function P35_ActionPlan() {
  return (
    <Page>
      <div style={{ padding: "60px 56px 72px" }}>
        <Label>O Teu Próximo Passo</Label>
        <PageTitle size={40}>
          O Teu Plano
          <br />
          de <span style={{ color: GOLD }}>Ação Final</span>
        </PageTitle>
        <div style={{ marginTop: 16, marginBottom: 24 }}>
          <GoldRule width={56} />
        </div>
        <Body style={{ marginBottom: 32, maxWidth: 600 }}>
          Tens agora tudo o que precisas. A informação, as ferramentas, os
          modelos, os planos alimentares, os treinos. A única variável restante
          é a tua decisão de agir. Aqui estão os teus cinco próximos passos
          imediatos.
        </Body>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            marginBottom: 32,
          }}
        >
          {[
            {
              n: 1,
              action: "Calcula o Teu TDEE Hoje",
              detail:
                "Usa a fórmula de Mifflin-St Jeor na página 7. Adiciona 350 kcal para o teu objetivo de lean bulk. Este número é a tua fundação — tudo se constrói a partir daqui.",
            },
            {
              n: 2,
              action: "Abastece a Cozinha Este Fim de Semana",
              detail:
                "Usa a lista de compras da página 31. Uma cozinha abastecida com alimentos de qualidade remove todos os obstáculos entre ti e uma nutrição ótima. Sem dispensa vazia — sem desculpas.",
            },
            {
              n: 3,
              action: "Começa o Programa de 4 Dias na Segunda",
              detail:
                "Abre a página 21. Começa com o Dia A. Regista cada repetição, cada série, cada peso. O teu diário de treino é sagrado. Trata-o como tal.",
            },
            {
              n: 4,
              action: 'Tira as Fotos do "Antes" Esta Noite',
              detail:
                "A sério — esta noite. Não depois de perderes alguns quilos. Não depois de te sentires mais confortável. Agora mesmo. O teu ponto de partida é onde a tua história começa.",
            },
            {
              n: 5,
              action: "Compromete-te com 12 Semanas Sem Mudar de Programa",
              detail:
                "Escolhe este programa. Fica com ele. Os resultados exigem tempo. Os atletas que veem transformações dramáticas em 12 semanas são os que se recusaram a desistir nas semanas 3, 4 e 5 quando o progresso parecia lento. Mantém o rumo.",
            },
          ].map(({ n, action, detail }) => (
            <div
              key={n}
              style={{
                display: "flex",
                gap: 0,
                alignItems: "stretch",
                border: `1px solid ${GRAY_BORDER}`,
              }}
            >
              <div
                style={{
                  width: 56,
                  background: n <= 3 ? GOLD : GRAY_DARK,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 28,
                    color: n <= 3 ? BLACK : GOLD,
                    lineHeight: 1,
                  }}
                >
                  {n}
                </div>
              </div>
              <div style={{ padding: "14px 18px", flex: 1 }}>
                <div
                  style={{
                    fontFamily: "'League Spartan', sans-serif",
                    fontSize: 14,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    color: BLACK,
                    marginBottom: 5,
                  }}
                >
                  {action}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11.5,
                    lineHeight: 1.62,
                    color: "#555",
                  }}
                >
                  {detail}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            background: BLACK,
            padding: "20px 24px",
            display: "flex",
            gap: 20,
            alignItems: "center",
          }}
        >
          <div
            style={{ width: 3, height: 60, background: GOLD, flexShrink: 0 }}
          />
          <div>
            <div
              style={{
                fontFamily: "'League Spartan', sans-serif",
                fontSize: 18,
                fontWeight: 800,
                color: WHITE,
                marginBottom: 6,
              }}
            >
              O ginásio estará lá amanhã. Os pesos estarão lá. A questão é —
              estarás tu?
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 10.5,
                color: "rgba(255,255,255,0.45)",
              }}
            >
              — Ruben Freitas, MASSA+
            </div>
          </div>
        </div>
      </div>
      <Footer pageNumber={35} chapter="O Teu Plano de Ação Final" />
    </Page>
  )
}

// ─── Página 36: Obrigado ───────────────────────────────────────────────────────

export function P36_ThankYou() {
  return (
    <Page dark>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle at 30% 50%, rgba(212,175,55,0.06) 0%, transparent 60%), radial-gradient(circle at 70% 30%, rgba(212,175,55,0.04) 0%, transparent 50%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 100px",
          textAlign: "center",
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 14,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: GOLD,
            marginBottom: 32,
          }}
        >
          Obrigado
        </div>
        <GoldRule width={52} />
        <div
          style={{
            fontFamily: "'League Spartan', sans-serif",
            fontSize: 44,
            fontWeight: 800,
            lineHeight: 1.0,
            color: WHITE,
            margin: "36px 0",
          }}
        >
          Agora
          <br />
          <span style={{ color: GOLD }}>Vai Construir</span>
          <br />
          Algo
          <br />
          Real.
        </div>
        <GoldRule width={52} />
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            lineHeight: 1.82,
            color: "rgba(255,255,255,0.5)",
            maxWidth: 440,
            margin: "36px auto",
          }}
        >
          Obrigado por confiares no MASSA+ para a tua transformação. Este guia
          representa anos de experiência prática destilados no caminho mais
          eficiente para construir um físico de elite. A ciência está aqui. As
          ferramentas estão aqui. O que falta é o teu trabalho.
        </p>
        <p
          style={{
            fontFamily: "'League Spartan', sans-serif",
            fontSize: 13,
            fontWeight: 600,
            color: "rgba(255,255,255,0.65)",
            maxWidth: 400,
            lineHeight: 1.6,
            marginBottom: 40,
          }}
        >
          "A consistência não é talento. É uma escolha que fazes todos os dias.
          Faz essa escolha."
        </p>
        <div style={{ marginBottom: 8 }}>
          <div
            style={{
              fontFamily: "'League Spartan', sans-serif",
              fontSize: 10,
              color: GOLD,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            Ruben Freitas
          </div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 9.5,
              color: "rgba(255,255,255,0.35)",
            }}
          >
            CSCS · CISSN · Fundador, MASSA+
          </div>
        </div>
        <div style={{ marginTop: 40, display: "flex", gap: 28 }}>
          {[
            { label: "Website", value: "massaplus.com" },
            { label: "Instagram", value: "@massaplus" },
            { label: "Email", value: "coach@massaplus.com" },
          ].map(({ label, value }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 8,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.25)",
                  marginBottom: 4,
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontFamily: "'League Spartan', sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer pageNumber={36} dark />
    </Page>
  )
}

// ─── Página 37: Código QR / Coaching ──────────────────────────────────────────

export function P37_QRCode() {
  return (
    <Page>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          background: GOLD,
        }}
      />
      <div style={{ padding: "64px 56px 72px" }}>
        <Label>Oferta Exclusiva</Label>
        <PageTitle size={36}>
          Pronto para
          <br />
          <span style={{ color: GOLD }}>Coaching Individual?</span>
        </PageTitle>
        <div style={{ marginTop: 14, marginBottom: 28 }}>
          <GoldRule width={44} />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0 56px",
            alignItems: "start",
          }}
        >
          <div>
            <Body style={{ marginBottom: 20 }}>
              Se queres um programa desenhado especificamente para o teu corpo,
              os teus horários, o teu equipamento e os teus objetivos —
              trabalhar diretamente com o Ruben dá-te uma vantagem real sobre os
              99% que treinam sozinhos.
            </Body>
            <Body style={{ marginBottom: 24 }}>
              Os clientes de coaching do MASSA+ recebem: objetivos nutricionais
              personalizados, programas de treino à medida atualizados
              semanalmente, check-ins semanais por vídeo, acesso direto por
              mensagem e uma comunidade de atletas sérios com os mesmos
              objetivos.
            </Body>

            <Label size={8} color={GRAY_MID}>
              O Que Está Incluído
            </Label>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                "Objetivos personalizados de macros e calorias",
                "Programa de treino de 12 semanas à medida",
                "Ajustes semanais com base no teu feedback",
                "Revisão de técnica em vídeo para todos os exercícios",
                "Mensagens com resposta prioritária em 24h",
                "Acesso à comunidade privada de coaching MASSA+",
                "Protocolo de suplementação adaptado ao teu orçamento",
                "Análise mensal de composição corporal",
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                    padding: "7px 0",
                    borderBottom: `1px solid ${GRAY_BORDER}`,
                  }}
                >
                  <div
                    style={{
                      width: 16,
                      height: 16,
                      background: GOLD,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'League Spartan', sans-serif",
                        fontSize: 9,
                        fontWeight: 800,
                        color: BLACK,
                      }}
                    >
                      ✓
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 11,
                      color: BLACK,
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 24,
            }}
          >
            <div
              style={{
                width: 220,
                height: 220,
                background: BLACK,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  gap: 2,
                  padding: 20,
                }}
              >
                {Array.from({ length: 49 }, (_, i) => {
                  const corners = [
                    0, 1, 2, 3, 4, 5, 6, 7, 13, 14, 20, 21, 27, 28, 34, 35, 41,
                    42, 43, 44, 45, 46, 47, 48,
                  ]
                  const inner = [8, 9, 10, 15, 16, 17, 22, 23, 24]
                  const isGold =
                    corners.includes(i) ||
                    inner.includes(i) ||
                    Math.random() > 0.55
                  return (
                    <div
                      key={i}
                      style={{
                        width: 8,
                        height: 8,
                        background: isGold ? GOLD : "rgba(255,255,255,0.08)",
                      }}
                    />
                  )
                })}
              </div>
            </div>

            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "'League Spartan', sans-serif",
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: BLACK,
                  marginBottom: 4,
                }}
              >
                Lê o Código para Candidatares-te
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  color: GRAY_MID,
                }}
              >
                massaplus.com/coaching
              </div>
            </div>

            <div
              style={{
                width: "100%",
                background: BLACK,
                padding: "16px 20px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 9,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                  marginBottom: 6,
                }}
              >
                Vagas Limitadas
              </div>
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 32,
                  color: GOLD,
                  lineHeight: 1,
                }}
              >
                Apenas 12 Clientes / Mês
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 10,
                  color: "rgba(255,255,255,0.5)",
                  marginTop: 8,
                  lineHeight: 1.5,
                }}
              >
                Candidaturas analisadas em 48 horas.
                <br />
                Usa o código <strong style={{ color: GOLD }}>MASSABOOK</strong>{" "}
                para 20% de desconto no primeiro mês.
              </div>
            </div>

            <div style={{ display: "flex", gap: 14, width: "100%" }}>
              {["Instagram", "Email", "YouTube"].map((platform) => (
                <div
                  key={platform}
                  style={{
                    flex: 1,
                    background: GRAY,
                    padding: "10px 8px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'League Spartan', sans-serif",
                      fontSize: 9,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: GRAY_MID,
                    }}
                  >
                    {platform}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 9,
                      color: GOLD,
                      marginTop: 3,
                    }}
                  >
                    @massaplus
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer pageNumber={37} chapter="Coaching e Recursos" />
    </Page>
  )
}
