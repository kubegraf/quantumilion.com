import { useEffect } from "react";

import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Problem } from "./components/Problem";
import { Product } from "./components/Product";
import { AISection } from "./components/AISection";
import { Autonomy } from "./components/Autonomy";
import { DevEx } from "./components/DevEx";
import { InfraGraph } from "./components/InfraGraph";
import { CostDashboard } from "./components/CostDashboard";
import { Architecture } from "./components/Architecture";
import { Security } from "./components/Security";
import { Audiences } from "./components/Audiences";
import { Integrations } from "./components/Integrations";
import { Pricing } from "./components/Pricing";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";

/* One route, one page. The section order is the argument the page makes:
 * what it is → why it is needed → what it does → why AI is the difference →
 * how far that goes → how you use it → what it understands → what it costs →
 * what it runs on → whether it is safe → who it is for → what to do next. */

export default function App() {
  useHashLanding();

  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Problem />
        <Product />
        <AISection />
        <Autonomy />
        <DevEx />
        <InfraGraph />
        <CostDashboard />
        <Architecture />
        <Security />
        <Audiences />
        <Integrations />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

/** Scrolls to the hash target after the first paint.
 *
 *  The whole navigation is hash links into one page, so opening
 *  /quantumilion.com/#pricing directly has to land on Pricing. The browser
 *  resolves the hash while the document is still an empty <div id="root">, so
 *  the element does not exist yet and it silently lands at the top instead.
 *  Re-running the scroll once React has mounted is what makes a shared link
 *  work. */
function useHashLanding() {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    // rAF rather than a timeout: one frame after mount the layout is settled,
    // and "auto" skips the smooth scroll so a deep link does not animate the
    // whole page past every section on the way down.
    requestAnimationFrame(() => el.scrollIntoView({ behavior: "auto", block: "start" }));
  }, []);
}
