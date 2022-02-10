const express = require('express');
const router = express.Router();

const usersContollers = require('../controllers/users_controller');

router.get('/profile', usersContollers.profile);


module.exports = router;