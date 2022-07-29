require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const path = require("path");
const cors = require("cors");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const http = require('http');
const sittersRouter = require("./routes/sitters.route");
const usersRouter = require("./routes/users.route");
const search = require("./routes/search.router");
const favorit = require("./routes/favorit.router");
const reviews = require("./routes/reviews.router");
const uploader = require("./middleware/uploader");

const { User, Address, Sitter, Sitter_images } = require("./db/models");

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});
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

app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// * регистрация и авторизация

// eslint-disable-next-line consistent-return
app.get("/login/user", async (req, res) => {
  try {
    if (req.session.userId) {
      const user = await User.findOne({
        where: {
          id: req.session.userId,
        },
        include: [
          {
            model: Address,
            attributes: ["address", "zip_code", "region", "district", "city", "settlement", "street", "latitude", "longitude", "area"],
          },
          {
            model: Sitter,
            attributes: ["id"],
          },
        ],
      });
      if (user) {
        if (!user.Address) {
          user.Address = {};
        }
        return res.json(user);
      }
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

app.post("/registration", async (req, res) => {
  const { login, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
      first_name: login,
      last_name: "",
      email,
      password: hashedPassword,
    });

    req.session.userId = newUser.id; // добавляем в сессию айди
    req.session.email = newUser.first_name;
    res.json(newUser);
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email,
      },
      include: [
        {
          model: Address,
          attributes: ["address", "zip_code", "region", "district", "city", "settlement", "street", "latitude", "longitude", "area"],
        },
        {
          model: Sitter,
          attributes: ["id"],
        },
      ],
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

    res.json(user);

    // добавляем в сессию айди нового юзер
  } catch (error) {
    console.log(error);
  }
});

app.get("/logout", async (req, res) => {
  req.session.destroy(); // уничтожвет сессию
  res.clearCookie(process.env.COOKIE_NAME); // чистит кук

  res.sendStatus(200); // делает редирект
});

/// все ситтеры

// app.get("/allSitters", async (req, res) => {
//   try {
//     const allSitters = await User.findAll({
//       order: [["createdAt", "DESC"]],
//       raw: true,
//       include: {
//         model: Sitter,
//         attributes: ["desc", "id"],
//       },
//     });
//     console.log(allSitters);
//     console.log(allSitters[0]["Sitter.desc"]);
//     res.json({ allSitters });
//   } catch (error) {
//     console.log(error);
//   }
// });

app.get("/allSitters", async (req, res) => {
  try {
    const allSitters = await Sitter.findAll({
      order: [["createdAt", "DESC"]],
      raw: true,
      include: {
        model: User,
        attributes: ["desc", "id", "first_name", "last_name", "profile_photo"],
      },
    });
    console.log(allSitters);
    console.log(allSitters[0]["User.desc"]);
    res.json({ allSitters });
  } catch (error) {
    console.log(error);
  }
});

app.get("/allSitters/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const onePost = await Sitter.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: ["desc", "id", "first_name", "last_name", "profile_photo"],
        },
        {
          model: Sitter_images,
          attributes: ["url"],
        },
      ],
    });
    res.json(onePost);
  } catch (error) {
    console.log(error);
  }
});
///
app.post("/uploads", uploader.array("images", 30), (req, res) => {
  try {
    if (req.files) {
      return res.status(200).json(req.files.map((file) => file.filename));
    }
  } catch (error) {
    console.log(error);
  }
});

app.use("/sitters", sittersRouter);
app.use("/search", search);
app.use("/reviews", reviews);
app.use("/favorit", favorit);

app.use("/users", usersRouter);

const registerMessageHandlers = require('./handlers/messageHandlers')
const registerUserHandlers = require('./handlers/userHandlers')

const onConnection = (socket) => {
  // выводим сообщение о подключении пользователя
  console.log('User connected SOCKET');

  // получаем название комнаты из строки запроса "рукопожатия"
  const { roomId } = socket.handshake.query
  // сохраняем название комнаты в соответствующем свойстве сокета
  socket.roomId = roomId

  // присоединяемся к комнате (входим в нее)
  socket.join(roomId)

  // регистрируем обработчики
  // обратите внимание на передаваемые аргументы
  registerMessageHandlers(io, socket)
  // registerUserHandlers(io, socket)

  // обрабатываем отключение сокета-пользователя
  socket.on('disconnect', () => {
    // выводим сообщение
    console.log('User disconnected')
    // покидаем комнату
    socket.leave(roomId)
  })
}

// обрабатываем подключение
io.on('connection', onConnection)

server.listen(PORT, () => {
  console.log(`Server is up on port: ${PORT}!`);
});
