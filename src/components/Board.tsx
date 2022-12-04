import React from 'react'
import '../styles/Board.css'
import { IBoard } from '../interfaces/interface'
import { Game } from '../business/Game';
import { time } from 'console';
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
    //console.log(listaBotones);
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

    const realizarMovimientoJugador = (index: number) => {
        if (turno === 'X') {
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
    }

    const realizarMovimientoIA = () => {
        console.log('IA');
        console.log(celdas);
        console.log(turno);
        if (turno === 'O' && !estado.ganador) {
            //Creamos una matriz compatible con la clase Game
            const celdasAuxiliar = celdas.map((celda) => {
                if (celda === null  || celda === '') {
                    return '.';
                }
                return celda;
            });

            const matriz = [
                [celdasAuxiliar[0], celdasAuxiliar[1], celdasAuxiliar[2]],
                [celdasAuxiliar[3], celdasAuxiliar[4], celdasAuxiliar[5]],
                [celdasAuxiliar[6], celdasAuxiliar[7], celdasAuxiliar[8]],
            ];
            // for (let i = 0; i < matriz.length; i++){
            //     for (let j = 0; j < matriz[i].length; j++){
            //         if (matriz[i][j] === '' || matriz[i][j] === null){
            //             matriz[i][j] = '.';
            //     }
            // }
            
            const juegoAI = new Game(matriz, turno);
            let {px, py } = juegoAI.obtenerMejorMovimiento();
            px = px === null ? 0 : px;
            py = py === null ? 0 : py;

            const indiceEscogido = juegoAI.convertirCoordenadas(px, py);

            const newCeldas = [...celdas];
                newCeldas[indiceEscogido] = turno;
                setEstado((preValue) => {
                    return {
                        ...preValue,
                        celdas: newCeldas,
                        turno: 'X' ,
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

    React.useEffect(()  => {
        if (turno === 'O') {
            const auxFunc = async () => {
                await new Promise(f => setTimeout(f, 800));
                realizarMovimientoIA();
            }
            auxFunc();         
        }
    }, [celdas]);
    return (
        <div className="board_container">
            <div className='board'>
                <button className={agregarColor(0)} onClick={() => realizarMovimientoJugador(0)} ref={btn1}>{celdas[0]}</button>
                <button className={agregarColor(1)} onClick={() => realizarMovimientoJugador(1)} ref={btn2}>{celdas[1]}</button>
                <button className={agregarColor(2)} onClick={() => realizarMovimientoJugador(2)} ref={btn3}>{celdas[2]}</button>
                <button className={agregarColor(3)} onClick={() => realizarMovimientoJugador(3)} ref={btn4}>{celdas[3]}</button>
                <button className={agregarColor(4)} onClick={() => realizarMovimientoJugador(4)} ref={btn5}>{celdas[4]}</button>
                <button className={agregarColor(5)} onClick={() => realizarMovimientoJugador(5)} ref={btn6}>{celdas[5]}</button>
                <button className={agregarColor(6)} onClick={() => realizarMovimientoJugador(6)} ref={btn7}>{celdas[6]}</button>
                <button className={agregarColor(7)} onClick={() => realizarMovimientoJugador(7)} ref={btn8}>{celdas[7]}</button>
                <button className={agregarColor(8)} onClick={() => realizarMovimientoJugador(8)} ref={btn9}>{celdas[8]}</button>
            </div>
        </div>
    )
}

export { Board };