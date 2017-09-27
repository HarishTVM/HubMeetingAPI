#!/bin/env node
"esversion:6";
"strict mode";

const crypto = require('crypto');
const hashString = require('../web-config').app.hashString;

// Encrypt the password
exports.hashString = function(password){
    var cipher = crypto.createCipher(hashString.cryptoAlgorithm, hashString.cryptoPassword);
    var crypted = cipher.update(password,'utf8','hex');
    crypted += cipher.final('hex');
    return(crypted.toString());
  };