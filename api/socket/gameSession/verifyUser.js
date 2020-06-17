import jwt from 'jsonwebtoken';

export default function verifyUser(userID, token) {
  const decodedToken = jwt.verify(token, process.env.PRIVATE_KEY);
  return decodedToken && decodedToken.id && decodedToken.id === userID;
}
