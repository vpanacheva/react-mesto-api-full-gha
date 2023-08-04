require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const limiter = require('./middlewares/rateLimiter');

const routeSignup = require('./routes/signup');
const routeSignin = require('./routes/signin');

const auth = require('./middlewares/auth');

const routeUsers = require('./routes/users');
const routeCards = require('./routes/cards');

const NotFoundError = require('./errors/NotFoundError');
const error = require('./middlewares/error');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const URL = 'mongodb://127.0.0.1:27017/mestodb';

const { PORT = 3001, DBPORT = URL } = process.env;

mongoose.set('strictQuery', true);

mongoose
  .connect(DBPORT)
  .then(() => {
    console.log('БД успешно подключена');
  })
  .catch(() => {
    console.log('Не удалось подключиться к БД');
  });

const app = express();

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(limiter);

app.use(requestLogger); //подключение логгера запросов

app.use('/', routeSignup);
app.use('/', routeSignin);

app.use(auth);

app.use('/users', routeUsers);
app.use('/cards', routeCards);

app.use(errorLogger); //подключение логгера ошибок
app.use(errors()); //обработчик ошибок celebrate

// централизованный обработчик ошибок
app.use((req, res, next) => next(new NotFoundError('Страницы по запрошенному URL не существует')));

app.use(error);

app.listen(PORT);
