import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  variant?: 'primary' | 'ghost'
  size?: 'md' | 'lg'
  block?: boolean
  className?: string
  href?: string
  onClick?: () => void
}

// Botão HTC: o primário é amarelo, com seta e um brilho que atravessa em loop.
// Com `href` vira link; sem `href` vira <button> (abre os pop-ups do site).
export function Button({ children, variant = 'primary', size = 'md', block = false, className = '', href, onClick }: Props) {
  const classes = `btn btn--${variant} btn--${size}${block ? ' btn--block' : ''} ${className}`
  const content = (
    <>
      <span>{children}</span>
      {variant === 'primary' && (
        <svg className="btn__arrow flex-none" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </>
  )

  if (href) {
    const external = href.startsWith('http')
    return (
      <a href={href} className={classes} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {content}
    </button>
  )
}
