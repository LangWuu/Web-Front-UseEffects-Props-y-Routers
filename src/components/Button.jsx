// Patrones de props en este componente:
//  - valores por defecto en la desestructuración (variante, tamano)
//  - children para el contenido interno
//  - ...resto (spread) para reenviar onClick, type, aria-label, disabled, etc.
export default function Button({ variante = 'primario', tamano = 'md', className = '', children, ...resto }) {
  return (
    <button type="button" className={`btn btn-${variante} btn-${tamano} ${className}`.trim()} {...resto}>
      {children}
    </button>
  );
}
