import { createContext, useContext, useMemo, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const TasksContext = createContext(null);

const TAREAS_INICIALES = [
  {
    id: 'demo-1',
    titulo: 'Pagar el recibo de internet',
    descripcion: 'Vence el lunes. Se paga desde la app del banco.',
    prioridad: 'alta',
    hecha: false,
    creada: '2026-11-14T08:00:00.000Z',
  },
  {
    id: 'demo-2',
    titulo: 'Comprar el mercado de la semana',
    descripcion: 'Frutas, verduras y huevos.',
    prioridad: 'media',
    hecha: false,
    creada: '2026-11-14T08:05:00.000Z',
  },
  {
    id: 'demo-4',
    titulo: 'Entregar el informe del trabajo',
    descripcion: 'Revisar la ortografía y enviarlo por correo antes del viernes.',
    prioridad: 'alta',
    hecha: false,
    creada: '2026-11-14T08:08:00.000Z',
  },
  {
    id: 'demo-3',
    titulo: 'Organizar el escritorio',
    descripcion: '',
    prioridad: 'baja',
    hecha: true,
    creada: '2026-11-14T08:10:00.000Z',
  },
];

function nuevoId() {
  return globalThis.crypto?.randomUUID?.() ?? `t-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function TasksProvider({ children }) {
  // useState (dentro de useLocalStorage) guarda la lista completa de tareas.
  const [tareas, setTareas] = useLocalStorage('taskboard-tareas-v2', TAREAS_INICIALES);

  // Las actualizaciones usan la forma funcional (prev => ...) para no depender de un valor viejo.
  const agregar = useCallback(
    (datos) => {
      const tarea = {
        id: nuevoId(),
        descripcion: '',
        hecha: false,
        creada: new Date().toISOString(),
        ...datos,
      };
      setTareas((prev) => [tarea, ...prev]);
    },
    [setTareas]
  );

  const alternar = useCallback(
    (id) => setTareas((prev) => prev.map((t) => (t.id === id ? { ...t, hecha: !t.hecha } : t))),
    [setTareas]
  );

  const actualizar = useCallback(
    (id, cambios) => setTareas((prev) => prev.map((t) => (t.id === id ? { ...t, ...cambios } : t))),
    [setTareas]
  );

  const eliminar = useCallback(
    (id) => setTareas((prev) => prev.filter((t) => t.id !== id)),
    [setTareas]
  );

  // Datos derivados: se calculan a partir de "tareas" y no se guardan como estado aparte.
  const estadisticas = useMemo(() => {
    const hechas = tareas.filter((t) => t.hecha).length;
    return {
      total: tareas.length,
      hechas,
      pendientes: tareas.length - hechas,
      urgentes: tareas.filter((t) => !t.hecha && t.prioridad === 'alta').length,
    };
  }, [tareas]);

  const valor = useMemo(
    () => ({ tareas, estadisticas, agregar, alternar, actualizar, eliminar }),
    [tareas, estadisticas, agregar, alternar, actualizar, eliminar]
  );

  return <TasksContext.Provider value={valor}>{children}</TasksContext.Provider>;
}

export function useTasks() {
  const contexto = useContext(TasksContext);
  if (!contexto) {
    throw new Error('useTasks debe usarse dentro de <TasksProvider>');
  }
  return contexto;
}
