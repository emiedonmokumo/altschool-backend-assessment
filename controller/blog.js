const express = require('express')
const passport = require('passport')
const ArticleModel = require('../models/Article')
const UserModel = require('../models/User')
const router = express.Router()

router.post('/new', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const article = await ArticleModel.create({
            title: req.body.title,
            description: req.body.description,
            author: req.user._id,
            state: req.body.state,
            reading_time: req.body.reading_time,
            tags: req.body.tags,
            body: req.body.body
        })
        res.status(200).json({
            message: 'Blog Created Successfully',
            blog: article
        })
    } catch (error) {
        console.log(error.message)
    }
})

router.get('/', async (req, res) => {
    const articles = await ArticleModel.find()
    res.status(200).json(articles)
})

router.get('/user', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const articles = await ArticleModel.find({ author: req.user._id })
    res.status(200).json(articles)
})

router.get('/:id', async (req, res) => {
    const article = await ArticleModel.findOne({ _id: req.params.id, state: 'published' });

    const user = await UserModel.findById(article.author)
    if (!article) {
        res.status(400).json({ message: 'Published article not found' })
    }
    res.status(200).json({
        article,
        author: {
            id: article.author,
            name: `${user.firstname} ${user.surname}`,
            email: user.email
        }
    })
})

router.put('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const article = await ArticleModel.updateOne({ _id: req.params.id, author: req.user._id }, req.body, { new: true })
    if (!article) {
        res.status(400).json({
            message: 'Unauthorized Access to Article'
        })
    }
    res.status(200).json({
        message: `Article with the id ${req.params.id} Updated Successfully`,
        article
    })
})

router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const article = await ArticleModel.deleteOne({ author: req.user._id, _id: req.params.id })
    res.status(200).json({
        message: `Article with the id ${req.params.id} Deleted Successfully`,
    })
})


module.exports = router