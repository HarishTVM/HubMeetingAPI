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
                return jsonHelper.getcoSpaceObject(data)
                .then((coSpace)=>httpHelper.postRequestWithHeaders(cmsTypes.CmsApis.COSPACES, coSpace))
                .then((res)=>{
                    meeting.coSpaceId = res.response.headers.location.substr(res.response.headers.location.lastIndexOf('/') + 1); 
                    meetingAdapter.updateMeeting(meeting)
                })
                .then(()=>{
                    let meetingMembers = [];
                    data.members.forEach((member)=>{
                        member.meetingID = meeting.meetingID;
                        member.coSpaceId = meeting.coSpaceId;
                        if(member.isOwner){
                            member.canDestroy = true;
                            member.canAddRemoveMember = true;
                            member.canChangeName = true;
                            member.canChangeUri = true;
                            member.canChangeCallId = true;
                            member.canChangePasscode = true;
                            member.canPostMessage = true;
                            member.canRemoveSelf = true;
                        }
                        meetingMembers.push(httpHelper.postRequest(cmsTypes.CmsApis.COSPACES+'/'+ meeting.coSpaceId+'/'+cmsTypes.CmsApis.COSPACEUSERS, jsonHelper.getMeetingMemberString(member)));
                    });
                    return Promise.all(meetingMembers);
                })
                .then(()=>meetingAdapter.addMeetingMembers({"members":data.members, "meetingObj":meeting}))
            }
            else{   // personal meeting
                return jsonHelper.getcoSpaceObject(data)
                .then((cospace)=>httpHelper.putRequest(cmsTypes.CmsApis.COSPACES+"/"+meeting.coSpaceId, cospace))
            }
       }
        else
            return ;
    })
    .then((result)=>baseController.sendResponseData(cmsTypes.results.OK, '', res))
    .catch((err)=>(err.context != null && err.context.errorType == cmsTypes.results.CUSTOM_ERROR)?(baseController.sendCustomError(err, res)):(baseController.sendUnhandledError(err, res)));
};

module.exports.deleteMeeting = (req, res, next)=>{
    let data = req.query;
    let _meetingObj;

    meetingAdapter.findOneMeeting(data)
    .then((meetingObj)=>{
        if(meetingObj == null)
            return Promise.reject(new errors.UnauthorizedError({message: "Meeting Object Not Found", context: {errorType:cmsTypes.results.CUSTOM_ERROR, customErrCode: cmsTypes.status.MEETING_NOT_EXISTS}}));
        
        _meetingObj = meetingObj;
        return meetingAdapter.deleteAllMembersOfMeeting(data.meetingID);
    })
    .then(()=>meetingAdapter.deleteMeeting(data.meetingID))
    .then(()=>{
        if(_meetingObj.meetingType == cmsTypes.meetingType.ONE_TIME)
            return httpHelper.deleteRequest(cmsTypes.CmsApis.COSPACES+'/'+_meetingObj.coSpaceId);
        else
            return ;
    })
    .then((result)=>baseController.sendResponseData(cmsTypes.results.OK, '', res))
    .catch((err)=>(err.context != null && err.context.errorType == cmsTypes.results.CUSTOM_ERROR)?(baseController.sendCustomError(err, res)):(baseController.sendUnhandledError(err, res)));
}

module.exports.updateMeeting = (req, res, next)=>{
    let data = req.query;

    meetingAdapter.updateMeeting(data)
    .then((result)=>baseController.sendResponseData(cmsTypes.results.OK, '', res))
    .catch((err)=>(err.context != null && err.context.errorType == cmsTypes.results.CUSTOM_ERROR)?(baseController.sendCustomError(err, res)):(baseController.sendUnhandledError(err, res)));
}

module.exports.getMeetingByMeetingId = (req, res, next)=>{
	meetingAdapter.findOneMeeting(req.query)
	.then((result)=>baseController.sendResponseData(cmsTypes.results.OK, result, res))
    .catch((err)=>(err.context != null && err.context.errorType == cmsTypes.results.CUSTOM_ERROR)?(baseController.sendCustomError(err, res)):(baseController.sendUnhandledError(err, res)));
}

module.exports.findAllMeeting = (req, res, next)=>{
    var _result;

    meetingAdapter.findAllMeeting(req.query)
    .then((result)=>{
        _result = result;
        let promiseRef = [];
        
        result.rows.forEach((row)=>promiseRef.push(meetingAdapter.findMeetingMemberCount(row)));
        return Promise.all(promiseRef);
    })
    .then((memberCounts)=>{
        for(var i=0; i<_result.rows.length; i++)
            _result.rows[i].memberCount = memberCounts[i];

        return baseController.sendResponseData(cmsTypes.results.OK, _result, res)
    })
    .catch((err)=>(err.context != null && err.context.errorType == cmsTypes.results.CUSTOM_ERROR)?(baseController.sendCustomError(err, res)):(baseController.sendUnhandledError(err, res)));
}

module.exports.findAllMeetingMembers = (req, res, next)=>{
    meetingAdapter.findAllMeetingMembers(req.query)
    .then((result)=>baseController.sendResponseData(cmsTypes.results.OK, result, res))
    .catch((err)=>(err.context != null && err.context.errorType == cmsTypes.results.CUSTOM_ERROR)?(baseController.sendCustomError(err, res)):(baseController.sendUnhandledError(err, res)));
}