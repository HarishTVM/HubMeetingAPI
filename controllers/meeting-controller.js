#!/bin/env node
"esversion:6";
"strict mode";

const errors = require('restify-errors');
const baseController = require('./base-controller');
const cmsApiController = require('./cms-api-controller');
const httpHelper = require('../helpers/http-helper');
const cmsTypes = require('../cms-types');
const meetingAdapter = require('../bll/meeting-adapter');

// module.exports.createMeeting = (req, res, next) => {
//     let meetingDetails = req.body;

//     console.log(meetingDetails)
//     .then(()=>baseController.sendResponseData(cmsTypes.results.OK, "", res))
//     .catch((err)=>(err.context != null && err.context.errorType == cmsTypes.results.CUSTOM_ERROR)?(baseController.sendCustomError(err, res)):(baseController.sendUnhandledError(err, res)));
// };

module.exports.createMeeting = (req, res, next) => {
    var meetingDetails = req.body;
    console.log(meetingDetails)
    if(req.body.type==1){
        //check if cospace exists in cms api or in db and send the api back
      cmsApiController.getCospacesbyId(meetingDetails,res,next)
      console.log(res)
      .then(()=>baseController.sendResponseData(cmsTypes.results.OK, "", res))
      .catch((err)=>(err.context != null && err.context.errorType == cmsTypes.results.CUSTOM_ERROR)?(baseController.sendCustomError(err, res)):(baseController.sendUnhandledError(err, res)));

    }
    else if(req.body.type==2){
        //get the cospace
        //create a random passcode and change it original passcode entered by user
        //

    }
    // meetingAdapter.createMeeting(meetingDetails)
   
};


