document.addEventListener("DOMContentLoaded", () => {

    // Select all squares and add listener waiting for click
    document.querySelectorAll('.cells').forEach((cell) =>
        cell.addEventListener('click', () => {
            gameControls.makePlay(cell.value, testBoard)
        })
    )

    document.getElementById('newBtn').addEventListener("click", () => 
        gameControls.nextGame(testBoard)
    )
})



class GameBoard {
    // Construct controlBoard and displayBoard
    constructor() {
        this.controlBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        this.displayBoard = ["", "", "", "", "", "", "", "", ""]
    }

    // if displayBoard is full, game is over
    fullBoard() {
        if(!this.displayBoard.includes("")){
            return true
        }
    }

    // Add player mark to displayBoard and change the index in controlBoard to 0
    markBoard(play, playerMark) {
        if (this.controlBoard.includes(play)) {
            let index = this.controlBoard.findIndex((e) => e === play)
            this.controlBoard[index] = 0
            this.displayBoard[index] = playerMark
            return true
        }
        else {
            return false
        }
    }

    boardReset() {
        this.controlBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        this.displayBoard = ["", "", "", "", "", "", "", "", ""]
    }
}

class Player {
    constructor(marker, name, plays=[]){
        this.marker = marker;
        this.plays = plays;
        this.name = name;
    }

    addPlay(play) {
        this.plays.push(play)
    }

    clearPlays(){
        this.plays = []
    } 

    // If one of the winning arrays values is in plays, player has won
    hasWon() {
        let wins = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]]
        let res = false
        wins.forEach(i=> {
            if(i.every((e) => this.plays.includes(e))){
                res = true
            }
        })

        return res
    }
}

const displayControls = (() => {

    function showCurrentPlayer(player) {
        let nextPlayer
        player.name == player1.name ? nextPlayer = player2.name : nextPlayer = player1.name
        
        const playerSpan = document.querySelector('#player')
        playerSpan.innerText = nextPlayer
    }

    function boardUpdate(displayBoard) {
        for (let i = 0; i < displayBoard.length; i++) {
            let activeCell = document.getElementById(`${i}`)
            activeCell.innerText = displayBoard[i]
        }
    }

    function setWinner(player) {
        const winner = document.querySelector('#winner')
        winner.innerText = `${player.name} has won!`
    }

    function clearWinner() {
        const winner = document.querySelector('#winner')
        winner.innerText = ''
    }

    function tie() {
        const winner = document.querySelector('#winner')
        winner.innerText = 'It\'s a tie!'
    }

    function wrongChoice() {
        const winner = document.querySelector('#winner')
        winner.innerText = 'Square already in use'
    }

    return {
        boardUpdate, 
        showCurrentPlayer, 
        setWinner, 
        clearWinner, 
        tie, 
        wrongChoice
    }
})()

const gameControls = (() => {

    playerSign = true
    function togglePlayer() {
        if(playerSign) {
            playerSign = false
            return player1
        }
        else{
            playerSign = true
            return player2
        }
    }

    function clearGame(activeBoard) {
        player1.clearPlays()
        player2.clearPlays()
        activeBoard.boardReset()
    }

    function nextGame(activeBoard) {
        clearGame(activeBoard)
        displayControls.boardUpdate(activeBoard.displayBoard)
        displayControls.clearWinner()
        displayControls.showCurrentPlayer(togglePlayer())
    }

    function endGame(player, activeBoard) {
        console.log(player.plays, player.hasWon())
        if (player.hasWon()){
            displayControls.setWinner(player)
            clearGame(activeBoard)
        } else if (activeBoard.fullBoard()){
            displayControls.tie()
            clearGame(activeBoard)
            displayControls.boardUpdate(activeBoard.displayBoard)
        }
    }

    function makePlay(eventI, activeBoard) {
        displayControls.clearWinner()
        let player = togglePlayer()
        let cellValue = parseFloat(eventI)
        let check = activeBoard.markBoard(cellValue, player.marker)
        if(check) {
            player.addPlay(cellValue)
            displayControls.boardUpdate(activeBoard.displayBoard)
            displayControls.showCurrentPlayer(player)
        } else {
            displayControls.wrongChoice()
        }
        endGame(player, activeBoard)
    }

    return {makePlay, nextGame}
    
})()

const testBoard = new GameBoard()
let currentBoard = testBoard.displayBoard
const player1 = new Player("X", "Player 1")
const player2 = new Player("O", "Player 2")