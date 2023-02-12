// index.ts (Eric)
import { board } from './board';

console.log("Chess program started.")
const x:number = 8;// set up board
const y:number = 8;
const myChessBoard = new board (x,y); // data struc that holds on piece objects
myChessBoard.createBoard(); // creates blank board
let moveGood: number = 1; // sential, if check move makes a vaild move return 1; otherwise the player no longer wishes to play so return 0 and end loop and code
// 0 = quit
// 1 = bad move
// 2 = good move
// game loop

do{
    while(moveGood == 1){
      moveGood = 0;
    }
    if(moveGood != 0){

    }
    else{
        console.log("thanks for playing! Ending program.")
    }

}while(moveGood != 0) // not 0 = move made / 0 = players wish to stop program

console.log("thanks for playing! Ending program.")
