import { BEFORE } from "../content/site";
import { Reveal, Section, SectionHead, Ticks } from "./ui/Primitives";
import { IconArrow } from "./Icons";

/* The before/after. The whole argument of the page is the difference in shape
 * between these two panels, so they are drawn rather than described.
 *
 * The fan of lines on the left is one SVG with preserveAspectRatio="none". It
 * stretches with the panel, which distorts angles but leaves straight lines
 * straight — exactly what an abstract connector needs, and far cheaper than
 * measuring element positions in JavaScript on every resize. */

export function Problem() {
  return (
    <Section id="problem">
      <div className="shell">
        <SectionHead
          n="01"
          eyebrow="The problem"
          title="Infrastructure is still too manual."
          lede="Shipping one application means assembling cloud infrastructure, containers, Kubernetes, databases, storage, networking, monitoring, deployments, scaling and cost management. Every one of those is a separate tool with its own model of the world, and the developer is the integration layer between them."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-2 lg:gap-6">
          {/* ── Before ─────────────────────────────────────────────── */}
          <Reveal>
            <div className="card relative h-full p-5 sm:p-7">
              <div className="flex items-center justify-between">
                <span className="eyebrow">Before</span>
                <span className="chip border-line text-ink-3">8 surfaces</span>
              </div>

              {/* Three columns, so the fan gets a cell of its own. Absolutely
                  positioning it over the gap needed a magic number for the width
                  of the "Developer" box, and that number was wrong at every
                  breakpoint. A real column cannot drift. */}
              <div className="mt-7 grid grid-cols-[auto_36px_1fr] items-center sm:grid-cols-[auto_52px_1fr]">
                <div className="rounded-xl border border-line-strong bg-surface px-3 py-2.5 text-center">
                  <div className="text-[13px] font-medium text-ink">Developer</div>
                </div>

                {/* preserveAspectRatio="none" stretches the fan to whatever the
                    cell ends up being. Angles distort; straight lines stay
                    straight, which is all an abstract connector needs. */}
                <svg
                  aria-hidden="true"
                  className="h-full w-full self-stretch"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  {[6, 19, 31, 44, 56, 69, 81, 94].map((y) => (
                    <line key={y} x1="0" y1="50" x2="100" y2={y} stroke="var(--line-strong)" strokeWidth="0.7" vectorEffect="non-scaling-stroke" />
                  ))}
                </svg>

                <ul className="grid grid-cols-2 gap-1.5">
                  {BEFORE.map((tool) => (
                    <li
                      key={tool}
                      className="rounded-lg border border-line bg-surface px-2.5 py-2 font-mono text-[11px] text-ink-2"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-7 border-t border-line pt-5 text-[14px] leading-relaxed text-ink-3">
                Eight places to configure, eight places to debug, and no single view of how they add up.
              </p>
            </div>
          </Reveal>

          {/* ── After ──────────────────────────────────────────────── */}
          <Reveal delay={90}>
            <div className="card relative h-full overflow-hidden p-5 sm:p-7" style={{ boxShadow: "var(--shadow-glow)" }}>
              <Ticks />
              <div className="flex items-center justify-between">
                <span className="eyebrow text-accent-text">After</span>
                <span className="chip border-accent-line text-accent-text">1 control plane</span>
              </div>

              <div className="mt-7 flex flex-col items-stretch gap-2.5 sm:flex-row sm:items-center">
                <div className="flex-1 rounded-xl border border-line-strong bg-surface px-3 py-3.5 text-center">
                  <div className="text-[13px] font-medium text-ink">Developer</div>
                </div>
                <IconArrow size={16} className="mx-auto shrink-0 rotate-90 text-ink-3 sm:rotate-0" />
                <div className="flex-1 rounded-xl border border-accent-line bg-accent-soft px-3 py-3.5 text-center">
                  <div className="text-[13px] font-semibold text-accent-text">Quantumilion</div>
                </div>
                <IconArrow size={16} className="mx-auto shrink-0 rotate-90 text-ink-3 sm:rotate-0" />
                <div className="flex-1 rounded-xl border border-line-strong bg-surface px-3 py-3.5 text-center">
                  <div className="text-[13px] font-medium text-ink">Infrastructure</div>
                </div>
              </div>

              <ul className="mt-6 grid gap-1.5 sm:grid-cols-2">
                {["Build and deploy", "Compute and scaling", "Data and storage", "Network and TLS", "Logs, metrics, traces", "Cost and optimisation"].map(
                  (x) => (
                    <li key={x} className="rounded-lg border border-line bg-surface px-2.5 py-2 font-mono text-[11px] text-ink-2">
                      {x}
                    </li>
                  ),
                )}
              </ul>

              <p className="mt-7 border-t border-line pt-5 text-[14px] leading-relaxed text-ink-2">
                One intelligent control layer that provisions the infrastructure, runs the workloads and keeps
                operating them after they ship.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
