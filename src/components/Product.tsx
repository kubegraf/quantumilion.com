import { FEATURES } from "../content/site";
import { Reveal, Section, SectionHead } from "./ui/Primitives";
import {
  FeatureCard,
  VisCompute,
  VisData,
  VisDeploy,
  VisNetwork,
  VisObserve,
  VisOperate,
} from "./FeatureCard";

/* Six capabilities, one grid. The order is the order a workload actually moves
 * through the platform: it ships, it gets compute, it gets data, it gets a
 * route, it gets watched, and then it gets operated. */

const VISUALS = {
  deploy: <VisDeploy />,
  compute: <VisCompute />,
  data: <VisData />,
  network: <VisNetwork />,
  observe: <VisObserve />,
  operate: <VisOperate />,
} as const;

export function Product() {
  return (
    <Section id="product" className="border-t border-line">
      <div className="shell">
        <SectionHead
          n="02"
          eyebrow="Platform"
          title="One control plane for your entire application stack."
          lede="Build, compute, data, networking, observability and operations behind a single interface, with one model of how they fit together."
        />

        <div className="mt-14 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.key} delay={(i % 3) * 80}>
              <FeatureCard
                n={String(i + 1).padStart(2, "0")}
                title={f.title}
                body={f.body}
                detail={f.detail}
                visual={VISUALS[f.key]}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
