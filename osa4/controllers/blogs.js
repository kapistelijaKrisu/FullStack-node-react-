const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const formatBlog = (blog) => {
  return {
    id: blog._id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    user: blog.user
  }
}

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

    response.json(blogs.map(formatBlog))
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
    
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})

blogsRouter.post('/', async (request, response) => {
  try {
    let body = request.body
    if (body === undefined) {
      return response.status(400).json({ error: 'content missing' })
    }
    if (body.title === undefined) {
      return response.status(400).json({ error: 'title missing' })
    }
    if (body.url === undefined) {
      return response.status(400).json({ error: 'url missing' })
    }
    if (body.likes === undefined) {
      body.likes = 0
    }

    const user = await User.findById(body.userId)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: "5a80d10a3772e17d5e572b45"
    })
    const blogdb = await blog.save()


    user.blogs = user.blogs.concat(blogdb._id)
    await user.save()

    response.json(formatBlog(blogdb))

  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  try {
    let body = request.body
    if (body === undefined) {
      return response.status(400).json({ error: 'content missing' })
    }
    if (body.title === undefined) {
      return response.status(400).json({ error: 'title missing' })
    }
    if (body.url === undefined) {
      return response.status(400).json({ error: 'url missing' })
    }
    if (body.likes === undefined) {
      body.likes = 0
    }

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }
    const blogdb = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(formatBlog(blogdb))

  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

module.exports = blogsRouter