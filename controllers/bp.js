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
            if(result){
                const total = result
                const totalValue = total.reduce((a, v)=> a + v.b_value, 0)
                res.send({result, totalValue})
            }
        })
    },
    listByType : (req, res)=>{
        const {id, type} = req.body
        const sql = `SELECT * FROM b_patrimonial_item WHERE user_id = ? AND b_type = ?`
        connection.query(sql, [id, type], (err, result, field)=>{
            if(err) res.send("something went wrong")
            if(result){
                const total = result
                const totalValue = total.reduce((a, v) => a + v.b_value, 0)
                res.send({result, totalValue})
            }
        })
    },
    update: (req, res)=>{
        const {id, value, cod, type, name} = req.body
        const sql = `UPDATE b_patrimonial_item SET b_value = ?, b_name = ?, b_type = ? WHERE user_id = ? AND id = ?`
        connection.query(sql,[value, name, type, id, cod], (err, result, field)=>{
            if(err) res.send("something went wrong")
            if(result) res.send({result})
        })
    },
    listBycode: (req, res)=>{
        const {id, cod} = req.body
        const sql = `SELECT * FROM b_patrimonial_item WHERE user_id = ? AND id= ?`
        connection.query(sql, [id, cod], (err, result, field)=>{
            if(err) res.send("something went wrong")
            if(result) res.send({result})
        })
    },
    deleteBycode: (req, res)=>{
        const {id, cod} = req.body
        const sql = `DELETE FROM b_patrimonial_item WHERE user_id = ? AND id = ?`
        connection.query(sql, [id, cod], (err, result, field)=>{
            if(err) res.send("something went wrong")
            if(result) res.send({result})
        })
    }
}

module.exports = bp