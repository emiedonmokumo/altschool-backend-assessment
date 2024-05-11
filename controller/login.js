const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const passport = require('../authentication/auth')

router.post('/', (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err) {
                console.log(err.message)
            }
            if (!user) {
                const error = new Error('Username or password is incorrect')
                return next(error);
            }

            req.login(user, { session: false },
                async (error) => {
                    if (error) return next(error)

                    const body = { _id: user._id, email: user.email }

                    const token = jwt.sign({ user: body, exp: 60 * 60 * 1000 }, process.env.JWT_SECRET);

                    return res.json({ token })
                })
        } catch (error) {
            console.log(err.message)
        }
    })(req, res, next)
})

module.exports = router