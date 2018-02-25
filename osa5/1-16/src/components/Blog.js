import React from 'react'
import PropTypes from 'prop-types'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  remove = () => {
    this.props.parent.deleteBlog({ id: this.props.blog.id })
  }

  addLike = async () => {
    await this.props.parent.updateBlog({ blog: this.props.blog })
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
    const hideDeleteVisible = { display: this.props.showDelete ? '' : 'none' }
    
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

Blog.propTypes = {
  parent: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  showDelete: PropTypes.bool.isRequired
}

export default Blog