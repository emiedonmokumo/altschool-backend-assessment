const express = require('express')
const router = express.Router()
const ArticleModel = require('../models/Article')

router.get('/', async (req, res)=>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20
    const skip = (page - 1) * limit;
    try {
        const articles = await ArticleModel.find().sort({ read_count: -1 }).skip(skip).limit(limit).exec()
        res.status(200).json(articles)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

module.exports = router