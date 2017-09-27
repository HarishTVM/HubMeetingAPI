#!/bin/env node
"esversion:6";
"strict mode";

const errors = require('restify-errors');
const cmsTypes = require('../cms-types');
const model = require('../models/cms-models');

const ApiConfiguration = model.apiConfiguration;
const SmtpConfiguration = model.apiConfiguration;

/******---------------------------------------------- BEGIN OF ADAPTER METHODS --------------------------------------------------------------------------------------***/

    getApiConfigurationCount = () => {
        return new Promise((resolve, reject) => resolve())
        .then(()=>ApiConfiguration.count({raw: true}));
    };

    getSmtpConfigurationCount = () => {
        return new Promise((resolve, reject) => resolve())
        .then(()=>SmtpConfiguration.count({raw: true}));
    };

/******---------------------------------------------- END OF ADAPTER METHODS ----------------------------------------------------------------------------------------***/
/******---------------------------------------------- BEGIN OF INNER METHODS ----------------------------------------------------------------------------------------***/

/******---------------------------------------------- END OF INNER METHODS ------------------------------------------------------------------------------------------***/

module.exports.getApiConfigurationCount = getApiConfigurationCount;
module.exports.getSmtpConfigurationCount = getSmtpConfigurationCount;