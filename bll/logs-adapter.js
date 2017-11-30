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

const Log = model.log;

/******---------------------------------------------- BEGIN OF ADAPTER METHODS --------------------------------------------------------------------------------------***/

creatLog = (logtype,desc,meetingid,cospaceid) =>{

    return new Promise((resolve, reject) => resolve())
    .then(()=>
        Log.build({
            logType:logtype,
            logTitle: desc,
            logDescription: desc,
            meetingId:meetingid,
            coSpaceId:cospaceid 
        })
        .save({raw: true}))
};

findAllLogs = (data)=>{
    var query = {
        limit: parseInt(data.limit),
        offset: parseInt(data.offset),
        order:[['createdAt', 'DESC']],
        raw:true
    }

    if(typeof data.filter != 'undefined' && data.filter != null){
        query.where = {$or: [
                                { logTitle: { $like: data.filter + '%' } }
                        ],
                    };
    }
  

    return new Promise((resolve, reject) => resolve())
    .then(()=>Log.findAndCount(query))
                            
}






/******---------------------------------------------- END OF ADAPTER METHODS ----------------------------------------------------------------------------------------***/
/******---------------------------------------------- BEGIN OF INNER METHODS ----------------------------------------------------------------------------------------***/
// BEGIN General Methods

// END General Methods
/******---------------------------------------------- END OF INNER METHODS ------------------------------------------------------------------------------------------***/

module.exports.creatLog = creatLog;
module.exports.findAllLogs = findAllLogs;
