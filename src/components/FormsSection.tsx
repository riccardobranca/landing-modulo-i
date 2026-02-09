'use client';

import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/AnimatedSection';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface ComparisonRow {
  aspect: string;
  form: string;
  excel: string;
}

const formVsExcel: ComparisonRow[] = [
  {
    aspect: 'Input dati',
    form: 'Controllato (menu, checkbox, validazione)',
    excel: 'Libero (chiunque scrive qualsiasi cosa)',
  },
  {
    aspect: 'Errori',
    form: 'Prevenuti dalla struttura',
    excel: 'Scoperti dopo, a danno fatto',
  },
  {
    aspect: 'Accesso simultaneo',
    form: 'Nessun conflitto',
    excel: 'Rischio sovrascrittura',
  },
  {
    aspect: 'Analisi',
    form: 'Dati gia puliti e pronti',
    excel: 'Spesso serve pulizia prima',
  },
  {
    aspect: 'Competenze richieste',
    form: 'Nessuna (compilare un form)',
    excel: 'Minime ma sufficienti a fare danni',
  },
];

interface PlatformInfo {
  name: string;
  description: string;
  strengths: string[];
}

const platforms: PlatformInfo[] = [
  {
    name: 'Google Forms',
    description: 'Gratuito, integrato con Google Sheets. Risposte vanno direttamente in un foglio.',
    strengths: ['Gratuito e illimitato', 'Risposte → Google Sheets automatico', 'Condivisione facile con link'],
  },
  {
    name: 'Microsoft Forms',
    description: 'Incluso in Microsoft 365. Si integra con Excel Online e Power Automate.',
    strengths: ['Incluso in Microsoft 365', 'Risposte → Excel Online', 'Branching logic avanzato'],
  },
];

interface QuestionType {
  type: string;
  whenToUse: string;
  example: string;
}

const questionTypes: QuestionType[] = [
  { type: 'Risposta breve', whenToUse: 'Nome, email, citta', example: 'Come ti chiami?' },
  { type: 'Paragrafo', whenToUse: 'Commenti, feedback libero', example: 'Descrivi la tua esperienza' },
  { type: 'Scelta multipla', whenToUse: 'Una sola risposta tra opzioni', example: 'Quanto sei soddisfatto? (1-5)' },
  { type: 'Caselle di controllo', whenToUse: 'Risposte multiple', example: 'Quali lingue parli?' },
  { type: 'Menu a tendina', whenToUse: 'Molte opzioni (regioni, categorie)', example: 'In quale regione vivi?' },
  { type: 'Scala lineare', whenToUse: 'Valutazioni numeriche', example: 'Da 1 a 10, quanto...' },
  { type: 'Data', whenToUse: 'Date specifiche', example: 'Data di nascita' },
];

const bestPractices = [
  'Usate sempre la validazione (email, numero, data) per prevenire errori',
  'Rendete obbligatori solo i campi essenziali',
  'Usate menu a tendina invece di risposte libere quando possibile',
  'Testate il form voi stessi prima di inviarlo',
  'Aggiungete una descrizione per le domande ambigue',
  'Usate le sezioni per form lunghi (max 5-7 domande per pagina)',
];

/* ------------------------------------------------------------------ */
/*  Icons (SVG, no emoji)                                              */
/* ------------------------------------------------------------------ */

function FormIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="7" y1="8" x2="17" y2="8" />
      <line x1="7" y1="12" x2="13" y2="12" />
      <line x1="7" y1="16" x2="15" y2="16" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function LightbulbIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function FormsSection() {
  return (
    <div className="space-y-10">

      {/* ── Form vs Excel Comparison ───────────────────────────── */}
      <AnimatedSection>
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-5">
            <span style={{ color: 'var(--accent-primary)' }}>
              <FormIcon />
            </span>
            <h4
              className="font-semibold text-lg"
              style={{ color: 'var(--text-primary)' }}
            >
              Form vs Excel condiviso: perche il form vince sempre
            </h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-subtle)' }}>
                  <th
                    className="text-left py-3 px-4 font-semibold"
                    style={{ color: 'var(--text-muted)', width: '180px' }}
                  >
                    Aspetto
                  </th>
                  <th
                    className="text-left py-3 px-4 font-semibold"
                    style={{ color: 'var(--color-success)' }}
                  >
                    <span className="flex items-center gap-1.5">
                      <CheckIcon /> Form
                    </span>
                  </th>
                  <th
                    className="text-left py-3 px-4 font-semibold"
                    style={{ color: 'var(--color-error)' }}
                  >
                    <span className="flex items-center gap-1.5">
                      <XIcon /> Excel condiviso
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {formVsExcel.map((row, idx) => (
                  <tr
                    key={row.aspect}
                    style={{
                      borderBottom:
                        idx < formVsExcel.length - 1
                          ? '1px solid var(--border-subtle)'
                          : 'none',
                    }}
                  >
                    <td
                      className="py-3 px-4 font-medium"
                      style={{ color: 'var(--accent-primary)' }}
                    >
                      {row.aspect}
                    </td>
                    <td
                      className="py-3 px-4"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {row.form}
                    </td>
                    <td
                      className="py-3 px-4"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {row.excel}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AnimatedSection>

      {/* ── Google Forms vs Microsoft Forms ─────────────────────── */}
      <StaggerContainer className="grid md:grid-cols-2 gap-6">
        {platforms.map((platform) => (
          <StaggerItem key={platform.name}>
            <div className="glass-card p-6 h-full">
              <h4
                className="font-semibold text-lg mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                {platform.name}
              </h4>
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: 'var(--text-secondary)' }}
              >
                {platform.description}
              </p>
              <ul className="space-y-2">
                {platform.strengths.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
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
                      {s}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* ── Question Types ──────────────────────────────────────── */}
      <AnimatedSection delay={0.1}>
        <div className="glass-card p-6">
          <h4
            className="font-semibold text-lg mb-5"
            style={{ color: 'var(--text-primary)' }}
          >
            Tipi di domanda disponibili
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-subtle)' }}>
                  <th
                    className="text-left py-2.5 px-3 font-semibold"
                    style={{ color: 'var(--text-muted)', width: '180px' }}
                  >
                    Tipo
                  </th>
                  <th
                    className="text-left py-2.5 px-3 font-semibold"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Quando usarlo
                  </th>
                  <th
                    className="text-left py-2.5 px-3 font-semibold"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Esempio
                  </th>
                </tr>
              </thead>
              <tbody>
                {questionTypes.map((q, idx) => (
                  <tr
                    key={q.type}
                    style={{
                      borderBottom:
                        idx < questionTypes.length - 1
                          ? '1px solid var(--border-subtle)'
                          : 'none',
                    }}
                  >
                    <td
                      className="py-2.5 px-3 font-medium"
                      style={{ color: 'var(--accent-primary)' }}
                    >
                      {q.type}
                    </td>
                    <td
                      className="py-2.5 px-3"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {q.whenToUse}
                    </td>
                    <td
                      className="py-2.5 px-3 font-mono text-xs"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {q.example}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AnimatedSection>

      {/* ── Best Practices ──────────────────────────────────────── */}
      <AnimatedSection delay={0.15}>
        <div className="success-card">
          <div className="flex items-center gap-3 mb-5">
            <span style={{ color: 'var(--color-success)' }}>
              <LightbulbIcon />
            </span>
            <h4
              className="font-semibold text-lg"
              style={{ color: 'var(--text-primary)' }}
            >
              Best practice per i form
            </h4>
          </div>

          <StaggerContainer className="grid sm:grid-cols-2 gap-3">
            {bestPractices.map((practice, idx) => (
              <StaggerItem key={idx}>
                <div className="flex items-start gap-2.5">
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
                    {practice}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </AnimatedSection>

    </div>
  );
}
