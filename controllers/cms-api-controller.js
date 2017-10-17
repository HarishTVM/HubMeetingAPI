#!/bin/env node
"esversion:6";
"strict mode";

const errors = require('restify-errors');
const baseController = require('./base-controller');
const httpHelper = require('../helpers/http-helper');
const cmsTypes = require('../cms-types');

module.exports.getCospaces = (req, res, next)=>{
    var finalReq = cmsTypes.CmsApis.COSPACES;

    
    if(req.query.coSpaceid != undefined && req.query.coSpaceid != null)
        finalReq +='/'+ req.query.coSpaceid;
    finalReq += "?limit="+req.query.limit+"&offset="+req.query.offset;

    if(typeof req.query.tenantFilter != 'undefined' && req.query.tenantFilter != null)
        finalReq += "&tenantFilter=" + req.query.tenantFilter;
    finalReq = getRequestQuery(req, finalReq);
       
    httpHelper.getRequest(finalReq)
    .then((response)=>{ 
        if(typeof response.coSpaces.coSpace != 'undefined' && response.coSpaces.coSpace != null){
            if(typeof response.coSpaces.coSpace.length != 'undefined' && response.coSpaces.coSpace.length != null){
                let promiseRef = [];
                response.coSpaces.coSpace.forEach((coSpace)=>promiseRef.push(httpHelper.getRequest(cmsTypes.CmsApis.COSPACES + "/" + coSpace.attrkey.id)));
                Promise.all(promiseRef)
                .then((values)=>baseController.sendResponseData(cmsTypes.results.OK, {'total':response.coSpaces.attrkey.total, 'coSpaces':values} , res));
            }
            else{
                httpHelper.getRequest(cmsTypes.CmsApis.COSPACES + "/" +  response.coSpaces.coSpace.attrkey.id)
                .then((values)=>baseController.sendResponseData(cmsTypes.results.OK, {'total':response.coSpaces.attrkey.total, 'coSpaces':[values]} , res));
            }
        }
        else
        return baseController.sendResponseData(cmsTypes.results.OK, {'total': 0, 'coSpaces':[]} , res);
    })
    .catch((err)=>(err.context != null && err.context.errorType == cmsTypes.results.CUSTOM_ERROR)?(baseController.sendCustomError(err, res)):(baseController.sendUnhandledError(err, res)));
};

module.exports.getCospacesbyId = (req, res, next)=>{
    var finalReq = cmsTypes.CmsApis.COSPACES;
    
    if(req.query.coSpaceid != undefined && req.query.coSpaceid != null)
    finalReq +='/'+ req.query.coSpaceid;
    finalReq += "?limit="+req.query.limit+"&offset="+req.query.offset;
  
    httpHelper.getRequest(finalReq)
    .then((response)=>baseController.sendResponseData(cmsTypes.results.OK, response, res))
    .catch((err)=>(err.context != null && err.context.errorType == cmsTypes.results.CUSTOM_ERROR)?(baseController.sendCustomError(err, res)):(baseController.sendUnhandledError(err, res)));

};

module.exports.createCospace = (req, res, next)=>{
    let cospace = req.body;
    httpHelper.postRequest(cmsTypes.CmsApis.COSPACES,"name="+cospace.name+"&uri="+cospace.uri+"&passcode="+cospace.passcode+"&defaultLayout="+cospace.defaultLayout+"&cdrTag="+cospace.cdrTag)
    .then((response)=>baseController.sendResponseData(cmsTypes.results.OK, response, res))
    .catch((err)=>(err.context != null && err.context.errorType == cmsTypes.results.CUSTOM_ERROR)?(baseController.sendCustomError(err, res)):(baseController.sendUnhandledError(err, res)));
};

module.exports.getCoSpacesUsers = (req, res, next)=>{

    var finalReq = cmsTypes.CmsApis.COSPACES+"/"+req.query.cospaceid+"/"+cmsTypes.CmsApis.COSPACEUSERS + "?limit="+req.query.limit+"&offset="+req.query.offset;
    finalReq = getRequestQuery(req, finalReq);
    httpHelper.getRequest(finalReq)
    .then((response)=>baseController.sendResponseData(cmsTypes.results.OK, response, res))
    .catch((err)=>(err.context != null && err.context.errorType == cmsTypes.results.CUSTOM_ERROR)?(baseController.sendCustomError(err, res)):(baseController.sendUnhandledError(err, res)));

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


module.exports.getUsers = (req, res, next)=>{
    let finalReq = cmsTypes.CmsApis.USERS;
   
    if(req.query.userid != undefined && req.query.userid != null)
        finalReq +='/'+ req.query.userid;

    finalReq += "?limit="+req.query.limit+"&offset="+req.query.offset;

    if(typeof req.query.tenantFilter != 'undefined' && req.query.tenantFilter != null)
        finalReq += "&tenantFilter=" + req.query.tenantFilter;

    finalReq = getRequestQuery(req, finalReq);

if(typeof req.query.emailFilter != 'undefined' && req.query.emailFilter != null)
    finalReq += "&emailFilter=" + req.query.emailFilter;
finalReq = getRequestQuery(req, finalReq);
   
httpHelper.getRequest(finalReq)
.then((response)=>{ 
if(typeof response.users.user != 'undefined' && response.users.user != null){
    if(typeof response.users.user.length != 'undefined' && response.users.user.length != null){
        let promiseRef = [];
        response.users.user.forEach((user)=>promiseRef.push(httpHelper.getRequest(cmsTypes.CmsApis.USERS + "/" + user.attrkey.id)));
        Promise.all(promiseRef)
        .then((values)=>baseController.sendResponseData(cmsTypes.results.OK, {'total':response.users.attrkey.total, 'users':values} , res));
    }
    else{
        httpHelper.getRequest(cmsTypes.CmsApis.USERS + "/" +  response.users.user.attrkey.id)
        .then((values)=>baseController.sendResponseData(cmsTypes.results.OK, {'total':response.users.attrkey.total, 'users':[values]} , res));
    }  
}
else
    baseController.sendResponseData(cmsTypes.results.OK, {'total': 0, 'users':[]} , res);
})

.catch((err)=>(err.context != null && err.context.errorType == cmsTypes.results.CUSTOM_ERROR)?(baseController.sendCustomError(err, res)):(baseController.sendUnhandledError(err, res)));
};

getRequestQuery = (req, query)=>{
    if(typeof req.query.callLegProfileFilter != 'undefined' || req.query.callLegProfileFilter != null)
        query += "&callLegProfileFilter=" + req.query.callLegProfileFilter
    if(typeof req.query.filter != 'undefined' && req.query.filter != null)
        query += '&filter=' + req.query.filter;
    return query;
}