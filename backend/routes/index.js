import express from 'express';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import db from '../dbConnection.js';
import config from '../config.js';
import handleLogin from '../api/login.js';

const router = express.Router();

router.post('/api/login', async (req, res) => {
  const loginApiResponse = await handleLogin(req.body);
  // console.log(loginApiResponse)
  res.status(loginApiResponse.status).send(loginApiResponse.data)
});

router.post('/api/auth', async (req, res) => {
  if (req.body && req.body.token) {
    const { token } = req.body;
    const decodedToken = jwt.verify(token, config.privateKey);

    const user = await db.oneOrNone(
      "SELECT * FROM users WHERE id = $1",
      [decodedToken.id]
    );

    res.status(200).send({
      message: "Successfully authenticated.",
      id: user.id,
      email: user.email
    });
  } else {
    res.status(400).send({ message: 'Missing data.' });
  }
});

router.post('/api/signup', async (req, res) => {
  if (req.body && req.body.email && req.body.password) {
    const { email, password } = req.body;

    const emailValid = validator.isEmail(email);
    let emailTaken = false;

    // I need to sanitize password
    if (emailValid) {
      try {
        emailTaken = await db.oneOrNone('SELECT id FROM users WHERE email = $1', [email]);
      } catch (error) {
        res.status(500).send({ message: 'Server error on checking user email.' });
      }
    } else {
      res.status(400).send({ message: 'Email not valid.' });
    }

    if (emailValid && !emailTaken && password.length >= 4) {
      const saltRounds = 10;
      bcrypt.hash(password, saltRounds, async (error, hash) => {
        let newUserResponse = undefined;

        try {
          newUserResponse = await db.one(`
            INSERT INTO users(email, password, created_on)
            VALUES($1, $2, to_timestamp($3))
            RETURNING id`,
            [email, hash, Date.now() / 1000.0]
          );
        } catch (error) {
          res.status(500).send({ message: 'Failed user creation.' });
        }

        if (newUserResponse) {
          const id = newUserResponse.id;
          const token = jwt.sign({ id }, config.privateKey, { expiresIn: '30d' });

          res.status(200).send({
            message: "Successfully created a new user and signed in.",
            id,
            email,
            jwt: token
          });
        } else {
          res.status(500).send({ message: 'Failed user creation.' });
        }
      });
    } else {
      res.status(400).send({ message: 'Bad data.' });
    }
  } else {
    res.status(400).send({ message: 'Missing data.' });
  }
});

router.get('/', (req, res) => {
  res.status(200).send({ response: 'I am alive' });
});

module.exports = router;
