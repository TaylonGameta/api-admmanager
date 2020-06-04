const express = require('express')
const router = express.Router()

const user = require('./controllers/user')

const bp = require('./controllers/bp')
const dre = require('./controllers/dre')
const indices = require('./controllers/indices')
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
***** DRE
*/

router.post('/dre/save', user.auth, dre.save)
router.post('/dre/submit', user.auth, dre.submit)
router.post('/dre/list', user.auth, dre.list)

/*
*** INDICES
*/

router.post('/indices/get', user.auth, indices.get)
router.post('/indices/ilc', user.auth, indices.ilc)
router.post('/indices/ils', user.auth, indices.ils)
router.post('/indices/ge', user.auth, indices.ge)
router.post('/indices/ime', user.auth, indices.ime)
router.post('/indices/pmr', user.auth, indices.pmr)
router.post('/indices/ieg', user.auth, indices.ieg)
router.post('/indices/mlb', user.auth, indices.mlb)
router.post('/indices/mlo', user.auth, indices.mlo)
router.post('/indices/mll', user.auth, indices.mll)
module.exports = router