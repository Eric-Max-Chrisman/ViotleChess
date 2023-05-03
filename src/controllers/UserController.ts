import { Request, Response } from 'express';
import argon2 from 'argon2';
import {
  addUser,
  getUserByEmail,
  getUserById,
  updateEmailAdress,
  getUserByUsername,
} from '../models/UserModel';
// import { parseDatabaseError } from '../utils/db-utils';
import { getAllSetsByOwner } from '../models/SetModel';
import { getAllPiecesByOwner } from '../models/PieceModels';

async function getAuthUserNameFromSession(req: Request): Promise<string | null> {
  const { authenticatedUser } = req.session;

  if (!authenticatedUser) {
    return null;
  }
  return authenticatedUser.userName;
}

async function indexPageLoad(req: Request, res: Response): Promise<void> {
  const userName = await getAuthUserNameFromSession(req);
  res.render('index.ejs', { userName });
}

async function registerUser(req: Request, res: Response): Promise<void> {
  const { email, userName, password } = req.body as AuthRequest;

  // IMPORTANT: Hash the password
  const passwordHash = await argon2.hash(password);

  try {
    // IMPORTANT: Store the `passwordHash` and NOT the plaintext password
    const newUser = await addUser(email, userName, passwordHash);
    // await addUser(email, userName, passwordHash);
    console.log(newUser);
    // res.sendStatus(201);
    res.render('login.ejs', {});
  } catch (errorMes) {
    res.render('error.ejs', { errorMes });
  }
}

async function logIn(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body as LoginRequest;

  // console.log(`Email: ${email}`);
  const user = await getUserByEmail(email);
  // console.log(`User: ${user.email}`);
  // console.log(`Username: ${user.userName}`);

  // Check if the user account exists for that email
  const errorMes: string = "User Email or Password doesn't match";
  if (!user) {
    res.render('error.ejs', { errorMes });
    // res.sendStatus(404); // 404 Not Found (403 Forbidden would also make a lot of sense here)
    return;
  }

  // The account exists so now we can check their password
  const { passwordHash } = user;

  // If the password does not match

  if (!(await argon2.verify(passwordHash, password))) {
    /*
    if (!req.session.logInAttempts) {
      // req.sessions isnt implemented properly yet. Something wierd with it not finding my d.ts file.
      req.session.logInAttempts = 1; // Initialize to zero if it doesnt exist yet
    } else {
      req.session.logInAttempts += 1; // Increment by one
    }
    */
    res.render('error.ejs', { errorMes });
    // res.sendStatus(404); // 404 Not Found (403 Forbidden would also make a lot of sense here)
    return;
  }

  // The user has successfully logged in
  // NOTES: We will update this once we implement session management

  // UNCOMMENT WHEN SESSIONS ARE FIXED
  await req.session.clearSession();
  req.session.authenticatedUser = {
    userId: user.userId,
    email: user.email,
    userName: user.userName,
  };
  req.session.isLoggedIn = true;
  res.redirect(`/users/${user.userName}`);
  // res.sendStatus(200); // 200 OK
}

async function updateUserEmail(req: Request, res: Response): Promise<void> {
  const { userId } = req.params as UserIdParam;
  const { isLoggedIn, authenticatedUser } = req.session;

  if (!isLoggedIn || authenticatedUser.userId !== userId) {
    res.sendStatus(403); // 403 Forbidden
    return;
  }

  const { email } = req.body as { email: string };

  // Get the user account
  const user = await getUserById(userId);
  if (!user) {
    res.sendStatus(404); // 404 Not Found
    return;
  }

  try {
    // Now update their email address (THIS SHOULD BE IN A try/catch)
    // It was omitted for space on the sldie
    // check to see if works
    const oldUser = await getUserById(userId);
    const updatedUser = await updateEmailAdress(userId, email);
    // console.log('DEBUG TEST: OLD USER');
    console.log(oldUser);
    // console.log('NEW USER');
    console.log(updatedUser);
  } catch (err) {
    console.log(err);
    res.sendStatus(501);
    return;
  }

  res.sendStatus(200);
}

// not intended for clients to use
// for other functions
async function getUserWithUsername(req: Request, res: Response): Promise<void> {
  const { userName } = req.params as UsernameParam;
  const ownerId = req.session.authenticatedUser.userId;

  const tempUser = await getUserByUsername(userName);
  const sets = await getAllSetsByOwner(ownerId);
  const pieces = await getAllPiecesByOwner(ownerId);

  if (!tempUser) {
    const errorMes = "User Doesn't exist";
    res.render('error', { errorMes });
    return;
  }

  if (!sets) {
    const errorMes = 'No sets available';
    res.render('error', { errorMes });
    return;
  }

  res.render('userPage.ejs', { tempUser, sets, pieces });
}

async function loadFindPage(req: Request, res: Response): Promise<void> {
  const userName = await getAuthUserNameFromSession(req);
  res.render('findUser.ejs', { userName });
}

async function redirectUserPage(req: Request, res: Response): Promise<void> {
  const { userName } = req.body as UserPageRequest;

  if (!userName) {
    const errorMes: string = "Can't Use Empty (replace this with joi)";
    res.render('error.ejs', { errorMes });
  }

  const tempUser = await getUserByUsername(userName);
  if (!tempUser) {
    const errorMes: string = "User doesn't exist";
    res.render('error.ejs', { errorMes });
  }

  res.redirect(`/users/${userName}`);
}

export {
  registerUser,
  logIn,
  updateUserEmail,
  getUserWithUsername,
  indexPageLoad,
  loadFindPage,
  redirectUserPage,
};
