const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

const formatBlog = (blog) => {
  return {
    id: blog._id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  }
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(formatBlog))

})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  if (body === undefined) {
    response.status(400).json({ error: 'content missing' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })
  const blogdb = await blog.save()
  formattedBlog = formatBlog(blogdb)
  response.json(formattedBlog)
})

module.exports = blogsRouter