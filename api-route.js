#!/bin/env node
"esversion:6";
"strict mode";

const errors = require('restify-errors');
const cmsApiController = require('./controllers/cms-api-controller');
const userController = require('./controllers/user-controller');
const configurationController = require('./controllers/configuration-controller'); 
const server = require('./main').server;

server.get('/api/getCospaces', cmsApiController.getCospaces);
server.post('/api/createCospace', cmsApiController.createCospace);
server.get('/api/getCoSpacesUsers', cmsApiController.getCoSpacesUsers);
server.get('/api/getCoSpacesUsersById', cmsApiController.getCoSpacesUsersById);
server.put('/api/updateCospace', cmsApiController.updateCospace);
server.del('/api/deleteCospaceUser', cmsApiController.deleteCospaceUser);
server.post('/api/addUserInCospace', cmsApiController.addUserInCospace);

// LoginUser Related API
server.get('/api/authenticateUser', userController.authenticateUser);
server.put('/api/changeUserLoginPassword', userController.changeUserLoginPassword);
server.post('/api/checkCmsApiUrl', configurationController.checkCmsApiUrl);
