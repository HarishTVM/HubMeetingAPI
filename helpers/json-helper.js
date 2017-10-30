#!/bin/env node
"esversion:6";
"strict mode";


module.exports.getcoSpaceObject = (data)=>{
    return new Promise((resolve, reject) => {
        let coSpaceObj = "name="+data.coSpace + "uri="+data.uri + "passcode=" + data.passcode;


        if(typeof data.secondaryUri != 'undefined' && data.secondaryUri != null)
            coSpaceObj += "secondaryUri"+data.secondaryUri;
        if(typeof data.callId != 'undefined' && data.callId != null)
             coSpaceObj += "callId"+data.callId;
        if(typeof data.cdrTag != 'undefined' && data.cdrTag != null)
            coSpaceObj += "cdrTag"+data.cdrTag;
        if(typeof data.defaultLayout != 'undefined' && data.defaultLayout != null)
            coSpaceObj += "defaultLayout"+data.defaultLayout;
        if(typeof data.tenant != 'undefined' && data.tenant != null)
            coSpaceObj += "tenant"+data.tenant;
        if(typeof data.callLegProfile != 'undefined' && data.callLegProfile != null)
            coSpaceObj += "callLegProfile"+data.callLegProfile;
        if(typeof data.callProfile != 'undefined' && data.callProfile != null)
            coSpaceObj += "callProfile"+data.callProfile;
        if(typeof data.callBrandingProfile != 'undefined' && data.callBrandingProfile != null)
            coSpaceObj += "callBrandingProfile"+data.callBrandingProfile;
        if(typeof data.requireCallId != 'undefined' && data.requireCallId != null)
            coSpaceObj += "requireCallId"+data.requireCallId;
        if(typeof data.secret != 'undefined' && data.secret != null)
            coSpaceObj += "secret"+data.secret;
        if(typeof data.regenerateSecret != 'undefined' && data.regenerateSecret != null)
            coSpaceObj += "regenerateSecret"+data.regenerateSecret;
        if(typeof data.nonMemberAccess != 'undefined' && data.nonMemberAccess != null)
            coSpaceObj += "nonMemberAccess"+data.nonMemberAccess;
        if(typeof data.ownerJid != 'undefined' && data.ownerJid != null)
            coSpaceObj += "ownerJid"+data.ownerJid;
        if(typeof data.streamUrl != 'undefined' && data.streamUrl != null)
             coSpaceObj += "streamUrl"+data.streamUrl;
        if(typeof data.ownerAdGuid != 'undefined' && data.ownerAdGuid != null)
            coSpaceObj += "ownerAdGuid"+data.ownerAdGuid;
        if(typeof data.meetingScheduler != 'undefined' && data.meetingScheduler != null)
            coSpaceObj += "meetingScheduler"+data.meetingScheduler;
       
        
        resolve(coSpaceObj);
    })
}

module.exports.getMeetingObject = (data)=>{
    return new Promise((resolve, reject) => {
        let meetingObj = {
            coSpace: data.coSpace,
            uri: data.uri,
            isInitiated: data.isInitiated,
            passcode: data.passcode,
            meetingType: data.meetingType,
            meetingStartDateTime: data.meetingStartDateTime,
            meetingEndDateTime: data.meetingEndDateTime
        }

        if(typeof data.description != 'undefined' && data.description != null)
            meetingObj.description = data.description;
        if(typeof data.meetingStatus != 'undefined' && data.meetingStatus != null)
            meetingObj.meetingStatus = data.meetingStatus;
        if(typeof data.defaultLayout != 'undefined' && data.defaultLayout != null)
            meetingObj.defaultLayout = data.defaultLayout;
        if(typeof data.isMeetingCreated != 'undefined' && data.isMeetingCreated != null)
            meetingObj.isMeetingCreated = data.isMeetingCreated;
        if(typeof data.isArchived != 'undefined' && data.isArchived != null)
            meetingObj.isArchived = data.isArchived;
        if(typeof data.archivedDate != 'undefined' && data.archivedDate != null)
            meetingObj.archivedDate = data.archivedDate;
        if(typeof data.meetingActualStartDateTime != 'undefined' && data.meetingActualStartDateTime != null)
            meetingObj.meetingActualStartDateTime = data.meetingActualStartDateTime;
        if(typeof data.meetingActualEndDateTime != 'undefined' && data.meetingActualEndDateTime != null)
            meetingObj.meetingActualEndDateTime = data.meetingActualEndDateTime;
        
        resolve(meetingObj);
    })
}