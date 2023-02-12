import express, {Express} from 'express';
import { Point2D } from './types/Point2D';

const app: Express = express();
const PORT = 3636;


const pointExample = new Point2D(4, 5);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
  console.log(`New Point is (${pointExample.getX()}, ${pointExample.getY()})`);
});




