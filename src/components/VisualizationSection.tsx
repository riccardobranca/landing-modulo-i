'use client';
import { useState } from 'react';
import { AnimatedSection } from '@/components/AnimatedSection';

/* ------------------------------------------------------------------ */
/*  Chart type data                                                    */
/* ------------------------------------------------------------------ */

type ChartType =
  | 'trend'
  | 'confronto'
  | 'parti'
  | 'correlazione'
  | 'distribuzione';

interface ChartInfo {
  id: ChartType;
  label: string;
  title: string;
  description: string;
  whenToUse: string;
}

const chartTypes: ChartInfo[] = [
  {
    id: 'trend',
    label: 'Trend nel tempo',
    title: 'Grafico a linee',
    description:
      "Mostra l'andamento di un valore nel tempo. Asse X = tempo, Asse Y = valore.",
    whenToUse: 'Vendite mensili, crescita utenti, temperature.',
  },
  {
    id: 'confronto',
    label: 'Confronto categorie',
    title: 'Grafico a barre/colonne',
    description: 'Confronta valori tra categorie diverse.',
    whenToUse:
      'Vendite per regione, performance per team, budget per dipartimento.',
  },
  {
    id: 'parti',
    label: 'Parti di un tutto',
    title: 'Grafico a torta',
    description:
      'Mostra come un totale si divide in parti. Massimo 5-6 fette!',
    whenToUse:
      'Quota di mercato, distribuzione budget, composizione portfolio.',
  },
  {
    id: 'correlazione',
    label: 'Correlazione',
    title: 'Grafico a dispersione (scatter)',
    description: 'Mostra se due variabili sono correlate.',
    whenToUse: 'Prezzo vs vendite, eta vs stipendio, ore studio vs voto.',
  },
  {
    id: 'distribuzione',
    label: 'Distribuzione',
    title: 'Istogramma',
    description: 'Mostra come i valori si distribuiscono in fasce.',
    whenToUse: 'Distribuzione stipendi, eta clienti, tempi di risposta.',
  },
];

/* ------------------------------------------------------------------ */
/*  Common mistakes data                                               */
/* ------------------------------------------------------------------ */

const mistakes = [
  {
    title: 'Torta con troppe fette',
    detail: 'Piu di 6 categorie? Usate barre.',
  },
  {
    title: 'Asse Y che non parte da zero',
    detail: 'Distorce le proporzioni.',
  },
  {
    title: 'Troppi colori senza significato',
    detail: 'Il colore deve codificare informazione, non decorare.',
  },
  {
    title: 'Grafico 3D',
    detail: 'Quasi sempre peggiora la leggibilita.',
  },
  {
    title: 'Troppe linee',
    detail: '"Piatto di spaghetti" — impossibile da leggere.',
  },
];

/* ------------------------------------------------------------------ */
/*  SVG Chart illustrations                                            */
/* ------------------------------------------------------------------ */

function LineChartSVG() {
  return (
    <svg
      viewBox="0 0 280 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: 280, height: 'auto' }}
    >
      {/* Grid lines */}
      <line x1="40" y1="30" x2="260" y2="30" stroke="#737373" strokeWidth="0.5" strokeDasharray="4 4" />
      <line x1="40" y1="65" x2="260" y2="65" stroke="#737373" strokeWidth="0.5" strokeDasharray="4 4" />
      <line x1="40" y1="100" x2="260" y2="100" stroke="#737373" strokeWidth="0.5" strokeDasharray="4 4" />
      <line x1="40" y1="135" x2="260" y2="135" stroke="#737373" strokeWidth="0.5" strokeDasharray="4 4" />

      {/* Axes */}
      <line x1="40" y1="170" x2="260" y2="170" stroke="#737373" strokeWidth="1.5" />
      <line x1="40" y1="30" x2="40" y2="170" stroke="#737373" strokeWidth="1.5" />

      {/* Area fill */}
      <polygon
        points="60,140 100,120 140,100 180,70 220,55 240,45 240,170 60,170"
        fill="rgba(249,115,22,0.12)"
      />

      {/* Line */}
      <polyline
        points="60,140 100,120 140,100 180,70 220,55 240,45"
        stroke="#f97316"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Data points */}
      <circle cx="60" cy="140" r="4" fill="#f97316" />
      <circle cx="100" cy="120" r="4" fill="#f97316" />
      <circle cx="140" cy="100" r="4" fill="#f97316" />
      <circle cx="180" cy="70" r="4" fill="#f97316" />
      <circle cx="220" cy="55" r="4" fill="#f97316" />
      <circle cx="240" cy="45" r="4" fill="#f97316" />

      {/* Axis labels */}
      <text x="60" y="185" fill="#737373" fontSize="10" textAnchor="middle">Gen</text>
      <text x="100" y="185" fill="#737373" fontSize="10" textAnchor="middle">Feb</text>
      <text x="140" y="185" fill="#737373" fontSize="10" textAnchor="middle">Mar</text>
      <text x="180" y="185" fill="#737373" fontSize="10" textAnchor="middle">Apr</text>
      <text x="220" y="185" fill="#737373" fontSize="10" textAnchor="middle">Mag</text>
      <text x="240" y="185" fill="#737373" fontSize="10" textAnchor="middle">Giu</text>
    </svg>
  );
}

function BarChartSVG() {
  const bars = [
    { x: 60, h: 100 },
    { x: 100, h: 130 },
    { x: 140, h: 80 },
    { x: 180, h: 110 },
    { x: 220, h: 60 },
  ];
  const labels = ['Nord', 'Centro', 'Sud', 'Est', 'Ovest'];

  return (
    <svg
      viewBox="0 0 280 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: 280, height: 'auto' }}
    >
      {/* Grid lines */}
      <line x1="40" y1="30" x2="260" y2="30" stroke="#737373" strokeWidth="0.5" strokeDasharray="4 4" />
      <line x1="40" y1="65" x2="260" y2="65" stroke="#737373" strokeWidth="0.5" strokeDasharray="4 4" />
      <line x1="40" y1="100" x2="260" y2="100" stroke="#737373" strokeWidth="0.5" strokeDasharray="4 4" />
      <line x1="40" y1="135" x2="260" y2="135" stroke="#737373" strokeWidth="0.5" strokeDasharray="4 4" />

      {/* Axes */}
      <line x1="40" y1="170" x2="260" y2="170" stroke="#737373" strokeWidth="1.5" />
      <line x1="40" y1="30" x2="40" y2="170" stroke="#737373" strokeWidth="1.5" />

      {/* Bars */}
      {bars.map((bar, i) => (
        <g key={labels[i]}>
          <rect
            x={bar.x - 14}
            y={170 - bar.h}
            width="28"
            height={bar.h}
            rx="3"
            fill="rgba(249,115,22,0.3)"
            stroke="#f97316"
            strokeWidth="1.5"
          />
          <text
            x={bar.x}
            y={185}
            fill="#737373"
            fontSize="10"
            textAnchor="middle"
          >
            {labels[i]}
          </text>
        </g>
      ))}
    </svg>
  );
}

function PieChartSVG() {
  // Slices as SVG arcs (approximations for visual clarity)
  // 5 slices: 30%, 25%, 20%, 15%, 10%
  const cx = 140;
  const cy = 95;
  const r = 70;

  function polarToCartesian(angle: number) {
    const rad = ((angle - 90) * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  }

  function describeArc(startAngle: number, endAngle: number) {
    const start = polarToCartesian(endAngle);
    const end = polarToCartesian(startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
  }

  const slices = [
    { pct: 30, color: '#f97316', start: 0 },
    { pct: 25, color: '#fb923c', start: 108 },
    { pct: 20, color: '#fdba74', start: 198 },
    { pct: 15, color: '#fed7aa', start: 270 },
    { pct: 10, color: '#ffedd5', start: 324 },
  ];

  return (
    <svg
      viewBox="0 0 280 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: 280, height: 'auto' }}
    >
      {slices.map((slice, i) => {
        const endAngle = slice.start + (slice.pct / 100) * 360;
        return (
          <path
            key={i}
            d={describeArc(slice.start, endAngle)}
            fill={slice.color}
            stroke="white"
            strokeWidth="2"
          />
        );
      })}

      {/* Legend */}
      {slices.map((slice, i) => {
        const labels = ['30%', '25%', '20%', '15%', '10%'];
        return (
          <g key={`legend-${i}`}>
            <rect
              x={20}
              y={175 - i * 16}
              width={10}
              height={10}
              rx={2}
              fill={slice.color}
            />
            <text
              x={34}
              y={184 - i * 16}
              fill="#737373"
              fontSize="9"
            >
              {labels[i]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function ScatterChartSVG() {
  const points = [
    { x: 60, y: 140 },
    { x: 75, y: 128 },
    { x: 90, y: 135 },
    { x: 105, y: 115 },
    { x: 115, y: 120 },
    { x: 130, y: 105 },
    { x: 140, y: 110 },
    { x: 155, y: 95 },
    { x: 165, y: 100 },
    { x: 175, y: 85 },
    { x: 190, y: 80 },
    { x: 200, y: 75 },
    { x: 215, y: 65 },
    { x: 230, y: 55 },
    { x: 245, y: 50 },
  ];

  return (
    <svg
      viewBox="0 0 280 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: 280, height: 'auto' }}
    >
      {/* Grid lines */}
      <line x1="40" y1="30" x2="260" y2="30" stroke="#737373" strokeWidth="0.5" strokeDasharray="4 4" />
      <line x1="40" y1="65" x2="260" y2="65" stroke="#737373" strokeWidth="0.5" strokeDasharray="4 4" />
      <line x1="40" y1="100" x2="260" y2="100" stroke="#737373" strokeWidth="0.5" strokeDasharray="4 4" />
      <line x1="40" y1="135" x2="260" y2="135" stroke="#737373" strokeWidth="0.5" strokeDasharray="4 4" />

      {/* Axes */}
      <line x1="40" y1="170" x2="260" y2="170" stroke="#737373" strokeWidth="1.5" />
      <line x1="40" y1="30" x2="40" y2="170" stroke="#737373" strokeWidth="1.5" />

      {/* Trend line */}
      <line
        x1="55"
        y1="145"
        x2="250"
        y2="45"
        stroke="#f97316"
        strokeWidth="1.5"
        strokeDasharray="6 3"
        opacity="0.6"
      />

      {/* Data points */}
      {points.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="4"
          fill="rgba(249,115,22,0.4)"
          stroke="#f97316"
          strokeWidth="1.5"
        />
      ))}
    </svg>
  );
}

function HistogramSVG() {
  // Adjacent bars (no gaps) with varying heights
  const bars = [
    { h: 30 },
    { h: 55 },
    { h: 90 },
    { h: 130 },
    { h: 110 },
    { h: 75 },
    { h: 50 },
    { h: 25 },
    { h: 15 },
  ];
  const barWidth = 24;
  const startX = 42;

  return (
    <svg
      viewBox="0 0 280 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: 280, height: 'auto' }}
    >
      {/* Grid lines */}
      <line x1="40" y1="30" x2="260" y2="30" stroke="#737373" strokeWidth="0.5" strokeDasharray="4 4" />
      <line x1="40" y1="65" x2="260" y2="65" stroke="#737373" strokeWidth="0.5" strokeDasharray="4 4" />
      <line x1="40" y1="100" x2="260" y2="100" stroke="#737373" strokeWidth="0.5" strokeDasharray="4 4" />
      <line x1="40" y1="135" x2="260" y2="135" stroke="#737373" strokeWidth="0.5" strokeDasharray="4 4" />

      {/* Axes */}
      <line x1="40" y1="170" x2="260" y2="170" stroke="#737373" strokeWidth="1.5" />
      <line x1="40" y1="30" x2="40" y2="170" stroke="#737373" strokeWidth="1.5" />

      {/* Bars (adjacent, no gaps) */}
      {bars.map((bar, i) => (
        <rect
          key={i}
          x={startX + i * barWidth}
          y={170 - bar.h}
          width={barWidth}
          height={bar.h}
          fill="rgba(249,115,22,0.3)"
          stroke="#f97316"
          strokeWidth="1"
        />
      ))}

      {/* Bell curve overlay hint */}
      <path
        d="M 54 170 Q 80 160 104 120 Q 130 55 150 40 Q 170 55 196 120 Q 220 160 246 170"
        stroke="#f97316"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

const chartSVGs: Record<ChartType, React.ReactNode> = {
  trend: <LineChartSVG />,
  confronto: <BarChartSVG />,
  parti: <PieChartSVG />,
  correlazione: <ScatterChartSVG />,
  distribuzione: <HistogramSVG />,
};

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

function AlertTriangleIcon() {
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
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function XCircleIcon() {
  return (
    <svg
      width="16"
      height="16"
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

function MessageSquareIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  );
}

function LightbulbIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function VisualizationSection() {
  const [activeChart, setActiveChart] = useState<ChartType>('trend');

  const activeData = chartTypes.find((c) => c.id === activeChart)!;

  return (
    <div className="space-y-12">
      {/* ── Interactive Chart Picker ──────────────────────────────── */}
      <AnimatedSection>
        <div className="glass-card p-6 md:p-8">
          <h3
            className="heading-subsection mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            Quale grafico usare?
          </h3>

          {/* Tab buttons */}
          <div className="flex flex-wrap gap-2 mb-8">
            {chartTypes.map((chart) => (
              <button
                key={chart.id}
                onClick={() => setActiveChart(chart.id)}
                className="tab-button"
                style={
                  activeChart === chart.id
                    ? {
                        background: 'var(--bg-surface)',
                        color: 'var(--accent-primary)',
                        borderColor: 'var(--accent-primary)',
                        boxShadow: '0 2px 8px rgba(249, 115, 22, 0.15)',
                      }
                    : undefined
                }
              >
                {chart.label}
              </button>
            ))}
          </div>

          {/* Chart display: SVG left, text right */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* SVG illustration */}
            <div
              className="flex items-center justify-center p-4 rounded-xl"
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              {chartSVGs[activeChart]}
            </div>

            {/* Explanation */}
            <div>
              <h4
                className="text-xl font-semibold mb-3"
                style={{ color: 'var(--accent-primary)' }}
              >
                {activeData.title}
              </h4>
              <p
                className="leading-relaxed mb-4"
                style={{ color: 'var(--text-secondary)' }}
              >
                {activeData.description}
              </p>
              <div
                className="p-4 rounded-xl"
                style={{
                  background: 'rgba(249, 115, 22, 0.06)',
                  border: '1px solid rgba(249, 115, 22, 0.15)',
                }}
              >
                <p
                  className="text-sm font-semibold mb-1"
                  style={{ color: 'var(--accent-primary)' }}
                >
                  Quando usarlo:
                </p>
                <p
                  className="text-sm"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {activeData.whenToUse}
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ── Common Mistakes ──────────────────────────────────────── */}
      <AnimatedSection>
        <div className="error-card">
          <div className="flex items-center gap-3 mb-5">
            <span style={{ color: 'var(--color-error)' }}>
              <AlertTriangleIcon />
            </span>
            <h4
              className="font-bold text-lg"
              style={{ color: 'var(--color-error)' }}
            >
              Errori comuni da evitare
            </h4>
          </div>

          <ul className="space-y-3">
            {mistakes.map((m) => (
              <li key={m.title} className="flex gap-2.5 items-start">
                <span
                  className="shrink-0 mt-0.5"
                  style={{ color: 'var(--color-error)' }}
                >
                  <XCircleIcon />
                </span>
                <div>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {m.title}
                  </span>
                  <span
                    className="text-sm"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {' '}
                    — {m.detail}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </AnimatedSection>

      {/* ── AI Prompt for Charts ─────────────────────────────────── */}
      <AnimatedSection>
        <div className="glass-card p-6 md:p-8">
          <div className="flex items-center gap-3 mb-5">
            <span
              className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: 'rgba(249, 115, 22, 0.08)',
                color: 'var(--accent-primary)',
                border: '1px solid rgba(249, 115, 22, 0.15)',
              }}
            >
              <MessageSquareIcon />
            </span>
            <h4
              className="font-semibold text-lg"
              style={{ color: 'var(--text-primary)' }}
            >
              Prompt per generare grafici con AI
            </h4>
          </div>

          <div
            className="code-block mb-5"
            style={{ color: 'var(--text-secondary)' }}
          >
            Crea un grafico a linee che mostri l&apos;andamento delle vendite
            mensili. Asse X: mesi, Asse Y: vendite in euro. Titolo:
            &quot;Vendite 2024&quot;. Aggiungi linea di trend.
          </div>

          <div
            className="flex gap-2.5 items-start p-4 rounded-xl"
            style={{
              background: 'rgba(249, 115, 22, 0.06)',
              border: '1px solid rgba(249, 115, 22, 0.15)',
            }}
          >
            <span
              className="shrink-0 mt-0.5"
              style={{ color: 'var(--accent-primary)' }}
            >
              <LightbulbIcon />
            </span>
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              <strong style={{ color: 'var(--text-primary)' }}>
                Con Code Interpreter,
              </strong>{' '}
              ChatGPT genera il grafico e lo rende scaricabile.
            </p>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
