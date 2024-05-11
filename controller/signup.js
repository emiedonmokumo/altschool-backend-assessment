const express = require('express')
const router = express.Router()
const passport = require('passport')

router.post('/', passport.authenticate('signup', { session: false }), async (req, res, next) =>{
    res.status(200).json({
        message: 'Signup Successful',
        user: req.user
    })
})

module.exports = router