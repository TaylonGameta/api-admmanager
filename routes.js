const express = require('express')
const router = express.Router()

const user = require('./controllers/user')

const bp = require('./controllers/bp')
const dre = require('./controllers/dre')

const {now} = require('./controllers/auxiliar')


/*
**** USER ROUTES
*/
router.post('/user/register', user.register)

router.post('/user/login', user.login)

router.post('/user/auth', user.auth)

router.get('/', user.auth, (req, res) => res.send({msg: "authenticated"}))

/*
**** BALANCO PATRIMONIAL ROUTES
*/

router.post('/bp/add', user.auth, bp.add)

router.post('/bp/item', user.auth, bp.listBycode)

router.post('/bp/delete', user.auth, bp.deleteBycode)

router.get('/bp/listall', user.auth, bp.listAll)

router.post('/bp/listbytype', user.auth, bp.listByType)

router.post('/bp/update', user.auth, bp.update)

router.get('/auxiliar/date', now)


/*
*****DRE
*/

router.post('/dre/save', user.auth, dre.save)
router.post('/dre/submit', user.auth, dre.submit)

module.exports = router