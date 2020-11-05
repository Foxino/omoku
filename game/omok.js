class Board {
    clearBoard(){
        for (let i = 0; i < (this.x*this.y); i++) {
            this.board[i] = 0
        }
    }
    square(x, y){
        return this.board[(x * this.x) + y]
    }
    place(x, y, p){
        
        console.log(x, y)
        this.board[(x * this.x) + y] = p
    }
    constructor(x, y){
        this.x = x
        this.y = y
        this.board = []
        this.clearBoard()
    }
}