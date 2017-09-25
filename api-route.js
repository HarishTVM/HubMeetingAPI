#!/bin/env node
"esversion:6";
"strict mode";

const errors = require('restify-errors');
const cmsApiController = require('./controllers/cms-api-controller');

module.exports = (server) =>{
    server.get('/api/getCospaces', cmsApiController.getCospaces);
    server.post('/api/createCospace', cmsApiController.createCospace);
    server.get('/api/getCoSpacesUsers', cmsApiController.getCoSpacesUsers);
    server.get('/api/getCoSpacesUsersById', cmsApiController.getCoSpacesUsersById);
    server.put('/api/updateCospace', cmsApiController.updateCospace);
    server.del('/api/deleteCospaceUser', cmsApiController.deleteCospaceUser);
    server.post('/api/addUserInCospace', cmsApiController.addUserInCospace);
}