'use strict';

const mongoose = require('../../database');
const Schema = mongoose.Schema;

const schema = new Schema({
    userId: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        required: true,
    },
    office: {
        type: String,
        required: true,
    },
    entryTime: {
        type: String,
        required: true,
    },
    workload: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('UserCompany', schema);