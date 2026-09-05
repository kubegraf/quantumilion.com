import { AUDIENCES } from "../content/site";
import { Reveal, Section, SectionHead } from "./ui/Primitives";
import { IconCheck } from "./Icons";

export function Audiences() {
  return (
    <Section id="who" className="border-t border-line">
      <div className="shell">
        <SectionHead n="10" eyebrow="Who it is for" title="Three ways in, one control plane." align="center" />

        <div className="mt-12 grid gap-4 sm:gap-5 lg:grid-cols-3">
          {AUDIENCES.map((a, i) => (
            <Reveal key={a.who} delay={i * 80}>
              <div className="card flex h-full flex-col p-6 transition-colors duration-300 hover:border-accent-line">
                <span className="font-mono text-[10.5px] tracking-[0.2em] text-accent-text">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-[21px] font-semibold text-ink">{a.who}</h3>
                <p className="mt-2.5 text-[14.5px] leading-[1.6] text-ink-2">{a.body}</p>
                <ul className="mt-5 space-y-2 border-t border-line pt-4">
                  {a.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5">
                      <IconCheck size={13} className="mt-[3px] shrink-0 text-accent-text" />
                      <span className="text-[13.5px] text-ink-2">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
