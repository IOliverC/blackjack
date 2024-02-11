import React from 'react';

const Cartas = ({ numero, palo, isFaceDown }) => {

    const imagen = isFaceDown ? './Imagenes/0.png' : `./Imagenes/${palo}/${numero}.png`;
    return (
        <div className="carta">
            <img src={imagen} alt={`Carta ${numero} de ${palo}`}  style={{ width: '110px'}} />
        </div>
    );
};

export default Cartas;
