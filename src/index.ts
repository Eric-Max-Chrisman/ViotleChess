// index.ts (Eric)
import express, { Express } from 'express';
import { ChessTemplate } from './types/ChessTemplate';
import { Point2D } from './types/Point2D';

const app: Express = express();
const PORT = 3636;

const pointExample = new Point2D(4, 5);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
  console.log(`New Point is (${pointExample.getX()}, ${pointExample.getY()})`);
});

console.log('Chess program started.');
const myChessBoard = new ChessTemplate();
// console.log(myChessBoard);

// Testing Point2D methods

const pointTest = new Point2D(4, 5); // should output 44: 8(5) + 4
const index: number | undefined = pointTest.convertToIndex();

console.log(`The index of Point (4, 5) is ${index}`);

// const moveGood: number = 1; // sential, if check move makes a vaild move return 1; otherwise the player no longer wishes to play so return 0 and end loop and code
// 0 = quit
// 1 = bad move
// 2 = good move
// game loop

/*
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
*/

console.log('Thanks for playing! Ending the program.');
