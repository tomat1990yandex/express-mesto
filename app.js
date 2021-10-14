const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const usersRoutes = require('./routes/users.js');
const cardsRoutes = require('./routes/cards.js');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '6167fc2a59c7e9e59f86f0d7',
  };
  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb',
  async(err)=>{
    if(err) throw err;
    console.log("conncted to db")
  }
)

app.use(express.static(path.join(__dirname, '/public')));
app.use('/', cardsRoutes);
app.use('/', usersRoutes);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log(`Mesto is listening on port ${PORT}`);
});