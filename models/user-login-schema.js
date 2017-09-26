#!/bin/env node
"esversion:6";
"strict mode";

const sequelize = require('sequelize');
const cmsModel =  require('./cms-models');

const userLogin = {
    userID : {type: sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    userName : {type: sequelize.STRING, allowNull:false},
    userPassword : {type: sequelize.STRING, allowNull: false},
    userLevelID : {type: sequelize.INTEGER, allowNull: false, references:{model: cmsModel.userLevel, key: 'userLevelID'}},
    lastLoginDate : {type: sequelize.DATE, allowNull: false, defaultValue: sequelize.NOW},
    changePassword : {type: sequelize.BOOLEAN, allowNull: false, defaultValue: true},
    isFirstTime : {type: sequelize.BOOLEAN, allowNull: false, defaultValue: true},
}

const userDetails = {
    firstName : {type: sequelize.STRING, allowNull: false},
    lastName : {type: sequelize.STRING, allowNull: true},
    timeZone : {type: sequelize.DATE, allowNull: false, defaultValue:sequelize.NOW},
    userID : {type: sequelize.INTEGER, allowNull: false, references:{model: cmsModel.userLogin, key: 'userID'}}
}

module.exports.userLogin = userLogin;
module.exports.userDetails = userDetails;