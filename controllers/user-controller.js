#!/bin/env node
"esversion:6";
"strict mode";

const errors = require('restify-errors');
const baseController = require('./base-controller');
const userAdapter = require('../bll/user-adapter');
const cmsTypes = require('../cms-types');

module.exports.authenticateUser = (req, res, next) => {
    userAdapter.authenticateUser(req.query)
    .then((result)=>baseController.sendResponseData(cmsTypes.results.OK, result, res))
    .catch((err)=>(err.context != null && err.context.errorType == cmsTypes.results.CUSTOM_ERROR)?(baseController.sendCustomError(err, res)):(baseController.sendUnhandledError(err,"",res)));
};