import React, { useState, useCallback, useEffect, useRef } from 'react';
import Jugador from '../Jugador';
import Crupier from '../Crupier';
import 'bootstrap/dist/css/bootstrap.min.css';

const Juego = () => {
  const [baraja, setBaraja] = useState([]);
  const [jugadorCartas, setJugadorCartas] = useState([]);
  const [crupierCartas, setCrupierCartas] = useState([]);
  const [estadoJuego, setEstadoJuego] = useState('iniciando');
  const crupierCartasRef = useRef(crupierCartas);

  const barajarCartas = useCallback(() => {
    const nuevaBaraja = [];
    const palos = ['trebol', 'corazones', 'rombo', 'picas'];
    const numeros = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    palos.forEach((palo) => {
      numeros.forEach((numero) => {
        let valor = 0;
        if (['K', 'Q', 'J'].includes(numero)) {
          valor = 10;
        } else if (numero !== 'A') {
          valor = parseInt(numero);
        } else {
          valor = 11;
        }
        nuevaBaraja.push({ numero, palo, valor, isFaceDown: false });
      });
    });

    for (let i = nuevaBaraja.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nuevaBaraja[i], nuevaBaraja[j]] = [nuevaBaraja[j], nuevaBaraja[i]];
    }

    setBaraja(nuevaBaraja);
  }, []);

  useEffect(() => {
    barajarCartas();
  }, [barajarCartas]);

  const repartirCartas = useCallback((cantidad, destinatario) => {
    const nuevasCartas = baraja.slice(0, cantidad);
    setBaraja(baraja.slice(cantidad));
  
    if (destinatario === 'jugador') {
      setJugadorCartas((cartas) => [...cartas, ...nuevasCartas]);
    } else if (destinatario === 'crupier') {
      // Elimina las cartas del jugador de la baraja
      const barajaSinJugador = baraja.filter(
        (carta) =>
          !nuevasCartas.some(
            (nuevaCarta) => nuevaCarta.numero === carta.numero && nuevaCarta.palo === carta.palo
          )
      );
  
      const cartaAleatoria = barajaSinJugador[Math.floor(Math.random() * barajaSinJugador.length)];
      const cartasCrupier = [cartaAleatoria, ...nuevasCartas.slice(1)];
  
      if (cartasCrupier[1]) {
        cartasCrupier[1].isFaceDown = true;
      }
  
      setCrupierCartas((cartas) => [...cartas, ...cartasCrupier]);
    }
  }, [baraja]);
  

  const iniciarNuevaRonda = useCallback(() => {
    barajarCartas();
    setJugadorCartas([]);
    setCrupierCartas([]);
    repartirCartas(1, 'jugador');
    repartirCartas(2, 'crupier');
    setEstadoJuego('jugando');
  }, [barajarCartas, repartirCartas]);

  const calcularPuntuacion = (cartas) => {
    let puntuacion = 0;
    
    for (const carta of cartas) {
      let valor = 0;
    
      if (!carta.isFaceDown) {
        if (carta.numero === 'A') {
          valor += 11; // Asigna el valor inicial del as como 11
        } else if (['K', 'Q', 'J'].includes(carta.numero)) {
          valor = 10;
        } else {
          valor = parseInt(carta.numero);
        }
      }
    
      puntuacion += valor;
    }
    
    return puntuacion;
  };
  
  const manejarFinDeRonda = useCallback(() => {
    const puntuacionJugador = calcularPuntuacion(jugadorCartas);
    const puntuacionCrupier = calcularPuntuacion(crupierCartas);
  
    if (puntuacionJugador < 21 && puntuacionCrupier > 21) {
      setEstadoJuego('jugadorGana');
      window.alert('Gana el jugador, Crupier sobrepasó de 21 puntos.');
    } else if (puntuacionCrupier < 21 && puntuacionJugador > 21) {
      setEstadoJuego('crupierGana');
      window.alert('Gana el Crupier, por acercarse más al 21 que el jugador');
    } else if (puntuacionCrupier === puntuacionJugador) {
      setEstadoJuego('empate'); 
      window.alert('Empataron');
    } else if (puntuacionCrupier > puntuacionJugador && puntuacionCrupier <= 21) {
      setEstadoJuego('crupierGana');
      window.alert('Gana el Crupier.');
    } else {
      setEstadoJuego('jugadorGana');
      window.alert('Gana el jugador.');
    }
  }, [jugadorCartas, crupierCartas]);
  

  const solicitarCartaJugador = useCallback(() => {
    if (
      estadoJuego !== 'plantado' &&
      estadoJuego !== 'jugadorGana' &&
      estadoJuego !== 'crupierGana' &&
      estadoJuego !== 'empate'
    ) {
      repartirCartas(1, 'jugador');

      const puntuacionActual = calcularPuntuacion(jugadorCartas);

      if (puntuacionActual >= 21) {
        manejarFinDeRonda();
      }
    }
  }, [repartirCartas, jugadorCartas, manejarFinDeRonda, estadoJuego]);

  const plantarse = useCallback(() => {
    setEstadoJuego('plantado');
    const nuevasCartasCrupier = [...crupierCartas];
    nuevasCartasCrupier.forEach((carta) => (carta.isFaceDown = false));
    setCrupierCartas(nuevasCartasCrupier);

    const robarCartasCrupier = () => {
      const nuevasCartasCrupier = [...crupierCartasRef.current];
      let puntuacionCrupier = calcularPuntuacion(nuevasCartasCrupier);

      if (puntuacionCrupier < 17) {
        repartirCartas(1, 'crupier');
        setTimeout(robarCartasCrupier, 500);
      } else {
        manejarFinDeRonda();
        return;
      }
    };
    robarCartasCrupier();
  }, [crupierCartas, manejarFinDeRonda, repartirCartas]);

  useEffect(() => {
    crupierCartasRef.current = crupierCartas;
  }, [crupierCartas]);

  return (
    <div className="container mt-5">
      <div className="row mt-4">
        <div className="crupierCartas col-md-12">
          <Crupier cartas={crupierCartas} solicitarCarta={solicitarCartaJugador} />
        </div>
        <div className="jugadorCartas col-md-12">
          <Jugador cartas={jugadorCartas} solicitarCarta={solicitarCartaJugador} plantarse={plantarse} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 text-center">
          <button className="boton3" onClick={iniciarNuevaRonda}>
            Nueva Ronda
          </button>
        </div>
      </div>
    </div>
  );
};

export default Juego;

