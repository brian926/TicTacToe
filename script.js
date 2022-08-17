document.addEventListener("DOMContentLoaded", () => {

    // Select all squares and add listener waiting for click
    document.querySelectorAll('#cells').forEach((cell) =>
        cell.addEventListener('click', (e) => {
            gameControls.makePlay(e, player1, player2, testBoard)
        })
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
    }

    rest() {
        this.controlBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        this.displayBoard = ["", "", "", "", "", "", "", "", ""]
    }
}

class Player {
    constructor(marker, name, plays=[]){
        this.marker = maker;
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
        wins = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]]
        
        let res = false

        wins.forEach(i=> {
            if(i.every((e) => array2.includes(e))){
                console.log("Winner")
                res = true
            }
        })

        return res
    }
}

const player1 = new Player("X")
const player2 = new Player("O")

