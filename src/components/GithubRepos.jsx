import { useState, useEffect } from 'react';
import Button from './Button.jsx';
import List from './List.jsx';

const USUARIO = 'LangWuu';

// useEffect con cleanup (caso 2): una petición fetch a la API pública de GitHub.
// Si el usuario pulsa "Recargar" otra vez o sale de la página antes de que llegue
// la respuesta, el cleanup aborta la petición pendiente con AbortController.
export default function GithubRepos() {
  const [intento, setIntento] = useState(0);
  const [repos, setRepos] = useState([]);
  const [estado, setEstado] = useState('cargando'); // cargando | listo | error

  useEffect(() => {
    const controlador = new AbortController();
    setEstado('cargando');

    fetch(`https://api.github.com/users/${USUARIO}/repos?sort=updated&per_page=5`, {
      signal: controlador.signal,
    })
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
        return respuesta.json();
      })
      .then((datos) => {
        setRepos(datos);
        setEstado('listo');
      })
      .catch((error) => {
        if (error.name === 'AbortError') return; // abortar es esperado, no es un error real
        setEstado('error');
      });

    return () => controlador.abort();
  }, [intento]);

  return (
    <div>
      {estado === 'cargando' && <p className="vacio">Cargando repositorios...</p>}
      {estado === 'error' && (
        <p className="error">No se pudieron cargar los repositorios. Revisa la conexión e intenta de nuevo.</p>
      )}
      {estado === 'listo' && (
        <List
          items={repos}
          vacio="Este usuario todavía no tiene repositorios públicos."
          renderItem={(repo) => (
            <div className="fila-simple">
              <a href={repo.html_url} target="_blank" rel="noreferrer">
                {repo.name}
              </a>
              <span className="meta-inline">{repo.language ?? 'Sin lenguaje'}</span>
            </div>
          )}
        />
      )}
      <Button variante="fantasma" tamano="sm" className="separado" onClick={() => setIntento((n) => n + 1)}>
        Recargar
      </Button>
    </div>
  );
}
