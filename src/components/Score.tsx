import React from 'react'
import { IPuntaje } from '../interfaces/interface'
const Score = (props: {puntaje: IPuntaje}) => {
    return (
        <div className='score'>
            <div className='player'>
                <div className='specific_player'>Me</div>
                <span className='puntaje'>{props.puntaje.X}</span>
            </div>
            <span>:</span>
            <div className='player'>
                <div className='specific_player'>AI</div>
                <span className='puntaje'>{props.puntaje.O}</span>
            </div>
        </div>
    )
}

export { Score }