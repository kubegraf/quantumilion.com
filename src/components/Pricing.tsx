import { PRICING } from "../content/site";
import { Reveal, Section, SectionHead, Ticks } from "./ui/Primitives";
import { IconCheck } from "./Icons";

/* Pricing preview.
 *
 * ⚠ No numbers. There is no pricing data to publish, and a placeholder price is
 * the one thing on a landing page a visitor will hold you to. Each tier says who
 * it is for and what is in it, and the call to action starts a conversation
 * instead of a checkout. */

export function Pricing() {
  return (
    <Section id="pricing" className="border-t border-line">
      <div className="shell">
        <SectionHead
          n="11"
          eyebrow="Pricing"
          title="Start free of infrastructure work."
          lede="Pricing is not published yet. Here is the shape of it, and what each tier is meant to cover."
          align="center"
        />

        <div className="mt-12 grid gap-4 sm:gap-5 lg:grid-cols-3">
          {PRICING.map((p, i) => (
            <Reveal key={p.plan} delay={i * 80}>
              <div
                className={`relative flex h-full flex-col rounded-2xl border p-6 ${
                  p.primary ? "border-accent-line bg-raised" : "border-line bg-raised"
                }`}
                style={p.primary ? { boxShadow: "var(--shadow-glow)" } : { boxShadow: "var(--shadow-card)" }}
              >
                {p.primary && <Ticks />}
                <div className="flex items-center gap-2.5">
                  <h3 className="text-[19px] font-semibold text-ink">{p.plan}</h3>
                  {p.primary && <span className="chip border-accent-line text-accent-text">Most teams</span>}
                </div>
                <p className="mt-2 text-[14px] text-ink-2">{p.body}</p>

                <div className="mt-5 border-y border-line py-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">
                    Pricing announced at launch
                  </span>
                </div>

                <ul className="mt-5 flex-1 space-y-2.5">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5">
                      <IconCheck size={13} className="mt-[3px] shrink-0 text-accent-text" />
                      <span className="text-[13.5px] leading-snug text-ink-2">{pt}</span>
                    </li>
                  ))}
                </ul>

                <a href={p.cta === "Talk to us" ? "#contact" : "#start"} className={`mt-7 w-full ${p.primary ? "btn-primary" : "btn-secondary"}`}>
                  {p.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
