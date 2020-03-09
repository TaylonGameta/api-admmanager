const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const router = require('./routes')
const cors = require('cors')

app.use(cors())
app.use(bodyparser.json())
app.use('/', router)

app.listen(3000, ()=>{
    console.log("http://localhost:3000")
})