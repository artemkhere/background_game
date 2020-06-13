import jwt from 'jsonwebtoken';

import config from '../../../config.js';

export default function verifyUser(userID, token) {
  const decodedToken = jwt.verify(token, config.privateKey);
  return decodedToken && decodedToken.id && decodedToken.id === userID;
}
