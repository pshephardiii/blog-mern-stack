const express = require('express')
const router = express.Router()
const userCtrl = require('../../controllers/api/user')

router.post('/', userCtrl.signup)
router.post('/login', userCtrl.login)
router.put('/:id', userCtrl.auth, userCtrl.updateUser)
router.delete('/:id', userCtrl.auth, userCtrl.deleteUser)
router.get('/:id', userCtrl.showUser)

module.exports = router