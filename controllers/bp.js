const connection = require('../connection')

bp = {
    add : (req,res)=>{
        const {id, name, value, type} = req.body
        const sql = `INSERT INTO b_patrimonial_item(user_id, b_name, b_date, b_value, b_type) VALUES(?,?, NOW(), ?, ?)`
        
        connection.query(sql, [id, name, value, type], (err, result, field)=>{
            if(err) res.send("something went wrong")
            if(result) res.send("item added with success")
        })
    },
    listAll : (req, res)=>{
        const {id, type} = req.body
        const sql = `SELECT * FROM b_patrimonial_item WHERE user_id = ?`
        connection.query(sql, [id], (err, result, field)=>{
            if(err) res.send("something went wrong")
            if(result) res.send(result)
        })
    }
}

module.exports = bp