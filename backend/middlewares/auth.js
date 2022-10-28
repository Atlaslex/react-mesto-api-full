const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizedError');
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

// const jwt = require('jsonwebtoken');
// const User = require('../models/user');
// const AuthorizedError = require('../errors/AuthorizedError');

// const SECRET_KEY = 'very_secret';

// const throwUnauthorizedError = () => {
//   const error = new Error('Авторизуйтесь для доступа');
//   error.statusCode = 401;
//   throw error;
// };

// const isAuthorized = ((req, res, next) => {
//   const { authorization } = req.headers;

//   if (!authorization) {
//     throw throwUnauthorizedError();
//   }
//   try {
//     const token = () => jwt.verify(authorization.replace('Bearer ', ''), SECRET_KEY);
//     const payload = token();
//     User.findOne({ id: payload._id }).then((user) => {
//       if (!user) {
//         throwUnauthorizedError();
//       }
//     });
//     req.user = payload;
//   } catch (err) {
//     next(new AuthorizedError('Авторизуйтесь для доступа'));
//   }

//   next();
// });

// module.exports = { isAuthorized };
