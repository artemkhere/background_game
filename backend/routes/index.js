import express from 'express';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import db from '../dbConnection.js';
import config from '../config.js'

const router = express.Router();

router.get('/api/login', (req, res) => {
  console.log('hit that')
  res.status(200).send({ response: 'I am alive' });
});

router.post('/api/signup', async (req, res) => {
  if (req.body && req.body.email && req.body.password) {
    const { email, password } = req.body;

    const emailValid = validator.isEmail(email);
    let emailTaken = false;

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
          const userID = newUserResponse.id;
          const token = jwt.sign({ userID }, config.privateKey, { expiresIn: '30d' });

          res.status(200).send({
            message: "Successfully created a new user and signed in.",
            userID,
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
