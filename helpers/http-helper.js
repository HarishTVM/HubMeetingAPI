#!/bin/env node
"esversion:6";
"strict mode";

const errors = require('restify-errors');
const xml2js = require('xml2js');
const request = require('request');
const cmsTypes = require('../cms-types');

var parseString = new xml2js.Parser({attrkey:"attrkey", explicitArray:false}).parseString;

module.exports.getRequest = (url,authorization)=>{
    let options = { 
        method: 'GET',
        uri: url+cmsTypes.test.GET_COSPACES,
        headers: {'Authorization': authorization,'content-type': 'text/plain'}
    };

    return new Promise((resolve, reject)=> resolve())
    .then(()=>getResponse(options))

};

module.exports.postRequest = (url, parameter)=>{
    let options = { 
        method: 'POST',
        uri: 'https://192.168.5.27:445/api/v1/'+url,
        headers: {'Authorization': 'Basic YXBpdXNlcjphcGlwYXNzd29yZA==','content-type': 'text/plain'},
        multipart:[{body: parameter}]
    };
    
    return new Promise((resolve, reject)=> resolve())
    .then(()=>getResponse(options))
};

module.exports.putRequest = (url, parameter)=>{
    let options = { 
        method: 'PUT',
        uri: 'https://192.168.5.27:445/api/v1/'+url,
        headers: {'Authorization': 'Basic YXBpdXNlcjphcGlwYXNzd29yZA==','content-type': 'text/plain'}
    };

    if(typeof parameter != 'undefined' && parameter != null)
        options.multipart = [{body: parameter}]

    return new Promise((resolve, reject)=> resolve())
    .then(()=>getResponse(options))
};

module.exports.deleteRequest = (url, parameter)=>{
    let options = { 
        method: 'DELETE',
        uri: 'https://192.168.5.27:445/api/v1/'+url,
        headers: {'Authorization': 'Basic YXBpdXNlcjphcGlwYXNzd29yZA==','content-type': 'text/plain'}
    };

    if(typeof parameter != 'undefined' && parameter != null)
        options.multipart = [{body: parameter}]

    return new Promise((resolve, reject)=> resolve())
    .then(()=>getResponse(options))
};

var getResponse = (options)=>{
    return new Promise((resolve, reject)=>{
        request(options, (error, response, body) => {
            if(error) throw error;
            console.log(response.statusCode);
            if(response.statusCode >= 200 && response.statusCode < 400){
                if(typeof body != 'undefined' && body != null){
                    parseString(body, (err, jsonData)=>{
                        if(err) console.log(err);
                        resolve(jsonData);
                    });
                }
                else
                    resolve(body);               
            } 
            else {
                console.log("inside");
                parseString(body, (err, jsonData)=>{
                    if(err) console.log(err);
                    resolve(jsonData);
                });
            }      
        });
    });   
};