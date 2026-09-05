import { AI_CAPABILITIES } from "../content/site";
import { Reveal, Section, SectionHead } from "./ui/Primitives";
import { AIConsole } from "./AIConsole";
import { IconCheck } from "./Icons";

export function AISection() {
  return (
    <Section id="ai" className="relative border-t border-line overflow-hidden">
      {/* One wash, behind the most important section on the page. */}
      {/* A soft wash, drawn as a radial gradient rather than as a blurred
          shape. `blur-3xl` on a box this large forces Chrome to promote it to
          its own composited layer, which costs a repaint on every scroll and
          renders as a black frame in some capture paths. A gradient is the same
          picture with no filter. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[620px]"
        style={{ background: "radial-gradient(55% 62% at 50% 0%, var(--vignette), transparent 72%)" }}
      />

      <div className="shell relative">
        <SectionHead
          n="03"
          eyebrow="Intelligence"
          title={
            <>
              AI doesn&rsquo;t just explain your infrastructure.
              <br className="hidden sm:block" /> It operates it.
            </>
          }
          lede="Quantumilion reads the same signals an experienced engineer would, reaches a conclusion, and proposes the specific change that fixes it. You approve the change, or a policy approves it for you."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <div className="label">What it can do</div>
              <ul className="mt-4 space-y-0">
                {AI_CAPABILITIES.map((c) => (
                  <li key={c} className="flex items-start gap-3 border-b border-line py-3">
                    <IconCheck size={14} className="mt-[3px] shrink-0 text-accent-text" />
                    <span className="text-[14.5px] leading-snug text-ink-2">{c}</span>
                  </li>
                ))}
                <li className="flex items-start gap-3 py-3">
                  <IconCheck size={14} className="mt-[3px] shrink-0 text-accent-text" />
                  <span className="text-[14.5px] leading-snug text-ink">
                    Eventually operates autonomously, inside the limits you set
                  </span>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={90} className="lg:col-span-8">
            <AIConsole />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
