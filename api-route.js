#!/bin/env node
"esversion:6";
"strict mode";

const errors = require('restify-errors');
const cmsApiController = require('./controllers/cms-api-controller');

module.exports = (server) =>{
    server.get('/api/getCospaces',cmsApiController.getCospaces);
}