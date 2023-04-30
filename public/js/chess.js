const chessBoard = document.getElementById('chessboard');
const squares = Array.from(chessBoard.getElementsByTagName('td'));

squares.forEach((square) => {
  square.addEventListener('click', () => {
    console.log(square.id);
  });
});
