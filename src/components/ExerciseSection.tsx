'use client';

import { useState } from 'react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface ExerciseStep {
  number: number;
  title: string;
  description: string;
  details: string[];
  prompt?: string;
}

const steps: ExerciseStep[] = [
  {
    number: 1,
    title: 'Raccogliere dati',
    description: 'Scegliete un ruolo target e raccogliete dati stipendiali.',
    details: [
      'Scegliete un ruolo specifico (es. "Data Analyst Junior", "UX Designer")',
      'Cercate su Glassdoor, LinkedIn Salary, Indeed',
      'Raccogliete 10-20 data point in un foglio di calcolo',
      'Per ogni dato: ruolo, azienda (opzionale), stipendio, fonte, esperienza richiesta',
    ],
  },
  {
    number: 2,
    title: 'Analizzare con AI',
    description: 'Caricate i dati raccolti e chiedete un\'analisi completa.',
    details: [
      'Caricate il file o copiate i dati nella chat',
      'Usate il prompt qui sotto per ottenere un\'analisi strutturata',
      'Chiedete chiarimenti se qualcosa non e chiaro',
    ],
    prompt:
      'Ho raccolto dati sugli stipendi per [ruolo] in [area]. Analizza:\n1. Stipendio mediano e range\n2. Come varia per esperienza\n3. Competenze associate a stipendi piu alti\n4. Confronto tra fonti\n5. Cosa significa per la mia ricerca',
  },
  {
    number: 3,
    title: 'Visualizzare',
    description: 'Chiedete grafici per rendere i dati comprensibili.',
    details: [
      'Distribuzione degli stipendi (istogramma)',
      'Stipendio vs anni di esperienza (scatter plot)',
      'Tabella competenze vs premium salariale',
      'Confronto tra fonti diverse (bar chart)',
    ],
  },
  {
    number: 4,
    title: 'Concludere',
    description: 'Rendete l\'analisi azionabile per la vostra carriera.',
    details: [
      'Il mio stipendio atteso e realistico per il mercato?',
      'Quali competenze mi mancano per accedere alla fascia alta?',
      'Come posso usare questi dati in una negoziazione?',
      'Quali aziende/settori pagano di piu per questo ruolo?',
    ],
  },
];

interface DataSource {
  name: string;
  description: string;
  url: string;
}

const dataSources: DataSource[] = [
  { name: 'Glassdoor', description: 'Stipendi per ruolo/azienda', url: 'glassdoor.it' },
  { name: 'LinkedIn Salary', description: 'Range stipendiali', url: 'linkedin.com/salary' },
  { name: 'Indeed Salary', description: 'Stipendi medi', url: 'it.indeed.com/salaries' },
  { name: 'ISTAT', description: 'Statistiche ufficiali', url: 'istat.it' },
];

/* ------------------------------------------------------------------ */
/*  Icons (SVG, no emoji)                                              */
/* ------------------------------------------------------------------ */

function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function GaugeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function ChecklistIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="6" height="6" rx="1" />
      <path d="M5 8l1 1 2-2" />
      <line x1="13" y1="6" x2="21" y2="6" />
      <line x1="13" y1="10" x2="18" y2="10" />
      <rect x="3" y="15" width="6" height="6" rx="1" />
      <line x1="13" y1="16" x2="21" y2="16" />
      <line x1="13" y1="20" x2="18" y2="20" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ExerciseSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-10">

      {/* ── Exercise Header Info ────────────────────────────────── */}
      <AnimatedSection>
        <div className="glass-card p-6">
          <div className="grid sm:grid-cols-3 gap-5">
            <div className="flex items-center gap-3">
              <span
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: 'rgba(249, 115, 22, 0.08)',
                  color: 'var(--accent-primary)',
                  border: '1px solid rgba(249, 115, 22, 0.15)',
                }}
              >
                <ClockIcon />
              </span>
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Tempo
                </p>
                <p
                  className="font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  45-60 minuti
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: 'rgba(249, 115, 22, 0.08)',
                  color: 'var(--accent-primary)',
                  border: '1px solid rgba(249, 115, 22, 0.15)',
                }}
              >
                <GaugeIcon />
              </span>
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Difficolta
                </p>
                <p
                  className="font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Intermedio-Avanzato
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: 'rgba(249, 115, 22, 0.08)',
                  color: 'var(--accent-primary)',
                  border: '1px solid rgba(249, 115, 22, 0.15)',
                }}
              >
                <ChecklistIcon />
              </span>
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Prerequisiti
                </p>
                <p
                  className="text-sm"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Account ChatGPT/Claude/Gemini, connessione internet
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ── 4 Steps ────────────────────────────────────────────── */}
      <StaggerContainer className="space-y-6">
        {steps.map((step) => (
          <StaggerItem key={step.number}>
            <div className="glass-card p-6">
              <div className="flex gap-4 items-start">
                {/* Number badge */}
                <span
                  className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold"
                  style={{
                    background: 'var(--gradient-primary)',
                    color: '#fff',
                    boxShadow: '0 2px 8px rgba(249, 115, 22, 0.25)',
                  }}
                >
                  {step.number}
                </span>

                <div className="flex-1 min-w-0">
                  <h4
                    className="font-semibold text-lg mb-1"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {step.title}
                  </h4>
                  <p
                    className="text-sm mb-4"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {step.description}
                  </p>

                  {/* Details list */}
                  <ul className="space-y-2 mb-4">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex gap-2.5 items-start">
                        <span
                          className="shrink-0 mt-1"
                          style={{ color: 'var(--accent-primary)' }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span
                          className="text-sm"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          {detail}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Prompt block (only for step 2) */}
                  {step.prompt && (
                    <div className="relative">
                      <div
                        className="rounded-xl p-4 font-mono text-sm leading-relaxed"
                        style={{
                          background: 'var(--bg-elevated)',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--text-primary)',
                          whiteSpace: 'pre-wrap',
                        }}
                      >
                        {step.prompt}
                      </div>
                      <button
                        onClick={() => handleCopy(step.prompt!)}
                        className="absolute top-3 right-3 p-2 rounded-lg transition-all"
                        style={{
                          background: 'var(--bg-surface)',
                          border: '1px solid var(--border-subtle)',
                          color: copied ? 'var(--color-success)' : 'var(--text-muted)',
                          cursor: 'pointer',
                        }}
                        title="Copia prompt"
                      >
                        {copied ? <CheckIcon /> : <CopyIcon />}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* ── Data Sources Table ──────────────────────────────────── */}
      <AnimatedSection delay={0.15}>
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-5">
            <span
              className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: 'rgba(249, 115, 22, 0.08)',
                color: 'var(--accent-primary)',
                border: '1px solid rgba(249, 115, 22, 0.15)',
              }}
            >
              <DatabaseIcon />
            </span>
            <h4
              className="font-semibold text-lg"
              style={{ color: 'var(--text-primary)' }}
            >
              Fonti dati consigliate
            </h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-subtle)' }}>
                  <th
                    className="text-left py-3 px-4 font-semibold"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Fonte
                  </th>
                  <th
                    className="text-left py-3 px-4 font-semibold"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Cosa offre
                  </th>
                  <th
                    className="text-left py-3 px-4 font-semibold"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Link
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataSources.map((source, idx) => (
                  <tr
                    key={source.name}
                    style={{
                      borderBottom:
                        idx < dataSources.length - 1
                          ? '1px solid var(--border-subtle)'
                          : 'none',
                    }}
                  >
                    <td
                      className="py-3 px-4 font-medium"
                      style={{ color: 'var(--accent-primary)' }}
                    >
                      {source.name}
                    </td>
                    <td
                      className="py-3 px-4"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {source.description}
                    </td>
                    <td className="py-3 px-4">
                      <a
                        href={`https://${source.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm"
                        style={{ color: 'var(--accent-primary)' }}
                      >
                        {source.url}
                        <ExternalLinkIcon />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
