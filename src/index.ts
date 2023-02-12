import express, {Express} from 'express';

const app: Express = express();
const PORT = 3636;

app.listen(PORT, () => {
  console.log('listening on port ${PORT}')
});

