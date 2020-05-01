import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import db from '../dbConnection.js';
import config from '../config.js';

export default async function handleLogin(body) {
  if (!body || !body.email || !body.password) {
    return { status: 400, data: { message: 'Missing data.' } };
  }

  const { email, password } = body;
  const emailValid = validator.isEmail(email);
  let emailTaken = false;
  let user = undefined;

  if (!emailValid || password.length < 4) {
    return { status: 400, data: { message: 'Bad data.' } };
  }

  try {
    user = await db.oneOrNone(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
  } catch (error) {
    return { status: 500, data: { message: 'Failed fetching the user.' } };
  }


  console.log(user)

  if (!user) {
    return { status: 403, data: { message: 'User not found.' } };
  }

  const match = await bcrypt.compare(password, user.password);
  if (match) {
    const id = user.id;
    const token = await jwt.sign({ id }, config.privateKey, { expiresIn: '30d' });

    return {
      status: 200,
      data: {
        message: "Successfully signed in.",
        id,
        email,
        jwt: token
      }
    }
  }

  return { status: 403, data: { message: 'Wrong password.' } };
}
