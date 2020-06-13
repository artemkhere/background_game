import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import db from '../../dbConnection.js';
import config from '../../config.js';

export default async function handleLogin(body) {
  if (!body || !body.email || !body.password) {
    return { status: 400, data: { message: 'Missing data.' } };
  }

  const { email, password } = body;
  let user = undefined;

  try {
    user = await db.oneOrNone(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
  } catch (error) {
    return { status: 500, data: { message: 'Failed fetching the user.' } };
  }

  if (!user) {
    return { status: 403, data: { message: 'User not found.' } };
  }

  let match = undefined;
  try {
    match = await bcrypt.compare(password, user.password);
  } catch (error) {
    return { status: 500, data: { message: 'Could not verify password.' } };
  }

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