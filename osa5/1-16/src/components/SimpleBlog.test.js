import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
    it('renders content', () => {
        const blog = {
            title: 'title',
            likes: 2,
            author: 'author'
        }

        const content = shallow(<SimpleBlog blog={blog} />)
            expect(content.text()).toContain('title')
         expect(content.text()).toContain(blog.author)
           expect(content.text()).toContain(blog.likes)
    })

it('clicking the button calls event handler once', () => {
    const blog = {
        title: 'title',
        likes: 2,
        author: 'author'
    }
  
    const mockHandler = jest.fn()
  
    const blogComponent = shallow(
      <SimpleBlog
        blog={blog}
        onClick={mockHandler}
      />
    )
  
    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')
  
    expect(mockHandler.mock.calls.length).toBe(2)
  })
})