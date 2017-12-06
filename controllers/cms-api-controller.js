#!/bin/env node
"esversion:6";
"strict mode";

const errors = require('restify-errors');
const baseController = require('./base-controller');
const httpHelper = require('../helpers/http-helper');
const cmsTypes = require('../cms-types');
const jsonHelper = require('../helpers/json-helper');
const config = require('../web-config');
const utility = require('../helpers/utility');

let samp = "fg";
const logsController = require('./logs-controller');

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
                .then((values)=>baseController.sendResponseData(cmsTypes.results.OK, {'total':response.coSpaces.attrkey.total, 'coSpaces':values} , res))
                .catch((err)=>(err.context != null && err.context.errorType == cmsTypes.results.CUSTOM_ERROR)?(baseController.sendCustomError(err, res)):(baseController.sendUnhandledError(err, res)));
            }
            else{
                httpHelper.getRequest(cmsTypes.CmsApis.COSPACES + "/" +  response.coSpaces.coSpace.attrkey.id)
                .then((values)=>baseController.sendResponseData(cmsTypes.results.OK, {'total':response.coSpaces.attrkey.total, 'coSpaces':[values]} , res))
                .catch((err)=>(err.context != null && err.context.errorType == cmsTypes.results.CUSTOM_ERROR)?(baseController.sendCustomError(err, res)):(baseController.sendUnhandledError(err, res)));
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
    return res;
};

module.exports.getCospacesUserByIdAndDetails = (req, res, next)=>{
    var finalReq = cmsTypes.CmsApis.COSPACES+"/"+req.query.cospaceid+"/"+cmsTypes.CmsApis.COSPACEUSERS + "?limit="+req.query.limit+"&offset="+req.query.offset;
    finalReq = getRequestQuery(req, finalReq);
    httpHelper.getRequest(finalReq)
    .then((response)=>{
        if(response.userCoSpaces.attrkey.total == 1)
            response.userCoSpaces.userCoSpace = [userCoSpaces.userCoSpace];

        let promiseRef = [];
        response.coSpaceUsers.coSpaceUsers.forEach((coSpace)=>promiseRef.push(httpHelper.getRequest(cmsTypes.CmsApis.COSPACES + "/" + coSpace.attrkey.id)));
        Promise.all(promiseRef)
        .then((coSpaces)=>{
            console.log(coSpaces);
        })
    })
    .catch((err)=>(err.context != null && err.context.errorType == cmsTypes.results.CUSTOM_ERROR)?(baseController.sendCustomError(err, res)):(baseController.sendUnhandledError(err, res)));
};

module.exports.createCospace = (req, res, next)=>{
    let cospace = req.body;
    let cospaceId;
    jsonHelper.getcoSpaceObject(cospace)
    .then((data)=>httpHelper.postRequestWithHeaders(cmsTypes.CmsApis.COSPACES, data))
    .then((res)=>{
        cospaceId = res.response.headers.location.substr(res.response.headers.location.lastIndexOf('/') + 1);
    })
    .then((response)=>baseController.sendResponseData(cmsTypes.results.OK, response, res))
    .then((desc,type,id)=>logsController.sendLogData(cmsTypes.logMessages['3'],cmsTypes.logType.CREATE_COSPACE,cospaceId))
    .catch((err)=>(err.context != null && err.context.errorType == cmsTypes.results.CUSTOM_ERROR)?(baseController.sendCustomError(err, res)):(baseController.sendUnhandledError(err, res)));
};

module.exports.getCoSpacesUsers = (req, res, next)=>{
    var finalReq = cmsTypes.CmsApis.COSPACES+"/"+req.query.cospaceid+"/"+cmsTypes.CmsApis.COSPACEUSERS + "?limit="+req.query.limit+"&offset="+req.query.offset;
    finalReq = getRequestQuery(req, finalReq);
    httpHelper.getRequest(finalReq)
    .then((response)=>{
        if(response.coSpaceUsers.attrkey.total == 1)
            response.coSpaceUsers.coSpaceUser = [response.coSpaceUsers.coSpaceUser];
        baseController.sendResponseData(cmsTypes.results.OK, response, res)})
    .catch((err)=>(err.context != null && err.context.errorType == cmsTypes.results.CUSTOM_ERROR)?(baseController.sendCustomError(err, res)):(baseController.sendUnhandledError(err, res)));

};

module.exports.getCoSpacesUsersById = (req, res, next)=>{
    httpHelper.getRequest(cmsTypes.CmsApis.USERS+"/"+req.query.userid+"/"+cmsTypes.CmsApis.USERCOSPACES)
    .then((response)=>baseController.sendResponseData(cmsTypes.results.OK, response, res))
    .catch((err)=>(err.context != null && err.context.errorType == cmsTypes.results.CUSTOM_ERROR)?(baseController.sendCustomError(err, res)):(baseController.sendUnhandledError(err, res)));
};

module.exports.updateCospace = (req, res, next)=>{
    let cospace = req.body;
    jsonHelper.getcoSpaceObject(cospace)
    .then((data)=>httpHelper.putRequest(cmsTypes.CmsApis.COSPACES+"/"+cospace.coSpaceId , data))
    .then((response)=>baseController.sendResponseData(cmsTypes.results.OK, response, res))
    .then((desc,type,id)=>logsController.sendLogData(cmsTypes.logMessages['4'],cmsTypes.logType.UPDATE_COSPACE,cospace.coSpaceId))
    .catch((err)=>(err.context != null && err.context.errorType == cmsTypes.results.CUSTOM_ERROR)?(baseController.sendCustomError(err, res)):(baseController.sendUnhandledError(err, res)));
};

module.exports.deleteCospaceUser = (req, res, next)=>{
    let cospaceId = req.query.cospaceId;
    let cospaceUserId = req.query.cospaceMemberId;

    httpHelper.deleteRequest(cmsTypes.CmsApis.COSPACES+"/"+cospaceId+"/"+cmsTypes.CmsApis.COSPACEUSERS+"/"+cospaceUserId)
    .then((response)=>baseController.sendResponseData(cmsTypes.results.OK, response, res))
    .then((desc,type,id)=>logsController.sendLogData(cmsTypes.logMessages['6'],cmsTypes.logType.DELETE_USER))
    .catch((err)=>(err.context != null && err.context.errorType == cmsTypes.results.CUSTOM_ERROR)?(baseController.sendCustomError(err, res)):(baseController.sendUnhandledError(err, res)));
};

module.exports.addUserInCospace = (req, res, next)=>{
    let cospace = req.body;
    
    httpHelper.postRequest(cmsTypes.CmsApis.COSPACES+"/"+cospace.cospaceId+"/"+cmsTypes.CmsApis.COSPACEUSERS,"userId="+cospace.userId+"&userJid="+cospace.userJid+"&autoGenerated="+cospace.autoGenerated)
    .then((response)=>baseController.sendResponseData(cmsTypes.results.OK, response, res))
    .then((desc,type,id)=>logsController.sendLogData(cmsTypes.logMessages['5'],cmsTypes.logType.ADD_USER_IN_COSPACE,cospace.cospaceId))
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
        .then((values)=>baseController.sendResponseData(cmsTypes.results.OK, {'total':response.users.attrkey.total, 'users':values} , res))
        .catch((err)=>(err.context != null && err.context.errorType == cmsTypes.results.CUSTOM_ERROR)?(baseController.sendCustomError(err, res)):(baseController.sendUnhandledError(err, res)));
    }
    else{
        httpHelper.getRequest(cmsTypes.CmsApis.USERS + "/" +  response.users.user.attrkey.id)
        .then((values)=>baseController.sendResponseData(cmsTypes.results.OK, {'total':response.users.attrkey.total, 'users':[values]} , res))
        .catch((err)=>(err.context != null && err.context.errorType == cmsTypes.results.CUSTOM_ERROR)?(baseController.sendCustomError(err, res)):(baseController.sendUnhandledError(err, res)));
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

module.exports.checkCoSpaceExistence = (req, res, next)=>{
    var finalReq = cmsTypes.CmsApis.COSPACES;    
    if(typeof req.query.filter != 'undefined' && req.query.filter != null)
    finalReq +='?filter='+ req.query.filter;
    httpHelper.getRequest(finalReq)
    .then((response)=>baseController.sendResponseData(cmsTypes.results.OK,response, res))
    // .then((response)=>baseController.sendResponseData(cmsTypes.results.OK,response.coSpaces.attrkey.total, res))  //gives total no of uris
    .catch((err)=>(err.context != null && err.context.errorType == cmsTypes.results.CUSTOM_ERROR)?(baseController.sendCustomError(err, res)):(baseController.sendUnhandledError(err, res)));
    return res;
};

module.exports.addCospaceMember = (req, res, next)=>{
    var finalReq = cmsTypes.CmsApis.COSPACES;
    var meetingMember = req.body; 
    finalReq +='/'+ meetingMember.coSpaceId+'/'+cmsTypes.CmsApis.COSPACEUSERS;
    httpHelper.postRequest(finalReq,  jsonHelper.getMeetingMemberString(meetingMember))
    .then((response)=>baseController.sendResponseData(cmsTypes.results.OK,response, res))
    .then((desc,type,id)=>logsController.sendLogData(cmsTypes.logMessages['5'],cmsTypes.logType.ADD_USER_IN_COSPACE,meetingMember.coSpaceId))
    .catch((err)=>(err.context != null && err.context.errorType == cmsTypes.results.CUSTOM_ERROR)?(baseController.sendCustomError(err, res)):(baseController.sendUnhandledError(err, res)));
    return res;
};

module.exports.getCalls = (req, res, next)=>{
    var finalReq = cmsTypes.CmsApis.CALLS;
    if(typeof req.query.callId != 'undefined' || req.query.callId != null)
       finalReq = finalReq+"/"+req.query.callId;
    httpHelper.getRequest(finalReq)
    .then((response)=>baseController.sendResponseData(cmsTypes.results.OK,response, res))
    .catch((err)=>(err.context != null && err.context.errorType == cmsTypes.results.CUSTOM_ERROR)?(baseController.sendCustomError(err, res)):(baseController.sendUnhandledError(err, res)));
};

module.exports.getActiveCall = (req, res, next)=>{
    var finalReq = cmsTypes.CmsApis.CALL_LEGS;
    if(typeof req.query.callId != 'undefined' || req.query.callId != null)
       finalReq = finalReq+"/"+req.query.callId;
    httpHelper.getRequest(finalReq)
    .then((response)=>baseController.sendResponseData(cmsTypes.results.OK,response, res))
    .catch((err)=>(err.context != null && err.context.errorType == cmsTypes.results.CUSTOM_ERROR)?(baseController.sendCustomError(err, res)):(baseController.sendUnhandledError(err, res)));
};


module.exports.deleteActiveCall = (req, res, next)=>{
    var callId =  req.body.callId;
    var finalReq = cmsTypes.CmsApis.CALL_LEGS + '/' + callId;
    console.log(finalReq);
    httpHelper.deleteRequest(finalReq)
    .then((response)=>baseController.sendResponseData(cmsTypes.results.OK,response, res))
    .catch((err)=>(err.context != null && err.context.errorType == cmsTypes.results.CUSTOM_ERROR)?(baseController.sendCustomError(err, res)):(baseController.sendUnhandledError(err, res)));
  
};

module.exports.authenticateCmsUser = (req, res, next) =>{
    utility.authCmsUser(req.query, (err, result)=>{
        if(err)
            (err.context != null && err.context.errorType == cmsTypes.results.CUSTOM_ERROR)?(baseController.sendCustomError(err, res)):(baseController.sendUnhandledError(err, res));
        else
            baseController.sendResponseData(cmsTypes.results.OK, result, res)
    });
};