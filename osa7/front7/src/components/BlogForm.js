import React from 'react'
import { notify } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { addBlog } from '../reducers/blogsReducer'

class BlogForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newBlog: {
                title: '',
                author: '',
                url: ''
            }
        }
    }

    handleChange = (event) => {
        let blog = this.state.newBlog
        blog[event.target.name] = event.target.value
        this.setState({ newBlog: blog })
    }

    addBlog = async (event) => {
        event.preventDefault()
        try {
            await this.props.addBlog(this.state.newBlog)
            this.setState({
                newBlog: {
                    title: '',
                    author: '',
                    url: ''
                }
            })
            this.props.notify('Blog has been posted!', 5)
        } catch (exception) {
            this.props.notify('blogin postaus epäonnistui', 5)
        }
    }

    render() {
        return (
            <div>
                <h2>Luo uusi muistiinpano</h2>
                <form onSubmit={this.addBlog}>
                    <span>  Title:</span>
                    <input
                        type="text"
                        name="title"
                        value={this.state.newBlog.title}
                        onChange={this.handleChange}
                    /><br />
                    <span> Author:</span>
                    <input
                        type="text"
                        name="author"
                        value={this.state.newBlog.author}
                        onChange={this.handleChange}
                    /><br />
                    <span>   Url:</span>
                    <input
                        type="text"
                        name="url"
                        value={this.state.newBlog.url}
                        onChange={this.handleChange}
                    /><br />
                    <button type="submit">save</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
const ConnectedBlogForm = connect(
    mapStateToProps,
    { notify, addBlog }
)(BlogForm)

export default ConnectedBlogForm
