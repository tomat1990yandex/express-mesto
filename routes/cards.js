const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  putLike,
  removeLike,
} = require('../controllers/cardsController');

router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCard);
router.put('/cards/:cardId/likes', putLike);
router.delete('/cards/:cardId/likes', removeLike);

module.exports = router;
