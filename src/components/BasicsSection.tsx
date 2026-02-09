'use client';

import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const canDoItems = [
  'Scrivere formule',
  'Spiegare formule',
  'Pulire dati',
  'Analizzare pattern',
  'Generare grafici',
  'Rispondere a domande sui dati',
  'Suggerire analisi',
];

const cantDoItems = [
  'Verificare accuratezza dei dati',
  'Accedere a database esterni',
  'Garantire calcoli perfetti',
  'Capire il contesto aziendale',
  'Sostituire un analista',
];

interface FileFormat {
  format: string;
  extensions: string;
  note: string;
}

const fileFormats: FileFormat[] = [
  { format: 'CSV', extensions: '.csv', note: 'Il piu affidabile' },
  { format: 'Excel', extensions: '.xlsx, .xls', note: 'Funziona bene, anche con piu fogli' },
  { format: 'Google Sheets', extensions: 'link condiviso', note: "Solo se l'AI ha accesso web" },
  { format: 'Testo tabulato', extensions: '.txt, .tsv', note: 'Dati separati da tabulazioni' },
  { format: 'JSON', extensions: '.json', note: 'Strutturato, ottimo per dati gerarchici' },
];

interface UploadMethod {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const uploadMethods: UploadMethod[] = [
  {
    title: 'Upload diretto',
    description: 'File drag & drop',
    icon: <UploadIcon />,
  },
  {
    title: 'Copia-incolla',
    description: '<100 righe',
    icon: <ClipboardIcon />,
  },
  {
    title: 'Descrizione struttura',
    description: 'Per dati sensibili',
    icon: <ShieldDescribeIcon />,
  },
];

const privacyDontUpload = [
  'Dati personali clienti',
  'Dati sanitari',
  'Dati finanziari sensibili',
  'Informazioni riservate',
  'Dati soggetti a NDA',
];

const privacyAlternatives = [
  'Anonimizzate i dati prima di caricarli',
  'Usate dati sintetici (inventati ma realistici)',
  'Descrivete la struttura senza caricare i dati reali',
  'Usate AI locali (LM Studio, Ollama) per dati sensibili',
];

interface CIComparison {
  aspect: string;
  chatNormale: string;
  codeInterpreter: string;
}

const ciComparisons: CIComparison[] = [
  { aspect: 'Calcoli', chatNormale: 'Approssimativi', codeInterpreter: 'Esatti (Python)' },
  { aspect: 'Analisi', chatNormale: 'Descrive cosa farebbe', codeInterpreter: 'Esegue realmente il codice' },
  { aspect: 'Output', chatNormale: 'Non genera file', codeInterpreter: 'Crea file scaricabili' },
  { aspect: 'Memoria', chatNormale: 'Limitata dal contesto', codeInterpreter: 'Lavora sul file intero' },
];

/* ------------------------------------------------------------------ */
/*  Icons (SVG, no emoji)                                              */
/* ------------------------------------------------------------------ */

function QuoteIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function AlertCircleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function TableIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="3" y1="15" x2="21" y2="15" />
      <line x1="9" y1="3" x2="9" y2="21" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
      <line x1="9" y1="12" x2="15" y2="12" />
      <line x1="9" y1="16" x2="13" y2="16" />
    </svg>
  );
}

function ShieldDescribeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <line x1="9" y1="12" x2="15" y2="12" />
      <line x1="12" y1="9" x2="12" y2="15" />
    </svg>
  );
}

function ShieldAlertIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function TerminalIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

function LightbulbIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function BasicsSection() {
  return (
    <div className="space-y-12">

      {/* ── Paradigm Shift Callout ─────────────────────────────── */}
      <AnimatedSection>
        <div
          className="relative p-8 rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.06) 0%, rgba(234, 88, 12, 0.03) 100%)',
            border: '1px solid rgba(249, 115, 22, 0.15)',
          }}
        >
          <div className="flex gap-5 items-start">
            <span
              className="shrink-0 mt-1"
              style={{ color: 'var(--accent-primary)', opacity: 0.6 }}
            >
              <QuoteIcon />
            </span>
            <div>
              <p
                className="text-xl md:text-2xl font-semibold leading-snug"
                style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}
              >
                Non dovete piu{' '}
                <span
                  className="font-bold"
                  style={{
                    background: 'var(--gradient-primary)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  MEMORIZZARE
                </span>{' '}
                sintassi di formule.
                <br />
                Dovete saper{' '}
                <span
                  className="font-bold"
                  style={{
                    background: 'var(--gradient-primary)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  DESCRIVERE
                </span>{' '}
                cosa volete ottenere.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ── Can Do / Can't Do ──────────────────────────────────── */}
      <AnimatedSection>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Can do - green */}
          <div
            className="p-6 rounded-2xl"
            style={{
              background: 'rgba(34, 197, 94, 0.06)',
              border: '1px solid rgba(34, 197, 94, 0.2)',
            }}
          >
            <div className="flex items-center gap-2 mb-5">
              <span style={{ color: 'var(--color-success)' }}>
                <CheckCircleIcon />
              </span>
              <p
                className="font-bold text-lg"
                style={{ color: 'var(--color-success)' }}
              >
                Cosa l&apos;AI puo fare molto bene
              </p>
            </div>
            <StaggerContainer className="space-y-3">
              {canDoItems.map((item) => (
                <StaggerItem key={item}>
                  <div className="flex gap-2.5 items-start">
                    <span
                      className="shrink-0 mt-1"
                      style={{ color: 'var(--color-success)' }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span
                      className="text-sm"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {item}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Can't do - orange */}
          <div
            className="p-6 rounded-2xl"
            style={{
              background: 'rgba(249, 115, 22, 0.06)',
              border: '1px solid rgba(249, 115, 22, 0.2)',
            }}
          >
            <div className="flex items-center gap-2 mb-5">
              <span style={{ color: 'var(--accent-primary)' }}>
                <AlertCircleIcon />
              </span>
              <p
                className="font-bold text-lg"
                style={{ color: 'var(--accent-primary)' }}
              >
                Cosa l&apos;AI NON puo fare
              </p>
            </div>
            <StaggerContainer className="space-y-3">
              {cantDoItems.map((item) => (
                <StaggerItem key={item}>
                  <div className="flex gap-2.5 items-start">
                    <span
                      className="shrink-0 mt-1"
                      style={{ color: 'var(--accent-primary)' }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </span>
                    <span
                      className="text-sm"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {item}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </AnimatedSection>

      {/* ── File Format Table ──────────────────────────────────── */}
      <AnimatedSection>
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
              <TableIcon />
            </span>
            <h4
              className="font-semibold text-lg"
              style={{ color: 'var(--text-primary)' }}
            >
              Formati file supportati
            </h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-default)' }}>
                  <th
                    className="text-left py-3 px-4 font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Formato
                  </th>
                  <th
                    className="text-left py-3 px-4 font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Estensione
                  </th>
                  <th
                    className="text-left py-3 px-4 font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Note
                  </th>
                </tr>
              </thead>
              <tbody>
                {fileFormats.map((row) => (
                  <tr
                    key={row.format}
                    style={{ borderBottom: '1px solid var(--border-subtle)' }}
                  >
                    <td
                      className="py-3 px-4 font-medium"
                      style={{ color: 'var(--accent-primary)' }}
                    >
                      {row.format}
                    </td>
                    <td className="py-3 px-4">
                      <code
                        className="text-xs px-2 py-1 rounded font-mono"
                        style={{
                          background: 'var(--bg-elevated)',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {row.extensions}
                      </code>
                    </td>
                    <td
                      className="py-3 px-4"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {row.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AnimatedSection>

      {/* ── Upload Methods ─────────────────────────────────────── */}
      <AnimatedSection>
        <StaggerContainer className="grid sm:grid-cols-3 gap-4">
          {uploadMethods.map((method) => (
            <StaggerItem key={method.title}>
              <div className="glass-card p-5 text-center h-full flex flex-col items-center gap-3">
                <span
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'rgba(249, 115, 22, 0.08)',
                    color: 'var(--accent-primary)',
                    border: '1px solid rgba(249, 115, 22, 0.15)',
                  }}
                >
                  {method.icon}
                </span>
                <p
                  className="font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {method.title}
                </p>
                <p
                  className="text-sm"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {method.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </AnimatedSection>

      {/* ── Privacy Warning ────────────────────────────────────── */}
      <AnimatedSection>
        <div className="error-card">
          <div className="flex items-center gap-3 mb-4">
            <span style={{ color: 'var(--color-error)' }}>
              <ShieldAlertIcon />
            </span>
            <p
              className="font-bold text-lg"
              style={{ color: 'var(--color-error)' }}
            >
              Privacy dei dati: attenzione extra
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* What NOT to upload */}
            <div>
              <p
                className="text-sm font-semibold mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                NON caricate mai:
              </p>
              <ul className="space-y-2">
                {privacyDontUpload.map((item) => (
                  <li key={item} className="flex gap-2 items-start">
                    <span
                      className="shrink-0 mt-0.5"
                      style={{ color: 'var(--color-error)' }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </span>
                    <span
                      className="text-sm"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Alternatives */}
            <div>
              <p
                className="text-sm font-semibold mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                Alternative sicure:
              </p>
              <ul className="space-y-2">
                {privacyAlternatives.map((item) => (
                  <li key={item} className="flex gap-2 items-start">
                    <span
                      className="shrink-0 mt-0.5"
                      style={{ color: 'var(--color-success)' }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span
                      className="text-sm"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Golden rule */}
          <div
            className="mt-5 p-4 rounded-xl"
            style={{
              background: 'rgba(239, 68, 68, 0.06)',
              border: '1px solid rgba(239, 68, 68, 0.15)',
            }}
          >
            <div className="flex gap-2.5 items-start">
              <span
                className="shrink-0 mt-0.5"
                style={{ color: 'var(--color-error)' }}
              >
                <LightbulbIcon />
              </span>
              <p
                className="text-sm leading-relaxed italic"
                style={{ color: 'var(--text-secondary)' }}
              >
                <strong style={{ color: 'var(--text-primary)' }}>Regola pratica:</strong>{' '}
                Se vi sentireste a disagio a stampare quei dati e lasciarli sulla scrivania, non caricateli sull&apos;AI.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ── Code Interpreter ───────────────────────────────────── */}
      <AnimatedSection>
        <div
          className="glass-card p-6 overflow-hidden"
          style={{
            borderLeft: '4px solid var(--accent-primary)',
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span
              className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: 'rgba(249, 115, 22, 0.08)',
                color: 'var(--accent-primary)',
                border: '1px solid rgba(249, 115, 22, 0.15)',
              }}
            >
              <TerminalIcon />
            </span>
            <div>
              <h4
                className="font-semibold text-lg"
                style={{ color: 'var(--text-primary)' }}
              >
                Code Interpreter
              </h4>
              <p
                className="text-sm"
                style={{ color: 'var(--text-muted)' }}
              >
                Ambiente Python completo integrato in ChatGPT
              </p>
            </div>
          </div>

          <p
            className="text-sm leading-relaxed mb-5"
            style={{ color: 'var(--text-secondary)' }}
          >
            Quando attivate Code Interpreter (o &quot;Advanced Data Analysis&quot;), ChatGPT non si limita a
            descrivere cosa farebbe: esegue realmente codice Python sui vostri dati, genera grafici
            scaricabili e produce file di output. La differenza e sostanziale.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-default)' }}>
                  <th
                    className="text-left py-3 px-4 font-semibold"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Aspetto
                  </th>
                  <th
                    className="text-left py-3 px-4 font-semibold"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Chat normale
                  </th>
                  <th
                    className="text-left py-3 px-4 font-semibold"
                    style={{ color: 'var(--accent-primary)' }}
                  >
                    Code Interpreter
                  </th>
                </tr>
              </thead>
              <tbody>
                {ciComparisons.map((row) => (
                  <tr
                    key={row.aspect}
                    style={{ borderBottom: '1px solid var(--border-subtle)' }}
                  >
                    <td
                      className="py-3 px-4 font-medium"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {row.aspect}
                    </td>
                    <td
                      className="py-3 px-4"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {row.chatNormale}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className="inline-flex items-center gap-1.5 font-medium"
                        style={{ color: 'var(--accent-primary)' }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {row.codeInterpreter}
                      </span>
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
