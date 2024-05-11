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
    res.send('<h1>Welcome to Blog API</h1><br /><a href="https://github.com/Emie-Boro/altschool-backend-assessment">View Documentation</a>')
})

app.use('/blog', blog)
app.use('/signup', signup)
app.use('/login', login)

app.listen(3000, console.log('Server Started'))