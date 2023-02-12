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


