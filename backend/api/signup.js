import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import db from '../dbConnection.js';
import config from '../config.js';

export default async function handleSignup(body) {
  if (!body || !body.email || !body.password) {
    return { status: 400, data: { message: 'Missing data.' } };
  }

  const { email, password } = body;

  if (!validator.isEmail(email) || password.length < 4) {
    return { status: 400, data: { message: 'Bad data.' } };
  }

  let emailTaken = false;
  try {
    emailTaken = await db.oneOrNone('SELECT id FROM users WHERE email = $1', [email]);
  } catch (error) {
    return { status: 500, data: { message: 'Server error on checking user email.' } };
  }

  if (emailTaken) {
    return { status: 400, data: { message: 'Email taken.' } };
  }

  const saltRounds = 10;
  let hash = undefined;

  try {
    hash = await bcrypt.hash(password, saltRounds);
  } catch (error) {
    return { status: 500, data: { message: 'Failed generating safe password.' } };
  }

  let newUserResponse = undefined;
  try {
    newUserResponse = await db.one(`
      INSERT INTO users(email, password, created_on)
      VALUES($1, $2, to_timestamp($3))
      RETURNING id`,
      [email, hash, Date.now() / 1000.0]
    );
  } catch (error) {
    return { status: 500, data: { message: 'Failed user creation.' } };
  }

  const id = newUserResponse.id;
  const token = jwt.sign({ id }, config.privateKey, { expiresIn: '30d' });

  return {
    status: 200,
    data: {
      message: "Successfully created a new user and signed in.",
      id,
      email,
      jwt: token
    }
  };
}
