'use strict'

const jwt = require('jsonwebtoken');
const axios = require('axios');

require('dotenv/config');
const apiCalendar = process.env.API_CALENDAR;


exports.holidays = async(req, res) => {
    try {
        const {
            year,
            month,
            city
        } = req.body;
        var yearAtual = year;

        if (!city)
            return res.status(400).send({
                error: 'Informe o número do IBGE'
            });

        if (parseInt(month) >= 1 && parseInt(month) <= 12) {} else {
            return res.status(400).send({
                error: 'Mês invalido'
            });
        };

        if (!year) {
            yearAtual = new Date().getFullYear();
        };

        const getholidey = montaRequestGet(yearAtual, city)
        const response = await axios.get(getholidey)
        const holidays = holidaysSimple(response.data, month);

        return res.send({
            holidays
        });

    } catch (err) {
        return res.status(400).send({
            error: err + ''
        });
    }
};

function montaRequestGet(year, city) {
    const tokenApiCalendar = process.env.TOKEN_CALENDAR;
    const apiCalendarGet =
        apiCalendar +
        "&ano=" +
        year +
        "&ibge=" +
        city +
        "&token=" +
        tokenApiCalendar;

    return apiCalendarGet;
};

function holidaysSimple(ResponseData, month) {
    var holidays_Simple = [];
    var test;
    for (let i = 0; i < ResponseData.length; i++) {
        test = ResponseData[i].date.split("/");
        if (test[1] == month) {
            holidays_Simple.push({
                'date': ResponseData[i].date,
                'name': ResponseData[i].name,
                'type': ResponseData[i].type,
                "test": test[1]
            })
        };
    };
    return holidays_Simple;
};

