#!/bin/env node
"esversion:6";
"strict mode";

const errors = require('restify-errors');
const https = require("https");
const xml2js = require('xml2js');

var parseString = new xml2js.Parser({attrkey:"attrkey", explicitArray:false}).parseString;

module.exports.getRequest = (url)=>{
    let options = {
        method: "GET",
        hostname: "192.168.5.27",
        port: "445",
        path: "/api/v1/"+url,
        headers: {
          authorization: "Basic YXBpdXNlcjphcGlwYXNzd29yZA==",
        }   
    };
    return new Promise((resolve, reject)=> resolve())
    .then(()=>getResponse(options))
};

module.exports.postRequest = (url, body)=>{
    let options = {
        method: "POST",
        hostname: "192.168.5.27",
        port: "445",
        path: "/api/v1/"+url,
        headers: {
          authorization: "Basic YXBpdXNlcjphcGlwYXNzd29yZA==",
        }   
    };
    return new Promise((resolve, reject)=> resolve())
    .then(()=>getResponse(options, body))
};

module.exports.putRequest = (url, body)=>{
    let options = {
        method: "PUT",
        hostname: "192.168.5.27",
        port: "445",
        path: "/api/v1/"+url,
        headers: {
          authorization: "Basic YXBpdXNlcjphcGlwYXNzd29yZA==",
        }   
    };
    return new Promise((resolve, reject)=> resolve())
    .then(()=>getResponse(options, body))
};

module.exports.deleteRequest = (url, body)=>{
    let options = {
        method: "DELETE",
        hostname: "192.168.5.27",
        port: "445",
        path: "/api/v1/"+url,
        headers: {
          authorization: "Basic YXBpdXNlcjphcGlwYXNzd29yZA==",
        }   
    };
    return new Promise((resolve, reject)=> resolve())
    .then(()=>getResponse(options, body))
};

var getResponse = (options, body)=>{
    return new Promise((resolve, reject)=>{
        var xmlData = '';
        var req = https.request(options, (res)=>{
            res.setEncoding('utf8');
            res.on('data',  (chunk)=>{
                xmlData+=chunk;
            });
            res.on('end', ()=>{
                parseString(xmlData, (err, jsonData)=>{
                    if(err) console.log(err);
                    resolve(jsonData);
                });              
            });
        });

        if(typeof body != 'undefined' && body != null)
            req.write(body);

        req.end();
        req.on('error',(err)=>{
            console.log(err);
        });
    });   
};