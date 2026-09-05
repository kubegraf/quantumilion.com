# quantumilion.com

The Quantumilion landing page. Vite + React + TypeScript + Tailwind, deployed to
GitHub Pages at <https://kubegraf.github.io/quantumilion.com/> on every push to
`main`.

Quantumilion is an AI-native infrastructure control platform: one control plane
for deploying applications, provisioning infrastructure and operating production
workloads.

## Running it

```bash
npm install
npm run dev        # http://localhost:5173/quantumilion.com/
npm run build      # typecheck, then build to dist/
npm run preview    # serve dist/ exactly as Pages will
```

Node 22. There are no other prerequisites and no environment variables.

## Three things to know before changing anything

1. **The site is served from a SUBPATH.** `base` in `vite.config.ts` is
   `/quantumilion.com/` and must equal the repo name. Get it wrong and the
   deploy goes green while every visitor gets an unstyled page. `deploy.yml`
   greps the built HTML and fails instead of publishing that.
2. **Do not invent facts.** No customers, user counts, revenue, uptime figures,
   certifications, compliance claims, benchmarks, funding, testimonials or
   prices. Quantumilion has not launched. The copy says so where it matters and
   that honesty is deliberate, not a gap to fill in.
3. **The brand is spelled `Quantumilion`.** Never Quantum Million,
   Quantumillion, Quantiumilion or a plural. CI fails the build on any of them.

## Layout

```
src/
  content/site.ts        every string on the page
  styles/index.css       design tokens, the only place colours are defined
  lib/hooks.ts           in-view, sequence, loop, theme, scroll lock
  components/
    ui/Primitives.tsx    Section, Reveal, SectionHead, Mock, Status, Metric
    Mark.tsx Icons.tsx   the brand mark and the hand-drawn icon set
    <Section>.tsx        one file per section of the page
  App.tsx                the section order, and nothing else
```

`CLAUDE.md` has the reasoning behind the parts that are easy to get wrong.
