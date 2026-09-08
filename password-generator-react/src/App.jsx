import { useState } from 'react';
import './App.css'; 

function App() {
  const [password, setPassword] = useState('');
  const [longitud, setLongitud] = useState(10);
  const [conMayusculas, setConMayusculas] = useState(true);
  const [conMinusculas, setConMinusculas] = useState(true);
  const [conNumeros, setConNumeros] = useState(true);
  const [conSimbolos, setConSimbolos] = useState(true);
  const [error, setError] = useState('');
  const [copiado, setCopiado] = useState(false);
  const [fortaleza, setFortaleza] = useState('');
  const [historial, setHistorial] = useState([]);

  const generarPassword = () => {
    if (longitud === 0 || (!conMayusculas && !conMinusculas && !conNumeros && !conSimbolos)) {
      setError('Marcá al menos una opción.');
      return;
    }
    setError('');

    let permitidos = '';
    if (conMayusculas) permitidos += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (conMinusculas) permitidos += 'abcdefghijklmnopqrstuvwxyz';
    if (conNumeros) permitidos += '0123456789';
    if (conSimbolos) permitidos += '!@#$%^&*';

    let nuevaPassword = '';
    for (let i = 0; i < longitud; i++) {
      nuevaPassword += permitidos[Math.floor(Math.random() * permitidos.length)];
    }

    let puntos = 0;
    if (conMayusculas) puntos++;
    if (conMinusculas) puntos++;
    if (conNumeros) puntos++;
    if (conSimbolos) puntos++;
    if (longitud >= 12) puntos++;

    if (puntos <= 1) setFortaleza('Muy débil');
    else if (puntos === 2) setFortaleza('Débil');
    else if (puntos === 3) setFortaleza('Media');
    else setFortaleza('Fuerte');

    setPassword(nuevaPassword);
    setHistorial([nuevaPassword, ...historial].slice(0, 5));
  };

  const copiarAlPortapapeles = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <main className="app-main">
      <h1 className="app-title">Generador de contraseñas</h1>
      <section className="app-card">
        <div className="visor-container">
          <input
            type="text"
            readOnly
            value={password}
            placeholder="P4$5W0rD!"
            className="visor-input"
          />
          <button className="btn-copiar" onClick={copiarAlPortapapeles}>
            {copiado ? '¡Copiado!' : 'Copiar'}
          </button>
        </div>

        {error && <p className="error-text">{error}</p>}

        <div className="longitud-header">
          <label>Longitud</label>
          <span className="longitud-valor">{longitud}</span>
        </div>
        
        <input
          type="range"
          min="0"
          max="20"
          value={longitud}
          onChange={(e) => setLongitud(Number(e.target.value))}
          className="slider"
        />

        <div className="opciones-container">
          <label className="opcion-label">
            <input type="checkbox" checked={conMayusculas} onChange={(e) => setConMayusculas(e.target.checked)} /> 
            Incluir mayúsculas
          </label>
          <label className="opcion-label">
            <input type="checkbox" checked={conMinusculas} onChange={(e) => setConMinusculas(e.target.checked)} /> 
            Incluir minúsculas
          </label>
          <label className="opcion-label">
            <input type="checkbox" checked={conNumeros} onChange={(e) => setConNumeros(e.target.checked)} /> 
            Incluir números
          </label>
          <label className="opcion-label">
            <input type="checkbox" checked={conSimbolos} onChange={(e) => setConSimbolos(e.target.checked)} /> 
            Incluir símbolos
          </label>
        </div>

        <div className="fortaleza-container">
          <span>FORTALEZA</span>
          <strong>{fortaleza || '-'}</strong>
        </div>

        <button className="btn-generar" onClick={generarPassword}>
          GENERAR →
        </button>
      </section>

      {historial.length > 0 && (
        <section className="historial-container">
          <h3>Últimas 5 contraseñas</h3>
          <ul>
            {historial.map((pass, index) => (
              <li key={index}>{pass}</li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}

export default App;