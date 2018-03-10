const listHelper = require('../utils/for_testing')
const blogDummies = require('../utils/bloglist_dummies_testing')

test.skip('dummy is called', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe.skip('total likes', () => {
  const listWithOneBlog = blogDummies.listWithOneBlog

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  const blogs = blogDummies.blogs
  test('when list has more blogs the totalCount is correct', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe.skip('most likes', () => {
  const listWithOneBlog = blogDummies.listWithOneBlog

  test('when list has only one blog it is the one with most likes as well', () => {
    const result = listHelper.mostLiked(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0])
  })

  const blogs = blogDummies.blogs
  test('when list has more blogs the most liked is the one with most likes', () => {
    const result = listHelper.mostLiked(blogs)
    expect(result).toBe(blogs[2])
  })
})

describe.skip('author with most blogs', () => {
  const listWithOneBlog = blogDummies.listWithOneBlog

  test('when list has only one blog its author is the one with most blogs as well', () => {
    const result = listHelper.authorMostBlogs(listWithOneBlog)
    const expected = {
      "name": listWithOneBlog[0].author,
      "blog_count": 1
    }
    expect(result).toEqual(expected)
  })

  const blogs = blogDummies.blogs
  test('when list has more blogs the author with most blogs is returned with blog count', () => {
    const result = listHelper.authorMostBlogs(blogs)
    const expected = {
      "name": "Robert C. Martin",
      "blog_count": 3
    }
    expect(result).toEqual(expected)
  })
})

describe.skip('author with most likes', () => {
  const listWithOneBlog = blogDummies.listWithOneBlog

  test('when list has only one blog its author has most likes as well', () => {
    const result = listHelper.authorMostLikes(listWithOneBlog)
    const expected = {
      "name": listWithOneBlog[0].author,
      "likes": 5
    }
    expect(result).toEqual(expected)
  })

  const blogs = blogDummies.blogs
  test('when list has more blogs the author with most likes in all blogs combines is returned with total like count', () => {
    const result = listHelper.authorMostLikes(blogs)
    const expected = {
      "name": "Edsger W. Dijkstra",
      "likes": 17
    }
    expect(result).toEqual(expected)
  })
})