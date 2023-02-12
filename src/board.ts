// import {pieces} from './pieces'
export class board{
  constructor(x: number, y: number){
    this.x = x;
    this.y = y;

    // loop to generate space for pieces
    for(let i: number = 0; i < x; i++){// x axis
      // gamePieces.push([piece])
      for(let j: number = 0; j < y; j++){// y axis
        // gamePieces[i].push(piece)
      }
    }
  }

  // makes empty board with pieces in right place. Changes turn to white. Calls printBoard()
  createBoard(){
    for(let i: number = 0; i < x; i++){// x axis
      // gamePieces.push([piece])
      for(let j: number = 0; j < y; j++){// y axis
        // gamePieces[i].push(piece)
      }
    }
  }

  // cin move vaildation loop that returns 1 if move maded is vaild, returns 0 if players wish to quit. Calls makeMove()
  checkMove(){

  }

  // once move is identified to be okey. change the board to refelct that move. Calls printBoard()
  makeMove(){

  }

  // prints board to the screen / may have to be private
  printBoard(){

  }

  private x: number;
  private y: number;
  // private gamePieces: pieces[][];
  private playerMove: boolean = false; // fasle = white's turn // true = black's trun


};

//////////////////////////////////////////////////////////////////////////////
// board.ts (Eric)
include (all chess pieces)
type ChessBoard(x,y) = {
    //attributes
    const x:int = x; // board width
    const y:int = y; // board height
    let gamePieces: pieces = [size x by y]; // 2D array of every chess square
    let playerMove: bool = 0; // 0 = white's turn / 1 = black's turn

    //methods
    checkMove(); // cin move vaildation loop that returns 1 if move maded is vaild, returns 0 if players wish to quit. Calls makeMove()
    makeMove(x,y,newX,newY); // once move is identified to be okey. change the board to refelct that move. Calls printBoard()
    createBoard(); // makes empty board with pieces in right place. Changes turn to white. Calls printBoard()
    printBoard(); // prints board to the screen / may have to be private
}

// board functions
// cin move vaildation loop that returns 1 if move maded is vaild, returns 0 if players wish to quit. Calls makeMove()
function checkMove(): bool{
    let tempBool:bool = 0; // player made vaild move (1) or wants to quit (0)
    let flag:bool = 1; // repeats while loop until inupt from user is vaild; 1 = not vaild; 0 = vaild and move on
    do{
        // TODO check if move vaild
        // expected to call piece's move vaild button with gamePieces array
    }while(flag);
    if(tempBool){
        makeMove(sdfsaf);
    }
    return tempBool;
}

// once move is identified to be okey. change the board to refelct that move. Calls printBoard()
function makeMove(x,y,newX,newY): void{
    // move piece their
    // delete dead piece
    // delete position where the piece was
    printBoard();
}

// makes empty board with pieces in right place. Changes turn to white. Calls printBoard()
function createBoard(): void{
    // TODO after pieces are added maybe
}

// prints board to the screen / may have to be private
function printBoard(): void{
    for(i = 0; i <= x; i++){
        for(j = 0; j <= y; j++){
            // TODO
        }
    }
}
