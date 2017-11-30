#!/bin/env node
"esversion:6";
"strict mode";

const crypto = require('crypto');
const hashString = require('../web-config').app.hashString;
const cmsTypes = require('../cms-types');
const moment = require('moment-timezone');
const config = require('../web-config');
const xmpp = require('simple-xmpp');

// Encrypt the password
exports.hashString = function(password){
    var cipher = crypto.createCipher(hashString.cryptoAlgorithm, hashString.cryptoPassword);
    var crypted = cipher.update(password,'utf8','hex');
    crypted += cipher.final('hex');
    return(crypted.toString());
};

exports.isMeetingHasToScheduleNow = function (meetingStartDate) {
    var now = new Date(moment.tz(new Date().toISOString(), moment.tz.guess()).clone().tz(cmsTypes.dateTimeZone).format());

    diff = meetingStartDate.getTime() - now.getTime();
    min = Math.floor(diff / 60000);

    if (min >= -15 && min <= 15)
        return true;
    else
        return false;
};

exports.authCmsUser = (data, callback)=>{
    xmpp.connect({
        jid		: data.id,
        password: data.password,
        host	: config.cmsAuth.xmppUrl,
        port	: 5222,
        timeout : 1000
    });

    successHandler = (data)=>{
        xmpp.removeListener('online', successHandler);
        xmpp.removeListener('error', errorHandler);
        xmpp.disconnect();
        callback(null, data);
    }

    errorHandler = (err)=>{
        xmpp.removeListener('error', errorHandler);
        xmpp.removeListener('online', successHandler);
        xmpp.disconnect();
        callback(err, null);
    }

    xmpp.on('online', successHandler);
    xmpp.on('error', errorHandler);
}