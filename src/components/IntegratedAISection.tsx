'use client';

import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface PlatformCard {
  name: string;
  parent: string;
  icon: React.ReactNode;
  capabilities: string[];
  price: string;
  standout: string;
  standoutLabel: string;
}

interface AIFormulaExample {
  formula: string;
  input: string;
  output: string;
}

const aiFormulaExamples: AIFormulaExample[] = [
  {
    formula: '=AI("Categorizza: Elettronica, Abbigliamento, Casa", A2)',
    input: 'Cuffie Bluetooth Sony WH-1000XM5',
    output: 'Elettronica',
  },
  {
    formula: '=AI("Riassumi in una riga", A2)',
    input: 'Il cliente ha richiesto la sostituzione del prodotto...',
    output: 'Richiesta sostituzione prodotto per difetto',
  },
  {
    formula: '=AI("Sentiment: positivo, neutro, negativo", A2)',
    input: 'Ottimo prodotto, consegna velocissima!',
    output: 'positivo',
  },
  {
    formula: '=AI("Traduci in inglese", A2)',
    input: 'Fattura da pagare entro 30 giorni',
    output: 'Invoice due within 30 days',
  },
];

interface ApproachData {
  title: string;
  subtitle: string;
  steps: string[];
  pros: string[];
  cons: string[];
  icon: React.ReactNode;
}

/* ------------------------------------------------------------------ */
/*  Icons (SVG, no emoji)                                              */
/* ------------------------------------------------------------------ */

function SparkleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
    </svg>
  );
}

function TableCellsIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="3" y1="15" x2="21" y2="15" />
      <line x1="9" y1="3" x2="9" y2="21" />
      <line x1="15" y1="3" x2="15" y2="21" />
    </svg>
  );
}

function BotIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <line x1="8" y1="16" x2="8" y2="16" />
      <line x1="16" y1="16" x2="16" y2="16" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

function PlugIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22v-5" />
      <path d="M9 8V2" />
      <path d="M15 8V2" />
      <path d="M18 8v5a6 6 0 01-12 0V8z" />
    </svg>
  );
}

function FunctionIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 17H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
      <path d="M15 3h4a2 2 0 012 2v10a2 2 0 01-2 2h-4" />
      <line x1="8" y1="12" x2="16" y2="12" />
      <line x1="12" y1="16" x2="12" y2="8" />
    </svg>
  );
}

function PaletteIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r="2" />
      <circle cx="17.5" cy="10.5" r="2" />
      <circle cx="8.5" cy="7.5" r="2" />
      <circle cx="6.5" cy="12.5" r="2" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}

function PanelRightIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="15" y1="3" x2="15" y2="21" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
    </svg>
  );
}

function LightbulbIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z" />
    </svg>
  );
}

function ClipboardCheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M9 14l2 2 4-4" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}

function UploadCloudIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 16 12 12 8 16" />
      <line x1="12" y1="12" x2="12" y2="21" />
      <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" />
      <polyline points="16 16 12 12 8 16" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Platform Data                                                      */
/* ------------------------------------------------------------------ */

const platforms: PlatformCard[] = [
  {
    name: 'Gemini',
    parent: 'Google Sheets',
    icon: <SparkleIcon />,
    capabilities: [
      'Pannello laterale: genera formule, analizza, crea grafici dentro il foglio',
      'Funzione =AI() nelle celle: categorizza, riassume, genera testo come formula',
      'Task multi-step: un prompt fa piu azioni in sequenza',
    ],
    price: 'Gratis studenti (1 anno), poi ~\u20AC20/mese',
    standout: '=AI() function',
    standoutLabel: 'Funzione nelle celle',
  },
  {
    name: 'Copilot',
    parent: 'Microsoft Excel',
    icon: <BotIcon />,
    capabilities: [
      'Agent Mode (gen 2026): non suggerisce, AGISCE direttamente sul foglio',
      'Crea workbook completi, PivotTable, grafici, modelli finanziari',
      'Scelta multi-modello: GPT o Claude',
    ],
    price: 'Suggerimenti formula gratis in M365 base, Agent +\u20AC20/mese',
    standout: 'Agent Mode',
    standoutLabel: 'Agisce autonomamente',
  },
  {
    name: 'Claude',
    parent: 'Excel (Add-in)',
    icon: <PlugIcon />,
    capabilities: [
      'Add-in diretto da Microsoft Marketplace (gen 2026)',
      'Editing multi-foglio, scenari, modelli finanziari',
      'Changelog delle modifiche: tiene traccia di ogni azione',
    ],
    price: 'Claude Pro \u20AC20/mese',
    standout: 'Multi-sheet editing',
    standoutLabel: 'Editing multi-foglio',
  },
];

const approaches: ApproachData[] = [
  {
    title: 'AI esterna (chatbot)',
    subtitle: 'Upload dati, domande, copia risultati',
    steps: [
      'Caricate il file nel chatbot',
      'Fate le vostre domande',
      'Copiate i risultati nel foglio',
    ],
    pros: [
      'Funziona con qualsiasi foglio di calcolo',
      'Piu flessibile, modello a scelta',
      'Gratis con tier base dei chatbot',
    ],
    cons: [
      'Copia-incolla avanti e indietro',
      'L\'AI non vede il foglio in tempo reale',
    ],
    icon: <UploadCloudIcon />,
  },
  {
    title: 'AI integrata (nel foglio)',
    subtitle: 'Apri pannello AI, chiedi, modifica diretta',
    steps: [
      'Aprite il pannello AI nel foglio',
      'Descrivete cosa volete',
      'L\'AI modifica direttamente il foglio',
    ],
    pros: [
      'Piu veloce, nessun copia-incolla',
      'L\'AI vede tutto il contesto del foglio',
      'Azioni multi-step automatiche',
    ],
    cons: [
      'Richiede abbonamento a pagamento',
      'Funzionalita ancora in evoluzione',
    ],
    icon: <PanelRightIcon />,
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function IntegratedAISection() {
  return (
    <div className="space-y-16">

      {/* ============================================================ */}
      {/*  Section 1: Three platform cards                              */}
      {/* ============================================================ */}
      <AnimatedSection>
        <h3
          className="heading-subsection mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          AI integrata nei fogli di calcolo
        </h3>
        <p
          className="text-sm mb-8 max-w-3xl"
          style={{ color: 'var(--text-secondary)' }}
        >
          Le tre principali piattaforme hanno integrato l&apos;AI direttamente dentro il foglio di calcolo.
          Non serve piu uscire dal file per chiedere aiuto.
        </p>

        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {platforms.map((platform) => (
            <StaggerItem key={platform.name}>
              <div className="glass-card p-6 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{
                      background: 'rgba(249, 115, 22, 0.08)',
                      color: 'var(--accent-primary)',
                      border: '1px solid rgba(249, 115, 22, 0.15)',
                    }}
                  >
                    {platform.icon}
                  </span>
                  <div>
                    <h4
                      className="font-semibold text-base"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {platform.name}
                    </h4>
                    <p
                      className="text-xs"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {platform.parent}
                    </p>
                  </div>
                </div>

                {/* Capabilities */}
                <ul className="space-y-2.5 mb-5 flex-1">
                  {platform.capabilities.map((cap, idx) => (
                    <li key={idx} className="flex gap-2 items-start">
                      <span
                        className="shrink-0 mt-1"
                        style={{ color: 'var(--accent-primary)' }}
                      >
                        <CheckIcon />
                      </span>
                      <span
                        className="text-sm leading-relaxed"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {cap}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Standout feature */}
                <div
                  className="rounded-lg p-3 mb-4"
                  style={{
                    background: 'rgba(249, 115, 22, 0.06)',
                    border: '1px solid rgba(249, 115, 22, 0.15)',
                  }}
                >
                  <p
                    className="text-xs font-semibold uppercase tracking-wider mb-1"
                    style={{ color: 'var(--accent-primary)' }}
                  >
                    Punto di forza
                  </p>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {platform.standout}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {platform.standoutLabel}
                  </p>
                </div>

                {/* Price badge */}
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium self-start"
                  style={{
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                  </svg>
                  {platform.price}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </AnimatedSection>

      {/* ============================================================ */}
      {/*  Section 2: =AI() function showcase                           */}
      {/* ============================================================ */}
      <AnimatedSection delay={0.1}>
        <div className="glass-card p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-2">
            <span
              className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
              style={{
                background: 'rgba(249, 115, 22, 0.08)',
                color: 'var(--accent-primary)',
                border: '1px solid rgba(249, 115, 22, 0.15)',
              }}
            >
              <FunctionIcon />
            </span>
            <div>
              <h3
                className="font-semibold text-lg"
                style={{ color: 'var(--text-primary)' }}
              >
                La funzione =AI() in Google Sheets
              </h3>
              <p
                className="text-sm"
                style={{ color: 'var(--text-muted)' }}
              >
                AI come formula: scrivi una volta, applica a migliaia di righe
              </p>
            </div>
          </div>

          <p
            className="text-sm leading-relaxed mb-6 max-w-3xl"
            style={{ color: 'var(--text-secondary)' }}
          >
            La funzione =AI() trasforma l&apos;intelligenza artificiale in una formula di Google Sheets.
            Invece di copiare e incollare nel chatbot, scrivete la richiesta direttamente nella cella
            e trascinatela verso il basso per elaborare centinaia di righe automaticamente.
          </p>

          {/* Mini table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-subtle)' }}>
                  <th
                    className="text-left py-3 px-4 font-semibold"
                    style={{ color: 'var(--accent-primary)', minWidth: '320px' }}
                  >
                    Formula
                  </th>
                  <th
                    className="text-left py-3 px-4 font-semibold"
                    style={{ color: 'var(--text-muted)', minWidth: '200px' }}
                  >
                    Input (A2)
                  </th>
                  <th
                    className="text-center py-3 px-4 font-semibold"
                    style={{ color: 'var(--text-muted)', width: '40px' }}
                  >
                    &nbsp;
                  </th>
                  <th
                    className="text-left py-3 px-4 font-semibold"
                    style={{ color: 'var(--color-success)', minWidth: '200px' }}
                  >
                    Output
                  </th>
                </tr>
              </thead>
              <tbody>
                {aiFormulaExamples.map((example, idx) => (
                  <tr
                    key={idx}
                    style={{ borderBottom: idx < aiFormulaExamples.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}
                  >
                    <td className="py-3 px-4">
                      <code
                        className="font-mono text-xs leading-relaxed"
                        style={{
                          color: 'var(--accent-primary)',
                          wordBreak: 'break-all',
                        }}
                      >
                        {example.formula}
                      </code>
                    </td>
                    <td
                      className="py-3 px-4 text-sm"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {example.input}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span style={{ color: 'var(--text-muted)' }}>
                        <ArrowRightIcon />
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className="inline-block px-2.5 py-1 rounded-lg text-sm font-medium"
                        style={{
                          background: 'rgba(34, 197, 94, 0.08)',
                          color: 'var(--color-success)',
                          border: '1px solid rgba(34, 197, 94, 0.15)',
                        }}
                      >
                        {example.output}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AnimatedSection>

      {/* ============================================================ */}
      {/*  Section 3: Canva Sheets + Bulk Create                        */}
      {/* ============================================================ */}
      <AnimatedSection delay={0.15}>
        <div className="glass-card p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-6">
            <span
              className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
              style={{
                background: 'rgba(249, 115, 22, 0.08)',
                color: 'var(--accent-primary)',
                border: '1px solid rgba(249, 115, 22, 0.15)',
              }}
            >
              <PaletteIcon />
            </span>
            <div>
              <h3
                className="font-semibold text-lg"
                style={{ color: 'var(--text-primary)' }}
              >
                Canva Sheets + Bulk Create
              </h3>
              <p
                className="text-sm"
                style={{ color: 'var(--text-muted)' }}
              >
                Non un sostituto di Excel, ma un ponte tra dati e design
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Canva Sheets features */}
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-wider mb-4"
                style={{ color: 'var(--text-muted)' }}
              >
                Funzionalita AI nel foglio
              </p>
              <StaggerContainer className="space-y-3">
                {[
                  { label: 'Magic Insights', desc: 'Analisi automatica dei dati con suggerimenti in linguaggio naturale' },
                  { label: 'Magic Formulas', desc: 'Descrivete cosa volete e l\'AI genera la formula' },
                  { label: 'Magic Charts', desc: 'Grafici generati automaticamente dai dati selezionati' },
                ].map((item) => (
                  <StaggerItem key={item.label}>
                    <div
                      className="p-3 rounded-xl"
                      style={{
                        background: 'var(--bg-elevated)',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      <p
                        className="font-semibold text-sm mb-0.5"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {item.label}
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

            {/* Right: Bulk Create killer feature */}
            <div
              className="p-5 rounded-2xl relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.08) 0%, rgba(234, 88, 12, 0.04) 100%)',
                border: '1px solid rgba(249, 115, 22, 0.2)',
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span style={{ color: 'var(--accent-primary)' }}>
                  <GridIcon />
                </span>
                <p
                  className="font-bold text-base"
                  style={{ color: 'var(--accent-primary)' }}
                >
                  Bulk Create
                </p>
                <span
                  className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                  style={{
                    background: 'var(--accent-primary)',
                    color: '#fff',
                  }}
                >
                  Killer feature
                </span>
              </div>

              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: 'var(--text-secondary)' }}
              >
                Collegate un foglio dati a un template Canva. Bulk Create genera automaticamente
                un elemento per ogni riga: certificati, post social, email personalizzate, badge.
              </p>

              {/* Flow visualization */}
              <div className="flex flex-wrap items-center gap-2">
                {['Dati (foglio)', 'Template (design)', 'Genera tutto'].map((step, idx) => (
                  <div key={step} className="flex items-center gap-2">
                    <span
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap"
                      style={{
                        background: idx === 2 ? 'var(--accent-primary)' : 'var(--bg-elevated)',
                        color: idx === 2 ? '#fff' : 'var(--text-primary)',
                        border: idx === 2 ? 'none' : '1px solid var(--border-subtle)',
                      }}
                    >
                      {step}
                    </span>
                    {idx < 2 && (
                      <span style={{ color: 'var(--accent-primary)' }}>
                        <ArrowRightIcon />
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div
                className="mt-4 p-3 rounded-lg"
                style={{
                  background: 'rgba(249, 115, 22, 0.06)',
                  border: '1px solid rgba(249, 115, 22, 0.12)',
                }}
              >
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <strong style={{ color: 'var(--text-primary)' }}>Esempio:</strong>{' '}
                  100 partecipanti al corso, 1 template certificato, 1 click = 100 certificati personalizzati con nome, data e corso.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ============================================================ */}
      {/*  Section 4: Two approaches comparison                         */}
      {/* ============================================================ */}
      <AnimatedSection delay={0.2}>
        <h3
          className="heading-subsection mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          Due approcci a confronto
        </h3>
        <p
          className="text-sm mb-6 max-w-3xl"
          style={{ color: 'var(--text-secondary)' }}
        >
          Potete usare l&apos;AI per i fogli di calcolo in due modi.
          Entrambi funzionano: scegliete in base al vostro budget e alle vostre esigenze.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {approaches.map((approach, approachIdx) => (
            <div key={approach.title} className="glass-card p-6 flex flex-col">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{
                    background: approachIdx === 0 ? 'var(--bg-elevated)' : 'rgba(249, 115, 22, 0.08)',
                    color: approachIdx === 0 ? 'var(--text-secondary)' : 'var(--accent-primary)',
                    border: approachIdx === 0 ? '1px solid var(--border-subtle)' : '1px solid rgba(249, 115, 22, 0.15)',
                  }}
                >
                  {approach.icon}
                </span>
                <div>
                  <h4
                    className="font-semibold text-base"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {approach.title}
                  </h4>
                  <p
                    className="text-xs"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {approach.subtitle}
                  </p>
                </div>
              </div>

              {/* Steps */}
              <div
                className="rounded-xl p-4 mb-4"
                style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-2"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Come funziona
                </p>
                <div className="space-y-1.5">
                  {approach.steps.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span
                        className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                        style={{
                          background: 'var(--accent-primary)',
                          color: '#fff',
                        }}
                      >
                        {idx + 1}
                      </span>
                      <span
                        className="text-sm"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pros */}
              <div className="mb-3 flex-1">
                <p
                  className="text-xs font-semibold mb-2"
                  style={{ color: 'var(--color-success)' }}
                >
                  Pro
                </p>
                <ul className="space-y-1.5">
                  {approach.pros.map((pro) => (
                    <li key={pro} className="flex gap-2 items-start">
                      <span
                        className="shrink-0 mt-0.5"
                        style={{ color: 'var(--color-success)' }}
                      >
                        <CheckIcon />
                      </span>
                      <span
                        className="text-sm"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {pro}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons */}
              <div>
                <p
                  className="text-xs font-semibold mb-2"
                  style={{ color: 'var(--color-error)' }}
                >
                  Contro
                </p>
                <ul className="space-y-1.5">
                  {approach.cons.map((con) => (
                    <li key={con} className="flex gap-2 items-start">
                      <span
                        className="shrink-0 mt-0.5"
                        style={{ color: 'var(--color-error)' }}
                      >
                        <XIcon />
                      </span>
                      <span
                        className="text-sm"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {con}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Quote block: Agent concept */}
        <div className="quote-block mb-8">
          <div className="flex gap-4 items-start">
            <span
              className="shrink-0 mt-1"
              style={{ color: 'var(--accent-primary)', opacity: 0.6 }}
            >
              <QuoteIcon />
            </span>
            <div>
              <p
                className="text-lg md:text-xl font-semibold leading-snug mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                Da &quot;suggerire&quot; ad &quot;agire&quot;: il concetto di AI Agent
              </p>
              <p
                className="text-sm leading-relaxed mb-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                La direzione e chiara: l&apos;AI non si limita piu a rispondere alle domande.
                L&apos;Agent Mode di Copilot e il task multi-step di Gemini rappresentano il passaggio
                da assistente passivo ad agente attivo: l&apos;AI legge i dati, decide le azioni,
                le esegue e vi mostra il risultato.
              </p>
              <p
                className="text-sm leading-relaxed font-medium"
                style={{ color: 'var(--text-primary)' }}
              >
                L&apos;utente diventa{' '}
                <span
                  style={{
                    background: 'var(--gradient-primary)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontWeight: 700,
                  }}
                >
                  supervisore
                </span>
                , non esecutore.
              </p>
            </div>
          </div>
        </div>

        {/* Practical tip - success card */}
        <div className="success-card flex gap-4 items-start">
          <span
            className="shrink-0 mt-0.5"
            style={{ color: 'var(--color-success)' }}
          >
            <LightbulbIcon />
          </span>
          <div>
            <p
              className="font-semibold mb-1"
              style={{ color: 'var(--text-primary)' }}
            >
              Consiglio pratico
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              Se non avete budget extra, il flusso esterno funziona benissimo.
              L&apos;AI integrata e piu comoda ma non indispensabile.
              Iniziate con il chatbot che gia usate, e valutate l&apos;integrazione
              solo quando sentite il bisogno di velocizzare il lavoro ripetitivo.
            </p>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
