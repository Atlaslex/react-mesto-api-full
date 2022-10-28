// module.exports = class AuthorizedError extends Error {
//   constructor(message) {
//     super(message);
//     this.message = 'Авторизуйтесь для доступа';
//     this.statusCode = 401;
//   }
// };

class AuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'LoginError';
    this.statusCode = 401;
  }
}

module.exports = AuthorizedError;
