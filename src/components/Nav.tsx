import { useEffect, useState } from "react";
import { NAV } from "../content/site";
import { useScrollLock, useTheme } from "../lib/hooks";
import { Mark } from "./Mark";
import { IconClose, IconMenu, IconMoon, IconSun } from "./Icons";

/* Sticky header. Transparent over the hero, then it grows a background and a
 * hairline once the page has scrolled — so the hero visual is never cut in half
 * by a bar that is not needed yet.
 *
 * The mobile menu is a full-height panel rather than a dropdown, because the nav
 * plus both calls to action does not fit in a dropdown on a small phone without
 * scrolling inside it. */

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { resolved, toggle } = useTheme();

  useScrollLock(open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the menu. Without it the only way out on a phone with a
  // keyboard attached is the button, which is not reachable while focus is
  // inside the panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-[13px] focus:font-medium focus:text-on-accent"
      >
        Skip to content
      </a>

      {/* The background is nearly opaque (92%) and the blur is only a soft
          finish on top of it. A full-width backdrop-filter is one of the more
          expensive things a fixed element can do — it recomposites the strip on
          every scroll frame — so it is kept small, and the bar stays perfectly
          readable if the filter is dropped or unsupported. */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled || open ? "border-b border-line bg-bg/92 backdrop-blur-md" : "border-b border-transparent"
        }`}
      >
        <nav className="shell flex h-[68px] items-center gap-6" aria-label="Main">
          <a href="#top" className="flex shrink-0 items-center gap-2.5 rounded-lg" aria-label={`${"Quantumilion"} home`}>
            <Mark size={26} className="text-ink" />
            <span className="text-[16px] font-semibold tracking-[-0.02em] text-ink">Quantumilion</span>
          </a>

          <ul className="ml-2 hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-[14px] text-ink-2 transition-colors duration-200 hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={toggle}
              className="btn btn-ghost h-9 w-9 px-0"
              aria-label={resolved === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            >
              {resolved === "dark" ? <IconSun size={17} /> : <IconMoon size={17} />}
            </button>

            <a href="#signin" className="hidden text-[14px] text-ink-2 transition-colors hover:text-ink sm:block sm:px-3">
              Sign in
            </a>
            <a href="#start" className="btn-primary btn-sm hidden sm:inline-flex">
              Get started
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="btn btn-ghost h-9 w-9 px-0 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <IconClose size={19} /> : <IconMenu size={19} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Rendered outside the header so the backdrop can cover the full viewport
          without the header's own background sitting on top of it. */}
      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-[68px] z-40 overflow-y-auto border-t border-line bg-bg lg:hidden"
        >
          <div className="shell flex flex-col gap-1 py-6">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-3.5 text-[18px] font-medium text-ink"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-5 flex flex-col gap-2.5">
              <a href="#start" onClick={() => setOpen(false)} className="btn-primary w-full">
                Start building
              </a>
              <a href="#signin" onClick={() => setOpen(false)} className="btn-secondary w-full">
                Sign in
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
