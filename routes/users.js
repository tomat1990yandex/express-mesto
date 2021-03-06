const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getProfile,
  updateProfile,
  updateAvatar,
  getMyProfile,
} = require('../controllers/usersController');

router.get('/me', getMyProfile);
router.get('/', getUsers);
router.get('/:id',
  celebrate({
    body: Joi.object().keys({
      id: Joi.string().length(24).hex(),
    }),
  }),
  getProfile);
router.patch('/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateProfile);
router.patch('/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required()
        .pattern(
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]+\.[a-zA-Z0-9()]+([-a-zA-Z0-9()@:%_\\+.~#?&/=#]*)/,
        ),
    }),
  }),
  updateAvatar);

module.exports = router;
