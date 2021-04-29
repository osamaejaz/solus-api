const express = require('express');
const router = express.Router();
const UserController = new (require('../../controllers/UserController'))();
const { authenticate } = require('../../middleware/authenticate');

router.post('/login', UserController.login);
router.get('/user/:userId', authenticate, UserController.getUserDetailsById);

module.exports = router;