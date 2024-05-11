const express = require('express')
const app = express()
const signup = require('./controller/signup')
const login = require('./controller/login')
const blog = require('./controller/blog')
require('dotenv').config()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const connectToDatabase = require('./db')
connectToDatabase()


app.get('/', (req, res) => {
    res.send('working...')
})

app.use('/blog', blog)
app.use('/signup', signup)
app.use('/login', login)

app.listen(3000, console.log('Server Started'))