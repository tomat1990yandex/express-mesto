const Card = require('../models/card');
const { ForbiddenError } = require('../errors/forbiddenError');
const { NotFoundError } = require('../errors/notFoundError');
const { ValidationError } = require('../errors/validationError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send({ cards }))
    .catch((err) => next(err));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(200).send({ body: card }))
    .catch((err) => {
      if (err.name === 'validationError') {
        throw new ValidationError('Переданы не корректные данные');
      }
      next(err);
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const owner = req.user._id;
  Card
    .findOne({ _id: req.params.cardId })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      if (card.owner.toString() !== owner) {
        throw new ForbiddenError('Недостаточно прав');
      }
      return Card.findOneAndRemove(card._id)
        .then(() => {
          res.status(200).send({ message: 'Карточка удалена' });
        });
    })
    .catch((err) => next(err));
};

const putLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      return res.status(200).send({ data: card });
    })
    .catch((err) => next(err));
};

const removeLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      return res.status(200).send({ data: card });
    })
    .catch((err) => next(err));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  putLike,
  removeLike,
};
