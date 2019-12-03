'use strict';
const mongoose = require('../../database');
const UserCompany = mongoose.model('UserCompany');

exports.get = async(data) => {
    const userCompany = await UserCompany.findOne(data)
    return userCompany;
};

exports.post = async(data) => {
    const userCompany = new UserCompany(data);
    await userCompany.save();
};