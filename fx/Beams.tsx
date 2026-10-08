import type { CSSProperties } from 'react'

const paths = Array.from({ length: 10 }, (_, i) => {
  const o = i * 34
  return `M${-120 + o * 0.4} ${660 + i * 6} C ${220 + o} ${520 - o * 0.5}, ${560 + o * 0.6} ${240 + o * 0.3}, ${1320} ${-60 + o * 1.5}`
})

// Feixes de luz percorrendo curvas ao fundo.
export function Beams({ className = '' }: { className?: string }) {
  return (
    <svg className={`beams ${className}`} viewBox="0 0 1200 640" preserveAspectRatio="none" aria-hidden="true">
      {paths.map((d, i) => (
        <g key={i}>
          <path d={d} className="beams__base" />
          <path
            d={d}
            pathLength={1}
            className="beams__light"
            style={{ '--dur': `${6 + (i % 4) * 1.6}s`, '--delay': `${-i * 1.3}s` } as CSSProperties}
          />
        </g>
      ))}
    </svg>
  )
}
