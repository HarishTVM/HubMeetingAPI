#!/bin/env node
"esversion:6";
"strict mode";

const config = require('../web-config');
const sequelize = require('sequelize');
const events = require('events');
const dbConnection = new sequelize(config.database.url, config.database.options);

const dbConnector = new events.EventEmitter();
let isDbConnected = false;

module.exports.createConnection = () => {
    dbConnection
    .authenticate()
    .then(()=>{   
        isDbConnected = true;     
        dbConnector.emit('connected', dbConnection);
    })
    .catch((err)=>{
        isDbConnected = false;
        dbConnector.emit('errorInConn', err);
    })
};

module.exports.dbConnection = dbConnection;
module.exports.dbConnector = dbConnector;