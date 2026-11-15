import { Link } from 'react-router-dom';
import Card from '../components/Card.jsx';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';

export default function NotFound() {
  useDocumentTitle('Página no encontrada');

  return (
    <Card titulo="Error 404">
      <p>Esta dirección no existe en TaskBoard.</p>
      <Link to="/">Ir al panel</Link>
    </Card>
  );
}
