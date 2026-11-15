import { createContext, useContext, useEffect, useMemo, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

// 1. Se crea el contexto. El valor null permite detectar un uso fuera del Provider.
const ThemeContext = createContext(null);

// 2. El Provider guarda el estado y lo expone a todo el árbol de componentes.
export function ThemeProvider({ children }) {
  const [tema, setTema] = useLocalStorage('taskboard-tema', 'claro');

  // El tema se aplica al <html> para que el CSS lo lea con [data-tema="oscuro"].
  useEffect(() => {
    document.documentElement.dataset.tema = tema;
  }, [tema]);

  const alternar = useCallback(() => {
    setTema((actual) => (actual === 'claro' ? 'oscuro' : 'claro'));
  }, [setTema]);

  // useMemo evita que el objeto cambie en cada render y provoque renders extra en los consumidores.
  const valor = useMemo(() => ({ tema, alternar }), [tema, alternar]);

  return <ThemeContext.Provider value={valor}>{children}</ThemeContext.Provider>;
}

// 3. Hook de consumo: cualquier componente lo llama sin recibir props.
export function useTheme() {
  const contexto = useContext(ThemeContext);
  if (!contexto) {
    throw new Error('useTheme debe usarse dentro de <ThemeProvider>');
  }
  return contexto;
}
