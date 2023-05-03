// GAME LOGIC
const chessBoard = document.getElementById('chessboard');
const squares = Array.from(chessBoard.getElementsByTagName('td'));

const pieces = [];
let playerTurn;
let chosenAlly;
let chosenAllyColor;
let chosenEnemey;
let chosenEnemeyColor;

squares.forEach((square) => {
  const coord = square.id;
  const arr = coord.split(' ');
  const x = arr[0];
  const y = arr[1];

  const piece = {
    x,
    y,
    name: '-',
    team: 2, //  0 = white, 1 = black, 2 - empty
  };

  pieces.push({ ...piece });

  // make all squares clickable
  square.addEventListener('click', () => {
    console.log(`${x} ${y}`);

    clickEvent(x, y, square);
  });
});

// Print function
/*
function printTable() {
  for (let i = 0; i < pieces.length; i += 1) {
    if (i < 16) {
      pieces[i].team = 1;
    }
    if (i > 47) {
      pieces[i].team = 2;
    }

    if (pieces[i].team === 0) {
      squares[i].innerHTML = ' ';
    } else {
      if (pieces[i].team === 1) {
        squares[i].style.color = 'Crimson';
      } else {
        squares[i].style.color = 'Gold';
      }
      squares[i].innerHTML = pieces[i].name;
    }
  }
}
*/
// CHAT ROOM AND PLAYER MANAGMENT
const messages = document.getElementById('messages');
const chatForm = document.getElementById('chatForm');
const chatMessage = document.getElementById('chatMessage');
const playerOneEle = document.getElementById('playerOneName');
const playerTwoEle = document.getElementById('playerTwoName');

let playerOneName;
let playerTwoName;

function changeNames(playerOne, playerTwo) {
  playerOneName = playerOne;
  playerTwoName = playerTwo;

  if (playerOneName) {
    playerOneEle.innerHTML = playerOneName;
  } else {
    playerOneEle.innerHTML = '---';
  }
  if (playerTwoName) {
    playerTwoEle.innerHTML = playerTwoName;
  } else {
    playerTwoEle.innerHTML = '---';
  }
}

const socket = io();

const setName = document.getElementById('setName').innerHTML;
socket.emit('setName', setName);

// update values

// printTable();

socket.on('enteredChat', (msg, playerOne, playerTwo) => {
  // enter
  changeNames(playerOne, playerTwo);

  const item = document.createElement('li');
  item.classList.add('enterChatMessage');
  item.textContent = `${msg}`;
  messages.appendChild(item);
});

socket.on('exitedChat', (msg, playerOne, playerTwo) => {
  // leave
  changeNames(playerOne, playerTwo);
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

socket.on('print', (elements) => {
  for (let i = 0; i < pieces.length; i += 1) {
    pieces[i].team = 2;
  }
  for (let i = 0; i < elements.length; i += 1) {
    const tempValue = elements[i][0];
    squares[i].innerHTML = tempValue;
    pieces[i].name = tempValue;

    const tempNumber = Number(elements[i][1]);
    if (tempNumber === 0) {
      squares[i].style.color = 'Crimson';
      pieces[i].team = 0;
    } else if (tempNumber === 1) {
      squares[i].style.color = 'Gold';
      pieces[i].team = 1;
    } else {
      pieces[i].team = 2;
    }
  }
});
