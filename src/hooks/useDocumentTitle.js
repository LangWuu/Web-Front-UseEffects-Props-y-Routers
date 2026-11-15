import { useEffect } from 'react';

// Cambia el título de la pestaña mientras la página está visible y lo
// restaura al salir de ella.
export function useDocumentTitle(titulo) {
  useEffect(() => {
    const anterior = document.title;
    document.title = `${titulo} | TaskBoard`;
    return () => {
      document.title = anterior;
    };
  }, [titulo]);
}
