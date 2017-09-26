#!/bin/env node
"esversion:6";
"strict mode";

const sequelize = require('sequelize');
const cmsModel =  require('./cms-models');


const meeting = {
    meetingID : {type: sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
    coSpaceId : {type: sequelize.STRING, allowNull: false},
    isInitiated : {type: sequelize.BOOLEAN, allowNull: false},
    passcode : {type: sequelize.STRING, allowNull: false},
    meetingType : {type: sequelize.INTEGER, allowNull: false},
    meetingStartDateTime : {type: sequelize.DATE, allowNull: false},
    meetingEndDateTime : {type: sequelize.DATE, allowNull: false},
    isMeetingCreated : {type: sequelize.BOOLEAN, allowNull: false, defaultValue: false},
    isArchived : {type: sequelize.BOOLEAN, allowNull:false, defaultValue: false},
    archivedDate: {type: sequelize.DATE, allowNull: true},
    meetingActualStartDateTime : {type: sequelize.DATE, allowNull:true},
    meetingActualEndDateTime : {type: sequelize.DATE, allowNull:true}
}

const meetingMember = {
    meetingMemberID : {type: sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
    meetingStartDateTime : {type: sequelize.DATE, allowNull: true},
    meetingActualEndDateTime: {type: sequelize.DATE, allowNull: true},
    isOwner : {type: sequelize.BOOLEAN, allowNull: false},
    isMailed : {type: sequelize.BOOLEAN, allowNull: false},
    isAttended : {type: sequelize.BOOLEAN, allowNull: false, defaultValue: false},
    coSpaceUserID : {type: sequelize.STRING, allowNull: false},
    meetingID : {type: sequelize.INTEGER, allowNull: false, references:{model: cmsModel.meeting, key: 'meetingID'}}
}

module.exports.meeting = meeting;
module.exports.meetingMember = meetingMember;