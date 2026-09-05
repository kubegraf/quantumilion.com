import { SECURITY } from "../content/site";
import { Reveal, Section, SectionHead } from "./ui/Primitives";
import { IconShield } from "./Icons";

/* Security.
 *
 * ⚠ No certifications. Not SOC 2, not ISO 27001, not HIPAA, not PCI, and no
 * "compliance-ready" phrasing that implies one. Quantumilion has not been
 * audited, so a badge here would be a lie that is cheap to print and expensive
 * to be caught with. The closing note says so in plain words on purpose —
 * do not delete it to make the section look stronger. */

export function Security() {
  return (
    <Section id="security" className="border-t border-line">
      <div className="shell">
        <SectionHead
          n="09"
          eyebrow="Security"
          title="Production infrastructure by design."
          lede="The controls below are properties of how the platform is built, not settings you have to remember to switch on."
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {SECURITY.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 60}>
              <div className="flex h-full flex-col bg-raised p-5 transition-colors duration-300 hover:bg-surface">
                <IconShield size={17} className="text-accent-text" />
                <h3 className="mt-3.5 text-[15px] font-semibold text-ink">{s.title}</h3>
                <p className="mt-1.5 text-[13.5px] leading-[1.55] text-ink-2">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={80}>
          <p className="mx-auto mt-8 max-w-prose text-center text-[13.5px] leading-relaxed text-ink-3">
            Quantumilion does not hold SOC 2, ISO 27001 or HIPAA certification, and this page will not claim one
            before it exists. What is listed above is what the platform does.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
