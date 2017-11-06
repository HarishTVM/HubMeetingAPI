#!/bin/env node
"esversion:6";
"strict mode";

const sequelize = require('sequelize');
const dbConnection = require('../helpers/db-helper').dbConnection;

const apiConfiguration = dbConnection.define("MHApiConfiguration", require("./startup-config-schema").apiConfiguration);
const smtpConfiguration = dbConnection.define("MHApiConfiguration", require("./startup-config-schema").smtpConfiguration);
const userLevel = dbConnection.define("MHUserLevel", require("./user-level-schema").userLevelObj);
const userLogin = dbConnection.define("MHUserLogin", require("./user-login-schema").userLogin);
const userDetails = dbConnection.define("MHUserDetails", require("./user-login-schema").userDetails);
const meeting = dbConnection.define("MHMeeting", require("./meeting-schema").meeting);
const meetingMember = dbConnection.define("MHMeetingMember", require("./meeting-schema").meetingMember);
const log = dbConnection.define("MHLog", require("./logs-schema").logs);

meeting.hasMany(meetingMember, {foreignKey: 'meetingID'});
meetingMember.hasOne(meeting, {foreignKey:'meetingID'});

meeting.belongsToMany(meetingMember, {through: meetingMember, foreignKey:'meetingID'});

module.exports.apiConfiguration = apiConfiguration;
module.exports.smtpConfiguration = smtpConfiguration;
module.exports.userLevel = userLevel;
module.exports.userLogin = userLogin;
module.exports.userDetails = userDetails;
module.exports.meeting = meeting;
module.exports.meetingMember = meetingMember;
module.exports.log = log;