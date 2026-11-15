import { useTheme } from '../context/ThemeContext.jsx';
import Button from './Button.jsx';

// No recibe props: lee el tema directamente del contexto.
export default function ThemeToggle() {
  const { tema, alternar } = useTheme();

  return (
    <Button variante="fantasma" tamano="sm" onClick={alternar} aria-label="Cambiar tema">
      {tema === 'claro' ? 'Tema oscuro' : 'Tema claro'}
    </Button>
  );
}
