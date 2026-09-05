import { AUTONOMY_STAGES, ILLUSTRATIVE } from "../content/site";
import { useInView, useSequence } from "../lib/hooks";
import { Mock, Reveal, Section, SectionHead, Status } from "./ui/Primitives";

/* Autonomy, shown as a loop rather than as a list.
 *
 * The five stages are a cycle: what Optimise learns feeds the next Observe.
 * Drawing them as a straight line would say the process ends, which is exactly
 * the wrong idea — so the rail closes back on itself with a return edge.
 *
 * The chart underneath is the same story with real shapes: traffic rises, the
 * replica count follows it up, then follows it back down. Capacity coming back
 * DOWN is the half that most autoscaling stories quietly leave out, so it gets
 * the same weight as the scale-up. */

const EVENTS = [
  { t: "09:41", body: "Traffic increased 4.2x", tone: "warn" as const },
  { t: "09:41", body: "Capacity pressure detected", tone: "warn" as const },
  { t: "09:42", body: "Two replicas added", tone: "accent" as const },
  { t: "09:48", body: "Traffic stabilised", tone: "ok" as const },
  { t: "10:20", body: "Capacity reduced after demand dropped", tone: "ok" as const },
];

const TRAFFIC = "M8 122 L60 118 L96 112 L124 96 L146 58 L168 34 L206 28 L248 32 L286 44 L318 78 L352 106 L392 114";
const REPLICAS = "M8 132 L124 132 L124 104 L168 104 L168 88 L286 88 L286 104 L330 104 L330 132 L392 132";

export function Autonomy() {
  const { ref, seen } = useInView<HTMLDivElement>("-8% 0px -8% 0px");
  // 5 events + 1 settled state.
  const step = useSequence(seen, EVENTS.length + 1, 700);

  return (
    <Section id="autonomy" className="border-t border-line">
      <div className="shell">
        <SectionHead
          n="04"
          eyebrow="Autonomy"
          title="From infrastructure management to infrastructure autonomy."
          lede="Quantumilion learns how your workloads behave over time. The more it knows about the normal shape of your traffic and your resource use, the less of it you have to describe."
        />

        {/* ── The cycle ────────────────────────────────────────────── */}
        <Reveal className="mt-14">
          <ol className="relative grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {AUTONOMY_STAGES.map((s, i) => (
              <li key={s.name} className="relative">
                <div className="flex h-full flex-col rounded-2xl border border-line bg-raised p-4">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent-soft font-mono text-[10.5px] font-medium text-accent-text">
                      {i + 1}
                    </span>
                    <h3 className="text-[15px] font-semibold text-ink">{s.name}</h3>
                  </div>
                  <p className="mt-2.5 text-[13.5px] leading-[1.55] text-ink-2">{s.body}</p>
                </div>
                {/* Connector to the next card. Hidden on the last one and on the
                    wrap points, where it would point at nothing. */}
                {i < AUTONOMY_STAGES.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute right-[-13px] top-1/2 hidden h-px w-[13px] -translate-y-1/2 bg-line-strong lg:block"
                  />
                )}
              </li>
            ))}
          </ol>
          <p className="mt-4 flex items-center justify-center gap-2 font-mono text-[11px] text-ink-3">
            <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
            Optimise feeds the next Observe. The loop does not stop.
            <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
          </p>
        </Reveal>

        {/* ── The worked example ───────────────────────────────────── */}
        <Reveal delay={80} className="mt-12">
          <div ref={ref}>
            <Mock
              title="quantumilion / capacity · api-service"
              right={<Status tone={step >= EVENTS.length ? "ok" : "accent"}>{step >= EVENTS.length ? "Stable" : "Responding"}</Status>}
            >
              <div className="grid gap-px bg-line lg:grid-cols-5">
                <div className="bg-raised p-4 sm:p-5 lg:col-span-3">
                  <div className="mb-3 flex items-center gap-4">
                    <span className="flex items-center gap-1.5 font-mono text-[10.5px] text-ink-3">
                      <i aria-hidden="true" className="block h-[2px] w-4 rounded bg-ink-3" /> Requests
                    </span>
                    <span className="flex items-center gap-1.5 font-mono text-[10.5px] text-accent-text">
                      <i aria-hidden="true" className="block h-[2px] w-4 rounded bg-accent" /> Replicas
                    </span>
                  </div>

                  <svg viewBox="0 0 400 150" className="h-40 w-full sm:h-48" role="img" aria-label="Requests rise 4.2 times, replica count follows up and then back down as demand falls.">
                    {[26, 62, 98, 134].map((y) => (
                      <line key={y} x1="8" y1={y} x2="392" y2={y} stroke="var(--grid-line)" strokeWidth="1" />
                    ))}
                    {/* Traffic. Drawn in on entry via dashoffset. */}
                    <path
                      d={TRAFFIC}
                      fill="none"
                      stroke="var(--ink-3)"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        strokeDasharray: 900,
                        strokeDashoffset: seen ? 0 : 900,
                        transition: "stroke-dashoffset 2.2s cubic-bezier(.22,.61,.36,1)",
                      }}
                    />
                    {/* Replica count, as steps. It is the accent because it is
                        the thing the platform did, not the thing that happened. */}
                    <path
                      d={REPLICAS}
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        strokeDasharray: 900,
                        strokeDashoffset: seen ? 0 : 900,
                        transition: "stroke-dashoffset 2.6s cubic-bezier(.22,.61,.36,1) .3s",
                      }}
                    />
                    {[
                      { x: 124, label: "+1" },
                      { x: 168, label: "+1" },
                      { x: 286, label: "−1" },
                      { x: 330, label: "−1" },
                    ].map((m) => (
                      <g key={`${m.x}-${m.label}`} style={{ opacity: seen ? 1 : 0, transition: "opacity .6s ease-out 1.6s" }}>
                        <line x1={m.x} y1="18" x2={m.x} y2="140" stroke="var(--accent-line)" strokeWidth="1" strokeDasharray="3 4" />
                        <text x={m.x + 4} y="16" fill="var(--accent-text)" fontSize="10" fontFamily="GeistMono, monospace">
                          {m.label}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>

                <div className="bg-raised p-4 sm:p-5 lg:col-span-2">
                  <div className="label mb-3.5">Event log</div>
                  <ol className="space-y-0">
                    {EVENTS.map((e, i) => {
                      const on = step >= i;
                      const dot = e.tone === "warn" ? "bg-warn" : e.tone === "accent" ? "bg-accent" : "bg-ok";
                      return (
                        <li
                          key={e.body}
                          className="flex items-start gap-2.5 border-b border-line py-2.5 last:border-0 transition-opacity duration-500"
                          style={{ opacity: on ? 1 : 0.2 }}
                        >
                          <i aria-hidden="true" className={`mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
                          <span className="font-mono text-[10.5px] tabular-nums text-ink-3">{e.t}</span>
                          <span className="text-[12.5px] leading-snug text-ink-2">{e.body}</span>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>
            </Mock>
            <p className="mt-3 text-center font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-3">{ILLUSTRATIVE}</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
