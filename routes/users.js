const router = require('express').Router();
const {
  getUsers,
  getProfile,
  updateProfile,
  updateAvatar,
} = require('../controllers/usersController');

router.get('/users', getUsers);
router.get('/users/:id', getProfile);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
