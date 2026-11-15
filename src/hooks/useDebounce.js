import { useState, useEffect } from 'react';

// Devuelve el valor recibido, pero solo después de que dejó de cambiar durante
// "retraso" milisegundos. El cleanup cancela el temporizador anterior cada vez
// que el valor cambia, y por eso solo sobrevive el último.
export function useDebounce(valor, retraso = 300) {
  const [valorEstable, setValorEstable] = useState(valor);

  useEffect(() => {
    const id = setTimeout(() => setValorEstable(valor), retraso);
    return () => clearTimeout(id);
  }, [valor, retraso]);

  return valorEstable;
}
