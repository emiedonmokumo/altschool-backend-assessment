const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const UserModel = require('../models/User')
const bcrypt = require('bcrypt')
const JWTstrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
require('dotenv').config()

passport.use(
    new JWTstrategy({
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
        async (token, done) => {
            try {
                return done(null, token.user)
            } catch (error) {
                console.log(error.message)
            }
        })
)

passport.use('signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
}, async (req, email, password, done) =>{
    try {
        const { firstname, surname } = req.body;
        const user = await UserModel.create({
            email, 
            password: await bcrypt.hash(password, 10),
            firstname,
            surname,
        })
        
        return done(null, user)
    } catch (error) {
        console.log(error.message)
    }
}
)
)

passport.use('login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) =>{
    try {
        const user = await UserModel.findOne({ email });
        if(!user) {
            return done(null, false, {message: 'User not found'})
        }

        const validate = bcrypt.compare(password, user.password)

        if(!validate) {
            return done(null, false, {message: 'Password Incorrect'})
        }
        return done(null, user, {message: 'Logged in Successfully'})
    } catch (error) {
        console.log(error.message)
    }
}))

module.exports = passport