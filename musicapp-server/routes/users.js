const express = require('express')
//routing
const router = express.Router()
//controller functions
const { signupUser, loginUser } = require('../controllers/usersController');

//login
router.post('/login', loginUser)

//signup
router.post('/signup', signupUser)
module.exports = router