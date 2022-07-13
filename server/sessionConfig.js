require('dotenv').config();
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const sessionConfig = {
  store: new FileStore(), // хранилище сессий
  key: process.env.COOKIE_NAME, // ключ куки
  secret: process.env.SECRET, // шифрование id сессии
  resave: false, // пересохранение сессии (когда что-то поменяли - false)
  saveUninitialized: false, // сохраняем только зарегестрированных
  httpOnly: true, // нельзя изменить куки с фронта
  cookie: { expires: 24 * 60 * 60e3 },
};

module.exports = sessionConfig;
