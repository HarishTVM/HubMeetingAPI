#!/bin/env node
"esversion:6";
"strict mode";

const errors = require('restify-errors');
const cmsTypes = require('../cms-types');
const model = require('../models/cms-models');
const config = require('../web-config');
const jsonHelper = require('../helpers/json-helper');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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
};

deleteMeeting = (meetingID)=>{
    return new Promise((resolve, reject) => resolve())
    .then(()=>Meeting.destroy({
        where:{
            meetingID:meetingID
        },
        truncate:true
    }));
};

deleteAllMembersOfMeeting = (meetingID)=>{
    return new Promise((resolve, reject) => resolve())
    .then(()=>MeetingMembers.destroy({
        where:{
            meetingID:meetingID
        },
        truncate:true
    }));
};

deleteMembersOfMeeting = (data)=>{
    return new Promise((resolve, reject) => resolve())
    .then(()=>{
        let destroyObj = {}

        if(typeof data.memberJid != 'undefined' && data.memberJid != null)
            destroyObj = {memberJid: data.memberJid};
        if(typeof data.coSpaceUserID != 'undefined' && data.coSpaceUserID != null)
            destroyObj = {coSpaceUserID: data.coSpaceUserID};

        return MeetingMembers.destroy({
            where: destroyObj,
            truncate: true
        });
    });
};

findOneMeeting = (data)=>{
    return new Promise((resolve, reject) => resolve())
    .then(()=>Meeting.findOne({
        where:{
            meetingID: parseInt(data.meetingID)
        },
        raw: true
    }));
};

findAllMeeting = (data)=>{
    var query = {
        limit: parseInt(data.limit),
        offset: parseInt(data.offset),
        order:[['meetingStartDateTime', 'DESC']],
        raw:true
    }

    if(typeof data.filter != 'undefined' && data.filter != null)
        query.where = {$or: [
                                { coSpace: { $like: data.filter + '%' } },
                                { uri: { $like: data.filter + '%' } }
                            ]};
    return new Promise((resolve, reject) => resolve())
    .then(()=>Meeting.findAndCount(query))
};

findMeetingMemberCount = (data)=>{
    return MeetingMembers.findAndCount({
        where:{
            meetingID:data.meetingID
        },
        raw:true,   
        limit: 10,
        offset: 0
    })
    .then((result)=>{return result.count});
};

findAllMeetingMembers = (data)=>{
    var query = {
        limit: parseInt(data.limit),
        offset: parseInt(data.offset),
        order:[['memberJid', 'ASC']],
        raw:true
    }

    if(typeof data.filter != 'undefined' && data.filter != null){
        query.where = {$and: [
                                { meetingID: parseInt(data.meetingID) },
                                { memberJid: { $like: data.filter + '%' } }
                        ]};
    }
    else
        query.where = { meetingID: parseInt(data.meetingID) };

    return new Promise((resolve, reject) => resolve())
    .then(()=>MeetingMembers.findAndCount(query))
                            
}

findAllMeetingByStatus = (data)=>{
    var query = {
        limit: parseInt(data.limit),
        offset: parseInt(data.offset),
        order:[['memberJid', 'ASC']],
        raw:true
    }

    if(typeof data.filter != 'undefined' && data.filter != null)
        query.where = {$and: [
                                { meetingStatus: parseInt(data.meetingStatus) },
                                { coSpace: { $like: data.filter + '%' } },
                                { uri: { $like: data.filter + '%' } }
                        ]};
    else
        query.where = { meetingStatus: parseInt(data.meetingStatus) };
    
    return new Promise((resolve, reject) => resolve())
    .then(()=>Meeting.findAndCount(query))  
}

/******---------------------------------------------- END OF ADAPTER METHODS ----------------------------------------------------------------------------------------***/
/******---------------------------------------------- BEGIN OF INNER METHODS ----------------------------------------------------------------------------------------***/
// BEGIN General Methods

// END General Methods
/******---------------------------------------------- END OF INNER METHODS ------------------------------------------------------------------------------------------***/

module.exports.createMeeting = createMeeting;
module.exports.updateMeeting = updateMeeting;
module.exports.addMeetingMembers = addMeetingMembers;
module.exports.deleteMeeting = deleteMeeting;
module.exports.deleteAllMembersOfMeeting = deleteAllMembersOfMeeting;
module.exports.deleteMembersOfMeeting = deleteMembersOfMeeting;
module.exports.findOneMeeting = findOneMeeting;
module.exports.findAllMeeting = findAllMeeting;
module.exports.findMeetingMemberCount = findMeetingMemberCount;
module.exports.findAllMeetingMembers = findAllMeetingMembers;
module.exports.findAllMeetingByStatus = findAllMeetingByStatus;