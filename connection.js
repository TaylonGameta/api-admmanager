const mysql = require('mysql')
//const credentials = JSON.parse(require('./config'))

const connection = mysql.createPool({
    host     : "us-cdbr-iron-east-04.cleardb.net",
    user     : "bbca6bae0e267a",
    password : "df1ff82b",
    database : "heroku_36563587299327d"
})


module.exports = connection