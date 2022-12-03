import React from 'react'
import '../styles/Board.css'

const Board = () => {
    return (
        <div className="board_container">
            <div className='board'>
                <button className='x_selected'>X</button>
                <button className='o_selected'>O</button>
                <button className='x_selected cell_winner'>X</button>
                <button className='o_selected'>O</button>
                <button className='x_selected cell_winner'>X</button>
                <button className='o_selected'>O</button>
                <button className='x_selected cell_winner'>X</button>
                <button className='o_selected'>O</button>
                <button className='o_selected'>O</button>
            </div>
        </div>
    )
}

export { Board };