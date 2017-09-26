#!/bin/env node
"esversion:6";
"strict mode";

const sequelize = require('sequelize');

const userLevelObj = {
    userLevelID : { type: sequelize.INTEGER, primaryKey:true, autoIncrement: true, allowNull:false },
    userLevel : { type: sequelize.STRING, allowNull: false }
}

module.exports.userLevelObj = userLevelObj;