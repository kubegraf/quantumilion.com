import { Reveal, Section, SectionHead, Ticks } from "./ui/Primitives";
import { Mark } from "./Mark";

/* "One control plane. Any infrastructure."
 *
 * The honest bit of this diagram is the status on each backend. Quantumilion is
 * not live on five clouds today, and drawing five identical connected boxes
 * would say that it is. Each target carries its own state instead, so the
 * diagram is a roadmap rather than a claim. */

const TARGETS = [
  { name: "AWS", state: "Supported" },
  { name: "GCP", state: "Planned" },
  { name: "Azure", state: "Planned" },
  { name: "Kubernetes", state: "Supported" },
  { name: "Dedicated", state: "Planned" },
] as const;

const LAYERS = [
  { name: "Intelligence", body: "Investigation, recommendation, autonomous action" },
  { name: "Orchestration", body: "Build, deploy, scale, schedule, reconcile" },
  { name: "Abstraction", body: "Compute, data, storage, network as one model" },
] as const;

export function Architecture() {
  return (
    <Section id="architecture" className="border-t border-line">
      <div className="shell">
        <SectionHead
          n="08"
          eyebrow="Architecture"
          title="One control plane. Any infrastructure."
          lede="Quantumilion is an abstraction layer with intelligence on top of it, not a cloud of its own. The control plane models compute, data, storage and networking once, then maps that model onto whichever backend you run."
          align="center"
        />

        <Reveal className="mx-auto mt-14 max-w-4xl">
          {/* Developers in, at the top. */}
          <div className="mx-auto w-full max-w-xs rounded-xl border border-line bg-raised px-4 py-3 text-center">
            <div className="text-[14px] font-medium text-ink">Developers and agents</div>
            <div className="mt-0.5 font-mono text-[10.5px] text-ink-3">Git · CLI · MCP · API · Dashboard</div>
          </div>

          <Connector />

          {/* The control plane. */}
          <div className="relative rounded-2xl border border-accent-line bg-raised p-5 sm:p-6" style={{ boxShadow: "var(--shadow-glow)" }}>
            <Ticks />
            <div className="flex items-center justify-center gap-2.5">
              <Mark size={22} className="text-accent-text" />
              <span className="text-[16px] font-semibold text-ink">Quantumilion control plane</span>
            </div>
            <div className="mt-5 grid gap-2.5 sm:grid-cols-3">
              {LAYERS.map((l) => (
                <div key={l.name} className="rounded-xl border border-line bg-surface px-3.5 py-3">
                  <div className="text-[13.5px] font-medium text-accent-text">{l.name}</div>
                  <div className="mt-1 text-[12px] leading-snug text-ink-3">{l.body}</div>
                </div>
              ))}
            </div>
          </div>

          <Connector fan />

          {/* Backends out, at the bottom. */}
          <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
            {TARGETS.map((t) => {
              const live = t.state === "Supported";
              return (
                <li
                  key={t.name}
                  className={`rounded-xl border px-3 py-3 text-center ${live ? "border-line-strong bg-raised" : "border-line bg-surface"}`}
                >
                  <div className={`text-[14px] font-medium ${live ? "text-ink" : "text-ink-3"}`}>{t.name}</div>
                  <div
                    className={`mt-1 font-mono text-[10px] uppercase tracking-[0.12em] ${live ? "text-ok" : "text-ink-3"}`}
                  >
                    {t.state}
                  </div>
                </li>
              );
            })}
          </ul>

          <p className="mx-auto mt-6 max-w-prose text-center text-[13.5px] leading-relaxed text-ink-3">
            Backend support is listed as it stands. Planned targets are on the roadmap and not available yet.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

/** The vertical rail between the three bands. `fan` splits it into five legs so
 *  the connection to the backend row reads as one-to-many. */
function Connector({ fan = false }: { fan?: boolean }) {
  if (!fan) {
    return <div aria-hidden="true" className="mx-auto my-4 h-8 w-px bg-line-strong" />;
  }
  return (
    <div aria-hidden="true" className="my-4 h-10">
      <svg viewBox="0 0 500 40" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true" focusable="false">
        <path d="M250 0v14" stroke="var(--line-strong)" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
        <path d="M50 14h400" stroke="var(--line-strong)" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
        {[50, 150, 250, 350, 450].map((x) => (
          <path key={x} d={`M${x} 14v26`} stroke="var(--line-strong)" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
    </div>
  );
}
