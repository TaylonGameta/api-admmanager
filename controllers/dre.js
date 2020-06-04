const connection = require('../connection')

dre = {
    save : (req, res)=>{
        const {id, gor, cs, st, d, cmv, se, ac, fi, noi, noe, fe, it, nor, gp, op, nibit, niait} = req.body
        const sql = `INSERT INTO dre(gor, cs, st, d, cmv, se, ac, fi, noi, noe, fe, it, nor, gp, op, nibit, niait, date, user_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ? NOW(), ?)`
        connection.query(sql, [gor, cs, st, d, cmv, se, ac, fi, noi, noe, fe, it, nor, gp, op, nibit, niait, id], (err, result, field)=>{
            if(err) res.send(err)
            if(result) res.send({success : "item added with success"})
        })
    },
    submit: (req, res)=>{
        const {id, gor, cs, st, d, cmv, se, ac, fi, noi, noe, fe, it, nor, gp, op, nibit, niait} = req.body
        const sql = `UPDATE dre SET gor = ?, cs = ?, st = ?, d = ?, cmv = ?, se = ?, ac = ?, fi = ?, noi = ?,noe = ?, fe = ?, it = ?, nor = ?, gp = ?, op = ?, nibit = ?, niait = ?, date = NOW() WHERE user_id = ?`
        connection.query(sql, [gor, cs, st, d, cmv, se, ac, fi, noi, noe,  fe, it,nor, gp, op, nibit, niait, id], (err, result, field)=>{
            if(err) res.send(err)
            if(result) res.send({success : "item updated with success"})
        })
    },
    list: (req, res)=>{
        const {id} = req.body
        const sql = `SELECT * FROM dre WHERE user_id = ?`
        connection.query(sql, [id], (err, result, field)=>{
            if(err) res.send(err)
            if(result) res.send({result})
        })
    }
}

module.exports = dre