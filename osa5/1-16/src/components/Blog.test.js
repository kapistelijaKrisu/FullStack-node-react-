import React from 'react'
import { shallow, mount } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {
    let blog
    let component
    beforeEach(() => {
        blog = {
            title: 'title',
            likes: 2,
            author: 'author',
            user: {
                name: 'name'
            }
        }
        component = shallow(
            <Blog
                blog={blog}
                parent={<div className="testDiv" />}
                showDelete={false}
            />)
    })
    it('renders content', () => {
        expect(component.text()).toContain(blog.title)
        expect(component.text()).toContain(blog.author)
    })
    it('at start the full details are not displayed', () => {
        const div = component.find('.fullDetail')
        expect(div.getElement().props.style).toEqual({ display: 'none' })
    })
    it('after clicking the author, everything is displayed', () => {
        const text = component.find('.expandable')
        text.at(0).simulate('click')
        const div = component.find('.fullDetail')
        expect(div.getElement().props.style).toEqual({ display: '' })
    })
})