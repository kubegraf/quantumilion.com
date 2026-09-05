# CLAUDE.md — quantumilion.com

The Quantumilion landing page. Vite + React + TypeScript + Tailwind, deployed to
GitHub Pages at https://kubegraf.github.io/quantumilion.com/ on every push to
main.

## Three things to know before changing anything

1. **The site is served from a SUBPATH.** `base` in `vite.config.ts` is
   `/quantumilion.com/` and must equal the repo name. Get it wrong and the
   deploy goes green while every visitor gets an unstyled page. `deploy.yml`
   greps the built HTML and fails instead of publishing that.
2. **Do not invent facts.** No customers, user counts, revenue, uptime figures,
   certifications, compliance claims, benchmarks, funding, testimonials or
   prices. Quantumilion has not launched. Several sections say so in plain
   words — the Security section states there is no SOC 2 or ISO 27001, Pricing
   publishes no numbers, Architecture marks three of five backends as planned,
   and every mock carrying numbers is captioned "Illustrative product preview".
   Those lines are the honest part of the page. Do not delete them to make a
   section look stronger.
3. **The brand is spelled `Quantumilion`.** Never Quantum Million,
   Quantumillion, Quantiumilion, or a plural. `deploy.yml` greps the built
   output for each of those and fails the build. It is the one thing a landing
   page cannot get wrong.

## ⚠ The runner exception

This repo uses `runs-on: ubuntu-latest`. Every other repo in the org uses
`kubegraf-org-runners` and the policy says never ubuntu-latest. This is a
deliberate exception, the same one `kubegraf/agentenx.com` carries, and it is
not an oversight to tidy up.

The Default runner group is set `allows_public_repositories: false`. This repo
must be PUBLIC for https://kubegraf.github.io/quantumilion.com/ to be reachable
without a GitHub login. A job here that targets `kubegraf-org-runners` is never
assigned a runner. It does not fail: it queues silently until someone cancels
it, which is a slow way to learn this.

The alternative was allowing public repos on the shared group, which would let
any public repo, fork pull requests included, run on runners inside the VPC. One
static site is not worth that.

The policy exists for secrets, VPC egress and cost. None apply here: this repo
holds no secrets, reaches no cluster and builds a public static page. If that
changes, revisit this rather than extending the exception to other repos.

## This is not KubeGraf, Domineta or AgentenX

Different product, different repo, different everything. Nothing here shares
code with `kubegraf-*` or `domineta-*`, and it does not deploy to either
cluster. If you are here because of a change to those, you are in the wrong
repository.

⚠ Worth saying plainly: `agentenx.com` in the same org describes itself as an
"AI-native infrastructure platform" too, and Domineta is the hosting product.
The positioning overlaps. That is a product question, not something to fix by
editing copy in one repo to differentiate it from another — if the brands merge
or split, the change belongs in both places at once.

## Design system

Tokens live in `src/styles/index.css` and nowhere else.

The site is **dark-first**, so the DARK palette is the one on bare `:root`.
Light is a redefinition of the same names under both
`@media (prefers-color-scheme: light)` and `[data-theme="light"]`, so the toggle
wins in both directions. A colour defined only inside a media query disappears
in the other theme.

Contrast was measured rather than eyeballed and the ratios are in the comments.
The accent is electric cyan and it needs **two** tokens, because a colour bright
enough to read as text on near-black is far too light to sit behind white text:

- `--accent` is the FILL. Dark `#22D3EE` with `--on-accent` `#04070A` on top
  (11.17:1). Light `#0A6E88` with white on top (5.84:1).
- `--accent-text` is the accent used AS text. Dark `#22D3EE` (11.02:1 on bg),
  light `#0A6E88` (5.84:1).

One accent. Not five. If you change it, measure it again.

`--series-1..5` is a separate categorical palette for the cost chart. It exists
because the semantic tokens do not stretch to five distinguishable fills — the
fifth segment was a translucent accent nobody could see. Every series value
clears 3:1 against its background, and every segment is also labelled with its
name and amount, so colour is never the only channel carrying the data.

## Animation

Sequences are driven by `useSequence` in `src/lib/hooks.ts`. Under
`prefers-reduced-motion` it jumps to the FINAL step rather than animating fast,
because the end state is the informative one. The CSS also neutralises animation
globally, which is a second belt for any component that forgets.

⚠ Watch the off-by-one: `useSequence(active, n)` yields `0..n-1`. The sibling
site shipped this bug twice, where the last stage never resolved so a mock
claimed "deployed" while its final node still read as pending. The hero pipeline
has six stages and the last one resolves at `i === 5`.

## ⚠ Two rendering traps already hit here

Both were found by screenshotting, and neither is visible to the type checker.

- **`blur-3xl` on a large background shape.** Three sections used a blurred box
  for the accent wash. Chrome promotes each one to its own composited layer,
  which costs a repaint on every scroll frame and rendered as a solid black
  frame in screenshot capture. All three are now plain radial gradients — same
  picture, no filter. Do not reintroduce a blurred box for a glow.
- **A full-width `backdrop-filter` on the fixed header.** Same family of
  problem. The header now sits at 92% opacity with a small blur on top, so the
  bar stays perfectly readable if the filter is dropped or unsupported.

## Deep links

The whole navigation is hash links into one page, so `useHashLanding` in
`App.tsx` re-runs the scroll after the first paint. The browser resolves the
hash while the document is still an empty `<div id="root">`, so without it
`/quantumilion.com/#pricing` silently lands at the top.

## Verify by rendering

`npm run build` passing proves nothing about how the page looks. Screenshot it
at several widths in both themes before calling a visual change done. Every
defect found while building this was visible in a screenshot and invisible in
the type checker.
