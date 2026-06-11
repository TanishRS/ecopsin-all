/**
 * Duotone (plum + whisper) illustration plates used in place of stock photography,
 * so all "imagery" reads as one art-directed set. Swap for real duotone-treated
 * photos when the client supplies them.
 */

const PLUM = '#2F2440'
const WHISPER = '#F3EEFA'
const GLOW = '#D8417C'

export function HangerRack({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 800"
      shapeRendering="crispEdges"
      className={className}
      role="img"
      aria-label="Illustration of pressed garments hanging on a rail"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="600" height="800" fill={PLUM} />
      {/* rail */}
      <line x1="40" y1="110" x2="560" y2="110" stroke={WHISPER} strokeWidth="3" />
      <line x1="80" y1="110" x2="60" y2="40" stroke={WHISPER} strokeWidth="2" opacity=".5" />
      <line x1="520" y1="110" x2="540" y2="40" stroke={WHISPER} strokeWidth="2" opacity=".5" />
      {/* hangers + garments */}
      {[110, 205, 300, 395, 490].map((cx, i) => {
        const h = [430, 520, 480, 560, 440][i]
        const w = [64, 78, 70, 84, 66][i]
        return (
          <g key={cx} stroke={WHISPER} strokeWidth="2.5" fill="none">
            {/* hook */}
            <path d={`M ${cx} 110 q 0 -26 14 -26 q 14 0 14 14`} opacity=".9" />
            {/* shoulders */}
            <path d={`M ${cx - w} 175 L ${cx} 128 L ${cx + w} 175`} />
            {/* garment body */}
            <path
              d={`M ${cx - w} 175 L ${cx - w + 8} ${175 + h} L ${cx + w - 8} ${175 + h} L ${cx + w} 175 Z`}
              fill={i === 2 ? WHISPER : 'none'}
              fillOpacity={i === 2 ? 0.95 : 0}
            />
            {/* placket line */}
            <line
              x1={cx}
              y1="185"
              x2={cx}
              y2={165 + h}
              stroke={i === 2 ? PLUM : WHISPER}
              opacity=".55"
            />
          </g>
        )
      })}
      {/* orange care tag on the filled garment */}
      <rect x="284" y="240" width="32" height="44" fill={GLOW} />
      <line x1="300" y1="240" x2="300" y2="226" stroke={GLOW} strokeWidth="3" />
      {/* baseline rule */}
      <line x1="40" y1="760" x2="560" y2="760" stroke={WHISPER} strokeWidth="1" opacity=".25" />
      <text
        x="40"
        y="745"
        fill={WHISPER}
        opacity=".5"
        fontFamily="Space Mono, monospace"
        fontSize="14"
        letterSpacing="3"
      >
        PLATE 01 — THE RAIL
      </text>
    </svg>
  )
}

type PlateVariant = 'fold' | 'steam' | 'tag' | 'drum' | 'fiber' | 'hanger'

const plateLabels: Record<PlateVariant, string> = {
  fold: 'Folded garments, stacked',
  steam: 'Rising steam lines',
  tag: 'Fabric care label',
  drum: 'Washing drum, concentric rings',
  fiber: 'Woven fiber crosshatch',
  hanger: 'Single wire hanger',
}

export function Plate({ variant, className = '' }: { variant: PlateVariant; className?: string }) {
  const dark = variant === 'fold' || variant === 'drum' || variant === 'hanger'
  const bg = dark ? PLUM : WHISPER
  const fg = dark ? WHISPER : PLUM
  return (
    <svg
      viewBox="0 0 400 400"
      shapeRendering="crispEdges"
      className={className}
      role="img"
      aria-label={`Illustration: ${plateLabels[variant]}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="400" height="400" fill={bg} />
      {variant === 'fold' && (
        <g>
          {[300, 252, 204, 156, 108].map((y, i) => (
            <g key={y}>
              <rect x="80" y={y} width="240" height="40" fill="none" stroke={fg} strokeWidth="2" />
              <path d={`M 80 ${y + 12} H 320`} stroke={fg} strokeWidth="1" opacity=".35" />
              {i === 2 && <rect x="300" y={y + 8} width="14" height="24" fill={GLOW} />}
            </g>
          ))}
        </g>
      )}
      {variant === 'steam' && (
        <g stroke={fg} strokeWidth="2.5" fill="none">
          {[90, 150, 210, 270, 330].map((x, i) => (
            <path
              key={x}
              d={`M ${x} 360 C ${x - 24} 300, ${x + 24} 240, ${x} 180 C ${x - 24} 120, ${x + 18} 80, ${x} 40`}
              opacity={i % 2 ? 0.45 : 0.9}
            />
          ))}
          <rect x="60" y="358" width="280" height="4" fill={fg} stroke="none" />
        </g>
      )}
      {variant === 'tag' && (
        <g>
          <rect x="70" y="60" width="260" height="280" fill="none" stroke={fg} strokeWidth="2.5" />
          <line x1="70" y1="120" x2="330" y2="120" stroke={fg} strokeWidth="1.5" />
          {/* care symbols row */}
          <circle cx="120" cy="170" r="20" fill="none" stroke={fg} strokeWidth="2.5" />
          <path d="M 175 190 L 200 150 L 225 190 Z" fill="none" stroke={fg} strokeWidth="2.5" />
          <rect x="255" y="150" width="40" height="40" fill="none" stroke={fg} strokeWidth="2.5" />
          {/* crossed-out square = do not tumble */}
          <line x1="255" y1="150" x2="295" y2="190" stroke={GLOW} strokeWidth="2.5" />
          {[230, 256, 282].map((y) => (
            <line key={y} x1="100" y1={y} x2="300" y2={y} stroke={fg} strokeWidth="1" opacity=".4" />
          ))}
          <rect x="100" y="304" width="56" height="10" fill={GLOW} />
        </g>
      )}
      {variant === 'drum' && (
        <g fill="none" stroke={fg}>
          <circle cx="200" cy="200" r="150" strokeWidth="2.5" />
          <circle cx="200" cy="200" r="112" strokeWidth="1.5" opacity=".6" strokeDasharray="6 10" />
          <circle cx="200" cy="200" r="74" strokeWidth="2" />
          <circle cx="200" cy="200" r="36" strokeWidth="1.5" opacity=".6" />
          <circle cx="276" cy="124" r="9" fill={GLOW} stroke="none" />
        </g>
      )}
      {variant === 'fiber' && (
        <g stroke={fg} strokeWidth="1.5">
          {Array.from({ length: 11 }).map((_, i) => (
            <line key={`a${i}`} x1={i * 40 - 40} y1="0" x2={i * 40 + 80} y2="400" opacity=".55" />
          ))}
          {Array.from({ length: 11 }).map((_, i) => (
            <line key={`b${i}`} x1={i * 40 + 80} y1="0" x2={i * 40 - 40} y2="400" opacity=".3" />
          ))}
          <rect x="178" y="178" width="44" height="44" fill={GLOW} stroke="none" />
        </g>
      )}
      {variant === 'hanger' && (
        <g stroke={fg} strokeWidth="3" fill="none">
          <path d="M 200 96 q 0 -34 22 -34 q 22 0 22 22" />
          <path d="M 60 270 L 200 120 L 340 270 Z" strokeLinejoin="round" />
          <line x1="60" y1="312" x2="340" y2="312" strokeWidth="1.5" opacity=".4" />
          <rect x="188" y="150" width="24" height="24" fill={GLOW} stroke="none" />
        </g>
      )}
    </svg>
  )
}
