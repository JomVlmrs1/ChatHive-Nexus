const socket = io('https://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const name = prompt('What is your name?')
appendMesaage('You joined the chat')
socket.emit('new-user', name)

socket.on('chat-message', data => {
    appendMesaage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
    appendMesaage(`${name} connected`)
})

socket.on('user-disconnected', name => {
    appendMesaage(`${name} disconnected`)
})

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMesaage(`You: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

function appendMesaage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}