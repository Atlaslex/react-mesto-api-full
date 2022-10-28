const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const AuthorizationError = require('../errors/AuthorizedError');
const { LOGIN_ERROR_MESSAGE } = require('../utils/constants');
const { validationLink } = require('../middlewares/validation');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: validationLink,
      message: 'Ссылка не является валидной',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Значение не соответствует Email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthorizationError(LOGIN_ERROR_MESSAGE));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthorizationError(LOGIN_ERROR_MESSAGE));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);

// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const NotDataError = require('../errors/NotPassOrEmail');
// const { LinksRegExp } = require('../utils/all-reg-exp');

// const {
//   userNameValidator,
//   userAboutValidator,
//   userEmailValidator,
// } = require('../validators/validators');

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: false,
//     default: 'Жак-Ив Кусто',
//     validate: userNameValidator,
//   },
//   about: {
//     type: String,
//     default: 'Исследователь',
//     validate: userAboutValidator,
//   },
//   avatar: {
//     type: String,
//     default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
//     validate: {
//       validator(v) {
//         return LinksRegExp.test(v);
//       },
//       message: (props) => `${props.value} Неверный формат URL-ссылки!`,
//     },
//   },

//   email: {
//     type: String,
//     unique: true,
//     required: true,
//     validate: userEmailValidator,
//   },
//   password: {
//     type: String,
//     required: true,
//     select: false,
//   },
// });

// userSchema.statics.findUserByCredentials = function (email, password) {
//   return this.findOne({ email }).select('+password')
//     .then((user) => {
//       if (!user) {
//         throw new NotDataError();
//       }
//       return Promise.all([
//         user,
//         bcrypt.compare(password, user.password),
//       ]);
//     });
// };

// module.exports = mongoose.model('user', userSchema);
