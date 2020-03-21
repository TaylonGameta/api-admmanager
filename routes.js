const express = require('express')
const router = express.Router()

const user = require('./controllers/user')
const bp = require('./controllers/bp')
const aux = require('./controllers/auxiliar')

router.post('/user/register', user.register)

router.post('/user/login', user.login)

router.post('/user/auth', user.auth)

router.get('/', user.auth, (req, res) => res.send({msg: "Taylon eh pica"}))

router.post('/bp/add', user.auth, bp.add)

router.get('/bp/listall', user.auth, bp.listAll)

router.get('/bp/listbytype', user.auth, bp.listByType)

router.post('/bp/updatebpvalue', user.auth, bp.updateBpValue)

router.get('/auxiliar/date', auxiliar.now)

module.exports = router