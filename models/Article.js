const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const articleSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    read_count: {
        type: Number,
        default: 0
    },
    tags: String,
    body: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now(),
        required: true
    },
    reading_time: Number,
    state: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    },
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article