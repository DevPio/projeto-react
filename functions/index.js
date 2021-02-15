const functions = require("firebase-functions");

const admn = require('firebase-admin');
const { object } = require("firebase-functions/lib/providers/storage");

admn.initializeApp()


exports.sum = functions.database.ref('/movimentacoes/{dia}')
    .onWrite(async (change, context)=>{
        const mesesRef = admn.database().ref('/meses/'+context.params.dia)
        const movimentacoesRef = change.after.ref
        const movimentacoesS = await  movimentacoesRef.once('value')
        const move = movimentacoesS.val()

        let entradas = 0;
        let saidas = 0;

        Object.keys(move).forEach(item=>{
            if(move[item].valor>0){
                entradas += Number(move[item].valor)
            }else{
                saidas += Number(move[item].valor)
            }

        })

        return mesesRef.transaction(current=>{
            if(current == null){
                return {
                    entradas,
                    saidas,
                    preivsao_entradas:0,
                    previsao_saida:0
                }
            }else{
                return {
                    ...current,
                    entradas,
                    saidas,
                }
            }


        })
    })