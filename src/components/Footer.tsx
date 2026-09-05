import { FOOTER } from "../content/site";
import { Mark } from "./Mark";

/* ⚠ No social links. Quantumilion has no accounts, and an icon row pointing at
 * URLs that do not exist is worse than no icon row. Add them when they exist. */

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="shell py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)] lg:gap-8">
          <div>
            <a href="#top" className="inline-flex items-center gap-2.5 rounded-lg">
              <Mark size={26} className="text-ink" />
              <span className="text-[16px] font-semibold tracking-[-0.02em] text-ink">Quantumilion</span>
            </a>
            <p className="mt-4 max-w-xs text-[13.5px] leading-[1.6] text-ink-3">
              AI-native infrastructure for modern applications. One intelligent control plane for deploying,
              provisioning and operating production systems.
            </p>
          </div>

          {FOOTER.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h2 className="label">{col.heading}</h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-[13.5px] text-ink-2 transition-colors duration-200 hover:text-ink">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11.5px] text-ink-3">&copy; Quantumilion</p>
          <p className="font-mono text-[11px] text-ink-3">
            Pre-launch. Product surfaces shown on this page are illustrative.
          </p>
        </div>
      </div>
    </footer>
  );
}
