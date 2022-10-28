require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const { errors } = require('celebrate');
const err = require('./middlewares/error');
const router = require('./routes');
const corsMiddleware = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/loger');

const { PORT = 3000 } = process.env;

const app = express();
app.use(corsMiddleware);
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(err);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const { celebrate, Joi, errors } = require('celebrate');
// const routesUser = require('./routes/users');
// const routesCard = require('./routes/cards');
// const { login, createUser } = require('./controllers/users');
// const { isAuthorized } = require('./middlewares/auth');
// const { errorHandler } = require('./middlewares/error');

// const corsMiddleware = require('./middlewares/cors');

// const { LinksRegExp } = require('./utils/all-reg-exp');
// const NotFoundError = require('./errors/ErrorNotFound');

// const { PORT = 3000 } = process.env;
// const app = express();

// app.use(corsMiddleware);
// mongoose.connect('mongodb://localhost:27017/mestodb');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/users', isAuthorized, routesUser);
// app.use('/cards', isAuthorized, routesCard);
// app.post('/signin', celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required()
// .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru'] } }),
//     password: Joi.string().required(),
//   }),
// }), login);
// app.post('/signup', celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().min(2).max(30),
//     about: Joi.string().min(2).max(30),
//     avatar: Joi.string().pattern(LinksRegExp),
//     email: Joi.string().required()
// .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru'] } }),
//     password: Joi.string().required(),
//   }),
// }), createUser);

// app.use((req, res, next) => {
//   next(new NotFoundError());
// });
// app.use(errors());
// app.use(errorHandler);

// app.listen(PORT, () => {
//   console.log(`App listening on port ${PORT} / Приложение запущено, используется порт ${PORT}.`);
// });
