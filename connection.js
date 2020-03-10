const mysql = require('mysql')
const credentials = JSON.parse(require('./config'))

const connection = mysql.createPool({
    host     : credentials.host,
    user     : credentials.user,
    password : credentials.password,
    database : credentials.database
})


connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
})

connection.query(`
    ALTER TABLE b_patrimonial_item
    add FOREIGN KEY(user_id) REFERENCES users(id);
    
`, (err, results, fields)=>{
    console.log(err)
})


console.log(credentials.user);

module.exports = connection