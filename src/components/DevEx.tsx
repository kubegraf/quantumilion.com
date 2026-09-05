import { useInView, useSequence } from "../lib/hooks";
import { Mock, Reveal, Section, SectionHead, Status } from "./ui/Primitives";
import { IconArrow, IconCheck, IconGithub, IconSpark, IconTerminal } from "./Icons";

/* Developer experience. Two mocks, because the two audiences reach the platform
 * in genuinely different ways: a person types the CLI, an agent calls the MCP
 * server. Showing only the terminal would miss half of what the product is. */

const LINES = [
  "Repository detected",
  "Build completed",
  "Infrastructure configured",
  "Database connected",
  "Deployment healthy",
] as const;

const SURFACES = [
  { name: "GitHub", note: "Push to deploy" },
  { name: "CLI", note: "Local and CI" },
  { name: "MCP", note: "AI agents" },
  { name: "API", note: "Programmatic" },
  { name: "Dashboard", note: "Visual control" },
] as const;

function Terminal() {
  const { ref, seen } = useInView<HTMLDivElement>("-8% 0px -8% 0px");
  // 1 command + 5 checks + 1 URL line = 7 steps, so the URL resolves at i === 6.
  const i = useSequence(seen, LINES.length + 2, 500);

  return (
    <div ref={ref} className="h-full">
      <Mock
        title="zsh · api-service"
        className="flex h-full flex-col"
        right={<Status tone={i >= 6 ? "ok" : "muted"}>{i >= 6 ? "Live" : "Deploying"}</Status>}
      >
        <div className="p-4 font-mono text-[12.5px] leading-[1.85] sm:p-5">
          <div className="flex gap-2">
            <span aria-hidden="true" className="select-none text-accent-text">
              $
            </span>
            <span className="text-ink">quantumilion deploy</span>
          </div>

          {LINES.map((l, n) => (
            <div
              key={l}
              className="flex items-center gap-2 transition-opacity duration-300"
              style={{ opacity: i >= n + 1 ? 1 : 0 }}
            >
              <IconCheck size={12} className="shrink-0 text-ok" />
              <span className="text-ink-2">{l}</span>
            </div>
          ))}

          <div
            className="mt-3 border-t border-line pt-3 transition-opacity duration-500"
            style={{ opacity: i >= LINES.length + 1 ? 1 : 0 }}
          >
            <div className="label">Live URL</div>
            <a href="#start" className="mt-1 block break-all text-[12.5px] text-accent-text underline-offset-4 hover:underline">
              https://api.example.quantumilion.app
            </a>
          </div>

          <div className="mt-3 flex gap-2" aria-hidden="true">
            <span className="select-none text-accent-text">$</span>
            <span className="inline-block h-3.5 w-[7px] bg-accent animate-caret" />
          </div>
        </div>

        {/* What the deploy actually produced. It balances this panel against the
            taller MCP one beside it, and it is the detail a developer looks for
            after a deploy: what shipped, where, and from which commit. */}
        <div
          className="mt-auto grid grid-cols-2 gap-px border-t border-line bg-line sm:grid-cols-4"
          style={{ opacity: i >= LINES.length + 1 ? 1 : 0, transition: "opacity .5s ease-out" }}
        >
          {[
            ["Region", "eu-north-1"],
            ["Image", "4f2a1c"],
            ["Commit", "a91e0f2"],
            ["Duration", "38s"],
          ].map(([k, v]) => (
            <div key={k} className="bg-surface px-3 py-2.5">
              <div className="label">{k}</div>
              <div className="mt-0.5 font-mono text-[11.5px] text-ink-2">{v}</div>
            </div>
          ))}
        </div>
      </Mock>
    </div>
  );
}

function McpFlow() {
  return (
    <Mock title="quantumilion / mcp" className="h-full" right={<Status tone="accent">Connected</Status>}>
      <div className="flex h-full flex-col p-4 sm:p-5">
        <div className="flex flex-col items-stretch gap-2.5">
          {[
            { name: "Claude", note: "or any MCP client", icon: <IconSpark size={14} />, accent: false },
            { name: "Quantumilion MCP", note: "scoped, audited tools", icon: <IconTerminal size={14} />, accent: true },
            { name: "Infrastructure", note: "your running systems", icon: <IconGithub size={14} />, accent: false },
          ].map((n, i, arr) => (
            <div key={n.name}>
              <div
                className={`flex items-center gap-3 rounded-xl border px-3 py-3 ${
                  n.accent ? "border-accent-line bg-accent-soft" : "border-line bg-surface"
                }`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                    n.accent ? "bg-accent text-on-accent" : "border border-line bg-raised text-ink-3"
                  }`}
                >
                  {n.icon}
                </span>
                <span className="min-w-0">
                  <span className={`block truncate text-[14px] font-medium ${n.accent ? "text-accent-text" : "text-ink"}`}>
                    {n.name}
                  </span>
                  <span className="block truncate font-mono text-[10.5px] text-ink-3">{n.note}</span>
                </span>
              </div>
              {i < arr.length - 1 && (
                <div className="flex justify-center py-0.5" aria-hidden="true">
                  <IconArrow size={14} className="rotate-90 text-ink-3" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 border-t border-line pt-4">
          <div className="label">Exposed tools</div>
          <ul className="mt-2.5 flex flex-wrap gap-1.5">
            {["deploy", "scale", "logs.query", "metrics.query", "db.status", "cost.report"].map((t) => (
              <li key={t} className="rounded-md border border-line bg-surface px-2 py-1 font-mono text-[10.5px] text-ink-3">
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-3.5 text-[13px] leading-[1.55] text-ink-2">
            AI coding agents read and change infrastructure through the same scoped, audited tools a person uses. No
            shared credentials, no shell access.
          </p>
        </div>
      </div>
    </Mock>
  );
}

export function DevEx() {
  return (
    <Section id="developers" className="border-t border-line">
      <div className="shell">
        <SectionHead
          n="05"
          eyebrow="Developer experience"
          title="Ship with the tools you already use."
          lede="Quantumilion does not ask you to move into a new workflow. It attaches to the one you have."
        />

        <Reveal className="mt-10">
          <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
            {SURFACES.map((s) => (
              <li key={s.name} className="rounded-xl border border-line bg-raised px-3.5 py-3 transition-colors hover:border-accent-line">
                <div className="text-[14px] font-medium text-ink">{s.name}</div>
                <div className="mt-0.5 font-mono text-[10.5px] text-ink-3">{s.note}</div>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-6 grid items-stretch gap-5 lg:grid-cols-2">
          <Reveal>
            <Terminal />
          </Reveal>
          <Reveal delay={90}>
            <McpFlow />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
