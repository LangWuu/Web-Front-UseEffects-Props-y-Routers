import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { TasksProvider } from './context/TasksContext.jsx';
import './index.css';

// HashRouter guarda la ruta después del "#", así que las rutas funcionan en
// GitHub Pages sin configurar redirecciones en el servidor.
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <ThemeProvider>
        <TasksProvider>
          <App />
        </TasksProvider>
      </ThemeProvider>
    </HashRouter>
  </React.StrictMode>
);
