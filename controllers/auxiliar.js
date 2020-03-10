auxiliar = {
    now : (req, res)=>{
        const date = new Date()
        const result = {
            year : date.getFullYear(),
            day : date.getDate(),
            month : date.getMonth()
        }
        res.send(result)
    }
}

module.exports = auxiliar