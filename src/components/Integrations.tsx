import { INTEGRATIONS } from "../content/site";
import { Reveal, Section, SectionHead } from "./ui/Primitives";

/* Supported technologies.
 *
 * ⚠ Not partnerships, and not logos. Rendering the GitHub, Docker and
 * Kubernetes marks in a row implies an endorsement none of those projects have
 * given. Names and one line of what the integration actually does says more and
 * claims less. */

export function Integrations() {
  return (
    <Section id="ecosystem" className="border-t border-line" tight>
      <div className="shell">
        <SectionHead
          eyebrow="Ecosystem"
          title="Works with the stack you already run."
          lede="Supported technologies, listed as they are implemented. No official partnership is implied by anything on this list."
          align="center"
        />

        <Reveal className="mt-10">
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
            {INTEGRATIONS.map((it) => (
              <li key={it.name} className="bg-raised px-4 py-4 transition-colors duration-300 hover:bg-surface">
                <div className="text-[14.5px] font-medium text-ink">{it.name}</div>
                <div className="mt-1 font-mono text-[10.5px] leading-snug text-ink-3">{it.note}</div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
