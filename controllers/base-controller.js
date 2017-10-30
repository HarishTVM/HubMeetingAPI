#!/usr/bin/env node
"strict mode";
"esversion:6";

const cmsTypes = require('../cms-types');
const assert = require('assert');


module.exports.sendResponseData = (result, data, res) => res.send(200, {"code":result, "data":data});

module.exports.sendCustomError = (err, res) => res.send(err.statusCode, {"code":err.body.code, "data":{"message": err.body.message, "errorType": err.context.errorType, "customErrCode": err.context.customErrCode}});

module.exports.sendUnhandledError = (err, res)=>{
    console.error(err);
    res.send(500, {"code":"UNHANDLED ERROR", "data":err.toString()});
};