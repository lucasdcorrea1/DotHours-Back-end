'use strict';

const mongoose = require('../../database');
const Schema = mongoose.Schema;

const schema = new Schema({
    userId: {
        type: String,
        require: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    cnpj: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('CompanyConfig', schema);