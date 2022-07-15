require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const path = require("path");
const cors = require("cors");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const sittersRouter = require('./routes/sitters.route');
const search = require('./routes/search.router');

const { User } = require("./db/models");

const app = express();

const PORT = process.env.PORT || 3100;
const saltRounds = 10;

const sessionConfig = {
  store: new FileStore(), // хранилище сессий
  key: process.env.COOKIE_NAME, // ключ куки
  secret: process.env.SECRET, // шифрование id сессии
  resave: false, // пересохранение сессии (когда что-то поменяли - false)
  saveUninitialized: false, // сохраняем только зарегестрированных
  httpOnly: true, // нельзя изменить куки с фронта
  cookie: { expires: 24 * 60 * 60e3 },
};

app.use(session(sessionConfig));

app.use((req, res, next) => {
  if (req.session.userId) {
    res.locals.userId = req.session.userId;
    res.locals.email = req.session.email;
    res.locals.name = req.session.name;
  }
  next();
});

app.use(morgan("dev"));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.use(session(sessionConfig));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// * регистрация и авторизация

// eslint-disable-next-line consistent-return
app.get("/login/user", async (req, res) => {
  try {
    if (req.session.userId) {
      const user = await User.findByPk(req.session.userId);
      if (user) {
        return res.json(user);
      }
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

app.post("/registration", async (req, res) => {
  console.log("req.body.login", req.body.login);
  const { login, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
      first_name: login,
      last_name: '',
      email,
      password: hashedPassword,
    });

    req.session.userId = newUser.id; // добавляем в сессию айди
    req.session.email = newUser.first_name;
    console.log("req.session.userId", req.session.userId);
    res.json({ id: req.session.userId, email: req.session.email, first_name: req.session.first_name });
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("НЕ ВЫХОДИТ", email);
  console.log("email", email);
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("no such login!");
    }

    const isValidPass = await bcrypt.compare(password, user.password);

    if (!isValidPass) {
      throw new Error("no such password!");
    }

    req.session.userId = user.id; // добавляем в сессию айди
    req.session.email = user.email;
    req.session.name = user.name;

    console.log("user.name", user.name);

    res.json({ id: req.session.userId, email: req.session.email, name: req.session.name });

    // добавляем в сессию айди нового юзер
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

app.get("/logout", async (req, res) => {
  req.session.destroy(); // уничтожвет сессию
  res.clearCookie(process.env.COOKIE_NAME); // чистит кук

  res.sendStatus(200); // делает редирект
});

app.use('/sitters', sittersRouter);
app.use('/search', search);

app.listen(PORT, () => {
  console.log(`Server is up on port: ${PORT}!`);
});
