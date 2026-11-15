import { NavLink, Outlet } from 'react-router-dom';
import ThemeToggle from './ThemeToggle.jsx';
import { useWindowWidth } from '../hooks/useWindowWidth.js';

const ENLACES = [
  { to: '/', etiqueta: 'Panel', end: true },
  { to: '/tareas', etiqueta: 'Tareas' },
];

export default function Layout() {
  const ancho = useWindowWidth();
  const compacto = ancho < 640;

  return (
    <div className={`app ${compacto ? 'compacto' : ''}`}>
      <header className="cabecera">
        <h1 className="logo">TaskBoard</h1>
        <nav className="menu">
          {ENLACES.map((enlace) => (
            <NavLink
              key={enlace.to}
              to={enlace.to}
              end={enlace.end}
              className={({ isActive }) => (isActive ? 'activo' : '')}
            >
              {enlace.etiqueta}
            </NavLink>
          ))}
        </nav>
        <ThemeToggle />
      </header>

      <main className="contenido">
        {/* Aquí se dibuja la página que coincide con la ruta actual */}
        <Outlet />
      </main>

      <footer className="pie">TaskBoard</footer>
    </div>
  );
}
