#!/bin/env node
"esversion:6";
"strict mode";

const errors = require('restify-errors');
const baseController = require('./base-controller');
const httpHelper = require('../helpers/http-helper');

module.exports.getCospaces = (req, res, next)=>{
    httpHelper.getRequest("coSpaces")
    .then((response)=>baseController.sendResponseData("OK", response, res));
};