import { ILLUSTRATIVE } from "../content/site";
import { useInView } from "../lib/hooks";
import { Mock, Reveal, Section, SectionHead, Status } from "./ui/Primitives";

/* The infrastructure graph.
 *
 * This section exists to make one argument visually: Quantumilion holds the
 * whole system, not a list of resources. So the drawing is a real graph with
 * real edges, and the traffic animates ALONG those edges — a resource list
 * cannot show you that the worker and the API share a cache.
 *
 * The Compute node is drawn as a dashed enclosure rather than as another box,
 * because compute is not a peer of the API and the worker. It is what they run
 * on, and a flat box would say otherwise. */

type Node = { id: string; x: number; y: number; label: string; kind: "edge" | "app" | "svc" | "data" };

const NODES: Node[] = [
  { id: "net", x: 74, y: 200, label: "Network", kind: "edge" },
  { id: "app", x: 236, y: 200, label: "Application", kind: "app" },
  { id: "api", x: 412, y: 118, label: "API", kind: "svc" },
  { id: "worker", x: 412, y: 288, label: "Worker", kind: "svc" },
  { id: "pg", x: 600, y: 66, label: "PostgreSQL", kind: "data" },
  { id: "redis", x: 600, y: 190, label: "Redis", kind: "data" },
  { id: "obj", x: 600, y: 314, label: "Object storage", kind: "data" },
];

const EDGES: Array<[string, string, boolean]> = [
  // [from, to, carries live request traffic]
  ["net", "app", true],
  ["app", "api", true],
  ["app", "worker", false],
  ["api", "pg", true],
  ["api", "redis", true],
  ["worker", "redis", false],
  ["worker", "obj", false],
];

const W = 132;
const H = 42;
const byId = (id: string) => NODES.find((n) => n.id === id)!;

/** Edge from the right face of `a` to the left face of `b`, as a flat cubic so
 *  the curve leaves and arrives horizontally. */
function edgePath(a: Node, b: Node) {
  const x1 = a.x + W / 2;
  const x2 = b.x - W / 2;
  const dx = Math.max(28, (x2 - x1) * 0.55);
  return `M${x1} ${a.y} C${x1 + dx} ${a.y}, ${x2 - dx} ${b.y}, ${x2} ${b.y}`;
}

export function InfraGraph() {
  const { ref, seen } = useInView<HTMLDivElement>("-8% 0px -8% 0px");

  return (
    <Section id="infrastructure" className="border-t border-line">
      <div className="shell">
        <SectionHead
          n="06"
          eyebrow="Topology"
          title="Your infrastructure as a connected system."
          lede="Quantumilion builds a live graph of what runs, what it depends on and what traffic moves between them. That graph is what lets it answer questions about the system rather than about a single resource."
        />

        <Reveal className="mt-12">
          <div ref={ref}>
            <Mock title="quantumilion / graph · production" right={<Status tone="ok">7 nodes healthy</Status>}>
              {/* The graph needs about 640px to stay readable. Below that it
                  scrolls inside its own container rather than shrinking the
                  labels to nothing or making the page scroll sideways. */}
              <div className="overflow-x-auto">
                <svg
                  viewBox="0 0 700 400"
                  className="h-auto w-full min-w-[640px]"
                  role="img"
                  aria-label="Topology: the network reaches the application, which fans out to an API and a worker running on shared compute. The API uses PostgreSQL and Redis. The worker uses Redis and object storage."
                >
                  {/* Compute enclosure. Dashed, behind everything, labelled once. */}
                  <rect
                    x={412 - W / 2 - 26}
                    y={70}
                    width={W + 52}
                    height={266}
                    rx={18}
                    fill="none"
                    stroke="var(--line-strong)"
                    strokeWidth="1.2"
                    strokeDasharray="5 6"
                  />
                  <text
                    x={412}
                    y={58}
                    textAnchor="middle"
                    fill="var(--ink-3)"
                    fontSize="11"
                    fontFamily="GeistMono, monospace"
                    letterSpacing="1.6"
                  >
                    COMPUTE
                  </text>

                  {/* Edges, then the traffic that runs on them. */}
                  {EDGES.map(([from, to, live], ei) => {
                    const d = edgePath(byId(from), byId(to));
                    return (
                      <g key={`${from}-${to}`}>
                        <path d={d} fill="none" stroke="var(--line-strong)" strokeWidth="1.3" />
                        {seen && (
                          <path
                            d={d}
                            fill="none"
                            stroke={live ? "var(--accent)" : "var(--ink-3)"}
                            strokeWidth={live ? 2 : 1.6}
                            strokeLinecap="round"
                            strokeDasharray="5 19"
                            className="animate-flow"
                            // Deterministic stagger. Math.random() here would
                            // re-roll on every render and restart the animation.
                            style={{ animationDelay: `${(ei % 4) * 0.28}s`, opacity: live ? 0.95 : 0.5 }}
                          />
                        )}
                      </g>
                    );
                  })}

                  {/* Nodes last, so an edge never draws over a label. */}
                  {NODES.map((n) => {
                    const accent = n.kind === "app";
                    return (
                      <g key={n.id}>
                        <rect
                          x={n.x - W / 2}
                          y={n.y - H / 2}
                          width={W}
                          height={H}
                          rx={10}
                          fill={accent ? "var(--accent-soft)" : "var(--surface)"}
                          stroke={accent ? "var(--accent)" : "var(--line-strong)"}
                          strokeWidth="1.3"
                        />
                        <circle
                          cx={n.x - W / 2 + 16}
                          cy={n.y}
                          r="3.4"
                          fill={n.kind === "data" ? "var(--ok)" : accent ? "var(--accent)" : "var(--ink-3)"}
                        />
                        <text
                          x={n.x - W / 2 + 28}
                          y={n.y + 4.5}
                          fill={accent ? "var(--accent-text)" : "var(--ink)"}
                          fontSize="13"
                          fontFamily="Geist, sans-serif"
                          fontWeight={accent ? 600 : 500}
                        >
                          {n.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line bg-surface px-4 py-3 sm:px-5">
                {[
                  { c: "bg-accent", t: "Request path" },
                  { c: "bg-ink-3", t: "Background work" },
                  { c: "bg-ok", t: "Stateful" },
                ].map((l) => (
                  <span key={l.t} className="flex items-center gap-2 font-mono text-[10.5px] text-ink-3">
                    <i aria-hidden="true" className={`block h-1.5 w-1.5 rounded-full ${l.c}`} />
                    {l.t}
                  </span>
                ))}
                <span className="ml-auto font-mono text-[10.5px] text-ink-3">Updated continuously</span>
              </div>
            </Mock>
            <p className="mt-3 text-center font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-3">{ILLUSTRATIVE}</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
