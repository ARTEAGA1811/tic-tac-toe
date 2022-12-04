export class Game {
    tablero: string[][];
    turnoActual: string;
    constructor(tablero: string[][], turnoActual: string) {
        // this.tablero = [['.', '.', '.'],
        // ['.', '.', '.'],
        // ['.', '.', '.']];
        this.tablero = tablero;
        // this.turnoActual = "X";
        this.turnoActual = turnoActual;
    }

    private dibujarTablero() {
        for (let i = 0; i < this.tablero.length; i++) {
            console.log(this.tablero[i]);
        }
    }

    //Retorna 'X' o 'O' si hay un ganador, '.' si es empate o null si el juego sigue
    private hayGanador() {
        //Horizontal win
        for (let i = 0; i < this.tablero.length; i++) {
            if (this.tablero[i][0] === this.tablero[i][1] && this.tablero[i][1] === this.tablero[i][2] && this.tablero[i][0] !== '.') {
                return this.tablero[i][0];
            }
        }

        //Horizontal win
        for (let i = 0; i < this.tablero.length; i++) {
            if (this.tablero[0][i] === this.tablero[1][i] && this.tablero[1][i] === this.tablero[2][i] && this.tablero[0][i] !== '.') {
                return this.tablero[0][i];
            }
        }

        //Diagonal win
        if (this.tablero[0][0] === this.tablero[1][1] && this.tablero[1][1] === this.tablero[2][2] && this.tablero[0][0] !== '.') {
            return this.tablero[0][0];
        }

        //Diagonal win
        if (this.tablero[0][2] === this.tablero[1][1] && this.tablero[1][1] === this.tablero[2][0] && this.tablero[0][2] !== '.') {
            return this.tablero[0][2];
        }

        //El juego sigue
        for (let i = 0; i < this.tablero.length; i++) {
            for (let j = 0; j < this.tablero.length; j++) {
                if (this.tablero[i][j] === '.') {
                    return null;
                }
            }
        }

        //Empate
        return '.';



    }

    private fmax() {

        //Valores para maxv son
        //-1 si pierde
        //0 si es empate
        //1 si gana

        let maxv = -2;

        let px = null;
        let py = null;

        const resultado = this.hayGanador();

        if (resultado === 'X') {
            return { maxv: -1, px: 0, py: 0 };
        } else if (resultado === 'O') {
            return { maxv: 1, px: 0, py: 0 };
        } else if (resultado === '.') {
            return { maxv: 0, px: 0, py: 0 };
        }

        for (let i = 0; i < this.tablero.length; i++) {
            for (let j = 0; j < this.tablero.length; j++) {
                if (this.tablero[i][j] === '.') {
                    //Juega O
                    this.tablero[i][j] = 'O';
                    const { minv, qx, qy } = this.fmin();
                    if (minv > maxv) {
                        maxv = minv;
                        px = i;
                        py = j;
                    }
                    this.tablero[i][j] = '.';
                }
            }
        }
        return { maxv, px, py };
    }

    private fmin() {

        //Valores para minv son
        //-1 si pierde
        //0 si es empate
        //1 si gana

        let minv = 2;

        let qx = null;
        let qy = null;

        const resultado = this.hayGanador();

        if (resultado === 'X') {
            return { minv: -1, qx: 0, qy: 0 };
        } else if (resultado === 'O') {
            return { minv: 1, qx: 0, qy: 0 };
        } else if (resultado === '.') {
            return { minv: 0, qx: 0, qy: 0 };
        }

        for (let i = 0; i < this.tablero.length; i++) {
            for (let j = 0; j < this.tablero.length; j++) {
                if (this.tablero[i][j] === '.') {
                    //Juega X
                    this.tablero[i][j] = 'X';
                    const { maxv, px, py } = this.fmax();
                    if (maxv < minv) {
                        minv = maxv;
                        qx = i;
                        qy = j;
                    }
                    this.tablero[i][j] = '.';
                }
            }
        }
        return { minv, qx, qy };
    }

    public jugar() {
        while (true) {
            this.dibujarTablero();
            const resultado = this.hayGanador();
            if (resultado != null) {
                if (resultado === 'X') {
                    console.log('Gana X');
                    break;
                }
                if (resultado === 'O') {
                    console.log('Gana O');
                    break;
                }
                if (resultado === '.') {
                    console.log('Empate');
                    break;
                }

                //Restart the object
                this.tablero = [['.', '.', '.'],
                ['.', '.', '.'],
                ['.', '.', '.']];
                this.turnoActual = "X";
            }

            //Sigue jugando
            if (this.turnoActual === 'X') {
                while (true) {
                    const { minv, qx, qy } = this.fmin();
                    console.log(`minv: ${minv}, qx: ${qx}, qy: ${qy}`);

                    const px = Number(prompt('Ingrese la fila'));
                    const py = Number(prompt('Ingrese la columna'));

                    if (this.tablero[px][py] === '.') {
                        this.tablero[px][py] = 'X';
                        this.turnoActual = 'O';
                        break;
                    } else {
                        console.log('Casilla ocupada');
                    }


                }
            }
            else {
                const { maxv, px, py } = this.fmax();
                console.log(`maxv: ${maxv}, px: ${px}, py: ${py}`);
                if (px != null && py != null) {
                    this.tablero[px][py] = 'O';
                    this.turnoActual = 'X';
                }
            }
        }
    }

    public obtenerMejorMovimiento() {
        const { maxv, px, py } = this.fmax();
        console.log(`maxv: ${maxv}, px: ${px}, py: ${py}`);
        return { maxv, px, py };
    }

    public convertirCoordenadas(px:number, py:number){
        let valor: number = 0;
        for (let i = 0; i<3; i++){
            for (let j = 0; j<3; j++){
                if (i === px && j === py){
                    return valor;
                }
                valor++;
            }
        }
        return -1;
    }
}