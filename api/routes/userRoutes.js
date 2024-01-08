const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

const { signUp, signIn, changePassword, signOut } = require('../controllers/userController')

// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `res.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// SIGN UP
// POST /sign-up
router.post('/sign-up', signUp)

// SIGN IN
// POST /sign-in
router.post('/sign-in', signIn)

// CHANGE password
// PATCH /change-password
router.patch('/change-password', requireToken, changePassword)

router.delete('/sign-out', requireToken, signOut)

module.exports = router