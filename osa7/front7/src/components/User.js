import React from 'react'
import PropTypes from 'prop-types'
import { notify } from '../reducers/notificationReducer'
import { deleteBlog, voteBlog } from '../reducers/blogsReducer'
import { connect } from 'react-redux'


class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  isAuthorized = () => {
    const { user, blog } = this.props
    if (blog.user === undefined || blog.user === null) {
      return true
    }
    if (user === undefined || user === null) {
      return false
    }

    return user.name === blog.user.name
  }

  addLike = () => {
    try {
      this.props.voteBlog(this.props.blog)
      this.props.notify('blog has been liked!', 5)
    } catch (exception) {
      this.props.notify('failed to like D:!' + exception.toString(), 5)
    }
  }
  remove = () => {
    try {
      this.props.deleteBlog(this.props.blog.id)
      this.props.notify('blog has been deleted!', 5)
    } catch (exception) {
        this.props.notify('failed to delete!!' + exception.toString(), 5)
      }
    }

  toggleVisibility = () => {
      this.setState({ visible: !this.state.visible })
    }
    render() {
      const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
      }
      const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
      const showWhenVisible = { display: this.state.visible ? '' : 'none' }
      const hideDeleteVisible = { display: this.isAuthorized() ? '' : 'none' }

      return (
        <div>
          < div style={blogStyle} >
            <div style={hideWhenVisible} onClick={this.toggleVisibility} className="expandable">
              <p>{this.props.blog.title}:{this.props.blog.author}</p>
            </div>

            <div style={showWhenVisible} className="fullDetail">
              <p onClick={this.toggleVisibility}>
                {this.props.blog.title}:{this.props.blog.author}
              </p>
              <a href={this.props.blog.url}>{this.props.blog.url}</a>
              <p> likes:{this.props.blog.likes}</p>
              <p> added by:{this.props.blog.user.name}</p>
              <button onClick={this.addLike}>like!</button>

              <div style={hideDeleteVisible}>
                <button onClick={this.remove}>remove!</button>
              </div>

            </div>

          </div>
        </div>)
    }
  }

  User.propTypes = {
    blog: PropTypes.object.isRequired
  }

  const mapStateToProps = (state) => {
    return {
      user: state.user,
      blogs: state.blogs
    }
  }
  export default connect(
    mapStateToProps,
    { deleteBlog, voteBlog, notify }

  )(User)
