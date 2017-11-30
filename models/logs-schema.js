#!/bin/env node
"esversion:6";
"strict mode";

const sequelize = require('sequelize');

const logs = {
    logID : {type: sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
    logType : {type: sequelize.INTEGER, allowNull: false},
    logTitle : {type: sequelize.STRING, allowNull: false},
    logDescription : {type: sequelize.STRING, allowNull: false},
    coSpaceId : {type: sequelize.STRING, allowNull: true},
    meetingId : {type: sequelize.STRING, allowNull: true}
}

module.exports.logs = logs;