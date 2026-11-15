import { useState, useEffect } from 'react';

// Hook propio: useState que se inicializa desde localStorage y se guarda solo
// cuando el valor cambia (efecto con dependencias).
export function useLocalStorage(clave, valorInicial) {
  const [valor, setValor] = useState(() => {
    try {
      const guardado = localStorage.getItem(clave);
      return guardado !== null ? JSON.parse(guardado) : valorInicial;
    } catch {
      return valorInicial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(clave, JSON.stringify(valor));
    } catch {
      // Si el navegador bloquea el almacenamiento la app sigue funcionando en memoria.
    }
  }, [clave, valor]);

  return [valor, setValor];
}
