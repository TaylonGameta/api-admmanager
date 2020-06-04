const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const router = require('./routes')
const cors = require('cors')

app.use(cors())
app.use(bodyparser.json())
app.use('/', router)


app.listen(process.env.PORT || 4000, ()=>{
    console.log("running at http://localhost:4000")
})