#!/bin/env node
"esversion:6";
"strict mode";

const errors = require('restify-errors');
const cmsTypes = require('../cms-types');
const model = require('../models/cms-models');
const config = require('../web-config');
const jsonHelper = require('../helpers/json-helper');

const Meeting = model.meeting;
const MeetingMembers = model.meetingMember;

/******---------------------------------------------- BEGIN OF ADAPTER METHODS --------------------------------------------------------------------------------------***/

createMeeting = (data) =>{
    return new Promise((resolve, reject) => resolve())
    .then(()=>jsonHelper.getMeetingObject(data))
    .then((meetingObj)=>
         Meeting
         .build(meetingObj)
        .save({raw: true}))
    .then((result)=>result.get({plain: true}))
};

updateMeeting = (data)=>{
    return new Promise((resolve, reject) => resolve())
    .then(()=>jsonHelper.getMeetingObject(data))
    .then((meetingObj)=>{
        Meeting
        .update(
            meetingObj,
            {where: {meetingID: meetingObj.meetingID}}
        )
    });
};

addMeetingMembers = (data)=>{
    return new Promise((resolve, reject) => resolve())
    .then(()=>{
        let meetingMembers = [];

        data.members.forEach((member)=>{
            member.meetingID = data.meetingObj.meetingID;
            meetingMembers.push(jsonHelper.getMeetingMemberObject(member));
        });

       return MeetingMembers.bulkCreate(meetingMembers)
    });
}

/******---------------------------------------------- END OF ADAPTER METHODS ----------------------------------------------------------------------------------------***/
/******---------------------------------------------- BEGIN OF INNER METHODS ----------------------------------------------------------------------------------------***/
// BEGIN General Methods

// END General Methods
/******---------------------------------------------- END OF INNER METHODS ------------------------------------------------------------------------------------------***/

module.exports.createMeeting = createMeeting;
module.exports.updateMeeting = updateMeeting;
module.exports.addMeetingMembers = addMeetingMembers;