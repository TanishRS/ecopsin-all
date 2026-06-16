/**
 * Steam motif — three rising tendrils. CSS-driven (.steam in index.css),
 * so it respects prefers-reduced-motion automatically.
 */
type Props = { className?: string; size?: number }

export default function Steam({ className = '', size = 28 }: Props) {
  const height = Math.round(size * 1.28)
  return (
    <span
      className={`steam ${className}`}
      style={{ width: size, height }}
      aria-hidden="true"
    >
      <span className="wisp w1" />
      <span className="wisp w2" />
      <span className="wisp w3" />
    </span>
  )
}
