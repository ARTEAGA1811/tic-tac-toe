import React from 'react'
import '../styles/Board.css'
import { IBoard } from '../interfaces/interface'
let hayQuePintarCeldas = false;
let celdasGanadoras = [-1, -1, -1];
const Board = ({ estado, setEstado }: IBoard) => {
    const { celdas, turno } = estado;
    //console.log(celdas);

    const btn1 = React.useRef<HTMLButtonElement>(null);
    const btn2 = React.useRef<HTMLButtonElement>(null);
    const btn3 = React.useRef<HTMLButtonElement>(null);
    const btn4 = React.useRef<HTMLButtonElement>(null);
    const btn5 = React.useRef<HTMLButtonElement>(null);
    const btn6 = React.useRef<HTMLButtonElement>(null);
    const btn7 = React.useRef<HTMLButtonElement>(null);
    const btn8 = React.useRef<HTMLButtonElement>(null);
    const btn9 = React.useRef<HTMLButtonElement>(null);
    //Return X or O if there is a winner. If not, return null
    const listaBotones = [btn1, btn2, btn3, btn4, btn5, btn6, btn7, btn8, btn9];
    console.log(listaBotones);
    const pintarCeldasGanadoras = (celdasGanadoras: Array<number>) => {
        //console.log(celdasGanadoras);
        celdasGanadoras.forEach((celda) => {
            if (listaBotones[celda].current != null) {
                //Add the class winner to the button
                listaBotones[celda].current?.classList.add('cell_winner');
            }
        });
    }


    const validarGanadorOEmpate = (celdasAAnalizar: Array<string | null>) => {
        const ganadores = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        let personajeGanador: string | null = '';

        for (let i = 0; i < ganadores.length; i++) {
            const [a, b, c] = ganadores[i];
            if (celdasAAnalizar[a] && celdasAAnalizar[a] === celdasAAnalizar[b] && celdasAAnalizar[a] === celdasAAnalizar[c]) {
                personajeGanador = celdasAAnalizar[a];

                celdasGanadoras = [a, b, c];
                hayQuePintarCeldas = true;
                break;
            }
        }

        if (personajeGanador === 'X') {
            setEstado((preValue) => {
                return {
                    ...preValue,
                    ultimoGanador: 'X',
                    ganador: true,
                    puntaje: {
                        ...preValue.puntaje,
                        'X': preValue.puntaje['X'] + 1,
                    },
                    //numberRound: preValue.numberRound + 1,
                }
            })
        } else if (personajeGanador === 'O') {
            setEstado((preValue) => {
                return {
                    ...preValue,
                    ultimoGanador: 'O',
                    ganador: true,
                    puntaje: {
                        ...preValue.puntaje,
                        'O': preValue.puntaje['O'] + 1,
                    },
                    //numberRound: preValue.numberRound + 1,
                }
            })
            //se VALIDA SI HAY EMPATE
        } else if (celdasAAnalizar.filter((celda) => celda === null).length === 0) {
            setEstado((preValue) => {
                return {
                    ...preValue,
                    ganador: true,
                    ultimoGanador: '',
                }
            })
        }
    }

    const realizarMovimiento = (index: number) => {
        if (celdas[index] === null) {
            const newCeldas = [...celdas];
            newCeldas[index] = turno;
            setEstado((preValue) => {
                return {
                    ...preValue,
                    celdas: newCeldas,
                    turno: turno === 'X' ? 'O' : 'X',
                }
            })

            //se VALIDA SI ALGUIEN GANÓ
            validarGanadorOEmpate(newCeldas);

        }
    }

    const agregarColor = (index: number) => {
        if (celdas[index] === 'X') {
            return 'x_selected';
        } else if (celdas[index] === 'O') {
            return 'o_selected';
        } else {
            return '';
        }
    }

    const desabilitarBotones = () => {
        //Add disabled value to all buttons
        listaBotones.forEach((boton) => {
            if (boton.current != null) {
                boton.current.disabled = true;
            }
        });
    }

    const habilitarBotones = () => {
        //Remove disabled value to all buttons
        listaBotones.forEach((boton) => {
            if (boton.current != null) {
                boton.current.disabled = false;
            }
        });
    }
    //use effect
    React.useEffect(() => {
        if (hayQuePintarCeldas) {
            pintarCeldasGanadoras(celdasGanadoras);
            desabilitarBotones();
            hayQuePintarCeldas = false;
            celdasGanadoras = [-1, -1, -1];
            return;
        } else {
            habilitarBotones();
            listaBotones.forEach((boton) => {
                if (boton.current != null) {
                    boton.current.classList.remove('cell_winner');
                }
            });
        }

    }, [listaBotones, pintarCeldasGanadoras, desabilitarBotones]);

    return (
        <div className="board_container">
            <div className='board'>
                <button className={agregarColor(0)} onClick={() => realizarMovimiento(0)} ref={btn1}>{celdas[0]}</button>
                <button className={agregarColor(1)} onClick={() => realizarMovimiento(1)} ref={btn2}>{celdas[1]}</button>
                <button className={agregarColor(2)} onClick={() => realizarMovimiento(2)} ref={btn3}>{celdas[2]}</button>
                <button className={agregarColor(3)} onClick={() => realizarMovimiento(3)} ref={btn4}>{celdas[3]}</button>
                <button className={agregarColor(4)} onClick={() => realizarMovimiento(4)} ref={btn5}>{celdas[4]}</button>
                <button className={agregarColor(5)} onClick={() => realizarMovimiento(5)} ref={btn6}>{celdas[5]}</button>
                <button className={agregarColor(6)} onClick={() => realizarMovimiento(6)} ref={btn7}>{celdas[6]}</button>
                <button className={agregarColor(7)} onClick={() => realizarMovimiento(7)} ref={btn8}>{celdas[7]}</button>
                <button className={agregarColor(8)} onClick={() => realizarMovimiento(8)} ref={btn9}>{celdas[8]}</button>
            </div>
        </div>
    )
}

export { Board };