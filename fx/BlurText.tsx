import { motion } from 'motion/react'

type Part = { text: string; hl?: boolean }

type Props = {
  parts: Part[]
  as?: 'h1' | 'h2' | 'p'
  className?: string
  delay?: number
  // true = anima ao montar (hero); false = anima quando entra na tela
  immediate?: boolean
}

const word = {
  hidden: { opacity: 0, y: '0.45em', filter: 'blur(14px)' },
  show: {
    opacity: 1,
    y: '0em',
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.2, 0.7, 0.2, 1] as const },
  },
}

// Título que entra palavra por palavra, saindo do desfoque.
export function BlurText({ parts, as = 'h2', className = '', delay = 0, immediate = false }: Props) {
  const Tag = motion[as] as typeof motion.h2
  const label = parts.map((p) => p.text).join(' ')
  const trigger = immediate
    ? { animate: 'show' as const }
    : { whileInView: 'show' as const, viewport: { once: true, margin: '0px 0px -80px 0px' } }

  return (
    <Tag
      className={className}
      aria-label={label}
      initial="hidden"
      {...trigger}
      transition={{ staggerChildren: 0.055, delayChildren: delay }}
    >
      {parts.flatMap((part, i) =>
        part.text.split(' ').map((w, j) => (
          <span key={`${i}-${j}`} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre' }}>
            <motion.span variants={word} className={part.hl ? 'hl' : undefined} style={{ display: 'inline-block' }}>
              {w}
            </motion.span>{' '}
          </span>
        )),
      )}
    </Tag>
  )
}
