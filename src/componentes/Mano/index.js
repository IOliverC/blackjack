import React from 'react';
import Cartas from '../Cartas';

const Mano = ({ cartas }) => {
    const calcularPuntuacion = () => {
        let puntuacion = 0;

    for (const carta of cartas) {
        let valor = 0;

        if (!carta.isFaceDown) {
            if (carta.numero === 'A') {
            valor = 11;
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

    return (
        <div className="mano">
        <div className="cartas-container">
            {cartas.map((carta, index) => (
            <div key={index} style={{ marginLeft: `${index * 20}px` }}>
                <Cartas
                numero={carta.numero}
                palo={carta.palo}
                isFaceDown={carta.isFaceDown}
                />
            </div>
            ))}
        </div>
        <p>Puntuación: {calcularPuntuacion()}</p>
        </div>
    );
};

export default Mano;