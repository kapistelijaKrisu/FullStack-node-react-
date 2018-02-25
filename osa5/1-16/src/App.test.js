import React from 'react'
import { shallow, mount } from 'enzyme'
import Blog from './components/Blog'
import App from './App'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
    let app
    beforeAll(() => {
        app = mount(<App />)
    })

    it('when user is logged in the blogs are shown', () => {
        app.update()
        blogService.token = blogService.blogs[0].user
        app.setState({user : blogService.token})
        app.update()
        console.log(app.html())
        console.log(app.user)
        const blogComponents = app.find(Blog)
        expect(blogComponents.length).toEqual(2)
    })

    it('when user is not logged in none of the blogs are shown', () => {
        app.update()
        app.setState({user : null})
        app.update()
        const blogComponents = app.find(Blog)
        expect(blogComponents.length).toEqual(0)
    })
    it('when user is not logged in none of the blogs are shown', () => {
        app.update()
        app.setState({user : null})
        app.update()
        const blogComponents = app.find('form')
        expect(blogComponents.length).toEqual(1)
    })
})