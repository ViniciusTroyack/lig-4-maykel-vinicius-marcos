let table = [
    ["X", "X", "X", "X", "X", "X", "X"],
    ["X", "X", "X", "X", "X", "X", "X"],
    ["X", "X", "X", "X", "X", "X", "X"],
    ["X", "X", "X", "X", "X", "X", "X"],
    ["X", "X", "X", "X", "X", "X", "X"],
    ["X", "X", "X", "X", "X", "X", "X"],

];

let game = document.querySelector("#game");
let timerContainer = document.getElementById('timerContainer')
//FUNCAO PARA CRIAR TABALE COM BASE NA ARRAY TABLE   
const createTable = () => {
    document.getElementById('game').innerHTML = '';
    document.getElementById('timerContainer').innerHTML = '';
        for (let i = 0; i < 7; i++) {
            let column = document.createElement("div");
            column.setAttribute('id', i)
            column.classList.add("column");
            game.append(column);
            column.addEventListener('click', changeTurn)
            for (let j = 0; j < table.length; j++) {
                let cell = document.createElement("div");
                cell.classList.add("cell");
                column.append(cell);

            }
        }
        const timer = document.createElement('div')
        timer.setAttribute('id','timer')
        setTimeout(function() {
        return timerContainer.appendChild(timer)}, 1000);
    }
    //funcao reiniciar table
const restartTable = () => {
    let game = document.getElementById('game');
    game.innerHTML = "";
    for (let i = 0; i < table.length; i++) {
        for (let j = 0; j < table[i].length; j++) {
            table[i][j] = "X";
        }
    }    
}
let timerID
function timer() {
    let sec = 0;
    let min = 0;
    let hr = 0;
    timerID = setInterval(function() {
        let timer = (hr < 10 ? '0' + hr : hr) + ':' + (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec);
        document.getElementById("timer").innerHTML = timer;
       
        if (sec === 59) {
            min++;
            sec = 0;
        }
        if (min === 60) {
            hr++;
            min = 0;
        }
        sec++
    }, 1000);
}

const stopTimer = () => {
    clearInterval(timerID);
}

//chamada mensagem de vitoria
const finalMsg = (player) => {
  
    if (player === 'alertEmpate') {
        const alert = document.createElement('div')
        alert.classList.add(player)
        const message = document.createElement('p')
        message.innerText = 'Go to the next turn!'
        alert.appendChild(message)
        game.appendChild(alert)
       
    } else if (player === 'alertPlayer1') {
        const alert = document.createElement('div')
        alert.classList.add(player)
        const message = document.createElement('p')
        message.innerText = 'Congratulations, You save the princess Zelda!'
        alert.appendChild(message)
        game.appendChild(alert)
       
    } else if (player === 'alertPlayer2') {
        const alert = document.createElement('div')
        alert.classList.add(player)
        const message = document.createElement('p')
        message.innerText = 'Oh no!!! The vilain catch the princess...'
        alert.appendChild(message)
        game.appendChild(alert)
     
    }
}

// vitória horizontal
const horizontalVictory = (arr) => {
    const edgeX = arr[0].length - 3;

    // iterar em cada linha
    for (let i = 0; i < arr.length; i++) {

        // iterar em cada célula da linha em questão
        for (let j = 0; j < edgeX; j++) {
            let cell = arr[i][j];

            if (cell === 'V') {
                // Checar se as próximas 3 células têm o mesmo valor V
                if (cell === arr[i][j + 1] && cell === arr[i][j + 2] && cell === arr[i][j + 3]) {
                    finalMsg("alertPlayer1")
                    stopTimer();
                    break
                }
            } else if (cell === 'P') {
                // Checar se as próximas 3 células têm o mesmo valor P
                if (cell === arr[i][j + 1] && cell === arr[i][j + 2] && cell === arr[i][j + 3]) {
                    const alert = document.createElement('div')
                    finalMsg("alertPlayer2")
                    stopTimer();
                    break
                }
            }
        }
    }
}

// vitória vertical
const verticalVictroy = (arr) => {
    const edgeY = arr.length - 3

    for (let i = 0; i < edgeY; i++) {

        // iterar cada célula na linha
        for (let j = 0; j < arr[0].length; j++) {
            cell = arr[i][j];

            if (cell === 'V') {
                // Checar se as próximas 3 células têm o mesmo valor
                if (cell === arr[i + 1][j] && cell === arr[i + 2][j] && cell === arr[i + 3][j]) {
                    finalMsg("alertPlayer1")
                    stopTimer();
                }
            } else if (cell === 'P') {
                // Checar se as próximas 3 células têm o mesmo valor
                if (cell === arr[i + 1][j] && cell === arr[i + 2][j] && cell === arr[i + 3][j]) {
                    finalMsg("alertPlayer2")
                    stopTimer();
                }
            }
        }
    }
}

//vitoria diagonal
const diagonalWin = (player) => {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
            if (player === table[i][j] && player === table[i + 1][j + 1] && player === table[i + 2][j + 2] && player === table[i + 3][j + 3]) {
                if (player === "V") {
                    finalMsg("alertPlayer1")
                    stopTimer();
                } else {
                    finalMsg("alertPlayer2")
                    stopTimer();
                }
            }
        }
    }
    for (let i = 5; i > 2; i--) {
        for (let j = 0; j < 4; j++) {
            if (player === table[i][j] && player === table[i - 1][j + 1] && player === table[i - 2][j + 2] && player === table[i - 3][j + 3]) {
                if (player === "V") {
                    finalMsg("alertPlayer1")
                    stopTimer();
                } else {
                    finalMsg("alertPlayer2")
                    stopTimer();
                }
            }
        }
    }
}

// empate
const draw = (arr) => {
    let cont = 0
    for (let i = 0; i < arr[0].length; i++) {
        if (arr[0][i] !== 'X') {
            cont++
        }
    }
    if (cont === 7) {
        finalMsg('alertEmpate')
        stopTimer();
    }
}

const registerPosition = (id, player) => {

    for (let i = 5; i >= 0; i--)
        if (table[i][id] === "X") {
            table[i][id] = player
            break;
        }
    console.log(table);
}

const columns = document.querySelectorAll('.column')
let turn = 'turn1'

// FUNÇÃO DE MUDANÇA DE TURNO E COLOCAÇÃO DOS DISCOS
const changeTurn = (evt) => {
    // selecionar a coluna

    let selectedColumn = evt.currentTarget

    // selecionar última célula vazia da coluna
    let celula
    for (let i = 0; i < selectedColumn.childNodes.length; i++) {
        if (selectedColumn.childNodes[i].childElementCount === 0) {
            celula = selectedColumn.childNodes[i]
        }
    }

    if (turn === 'turn1') { // turno do jogador 1
        // colocar o disco do jogador 1
        const disc1 = document.createElement('div')
        disc1.classList.add('disc1')
        celula.appendChild(disc1)
        turn = 'turn2'
        registerPosition(Number(selectedColumn.id), "V");
        diagonalWin("V")
    } else { // turno do jogador 2
        // colocar o disco do jogador 2
        const disc2 = document.createElement('div')
        disc2.classList.add('disc2')
        celula.appendChild(disc2)
        turn = 'turn1'
        registerPosition(Number(selectedColumn.id), "P");
        diagonalWin("P")
    }

    horizontalVictory(table)
    verticalVictroy(table)
    draw(table)
}

const toStart = () => {
    turn = 'turn1' 
    restartTable();
    createTable();
    stopTimer();
    timer();
}

const toRestar = () => {
    turn = 'turn1' 
    restartTable();
    createTable();
    stopTimer()
    timer()
}

const btnStart = document.getElementById("start");
btnStart.addEventListener('click', toStart);

const btnRestart = document.getElementById("restart");
btnRestart.addEventListener('click', toRestar);
