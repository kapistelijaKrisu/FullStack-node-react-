import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { notify } from './reducers/notificationReducer'
import { blogsInitialization } from './reducers/blogsReducer'
import { bloggersInitialization } from './reducers/bloggersReducer'
import { logout } from './reducers/userReducer'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showAll: true
    }
  }
  componentDidMount = async () => {
    await this.props.blogsInitialization()
    await this.props.bloggersInitialization()
  }

  logout = async (event) => {
    event.preventDefault()
    this.props.logout()
    this.setState({ username: '', password: '' })
    this.props.notify('You have logged out!', 5)
  }

  render() {
    const userInfo = () => (
      <div>
        <p>{this.props.user.name} logged in</p>
        <form onSubmit={this.logout}>
          <button type="submit">logout</button>
        </form>
      </div>
    )

    const bloggerById = (id) => (
      this.props.bloggers.find(blogger => blogger.id.toString() === id.toString())
    )
    const blogById = (id) => (
      this.props.blogs.find(blog => blog.id.toString() === id.toString())
    )

    return (
      <div>
        <h1>Blogit</h1>
        <Notification />
        {this.props.user === null ?
          <LoginForm /> :
          <div>
            {userInfo()}
            <Togglable buttonLabel="new blog" ref={component => this.blogForm = component}>
              <BlogForm />
            </Togglable>

          </div>
        }
        <Router>
          <div>
            <Menu />

            <Route exact path="/blogs" render={() =>
              <Home blogs={this.props.blogs} />}
            />
            <Route exact path="/blogs/:id" render={({ match }) =>
              <Blog
                blog={blogById(match.params.id)}
              />}
            />
            <Route exact path="/bloggers" render={() =>
              <Bloggers bloggers={this.props.bloggers} />}
            />
            <Route exact path="/bloggers/:id" render={({ match }) =>
              <Blogger
                blogger={bloggerById(match.params.id)}
              />}
            />

          </div>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    bloggers: state.bloggers,
    user: state.user,
    blogs: state.blogs
  }
}
export default connect(
  mapStateToProps,
  { notify, logout, blogsInitialization, bloggersInitialization }

)(App)


const Home = ({ blogs }) => {
  blogs.sort(function (a, b) {
    return b.likes - a.likes;
  })

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      <h2>blogit</h2>
      {blogs.map(blog =>
        < div style={blogStyle} key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
        </div>)
      }
    </div>)
}

Home.propTypes = {
  blogs: PropTypes.array.isRequired,
}

const Blogger = ({ blogger }) => {
  if (blogger === undefined) {
    return null
  }
  const list = blogger.blogs.map(blog =>
    <li key={blog.id + blogger.id}> {blog.title} by {blog.author}</li>
  )
  return (
    <div>
      <h2>{blogger.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {list}
      </ul>
    </div>
  )
}

const Bloggers = ({ bloggers }) => {
  const rows = bloggers.map(person => <tr key={person.id}>
    <td> <Link to={`/bloggers/${person.id}`}>{person.name}</Link></td>
    <td> {person.blogs.length}</td>
  </tr>)

  return (

    <div>
      <h2>bloggaajat</h2>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs added</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>)
}
Bloggers.propTypes = {
  bloggers: PropTypes.array.isRequired,
}

const Menu = () => {

  const menuStyle = {
    textAlign: 'center',
    fontSize: 28,
    paddingTop: 3,
    paddingLeft: 22,
    fontStyle: 'italic',
    marginBottom: 1,
    background: 'lightblue'
  }
  const active = {
    fontWeight: 'bold',
    color: 'yellow',
    background: 'purple'
  }


  return (
    <div style={menuStyle}>
      <NavLink to="/blogs" activeStyle={active}>blogs</NavLink> &nbsp;
    <NavLink to="/bloggers" activeStyle={active}>bloggers</NavLink>
    </div>
  )
}



