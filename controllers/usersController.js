const User = require('../models/user');

const checkDataError = (res, err) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res
      .status(400)
      .send({ message: `Переданы некоректные данные: ${err}` });
  }
  return res.status(500).send({ message: `Произошла ошибка на сервере: ${err}` });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => checkDataError(res, err));
};

const getProfile = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => checkDataError(res, err));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((err) => checkDataError(res, err));
};

const getMyProfile = (req, res) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch((err) => checkDataError(res, err));
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => checkDataError(res, err));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => checkDataError(res, err));
};

module.exports = {
  getUsers,
  getProfile,
  createUser,
  getMyProfile,
  updateProfile,
  updateAvatar,
};
