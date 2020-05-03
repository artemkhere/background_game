import express from 'express';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import db from '../dbConnection.js';
import config from '../config.js';

import handleLogin from '../api/login.js';
import handleAuth from '../api/auth.js';
import handleSignup from '../api/signup.js';

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
  res.status(200).send({ response: 'Server is running.' });
});

module.exports = router;
