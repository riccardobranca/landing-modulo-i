'use client';

import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface DigiMethod {
  id: string;
  title: string;
  description: string;
  howTo: string;
  bestFor: string;
  icon: React.ReactNode;
}

const methods: DigiMethod[] = [
  {
    id: 'photo-to-table',
    title: 'Foto di tabella stampata',
    description:
      'Fotografate una tabella stampata o scritta a mano e caricatela su ChatGPT, Claude o Gemini. L\'AI la converte in dati strutturati pronti per Excel.',
    howTo:
      '"Ecco la foto di una tabella. Convertila in formato CSV che posso incollare in Excel."',
    bestFor: 'Tabelle stampate, registri cartacei, listini prezzi.',
    icon: <CameraIcon />,
  },
  {
    id: 'pdf-extract',
    title: 'Estrazione da PDF',
    description:
      'I PDF contengono spesso tabelle che non si riescono a copiare. L\'AI puo estrarre i dati e strutturarli correttamente.',
    howTo:
      '"Estrai tutti i dati dalla tabella in questo PDF e organizzali in colonne: Nome, Data, Importo."',
    bestFor: 'Fatture, report, estratti conto, documenti ufficiali.',
    icon: <FileTextIcon />,
  },
  {
    id: 'receipt-scan',
    title: 'Scansione ricevute e scontrini',
    description:
      'Fotografate ricevute e scontrini per digitalizzare le spese. L\'AI estrae data, importo, esercente e categoria.',
    howTo:
      '"Ecco 5 foto di scontrini. Per ognuno estrai: data, esercente, importo totale, categoria di spesa."',
    bestFor: 'Note spese, contabilita personale, rimborsi.',
    icon: <ReceiptIcon />,
  },
];

interface ErrorType {
  type: string;
  description: string;
  fix: string;
}

const commonErrors: ErrorType[] = [
  {
    type: 'Colonne sfalsate',
    description: 'I dati finiscono nella colonna sbagliata',
    fix: 'Specificate il numero esatto di colonne e i nomi delle intestazioni',
  },
  {
    type: 'Numeri come testo',
    description: 'Excel tratta i numeri estratti come testo',
    fix: 'Chiedete formato numerico, oppure usate Dati > Testo in colonne',
  },
  {
    type: 'Date in formato errato',
    description: 'Le date non vengono riconosciute da Excel',
    fix: 'Specificate il formato data desiderato (es. GG/MM/AAAA)',
  },
  {
    type: 'Caratteri speciali',
    description: 'Accenti o simboli vengono storpiati',
    fix: 'Chiedete output in UTF-8 e verificate dopo import',
  },
];

/* ------------------------------------------------------------------ */
/*  Icons (SVG, no emoji)                                              */
/* ------------------------------------------------------------------ */

function CameraIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function FileTextIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function ReceiptIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 2v20l3-2 3 2 3-2 3 2 3-2 3 2V2l-3 2-3-2-3 2-3-2-3 2-3-2z" />
      <line x1="8" y1="8" x2="16" y2="8" />
      <line x1="8" y1="12" x2="16" y2="12" />
      <line x1="8" y1="16" x2="12" y2="16" />
    </svg>
  );
}

function AlertTriangleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function DigitizationSection() {
  return (
    <div className="space-y-10">

      {/* ── Three methods ──────────────────────────────────────── */}
      <StaggerContainer className="grid md:grid-cols-3 gap-6">
        {methods.map((method) => (
          <StaggerItem key={method.id}>
            <div className="glass-card p-6 h-full flex flex-col">
              <span
                className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{
                  background: 'rgba(249, 115, 22, 0.08)',
                  color: 'var(--accent-primary)',
                  border: '1px solid rgba(249, 115, 22, 0.15)',
                }}
              >
                {method.icon}
              </span>

              <h4
                className="font-semibold text-lg mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                {method.title}
              </h4>

              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: 'var(--text-secondary)' }}
              >
                {method.description}
              </p>

              {/* Prompt example */}
              <div
                className="rounded-lg p-3 mb-4 font-mono text-xs leading-relaxed"
                style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                }}
              >
                {method.howTo}
              </div>

              {/* Best for */}
              <div
                className="rounded-lg p-3 mt-auto"
                style={{
                  background: 'rgba(249, 115, 22, 0.05)',
                  border: '1px solid rgba(249, 115, 22, 0.12)',
                }}
              >
                <p className="text-xs font-semibold mb-0.5" style={{ color: 'var(--accent-primary)' }}>
                  Ideale per
                </p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {method.bestFor}
                </p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* ── Common Errors Table ────────────────────────────────── */}
      <AnimatedSection delay={0.1}>
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-5">
            <span style={{ color: 'var(--color-warning)' }}>
              <AlertTriangleIcon />
            </span>
            <h4
              className="font-semibold text-lg"
              style={{ color: 'var(--text-primary)' }}
            >
              Errori comuni nella digitalizzazione
            </h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-subtle)' }}>
                  <th
                    className="text-left py-2.5 px-3 font-semibold"
                    style={{ color: 'var(--text-muted)', width: '160px' }}
                  >
                    Problema
                  </th>
                  <th
                    className="text-left py-2.5 px-3 font-semibold"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Cosa succede
                  </th>
                  <th
                    className="text-left py-2.5 px-3 font-semibold"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Soluzione
                  </th>
                </tr>
              </thead>
              <tbody>
                {commonErrors.map((err, idx) => (
                  <tr
                    key={err.type}
                    style={{
                      borderBottom:
                        idx < commonErrors.length - 1
                          ? '1px solid var(--border-subtle)'
                          : 'none',
                    }}
                  >
                    <td
                      className="py-2.5 px-3 font-medium"
                      style={{ color: 'var(--accent-primary)' }}
                    >
                      {err.type}
                    </td>
                    <td
                      className="py-2.5 px-3"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {err.description}
                    </td>
                    <td
                      className="py-2.5 px-3"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {err.fix}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AnimatedSection>

      {/* ── Golden Rule ────────────────────────────────────────── */}
      <AnimatedSection delay={0.15}>
        <div className="success-card max-w-3xl mx-auto flex gap-4 items-start">
          <span
            className="shrink-0 mt-0.5"
            style={{ color: 'var(--color-success)' }}
          >
            <ShieldIcon />
          </span>
          <div className="space-y-1">
            <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
              Regola d&apos;oro
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Verificate <strong style={{ color: 'var(--text-primary)' }}>sempre</strong> i dati
              dopo la digitalizzazione. L&apos;AI e molto brava ma non infallibile:
              controllate numeri, date e totali prima di usare i dati per decisioni importanti.
            </p>
          </div>
        </div>
      </AnimatedSection>

    </div>
  );
}
