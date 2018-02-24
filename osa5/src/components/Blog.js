import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      blog: props.blog,
      insideOf: props.parent
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  remove = () => {
    this.state.insideOf.deleteBlog({ id: this.state.blog.id })
  }

  addLike = async () => {
    let updated = Object.assign({}, this.state.blog)
    updated.likes++
    if (await this.state.insideOf.updateBlog({ blog: updated })) {
      this.setState({blog: updated})
    } 
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

    return (
      <div>
        < div style={blogStyle} >
          <div style={hideWhenVisible} onClick={this.toggleVisibility}>
            <p>{this.state.blog.title}:{this.state.blog.author}</p>
          </div>

          <div style={showWhenVisible}>
            <p onClick={this.toggleVisibility}>
              {this.state.blog.title}:{this.state.blog.author}
            </p>
            <a href={this.state.blog.url}>{this.state.blog.url}</a>
            <p> likes:{this.state.blog.likes}</p>
            <p> added by:{this.state.blog.user.name}</p>

            <button onClick={this.addLike}>like!</button>
            <button onClick={this.remove}>remove!</button>



          </div>

        </div>
      </div>)
  }
}


export default Blog