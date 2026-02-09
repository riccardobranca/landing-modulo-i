'use client';
import { useState } from 'react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface FormulaTab {
  id: string;
  label: string;
  prompt: string;
  formula: string;
  explanation: string;
}

const formulaTabs: FormulaTab[] = [
  {
    id: 'totale-vendita',
    label: 'Totale vendita',
    prompt: 'Ho colonna B con prezzi, colonna C con quantita. Voglio il totale in D2.',
    formula: '=B2*C2',
    explanation: 'Moltiplica prezzo per quantita. Trascinate verso il basso.',
  },
  {
    id: 'cerca-vert',
    label: 'CERCA.VERT',
    prompt:
      'Ho codice prodotto in A2. Nella tabella Prodotti (A:C), colonna 3 ha i prezzi. Voglio il prezzo in B2.',
    formula: '=CERCA.VERT(A2;Prodotti!A:C;3;FALSO)',
    explanation:
      'Cerca A2 nella tabella Prodotti, restituisce la terza colonna. FALSO = corrispondenza esatta.',
  },
  {
    id: 'commissione',
    label: 'Commissione variabile',
    prompt:
      'Vendite in B2. Se >100.000 commissione 5%, se >50.000 3%, se >20.000 2%, altrimenti 1%.',
    formula: '=SE(B2>100000;B2*0,05;SE(B2>50000;B2*0,03;SE(B2>20000;B2*0,02;B2*0,01)))',
    explanation:
      "SE annidati: controlla dalla condizione piu alta. L'AI gestisce la nidificazione per voi.",
  },
  {
    id: 'conta-condizionali',
    label: 'Conta condizionali',
    prompt: "Conta quante celle in colonna C contengono 'Completato'.",
    formula: '=CONTA.SE(C:C;"Completato")',
    explanation:
      'Conta le celle che corrispondono esattamente. Per condizioni multiple usate CONTA.PIU.SE.',
  },
  {
    id: 'spiega-formula',
    label: 'Spiega formula',
    prompt: 'Spiegami: =SE(E(A2>100;B2="Completato");C2*1.1;SE(A2>50;C2*1.05;C2))',
    formula: '=SE(E(A2>100;B2="Completato");C2*1.1;SE(A2>50;C2*1.05;C2))',
    explanation:
      '1. Se A2>100 E B2=\'Completato\' \u2192 C2 * 1.1 (+10%)\n2. Altrimenti, se A2>50 \u2192 C2 * 1.05 (+5%)\n3. Altrimenti \u2192 C2 invariato',
  },
];

interface ErrorEntry {
  code: string;
  meaning: string;
  cause: string;
}

const excelErrors: ErrorEntry[] = [
  { code: '#N/D', meaning: 'Non trovato', cause: 'CERCA.VERT non trova il valore cercato' },
  {
    code: '#VALORE!',
    meaning: 'Valore errato',
    cause: 'Operazione matematica su testo',
  },
  {
    code: '#RIF!',
    meaning: 'Riferimento invalido',
    cause: 'Cella o foglio eliminato',
  },
  { code: '#DIV/0!', meaning: 'Divisione per zero', cause: 'Il divisore e zero o cella vuota' },
  {
    code: '#NOME?',
    meaning: 'Nome non riconosciuto',
    cause: 'Funzione scritta male o non esistente',
  },
];

interface FormulaEntry {
  formula: string;
  description: string;
  example: string;
}

const topFormulas: FormulaEntry[] = [
  {
    formula: 'SOMMA',
    description: 'Somma un intervallo di numeri',
    example: '=SOMMA(B2:B100)',
  },
  {
    formula: 'MEDIA',
    description: 'Calcola la media aritmetica',
    example: '=MEDIA(C2:C50)',
  },
  {
    formula: 'CONTA.VALORI',
    description: 'Conta celle non vuote',
    example: '=CONTA.VALORI(A:A)',
  },
  {
    formula: 'CONTA.SE',
    description: 'Conta celle con una condizione',
    example: '=CONTA.SE(D:D;"Completato")',
  },
  {
    formula: 'SOMMA.SE',
    description: 'Somma con una condizione',
    example: '=SOMMA.SE(A:A;"Nord";B:B)',
  },
  {
    formula: 'SE',
    description: 'Condizione logica (se/allora/altrimenti)',
    example: '=SE(A2>100;"Alto";"Basso")',
  },
  {
    formula: 'CERCA.VERT',
    description: 'Cerca un valore in una tabella',
    example: '=CERCA.VERT(A2;Tab!A:C;3;FALSO)',
  },
  {
    formula: 'CONCATENA / &',
    description: 'Unisce testi da piu celle',
    example: '=A2&" "&B2',
  },
  {
    formula: 'SINISTRA / DESTRA',
    description: 'Estrae caratteri da un testo',
    example: '=SINISTRA(A2;3)',
  },
  {
    formula: 'UNICO',
    description: 'Restituisce valori univoci (365)',
    example: '=UNICO(A2:A100)',
  },
];

/* ------------------------------------------------------------------ */
/*  Icons (SVG, no emoji)                                              */
/* ------------------------------------------------------------------ */

function UserIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
    </svg>
  );
}

function AlertTriangleIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function XCircleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );
}

function TableIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="3" y1="15" x2="21" y2="15" />
      <line x1="9" y1="3" x2="9" y2="21" />
      <line x1="15" y1="3" x2="15" y2="21" />
    </svg>
  );
}

function ClipboardCheckIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M9 14l2 2 4-4" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function FormulaSection() {
  const [activeTab, setActiveTab] = useState(0);
  const current = formulaTabs[activeTab];

  return (
    <AnimatedSection>
      <div className="space-y-10">
        {/* ============================================================ */}
        {/*  1. Interactive Formula Showcase                              */}
        {/* ============================================================ */}
        <div className="glass-card overflow-hidden">
          {/* Header */}
          <div className="p-6 pb-0">
            <h3
              className="heading-subsection mb-1"
              style={{ color: 'var(--text-primary)' }}
            >
              Dall&apos;italiano alla formula
            </h3>
            <p className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>
              Descrivete cosa vi serve in italiano, l&apos;AI genera la formula Excel.
            </p>
          </div>

          {/* Tabs */}
          <div
            className="flex gap-0 overflow-x-auto px-6"
            style={{ borderBottom: '1px solid var(--border-subtle)' }}
          >
            {formulaTabs.map((tab, idx) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(idx)}
                className="shrink-0 px-4 py-3 text-sm font-medium transition-all whitespace-nowrap"
                style={{
                  background:
                    activeTab === idx ? 'rgba(249, 115, 22, 0.1)' : 'transparent',
                  color:
                    activeTab === idx
                      ? 'var(--accent-primary)'
                      : 'var(--text-muted)',
                  marginBottom: '-1px',
                  cursor: 'pointer',
                  borderTop: 'none',
                  borderLeft: 'none',
                  borderRight: 'none',
                  borderBottom:
                    activeTab === idx
                      ? '2px solid var(--accent-primary)'
                      : '2px solid transparent',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content: prompt (left) + formula (right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Left: User prompt */}
            <div
              className="p-6"
              style={{
                borderRight: '1px solid var(--border-subtle)',
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{
                    background: 'var(--bg-elevated)',
                    color: 'var(--text-muted)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <UserIcon />
                </span>
                <span
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: 'var(--text-muted)' }}
                >
                  La vostra richiesta
                </span>
              </div>
              <div
                className="rounded-xl p-4"
                style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-subtle)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9375rem',
                  lineHeight: '1.6',
                  color: 'var(--text-primary)',
                }}
              >
                &ldquo;{current.prompt}&rdquo;
              </div>
            </div>

            {/* Right: AI response */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{
                    background: 'rgba(249, 115, 22, 0.1)',
                    color: 'var(--accent-primary)',
                    border: '1px solid rgba(249, 115, 22, 0.2)',
                  }}
                >
                  <SparkleIcon />
                </span>
                <span
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: 'var(--accent-primary)' }}
                >
                  Risposta AI
                </span>
              </div>

              {/* Formula */}
              <div
                className="rounded-xl p-4 mb-3"
                style={{
                  background: 'rgba(249, 115, 22, 0.05)',
                  border: '1px solid rgba(249, 115, 22, 0.15)',
                }}
              >
                <code
                  className="block font-mono text-sm font-semibold"
                  style={{
                    color: 'var(--accent-primary)',
                    wordBreak: 'break-all',
                  }}
                >
                  {current.formula}
                </code>
              </div>

              {/* Explanation */}
              <div
                className="text-sm leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                {current.explanation.split('\n').map((line, i) => (
                  <p key={i} className={i > 0 ? 'mt-1' : ''}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/*  2. Separator Attention Box                                   */}
        {/* ============================================================ */}
        <AnimatedSection delay={0.1}>
          <div className="warning-card flex gap-4 items-start">
            <span
              className="shrink-0 mt-0.5"
              style={{ color: 'var(--color-warning)' }}
            >
              <AlertTriangleIcon />
            </span>
            <div className="space-y-3 flex-1">
              <p
                className="font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                Attenzione ai separatori: italiano vs inglese
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Italian */}
                <div
                  className="rounded-lg p-3"
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <p
                    className="text-xs font-semibold mb-1"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Excel italiano
                  </p>
                  <p
                    className="text-xs mb-1"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Separatore: punto e virgola{' '}
                    <code
                      className="font-mono font-bold"
                      style={{ color: 'var(--accent-primary)' }}
                    >
                      ;
                    </code>
                  </p>
                  <code
                    className="block font-mono text-xs mt-2 p-2 rounded"
                    style={{
                      background: 'var(--bg-elevated)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {'=SE(A1>10;"Alto";"Basso")'}
                  </code>
                </div>

                {/* English */}
                <div
                  className="rounded-lg p-3"
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <p
                    className="text-xs font-semibold mb-1"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Excel inglese
                  </p>
                  <p
                    className="text-xs mb-1"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Separatore: virgola{' '}
                    <code
                      className="font-mono font-bold"
                      style={{ color: 'var(--accent-primary)' }}
                    >
                      ,
                    </code>
                  </p>
                  <code
                    className="block font-mono text-xs mt-2 p-2 rounded"
                    style={{
                      background: 'var(--bg-elevated)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {'=IF(A1>10,"Alto","Basso")'}
                  </code>
                </div>

                {/* Google Sheets */}
                <div
                  className="rounded-lg p-3"
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <p
                    className="text-xs font-semibold mb-1"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Google Sheets
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Dipende dalla lingua impostata nel vostro account Google
                  </p>
                </div>
              </div>
              <p
                className="text-sm font-medium"
                style={{ color: 'var(--text-secondary)' }}
              >
                Se la formula da errore di sintassi, provate a sostituire{' '}
                <code
                  className="font-mono font-bold"
                  style={{ color: 'var(--accent-primary)' }}
                >
                  ;
                </code>{' '}
                con{' '}
                <code
                  className="font-mono font-bold"
                  style={{ color: 'var(--accent-primary)' }}
                >
                  ,
                </code>{' '}
                (o viceversa).
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* ============================================================ */}
        {/*  3. Error Table                                               */}
        {/* ============================================================ */}
        <AnimatedSection delay={0.15}>
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-5">
              <span style={{ color: 'var(--color-error)' }}>
                <XCircleIcon />
              </span>
              <h3
                className="font-semibold text-lg"
                style={{ color: 'var(--text-primary)' }}
              >
                Errori comuni di Excel
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr
                    style={{
                      borderBottom: '2px solid var(--border-subtle)',
                    }}
                  >
                    <th
                      className="text-left py-2.5 px-3 font-semibold"
                      style={{ color: 'var(--text-muted)', width: '120px' }}
                    >
                      Errore
                    </th>
                    <th
                      className="text-left py-2.5 px-3 font-semibold"
                      style={{ color: 'var(--text-muted)', width: '180px' }}
                    >
                      Significato
                    </th>
                    <th
                      className="text-left py-2.5 px-3 font-semibold"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      Causa tipica
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {excelErrors.map((err) => (
                    <tr
                      key={err.code}
                      style={{ borderBottom: '1px solid var(--border-subtle)' }}
                    >
                      <td className="py-2.5 px-3">
                        <code
                          className="font-mono font-bold text-sm"
                          style={{ color: 'var(--color-error)' }}
                        >
                          {err.code}
                        </code>
                      </td>
                      <td
                        className="py-2.5 px-3 font-medium"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {err.meaning}
                      </td>
                      <td
                        className="py-2.5 px-3"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {err.cause}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </AnimatedSection>

        {/* ============================================================ */}
        {/*  4. Top 10 Formulas                                          */}
        {/* ============================================================ */}
        <AnimatedSection delay={0.2}>
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-5">
              <span style={{ color: 'var(--accent-primary)' }}>
                <TableIcon />
              </span>
              <h3
                className="font-semibold text-lg"
                style={{ color: 'var(--text-primary)' }}
              >
                Le 10 formule essenziali
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr
                    style={{
                      borderBottom: '2px solid var(--border-subtle)',
                    }}
                  >
                    <th
                      className="text-left py-2.5 px-3 font-semibold"
                      style={{ color: 'var(--text-muted)', width: '180px' }}
                    >
                      Formula
                    </th>
                    <th
                      className="text-left py-2.5 px-3 font-semibold"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      Cosa fa
                    </th>
                    <th
                      className="text-left py-2.5 px-3 font-semibold"
                      style={{ color: 'var(--text-muted)', width: '280px' }}
                    >
                      Esempio d&apos;uso
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topFormulas.map((f, idx) => (
                    <tr
                      key={f.formula}
                      style={{
                        borderBottom:
                          idx < topFormulas.length - 1
                            ? '1px solid var(--border-subtle)'
                            : 'none',
                      }}
                    >
                      <td className="py-2.5 px-3">
                        <code
                          className="font-mono font-semibold text-sm"
                          style={{ color: 'var(--accent-primary)' }}
                        >
                          {f.formula}
                        </code>
                      </td>
                      <td
                        className="py-2.5 px-3"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {f.description}
                      </td>
                      <td className="py-2.5 px-3">
                        <code
                          className="font-mono text-xs px-2 py-1 rounded"
                          style={{
                            background: 'var(--bg-elevated)',
                            color: 'var(--text-primary)',
                            border: '1px solid var(--border-subtle)',
                          }}
                        >
                          {f.example}
                        </code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </AnimatedSection>

        {/* ============================================================ */}
        {/*  5. Verification Checklist                                   */}
        {/* ============================================================ */}
        <AnimatedSection delay={0.25}>
          <div className="success-card flex gap-4 items-start">
            <span
              className="shrink-0 mt-0.5"
              style={{ color: 'var(--color-success)' }}
            >
              <ClipboardCheckIcon />
            </span>
            <div className="space-y-3 flex-1">
              <p
                className="font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                Checklist di verifica
              </p>
              <StaggerContainer className="space-y-2">
                {[
                  'Leggete la formula (ha senso logico?)',
                  'Testate su pochi dati (dove conoscete il risultato)',
                  'Controllate i riferimenti (colonne e righe giuste?)',
                  'Verificate i separatori (in Italia ; in Excel)',
                ].map((step, idx) => (
                  <StaggerItem key={idx}>
                    <div className="flex items-start gap-3">
                      <span
                        className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                        style={{
                          background: 'rgba(34, 197, 94, 0.15)',
                          color: 'var(--color-success)',
                          border: '1px solid rgba(34, 197, 94, 0.3)',
                        }}
                      >
                        {idx + 1}
                      </span>
                      <p
                        className="text-sm"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {step}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </AnimatedSection>
  );
}
