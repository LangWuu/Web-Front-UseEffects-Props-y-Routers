import { Link } from 'react-router-dom';
import Card from '../components/Card.jsx';
import List from '../components/List.jsx';
import StatCard from '../components/StatCard.jsx';
import Clock from '../components/Clock.jsx';
import GithubRepos from '../components/GithubRepos.jsx';
import PriorityBadge from '../components/PriorityBadge.jsx';
import { useTasks } from '../context/TasksContext.jsx';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';

export default function Dashboard() {
  useDocumentTitle('Panel');
  const { estadisticas, tareas } = useTasks();
  const urgentes = tareas.filter((t) => !t.hecha && t.prioridad === 'alta').slice(0, 5);

  return (
    <>
      <section className="rejilla-stats">
        <StatCard etiqueta="Total" valor={estadisticas.total} />
        <StatCard etiqueta="Pendientes" valor={estadisticas.pendientes} tono="aviso" />
        <StatCard etiqueta="Hechas" valor={estadisticas.hechas} tono="ok" />
        <StatCard etiqueta="Urgentes" valor={estadisticas.urgentes} tono="peligro" />
      </section>

      <div className="dos-columnas">
        <Card titulo="Reloj">
          <Clock />
        </Card>
        <Card titulo="Repositorios en GitHub">
          <GithubRepos />
        </Card>
      </div>

      <Card titulo="Pendientes urgentes" acciones={<Link to="/tareas?estado=pendientes">Ver pendientes</Link>}>
        <List
          items={urgentes}
          vacio="No hay tareas urgentes. Buen momento para adelantar otras."
          renderItem={(t) => (
            <div className="fila-simple">
              <Link to={`/tareas/${t.id}`}>{t.titulo}</Link>
              <PriorityBadge nivel={t.prioridad} />
            </div>
          )}
        />
      </Card>
    </>
  );
}
