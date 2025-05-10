import express from 'express';
import { createNewUser, login, getProfileInfo } from './users.js';


export const app = express();

app.use(express.json());

app.post('/auth/register', (req, res) => {
  createNewUser(req, res);
})

app.post('/auth/login', (req, res) => {
  login(req, res);
})

app.get('/auth/profile', (req, res) => {
   getProfileInfo(req, res)
}) ;

app.post('/auth/logout', (req, res) => {
 res.status(204).send('successful logout');
})
// Serve the front-end application from the `client` folder
app.use(express.static('client'));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
