// Patrón render prop: List se encarga de recorrer y mostrar el mensaje de lista
// vacía, y quien la usa decide cómo se dibuja cada elemento con renderItem.
export default function List({ items, renderItem, vacio = 'No hay elementos para mostrar.' }) {
  if (items.length === 0) {
    return <p className="vacio">{vacio}</p>;
  }

  return (
    <ul className="lista">
      {items.map((item) => (
        <li key={item.id}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}
