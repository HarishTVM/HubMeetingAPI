#!/bin/env node
"esversion:6";
"strict mode";

const errors = require('restify-errors');
const baseController = require('./base-controller');
const httpHelper = require('../helpers/http-helper');
const cmsTypes = require('../cms-types');


module.exports.getCospaces = (req, res, next)=>{
    let limit = req.query.limit;
    let offset = req.query.offset;
    if(req.query.coSpaceid != undefined || req.query.coSpaceid != null)
       { var coSpaceid ='/'+ req.query.coSpaceid;}
    else
       { var coSpaceid='';}
    if(req.query.filter != undefined || req.query.filter != null)
        {let filter = req.query.filter;}
    else
        {var filter='';}
    if(req.query.tenantFilter != undefined || req.query.tenantFilter != null)
        {var tenantFilter = req.query.tenantFilter;}
    else
        {var tenantFilter='';}
    if(req.query.callLegProfileFilter != undefined || req.query.callLegProfileFilter != null)
       {var callLegProfileFilter = req.query.callLegProfileFilter;}
    else
        { var callLegProfileFilter='';}

        httpHelper.getRequest(cmsTypes.CmsApis.COSPACES+coSpaceid+"?limit="+limit+"&offset="+offset+"&filter="+filter+"&tenantFilter="+tenantFilter+"&callLegProfileFilter="+callLegProfileFilter)
        .then((response)=>baseController.sendResponseData(cmsTypes.results.OK, response, res))
        .catch((err)=>(err.context != null && err.context.errorType == cmsTypes.results.CUSTOM_ERROR)?(baseController.sendCustomError(err, res)):(baseController.sendUnhandledError(err, res)));
    
};

module.exports.createCospace = (req, res, next)=>{
    let cospace = req.body;
    console.log(cospace);
    httpHelper.postRequest(cmsTypes.CmsApis.COSPACES,"name="+cospace.name+"&uri="+cospace.uri+"&passcode="+cospace.passcode+"&defaultLayout="+cospace.defaultLayout+"&cdrTag="+cospace.cdrTag)
    .then((response)=>baseController.sendResponseData(cmsTypes.results.OK, response, res))
    .catch((err)=>(err.context != null && err.context.errorType == cmsTypes.results.CUSTOM_ERROR)?(baseController.sendCustomError(err, res)):(baseController.sendUnhandledError(err, res)));
};

module.exports.getCoSpacesUsers = (req, res, next)=>{
    let limit = req.query.limit;
    let offset = req.query.offset;
    let filter = req.query.filter;
    if(filter == undefined || filter == null){
        httpHelper.getRequest(cmsTypes.CmsApis.COSPACES+"/"+req.query.cospaceid+"/"+cmsTypes.CmsApis.COSPACEUSERS+"?limit="+limit+"&offset="+offset)
        .then((response)=>baseController.sendResponseData(cmsTypes.results.OK, response, res))
        .catch((err)=>(err.context != null && err.context.errorType == cmsTypes.results.CUSTOM_ERROR)?(baseController.sendCustomError(err, res)):(baseController.sendUnhandledError(err, res)));
    }
    else
    {
        httpHelper.getRequest(cmsTypes.CmsApis.COSPACES+"/"+req.query.cospaceid+"/"+cmsTypes.CmsApis.COSPACEUSERS+"?limit="+limit+"&offset="+offset+"&filter="+filter)
        .then((response)=>baseController.sendResponseData(cmsTypes.results.OK, response, res))
        .catch((err)=>(err.context != null && err.context.errorType == cmsTypes.results.CUSTOM_ERROR)?(baseController.sendCustomError(err, res)):(baseController.sendUnhandledError(err, res)));
    } 
};

module.exports.getCoSpacesUsersById = (req, res, next)=>{
    httpHelper.getRequest(cmsTypes.CmsApis.USERS+"/"+req.query.userid+"/"+cmsTypes.CmsApis.USERCOSPACES)
    .then((response)=>baseController.sendResponseData(cmsTypes.results.OK, response, res))
    .catch((err)=>(err.context != null && err.context.errorType == cmsTypes.results.CUSTOM_ERROR)?(baseController.sendCustomError(err, res)):(baseController.sendUnhandledError(err, res)));
};

module.exports.updateCospace = (req, res, next)=>{
    let cospace = req.body;
    httpHelper.putRequest(cmsTypes.CmsApis.COSPACES+"/"+cospace.coSpaceId , "name="+cospace.name+"&uri="+cospace.uri+"&passcode="+cospace.passcode+"&defaultLayout="+cospace.defaultLayout+"&cdrTag="+cospace.cdrTag)
    .then((response)=>baseController.sendResponseData(cmsTypes.results.OK, response, res))
    .catch((err)=>(err.context != null && err.context.errorType == cmsTypes.results.CUSTOM_ERROR)?(baseController.sendCustomError(err, res)):(baseController.sendUnhandledError(err, res)));
};

module.exports.deleteCospaceUser = (req, res, next)=>{
    let cospaceId = req.query.cospaceId;
    let cospaceUserId = req.query.cospaceMemberId;

    httpHelper.deleteRequest(cmsTypes.CmsApis.COSPACES+"/"+cospaceId+"/"+cmsTypes.CmsApis.COSPACEUSERS+"/"+cospaceUserId)
    .then((response)=>baseController.sendResponseData(cmsTypes.results.OK, response, res))
    .catch((err)=>(err.context != null && err.context.errorType == cmsTypes.results.CUSTOM_ERROR)?(baseController.sendCustomError(err, res)):(baseController.sendUnhandledError(err, res)));
};

module.exports.addUserInCospace = (req, res, next)=>{
    let cospace = req.body;
    
    httpHelper.postRequest(cmsTypes.CmsApis.COSPACES+"/"+cospace.cospaceId+"/"+cmsTypes.CmsApis.COSPACEUSERS,"userId="+cospace.userId+"&userJid="+cospace.userJid+"&autoGenerated="+cospace.autoGenerated)
    .then((response)=>baseController.sendResponseData(cmsTypes.results.OK, response, res))
    .catch((err)=>(err.context != null && err.context.errorType == cmsTypes.results.CUSTOM_ERROR)?(baseController.sendCustomError(err, res)):(baseController.sendUnhandledError(err, res)));
};