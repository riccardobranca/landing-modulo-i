import { AnimatedSection } from '@/components/AnimatedSection';
import BasicsSection from '@/components/BasicsSection';
import IntegratedAISection from '@/components/IntegratedAISection';
import FormulaSection from '@/components/FormulaSection';
import AnalysisSection from '@/components/AnalysisSection';
import CleaningSection from '@/components/CleaningSection';
import VisualizationSection from '@/components/VisualizationSection';
import ExerciseSection from '@/components/ExerciseSection';
import DigitizationSection from '@/components/DigitizationSection';
import FormsSection from '@/components/FormsSection';

export default function ModuloI() {
  return (
    <main className="gradient-mesh min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <p className="text-sm font-mono text-[var(--accent-primary)] mb-4">MODULO I</p>
            <h1 className="heading-hero mb-6">
              Excel e <span className="text-gradient">Dati</span> con l&apos;AI
            </h1>
            <p className="body-large text-[var(--text-secondary)] max-w-2xl mx-auto">
              L&apos;AI ha trasformato Excel da &quot;foglio che fa paura&quot; a strumento
              accessibile. E ora vive anche dentro i fogli: Gemini in Sheets,
              Copilot in Excel, e non solo.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* TL;DR */}
      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="quote-block">
              <strong>TL;DR</strong> — Non dovete piu memorizzare sintassi di formule: dovete
              saper descrivere cosa volete, e l&apos;AI scrive le formule per voi. E ora l&apos;AI
              non vive piu solo in ChatGPT: e integrata direttamente in Google Sheets, Excel e Canva.
              Questo modulo vi insegna a generare formule, pulire dati sporchi,
              analizzare dataset, creare visualizzazioni efficaci, e sfruttare l&apos;AI ovunque sia.
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="section-divider max-w-xl my-12" />

      {/* I.1 - AI e dati: le basi */}
      <section id="basi" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="mb-12">
            <p className="text-sm font-mono text-[var(--accent-primary)] mb-2">I.1</p>
            <h2 className="heading-section mb-4">AI e dati: le basi</h2>
            <p className="body-large text-[var(--text-secondary)] max-w-2xl">
              Cosa puo fare l&apos;AI con i vostri dati, come caricarli,
              e perche la privacy e fondamentale.
            </p>
          </AnimatedSection>
          <BasicsSection />
        </div>
      </section>

      <div className="section-divider max-w-xl my-4" />

      {/* I.1.5 - AI integrata nei fogli */}
      <section id="ai-integrata" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="mb-12">
            <p className="text-sm font-mono text-[var(--accent-primary)] mb-2">I.1.5</p>
            <h2 className="heading-section mb-4">AI integrata nei fogli di calcolo</h2>
            <p className="body-large text-[var(--text-secondary)] max-w-2xl">
              L&apos;AI non vive piu solo in ChatGPT: e entrata direttamente
              dentro Google Sheets, Excel e Canva. Non dovete piu uscire dal foglio.
            </p>
          </AnimatedSection>
          <IntegratedAISection />
        </div>
      </section>

      <div className="section-divider max-w-xl my-4" />

      {/* I.2 - Formule e funzioni */}
      <section id="formule" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="mb-12">
            <p className="text-sm font-mono text-[var(--accent-primary)] mb-2">I.2</p>
            <h2 className="heading-section mb-4">Formule e funzioni</h2>
            <p className="body-large text-[var(--text-secondary)] max-w-2xl">
              Descrivete cosa volete in italiano, l&apos;AI scrive la formula.
              Il cuore del nuovo modo di lavorare con Excel.
            </p>
          </AnimatedSection>
          <FormulaSection />
        </div>
      </section>

      <div className="section-divider max-w-xl my-4" />

      {/* I.3 - Analisi dati */}
      <section id="analisi" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="mb-12">
            <p className="text-sm font-mono text-[var(--accent-primary)] mb-2">I.3</p>
            <h2 className="heading-section mb-4">Analisi dati</h2>
            <p className="body-large text-[var(--text-secondary)] max-w-2xl">
              Caricare un dataset, farsi guidare dall&apos;AI, trovare pattern
              e rispondere a domande in linguaggio naturale.
            </p>
          </AnimatedSection>
          <AnalysisSection />
        </div>
      </section>

      <div className="section-divider max-w-xl my-4" />

      {/* I.4 - Pulizia e preparazione dati */}
      <section id="pulizia" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="mb-12">
            <p className="text-sm font-mono text-[var(--accent-primary)] mb-2">I.4</p>
            <h2 className="heading-section mb-4">Pulizia e preparazione dati</h2>
            <p className="body-large text-[var(--text-secondary)] max-w-2xl">
              &quot;Garbage in, garbage out&quot; — pulire i dati e il lavoro
              meno glamour ma piu importante. L&apos;AI lo rende molto piu veloce.
            </p>
          </AnimatedSection>
          <CleaningSection />
        </div>
      </section>

      <div className="section-divider max-w-xl my-4" />

      {/* I.5 - Visualizzazione */}
      <section id="grafici" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="mb-12">
            <p className="text-sm font-mono text-[var(--accent-primary)] mb-2">I.5</p>
            <h2 className="heading-section mb-4">Visualizzazione</h2>
            <p className="body-large text-[var(--text-secondary)] max-w-2xl">
              Il grafico giusto racconta una storia.
              Il grafico sbagliato confonde. Partiamo dalla domanda, non dal grafico.
            </p>
          </AnimatedSection>
          <VisualizationSection />
        </div>
      </section>

      <div className="section-divider max-w-xl my-4" />

      {/* I.6 - Esercizio analisi mercato lavoro */}
      <section id="esercizio" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="mb-12">
            <p className="text-sm font-mono text-[var(--accent-primary)] mb-2">I.6</p>
            <h2 className="heading-section mb-4">Esercizio: analisi mercato lavoro</h2>
            <p className="body-large text-[var(--text-secondary)] max-w-2xl">
              Un esercizio pratico che combina tutte le competenze del modulo
              per un&apos;analisi rilevante alla vostra ricerca di lavoro.
            </p>
          </AnimatedSection>
          <ExerciseSection />
        </div>
      </section>

      <div className="section-divider max-w-xl my-4" />

      {/* I.7 - Dal cartaceo al digitale */}
      <section id="digitale" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="mb-12">
            <p className="text-sm font-mono text-[var(--accent-primary)] mb-2">I.7</p>
            <h2 className="heading-section mb-4">Dal cartaceo al digitale</h2>
            <p className="body-large text-[var(--text-secondary)] max-w-2xl">
              I dati che vi servono non sono sempre in un file Excel.
              L&apos;AI puo digitalizzare ricevute, tabelle stampate e PDF.
            </p>
          </AnimatedSection>
          <DigitizationSection />
        </div>
      </section>

      <div className="section-divider max-w-xl my-4" />

      {/* I.8 - Forms e raccolta dati */}
      <section id="forms" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="mb-12">
            <p className="text-sm font-mono text-[var(--accent-primary)] mb-2">I.8</p>
            <h2 className="heading-section mb-4">Forms e raccolta dati</h2>
            <p className="body-large text-[var(--text-secondary)] max-w-2xl">
              Form per raccogliere, Excel per analizzare.
              Mai un foglio condiviso per raccogliere risposte.
            </p>
          </AnimatedSection>
          <FormsSection />
        </div>
      </section>

      {/* Key Takeaways */}
      <section className="py-16 px-6 bg-[var(--bg-elevated)]">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <h2 className="heading-subsection mb-8">Key Takeaways</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { n: '1', text: 'Non memorizzate, descrivete — L\'AI scrive le formule se sapete spiegare cosa volete' },
                { n: '2', text: 'L\'AI e anche dentro il foglio — Gemini in Sheets, Copilot in Excel: non serve piu uscire dal foglio' },
                { n: '3', text: 'Data Analysis esegue davvero — Non e chat: fa calcoli reali e genera file' },
                { n: '4', text: 'Privacy prima di tutto — Mai caricare dati sensibili su AI cloud' },
                { n: '5', text: 'Flash Fill (Ctrl+E) — Il vostro strumento segreto per trasformazioni ripetitive' },
                { n: '6', text: 'Garbage in, garbage out — Pulite sempre i dati prima di analizzarli' },
                { n: '7', text: 'Il grafico giusto racconta una storia — Prima il messaggio, poi il tipo di grafico' },
                { n: '8', text: 'Verificate sempre — Con gli agenti AI che agiscono da soli, la verifica e ancora piu importante' },
                { n: '9', text: 'L\'AI crea fogli da zero — ChatGPT e Claude generano file Excel completi su richiesta' },
                { n: '10', text: 'Form > Excel condiviso — Per raccogliere dati, usate sempre un form' },
              ].map((item) => (
                <div key={item.n} className="glass-card p-4 flex gap-3">
                  <span
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold"
                    style={{ background: 'rgba(249, 115, 22, 0.1)', color: 'var(--accent-primary)' }}
                  >
                    {item.n}
                  </span>
                  <p className="text-sm text-[var(--text-secondary)]">{item.text}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <h2 className="heading-subsection mb-6">Per approfondire</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="glass-card p-5">
                <h4 className="font-semibold mb-3 text-[var(--accent-primary)]">Guide e formule</h4>
                <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                  <li>
                    &bull;{' '}
                    <a href="https://support.google.com/docs" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-primary)] hover:underline">
                      Google Sheets
                    </a>{' '}
                    — Guida ufficiale
                  </li>
                  <li>
                    &bull;{' '}
                    <a href="https://support.microsoft.com/excel" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-primary)] hover:underline">
                      Microsoft Excel
                    </a>{' '}
                    — Guida ufficiale
                  </li>
                  <li>
                    &bull;{' '}
                    <a href="https://exceljet.net" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-primary)] hover:underline">
                      Exceljet
                    </a>{' '}
                    — Database formule con esempi
                  </li>
                </ul>
              </div>

              <div className="glass-card p-5">
                <h4 className="font-semibold mb-3 text-[var(--accent-primary)]">AI nei fogli</h4>
                <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                  <li>
                    &bull;{' '}
                    <a href="https://gemini.google.com/students" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-primary)] hover:underline">
                      Gemini per studenti
                    </a>{' '}
                    — AI Pro gratis 1 anno
                  </li>
                  <li>
                    &bull;{' '}
                    <a href="https://rows.com" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-primary)] hover:underline">
                      Rows.com
                    </a>{' '}
                    — Foglio con AI (tier gratuito)
                  </li>
                  <li>
                    &bull;{' '}
                    <a href="https://canva.com/sheets" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-primary)] hover:underline">
                      Canva Sheets
                    </a>{' '}
                    — Dati + design + Bulk Create
                  </li>
                </ul>
              </div>

              <div className="glass-card p-5">
                <h4 className="font-semibold mb-3 text-[var(--color-success)]">Mercato lavoro</h4>
                <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                  <li>
                    &bull;{' '}
                    <a href="https://glassdoor.it" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-primary)] hover:underline">
                      Glassdoor
                    </a>{' '}
                    — Stipendi e recensioni aziende
                  </li>
                  <li>
                    &bull;{' '}
                    <a href="https://linkedin.com/salary" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-primary)] hover:underline">
                      LinkedIn Salary
                    </a>{' '}
                    — Range per posizione
                  </li>
                  <li>
                    &bull;{' '}
                    <a href="https://it.indeed.com/salaries" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-primary)] hover:underline">
                      Indeed Salaries
                    </a>{' '}
                    — Medie per ruolo
                  </li>
                </ul>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[var(--border-subtle)]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-[var(--text-muted)] mb-4">Fine Modulo I</p>
          <p className="text-[var(--text-secondary)]">
            Prossimo modulo: <strong>J — Automazioni, agenti e creazione</strong>
          </p>
        </div>
      </footer>
    </main>
  );
}
