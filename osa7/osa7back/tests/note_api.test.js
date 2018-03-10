const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const { format, initialBlogs, nonExistingId, usersInDb, blogsInDb, toDeleteBlog, toModBlog, likelessBlog, titlelessBlog, urlessBlog, stubBlog } = require('../utils/blog_test_helper')

/*
describe('when there is initially some blogs saved', async () => {
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

describe('addition of a new blog', async () => {

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
})*/

describe.only('when there is initially one user at db', async () => {
    beforeAll(async () => {
      await User.remove({})
      const user = new User({ username: 'root', password: 'sekret' })
      await user.save()
    })
  
    test('POST /api/users succeeds with a fresh username and password', async () => {
      const usersBeforeOperation = await usersInDb()
  
      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen'
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
      const usersAfterOperation = await usersInDb()
      expect(usersAfterOperation.length).toBe(usersBeforeOperation.length+1)
      const usernames = usersAfterOperation.map(u=>u.username)
      expect(usernames).toContain(newUser.username)
    })
  
    test('POST /api/users fails with proper statuscode and message if username already taken', async () => {
        const usersBeforeOperation = await usersInDb()
      
        const newUser = {
          username: 'root',
          name: 'Superuser',
          password: 'salainen'
        }
      
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
      
        expect(result.body).toEqual({ error: 'username must be unique'})
      
        const usersAfterOperation = await usersInDb()
        expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
      })



      test('POST /api/users fails with proper statuscode and message if password is under 3 in length', async () => {
        const usersBeforeOperation = await usersInDb()
      
        const newUser = {
          username: 'rootteeeeeeeeeeeeeeeeeeeeeer',
          name: 'Supreme overlord megatron 9000',
          password: 'sa'
        }
      
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
      
        expect(result.body).toEqual({ error: 'password has to be at least 3 characters long!'})
      
        const usersAfterOperation = await usersInDb()
        expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
      })
  })

afterAll(() => {
    server.close()
})
