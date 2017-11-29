#!/bin/env node
"esversion:6";
"strict mode";

const errors = require('restify-errors');
const cmsTypes = require('../cms-types');
const model = require('../models/cms-models');
const config = require('../web-config');

const ApiConfiguration = model.apiConfiguration;
const SmtpConfiguration = model.smtpConfiguration;

/******---------------------------------------------- BEGIN OF ADAPTER METHODS --------------------------------------------------------------------------------------***/

    getApiConfigurationCount = () => {
        return new Promise((resolve, reject) => resolve())
        .then(()=>ApiConfiguration.count({raw: true}));
    };

    getSmtpConfigurationCount = () => {
        return new Promise((resolve, reject) => resolve())
        .then(()=>SmtpConfiguration.count({raw: true}));
    };

    insertCmsApiUrl = (data) =>{
        return new Promise((resolve, reject) => resolve())
        .then(()=>
            ApiConfiguration.insertOrUpdate({
                ID:1,
                apiUrl: data.apiUrl,
                xmppUrl: config.cmsAuth.xmppUrl,
                apiUserName: data.apiUserName,
                apiPassword: data.apiPassword
            }))
    };

    getApiConfiguration = () =>{
        return new Promise((resolve, reject) => resolve())
        .then(()=>ApiConfiguration.findOne({raw: true}))
    };
/******---------------------------------------------- END OF ADAPTER METHODS ----------------------------------------------------------------------------------------***/
/******---------------------------------------------- BEGIN OF INNER METHODS ----------------------------------------------------------------------------------------***/

/******---------------------------------------------- END OF INNER METHODS ------------------------------------------------------------------------------------------***/

module.exports.getApiConfigurationCount = getApiConfigurationCount;
module.exports.getSmtpConfigurationCount = getSmtpConfigurationCount;
module.exports.insertCmsApiUrl = insertCmsApiUrl;
module.exports.getApiConfiguration = getApiConfiguration;