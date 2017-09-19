#!/bin/env node
"esversion:6";
"strict mode";

const errors = require('restify-errors');
const baseController = require('./base-controller');
const httpHelper = require('../helpers/http-helper');

module.exports.getCospaces = (req, res, next)=>{
    httpHelper.getRequest("coSpaces")
    .then((response)=>baseController.sendResponseData("OK", response, res))
    .catch((err)=>new Promise.reject(new Error(err)));
};

module.exports.createCospace = (req, res, next)=>{
    let cospace = req.body;
    
     httpHelper.postRequest("coSpaces","name="+cospace.name+"&uri="+cospace.uri+"&passcode="+cospace.passcode+"&defaultLayout="+cospace.defaultLayout+"&requireCallId=true")
    //httpHelper.postRequest("coSpaces","name=Samplede12&uri=sample.21er333.7&passcode=1234&defaultLayout=allEqual&cdrTag=a123")
    .then((response)=>baseController.sendResponseData("OK", response, res))
    .catch((err)=>new Promise.reject(new Error(err)));
    console.log(res);
};

module.exports.getCoSpacesUsers = (req, res, next)=>{
    var coSpaceId = req.params.id;
    console.log("querystring "+ coSpaceId);
    httpHelper.getRequest("coSpaces/"+coSpaceId+"/coSpaceUsers")
    .then((response)=>baseController.sendResponseData("OK", response, res))
    .catch((err)=>new Promise.reject(new Error(err)));
};

module.exports.getCoSpacesUsersById = (req, res, next)=>{
    var userId = req.params.id;
    console.log("querystring "+ userId);
    httpHelper.getRequest("users/"+userId+"/userCoSpaces")
    .then((response)=>baseController.sendResponseData("OK", response, res))
    .catch((err)=>new Promise.reject(new Error(err)));
};


module.exports.updateCospace = (req, res, next)=>{
    // let cospaceId = req.params;
    let cospace = req.body;
    console.log(cospace);
    
    httpHelper.putRequest("coSpaces/"+cospace.coSpaceId , "name="+cospace.name+"&uri="+cospace.uri+"&passcode="+cospace.passcode+"&defaultLayout="+cospace.defaultLayout+"&requireCallId=true")
    .then((response)=>baseController.sendResponseData("OK", response, res))
    .catch((err)=>new Promise.reject(new Error(err)));
};

