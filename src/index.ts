// index.ts (Eric)
import dotenv from 'dotenv';
import express, { Express, Request, Response, NextFunction } from 'express';
import './config';
import 'express-async-errors';
import session from 'express-session';
import connectSqlite3 from 'connect-sqlite3';
import { Server, Socket } from 'socket.io';
import {
  createNewSet,
  getSetWithName,
  getSetWithId,
  addNewPieceToSet,
  redirectToSet,
} from './controllers/setController';
import {
  generateMoves,
  getPieceData,
  createPiece,
  addNewMove,
  redirectMovePage,
  displayPiece,
  deleteUserPiece,
} from './controllers/PieceController';
import { VolatileBoard } from './types/VolatileBoard';

// import { ChessTemplate } from './types/ChessTemplate';
import {
  registerUser,
  logIn,
  getUserWithUsername,
  indexPageLoad,
  loadFindPage,
  redirectUserPage,
} from './controllers/UserController';
import { loadChessPage, loadDeafulatChessPage } from './controllers/chessController';
//
dotenv.config();
const app: Express = express();
const { PORT, COOKIE_SECRET } = process.env;

const SQLiteStore = connectSqlite3(session);

// WebSockets this replaces the normal express sessions code.
const sessionMiddleware = session({
  store: new SQLiteStore({ db: 'sessions.sqlite' }),
  secret: COOKIE_SECRET,
  cookie: { maxAge: 8 * 60 * 60 * 1000 }, // 8 hours
  name: 'session',
  resave: false,
  saveUninitialized: false,
});

app.use(sessionMiddleware);

app.use(express.json());

// html stuff
app.use(express.static('public', { extensions: ['html'] }));
app.use(express.urlencoded({ extended: false }));

// ejs set up (all redirects should be ejs renders)
app.set('view engine', 'ejs');

// endpoints to webpages
app.get('/', indexPageLoad);
app.get('/createUser', (req, res) => {
  res.render('createUser.ejs', {});
});
app.get('/login', (req, res) => {
  res.render('login.ejs', {});
});
app.get('/createPiece', (req, res) => {
  res.render('createPiece.ejs', {});
});
app.get('/chess/:setName', loadChessPage);
app.get('/users/:userName', getUserWithUsername);

// function endpoints
app.post('/users', registerUser); // Create Account
app.post('/login', logIn); // Log in to an account
app.post('/createPiece', createPiece);
app.get('/piece');
app.get('/piece/:pieceId', getPieceData);
app.post('/:pieceId/move', addNewMove); // You need to add a controller function for this inorder to pass a parameter into addMove
app.get('/:pieceId/move', redirectMovePage);
app.get('/piece/remove/:pieceId', deleteUserPiece);
app.delete('/piece/remove/:pieceId', deleteUserPiece);

app.post('/piece/:pieceId/generate', generateMoves);
app.get('/piece/view/:pieceId', displayPiece);

// sets
app.post('/set/createSet', createNewSet);
app.get('/set/createSet', redirectToSet);
app.get('/set/name/:setName', getSetWithName);
app.get('/set/id/:setId', getSetWithId);
app.post('/set/:setId/addPiece', addNewPieceToSet);
// test
app.get('/test', (req, res) => {
  res.render('test.ejs', {});
});

app.get('/users', loadFindPage);
app.post('/userRedirect', redirectUserPage);

app.get('/chess', loadDeafulatChessPage);

const server = app.listen(PORT, () => {
  console.log(`listsening at http://localhost:${PORT}`);
});
// test

// console.log('Chess program started.');
// const myChessBoard = new ChessTemplate();

// Testing Point2D methods

// const pointTest = new Point2D(4, 5); // should output 44: 8(5) + 4
// const index: number | undefined = pointTest.convertToIndex();

// console.log(`The index of Point (4, 5) is ${index}`);

// socket code
const connectedClients: Record<string, CustomWebSocket> = {};
let playerOne: string;
let playerTwo: string;
const playerTurn: boolean = true; // playerOne = true, playerTwo = false
let firstPlayerJoined: boolean = false;

const socketServer = new Server<ClientToServerEvents, ServerToClientEvents, null, null>(server);

socketServer.use((socket, next) => {
  const res = {} as Response;
  sessionMiddleware(socket.request as Request, res, next as NextFunction);
});

// game sever
socketServer.on('connection', (socket) => {
  const req = socket.request;
  // const res = {} as Response;

  // We need this chunk of code so that socket.io
  // will automatically reload the session data
  // don't change this code
  socket.use((__, next) => {
    req.session.reload((err) => {
      if (err) {
        socket.disconnect();
      } else {
        next();
      }
    });
  });

  // This is just to make sure only logged in users
  // are able to connect to a game
  if (!req.session.isLoggedIn) {
    console.log('An unauthenticated user attempted to connect.');
    socket.emit('redirectLogin', '/login');
    socket.disconnect();
    return;
  }

  const { authenticatedUser } = req.session;
  const { userName } = authenticatedUser;

  console.log(`${userName} has connected`);

  // olny two people allowed
  if (playerOne === undefined) {
    playerOne = userName;
  } else if (playerTwo === undefined) {
    playerTwo = userName;
  } else if (userName !== playerOne || userName !== playerTwo) {
    // console.log(userName);
    // console.log('GET OUT');
    return;
  }

  // console.log('player one is');
  // console.log(playerOne);
  // console.log('playerTwo is');
  // console.log(playerTwo);

  connectedClients[userName] = socket;

  socket.on('disconnect', () => {
    delete connectedClients[userName];
    console.log(`${userName} has disconnected`);

    // got to free that space now
    if (userName === playerOne) {
      playerOne = undefined;
    } else if (userName === playerTwo) {
      playerTwo = undefined;
    }
    socketServer.emit('exitedChat', `${userName} has left the chat.`, playerOne, playerTwo);
  });
  //
  socketServer.emit('enteredChat', `${userName} has entered the chat`, playerOne, playerTwo);

  socket.on('chatMessage', (msg: string) => {
    console.log(`received a chatMessage event from the client: ${userName}`);
    socketServer.emit('chatMessage', userName, msg);
  });

  async function startGame(setName: string): Promise<void> {
    firstPlayerJoined = true;
    const myVolatileBoard = new VolatileBoard(setName);
    await myVolatileBoard.asyncConstructor();
  }

  socket.on('setName', (setName: string) => {
    console.log(setName);
    console.log(`setName: ${setName.toString()}`);

    // start game
    if (!firstPlayerJoined) {
      startGame(setName);
    }
  });
});
