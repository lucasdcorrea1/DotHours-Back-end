require('dotenv/config');
const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const apiCalendar = process.env.API_CALENDAR;

const authMiddleware = require('../middlewares/auth');
const router = express.Router();

router.use(authMiddleware);

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

router.post('/', async (req, res) => {
    try {
        const {
            year,
            month,
            city
        } = req.body;
        const token = req.headers.authorization;
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
        const decoded = jwt.decode(token, {
            complete: true
        });

        const userId = decoded.payload["id"];
        const response = await axios.get(getholidey)
        const holidays = holidaysSimple(response.data, month);

        return res.send({
            userId,
            holidays
        });

    } catch (err) {
        return res.status(400).send({
            error: err + ''
        });
    }
});

module.exports = app => app.use('/holidays', router);