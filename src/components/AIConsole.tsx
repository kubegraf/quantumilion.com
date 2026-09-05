import { ILLUSTRATIVE } from "../content/site";
import { useInView, useSequence } from "../lib/hooks";
import { Mock, Status } from "./ui/Primitives";
import { IconArrow, IconCheck, IconSpark } from "./Icons";

/* The AI console.
 *
 * The point of this mock is that it is NOT a chat bubble. A chat bubble would
 * put Quantumilion in the same category as every assistant that explains your
 * infrastructure back to you. What makes it a product is the structure under
 * the answer: the evidence it read, the numbers it read them from, the change
 * it proposes as a diff, the expected effect, and an approval gate.
 *
 * The gate is deliberate and it is the honest part of the design. The AI
 * proposes; a person approves. Anything that can be applied without approval is
 * governed by a policy, not by a chat message. */

const EVIDENCE = ["metrics", "logs", "traces", "topology", "deploy history"] as const;

/* Reveal order: the question, the thinking line, the evidence, the finding,
 * the numbers, the recommendation, then the actions. Seven steps, so the final
 * one resolves at i === 6. */
const STEPS = 7;

export function AIConsole() {
  const { ref, seen } = useInView<HTMLDivElement>("-8% 0px -8% 0px");
  const i = useSequence(seen, STEPS, 560);
  const at = (n: number) => i >= n;

  return (
    <div ref={ref}>
      <Mock
        title="quantumilion / assistant · api-service"
        right={<Status tone={at(6) ? "accent" : "muted"}>{at(6) ? "Awaiting approval" : "Analysing"}</Status>}
      >
        <div className="divide-y divide-line">
          {/* ── The question ───────────────────────────────────────── */}
          <div className="flex items-start gap-3 px-4 py-4 sm:px-5">
            <span className="mt-px flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-line bg-surface font-mono text-[10px] text-ink-3">
              You
            </span>
            <p className="text-[15px] font-medium text-ink">Why is the API getting slower?</p>
          </div>

          {/* ── The answer ─────────────────────────────────────────── */}
          <div className="flex items-start gap-3 px-4 py-4 sm:px-5">
            <span className="mt-px flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-accent-soft text-accent-text">
              <IconSpark size={13} />
            </span>

            <div className="min-w-0 flex-1 space-y-4">
              {/* What it read. A claim with no sources is a guess. */}
              <div
                className="flex flex-wrap items-center gap-1.5 transition-opacity duration-500"
                style={{ opacity: at(1) ? 1 : 0 }}
              >
                <span className="label">Read</span>
                {EVIDENCE.map((e, n) => (
                  <span
                    key={e}
                    className="rounded-md border border-line bg-surface px-1.5 py-0.5 font-mono text-[10.5px] text-ink-3 transition-opacity duration-300"
                    style={{ opacity: at(2) || n === 0 ? 1 : 0.25 }}
                  >
                    {e}
                  </span>
                ))}
              </div>

              <p
                className="text-[15px] leading-[1.6] text-ink transition-opacity duration-500"
                style={{ opacity: at(3) ? 1 : 0 }}
              >
                I traced the increase in latency to database connection saturation. Requests are queuing for a
                connection before any query runs.
              </p>

              {/* Current vs recommended, side by side. The diff is the product. */}
              <div
                className="grid gap-3 transition-opacity duration-500 sm:grid-cols-2"
                style={{ opacity: at(4) ? 1 : 0 }}
              >
                <div className="rounded-xl border border-line bg-surface p-3">
                  <div className="label">Current</div>
                  <dl className="mt-2.5 space-y-2.5">
                    <div>
                      <div className="flex items-baseline justify-between gap-2">
                        <dt className="text-[12.5px] text-ink-2">Database connections</dt>
                        <dd className="font-mono text-[12.5px] font-medium tabular-nums text-warn">91%</dd>
                      </div>
                      <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-line">
                        <i
                          className="block h-full rounded-full bg-warn transition-[width] duration-700 ease-out"
                          style={{ width: at(4) ? "91%" : "0%" }}
                        />
                      </div>
                    </div>
                    <div className="flex items-baseline justify-between gap-2">
                      <dt className="text-[12.5px] text-ink-2">API replicas</dt>
                      <dd className="font-mono text-[12.5px] font-medium tabular-nums text-ink">3</dd>
                    </div>
                  </dl>
                </div>

                <div
                  className="rounded-xl border border-accent-line bg-accent-soft p-3 transition-opacity duration-500"
                  style={{ opacity: at(5) ? 1 : 0 }}
                >
                  <div className="label text-accent-text">Recommended</div>
                  <ul className="mt-2.5 space-y-2 font-mono text-[12px]">
                    <li className="flex items-center justify-between gap-2 text-ink-2">
                      <span>pool_size</span>
                      <span className="tabular-nums">
                        <span className="text-ink-3 line-through">20</span>
                        <span className="px-1 text-ink-3">→</span>
                        <span className="font-medium text-accent-text">40</span>
                      </span>
                    </li>
                    <li className="flex items-center justify-between gap-2 text-ink-2">
                      <span>replicas</span>
                      <span className="tabular-nums">
                        <span className="text-ink-3 line-through">3</span>
                        <span className="px-1 text-ink-3">→</span>
                        <span className="font-medium text-accent-text">4</span>
                      </span>
                    </li>
                  </ul>
                  <div className="mt-3 flex items-center gap-2 border-t border-accent-line pt-2.5">
                    <IconCheck size={13} className="shrink-0 text-ok" />
                    <span className="text-[12.5px] text-ink-2">
                      Projected impact <span className="font-mono font-medium text-ok">−32% p95 latency</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* ── The approval gate ────────────────────────────────── */}
              <div
                className="flex flex-col gap-2 transition-opacity duration-500 sm:flex-row sm:items-center"
                style={{ opacity: at(6) ? 1 : 0 }}
              >
                <button type="button" className="btn-secondary btn-sm" disabled={!at(6)}>
                  Review changes
                </button>
                <button type="button" className="btn-primary btn-sm" disabled={!at(6)}>
                  Apply changes
                  <IconArrow size={14} />
                </button>
                <span className="font-mono text-[10.5px] text-ink-3 sm:ml-1">
                  Recorded in the audit log either way
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Prompt line. Non-interactive on purpose: this is a drawing of the
            product, and a text box that does nothing is worse than no text box. */}
        <div className="flex items-center gap-2.5 border-t border-line bg-surface px-4 py-3 sm:px-5" aria-hidden="true">
          <span className="font-mono text-[12px] text-accent-text">›</span>
          <span className="font-mono text-[12px] text-ink-3">Ask about your infrastructure</span>
          <span className="ml-0.5 inline-block h-3.5 w-[1.5px] bg-accent animate-caret" />
        </div>
      </Mock>

      <p className="mt-3 text-center font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-3">{ILLUSTRATIVE}</p>
    </div>
  );
}
