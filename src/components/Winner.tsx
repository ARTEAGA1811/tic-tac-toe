import React from 'react'
import { IWinner } from '../interfaces/interface'
const Winner = ({ estado, setEstado }: IWinner) => {

    const siguienteRonda = () => {
        const nuevoTurno = estado.turnoInicial === 'X' ? 'O' : 'X';
        setEstado({
            ...estado,
            ultimoGanador: '',
            turnoInicial: nuevoTurno,
            turno: nuevoTurno,
            celdas: Array(9).fill(null),
            ganador: false,
            numberRound: estado.numberRound + 1,
        })
    }


    return (
        <section className='winner_container'>
            {(estado.ultimoGanador === 'X' || estado.ultimoGanador === 'O') && (
                <h2 className='message'><span className='winner'>{estado.ultimoGanador === 'X' ? 'You' : 'AI'}</span> {(estado.ultimoGanador === 'X') ? 'have' : 'has'} won!</h2>
            )}
            {(estado.ultimoGanador === '') && (
                <h2 className='message'>It's a Draw!</h2>
            )}
            <button className='next_round_button' onClick={siguienteRonda}>Go to the next round</button>
        </section>
    )
}

export { Winner }