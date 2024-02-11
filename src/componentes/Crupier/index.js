import React from 'react';
import Mano from '../Mano';

const Crupier = ({ cartas, solicitarCarta  }) => {
    return (
        <div className="crupier">
            <Mano cartas={cartas} titulo="Crupier" />
            <div className="botonCrupier">
                <button className="boton4" onClick={solicitarCarta}>
                    Solicitar Carta
                </button>
            </div>
        </div>
    );
};

export default Crupier;
