#!/bin/env node
"esversion:6";
"strict mode";

const errors = require('restify-errors');
const baseController = require('./base-controller');
const userAdapter = require('../bll/user-adapter');
const configAdapter = require('../bll/configuration-adapter');
const cmsTypes = require('../cms-types');
const utility = require('../helpers/utility');
const httpHelper = require('../helpers/http-helper');

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

module.exports.changeUserLoginPassword = (req, res, next) => {
    userAdapter.changeUserLoginPassword(req.body)
    .then(()=>baseController.sendResponseData(cmsTypes.results.OK, "", res))
    .catch((err)=>(err.context != null && err.context.errorType == cmsTypes.results.CUSTOM_ERROR)?(baseController.sendCustomError(err, res)):(baseController.sendUnhandledError(err, res)));
};

module.exports.apiConfiguration = (req, res, next) => {
  let apiConfig = req.body;
  auth = "Basic " + new Buffer(apiConfig.apiuser + ":" + apiConfig.apipassword).toString("base64");
  console.log(auth);
  httpHelper.getRequest(apiConfig.apiurl,auth)
  .then((response)=>baseController.sendResponseData("OK", response, res))
  .catch((err)=>baseController.sendUnhandledError("", err, res));
};