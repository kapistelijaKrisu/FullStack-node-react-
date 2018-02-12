const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = require('../utils/bloglist_dummies_testing').blogs

const stubBlog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.random/different/url.html',
    likes: 3
}

const toDeleteBlog = {
    title: 'R.I.P',
    author: 'Edsger W. Dijkstra again',
    url: 'http://rip.html',
    likes: 3
}

const toModBlog = {
    title: 'R.I.P.notyet',
    author: 'Edsger W. Dijkstra again',
    url: 'http://rip.html',
    likes: 1
}

const likelessBlog = {
    title: 'tadaaaaaaaaaaaaa',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.random/different/url.html',
}
const titlelessBlog = {
    author: 'Edsger W. Dijkstra',
    url: 'www.disisurl.com'
}

const urless = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra'
}

const format = (blog) => {
    return {
        id: blog._id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes
    }
}

const nonExistingId = async () => {
    const blog = new Blog()
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(format)
}

const usersInDb = async () => {
    const users = await User.find({})
    return users
  }

module.exports = {
    usersInDb, initialBlogs, format, nonExistingId, blogsInDb, likelessBlog, stubBlog, toDeleteBlog, toModBlog
}