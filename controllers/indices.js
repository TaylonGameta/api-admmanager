const connection = require('../connection')

const indices = {
    
    get: (req, res) =>{


        /*
        ***** INDICES DE LIQUIDEZ
        */
        let ativoc = 0
        let passivoc = 0
        let estoques = 0
        let cmv = 0
        let contasareceberclientes = 0
        let vendasanuais = 0
        let ativototal = 0
        let passivoTotal = 0
        const {id} = req.body


        /*
        ***** INDICE DE LIQUIDEZ CORRENTE - ATIVOS CIRCULANTE TOTAL / PASSIVO CIRCULANTE TOTAL
        ***** INDICE DE LIQUIDEZ SECA - (ATIVOS CIRCULANTES - ESTOQUES) / PASSIVO CIRCULANTE
        ***** GIRO ESTOQUE - CMV/ESTOQUES
        ***** IDADE MEDIA ESTOQUE - 365 / GIRO DO ESTOQUE
        ***** PRAZO MEDIO DE RECEBIMENTO - CONTAS A RECEBER DE CLIENTES / (VENDAS ANUAIS / 365)
        ***** GIRO DO ATIVO TOTAL - VENDAS / ATIVO TOTAL
        ***** INDICE DE ENDIVIDAMENTO GERAL - PASSIVO TOTAL / ATIVO TOTAL
        ***** MARGEM DE LUCRO BRUTO - RECEITA DE VENDAS - CMV / RECEITA DE VENDAS
        ***** MARGEM DO LUCRO OPERACIONAL - LUCRO OPERACIONAL / RECEITA DE VENDAS
        ***** MARGEM DO LUCRO LÍQUIDO - LUCRO LIQUIDO APOS IR / RECEITA DE VENDAS
        */

        connection.query('SELECT b_value, b_type, b_name FROM b_patrimonial_item WHERE user_id = ? AND b_type = 0', [id], (err, result, fields)=>{
            const total = result.reduce((a, v)=> a + v.b_value, 0)
            ativoc = total
            
        })
        connection.query('SELECT b_value, b_type, b_name FROM b_patrimonial_item WHERE user_id = ? AND b_type = 1', [id], (err, result, fields)=>{
            const total = result.reduce((a, v)=> a + v.b_value, 0)
            passivoc = total

        })

        connection.query(`SELECT b_value, b_type, b_name FROM b_patrimonial_item WHERE user_id = ? AND b_name = 'estoques'` , [id], (err, result, fields)=>{
            estoques = result[0].b_value
            
        })

        connection.query(`SELECT cmv FROM dre WHERE user_id = ?` , [id], (err, result, fields)=>{
            cmv = result[0].cmv
        })

        connection.query(`SELECT b_value, b_type, b_name FROM b_patrimonial_item WHERE user_id = ? AND b_name = 'contas a receber de clientes'` , [id], (err, result, fields)=>{
            contasareceberclientes = result[0].b_value 
            res.send({data})
        })

        connection.query(`SELECT gor FROM dre WHERE user_id = ?` , [id], (err, result, fields)=>{
            vendasanuais = result[0].gor
        })

        connection.query('SELECT b_value, b_type, b_name FROM b_patrimonial_item WHERE user_id = ? AND b_type = 0 || b_type = 2', [id], (err, result, fields)=>{
            const total = result.reduce((a, v)=> a + v.b_value, 0)
            ativototal = total
            
        })

        connection.query('SELECT b_value, b_type, b_name FROM b_patrimonial_item WHERE user_id = ? AND b_type = 1 || b_type = 3', [id], (err, result, fields)=>{
            const total = result.reduce((a, v)=> a + v.b_value, 0)
            passivoTotal = total
            
        })
        

        
        const data = {
            ilc: {
                name: "Índice de Líquidez Corrente",
                description: "Capacidade da empresa de pagar suas obrigações a curto prazo. Quanto maior o ILC, mais líquida a empresa",
                value: ativoc / passivoc
            },
            ils: {
                name: "Índice de Líquidez Seca",
                description: "Semelhante ao índice de liquidez corrente mas exclui o estoque que costuma ser o menos líquido dos ativos circulantes",
                value: (ativoc - estoques) / passivoc
            },
            ge: {
                name: "Giro de Estoque",
                description: "Costuma medir a atividade, ou liquidez, do estoque de uma empresa. Resultado em quantidade de giros no período calculado",
                value: cmv / estoques
            },
            ime: {
                name: "Idade Média de Estoque",
                description: "365 dividido pelo giro do estoque",
                value: 365 / (cmv / estoques)
            },
            pmr: {
                name: "Prazo Médio de Recebimento",
                description: "É útil para avaliar as políticas de crédito e cobrança.",
                value: contasareceberclientes / (vendasanuais / 365)
            },
            gat: {
                name: "Giro do Ativo Total",
                description: "Indica a eficiência com que a empresa utiliza seus ativos para gerar vendas",
                value: vendasanuais / ativototal
            },
            ieg:{
                name: "Índice de Envididamento Geral",
                description: "Mede a proporção do ativo total financiada pelos credores da empresa. Quanto mais elevado, maior o montante de capital de terceiros usado para gerar lucros",
                value: passivoTotal / ativototal
            }
        }

        
        
    },
    ilc: (req,res)=>{
        const {id} = req.body
        let ativoc
        let passivoc

        connection.query('SELECT b_value, b_type, b_name FROM b_patrimonial_item WHERE user_id = ? AND b_type = 0', [id], (err, result, fields)=>{
            const total = result.reduce((a, v)=> a + v.b_value, 0)
            ativoc = total

            connection.query('SELECT b_value, b_type, b_name FROM b_patrimonial_item WHERE user_id = ? AND b_type = 1', [id], (err, result, fields)=>{
                const total = result.reduce((a, v)=> a + v.b_value, 0)
                passivoc = total

                const data = {
                    ilc: {
                        name: "Índice de Líquidez Corrente",
                        description: "Capacidade da empresa de pagar suas obrigações a curto prazo. Quanto maior o ILC, mais líquida a empresa",
                        value: ativoc / passivoc
                    }
                }

                res.send({data})
            })
            
        })
    },
    ils: (req, res)=>{
        const {id} = req.body
        let estoques
        let ativoc
        let passivoc

        connection.query(`SELECT b_value, b_type, b_name FROM b_patrimonial_item WHERE user_id = ? AND b_name = 'estoques'` , [id], (err, result, fields)=>{
            estoques = result[0].b_value
            connection.query('SELECT b_value, b_type, b_name FROM b_patrimonial_item WHERE user_id = ? AND b_type = 0', [id], (err, result, fields)=>{
                const total = result.reduce((a, v)=> a + v.b_value, 0)
                ativoc = total

                connection.query('SELECT b_value, b_type, b_name FROM b_patrimonial_item WHERE user_id = ? AND b_type = 1', [id], (err, result, fields)=>{
                    const total = result.reduce((a, v)=> a + v.b_value, 0)
                    passivoc = total

                    const data = {
                        ils: {
                            name: "Índice de Líquidez Seca",
                            description: "Semelhante ao índice de liquidez corrente mas exclui o estoque que costuma ser o menos líquido dos ativos circulantes.",
                            value: (ativoc - estoques) / passivoc
                        },
                    }
                    
                    res.send({data})
        
                })

                
            })
        })
    },
    ge: (req, res) =>{
        const {id} = req.body
        let estoques
        let cmv

        connection.query(`SELECT b_value, b_type, b_name FROM b_patrimonial_item WHERE user_id = ? AND b_name = 'estoques'` , [id], (err, result, fields)=>{
            estoques = result[0].b_value

            connection.query(`SELECT cmv FROM dre WHERE user_id = ?` , [id], (err, result, fields)=>{
                cmv = result[0].cmv
                const data = {
                    name: "Giro de Estoque",
                    description: "Costuma medir a atividade, ou liquidez, do estoque de uma empresa. Resultado em quantidade de giros no período calculado.",
                    value: cmv / estoques
                }

                res.send({data})
            })
            
        })
    },
    ime: (req, res)=>{
        const {id} = req.body
        let estoques
        let cmv

        connection.query(`SELECT b_value, b_type, b_name FROM b_patrimonial_item WHERE user_id = ? AND b_name = 'estoques'` , [id], (err, result, fields)=>{
            estoques = result[0].b_value

            connection.query(`SELECT cmv FROM dre WHERE user_id = ?` , [id], (err, result, fields)=>{
                cmv = result[0].cmv

                const data = {
                    name: "Idade Média do Estoque",
                    description: "Costuma medir a atividade, ou liquidez, do estoque de uma empresa. Resultado em quantidade de giros no período calculado.",
                    value: 365 / (cmv / estoques)
                }

                res.send({data})
            })
            
        })
        
    },
    pmr: (req, res)=>{
        const {id} = req.body
        let contasareceberclientes
        let vendasanuais

        connection.query(`SELECT b_value, b_type, b_name FROM b_patrimonial_item WHERE user_id = ? AND b_name = 'contas a receber de clientes'` , [id], (err, result, fields)=>{
            contasareceberclientes = result[0].b_value 

            connection.query(`SELECT gor FROM dre WHERE user_id = ?` , [id], (err, result, fields)=>{
                vendasanuais = result[0].gor

                const data = {
                    name: "Prazo Médio de Recebimento",
                    description: "É útil para avaliar as políticas de crédito e cobrança.",
                    value: contasareceberclientes / (vendasanuais / 365)
                }
        
                res.send({data})
            })
        })

        

    },
    gat: (req, res)=>{
        const {id} = req.body

        connection.query(`SELECT gor FROM dre WHERE user_id = ?` , [id], (err, result, fields)=>{
            vendasanuais = result[0].gor

            connection.query('SELECT b_value, b_type, b_name FROM b_patrimonial_item WHERE  b_type = 0 || b_type = 2 AND user_id = ?', [id], (err, result, fields)=>{
                const total = result.reduce((a, v)=> a + v.b_value, 0)
                ativototal = total
                
            })

            const data = {
                name: "Giro do Ativo Total",
                description: "Indica a eficiência com que a empresa utiliza seus ativos para gerar vendas.",
                value: vendasanuais / ativototal
            }

            res.send({data})
        })
    },
    ieg: (req, res)=>{
        const {id} = req.body
        let ativototal
        let passivoTotal

        connection.query('SELECT b_value, b_type, b_name FROM b_patrimonial_item WHERE  b_type = 0 || b_type = 2 AND user_id = ?', [id], (err, result, fields)=>{
            const total = result.reduce((a, v)=> a + v.b_value, 0)
            ativototal = total
            

            connection.query('SELECT b_value, b_type, b_name FROM b_patrimonial_item WHERE  b_type = 1 || b_type = 3 AND user_id = ?', [id], (err, result, fields)=>{
                const total = result.reduce((a, v)=> a + v.b_value, 0)
                passivoTotal = total

                const data = {
                    name: "Índice de Envididamento Geral",
                    description: "Mede a proporção do ativo total financiada pelos credores da empresa. Quanto mais elevado, maior o montante de capital de terceiros usado para gerar lucros.",
                    value: passivoTotal / ativototal
                }
                res.send({data})
                
                
            })
        })
    },
    mlb: (req, res) =>{
        const {id} = req.body
        let vendasanuais
        let cmv

        connection.query(`SELECT gor FROM dre WHERE user_id = ?` , [id], (err, result, fields)=>{
            vendasanuais = result[0].gor

            connection.query(`SELECT cmv FROM dre WHERE user_id = ?` , [id], (err, result, fields)=>{
                cmv = result[0].cmv

                const data = {
                    name: "Margem do Lucro Bruto",
                    description: "Mede a porcentagem de cada unidade monetária de vendas que permanece após a empresa deduzir o valor dos bens Quanto maior a margem de lucrobruto, melhor (isto é, menor o custo das mercadorias vendidas)",
                    value: (vendasanuais - cmv) / vendasanuais
                }

                res.send({data})
            })
        })
    },
    mlo: (req, res)=>{
        const {id} = req.body

        let lucrooperacional
        let vendasanuais

        connection.query(`SELECT op FROM dre WHERE user_id = ?` , [id], (err, result, fields)=>{
            lucrooperacional = result[0].op

            connection.query(`SELECT gor FROM dre WHERE user_id = ?` , [id], (err, result, fields)=>{
                vendasanuais = result[0].gor

                const data = {
                    name: "Margem de Lucro Operacional",
                    description: "Mede a porcentagem de cada unidade monetária de vendas remanescente após a dedução de todos os custos e despesas exceto juros, imposto de renda e dividendos de ações preferenciais.",
                    value: lucrooperacional / vendasanuais
                }
    
                res.send({data})
            })

            

        })
    },
    mll: (req, res)=>{
        const {id} = req.body

        let niait // Lucro Apos IR
        let vendasanuais

        connection.query(`SELECT gor FROM dre WHERE user_id = ?` , [id], (err, result, fields)=>{
            vendasanuais = result[0].gor

            connection.query(`SELECT niait FROM dre WHERE user_id = ?` , [id], (err, result, fields)=>{
                niait = result[0].niait

                const data = {
                    name: "Margem do Lucro Líquido",
                    description: "Mede a porcentagem de cada unidade monetária de vendas remanescente após a dedução de todos os custos e despesas, inclusive juros, impostos e dividendos de ações preferenciais.",
                    value: niait / vendasanuais
                }
    
                res.send({data})
            })

            
        })
    }
}

module.exports = indices