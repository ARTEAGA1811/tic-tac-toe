import '../styles/App.css';
import { Board } from './Board';

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<h1>TIC TAC TOE</h1>
			</header>
			<main className='main'>

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


				<div className='turns_container'>
					<div className='turn'>Your turn</div>
					<div className='current_turn turn'>AI turn</div>
				</div>
				<div className='buttons_container'>
					<button className='reset_game'>Start Game</button>
				</div>

			</main>
			<section className='winner_container'>
				<h2 className='message'><span className='winner'>AI</span> has won!</h2>
				<button className='next_round_button'>Go to the next round</button>
			</section>
			<footer className='footer'>
				<div>Created by <a target={"_blank"} href="https://github.com/ARTEAGA1811" rel="noreferrer">Art3</a></div>
			</footer>
		</div>
	);
}

export default App;
