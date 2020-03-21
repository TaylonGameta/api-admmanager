const connection = require('../connection')

bp = {
    add : (req,res)=>{
        const {id, name, value, type} = req.body
        const sql = `INSERT INTO b_patrimonial_item(user_id, b_name, b_date, b_value, b_type) VALUES(?,?, NOW(), ?, ?)`
        connection.query(sql, [id, name, value, type], (err, result, field)=>{
            if(err) res.send(err)
            if(result) res.send({success : "item added with success"})
        })
    },
    listAll : (req, res)=>{
        const {id, type} = req.body
        const sql = `SELECT * FROM b_patrimonial_item WHERE user_id = ?`
        connection.query(sql, [id], (err, result, field)=>{
            if(err) res.send("something went wrong")
            if(result) res.send({result})
        })
    },
    listByType : (req, res)=>{
        const {id, type} = req.body
        const sql = `SELECT * FROM b_patrimonial_item WHERE user_id = ? AND b_type = ?`
        connection.query(sql, [id, type], (err, result, field)=>{
            if(err) res.send("something went wrong")
            if(result) res.send({result})
        })
    },
    updateBpValue: (req, res)=>{
        const {id, value, cod} = req.body
        const sql = `UPDATE b_patrimonial_item SET b_value = ? WHERE user_id = ? AND id = ?`
        connection.query(sql,[value,id, cod], (err, result, field)=>{
            if(err) res.send("something went wrong")
            if(result) res.send({result})
        })
    }
}

module.exports = bp