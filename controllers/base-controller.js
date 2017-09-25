#!/usr/bin/env node
"strict mode";
"esversion:6";

module.exports.sendResponseData = (result, data, res)=>{
    res.send(200, {"code":result, "data":data});
};

module.exports.sendCustomError = (result, data, res)=>{
    res.send(200, {"code":result, "data":data});
};

module.exports.sendUnhandledError = (result, data, res)=>{
    res.send(500, {"code":"UNHANDLED ERROR", "data":data});
};