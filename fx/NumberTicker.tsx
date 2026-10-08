import { useEffect, useRef } from 'react'
import { animate, useInView } from 'motion/react'

// Contador que sobe de 0 até o valor quando entra na tela.
export function NumberTicker({ value, delay = 0 }: { value: number; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.8,
      delay,
      ease: [0.2, 0.7, 0.2, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v).toLocaleString('pt-BR')
      },
    })
    return () => controls.stop()
  }, [inView, value, delay])

  return <span ref={ref}>0</span>
}
