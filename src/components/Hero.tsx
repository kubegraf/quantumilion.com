import { ControlPlane } from "./ControlPlane";
import { IconArrow, IconGithub } from "./Icons";

/* Above the fold, in order: what it is, what it does, what to do next, and a
 * drawing of the product. Nothing else competes for that space. */

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-[104px] sm:pb-20 sm:pt-[124px] lg:pb-24 lg:pt-[140px]">
      {/* Background: a faint blueprint grid masked to fade downwards, plus one
          cool wash behind the headline. Both aria-hidden and both cheap — no
          image, no canvas, no parallax. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-bg grid-fade" />
      {/* A soft wash, drawn as a radial gradient rather than as a blurred
          shape. `blur-3xl` on a box this large forces Chrome to promote it to
          its own composited layer, which costs a repaint on every scroll and
          renders as a black frame in some capture paths. A gradient is the same
          picture with no filter. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[720px]"
        style={{ background: "radial-gradient(58% 60% at 50% 0%, var(--vignette), transparent 72%)" }}
      />

      <div className="shell relative">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-1.5">
            <i aria-hidden="true" className="block h-1.5 w-1.5 rounded-full bg-accent animate-pulseDot" />
            <span className="eyebrow text-ink-2">AI-native infrastructure</span>
          </div>

          <h1 className="mt-7 text-[clamp(2.4rem,6.6vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink">
            Your infrastructure,
            <br className="hidden sm:block" /> finally intelligent.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-[clamp(1rem,1.6vw,1.2rem)] leading-[1.6] text-ink-2">
            Deploy applications, provision infrastructure and operate production workloads through one
            intelligent control plane.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#start" className="btn-primary w-full sm:w-auto">
              Start building
              <IconArrow size={16} />
            </a>
            <a href="#product" className="btn-secondary w-full sm:w-auto">
              Explore the platform
            </a>
          </div>

          {/* The icon is hidden on small screens. At 390px the sentence wraps to
              two lines and a flex icon ends up stranded on its own beside them,
              which reads as a broken glyph rather than as decoration. */}
          <p className="mt-6 flex items-center justify-center gap-2 px-2 font-mono text-[11.5px] leading-relaxed text-ink-3">
            <IconGithub size={14} className="hidden shrink-0 sm:block" />
            Built for developers who want infrastructure without infrastructure overhead.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-[1080px] sm:mt-16">
          <ControlPlane />
        </div>
      </div>
    </section>
  );
}
