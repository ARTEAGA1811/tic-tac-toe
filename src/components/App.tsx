import '../styles/App.css';
import React from 'react'
import { Board } from './Board';
import { Score } from './Score';
import { IState} from '../interfaces/interface';
import { Winner } from './Winner';


const initialState: IState = {
	turnoInicial: 'X',
	ultimoGanador: '',
	turno: 'X',
	celdas: Array(9).fill(null),
	ganador: false,
	puntaje: {
		'X': 0,
		'O': 0,
	},
	numberRound: 0,
}

function App() {
	//Ref al button
	const restartButtonRef = React.useRef<HTMLButtonElement>(null);
	const [estado, setEstado] = React.useState<IState>(initialState);
	
	const reiniciarJuego = () => {
		setEstado(initialState);
	}


	React.useEffect(() => {
		if (estado.celdas.every((celda) => celda === null) && estado.numberRound === 0) {
			//Add visibility hidden to the button
			//console.log(restartButtonRef.current);
			if (restartButtonRef.current) {
				restartButtonRef.current.style.visibility = 'hidden';
			}
		} else {
			//Add visibility visible to the button
			if (restartButtonRef.current) {
				restartButtonRef.current.style.visibility = 'visible';
			}
		}
	}, [estado.celdas, estado.numberRound]);

	return (
		<div className="App">
			<header className="App-header">
				<h1>TIC TAC TOE</h1>
			</header>
			<main className='main'>

				<Score puntaje={estado.puntaje}/>
				<Board estado={estado} setEstado={setEstado}/>

				<div className='turns_container'>
					<div className={(estado.turno === 'X' ? 'current_turn' : '' )+' turn'}>Your turn</div>
					<div className={(estado.turno === 'O' ? 'current_turn' : '' )+' turn'}>AI turn</div>
				</div>

				<div className='buttons_container'>
					<button className='reset_game' onClick={reiniciarJuego} ref={restartButtonRef}>Restart Game</button>
				</div>

			</main>
			{estado.ganador && <Winner estado={estado} setEstado={setEstado}/>}
			<footer className='footer'>
				<div>Created by <a target={"_blank"} href="https://github.com/ARTEAGA1811" rel="noreferrer">Art3</a></div>
			</footer>
		</div>
	);
}

export default App;
