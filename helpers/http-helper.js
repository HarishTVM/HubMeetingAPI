#!/bin/env node
"esversion:6";
"strict mode";

const errors = require('restify-errors');
const xml2js = require('xml2js');
const request = require('request');
const cmsTypes = require('../cms-types');
const config = require('../web-config');

var parseString = new xml2js.Parser({attrkey:"attrkey", explicitArray:false}).parseString;

getAuth = ()=>{
    if(config.cmsAuth.apiUser != null)
        return config.cmsAuth.base64Encode = 'Basic ' + new Buffer(config.cmsAuth.apiUser + ':' + config.cmsAuth.apiPassword).toString('base64'); 
    else
        return null;
}

module.exports.getRequest = (url)=>{
    let options = { 
        method: 'GET',
        uri: config.cmsAuth.apiUrl + url,
        timeout: 10000,
        headers:{'Authorization': getAuth() ,'content-type': 'text/plain'},
    };

    return new Promise((resolve, reject)=> resolve())
    .then(()=>getResponse(options))
};

module.exports.postRequestWithHeaders = (url, parameter)=>{
    console.log(parameter);
    let options = { 
        method: 'POST',
        uri: config.cmsAuth.apiUrl + url,
        timeout: 10000,
        headers: {'Authorization': getAuth(),'content-type': 'text/plain'},
        body: parameter.toString()
    };
    return new Promise((resolve, reject)=> resolve())
    .then(()=>getHeaderResponse(options))
};

module.exports.postRequest = (url, parameter)=>{
    console.log(parameter);
    let options = { 
        method: 'POST',
        uri: config.cmsAuth.apiUrl + url,
        timeout: 10000,
        headers: {'Authorization': getAuth(),'content-type': 'text/plain'},
        body: parameter.toString()
       // multipart:[{body: parameter}]
    };
    return new Promise((resolve, reject)=> resolve())
    .then(()=>getResponse(options))
};

module.exports.putRequest = (url, parameter)=>{
    let options = { 
        method: 'PUT',
        uri: config.cmsAuth.apiUrl + url,
        timeout: 10000,
        headers: {'Authorization': getAuth(),'content-type': 'text/plain'}
    };

    if(typeof parameter != 'undefined' && parameter != null)
        options.body = parameter;
       // options.multipart = [{body: parameter}]

    return new Promise((resolve, reject)=> resolve())
    .then(()=>getResponse(options))
};

module.exports.deleteRequest = (url, parameter)=>{
    let options = { 
        method: 'DELETE',
        uri:  config.cmsAuth.apiUrl + url,
        timeout: 10000,
        headers: {'Authorization': getAuth(),'content-type': 'text/plain'}
    };

    if(typeof parameter != 'undefined' && parameter != null)
        options.multipart = [{body: parameter}]

    return new Promise((resolve, reject)=> resolve())
    .then(()=>getResponse(options))
};

var getResponse = (options)=>{
    return new Promise((resolve, reject)=>{
        request(options, (error, response, body) => {
            if(error)reject(new Error(error));
            else{
                console.log(response.headers);
                if(response.statusCode >= 200 && response.statusCode < 400){
                    if(typeof body != 'undefined' && body != null){
                        parseString(body, (err, jsonData)=>{
                            if(err)reject(new Error(err));
                            resolve(jsonData, response);
                        });
                    }
                    else
                        resolve(body);               
                } 
                else {
                    if(response.statusCode == 401)
                        reject(new errors.UnauthorizedError({message: "Unauthorized to access API", context: {errorType:cmsTypes.results.CUSTOM_ERROR, customErrCode: cmsTypes.status.USERNAME_OR_PASSWORD_INCORRECT}}));
                    if(response.statusCode == 400)
                        reject(new errors.BadRequestError({message: body.toString(), context: {errorType:cmsTypes.results.CUSTOM_ERROR, customErrCode: cmsTypes.status.BAD_REQUEST}}));
                    parseString(body, (err, jsonData)=>{
                        if(err)reject(new Error(err))
                        reject(new Error(jsonData));
                    });
                }  
            }    
        });
    });   
};

var getHeaderResponse = (options)=>{
    return new Promise((resolve, reject)=>{
        request(options, (error, response, body) => {
            if(error)reject(new Error(error));
            else{
                if(response.statusCode >= 200 && response.statusCode < 400)
                        resolve({"response":response, "data":body});              
                else {
                    if(response.statusCode == 401)
                        reject(new errors.UnauthorizedError({message: "Unauthorized to access API", context: {errorType:cmsTypes.results.CUSTOM_ERROR, customErrCode: cmsTypes.status.USERNAME_OR_PASSWORD_INCORRECT}}));
                    if(response.statusCode == 400)
                        reject(new errors.BadRequestError({message: body.toString(), context: {errorType:cmsTypes.results.CUSTOM_ERROR, customErrCode: cmsTypes.status.BAD_REQUEST}}));
                    parseString(body, (err, jsonData)=>{
                        if(err)reject(new Error(err))
                        reject(new Error(jsonData));
                    });
                }  
            }    
        });
    });   
};
