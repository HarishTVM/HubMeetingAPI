#!/bin/env node
"esversion:6";
"strict mode";

const sequelize = require('sequelize');
const cmsModel =  require('./cms-models');

const apiConfiguration = {
    apiUrl : {type: sequelize.STRING, allowNull: false},
    apiUserName : {type: sequelize.STRING, allowNull: false},
    apiPassword : {type: sequelize.STRING, allowNull: false} 
}

const smtpConfiguration = {
    smtpServerAddress : {type: sequelize.STRING, allowNull:false},
    smtpUserName : {type: sequelize.STRING, allowNull: false},
    smtpPassword : {type: sequelize.STRING, allowNull: false}
}

module.exports.apiConfiguration = apiConfiguration;
module.exports.smtpConfiguration = smtpConfiguration;