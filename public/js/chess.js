// GAME LOGIC
const chessBoard = document.getElementById('chessboard');
const squares = Array.from(chessBoard.getElementsByTagName('td'));

squares.forEach((square) => {
  // make all squares clickable
  square.addEventListener('click', () => {
    console.log(square.id);
  });

  //
});

// CHAT ROOM AND PLAYER MANAGMENT
const messages = document.getElementById('messages');
const chatForm = document.getElementById('chatForm');
const chatMessage = document.getElementById('chatMessage');
const playerOneEle = document.getElementById('playerOneName');
const playerTwoEle = document.getElementById('playerTwoName');

let playerOneName;
let playerTwoName;

const socket = io();

socket.on('enteredChat', (msg, playerOne, playerTwo) => {
  // enter
  playerOneName = playerOne;
  playerTwoName = playerTwo;
  playerOneEle.innerHTML = playerOneName;
  playerTwoEle.innerHTML = playerTwoName;

  const item = document.createElement('li');
  item.classList.add('enterChatMessage');
  item.textContent = `${msg}`;
  messages.appendChild(item);
});

socket.on('exitedChat', (msg) => {
  // leave
  const item = document.createElement('li');
  item.classList.add('enterChatMessage');
  item.textContent = `${msg}`;
  messages.appendChild(item);
});

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (chatMessage.value) {
    socket.emit('chatMessage', chatMessage.value);
    chatMessage.value = '';
  }
});

socket.on('chatMessage', (name, msg) => {
  const item = document.createElement('li');
  item.classList.add('chatMessage');
  item.textContent = `${name}: ${msg}`;
  messages.appendChild(item);
});
