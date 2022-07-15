require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const sessionConfig = require('./sessionConfig');
const sittersRouter = require('./routes/sitters.route');

const app = express();

const PORT = process.env.PORT || 3100;

app.use(morgan('dev'));

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(session(sessionConfig));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/sitters', sittersRouter);

app.listen(PORT, () => {
  console.log(`Server is up on port: ${PORT}!`);
});
