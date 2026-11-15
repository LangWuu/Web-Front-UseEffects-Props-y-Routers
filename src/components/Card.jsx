// Patrón de composición: Card no sabe qué contiene. Recibe el contenido por
// children y, si hace falta, un elemento extra en la cabecera por "acciones".
export default function Card({ titulo, acciones = null, children }) {
  return (
    <section className="card">
      {(titulo || acciones) && (
        <header className="card-cabecera">
          {titulo && <h2>{titulo}</h2>}
          {acciones}
        </header>
      )}
      <div className="card-cuerpo">{children}</div>
    </section>
  );
}
