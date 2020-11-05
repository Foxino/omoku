const socket = io('http://localhost:3000')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const messageContainer = document.getElementById('message-container')
const gameContainer = document.getElementById('game-container')

const size = 15


const name = prompt("What is your name?")
appendMessage('You Joined')
socket.emit('new-user', name)

let gameBoard = new Board(size, size)
let visualBoard = []
buildBoard(gameBoard)

socket.on('chat-message', data =>{
    appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name =>{
    appendMessage(`${name} connected! :D`)
})

socket.on('user-disconnected', name =>{
    appendMessage(`${name} disconnected! :(`)
})

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

function appendMessage(message){
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)

}

function buildBoard(board){
    gameContainer.innerHTML = '';
    for (let x = 0; x < board.board.length; x++) {
        visualBoard[x] = document.createElement("div")
        
        let _x = Math.floor(x / 15);
        let _y = x % 15;

        visualBoard[x].addEventListener("click", () => {
            console.log(x)
            gameBoard.place(_x, _y, 1) //fix to add player
            buildBoard(board)
        })

        if(gameBoard.square(_x, _y) == 1){
            visualBoard[x].classList.add("x")
        }

        
        if(gameBoard.square(_x, _y) == 2){
            visualBoard[x].classList.add("y")
        }

        visualBoard[x].id = x


        //visualBoard[x].innerText = (x+1)
        gameContainer.append(visualBoard[x])
    }
}
