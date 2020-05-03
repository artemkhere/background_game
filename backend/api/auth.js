import jwt from 'jsonwebtoken';

import db from '../dbConnection.js';
import config from '../config.js';

export default async function handleAuth(body) {
  if (!body || !body.token) {
    return { status: 400, data: { message: 'Missing data.' } };
  }

  const { token } = body;
  const decodedToken = jwt.verify(token, config.privateKey);

  const user = await db.oneOrNone(
    "SELECT * FROM users WHERE id = $1",
    [decodedToken.id]
  );

  if (!user) {
    return { status: 404, data: { message: 'User not found.' } };
  }

  return {
    status: 200,
    data: {
      message: "Successfully authenticated.",
      id: user.id,
      email: user.email
    }
  };
}
