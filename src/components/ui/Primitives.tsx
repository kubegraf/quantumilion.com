import type { ReactNode } from "react";
import { useInView } from "../../lib/hooks";

/* The building blocks every section is assembled from. Section rhythm, heading
 * scale and mock chrome are defined ONCE here. A section that hand-rolls its
 * own padding or its own heading size is the thing that makes a long page look
 * like several different pages stitched together. */

/** A page section. `n` is the two-digit index shown in the eyebrow rail — the
 *  engineering-drawing detail that carries through the whole page. */
export function Section({
  id,
  children,
  className = "",
  tight = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tight?: boolean;
}) {
  return (
    <section id={id} className={`relative ${tight ? "py-16 sm:py-20" : "py-20 sm:py-28 lg:py-32"} ${className}`}>
      {children}
    </section>
  );
}

/** Fades and lifts its children in the first time they reach the viewport.
 *  `delay` staggers a grid without giving every card its own observer. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, seen } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: seen ? 1 : 0,
        transform: seen ? "none" : "translateY(16px)",
        transition: `opacity .6s cubic-bezier(.22,.61,.36,1) ${delay}ms, transform .6s cubic-bezier(.22,.61,.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export function SectionHead({
  n,
  eyebrow,
  title,
  lede,
  align = "left",
  className = "",
}: {
  n?: string;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const centred = align === "center";
  return (
    <Reveal className={`${centred ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      <div className={`flex items-center gap-3 ${centred ? "justify-center" : ""}`}>
        {n && <span className="font-mono text-[10.5px] tracking-[0.2em] text-accent-text">{n}</span>}
        <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <h2 className="mt-5 text-[clamp(1.9rem,4.4vw,3.1rem)] font-semibold leading-[1.06] text-ink">{title}</h2>
      {lede && (
        <p className={`mt-5 max-w-prose text-[16.5px] leading-[1.65] text-ink-2 ${centred ? "mx-auto" : ""}`}>
          {lede}
        </p>
      )}
    </Reveal>
  );
}

/** Product-mock chrome. `title` sits in the bar as a mono path, the way a real
 *  console shows what you are looking at. */
export function Mock({
  title,
  children,
  className = "",
  right,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  right?: ReactNode;
}) {
  return (
    <div className={`mock ${className}`}>
      <div className="mock-bar">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="block h-2 w-2 rounded-full bg-line-strong" />
          <i className="block h-2 w-2 rounded-full bg-line-strong" />
          <i className="block h-2 w-2 rounded-full bg-line-strong" />
        </span>
        <span className="ml-1 truncate font-mono text-[11px] text-ink-3">{title}</span>
        <span className="ml-auto flex items-center gap-2">{right}</span>
      </div>
      {children}
    </div>
  );
}

/** A live-looking status pill. `tone` picks the token, so status colour is never
 *  hardcoded at a call site. */
export function Status({
  tone = "ok",
  children,
}: {
  tone?: "ok" | "warn" | "accent" | "muted";
  children: ReactNode;
}) {
  const map = {
    ok: "text-ok",
    warn: "text-warn",
    accent: "text-accent-text",
    muted: "text-ink-3",
  } as const;
  return (
    <span className={`inline-flex items-center gap-1.5 font-mono text-[11px] ${map[tone]}`}>
      <i className="block h-1.5 w-1.5 shrink-0 rounded-full bg-current animate-pulseDot" aria-hidden="true" />
      {children}
    </span>
  );
}

/** Corner ticks. Purely a blueprint detail, so it is aria-hidden and never
 *  carries meaning. */
export function Ticks() {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0">
      {[
        "left-0 top-0 border-l border-t",
        "right-0 top-0 border-r border-t",
        "left-0 bottom-0 border-l border-b",
        "right-0 bottom-0 border-r border-b",
      ].map((pos) => (
        <i key={pos} className={`absolute h-2.5 w-2.5 border-accent-line ${pos}`} />
      ))}
    </span>
  );
}

/** A labelled metric. Used by the hero signals and the cost dashboard so the
 *  two read as the same product surface. */
export function Metric({
  label,
  value,
  sub,
  tone,
}: {
  label: string;
  value: string;
  sub?: string;
  tone?: "ok" | "warn" | "accent";
}) {
  const toneClass = tone === "ok" ? "text-ok" : tone === "warn" ? "text-warn" : tone === "accent" ? "text-accent-text" : "text-ink";
  return (
    <div className="rounded-xl border border-line bg-surface px-3 py-2.5">
      <div className="label">{label}</div>
      <div className={`mt-1 font-mono text-[15px] font-medium tabular-nums ${toneClass}`}>{value}</div>
      {sub && <div className="mt-0.5 font-mono text-[10.5px] text-ink-3">{sub}</div>}
    </div>
  );
}
