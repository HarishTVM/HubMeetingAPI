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
const config = require('../web-config');

module.exports.checkCmsApiUrl = (req, res, next) =>{
    var data = req.body;

    config.cmsAuth.xmppUrl = data.apiUrl;
    config.cmsAuth.apiUrl = data.apiUrl = "https://"+data.apiUrl+":445/api/v1/";
    config.cmsAuth.apiUser = data.apiUserName;
    config.cmsAuth.apiPassword = data.apiPassword;

    httpHelper.getRequest(cmsTypes.CmsApis.COSPACES)
    .then((response)=>configAdapter.insertCmsApiUrl(data))
    .then((response)=>baseController.sendResponseData(cmsTypes.results.OK, "", res))
    .catch((err)=>{
        config.cmsAuth.apiUrl = null;
        conf.cmsAuth.xmppUrl = null;
        config.cmsAuth.apiPassword = null;
        config.cmsAuth.apiUser = null;
        config.cmsAuth.base64Encode = null;
        (err.context != null && err.context.errorType == cmsTypes.results.CUSTOM_ERROR)?(baseController.sendCustomError(err, res)):(baseController.sendUnhandledError(err, res));
    });  
}