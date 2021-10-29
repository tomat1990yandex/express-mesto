const jwt = require('jsonwebtoken');
const { AuthError } = require('../errors/authError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError('Необходимо авторизоваться');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'super-crypto-strong-passphrase');
  } catch (err) {
    throw new AuthError('Необходимо авторизоваться');
  }
  req.user = payload;

  next();
};
