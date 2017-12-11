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

module.exports.sendLogData = (desc,type,id) =>{
    var meetingid,cospaceid;
    if(type == 0 || type == 2 )
        meetingid = id;
    else if(type == 3 || type == 4 || type == 5 )
        cospaceid = id;
    logAdapter.creatLog(type,desc,meetingid,cospaceid)
}

module.exports.findAllLogs = (req, res, next)=>{
    logAdapter.findAllLogs(req.query)
    .then((result)=>baseController.sendResponseData(cmsTypes.results.OK, result, res))
    .catch((err)=>(err.context != null && err.context.errorType == cmsTypes.results.CUSTOM_ERROR)?(baseController.sendCustomError(err, res)):(baseController.sendUnhandledError(err, res)));
}

