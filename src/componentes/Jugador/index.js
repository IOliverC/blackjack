import React from 'react';
import Mano from '../Mano';

const Jugador = ({ cartas, solicitarCarta, plantarse }) => {
    return (
        <div className="jugador">
            <Mano cartas={cartas} titulo="Jugador" />
            <div className='jugadorBotones'>
                <div id="boton1">
                    <button onClick={solicitarCarta}>Solicitar Carta</button>
                </div>
                <div id="boton2">
                    <button onClick={plantarse}>Plantarse</button>
                </div>
            </div>
        </div>
        );
};

export default Jugador;