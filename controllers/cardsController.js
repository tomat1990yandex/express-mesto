const Card = require('../models/card');

const checkDataError = (res, err) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res
      .status(400)
      .send({ message: `Переданы некорректные данные: ${err}` });
  }
  return res.status(500).send({ message: `Произошла ошибка на сервере: ${err}` });
};

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send({ cards }))
    .catch((err) => checkDataError(res, err));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(200).send({ body: card }))
    .catch((err) => checkDataError(res, err));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Карточка не найдена' });
      }
      return res.status(200).send({ data: card });
    });
};

const putLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Карточка не найдена' });
      }
      return res.status(200).send({ data: card });
    })
    .catch((err) => checkDataError(res, err));
};

const removeLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Карточка не найдена' });
      }
      return res.status(200).send({ data: card });
    })
    .catch((err) => checkDataError(res, err));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  putLike,
  removeLike,
};
