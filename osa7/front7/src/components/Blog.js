import React from 'react'
import { notify } from '../reducers/notificationReducer'
import { deleteBlog, voteBlog, addComment } from '../reducers/blogsReducer'
import { connect } from 'react-redux'


class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      comment: ''
    }
  }

  handleChange = (event) => {
    this.setState({ comment: event.target.value })
  }
  addComment = async (event) => {
    event.preventDefault()
    try {
      await this.props.addComment(this.props.blog.id, this.state.comment)
      this.setState({
          comment: ''
      })
      this.props.notify('Comment has been posted!', 5)

    } catch (exception) {
      this.props.notify('Commenting blog failed', 5)
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

  render() {
    if (this.props.blog === undefined) {
      return null
    }
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
    const hideDeleteVisible = { display: this.isAuthorized() ? '' : 'none' }
    let i = 0
    const increase=() => {
      i++
      return i+this.props.blog.id
    }
    return (
      

      < div style={blogStyle} >

        <p onClick={this.toggleVisibility}>
          {this.props.blog.title}:{this.props.blog.author}
        </p>
        <a href={this.props.blog.url.toString()}>{this.props.blog.url}</a>
        <p> likes:{this.props.blog.likes}</p>
        <p> added by:{this.props.blog.user.name}</p>
        <button onClick={this.addLike}>like!</button>

        <div style={hideDeleteVisible}>
          <button onClick={this.remove}>remove!</button>
        </div>
        <h4>Comments</h4>
        <form onSubmit={this.addComment}>
          <span>  Comment:</span>
          <input
            type="text"
            name="comment"
            value={this.state.comment}
            onChange={this.handleChange}
          />
          <button type="submit">save</button>
        </form>

        <ul>
          {this.props.blog.comments.map(comment => (
            <li key={increase()}>{comment}</li>
          ))}
        </ul>

      </div>)
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
export default connect(
  mapStateToProps,
  { deleteBlog, voteBlog, notify, addComment }

)(Blog)
