#!/bin/env node
"esversion:6";
"strict mode";

const errors = require('restify-errors');
const cmsTypes = require('../cms-types');
const model = require('../models/cms-models');
const config = require('../web-config');


/******---------------------------------------------- BEGIN OF ADAPTER METHODS --------------------------------------------------------------------------------------***/


createMeeting = (data) =>{
    return new Promise((resolve, reject) => resolve())
    .then(()=>{
        meeting.insertOrUpdate({
        meetingID: meeting.meetingId, coSpaceId: meeting.cospaceId, isInitiated: meeting.isInitiated, passcode: meeting.passcode, meetingType: meeting.type, meetingStartDateTime: meeting.startDateTime,meetingEndDateTime:meeting.endDateTime,isMeetingCreated:meeting.isCreated,isArchived:meeting.isArchived,archivedDate:meeting.archivedDate,meetingActualStartDateTime:meeting.actualStartDateTime,meetingActualEndDateTime:meeting.actualEndDateTime
        })})
};

/******---------------------------------------------- END OF ADAPTER METHODS ----------------------------------------------------------------------------------------***/
/******---------------------------------------------- BEGIN OF INNER METHODS ----------------------------------------------------------------------------------------***/
// BEGIN General Methods

// END General Methods
/******---------------------------------------------- END OF INNER METHODS ------------------------------------------------------------------------------------------***/

module.exports.createMeeting = createMeeting;