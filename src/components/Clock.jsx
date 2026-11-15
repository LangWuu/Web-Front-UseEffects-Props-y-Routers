import { useState, useEffect } from 'react';

// useEffect con cleanup (caso 1): un intervalo.
// El efecto crea el setInterval al montar. El cleanup lo borra cuando el
// componente se desmonta, por ejemplo al cambiar de ruta.
export default function Clock() {
  const [ahora, setAhora] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setAhora(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <p className="reloj">{ahora.toLocaleTimeString('es-CO')}</p>
      <p className="fecha">{ahora.toLocaleDateString('es-CO', { dateStyle: 'full' })}</p>
    </div>
  );
}
