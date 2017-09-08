#!/bin/env node
"esversion:6";
"strict mode";

const errors = require('restify-errors');
const baseController = require('./base-controller');
const httpHelper = require('../helpers/http-helper');

module.exports.getCospaces = (req, res, next)=>{
    httpHelper.getRequest("coSpaces")
    .then((response)=>baseController.sendResponseData("OK", response, res))
    .catch((err)=>new Promise.reject(new Error(err)));
};

module.exports.createCospace = (req, res, next)=>{
    let cospace = req.body;
    httpHelper.postRequest("coSpaces", "name="+cospace.name+"&uri="+cospace.uri+"&passcode="+cospace.passcode+"&defaultLayout="+cospace.defaultLayout)
    .then((response)=>baseController.sendResponseData("OK", response, res))
    .catch((err)=>new Promise.reject(new Error(err)));
};