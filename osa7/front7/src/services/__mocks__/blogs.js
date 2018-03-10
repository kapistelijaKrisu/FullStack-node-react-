let token = null

const blogs = [
    {
        "id": "5a920f993a9eaa54c2657f9b",
        "title": "title1",
        "author": "author1",
        "url": "url1",
        "likes": 3,
        "user": {
            "_id": "5a82fe776ad4ef3fc9520c27",
            "username": "user1",
            "name": "username1"
        }
    },
    {
        "id": "5a920f993a9eaa54c2657f9d",
        "title": "title2",
        "author": "author2",
        "url": "url2",
        "likes": 11,
        "user": {
            "_id": "5a82fe776ad4ef3fc9520c22",
            "username": "user2",
            "name": "username2"
        }
    }
]

const getAll = () => {
    return Promise.resolve(blogs)
}


export default { getAll, blogs, token }