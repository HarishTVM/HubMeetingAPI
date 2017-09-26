#!/bin/env node
"esversion:6";
"strict mode";

const sequelize = require('sequelize');
const dbConnection = require('../helpers/db-helper').dbConnection;

module.exports.apiConfiguration = dbConnection.define("MHApiConfiguration", require("./startup-config-schema").apiConfiguration);
module.exports.smtpConfiguration = dbConnection.define("MHApiConfiguration", require("./startup-config-schema").smtpConfiguration);
module.exports.userLevel = dbConnection.define("MHUserLevel", require("./user-level-schema").userLevelObj);
module.exports.userLogin = dbConnection.define("MHUserLogin", require("./user-login-schema").userLogin);
module.exports.userDetails = dbConnection.define("MHUserDetails", require("./user-login-schema").userDetails);
module.exports.meeting = dbConnection.define("MHMeeting", require("./meeting-schema").meeting);
module.exports.meetingMember = dbConnection.define("MHMeetingMember", require("./meeting-schema").meetingMember);
module.exports.log = dbConnection.define("MHLog", require("./logs-schema").logs);