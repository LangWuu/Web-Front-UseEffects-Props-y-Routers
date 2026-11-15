const ETIQUETAS = { alta: 'Alta', media: 'Media', baja: 'Baja' };

export default function PriorityBadge({ nivel = 'media' }) {
  return <span className={`badge badge-${nivel}`}>{ETIQUETAS[nivel] ?? ETIQUETAS.media}</span>;
}
