/* The Quantumilion mark.
 *
 * A four-node lattice around a solid core, with a tail crossing the lower-right
 * edge so the whole glyph reads as a Q. The lattice is the point: the product
 * treats infrastructure as a connected system, and the mark says that before
 * any copy does.
 *
 * Two drawings, not one. The full lattice loses its node dots below about 32px,
 * so `simple` drops to the diamond and the core alone. That is the drawing the
 * favicon uses. Everything is currentColor except the core, so the mark inherits
 * whatever it is placed on. */

type Props = { size?: number; simple?: boolean; className?: string };

export function Mark({ size = 28, simple = false, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 2.6 21.4 12 12 21.4 2.6 12 12 2.6Z"
        stroke="currentColor"
        strokeWidth={simple ? 1.9 : 1.4}
        strokeLinejoin="round"
        opacity={simple ? 1 : 0.85}
      />
      {!simple && (
        <g stroke="currentColor" strokeWidth={1.1} opacity={0.42}>
          <path d="M12 4.6v14.8M4.6 12h14.8" />
        </g>
      )}
      {!simple &&
        [
          [12, 2.6],
          [21.4, 12],
          [12, 21.4],
          [2.6, 12],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={1.7} fill="var(--bg)" stroke="currentColor" strokeWidth={1.3} />
        ))}
      <circle cx={12} cy={12} r={simple ? 3.4 : 3.1} fill="var(--accent)" />
      <path
        d="m14.9 14.9 4.6 4.6"
        stroke="var(--accent)"
        strokeWidth={simple ? 2.4 : 2}
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Mark plus wordmark. The wordmark is always the exact string "Quantumilion" —
 *  never Quantum Million, Quantumillion, Quantiumilion or a plural. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Mark size={26} className="text-ink" />
      <span className="text-[16.5px] font-semibold tracking-[-0.02em] text-ink">Quantumilion</span>
    </span>
  );
}
