import React, { useState, useEffect, useMemo } from 'react';
import Carta from '../Cartas'; 

const [baraja, setBaraja] = useState([]);

useEffect(() => {
  const barajarCartas = () => {
    const nuevaBaraja = [];
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

    for (let i = nuevaBaraja.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nuevaBaraja[i], nuevaBaraja[j]] = [nuevaBaraja[j], nuevaBaraja[i]];
    }

    setBaraja(nuevaBaraja);
  };

  barajarCartas();
}, [numeros, palos]);

  const renderCartas = () => {
    return baraja.map((carta, index) => (
      <Carta key={index} numero={carta.numero} palo={carta.palo} />
    ));
  };

  return <div className="Deck">{renderCartas()}</div>;
  
export default Deck;
