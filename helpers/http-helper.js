#!/bin/env node
"esversion:6";
"strict mode";

const errors = require('restify-errors');
const xml2js = require('xml2js');
const request = require('request');

var parseString = new xml2js.Parser({attrkey:"attrkey", explicitArray:false}).parseString;

module.exports.getRequest = (url)=>{
    let options = { 
        method: 'GET',
        uri: 'https://192.168.5.27:445/api/v1/'+url,
        headers: {'Authorization': 'Basic YXBpdXNlcjphcGlwYXNzd29yZA==','content-type': 'text/plain'}
    };

    return new Promise((resolve, reject)=> resolve())
    .then(()=>getResponse(options))
};

module.exports.postRequest = (url, parameter)=>{
    let options = { 
        method: 'POST',
        uri: 'https://192.168.5.27:445/api/v1/'+url,
        headers: {'Authorization': 'Basic YXBpdXNlcjphcGlwYXNzd29yZA==', 'content-type': 'text/plain'},
        multipart:[{body: parameter}]
    };
    
    return new Promise((resolve, reject)=> resolve())
    .then(()=>getResponse(options))
};

module.exports.putRequest = (url, parameter)=>{
    let options = { 
        method: 'PUT',
        uri: 'https://192.168.5.27:445/api/v1/'+url,
        headers: {'Authorization': 'Basic YXBpdXNlcjphcGlwYXNzd29yZA==', 'content-type': 'text/plain'},
        multipart:[{body: parameter}]
    };

    return new Promise((resolve, reject)=> resolve())
    .then(()=>getResponse(options))
};

module.exports.deleteRequest = (url, parameter)=>{
    let options = { 
        method: 'DELETE',
        uri: 'https://192.168.5.27:445/api/v1/'+url,
        headers: {'Authorization': 'Basic YXBpdXNlcjphcGlwYXNzd29yZA==','content-type': 'text/plain'},
        multipart:[{body: parameter}]
    };

    return new Promise((resolve, reject)=> resolve())
    .then(()=>getResponse(options))
};

var getResponse = (options)=>{
    return new Promise((resolve, reject)=>{
        request(options, (error, response, body) => {
            if(error) throw error;
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
                parseString(body, (err, jsonData)=>{
                    if(err) console.log(err);
                    resolve(jsonData);
                });
            }      
        });
    });   
};