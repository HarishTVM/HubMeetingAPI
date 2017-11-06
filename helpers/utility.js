#!/bin/env node
"esversion:6";
"strict mode";

const crypto = require('crypto');
const hashString = require('../web-config').app.hashString;
const cmsTypes = require('../cms-types');
const moment = require('moment-timezone');

// Encrypt the password
exports.hashString = function(password){
    var cipher = crypto.createCipher(hashString.cryptoAlgorithm, hashString.cryptoPassword);
    var crypted = cipher.update(password,'utf8','hex');
    crypted += cipher.final('hex');
    return(crypted.toString());
};

exports.isMeetingHasToScheduleNow = function(meetingStartDate){
  var diffDate =  new Date(moment.tz(new Date(), cmsTypes.dateTimeZone));
  diffDate.setMinutes(diffDate.getMinutes() + cmsTypes.meetingCreationTime);
  var scheduledTime = new Date(moment.tz(meetingStartDate, cmsTypes.dateTimeZone));
  var diff = (scheduledTime.getTime() - diffDate.getTime());
  console.log(diff);
  var res = Math.floor(diff / 60000);
  console.log(res);
  if(res > (cmsTypes.meetingCreationTime*-1) && res <= cmsTypes.meetingCreationTime)
    return true;
  else
    return false;
};