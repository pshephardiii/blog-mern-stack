const Blog = require('../../models/blog')

module.exports = {
    createBlog,
    indexBlogs,
    showBlog,
    updateBlog,
    destroyBlog,
    jsonBlogs,
    jsonBlog
}

function jsonBlog (_, res) {
    res.json(res.locals.data.blog)
}

function jsonBlogs (_, res) {
    res.json(res.locals.data.blogs)
}

async function createBlog(req, res, next){
    try {
        req.body.user = req.user._id
        const blog = await Blog.create(req.body)
        req.user.blogs.addToSet(blog)
        req.user.save()
        res.locals.data.blog = blog
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

async function indexBlogs(_, res ,next) {
    try {
        const blogs = await Blog.find({})
        res.locals.data.blogs = blogs
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

async function showBlog(req ,res,next) {
    try {
        const blog = await Blog.findById(req.params.id)
        res.locals.data.blog = blog
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

async function updateBlog(req ,res,next) {
    try {
        const blog = await Blog.findByIdAndUpdate({_id: req.params.id, user: req.user._id }, req.body, { new: true })
        res.locals.data.blog = blog
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

async function destroyBlog(req ,res,next) {
    try {
        const blog = await Blog.findByIdAndDelete({ _id: req.params.id, user: req.user._id })
        const user = await req.user
        const blogIndex = user.blogs.indexOf(blog)
        user.blogs.splice(blogIndex, 1)
        await user.save()
        res.locals.data.blog = blog
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}
