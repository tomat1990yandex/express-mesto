const router = require('express').Router();
const {
  getUsers,
  getProfile,
  createUser,
} = require('../controllers/usersController.js');

router.get('/users', getUsers);
router.get('/users/:id', getProfile);
router.post('/users', createUser);

module.exports = router;