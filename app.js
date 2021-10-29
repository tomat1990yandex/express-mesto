const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors, celebrate, Joi } = require('celebrate');

const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');

const { loginUser, createUser } = require('./controllers/usersController');
const { auth } = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  loginUser);

app.post('/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser);

mongoose.connect('mongodb://localhost:27017/mestodb',
  async (err) => {
    if (err) throw err;
    console.log('connected to db');
  });

app.use('/users', auth, usersRoutes);
app.use('/cards', auth, cardsRoutes);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

app.use(errors());

app.use((err, req, res, next) => {
  const { message } = err;
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'Произошла ошибка на сервере'
      : message,
  });
  next();
});

app.listen(PORT, () => {
  console.log(`Mesto is listening on port ${PORT}`);
});
