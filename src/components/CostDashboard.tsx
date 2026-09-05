import { ILLUSTRATIVE } from "../content/site";
import { useInView } from "../lib/hooks";
import { Mock, Reveal, Section, SectionHead, Status } from "./ui/Primitives";
import { IconArrow, IconSpark } from "./Icons";

/* Cost intelligence.
 *
 * The bar widths and the total are derived from ONE array. A dashboard where
 * the segments and the total are typed separately is a dashboard that goes
 * inconsistent the first time someone edits a number, and an inconsistent cost
 * table is worse than no cost table. */

const LINES = [
  { name: "Compute", amount: 412.4, tone: "var(--series-1)" },
  { name: "Database", amount: 168.0, tone: "var(--series-2)" },
  { name: "Storage", amount: 46.2, tone: "var(--series-3)" },
  { name: "Network", amount: 28.8, tone: "var(--series-4)" },
  { name: "AI", amount: 19.6, tone: "var(--series-5)" },
];

const TOTAL = LINES.reduce((s, l) => s + l.amount, 0);
const money = (n: number) => `$${n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

export function CostDashboard() {
  const { ref, seen } = useInView<HTMLDivElement>("-8% 0px -8% 0px");

  return (
    <Section id="cost" className="border-t border-line">
      <div className="shell">
        <SectionHead
          n="07"
          eyebrow="Cost intelligence"
          title="Know what your infrastructure costs. Before the bill arrives."
          lede="Cost is a signal Quantumilion reads continuously, alongside CPU and latency. It is attributed per workload, so an over-provisioned service is a line you can act on rather than a surprise at the end of the month."
        />

        <Reveal className="mt-12">
          <div ref={ref} className="grid gap-5 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <Mock title="quantumilion / cost · this month" right={<Status tone="muted">Projected</Status>}>
                <div className="p-4 sm:p-5">
                  {/* One stacked bar, then the breakdown. Same data, twice, so
                      the proportions and the numbers can never disagree. */}
                  <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-line" role="presentation">
                    {LINES.map((l) => (
                      <i
                        key={l.name}
                        className="block h-full transition-[width] duration-700 ease-out"
                        style={{ width: seen ? `${(l.amount / TOTAL) * 100}%` : "0%", background: l.tone }}
                      />
                    ))}
                  </div>

                  <dl className="mt-5 space-y-0">
                    {LINES.map((l) => (
                      <div key={l.name} className="flex items-center gap-3 border-b border-line py-2.5">
                        <i aria-hidden="true" className="block h-2 w-2 shrink-0 rounded-sm" style={{ background: l.tone }} />
                        <dt className="text-[13.5px] text-ink-2">{l.name}</dt>
                        <dd className="ml-auto font-mono text-[13px] tabular-nums text-ink">{money(l.amount)}</dd>
                        <dd className="w-12 text-right font-mono text-[11px] tabular-nums text-ink-3">
                          {Math.round((l.amount / TOTAL) * 100)}%
                        </dd>
                      </div>
                    ))}
                    <div className="flex items-center gap-3 pt-3.5">
                      <dt className="text-[14px] font-semibold text-ink">Total</dt>
                      <dd className="ml-auto font-mono text-[17px] font-semibold tabular-nums text-ink">{money(TOTAL)}</dd>
                      <dd className="w-12" />
                    </div>
                  </dl>
                </div>
              </Mock>
            </div>

            <div className="lg:col-span-2">
              <div className="card flex h-full flex-col p-5" style={{ boxShadow: "var(--shadow-glow)" }}>
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent-text">
                  <IconSpark size={16} />
                </span>
                <div className="mt-4 label text-accent-text">Optimisation insight</div>

                <p className="mt-2.5 text-[19px] font-semibold leading-snug text-ink">
                  3 workloads are over-provisioned.
                </p>

                <ul className="mt-4 space-y-1.5">
                  {[
                    ["api-service", "2.0 → 1.4 vCPU"],
                    ["worker-jobs", "4 GiB → 2 GiB"],
                    ["media-resize", "3 → 2 replicas"],
                  ].map(([svc, change]) => (
                    <li
                      key={svc}
                      className="flex items-center justify-between gap-2 rounded-lg border border-line bg-surface px-2.5 py-2 font-mono text-[11.5px]"
                    >
                      <span className="truncate text-ink-2">{svc}</span>
                      <span className="shrink-0 text-accent-text">{change}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 rounded-xl border border-accent-line bg-accent-soft px-3.5 py-3">
                  <div className="label text-accent-text">Potential monthly saving</div>
                  <div className="mt-0.5 font-mono text-[24px] font-semibold tabular-nums text-accent-text">$184</div>
                </div>

                <a href="#start" className="btn-primary mt-5 w-full">
                  Optimise infrastructure
                  <IconArrow size={15} />
                </a>
                <p className="mt-3 text-center font-mono text-[10.5px] text-ink-3">Nothing changes until you approve it</p>
              </div>
            </div>
          </div>
          <p className="mt-3 text-center font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-3">{ILLUSTRATIVE}</p>
        </Reveal>
      </div>
    </Section>
  );
}
