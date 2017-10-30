#!/bin/env node
"esversion:6";
"strict mode";

const errors = require('restify-errors');
const baseController = require('./base-controller');
const cmsApiController = require('./cms-api-controller');
const cmsTypes = require('../cms-types');
const meetingAdapter = require('../bll/meeting-adapter');

// module.exports.createMeeting = (req, res, next) => {
//     let meetingDetails = req.body;

//     console.log(meetingDetails)
//     .then(()=>baseController.sendResponseData(cmsTypes.results.OK, "", res))
//     .catch((err)=>(err.context != null && err.context.errorType == cmsTypes.results.CUSTOM_ERROR)?(baseController.sendCustomError(err, res)):(baseController.sendUnhandledError(err, res)));
// };

module.exports.createMeeting = (req, res, next) => {
    let data = req.body;

    if(typeof data.coSpaceId != 'undefined' && data.coSpaceId != null){ // update existing coSpace
       cmsApiController.createCospace({"name":})
    }
    else{ // create cospace

    }
    meetingAdapter.createMeeting(req.body)
    .then((result)=>baseController.sendResponseData(cmsTypes.results.OK, result, res))
    .catch((err)=>(err.context != null && err.context.errorType == cmsTypes.results.CUSTOM_ERROR)?(baseController.sendCustomError(err, res)):(baseController.sendUnhandledError(err, res)));
};


