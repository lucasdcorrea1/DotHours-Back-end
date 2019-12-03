'use strict';
const mongoose = require('../../database');
const CompanyConfig = mongoose.model('CompanyConfig');

exports.get = async(data) => {
    const companyConfig = await CompanyConfig.findOne(data)
    return companyConfig;
};

exports.post = async(data) => {
        const companyConfig = new CompanyConfig(data);
        await companyConfig.save();
};
