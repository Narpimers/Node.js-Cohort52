import newDatabase from './database.js'
import { hash, compare } from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

// Change this boolean to true if you wish to keep your
// users between restart of your application
const isPersistent = false
const database = newDatabase({isPersistent})
const saltRounds = 12;
const JWTtoken = "TheWorseTokenEver"

// Create middlewares required for routes defined in app.js
// export const register = async (req, res) => {};

// You can also create helper functions in this file to help you implement logic
// inside middlewares

const isValidUser = (req) => {
    if (!req.body.username || !req.body.password) {
    return false
  } 
  
    return true
};

const getToken = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return false
  }
  return authHeader.split(' ')[1];
};


export const createNewUser = async (req, res) => {
    if (!isValidUser(req)) {
    res.status(400).json({ message: "Missing name or password" });
    return
  };

  const newUser = {
    username: req.body.username,
    password: ''
  }

  const hashedPassword = await hash(req.body.password, saltRounds);
  newUser.password = hashedPassword;

  const storedObject = database.create(newUser);
  res.status(201).json({ id: storedObject.id, username: storedObject.username });
}

export const login = async (req, res) => {
  const { id, password } = req.body;

  if (!id || !password) {
    return res.status(400).json({ message: "Missing id or password" });
  }

  const user = database.getById(id);

  if (!user) {
    return res.status(400).json({ message: "No such user ID" });
  }

  const passwordIsValid = await compare(password, user.password);

  if (!passwordIsValid) {
    return res.status(400).json({ message: "Password is not correct" });
  }

  const token = jsonwebtoken.sign({ id: user.id }, JWTtoken);
  res.status(201).json({ token });
};

export const getProfileInfo = (req, res) => {
  const token = getToken(req);
  try {
    const decodedUser = jsonwebtoken.verify(token, JWTtoken);
    res.status(200).json({ id: decodedUser.id})
  } catch (error) {

    return res.status(400).json({ message: "Incorrect session token" });
  }
};
