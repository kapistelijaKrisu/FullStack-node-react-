const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const formatBlog = (blog) => {
  return {
    id: blog._id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    comments: blog.comments,
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
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    let user = await User.findById(decodedToken.id)

    const containsBlog = user.blogs.find(blog => blog.toString() === request.params.id.toString())
    if (containsBlog === undefined) {
      return response.status(400).json({ error: 'you do not own that blog or it does not exist' })
    }

    user.blogs = user.blogs.filter(blog => blog.toString() !== request.params.id.toString())
    await User.findByIdAndUpdate(user.id, user)
    await Blog.findByIdAndRemove(request.params.id)
    return response.status(204).end()

    response.status(400).send({ error: 'not owner of blog' })
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})

blogsRouter.post('/', async (request, response) => {
  try {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

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

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user
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


blogsRouter.post('/:id/comments', async (request, response) => {
  console.log('----')
  try {
    let body = request.body
    if (body === undefined) {
      return response.status(400).json({ error: 'content missing' })
    }
    if (body.comment === undefined || body.comment === '') {
      return response.status(400).json({ error: 'comment missing' })
    }

    let blog = await Blog.findById(request.params.id)
    if (blog.comments !== undefined) {
      blog.comments = blog.comments.concat(body.comment)
    } else {
      blog.comments = [body.comments]
    }
    const blogdb = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

    response.json(formatBlog(blogdb))

  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

module.exports = blogsRouter