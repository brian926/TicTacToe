class Player {
    constructor(marker, name){
        this.marker = maker;
        this.guess = 0;
        this.name = name;
    }
}
// Player 1 and 2, 1 gets X while 2 gets O
class Board {
    constructor(){
        this.cells = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
    wins = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]]

    draw() {
        // Draw grid in HTML
    }

    turn(player, guess) {
        // Player marker on board
    }

    check_win(moves) {
        // Check if for each array in win are those numbers included in array moves
    }
}

class Game {
    player1 = new Player('X', 'Player1')
    player2 = new Player('O', 'Player2')
    board = new Board

    play() {
        board.draw()

        while (true) {
            
        }
    }
}
// Board, if one of the arrays for win is currenty that marker wins
// Game, while true play


