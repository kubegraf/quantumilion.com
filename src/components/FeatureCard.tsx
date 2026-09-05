import type { ReactNode } from "react";

/* One card, six small technical drawings.
 *
 * Every drawing is inline SVG on the same 220x64 grid with the same stroke
 * weight, so the six read as one set. They are aria-hidden: each one restates
 * what the card's text already says, and a screen reader does not need it
 * twice. No icon fonts, no illustrations, no clip art. */

const VIEW = "0 0 220 64";
const S = { stroke: "currentColor", strokeWidth: 1.4, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" } as const;

function Frame({ children }: { children: ReactNode }) {
  return (
    <svg viewBox={VIEW} className="h-16 w-full text-ink-3" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet">
      {children}
    </svg>
  );
}

/** Commits on a branch flowing into a built image. */
export const VisDeploy = () => (
  <Frame>
    <path d="M14 20h58" {...S} opacity=".5" />
    {[14, 34, 54, 72].map((x) => (
      <circle key={x} cx={x} cy={20} r={3.2} {...S} fill="var(--raised)" />
    ))}
    <path d="M72 20h22c6 0 10 5 10 12" {...S} opacity=".5" />
    <rect x="96" y="34" width="46" height="22" rx="4" {...S} />
    <path d="M104 45h10M104 41h20M104 49h14" stroke="currentColor" strokeWidth="1.4" opacity=".55" strokeLinecap="round" />
    <path d="M142 45h20" {...S} strokeDasharray="3 4" />
    <rect x="164" y="33" width="42" height="24" rx="5" stroke="var(--accent)" strokeWidth="1.6" fill="var(--accent-soft)" />
    <path d="m176 45 5 5 9-10" stroke="var(--accent)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </Frame>
);

/** A core grid, with the right-sized allocation boxed off. */
export const VisCompute = () => (
  <Frame>
    {Array.from({ length: 24 }).map((_, i) => {
      const col = i % 12;
      const row = Math.floor(i / 12);
      const used = col < 5;
      return (
        <rect
          key={i}
          x={14 + col * 16}
          y={16 + row * 18}
          width={12}
          height={13}
          rx={2.5}
          fill={used ? "var(--accent-soft)" : "none"}
          stroke={used ? "var(--accent)" : "currentColor"}
          strokeWidth={1.3}
          opacity={used ? 1 : 0.45}
        />
      );
    })}
    <rect x="10" y="12" width="82" height="41" rx="6" stroke="var(--accent)" strokeWidth="1.3" fill="none" strokeDasharray="4 4" opacity=".8" />
  </Frame>
);

/** A database, object storage and a volume, sharing one bus. */
export const VisData = () => (
  <Frame>
    <ellipse cx="38" cy="18" rx="22" ry="7" {...S} />
    <path d="M16 18v22c0 3.9 9.8 7 22 7s22-3.1 22-7V18M16 29c0 3.9 9.8 7 22 7s22-3.1 22-7" {...S} />
    <path d="M62 32h20" {...S} opacity=".5" />
    <rect x="84" y="14" width="38" height="16" rx="3.5" {...S} />
    <rect x="84" y="34" width="38" height="16" rx="3.5" {...S} />
    <path d="M122 22h16v10h16" {...S} opacity=".5" />
    <rect x="154" y="20" width="52" height="24" rx="5" stroke="var(--accent)" strokeWidth="1.6" fill="var(--accent-soft)" />
    <path d="M164 32h14" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
    <path d="M182 32h14" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" opacity=".35" />
  </Frame>
);

/** A private route from the edge, through TLS, to two application nodes. */
export const VisNetwork = () => (
  <Frame>
    <circle cx="20" cy="32" r={8} {...S} />
    <path d="M28 32h34" {...S} strokeDasharray="3 4" />
    <rect x="62" y="20" width="34" height="24" rx="6" stroke="var(--accent)" strokeWidth="1.6" fill="var(--accent-soft)" />
    <path d="M74 32v-3.5a5 5 0 0 1 10 0V32" stroke="var(--accent)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <rect x="73" y="31" width="12" height="8" rx="2" stroke="var(--accent)" strokeWidth="1.5" fill="none" />
    <path d="M96 32h24l14-12h20M120 32l14 12h20" {...S} opacity=".6" />
    <rect x="156" y="8" width="50" height="20" rx="4" {...S} />
    <rect x="156" y="36" width="50" height="20" rx="4" {...S} />
  </Frame>
);

/** A latency sparkline with the anomaly picked out. */
export const VisObserve = () => (
  <Frame>
    <path d="M14 52h192" {...S} opacity=".35" />
    <path d="M14 44 34 40l18 6 18-9 18 5 18-14 18 9 18-4 18 12 18-7 12 3" {...S} opacity=".55" />
    <path d="M14 30h192" stroke="currentColor" strokeWidth="1" strokeDasharray="3 5" opacity=".3" />
    <path d="M122 22 140 31 158 27" stroke="var(--accent)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="122" cy="22" r="3.4" fill="var(--accent)" />
  </Frame>
);

/** A replica count being changed, and the resulting latency drop. */
export const VisOperate = () => (
  <Frame>
    {[0, 1, 2].map((i) => (
      <rect key={i} x={16 + i * 16} y={22} width={12} height={20} rx={2.5} {...S} opacity=".55" />
    ))}
    <path d="M70 32h16" {...S} strokeDasharray="3 4" />
    {[0, 1, 2, 3].map((i) => (
      <rect
        key={i}
        x={94 + i * 16}
        y={22}
        width={12}
        height={20}
        rx={2.5}
        stroke="var(--accent)"
        strokeWidth={1.5}
        fill={i === 3 ? "var(--accent-soft)" : "none"}
      />
    ))}
    <path d="M164 42c8 0 8-20 16-20" stroke="var(--accent)" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M158 46h48" {...S} opacity=".35" />
  </Frame>
);

export function FeatureCard({
  n,
  title,
  body,
  detail,
  visual,
  delay = 0,
}: {
  n: string;
  title: string;
  body: string;
  detail: readonly string[];
  visual: ReactNode;
  delay?: number;
}) {
  return (
    <div
      className="card group relative flex h-full flex-col overflow-hidden p-5 transition-colors duration-300 hover:border-accent-line sm:p-6"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-[10.5px] tracking-[0.2em] text-accent-text">{n}</span>
        <h3 className="text-[19px] font-semibold text-ink">{title}</h3>
      </div>

      <p className="mt-2.5 text-[14.5px] leading-[1.6] text-ink-2">{body}</p>

      <div className="mt-5 rounded-xl border border-line bg-surface px-3 py-2 transition-colors duration-300 group-hover:border-line-strong">
        {visual}
      </div>

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {detail.map((d) => (
          <li key={d} className="rounded-md border border-line bg-surface px-2 py-1 font-mono text-[10.5px] text-ink-3">
            {d}
          </li>
        ))}
      </ul>
    </div>
  );
}
