const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');
const { NOT_REGISTERED_MESSAGE } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET_KEY } = process.env;

module.exports = (req, res, next) => {
  console.log(NODE_ENV);
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET_KEY : 'dev-secret');
  } catch (err) {
    next(new AuthorizationError(NOT_REGISTERED_MESSAGE));
  }
  req.user = payload;
  return next();
};
