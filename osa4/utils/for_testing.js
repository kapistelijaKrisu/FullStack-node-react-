const Blog = require('../models/blog')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }
    return blogs.reduce(reducer, 0)
}

const mostLiked = (blogs) => {
    let favorite = blogs[0]
    blogs.forEach(blog => {
        if (blog.likes > favorite.likes) {
            favorite = blog
        }
    });
    return favorite
}
const authorMostBlogs = (blogs) => {
    let myMap = new Map();
    blogs.forEach(blog => {
        if (myMap.get(blog.author) === undefined) {
            myMap.set(blog.author, 1)
        } else {
            myMap.set(blog.author, myMap.get(blog.author) + 1)
        }
    });

    let biggestBlooger = {
        "name": blogs[0].author,
        "blog_count": 1
    }
    for (var [key, value] of myMap) {
        if (value > biggestBlooger.blog_count) {
            biggestBlooger.name = key
            biggestBlooger.blog_count = value
        }
      }
      return (biggestBlooger)
}


const authorMostLikes = (blogs) => {
    let myMap = new Map();
    blogs.forEach(blog => {
        if (myMap.get(blog.author) === undefined) {
            myMap.set(blog.author, blog.likes)
        } else {
            
            myMap.set(blog.author, myMap.get(blog.author) + blog.likes)
        }
    });

    let likedBlogger = {
        "name": blogs[0].author,
        "likes": blogs[0].likes
    }
    for (var [key, value] of myMap) {
        if (value > likedBlogger.likes) {
            likedBlogger.name = key
            likedBlogger.likes = value
        }
      }
      return (likedBlogger)
}

module.exports = {
    dummy,
    totalLikes,
    mostLiked,
    authorMostBlogs,
    authorMostLikes
}