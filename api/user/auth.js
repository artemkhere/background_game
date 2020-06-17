import jwt from 'jsonwebtoken';

import getDB from '../../dbConnection.js';

export default async function handleAuth(body) {
  if (!body || !body.token) {
    return { status: 400, data: { message: 'Missing data.' } };
  }

  const { token } = body;
  const decodedToken = jwt.verify(token, process.env.PRIVATE_KEY);
  const db = getDB();

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
