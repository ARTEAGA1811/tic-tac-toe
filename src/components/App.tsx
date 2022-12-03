import '../styles/App.css';
import { Board } from './Board';

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<h1>TIC TAC TOE</h1>
			</header>
			<main className='main'>
				<section className='part_one'>
					<div className='score'>
						<div className='player'>
							<div className='specific_player'>Me</div>
							<span className='puntaje'>0</span>
						</div>
						<span>:</span>
						<div className='player'>
							<div className='specific_player'>AI</div>
							<span className='puntaje'>0</span>
						</div>
					</div>
					<Board />
				</section>
				<section className='part_two'>
					<div className='turns_container'>
						<div className='turn'>Your turn</div>
						<div className='current_turn turn'>AI turn</div>
					</div>
					<div className='buttons_container'>
						<button className='reset_game'>Start Game</button>
					</div>
				</section>
			</main>
			<footer className='footer'>
				<div>Created by <a target={"_blank"} href="https://github.com/ARTEAGA1811" rel="noreferrer">Art3</a></div>
			</footer>
		</div>
	);
}

export default App;
