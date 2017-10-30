#!/bin/env node
"esversion:6";
"strict mode";

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