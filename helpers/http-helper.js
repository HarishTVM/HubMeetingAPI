#!/bin/env node
"esversion:6";
"strict mode";

const errors = require('restify-errors');
const https = require("https");

module.exports.getRequest = (url)=>{
    let options = {
        host: 'https://192.168.5.27:445/api/v1',
        port: 80,
        path: '/'+url,
        method: 'GET'     
    };
    getResponse(options);
};

module.exports.postRequest = (url, body)=>{
    let options = {
        host: 'https://192.168.5.27:445/api/v1',
        port: 80,
        path: '/'+url,
        method: 'POST'     
    };
    getResponse(options, body);
};

module.exports.putRequest = (url, body)=>{
    let options = {
        host: 'https://192.168.5.27:445/api/v1',
        port: 80,
        path: '/'+url,
        method: 'PUT'     
    };
    getResponse(options, body);
};

module.exports.deleteRequest = (url, body)=>{
    let options = {
        host: 'https://192.168.5.27:445/api/v1',
        port: 80,
        path: '/'+url,
        method: 'DELETE'     
    };
    getResponse(options, body);
};

var getResponse = (options, body)=>{
    return new Promise((resolve, reject) =>{
        var chunks = [];

        var req = https.request(options, (res)=>{
            res.setEncoding('utf8');
            res.on('data',  (chunk)=>{
                chunks.push(chunk);
            });
            res.on('end', ()=>{
                var body = Buffer.concat(chunks);
                console.log(body.toString());
                resolve(body);
            });
        });

        if(typeof body != 'undefined' && body != null)
            req.write(body);

        req.end();
        req.on('error',(err)=>Promise.reject(new errors.InternalServerError(err.message));
    });
};