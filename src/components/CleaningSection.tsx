'use client';

import { useState } from 'react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface DataProblem {
  problema: string;
  manifestazione: string;
  impatto: string;
}

const dataProblems: DataProblem[] = [
  {
    problema: 'Spazi extra',
    manifestazione: '" Mario " invece di "Mario"',
    impatto: 'CERCA.VERT non trova, duplicati falsi',
  },
  {
    problema: 'Formati data',
    manifestazione: '"01/12/24", "2024-12-01", "1 dic"',
    impatto: 'Impossibile ordinare/calcolare',
  },
  {
    problema: 'Maiuscole miste',
    manifestazione: '"ROMA", "roma", "Roma"',
    impatto: 'Contati come valori diversi',
  },
  {
    problema: 'Duplicati',
    manifestazione: 'Stessa riga ripetuta',
    impatto: 'Totali gonfiati',
  },
  {
    problema: 'Valori mancanti',
    manifestazione: 'Celle vuote casuali',
    impatto: 'Errori in formule',
  },
  {
    problema: 'Numeri come testo',
    manifestazione: '"1.234" (testo) vs 1234',
    impatto: 'SOMMA ignora questi valori',
  },
];

interface FlashFillTab {
  id: string;
  label: string;
  before: { colA: string; colB: string }[];
  after: { colA: string; colB: string; highlight: 'manual' | 'flash' }[];
}

const flashFillTabs: FlashFillTab[] = [
  {
    id: 'email',
    label: 'Email \u2192 Nome',
    before: [
      { colA: 'mario.rossi@email.com', colB: '' },
      { colA: 'luigi.verdi@email.com', colB: '' },
      { colA: 'anna.bianchi@email.com', colB: '' },
    ],
    after: [
      { colA: 'mario.rossi@email.com', colB: 'Mario Rossi', highlight: 'manual' },
      { colA: 'luigi.verdi@email.com', colB: 'Luigi Verdi', highlight: 'flash' },
      { colA: 'anna.bianchi@email.com', colB: 'Anna Bianchi', highlight: 'flash' },
    ],
  },
  {
    id: 'telefono',
    label: 'Telefono \u2192 Formato',
    before: [
      { colA: '3331234567', colB: '' },
      { colA: '3409876543', colB: '' },
      { colA: '3281112233', colB: '' },
    ],
    after: [
      { colA: '3331234567', colB: '333-123-4567', highlight: 'manual' },
      { colA: '3409876543', colB: '340-987-6543', highlight: 'flash' },
      { colA: '3281112233', colB: '328-111-2233', highlight: 'flash' },
    ],
  },
  {
    id: 'codice',
    label: 'Testo \u2192 Codice',
    before: [
      { colA: 'Ordine #ORD-2024-001 del cliente Rossi', colB: '' },
      { colA: 'Ordine #ORD-2024-002 del cliente Verdi', colB: '' },
      { colA: 'Ordine #ORD-2024-003 del cliente Bianchi', colB: '' },
    ],
    after: [
      { colA: 'Ordine #ORD-2024-001...', colB: 'ORD-2024-001', highlight: 'manual' },
      { colA: 'Ordine #ORD-2024-002...', colB: 'ORD-2024-002', highlight: 'flash' },
      { colA: 'Ordine #ORD-2024-003...', colB: 'ORD-2024-003', highlight: 'flash' },
    ],
  },
];

interface CleaningFormula {
  formula: string;
  description: string;
}

const cleaningFormulas: CleaningFormula[] = [
  { formula: 'ANNULLA.SPAZI(A1)', description: 'Rimuove spazi extra' },
  { formula: 'MAIUSC.INIZ(A1)', description: 'Prima lettera maiuscola' },
  { formula: 'CONTA.SE(A:A;A2)>1', description: 'Trova duplicati' },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function SpreadsheetTable({
  label,
  rows,
  highlightMode,
}: {
  label: string;
  rows: { colA: string; colB: string; highlight?: 'manual' | 'flash' }[];
  highlightMode: boolean;
}) {
  return (
    <div
      style={{
        border: '1px solid var(--border-default)',
        borderRadius: 8,
        overflow: 'hidden',
        flex: 1,
        minWidth: 0,
      }}
    >
      {/* Table label */}
      <div
        className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-center"
        style={{
          background: 'var(--bg-elevated)',
          color: 'var(--text-muted)',
          borderBottom: '1px solid var(--border-default)',
        }}
      >
        {label}
      </div>

      {/* Column headers (A, B) */}
      <div
        className="grid grid-cols-2"
        style={{ borderBottom: '1px solid var(--border-default)' }}
      >
        <div
          className="px-3 py-1.5 text-xs font-bold text-center"
          style={{
            background: '#f0f0f0',
            color: 'var(--text-muted)',
            borderRight: '1px solid var(--border-default)',
          }}
        >
          A
        </div>
        <div
          className="px-3 py-1.5 text-xs font-bold text-center"
          style={{
            background: '#f0f0f0',
            color: 'var(--text-muted)',
          }}
        >
          B
        </div>
      </div>

      {/* Data rows */}
      {rows.map((row, idx) => {
        let rowBg = 'transparent';
        if (highlightMode && row.highlight === 'manual') {
          rowBg = 'rgba(249, 115, 22, 0.1)';
        } else if (highlightMode && row.highlight === 'flash') {
          rowBg = 'rgba(34, 197, 94, 0.1)';
        }

        return (
          <div
            key={idx}
            className="grid grid-cols-2"
            style={{
              borderBottom: idx < rows.length - 1 ? '1px solid var(--border-subtle)' : 'none',
              background: rowBg,
            }}
          >
            <div
              className="px-3 py-2 text-xs truncate"
              style={{
                color: 'var(--text-secondary)',
                borderRight: '1px solid var(--border-subtle)',
                fontFamily: 'var(--font-mono)',
              }}
              title={row.colA}
            >
              {row.colA}
            </div>
            <div
              className="px-3 py-2 text-xs"
              style={{
                color: row.colB ? 'var(--text-primary)' : 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
                fontWeight: row.colB ? 500 : 400,
              }}
            >
              {row.colB || '\u00A0'}
            </div>
          </div>
        );
      })}

      {/* Legend for highlighted rows */}
      {highlightMode && (
        <div
          className="flex items-center gap-4 px-3 py-2"
          style={{
            borderTop: '1px solid var(--border-subtle)',
            background: 'var(--bg-elevated)',
          }}
        >
          <div className="flex items-center gap-1.5">
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 2,
                background: 'rgba(249, 115, 22, 0.3)',
                display: 'inline-block',
                border: '1px solid rgba(249, 115, 22, 0.5)',
              }}
            />
            <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
              Scritto a mano
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 2,
                background: 'rgba(34, 197, 94, 0.3)',
                display: 'inline-block',
                border: '1px solid rgba(34, 197, 94, 0.5)',
              }}
            />
            <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
              Flash Fill
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function CleaningSection() {
  const [activeTab, setActiveTab] = useState(0);
  const currentTab = flashFillTabs[activeTab];

  return (
    <AnimatedSection>
      <div className="space-y-10">

        {/* ---- 1. Common problems table ---- */}
        <AnimatedSection delay={0.1}>
          <div className="glass-card p-6">
            <h3
              className="heading-subsection mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              I 6 problemi piu comuni nei dati
            </h3>
            <p
              className="text-sm mb-5"
              style={{ color: 'var(--text-secondary)' }}
            >
              Prima di qualsiasi analisi, questi problemi vanno identificati e risolti. Dati sporchi producono risultati sbagliati.
            </p>

            <div style={{ overflowX: 'auto' }}>
              <table
                className="w-full text-sm"
                style={{
                  borderCollapse: 'separate',
                  borderSpacing: 0,
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 10,
                  overflow: 'hidden',
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: 'var(--bg-elevated)',
                      borderBottom: '2px solid var(--border-default)',
                    }}
                  >
                    <th
                      className="text-left px-4 py-3 font-semibold"
                      style={{ color: 'var(--text-primary)', borderBottom: '2px solid var(--border-default)' }}
                    >
                      Problema
                    </th>
                    <th
                      className="text-left px-4 py-3 font-semibold"
                      style={{ color: 'var(--text-primary)', borderBottom: '2px solid var(--border-default)' }}
                    >
                      Come si manifesta
                    </th>
                    <th
                      className="text-left px-4 py-3 font-semibold"
                      style={{ color: 'var(--text-primary)', borderBottom: '2px solid var(--border-default)' }}
                    >
                      Impatto
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataProblems.map((problem, idx) => (
                    <tr
                      key={idx}
                      style={{
                        background: idx % 2 === 0 ? 'var(--bg-surface)' : 'var(--bg-elevated)',
                        borderBottom: idx < dataProblems.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                      }}
                    >
                      <td
                        className="px-4 py-3 font-semibold whitespace-nowrap"
                        style={{ color: 'var(--accent-primary)' }}
                      >
                        {problem.problema}
                      </td>
                      <td
                        className="px-4 py-3"
                        style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}
                      >
                        {problem.manifestazione}
                      </td>
                      <td
                        className="px-4 py-3"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {problem.impatto}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </AnimatedSection>

        {/* ---- 2. Interactive Flash Fill Demo ---- */}
        <AnimatedSection delay={0.2}>
          <div className="glass-card p-6">
            <h3
              className="heading-subsection mb-1"
              style={{ color: 'var(--text-primary)' }}
            >
              Flash Fill: la scorciatoia magica
            </h3>
            <p
              className="text-sm mb-5"
              style={{
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-mono)',
                display: 'inline-block',
              }}
            >
              <span
                className="inline-block px-2 py-0.5 rounded"
                style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--accent-primary)',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                }}
              >
                Ctrl+E
              </span>
            </p>

            {/* Tab buttons */}
            <div className="flex flex-wrap gap-2 mb-6">
              {flashFillTabs.map((tab, idx) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(idx)}
                  className={`tab-button text-sm ${activeTab === idx ? 'active' : ''}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Before / After tables side by side */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <SpreadsheetTable
                label="Prima"
                rows={currentTab.before}
                highlightMode={false}
              />

              {/* Arrow separator */}
              <div className="flex items-center justify-center lg:py-0 py-2">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: 'var(--accent-primary)' }}
                  className="lg:rotate-0 rotate-90"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>

              <SpreadsheetTable
                label="Dopo (Ctrl+E)"
                rows={currentTab.after}
                highlightMode={true}
              />
            </div>

            {/* 3 steps */}
            <div
              className="rounded-xl p-4"
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-wider mb-3"
                style={{ color: 'var(--text-muted)' }}
              >
                Come funziona
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-0">
                {/* Step 1 */}
                <div className="flex items-center gap-2 flex-1">
                  <span
                    className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: 'var(--accent-primary)',
                      color: 'white',
                    }}
                  >
                    1
                  </span>
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Scrivete il risultato per la prima riga
                  </span>
                </div>

                {/* Arrow */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 hidden sm:block mx-2"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>

                {/* Step 2 */}
                <div className="flex items-center gap-2 flex-1">
                  <span
                    className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: 'var(--accent-primary)',
                      color: 'white',
                    }}
                  >
                    2
                  </span>
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Andate nella cella sotto
                  </span>
                </div>

                {/* Arrow */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 hidden sm:block mx-2"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>

                {/* Step 3 */}
                <div className="flex items-center gap-2 flex-1">
                  <span
                    className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: 'var(--accent-primary)',
                      color: 'white',
                    }}
                  >
                    3
                  </span>
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Premete{' '}
                    <span
                      className="inline-block px-1.5 py-0.5 rounded"
                      style={{
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-default)',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        color: 'var(--accent-primary)',
                      }}
                    >
                      Ctrl+E
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ---- 3. Useful cleaning formulas ---- */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {cleaningFormulas.map((item) => (
            <StaggerItem key={item.formula}>
              <div
                className="glass-card p-5 text-center"
                style={{ height: '100%' }}
              >
                <div
                  className="inline-block px-3 py-1.5 rounded-lg mb-3"
                  style={{
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-subtle)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--accent-primary)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {item.formula}
                </div>
                <p
                  className="text-sm"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {item.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* ---- 4. Important warning note ---- */}
        <AnimatedSection delay={0.3}>
          <div className="warning-card flex gap-4 items-start max-w-3xl mx-auto">
            <span
              className="shrink-0 mt-0.5"
              style={{ color: 'var(--color-warning)' }}
            >
              <svg
                width="24"
                height="24"
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
            </span>
            <div>
              <p
                className="font-semibold mb-1"
                style={{ color: 'var(--text-primary)' }}
              >
                Attenzione
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                Verificate sempre i dati puliti. L&apos;AI puo fare errori. Prima di usare i dati per analisi critiche, controllate manualmente un campione di righe.
              </p>
            </div>
          </div>
        </AnimatedSection>

      </div>
    </AnimatedSection>
  );
}
