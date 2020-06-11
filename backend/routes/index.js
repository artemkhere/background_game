import express from 'express';
import path from 'path';

import handleLogin from '../api/user/login.js';
import handleAuth from '../api/user/auth.js';
import handleSignup from '../api/user/signup.js';

const router = express.Router();

router.post('/api/login', async (req, res) => {
  const loginApiResponse = await handleLogin(req.body);
  res.status(loginApiResponse.status).send(loginApiResponse.data)
});

router.post('/api/auth', async (req, res) => {
  const authApiResponse = await handleAuth(req.body);
  res.status(authApiResponse.status).send(authApiResponse.data)
});

router.post('/api/signup', async (req, res) => {
  const signupApiResponse = await handleSignup(req.body);
  res.status(signupApiResponse.status).send(signupApiResponse.data)
});

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// router.get('/', (req, res) => {
//   res.status(200).send({ response: 'Server is running.' });
// });

module.exports = router;
