import { Reveal, Section } from "./ui/Primitives";
import { IconArrow } from "./Icons";

export function CTA() {
  return (
    <Section id="start" className="relative overflow-hidden border-t border-line">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-bg opacity-70" />
      {/* A soft wash, drawn as a radial gradient rather than as a blurred
          shape. `blur-3xl` on a box this large forces Chrome to promote it to
          its own composited layer, which costs a repaint on every scroll and
          renders as a black frame in some capture paths. A gradient is the same
          picture with no filter. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(52% 62% at 50% 50%, var(--vignette), transparent 72%)" }}
      />

      <div className="shell relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-[clamp(2.1rem,5vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink">
            Build less infrastructure.
            <br /> Build more product.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[clamp(1rem,1.5vw,1.15rem)] leading-[1.6] text-ink-2">
            Quantumilion gives your applications an intelligent infrastructure layer that deploys, observes and
            continuously optimises the systems they run on.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#start" className="btn-primary w-full sm:w-auto">
              Start building
              <IconArrow size={16} />
            </a>
            <a href="#docs" className="btn-secondary w-full sm:w-auto">
              Read the docs
            </a>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
