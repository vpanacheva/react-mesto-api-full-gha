// импортируем нужные модули
const winston = require('winston');
const expressWinston = require('express-winston');

// создадим логгер запросов
const requestLogger = expressWinston.logger({
  transports: [ //опуия transports отвечает за то? куда нужно писать лог + это массив? в который можно записать др/транспорты
    new winston.transports.File({ filename: 'request.log' }),
  ],
  format: winston.format.json(), //опция format отвечает за формат записи логов
});

// логгер ошибок
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
