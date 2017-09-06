#!/bin/env node
"esversion:6";
"strict mode";

const config = require('../web-config');
const sequelize = require('sequelize');
const events = require('events');
const db = new sequelize(config.database.url, config.database.options);

const dbConnector = new events.EventEmitter();

module.exports.createConnection = () => {
    db
    .authenticate()
    .then(()=>{        
        dbConnector.emit('connected', db);
    })
    .catch((err)=>{
        dbConnector.emit('errorInConn', err);
    })
};

module.exports.db = db;
module.exports.dbConnector = dbConnector;