/* Hand-drawn on one 24x24 grid, 1.5 stroke, round caps and joins, currentColor
 * throughout. Zero dependencies — do not add an icon library for one glyph.
 *
 * These are deliberately technical rather than decorative: a node, a container,
 * a volume, a route. No rockets, no brains, no clouds. */

type P = { className?: string; size?: number };

function Svg({ className, size = 20, children }: P & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export const IconDeploy = (p: P) => (
  <Svg {...p}>
    <path d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5v-9Z" />
    <path d="m4 7.5 8 4.5 8-4.5M12 12v9" />
  </Svg>
);

export const IconCompute = (p: P) => (
  <Svg {...p}>
    <rect x="7" y="7" width="10" height="10" rx="1.5" />
    <path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4" />
  </Svg>
);

export const IconData = (p: P) => (
  <Svg {...p}>
    <ellipse cx="12" cy="6" rx="7" ry="3" />
    <path d="M5 6v12c0 1.66 3.13 3 7 3s7-1.34 7-3V6M5 12c0 1.66 3.13 3 7 3s7-1.34 7-3" />
  </Svg>
);

export const IconNetwork = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="3" />
    <circle cx="4.5" cy="6" r="2" />
    <circle cx="19.5" cy="6" r="2" />
    <circle cx="12" cy="20.5" r="2" />
    <path d="m6.2 7.3 3.5 3.1M17.8 7.3l-3.5 3.1M12 15v3.5" />
  </Svg>
);

export const IconObserve = (p: P) => (
  <Svg {...p}>
    <path d="M3 15.5 7 9l3.5 4.5L14 6l3 6.5L21 9" />
    <path d="M3 20h18" />
  </Svg>
);

export const IconOperate = (p: P) => (
  <Svg {...p}>
    <path d="M12 3v2.5M12 18.5V21M21 12h-2.5M5.5 12H3M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8M18.4 18.4l-1.8-1.8M7.4 7.4 5.6 5.6" />
    <circle cx="12" cy="12" r="3.5" />
  </Svg>
);

export const IconTerminal = (p: P) => (
  <Svg {...p}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="m7.5 10 2.5 2.2-2.5 2.2M12.5 15h4" />
  </Svg>
);

export const IconShield = (p: P) => (
  <Svg {...p}>
    <path d="M12 3 5 6v6c0 4.2 2.9 7.6 7 9 4.1-1.4 7-4.8 7-9V6l-7-3Z" />
    <path d="m9.2 12 2 2 3.6-3.8" />
  </Svg>
);

export const IconCheck = (p: P) => (
  <Svg {...p}>
    <path d="m4.5 12.5 4.5 4.5L19.5 6.5" />
  </Svg>
);

export const IconArrow = (p: P) => (
  <Svg {...p}>
    <path d="M4.5 12h15M13.5 6l6 6-6 6" />
  </Svg>
);

export const IconChevron = (p: P) => (
  <Svg {...p}>
    <path d="m8 4.5 7.5 7.5L8 19.5" />
  </Svg>
);

export const IconSpark = (p: P) => (
  <Svg {...p}>
    <path d="M12 3.5 13.9 9l5.6 1.9-5.6 1.9L12 18.4l-1.9-5.6L4.5 10.9 10.1 9 12 3.5Z" />
    <path d="M18.5 16.5 19.3 19l2.2.8-2.2.8-.8 2.2" opacity=".55" />
  </Svg>
);

export const IconGithub = (p: P) => (
  <Svg {...p}>
    <path d="M9.2 20.6v-2.7c-3 .6-3.7-1.3-3.7-1.3-.5-1.2-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 1.6 2.5 1.2 3.1.9.1-.7.4-1.2.7-1.5-2.4-.3-4.9-1.2-4.9-5.3 0-1.2.4-2.1 1.1-2.9-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 1.1a10.2 10.2 0 0 1 5.4 0c2.1-1.4 3-1.1 3-1.1.6 1.5.2 2.6.1 2.9.7.8 1.1 1.7 1.1 2.9 0 4.1-2.5 5-4.9 5.3.4.3.7 1 .7 2v3.8" />
  </Svg>
);

export const IconMenu = (p: P) => (
  <Svg {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Svg>
);

export const IconClose = (p: P) => (
  <Svg {...p}>
    <path d="m6 6 12 12M18 6 6 18" />
  </Svg>
);

export const IconSun = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M21.5 12h-2M4.5 12h-2M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4M18.7 18.7l-1.4-1.4M6.7 6.7 5.3 5.3" />
  </Svg>
);

export const IconMoon = (p: P) => (
  <Svg {...p}>
    <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
  </Svg>
);
