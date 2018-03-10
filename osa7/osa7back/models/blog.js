const mongoose = require('mongoose')
const url = require('../utils/config').mongoUrl

mongoose.connect(url)
mongoose.Promise = global.Promise

const Blog = mongoose.model('Blog', {
    title: String,
    author: String,
    url: String,
    likes: Number,
    comments: Array,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  })
  
module.exports = Blog