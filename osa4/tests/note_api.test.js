const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { format, initialBlogs, nonExistingId, blogsInDb, toDeleteBlog, toModBlog, likelessBlog, titlelessBlog, urlessBlog, stubBlog } = require('../utils/blog_test_helper')

describe.skip('when there is initially some notes saved', async () => {
    beforeAll(async () => {
        await Blog.remove({})
        const blogObjects = initialBlogs.map(blog => new Blog(blog))
        const promiseArray = blogObjects.map(blog => blog.save())
        await Promise.all(promiseArray)
    })

    test('all blogs are returned as json by GET /api/notes', async () => {
        const blogsInDatabase = await blogsInDb()
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body.length).toBe(blogsInDatabase.length)
        const returnedContents = response.body.map(n => n.title)
        blogsInDatabase.forEach(blog => {
            expect(returnedContents).toContain(blog.title)
        })
    })

    test('a specific author is within the returned blogs', async () => {

        const response = await blogsInDb()
        const returnedContents = response.map(n => n.author)
        expect(returnedContents).toContain('Edsger W. Dijkstra')
    })
})

describe.skip('addition of a new blog', async () => {

    test('correct blog post gives correct results', async () => {
        const blogsAtStart = await blogsInDb()

        await api
            .post('/api/blogs')
            .send(stubBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAfterOperation = await blogsInDb()

        const contents = blogsAfterOperation.map(r => r.url)
        expect(contents.length).toBe(blogsAtStart.length + 1)
        expect(contents).toContain('http://www.random/different/url.html')
    })

    test('blog post without likes is posted and likes are set to 0', async () => {
        const blogsAtStart = await blogsInDb()

        await api
            .post('/api/blogs')
            .send(likelessBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAfterOperation = await blogsInDb()
        expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 1)

        const contents = blogsAfterOperation.map(r => r)
        contents.forEach(blog => {
            if (blog.title === 'tadaaaaaaaaaaaaa') {
                expect(blog.likes).toBe(0)
            }
        });
    })

    test('posts without url are forbidden and given status 400 in response', async () => {
        const blogsAtStart = await blogsInDb()

        await api
            .post('/api/blogs')
            .send(urlessBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const blogsAfterOperation = await blogsInDb()
        expect(blogsAfterOperation.length).toBe(blogsAtStart.length)
    })
    test('posts without title are forbidden and given status 400 in response', async () => {
        const blogsAtStart = await blogsInDb()

        await api
            .post('/api/blogs')
            .send(titlelessBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const blogsAfterOperation = await blogsInDb()
        expect(blogsAfterOperation.length).toBe(blogsAtStart.length)
    })
})

describe('deletion of a blog', async () => {
    let toDelId

    beforeAll(async () => {
      addedBlog = new Blog({toDeleteBlog})
      toDel = await addedBlog.save()
      toDelId = toDel.id
    })

    test('existing post is deleted', async () => {

        const blogsAtStart = await blogsInDb()
        
        await api
            .delete(`/api/blogs/${toDelId}`)
            .expect(204)

        const blogsAfterOperation = await blogsInDb()
        expect(blogsAfterOperation.length).toBe(blogsAtStart.length - 1)
    })
})

describe('modification of a blog', async () => {
    let toMod

    beforeAll(async () => {
      addedBlog = new Blog({toModBlog})
      toMod = await addedBlog.save()
    })

    test('moddin likes post is modding', async () => {
        const blogsAtStart = await blogsInDb()
    
        await api
            .put(`/api/blogs/${toMod.id}`)
            .send(toModBlog)
            .expect(200)

        const blogsAfterOperation = await blogsInDb()
        expect(blogsAfterOperation.length).toBe(blogsAtStart.length)
    })
})

afterAll(() => {
    server.close()
})
