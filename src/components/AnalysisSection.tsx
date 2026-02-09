'use client';

import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface WorkflowStep {
  number: number;
  title: string;
  description: string;
}

const workflowSteps: WorkflowStep[] = [
  {
    number: 1,
    title: 'Caricate',
    description: 'Upload del file CSV o Excel in ChatGPT (Code Interpreter attivo).',
  },
  {
    number: 2,
    title: 'Esplorate',
    description: 'Chiedete un\'analisi esplorativa iniziale: struttura, tipi di dati, anomalie.',
  },
  {
    number: 3,
    title: 'Approfondite',
    description: 'Fate domande specifiche sui dati: trend, correlazioni, outlier.',
  },
  {
    number: 4,
    title: 'Visualizzate',
    description: 'Chiedete grafici, tabelle pivot e riepiloghi visivi.',
  },
];

const naturalLanguageQueries = [
  'Qual e il cliente con il fatturato totale piu alto?',
  'Come variano le vendite per regione? Mostrami i top 5.',
  'Quanti ordini sono stati fatti in Q1 2024?',
  'C\'e differenza di prezzo medio tra categorie?',
];

const promptText = `Ho caricato un file con dati di vendite.
Fai un'analisi esplorativa iniziale:
- Descrivi la struttura (colonne, tipi di dati, righe)
- Identifica eventuali problemi nei dati
- Suggerisci 3-5 domande interessanti`;

const responseText = `Colonna "Vendite":
- Media: 15.237,45\u20AC
- Mediana: 12.500,00\u20AC
- Dev. standard: 8.432,12\u20AC

Osservazione: la differenza tra media e mediana
suggerisce una distribuzione asimmetrica con
alcuni valori molto alti.

Domande suggerite:
1. "Qual e il trend delle vendite nel tempo?"
2. "Ci sono differenze significative tra regioni?"
3. "Quali prodotti performano meglio?"`;

const pivotPromptTemplate = `Crea una tabella pivot che mostri:
- Righe: prodotto
- Colonne: mese
- Valori: somma delle vendite
Aggiungi totali per riga e colonna.`;

/* ------------------------------------------------------------------ */
/*  Icons (SVG, no emoji)                                              */
/* ------------------------------------------------------------------ */

function UploadIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function ZoomInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  );
}

function PromptIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

function ResponseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  );
}

function TableIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="3" y1="15" x2="21" y2="15" />
      <line x1="9" y1="3" x2="9" y2="21" />
      <line x1="15" y1="3" x2="15" y2="21" />
    </svg>
  );
}

function QuestionIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
    </svg>
  );
}

const stepIcons = [<UploadIcon key="u" />, <SearchIcon key="s" />, <ZoomInIcon key="z" />, <ChartIcon key="c" />];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function AnalysisSection() {
  return (
    <div className="space-y-16">
      {/* ---- 1. Analysis Workflow ---- */}
      <AnimatedSection>
        <h3
          className="heading-subsection mb-8"
          style={{ color: 'var(--text-primary)' }}
        >
          Il workflow di analisi
        </h3>

        <StaggerContainer className="relative max-w-2xl mx-auto">
          {/* Vertical connecting line */}
          <div
            className="absolute left-6 top-10 bottom-10 w-px hidden sm:block"
            style={{ background: 'linear-gradient(to bottom, var(--accent-primary), var(--border-subtle))' }}
            aria-hidden="true"
          />

          {workflowSteps.map((step, idx) => (
            <StaggerItem key={step.number} className={idx < workflowSteps.length - 1 ? 'mb-4' : ''}>
              <div className="glass-card p-5 flex items-start gap-4 relative sm:ml-0">
                {/* Number badge */}
                <span
                  className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center relative z-10"
                  style={{
                    background: 'rgba(249, 115, 22, 0.1)',
                    color: 'var(--accent-primary)',
                    border: '1px solid rgba(249, 115, 22, 0.2)',
                  }}
                >
                  {stepIcons[idx]}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-xs font-bold font-mono px-2 py-0.5 rounded"
                      style={{
                        background: 'var(--accent-primary)',
                        color: '#fff',
                      }}
                    >
                      {step.number}
                    </span>
                    <h4
                      className="font-semibold text-base"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {step.title}
                    </h4>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </AnimatedSection>

      {/* ---- 2. Example Prompt / Response ---- */}
      <AnimatedSection delay={0.1}>
        <h3
          className="heading-subsection mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Esempio: analisi esplorativa
        </h3>

        <div className="glass-card overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left: Prompt */}
            <div
              style={{
                background: 'var(--bg-elevated)',
                borderRight: '1px solid var(--border-subtle)',
              }}
            >
              <div
                className="px-5 py-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider"
                style={{
                  borderBottom: '1px solid var(--border-subtle)',
                  color: 'var(--accent-primary)',
                  background: 'rgba(249, 115, 22, 0.06)',
                }}
              >
                <PromptIcon />
                Il vostro prompt
              </div>
              <div className="p-5">
                <pre
                  className="font-mono text-sm leading-relaxed whitespace-pre-wrap"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {promptText}
                </pre>
              </div>
            </div>

            {/* Right: Response */}
            <div style={{ background: 'var(--bg-surface)' }}>
              <div
                className="px-5 py-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider"
                style={{
                  borderBottom: '1px solid var(--border-subtle)',
                  color: 'var(--color-success)',
                  background: 'rgba(34, 197, 94, 0.06)',
                }}
              >
                <ResponseIcon />
                Risposta AI tipica
              </div>
              <div className="p-5">
                <pre
                  className="font-mono text-sm leading-relaxed whitespace-pre-wrap"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {responseText}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ---- 3. Natural Language Queries ---- */}
      <AnimatedSection delay={0.15}>
        <div className="flex items-center gap-3 mb-5">
          <span style={{ color: 'var(--accent-primary)' }}>
            <QuestionIcon />
          </span>
          <h3
            className="heading-subsection"
            style={{ color: 'var(--text-primary)' }}
          >
            Domande in linguaggio naturale
          </h3>
        </div>
        <p
          className="text-sm mb-6 max-w-2xl"
          style={{ color: 'var(--text-secondary)' }}
        >
          Non servono formule: chiedete direttamente quello che volete sapere.
        </p>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {naturalLanguageQueries.map((query) => (
            <StaggerItem key={query}>
              <div
                className="font-mono text-sm px-4 py-3 rounded-xl"
                style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                }}
              >
                <span
                  className="mr-2 select-none"
                  style={{ color: 'var(--accent-primary)' }}
                >
                  &gt;
                </span>
                {query}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </AnimatedSection>

      {/* ---- 4. Pivot Table Explanation ---- */}
      <AnimatedSection delay={0.2}>
        <div className="glass-card p-6 lg:p-8">
          <div className="flex items-start gap-4 mb-5">
            <span
              className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                background: 'rgba(249, 115, 22, 0.08)',
                color: 'var(--accent-primary)',
                border: '1px solid rgba(249, 115, 22, 0.15)',
              }}
            >
              <TableIcon />
            </span>
            <div>
              <h3
                className="font-semibold text-lg"
                style={{ color: 'var(--text-primary)' }}
              >
                Tabelle pivot: il super-filtro
              </h3>
            </div>
          </div>

          <p
            className="text-sm leading-relaxed mb-6"
            style={{ color: 'var(--text-secondary)' }}
          >
            Immaginate 1.000 vendite con data, prodotto, regione, importo.
            Una pivot table risponde istantaneamente a: quanto ha venduto
            ogni prodotto? Come variano le vendite per regione e mese?
          </p>

          {/* Prompt template */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: 'var(--text-muted)' }}
            >
              Prompt per chiedere una pivot table
            </p>
            <div
              className="font-mono text-sm rounded-xl p-5 whitespace-pre-wrap"
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
              }}
            >
              {pivotPromptTemplate}
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
