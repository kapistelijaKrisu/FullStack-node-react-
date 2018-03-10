
import blogService from '../services/blogs'

const blogsReducer = (store = [], action) => {
    switch (action.type) {
        case 'INIT_BLOGS':
            return action.blogs
        case 'ADD':
            return store.concat(action.blog)
        case 'DELETE':
            return store.filter(blog => blog.id !== action.blog_id)
        case 'UPDATE':
            const old = store.filter(blog => blog.id.toString() !== action.modded.id.toString())
            return old.concat(action.modded)
        default:
            return store
    }
}

export const addBlog = (blog) => {
    return async (dispatch) => {
        const created = await blogService.create(blog)
        dispatch({
            type: 'ADD',
            blog: created
        })
    }
}

export const blogsInitialization = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            blogs
        })
    }
}
export const deleteBlog = (blog_id) => {
    return async (dispatch) => {
        await blogService.deleteOne(blog_id)
        dispatch({
            type: 'DELETE',
            blog_id
        })
    }
}

export const voteBlog = (blog) => {
    blog.likes++
    return async (dispatch) => {
        await blogService.update(blog.id, blog)
        dispatch({
            type: 'UPDATE',
            modded: blog
        })
    }
}
export const addComment = (id, comment) => {
    return async (dispatch) => {
        const blog = await blogService.comment(id, comment)
        dispatch({
            type: 'UPDATE',
            modded: blog
        })
    }
}
export default blogsReducer