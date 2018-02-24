import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],

      newBlog: {
        title: '',
        author: '',
        url: ''
      },

      showAll: true,
      message: null,
      username: '',
      password: '',
      user: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  addBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.create(
        this.state.newBlog
      )
      this.blogForm.toggleVisibility()
      this.setState({
        blogs: this.state.blogs.concat(newBlog),
        newBlog: {
          title: '',
          author: '',
          url: ''
        },
        message: 'Blog has been posted!'
      })
    } catch (exception) {
      this.setState({
        message: 'blogin postaus epäonnistui',
      })
    }

    setTimeout(() => {
      this.setState({ message: null })
    }, 5000)
  }
  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user, message: 'Welcome!' })
    } catch (exception) {
      this.setState({
        message: 'username or password incorrect!',
      })
    }
    setTimeout(() => {
      this.setState({ message: null })
    }, 5000)
  }

  logout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    this.setState({ username: '', password: '', user: null, message: 'You have logged out!' })

    setTimeout(() => {
      this.setState({ message: null })
    }, 5000)
  }

  handleBlogChange = (event) => {
    let blog = this.state.newBlog
    blog[event.target.name] = event.target.value
    this.setState({ newBlog: blog })
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  deleteBlog = async ({ id }) => {
    try {
      await blogService.deleteBlog(id)
      const del = this.state.blogs.filter(blog => blog.id.toString() !== id.toString())
      this.setState({
        blogs: del,
        message: 'blog has been deleted!'
      })
    } catch (exception) {
      this.setState({
        message: 'failed to delete!!' + exception.toString()
      })
    }
    setTimeout(() => {
      this.setState({ message: null })
    }, 5000)
  }

  updateBlog = async ({ blog }) => {
    let success = false
    try {
      await blogService.update(blog.id, blog)
      this.setState({
        message: 'blog has been liked!'
      })
      success = true
    } catch (exception) {
      this.setState({
        message: 'failed to like D:!' + exception.toString()
      })
    }
    setTimeout(() => {
      this.setState({ message: null })
    }, 5000)
    return success
  }

  render() {
    const blogList = () => (
      <div>
        <h2>blogit</h2>
        {this.state.blogs.map(blog =>
          <Blog key={blog.id}
            blog={blog}
            parent={this} />
        )}
      </div>
    )

    const loginForm = () => (
      <div>
        <h2>Kirjaudu</h2>
        <form onSubmit={this.login}>
          <div>
            käyttäjätunnus
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            salasana
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      </div>
    )

    const userlog = () => (
      <div>
        <p>{this.state.user.name} logged in</p>
        <form onSubmit={this.logout}>
          <button type="submit">logout</button>
        </form>
      </div>
    )
    return (
      <div>
        <h1>Blogit</h1>
        <Notification message={this.state.message} />
        {this.state.user === null ?
          loginForm() :
          <div>
            {userlog()}
            <Togglable buttonLabel="new blog" ref={component => this.blogForm = component}>
              <BlogForm
                onSubmit={this.addBlog}
                title={this.state.newBlog.title}
                author={this.state.newBlog.author}
                url={this.state.newBlog.url}
                handleChange={this.handleBlogChange}
              />
            </Togglable>
            {blogList()}
          </div>
        }
      </div>
    );
  }
}











const BlogForm = ({ onSubmit, handleChange, title, author, url }) => {
  return (
    <div>
      <h2>Luo uusi muistiinpano</h2>
      <form onSubmit={onSubmit}>
        Title:
      <input
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        /><br />
        Author:
      <input
          type="text"
          name="author"
          value={author}
          onChange={handleChange}
        /><br />
        Url:
      <input
          type="text"
          name="url"
          value={url}
          onChange={handleChange}
        /><br />
        <button type="submit">save</button>
      </form>
    </div>
  )
}


export default App;
