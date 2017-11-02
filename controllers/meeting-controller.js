#!/bin/env node
"esversion:6";
"strict mode";

const errors = require('restify-errors');
const baseController = require('./base-controller');
const cmsTypes = require('../cms-types');
const meetingAdapter = require('../bll/meeting-adapter');
const utility = require('../helpers/utility');
const httpHelper = require('../helpers/http-helper');
const jsonHelper = require('../helpers/json-helper');

module.exports.createMeeting = (req, res, next) => {
    let data = req.body;

    meetingAdapter.createMeeting(data)
    .then((meeting)=>{
       if(utility.isMeetingHasToScheduleNow(meeting.meetingStartDateTime)){
            meeting.meetingStatus = cmsTypes.meetingStatus.ON_GOING;
            meeting.isMeetingCreated = true;

            if(meeting.meetingType == cmsTypes.meetingType.ONE_TIME){ // One time meeting
                jsonHelper.getcoSpaceObject(data)
                .then((coSpace)=>httpHelper.postRequestWithHeaders(cmsTypes.CmsApis.COSPACES, coSpace))
                .then((res)=>{
                    meeting.coSpaceId = res.response.headers.location.substr(res.response.headers.location.lastIndexOf('/') + 1); 
                    meetingAdapter.updateMeeting(meeting)
                })
                .then(()=>meetingAdapter.addMeetingMembers({"members":data.members, "meetingObj":meeting}))
            }
            else{   // personal meeting
                jsonHelper.getcoSpaceObject(data)
                .then((cospace)=>httpHelper.putRequest(cmsTypes.CmsApis.COSPACES+"/"+meeting.coSpaceId, cospace))
            }
        }
        else
            return ;
    })
    .then((result)=>baseController.sendResponseData(cmsTypes.results.OK, '', res))
    .catch((err)=>(err.context != null && err.context.errorType == cmsTypes.results.CUSTOM_ERROR)?(baseController.sendCustomError(err, res)):(baseController.sendUnhandledError(err, res)));
};