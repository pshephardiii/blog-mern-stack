const express = require('express')
const router = express.Router()
const blogCtrl = require('../../controllers/api/blog')
const userCtrl = require('../../controllers/api/user')

// Index 
router.get('/', blogCtrl.indexBlogs, blogCtrl.jsonBlogs)
// Delete
router.delete('/:id', userCtrl.auth, blogCtrl.destroyBlog, blogCtrl.jsonBlog)
// Update
router.put('/:id', userCtrl.auth, blogCtrl.updateBlog, blogCtrl.jsonBlog)
// Create
router.post('/', userCtrl.auth, blogCtrl.createBlog, blogCtrl.jsonBlog)
// Show
router.get('/:id', blogCtrl.showBlog, blogCtrl.jsonBlog)

module.exports = router