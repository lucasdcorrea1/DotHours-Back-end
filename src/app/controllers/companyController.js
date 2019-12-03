'use strict'
const jwt = require('jsonwebtoken');

const companyRepository = require('../repositories/companyRepository');
const userCompany = require('../repositories/userCompany');
const validations = require('../validations/Validate');
// const services = require('../services');

exports.functionaryPost = async (req, res) => {
    try {
        const {
            name,
            office,
            entryTime,
            workload,
        } = req.body;
        const token = req.headers.authorization;

        if (!name || !office || !entryTime || !workload)
            return res.status(400).send({
                error: 'Existem campos vazios'
            });

        const decoded = jwt.decode(token, {
            complete: true
        });

        const userId = decoded.payload["id"];
        
        if (await userCompany.get({ name }))
            return res.status(400).send({
                error: 'funcionario já cadastrado!'
            });

        try {
            await userCompany.post({
                userCompanyId: userId,
                name:name,
                office:office,
                entryTime:entryTime,
                workload:workload
            })
            res.status(201).send({
                message: 'Funcionario cadastrada com sucesso!'
            });
        } catch (e) {
            res.status(500).send({
                message: 'Erro ao cadastrar funcionario!'
            });
            console.log(e);
        }

    } catch (err) {
        return res.status(400).send({
            error: err + ''
        });
    }

};

exports.companyPost = async (req, res) => {
    try {
        const {
            companyName,
            address,
            cnpj
        } = req.body;

        if (!companyName || !address || !cnpj)
            return res.status(400).send({
                error: 'Existem campos vazios'
            });

        const token = req.headers.authorization;

        const decoded = jwt.decode(token, {
            complete: true
        });

        const userId = decoded.payload["id"];

        if (!validations.validateCnpj(cnpj))
        return res.status(400).send({
            error: 'CNPJ inválido'
        });
        
        if (await companyRepository.get({ cnpj }))
            return res.status(400).send({
                error: 'CNPJ já cadastrado!'
            });

        try {
            await companyRepository.post({
                userId: userId,
                companyName: companyName,
                address: address,
                cnpj: cnpj
            })
            res.status(201).send({
                message: 'Empresa cadastrada com sucesso!'
            });
        } catch (e) {
            res.status(500).send({
                message: 'Erro ao cadastrar empresa!'
            });
            console.log(e);
        }

    } catch (err) {
        return res.status(400).send({
            error: err + ''
        });
    }
};

