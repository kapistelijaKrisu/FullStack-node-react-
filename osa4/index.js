const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./utils/config')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')

const mongoUrl = config.mongoUrl
mongoose.connect(config.mongoUrl)
mongoose.Promise = global.Promise

app.use(cors())
app.use(bodyParser.json())

app.use('/api/blogs', blogsRouter)

const PORT = config.port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})