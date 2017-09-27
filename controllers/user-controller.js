#!/bin/env node
"esversion:6";
"strict mode";

const errors = require('restify-errors');
const baseController = require('./base-controller');
const userAdapter = require('../bll/user-adapter');
const configAdapter = require('../bll/configuration-adapter');
const cmsTypes = require('../cms-types');

module.exports.authenticateUser = (req, res, next) => {
    userAdapter.authenticateUser(req.query)
    .then((result)=>{
        return new Promise((resolve, reject) => resolve())
        .then(()=>configAdapter.getApiConfigurationCount())
        .then((apiCount)=>{
            result.isApiConfigured = (apiCount > 0) ? true : false;  
            return configAdapter.getSmtpConfigurationCount();      
        })
        .then((smtpCount)=>{
            result.isSmtpConfigured = (smtpCount > 0) ? true : false;  
            return baseController.sendResponseData(cmsTypes.results.OK, result, res);
        })
    })
    .catch((err)=>(err.context != null && err.context.errorType == cmsTypes.results.CUSTOM_ERROR)?(baseController.sendCustomError(err, res)):(baseController.sendUnhandledError(err, res)));
};