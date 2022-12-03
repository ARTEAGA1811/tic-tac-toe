export interface IPuntaje {
	'X': number,
	'O': number,
}

export interface IState {
	turnoInicial: string,
	ultimoGanador: string,
	turno: string,
	celdas: Array<string | null>,
	ganador: boolean,
	puntaje: IPuntaje,
	numberRound: number,
}

//Create an interface with Istate and add the parameter setEstado
export interface IBoard {
	estado: IState,
	setEstado: React.Dispatch<React.SetStateAction<IState>>,
}

export interface IWinner{
	estado: IState,
	setEstado: React.Dispatch<React.SetStateAction<IState>>,
}
