#!/bin/env node
"esversion:6";
"strict mode";

const moment = require('moment-timezone');
const cmsType = require('../cms-types');

module.exports.getcoSpaceObject = (data)=>{
    return new Promise((resolve, reject) => {
        let coSpaceObj = "name="+data.coSpace + "&uri="+data.uri + "&passcode=" + data.passcode;

        if(typeof data.secondaryUri != 'undefined' && data.secondaryUri != null)
            coSpaceObj += "&secondaryUri="+data.secondaryUri;
        if(typeof data.callId != 'undefined' && data.callId != null)
             coSpaceObj += "&callId="+data.callId;
        if(typeof data.cdrTag != 'undefined' && data.cdrTag != null)
            coSpaceObj += "&cdrTag="+data.cdrTag;
        if(typeof data.defaultLayout != 'undefined' && data.defaultLayout != null)
            coSpaceObj += "&defaultLayout="+cmsType.meetingLayoutTranslation[data.defaultLayout];
        if(typeof data.tenant != 'undefined' && data.tenant != null)
            coSpaceObj += "&tenant="+data.tenant;
        if(typeof data.callLegProfile != 'undefined' && data.callLegProfile != null)
            coSpaceObj += "&callLegProfile="+data.callLegProfile;
        if(typeof data.callProfile != 'undefined' && data.callProfile != null)
            coSpaceObj += "&callProfile="+data.callProfile;
        if(typeof data.callBrandingProfile != 'undefined' && data.callBrandingProfile != null)
            coSpaceObj += "&callBrandingProfile="+data.callBrandingProfile;
        if(typeof data.requireCallId != 'undefined' && data.requireCallId != null)
            coSpaceObj += "&requireCallId="+data.requireCallId;
        if(typeof data.secret != 'undefined' && data.secret != null)
            coSpaceObj += "&secret="+data.secret;
        if(typeof data.regenerateSecret != 'undefined' && data.regenerateSecret != null)
            coSpaceObj += "&regenerateSecret="+data.regenerateSecret;
        if(typeof data.nonMemberAccess != 'undefined' && data.nonMemberAccess != null)
            coSpaceObj += "&nonMemberAccess="+data.nonMemberAccess;
        if(typeof data.ownerJid != 'undefined' && data.ownerJid != null)
            coSpaceObj += "&ownerJid="+data.ownerJid;
        if(typeof data.streamUrl != 'undefined' && data.streamUrl != null)
             coSpaceObj += "&streamUrl="+data.streamUrl;
        if(typeof data.ownerAdGuid != 'undefined' && data.ownerAdGuid != null)
            coSpaceObj += "&ownerAdGuid="+data.ownerAdGuid;
        if(typeof data.meetingScheduler != 'undefined' && data.meetingScheduler != null)
            coSpaceObj += "&meetingScheduler="+data.meetingScheduler;
        
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
            meetingStartDateTime: moment.tz(data.meetingStartDateTime, cmsType.dateTimeZone),
            meetingEndDateTime: moment.tz(data.meetingEndDateTime, cmsType.dateTimeZone)
        }

        if(typeof data.meetingID != 'undefined' && data.meetingID != null)
            meetingObj.meetingID = data.meetingID;
        if(typeof data.coSpaceId != 'undefined' && data.coSpaceId != null)
            meetingObj.coSpaceId = data.coSpaceId;
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
            meetingObj.archivedDate = moment.tz(data.archivedDate, cmsType.dateTimeZone);
        if(typeof data.meetingActualStartDateTime != 'undefined' && data.meetingActualStartDateTime != null)
            meetingObj.meetingActualStartDateTime = moment.tz(data.meetingActualStartDateTime, cmsType.dateTimeZone);
        if(typeof data.meetingActualEndDateTime != 'undefined' && data.meetingActualEndDateTime != null)
            meetingObj.meetingActualEndDateTime = moment.tz(data.meetingActualEndDateTime, cmsType.dateTimeZone);
        if(typeof data.ownerJid != 'undefined' && data.ownerJid != null)
            meetingObj.ownerJid = data.ownerJid;

        resolve(meetingObj);
    })
}

module.exports.getMeetingMemberObject = (data)=>{
    let meetingMemberObj = {
        memberJid: data.memberJid,
        coSpaceUserID: data.coSpaceUserID,
        isOwner: data.isOwner,
        meetingID: data.meetingID
    }
    
    if(typeof data.meetingMemberID != 'undefined' && data.meetingMemberID != null)
        meetingMemberObj.meetingMemberID = data.meetingMemberID;
    if(typeof data.meetingStartDateTime != 'undefined' && data.meetingStartDateTime != null)
        meetingMemberObj.meetingStartDateTime = moment.tz(data.meetingStartDateTime, cmsType.dateTimeZone);
    if(typeof data.meetingEndDateTime != 'undefined' && data.meetingEndDateTime != null)
        meetingMemberObj.meetingEndDateTime = moment.tz(data.meetingEndDateTime, cmsType.dateTimeZone);
    if(typeof data.isMailed != 'undefined' && data.isMailed != null)
        meetingMemberObj.isMailed = data.isMailed;
    if(typeof data.isAttended != 'undefined' && data.isAttended != null)
        meetingMemberObj.isAttended = data.isAttended;
    if(typeof data.coSpaceUserID != 'undefined' && data.coSpaceUserID != null)
        meetingMemberObj.coSpaceUserID = data.coSpaceUserID;
    
    return meetingMemberObj;
}

module.exports.getMeetingMemberString = (data)=>{
    let meetingMember = "userId="+data.coSpaceUserID+"&userJid="+data.memberJid+"&coSpaceId="+data.coSpaceId;

    if(typeof data.callLegProfile != 'undefined' && data.callLegProfile != null)
    meetingMember.callLegProfile = data.callLegProfile;
    if(typeof data.canDestroy != 'undefined' && data.canDestroy != null)
    meetingMember.canDestroy = data.canDestroy;
    if(typeof data.canAddRemoveMember != 'undefined' && data.canAddRemoveMember != null)
    meetingMember.canAddRemoveMember = data.canAddRemoveMember;
    if(typeof data.canChangeName != 'undefined' && data.canChangeName != null)
    meetingMember.canChangeName = data.canChangeName;
    if(typeof data.canChangeUri != 'undefined' && data.canChangeUri != null)
    meetingMember.canChangeUri = data.canChangeUri;
    if(typeof data.canChangeCallId != 'undefined' && data.canChangeCallId != null)
    meetingMember.canChangeCallId = data.canChangeCallId;
    if(typeof data.canChangePasscode != 'undefined' && data.canChangePasscode != null)
    meetingMember.canChangePasscode = data.canChangePasscode;
    if(typeof data.canPostMessage != 'undefined' && data.canPostMessage != null)
    meetingMember.canPostMessage = data.canPostMessage;
    if(typeof data.canRemoveSelf != 'undefined' && data.canRemoveSelf != null)
    meetingMember.canRemoveSelf = data.canRemoveSelf;
    if(typeof data.canDeleteAllMessages != 'undefined' && data.canDeleteAllMessages != null)
    meetingMember.canDeleteAllMessages = data.canDeleteAllMessages;
   
    return meetingMember;
}
