require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./middlewares/error-handler');
const routes = require('./routes/index');
const NotFoundError = require('./utils/errorcodes/not-found-error');

const { PORT = 3006 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
// mongoose.connect('mongodb://localhost:3000/mestodb');
app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(routes);

app.use((req, res, next) => {
  next(new NotFoundError());
});
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT} / Приложение запущено, используется порт ${PORT}.`);
});
