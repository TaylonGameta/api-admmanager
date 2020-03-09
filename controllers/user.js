const connection = require('../connection')
const jwt = require('jsonwebtoken')

user = {
    register : (req, res)=>{
        const {email, username, password} = req.body
        const sql = `INSERT INTO users(username, password, email) VALUES (?, ?, ?)`

        connection.query(sql, [username, password, email], (err, results, fields)=>{
            if (err) throw err
            else res.send("user created")
        })
    },
    login : (req, res)=>{
        const {username, password} = req.body
        const sql = `SELECT username, id FROM users WHERE username = ? AND password =?`

        connection.query(sql, [username, password], (err, results, fields)=>{
            if(err) throw err

            if(results.length > 0){
                const token = jwt.sign({
                    username : results[0].username,
                    id : results[0].id
                }, 'codigoindestrutivel')

                res.send(token)
            }else{
                res.send("credentials doesnt match")
            }
        })
    },
    auth : (req, res, next)=>{
        const {authorization} = req.headers
        const [bearer, token] = authorization.split(' ')
        try{
            const decoded = jwt.verify(token,"codigoindestrutivel")
            if(decoded){
                req.body.id = decoded.id
                req.body.username = decoded.username
                next()
            }
        }catch(e){
            if(e) res.send("unauthorized")
        }
    }
}

module.exports = user