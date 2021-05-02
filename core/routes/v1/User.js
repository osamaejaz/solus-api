const express = require('express');
const router = express.Router();
const UserController = new (require('../../controllers/UserController'))();
const { authenticate } = require('../../middleware/authenticate');

router.post('/register', UserController.registerUser);
router.put('/login', UserController.userLogin);

module.exports = router;