import { useState } from 'react';
import Button from './Button.jsx';

// Patrón callback prop ("levantar el estado"): el formulario maneja sus campos
// con useState, pero no sabe dónde se guarda la tarea. Avisa al padre con onAgregar.
export default function TaskForm({ onAgregar, prioridadInicial = 'media' }) {
  const [titulo, setTitulo] = useState('');
  const [prioridad, setPrioridad] = useState(prioridadInicial);
  const [error, setError] = useState('');

  function manejarEnvio(evento) {
    evento.preventDefault();
    const limpio = titulo.trim();

    if (limpio.length < 3) {
      setError('El título necesita al menos 3 caracteres.');
      return;
    }

    onAgregar({ titulo: limpio, prioridad });
    setTitulo('');
    setError('');
  }

  return (
    <form className="formulario" onSubmit={manejarEnvio}>
      <div className="campo-fila">
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Nueva tarea"
          aria-label="Título de la tarea"
        />
        <select value={prioridad} onChange={(e) => setPrioridad(e.target.value)} aria-label="Prioridad">
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>
        <Button type="submit">Agregar</Button>
      </div>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
