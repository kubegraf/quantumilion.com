import { useInView, useLoop, useSequence } from "../lib/hooks";
import { ILLUSTRATIVE } from "../content/site";
import { Metric, Mock, Status } from "./ui/Primitives";
import { IconCheck, IconSpark } from "./Icons";

/* The hero visual. Not a screenshot and not a stock image: a drawing of the
 * Quantumilion control plane, built from the same primitives as every other
 * mock on the page.
 *
 * It has three jobs, in this order:
 *   1. show the path a repository takes to become running infrastructure,
 *   2. show the signals the platform reads while it runs,
 *   3. show the platform ACTING on those signals without being asked.
 * The third one is the differentiator, so it gets the accent and the movement. */

const STAGES = [
  { name: "GitHub repository", meta: "acme/api-service · main" },
  { name: "Build", meta: "image 4f2a1c · 38s" },
  { name: "Compute", meta: "2 vCPU · 4 GiB" },
  { name: "Application", meta: "3 replicas · healthy" },
  { name: "Database", meta: "PostgreSQL 16 · primary" },
  { name: "Storage", meta: "objects · 40 GiB volume" },
] as const;

const DECISIONS = [
  { head: "CPU optimisation detected", body: "Request lowered 2.0 → 1.4 vCPU on api-service" },
  { head: "Replica count adjusted", body: "Scaled 3 → 4 on sustained request growth" },
  { head: "Projected monthly saving", body: "$184 across 3 over-provisioned workloads" },
] as const;

export function ControlPlane() {
  const { ref, seen } = useInView<HTMLDivElement>("-5% 0px -5% 0px");
  // 6 stages → steps = 6, so the last stage resolves at i === 5. Getting this
  // off by one leaves Storage permanently pending while the mock claims healthy.
  const step = useSequence(seen, STAGES.length, 620);
  const decision = useLoop(seen, DECISIONS.length, 3200);
  const done = step >= STAGES.length - 1;

  return (
    <div ref={ref}>
      <Mock
        title="quantumilion / control-plane"
        right={<Status tone={done ? "ok" : "accent"}>{done ? "Healthy" : "Reconciling"}</Status>}
      >
        <div className="grid gap-px bg-line lg:grid-cols-5">
          {/* ── Pipeline ─────────────────────────────────────────────── */}
          <div className="bg-raised p-4 sm:p-5 lg:col-span-3">
            <div className="label mb-4">Deployment path</div>
            <ol className="relative">
              {/* The rail sits behind the nodes and fills as the sequence runs.
                  Height rather than opacity, so reduced motion lands on a full
                  rail instead of a half-drawn one. */}
              <span aria-hidden="true" className="absolute left-[7px] top-3 bottom-3 w-px bg-line" />
              <span
                aria-hidden="true"
                className="absolute left-[7px] top-3 w-px bg-accent transition-[height] duration-500 ease-out"
                // The grey rail runs top-3 to bottom-3, so its full length is
                // (100% - 24px). The fill is that length scaled by progress.
                style={{ height: `calc((100% - 24px) * ${step / (STAGES.length - 1)})` }}
              />
              {STAGES.map((s, i) => {
                const active = i <= step;
                return (
                  <li key={s.name} className="relative flex items-center gap-3.5 py-[7px] pl-6">
                    <span
                      aria-hidden="true"
                      className={`absolute left-0 flex h-[15px] w-[15px] items-center justify-center rounded-full border transition-colors duration-300 ${
                        active ? "border-accent bg-accent text-on-accent" : "border-line-strong bg-raised"
                      }`}
                    >
                      {active && <IconCheck size={9} />}
                    </span>
                    <span
                      className={`text-[13.5px] font-medium transition-colors duration-300 ${
                        active ? "text-ink" : "text-ink-3"
                      }`}
                    >
                      {s.name}
                    </span>
                    <span className="ml-auto truncate pl-2 font-mono text-[11px] text-ink-3">{s.meta}</span>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* ── Signals ──────────────────────────────────────────────── */}
          <div className="bg-raised p-4 sm:p-5 lg:col-span-2">
            <div className="label mb-4">Signals</div>
            <div className="grid grid-cols-2 gap-2">
              <Metric label="CPU" value="61%" />
              <Metric label="Memory" value="48%" />
              <Metric label="Requests" value="12.4k" sub="per minute" />
              <Metric label="Latency" value="118ms" sub="p95" />
              <Metric label="Health" value="6/6" tone="ok" sub="checks passing" />
              <Metric label="Cost" value="$0.42" sub="per hour" />
            </div>
          </div>
        </div>

        {/* ── Autonomous decisions ───────────────────────────────────── */}
        <div className="border-t border-line bg-surface px-4 py-3.5 sm:px-5">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-accent-soft text-accent-text">
              <IconSpark size={14} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="label">Autonomous operations</div>
              {/* Fixed height: the three lines differ in length and a shifting
                  block under the mock is the sort of layout jump that reads as a
                  broken page rather than as motion. */}
              <div className="relative mt-1.5 h-[34px]">
                {DECISIONS.map((d, i) => (
                  <div
                    key={d.head}
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{ opacity: i === decision ? 1 : 0 }}
                    aria-hidden={i !== decision}
                  >
                    <div className="truncate text-[13.5px] font-medium text-ink">{d.head}</div>
                    <div className="truncate font-mono text-[11.5px] text-ink-3">{d.body}</div>
                  </div>
                ))}
              </div>
            </div>
            <span className="hidden shrink-0 items-center gap-1.5 sm:flex" aria-hidden="true">
              {DECISIONS.map((d, i) => (
                <i
                  key={d.head}
                  className={`block h-1 rounded-full transition-all duration-500 ${
                    i === decision ? "w-5 bg-accent" : "w-1 bg-line-strong"
                  }`}
                />
              ))}
            </span>
          </div>
        </div>
      </Mock>

      <p className="mt-3 text-center font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-3">
        {ILLUSTRATIVE}
      </p>
    </div>
  );
}
