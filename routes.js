const express = require('express')
const router = express.Router()

const user = require('./controllers/user')
const bp = require('./controllers/bp')

router.post('/user/register', user.register)

router.post('/user/login', user.login)

router.post('/user/auth', user.auth)

router.get('/', user.auth, (req, res) => {res.send(`you id is ${req.body.id} \n you name is ${req.body.username}`)})

router.post('/bp/add', user.auth, bp.add)

router.post('/bp/listall', user.auth, bp.listAll)

router.post('/bp/listbytype', user.auth, bp.listByType)

module.exports = router