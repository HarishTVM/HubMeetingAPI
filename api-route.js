#!/bin/env node
"esversion:6";
"strict mode";

const errors = require('restify-errors');
const cmsApiController = require('./controllers/cms-api-controller');
const userController = require('./controllers/user-controller');
const configurationController = require('./controllers/configuration-controller'); 
const meetingController= require('./controllers/meeting-controller'); 
const server = require('./main').server;

server.get('/api/getCospaces', cmsApiController.getCospaces);
server.get('/api/getCospacesbyId', cmsApiController.getCospacesbyId);
server.post('/api/createCospace', cmsApiController.createCospace);
server.get('/api/getCoSpacesUsers', cmsApiController.getCoSpacesUsers);
server.get('/api/getCoSpacesUsersById', cmsApiController.getCoSpacesUsersById);
server.put('/api/updateCospace', cmsApiController.updateCospace);
server.del('/api/deleteCospaceUser', cmsApiController.deleteCospaceUser);
server.post('/api/addUserInCospace', cmsApiController.addUserInCospace);
server.get('/api/getUsers', cmsApiController.getUsers);
server.get('/api/checkCoSpaceExistence', cmsApiController.checkCoSpaceExistence);
server.post('/api/addCospaceMember', cmsApiController.addCospaceMember);
server.get('/api/getCalls', cmsApiController.getCalls);
server.get('/api/getActiveCall', cmsApiController.getActiveCall);
server.del('/api/deleteActiveCall', cmsApiController.deleteActiveCall);
server.get('/api/authenticateCmsUser', cmsApiController.authenticateCmsUser);

// LoginUser Related API
server.post('/api/authenticateUser', userController.authenticateUser);
server.put('/api/changeUserLoginPassword', userController.changeUserLoginPassword);
server.post('/api/checkCmsApiUrl', configurationController.checkCmsApiUrl);

//Meeting Related API
server.post('/api/createMeeting', meetingController.createMeeting);
server.put('/api/updateMeeting', meetingController.updateMeeting);
server.del('/api/deleteMeeting', meetingController.deleteMeeting);
server.get('/api/findAllMeeting', meetingController.findAllMeeting);
server.get('/api/getMeetingByMeetingId', meetingController.getMeetingByMeetingId);
server.get('/api/findAllMeetingMembers', meetingController.findAllMeetingMembers);