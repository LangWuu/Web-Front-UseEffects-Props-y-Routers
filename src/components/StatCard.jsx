// Componente presentacional: solo recibe datos por props y los dibuja.
export default function StatCard({ etiqueta, valor, tono = 'neutro' }) {
  return (
    <div className={`stat stat-${tono}`}>
      <span className="stat-valor">{valor}</span>
      <span className="stat-etiqueta">{etiqueta}</span>
    </div>
  );
}
