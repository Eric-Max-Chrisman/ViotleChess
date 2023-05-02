// GAME LOGIC
const chessBoard = document.getElementById('chessboard');
const squares = Array.from(chessBoard.getElementsByTagName('td'));

const pieces = [];

squares.forEach((square) => {
  const str = square.id;
  const arr = str.split(' ');
  const x = arr[0];
  const y = arr[1];

  const piece = {
    x,
    y,
    name: '-',
    team: 0, // 0 = space, 1 = white, 2 = black
  };

  pieces.push(piece);

  // make all squares clickable
  square.addEventListener('click', () => {
    console.log(`${x} ${y}`);
  });
});

// Print function
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
printTable();
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
