import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Tasks from './pages/Tasks.jsx';
import TaskDetail from './pages/TaskDetail.jsx';
import NotFound from './pages/NotFound.jsx';

// Enrutamiento SPA: una sola página HTML y el router decide qué componente
// mostrar según la URL. Layout contiene la cabecera y un <Outlet /> donde
// se dibuja la ruta hija activa.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="tareas" element={<Tasks />} />
        <Route path="tareas/:id" element={<TaskDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
