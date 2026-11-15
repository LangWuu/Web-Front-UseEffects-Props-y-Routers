import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import PriorityBadge from '../components/PriorityBadge.jsx';
import { useTasks } from '../context/TasksContext.jsx';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';

export default function TaskDetail() {
  const { id } = useParams(); // parámetro dinámico de la ruta /tareas/:id
  const { tareas } = useTasks();
  const tarea = tareas.find((t) => t.id === id);

  useDocumentTitle(tarea ? tarea.titulo : 'Tarea no encontrada');

  if (!tarea) {
    return (
      <Card titulo="Tarea no encontrada">
        <p>La tarea que buscas no existe o fue eliminada.</p>
        <Link to="/tareas">Volver a la lista</Link>
      </Card>
    );
  }

  // key={tarea.id} reinicia el estado interno del editor si cambia la tarea.
  return <TaskEditor key={tarea.id} tarea={tarea} />;
}

function TaskEditor({ tarea }) {
  const navigate = useNavigate();
  const { alternar, actualizar, eliminar } = useTasks();
  const [descripcion, setDescripcion] = useState(tarea.descripcion);
  const [guardado, setGuardado] = useState(false);

  function guardar() {
    actualizar(tarea.id, { descripcion });
    setGuardado(true);
  }

  function borrar() {
    eliminar(tarea.id);
    navigate('/tareas'); // navegación programática después de la acción
  }

  return (
    <Card
      titulo={tarea.titulo}
      acciones={<PriorityBadge nivel={tarea.prioridad} />}
    >
      <p className="meta">Creada el {new Date(tarea.creada).toLocaleDateString('es-CO', { dateStyle: 'long' })}</p>

      <label className="etiqueta" htmlFor="descripcion">
        Descripción
      </label>
      <textarea
        id="descripcion"
        rows={5}
        value={descripcion}
        onChange={(e) => {
          setDescripcion(e.target.value);
          setGuardado(false);
        }}
      />

      <div className="grupo-botones">
        <Button onClick={guardar}>Guardar descripción</Button>
        <Button variante="fantasma" onClick={() => alternar(tarea.id)}>
          {tarea.hecha ? 'Marcar como pendiente' : 'Marcar como hecha'}
        </Button>
        <Button variante="peligro" onClick={borrar}>
          Eliminar
        </Button>
        <Button variante="fantasma" onClick={() => navigate(-1)}>
          Volver
        </Button>
      </div>
      {guardado && <p className="ok">Cambios guardados.</p>}
    </Card>
  );
}
