import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import List from '../components/List.jsx';
import TaskForm from '../components/TaskForm.jsx';
import TaskItem from '../components/TaskItem.jsx';
import { useTasks } from '../context/TasksContext.jsx';
import { useDebounce } from '../hooks/useDebounce.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';

const FILTROS = [
  { valor: 'todas', etiqueta: 'Todas' },
  { valor: 'pendientes', etiqueta: 'Pendientes' },
  { valor: 'hechas', etiqueta: 'Hechas' },
];

export default function Tasks() {
  useDocumentTitle('Tareas');
  const { tareas, agregar, alternar, eliminar } = useTasks();

  // El filtro vive en la URL (?estado=pendientes): se puede compartir y funciona con el botón "atrás".
  const [params, setParams] = useSearchParams();
  const estado = params.get('estado') ?? 'todas';

  // La búsqueda vive en un estado local. useDebounce evita filtrar en cada tecla.
  const [texto, setTexto] = useState('');
  const textoEstable = useDebounce(texto, 300);

  const visibles = useMemo(() => {
    const consulta = textoEstable.trim().toLowerCase();
    return tareas.filter((t) => {
      if (estado === 'pendientes' && t.hecha) return false;
      if (estado === 'hechas' && !t.hecha) return false;
      return t.titulo.toLowerCase().includes(consulta);
    });
  }, [tareas, estado, textoEstable]);

  function cambiarFiltro(valor) {
    setParams(valor === 'todas' ? {} : { estado: valor });
  }

  return (
    <>
      <Card titulo="Nueva tarea">
        <TaskForm onAgregar={agregar} />
      </Card>

      <Card titulo={`Tareas (${visibles.length})`}>
        <div className="barra-filtros">
          <div className="grupo-botones">
            {FILTROS.map((f) => (
              <Button
                key={f.valor}
                tamano="sm"
                variante={estado === f.valor ? 'primario' : 'fantasma'}
                onClick={() => cambiarFiltro(f.valor)}
              >
                {f.etiqueta}
              </Button>
            ))}
          </div>
          <input
            type="search"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Buscar por título"
            aria-label="Buscar tareas"
          />
        </div>

        <List
          items={visibles}
          vacio="Ninguna tarea coincide con el filtro."
          renderItem={(t) => <TaskItem tarea={t} onToggle={alternar} onDelete={eliminar} />}
        />
      </Card>
    </>
  );
}
