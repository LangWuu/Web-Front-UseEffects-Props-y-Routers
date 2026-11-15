import { useState, useEffect } from 'react';

// Suscripción a un evento del navegador. Sin el removeEventListener del
// cleanup, cada montaje del componente dejaría un listener huérfano.
export function useWindowWidth() {
  const [ancho, setAncho] = useState(window.innerWidth);

  useEffect(() => {
    const alCambiar = () => setAncho(window.innerWidth);
    window.addEventListener('resize', alCambiar);
    return () => window.removeEventListener('resize', alCambiar);
  }, []);

  return ancho;
}
