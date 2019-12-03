'use strict'
const jwt = require('jsonwebtoken');
const companyRepository = require('../repositories/companyRepository');

exports.post = async (req, res) => {
    try {
        const {
            year,
            month,
            holidays
        } = req.body;

        const ponto = await dotHour(year,month);
        return res.status(200).send({
            ponto
        });
        


    } catch (err) {
        return res.status(400).send({
            error: err + ''
        });
    }
};

function dotHour(year,month){
    let lastDay = new Date(year, month, 0);
    let pnto = [];
    
    for (let i = 1; i <= lastDay.getDate(); i++) {



        
        pnto.push( {date: formataNumero(i) +"/" + month + "/" + year,
        test : retornaHora(1)
     })
    };
    return pnto
};

function setDate(){

};
function formataNumero(numero) {
    if (numero < 10) return "0" + numero;
  
    return numero;
  }

function retornaHora(horario) {
    var minutosSaida = Math.floor(Math.random() * 10 + 1);
    var diferencaSaida = Math.floor(Math.random() * 56 + 1);
    var minutos;
    var minutos2;
    var diferenca = Math.floor(Math.random() * minutosSaida + 1);
  
    minutos = minutosSaida + diferenca;
    if (horario == 1) {
      //Manha
      return {
        horaEntrada: "08:",
        minutosEntrada: formataNumero(diferenca),
        horaAlmoco: "12:",
        minutosAlmoco: formataNumero(minutosSaida),
        final_hora: "08:",
        minutos
      };
    } else if (horario == 2) {
      //Tarde
      return {
        horaEntrada: "14:",
        minutosEntrada: formataNumero(minutosSaida),
        horaAlmoco: "18:",
        minutosAlmoco: formataNumero(diferencaSaida),
        minutos
      };
    }
  }

function buscaMes() {
    var mesAno = new [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "dezembro"
    ];
};
