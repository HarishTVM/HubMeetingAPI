#!/usr/bin/env node
"strict mode";
"esversion:6";

const errors = require('restify-errors');
const baseController = require('./base-controller');
const cmsTypes = require('../cms-types');
const utility = require('../helpers/utility');
const httpHelper = require('../helpers/http-helper');
const cmsController = require('./cms-api-controller');
const logAdapter = require('../bll/logs-adapter');
const meetingController = require('./meeting-controller');

module.exports.sendLogData = (results,type) =>{ console.log("in logs controller "+results + type)
    var type = type;
    var description = results;
    console.log(type)
    console.log(description)
    logAdapter.creatLog(type,description)
}

module.exports.findAllLogs = (req, res, next)=>{
    logAdapter.findAllLogs(req.query)
    .then((result)=>baseController.sendResponseData(cmsTypes.results.OK, result, res))
    .catch((err)=>(err.context != null && err.context.errorType == cmsTypes.results.CUSTOM_ERROR)?(baseController.sendCustomError(err, res)):(baseController.sendUnhandledError(err, res)));
}

