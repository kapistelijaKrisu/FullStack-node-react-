const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const initialBlogs = require('../utils/bloglist_dummies_testing').blogs

beforeAll(async () => {
    await Blog.remove({})
  
    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })
afterAll(() => {
    server.close()
})

/*tests start here */
test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})
test('all notes are returned', async () => {
    const response = await api
        .get('/api/blogs')
    expect(response.body.length).toBe(initialBlogs.length)
})

test('a specific author is within the returned blogs', async () => {
    const response = await api
        .get('/api/blogs')
    const contents = response.body.map(r => r.author)
    expect(contents).toContain('Edsger W. Dijkstra')
})