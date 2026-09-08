"use client";
import { useState, useEffect } from "react";

const crearTablero = () => {
  const valores = [1, 2, 3, 4, 5, 6, 7, 8];
  const pares = [...valores, ...valores].sort(() => Math.random() - 0.5);
  return pares.map((valor, id) => ({
    id,
    valor,
    dadaVuelta: false,
    encontrada: false,
  }));
};

export default function Home() {
  const [tablero, setTablero] = useState([]);
  const [volteadas, setVolteadas] = useState([]);
  const [evaluando, setEvaluando] = useState(false);
  const [movimientos, setMovimientos] = useState(0);
  const [tiempo, setTiempo] = useState(0);
  const [jugando, setJugando] = useState(false);
  const [victoria, setVictoria] = useState(false);

  useEffect(() => {
    setTablero(crearTablero());
  }, []);

  useEffect(() => {
    let intervalo;
    if (jugando && !victoria) {
      intervalo = setInterval(() => setTiempo((t) => t + 1), 1000);
    }
    return () => clearInterval(intervalo);
  }, [jugando, victoria]);

  useEffect(() => {
    if (volteadas.length === 2) {
      setEvaluando(true);
      const [primera, segunda] = volteadas;

      if (tablero[primera].valor === tablero[segunda].valor) {
        setTablero((prev) =>
          prev.map((ficha, index) =>
            index === primera || index === segunda ? { ...ficha, encontrada: true } : ficha
          )
        );
        setVolteadas([]);
        setMovimientos((m) => m + 1);
        setEvaluando(false);
      } else {
        setTimeout(() => {
          setTablero((prev) =>
            prev.map((ficha, index) =>
              index === primera || index === segunda ? { ...ficha, dadaVuelta: false } : ficha
            )
          );
          setVolteadas([]);
          setMovimientos((m) => m + 1);
          setEvaluando(false);
        }, 1000);
      }
    }
  }, [volteadas, tablero]);

  useEffect(() => {
    if (tablero.length > 0 && tablero.every((ficha) => ficha.encontrada)) {
      setVictoria(true);
    }
  }, [tablero]);

  const manejarClic = (index) => {
    if (!jugando) setJugando(true);
    if (evaluando || tablero[index].dadaVuelta || tablero[index].encontrada) return;

    setTablero((prev) =>
      prev.map((ficha, i) => (i === index ? { ...ficha, dadaVuelta: true } : ficha))
    );
    setVolteadas([...volteadas, index]);
  };

  const reiniciarPartida = () => {
    setTablero(crearTablero());
    setVolteadas([]);
    setMovimientos(0);
    setTiempo(0);
    setJugando(false);
    setVictoria(false);
    setEvaluando(false);
  };

  const formatearTiempo = (segundos) => {
    const m = Math.floor(segundos / 60);
    const s = segundos % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  if (victoria) {
    return (
      <main className="pantalla-final">
        <h1>¡Lo lograste!</h1>
        <p>Tiempo: {formatearTiempo(tiempo)}</p>
        <p>Movimientos: {movimientos}</p>
        <button onClick={reiniciarPartida}>Jugar de nuevo</button>
      </main>
    );
  }

  return (
    <main className="contenedor-juego">
      <header>
        <h1>Memory</h1>
        <button onClick={reiniciarPartida}>Nueva partida</button>
      </header>

      <section className="grilla">
        {tablero.map((ficha, index) => (
          <button
            key={ficha.id}
            className={`ficha ${ficha.dadaVuelta || ficha.encontrada ? "descubierta" : "oculta"}`}
            onClick={() => manejarClic(index)}
          >
            {(ficha.dadaVuelta || ficha.encontrada) && ficha.valor}
          </button>
        ))}
      </section>

      <footer>
        <div className="tarjeta">
          <span>Tiempo</span>
          <strong>{formatearTiempo(tiempo)}</strong>
        </div>
        <div className="tarjeta">
          <span>Movimientos</span>
          <strong>{movimientos}</strong>
        </div>
      </footer>
    </main>
  );
}