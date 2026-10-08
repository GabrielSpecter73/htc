
// Motivo gráfico do deck: anéis concêntricos com o ponto amarelo no centro.
export function Rings({ className = '' }: { className?: string }) {
  return (
    <div className={`rings ${className}`} aria-hidden="true">
      <span />
      <span />
      <span />
      <i />
    </div>
  )
}
