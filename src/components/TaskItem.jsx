import { Link } from 'react-router-dom';
import Button from './Button.jsx';
import PriorityBadge from './PriorityBadge.jsx';

// Recibe la tarea y dos callbacks. No conoce el contexto: es reutilizable y fácil de probar.
export default function TaskItem({ tarea, onToggle, onDelete }) {
  return (
    <div className={`tarea ${tarea.hecha ? 'hecha' : ''}`}>
      <input
        type="checkbox"
        checked={tarea.hecha}
        onChange={() => onToggle(tarea.id)}
        aria-label={`Marcar "${tarea.titulo}" como ${tarea.hecha ? 'pendiente' : 'hecha'}`}
      />
      <Link to={`/tareas/${tarea.id}`} className="tarea-titulo">
        {tarea.titulo}
      </Link>
      <PriorityBadge nivel={tarea.prioridad} />
      <Button
        variante="fantasma"
        tamano="sm"
        onClick={() => onDelete(tarea.id)}
        aria-label={`Eliminar "${tarea.titulo}"`}
      >
        Eliminar
      </Button>
    </div>
  );
}
