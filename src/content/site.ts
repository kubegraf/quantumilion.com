/* Every string on the page lives here.
 *
 * Two rules, both deliberate:
 *
 * 1. No invented facts. No customers, user counts, uptime figures, benchmarks,
 *    funding, testimonials, prices, logos or certifications. Quantumilion has
 *    not launched. Where a product mock shows numbers they are illustrative and
 *    the surface says so — see ILLUSTRATIVE below.
 * 2. The brand is spelled "Quantumilion". Never Quantum Million, Quantumillion,
 *    Quantiumilion, or a plural. */

export const BRAND = "Quantumilion";
export const SITE_URL = "https://kubegraf.github.io/quantumilion.com/";

/** Shown on every mock that contains numbers. The numbers are a design of the
 *  product surface, not a measurement of anything. */
export const ILLUSTRATIVE = "Illustrative product preview";

export const NAV = [
  { label: "Product", href: "#product" },
  { label: "Infrastructure", href: "#infrastructure" },
  { label: "AI", href: "#ai" },
  { label: "Developers", href: "#developers" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#docs" },
] as const;

export const FEATURES = [
  {
    key: "deploy",
    title: "Deploy",
    body: "Connect GitHub and ship production workloads automatically.",
    detail: ["Repository detection", "Dockerfile detection", "Container builds", "Deployment history"],
  },
  {
    key: "compute",
    title: "Compute",
    body: "Provision the right compute resources for every workload.",
    detail: ["Right-sized instances", "Autoscaling", "Scheduling", "Workload isolation"],
  },
  {
    key: "data",
    title: "Data",
    body: "Run databases, storage and persistent infrastructure alongside your applications.",
    detail: ["PostgreSQL", "Redis-ready", "Object storage", "Persistent volumes"],
  },
  {
    key: "network",
    title: "Network",
    body: "Private networking, domains, TLS and secure application connectivity.",
    detail: ["Private networking", "Domains", "TLS", "Secrets"],
  },
  {
    key: "observe",
    title: "Observe",
    body: "Understand application health, performance and infrastructure behaviour in real time.",
    detail: ["Logs", "Metrics", "Traces", "Infrastructure health"],
  },
  {
    key: "operate",
    title: "Operate",
    body: "Let AI investigate issues, optimise resources and perform infrastructure actions.",
    detail: ["Incident investigation", "Cost intelligence", "Approved actions", "Autonomous operations"],
  },
] as const;

export const BEFORE = [
  "Cloud console",
  "Kubernetes",
  "Terraform",
  "CI/CD",
  "Monitoring",
  "Logs",
  "Cost tools",
  "Manual operations",
] as const;

export const AI_CAPABILITIES = [
  "Understands application architecture",
  "Understands infrastructure topology",
  "Investigates incidents",
  "Analyses logs, metrics and traces",
  "Identifies performance problems",
  "Identifies cost anomalies",
  "Recommends infrastructure changes",
  "Executes approved actions",
] as const;

export const AUTONOMY_STAGES = [
  { name: "Observe", body: "Continuously reads metrics, logs, traces and infrastructure state." },
  { name: "Understand", body: "Builds a model of how the workloads and their dependencies behave." },
  { name: "Recommend", body: "Proposes a concrete change with the expected effect on the system." },
  { name: "Act", body: "Applies the change once approved, with a full audit trail." },
  { name: "Optimise", body: "Learns the result and adjusts the baseline it operates against." },
] as const;

export const SECURITY = [
  { title: "Private networking", body: "Workloads talk over private paths rather than the public internet." },
  { title: "TLS everywhere", body: "Certificates issued and renewed for every domain automatically." },
  { title: "Secrets management", body: "Encrypted at rest, injected at runtime, never written into an image." },
  { title: "RBAC", body: "Roles scoped per environment and per action, not per person." },
  { title: "Audit logs", body: "Every infrastructure action recorded, including the ones the AI takes." },
  { title: "Tenant isolation", body: "Environments are isolated from each other at the infrastructure layer." },
  { title: "Encryption", body: "Data encrypted in transit and at rest across compute, data and storage." },
  { title: "Infrastructure policies", body: "Guardrails that define what may change, and what needs a human." },
  { title: "Secure credentials", body: "Short-lived, scoped credentials issued per workload." },
  { title: "Workload isolation", body: "Untrusted and trusted workloads run under separate isolation classes." },
] as const;

export const AUDIENCES = [
  {
    who: "Developers",
    body: "Ship production applications without becoming infrastructure experts.",
    points: ["Push to deploy", "Databases attached", "Logs and metrics included"],
  },
  {
    who: "Startups",
    body: "Build your product without assembling an entire platform team.",
    points: ["No platform hire needed", "Cost visible from day one", "Scales when you do"],
  },
  {
    who: "Platform teams",
    body: "Give developers a simple interface without losing infrastructure control.",
    points: ["Policies and RBAC", "Audit trail", "Bring your own cloud"],
  },
] as const;

/* Supported technologies, not partnerships. Nothing here implies an official
 * relationship with any of these projects or vendors. */
export const INTEGRATIONS = [
  { name: "GitHub", note: "Source and build triggers" },
  { name: "Docker", note: "Container builds and images" },
  { name: "Kubernetes", note: "Backend target" },
  { name: "PostgreSQL", note: "Managed database" },
  { name: "Terraform", note: "Infrastructure definitions" },
  { name: "MCP", note: "AI agent access" },
  { name: "CLI", note: "Local and CI control" },
  { name: "OpenTelemetry", note: "Metrics, logs and traces" },
] as const;

export const PRICING = [
  {
    plan: "Developer",
    body: "For individual developers.",
    points: ["Deploy from GitHub", "Managed PostgreSQL", "Logs, metrics and traces", "AI assistant"],
    cta: "Start building",
    primary: false,
  },
  {
    plan: "Team",
    body: "For growing teams.",
    points: ["Everything in Developer", "Shared environments", "RBAC and audit logs", "Cost intelligence"],
    cta: "Start building",
    primary: true,
  },
  {
    plan: "Enterprise",
    body: "For organisations requiring control, security and support.",
    points: ["Bring your own cloud", "Infrastructure policies", "Tenant isolation", "Direct support"],
    cta: "Talk to us",
    primary: false,
  },
] as const;

export const FOOTER = [
  {
    heading: "Product",
    links: [
      { label: "AI infrastructure", href: "#ai" },
      { label: "Deploy", href: "#product" },
      { label: "Compute", href: "#product" },
      { label: "Data", href: "#product" },
      { label: "Networking", href: "#product" },
      { label: "Observability", href: "#product" },
      { label: "Cost", href: "#cost" },
    ],
  },
  {
    heading: "Developers",
    links: [
      { label: "Docs", href: "#docs" },
      { label: "API", href: "#developers" },
      { label: "CLI", href: "#developers" },
      { label: "MCP", href: "#developers" },
      { label: "GitHub", href: "#developers" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" },
      { label: "Security", href: "#security" },
      { label: "Status", href: "#status" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "#privacy" },
      { label: "Terms", href: "#terms" },
    ],
  },
] as const;
