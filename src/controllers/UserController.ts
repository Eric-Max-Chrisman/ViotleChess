import { Request, Response } from 'express';
import argon2 from 'argon2';
import {
  addUser,
  getUserByEmail,
  getUserById,
  updateEmailAdress,
  getUserByUsername,
} from '../models/UserModel';
import { parseDatabaseError } from '../utils/db-utils';

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
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

async function logIn(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body as LoginRequest;

  console.log(`Email: ${email}`);
  const user = await getUserByEmail(email);
  console.log(`User: ${user.email}`);
  console.log(`Username: ${user.userName}`);

  // Check if the user account exists for that email
  if (!user) {
    const errorMes: string = "User Email Doesn't Exist";
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
    const errorMes: string = "User Password doesn't match";
    res.render('error.ejs', { errorMes });
    res.sendStatus(404); // 404 Not Found (403 Forbidden would also make a lot of sense here)
    return;
  }

  // The user has successfully logged in
  // NOTES: We will update this once we implement session management

  // UNCOMMENT WHEN SESSIONS ARE FIXED
  await req.session.clearSession();
  req.session.authenticatedUser = {
    userId: user.userId,
    email: user.email,
  };
  req.session.isLoggedIn = true;
  res.redirect(`/${user.userName}`);
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
    console.log('DEBUG TEST: OLD USER');
    console.log(oldUser);
    console.log('NEW USER');
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
  const tempUser = await getUserByUsername(userName);

  if (!tempUser) {
    const errorMes = "User Doesn't exist";
    res.render('error', { errorMes });
    return;
  }

  res.render('userPage.ejs', { tempUser });
}

export { registerUser, logIn, updateUserEmail, getUserWithUsername };
