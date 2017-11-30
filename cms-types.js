#!/bin/env node
"esversion:6";
"strict mode";

module.exports.meetingCreationTime = 15;
module.exports.meetingEndTime = 15;
module.exports.dateTimeZone = "Europe/London";

module.exports.results = {
    OK: "OK",
    KNOWN_ERROR: "KNOWN_ERROR",
    CUSTOM_ERROR: "CUSTOM_ERROR",
    INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR"
};

module.exports.status = {
    SUCCESS: 200,
    BAD_REQUEST: 400,

    /** User Login Related Status **/
    UNKNOWN_USER: 1,
    PASSWORD_INCORRECT: 2,

    /** Meeting Related Status **/
    MEETING_NOT_EXISTS: 51,

    /** CMS API Related Status **/
    USERNAME_OR_PASSWORD_INCORRECT:100
};

module.exports.userLevel = {
    ADMINISTRATOR:0
};

module.exports.meetingStatus = {
    TO_BE_STARTED:0,
    ON_GOING:1,
    COMPLETED:2,
    EXPIRED:3
}

module.exports.meetingType = {
    PERSONAL:0,
    ONE_TIME:1
}

module.exports.meetingLayoutTranslation = {
    0:"allEqual",
    1:"speakerOnly",
    2:"telepresence",
    3:"stacked",
    4:"allEqualQuarters",
    5:"allEqualNinths",
    6:"allEqualSixteenths",
    7:"allEqualTwentyFifths",
    8:"onePlusFive",
    9:"onePlusSeven",
    10:"onePlusNine",
    11:"automatic",
    12:"onePlusN"
}

module.exports.meetingLayout = {
    ALL_EQUAL:0,
    SPEAKER_ONLY:1,
    TELEPRESENCE:2,
    STACKED:3,
    ALL_EQUAL_QUARTERS:4,
    ALL_EQUAL_NINTHS:5,
    ALL_EQUAL_SIXTEENTHS:6,
    ALL_EQUAL_TWENTY_FIFTHS:7,
    ONE_PLUS_FIVE:8,
    ONE_PLUS_SEVEN:9,
    ONE_PLUS_NINE:10,
    AUTOMATIC:11,
    ONE_PLUS_N:12
}

module.exports.CmsApis = {
    COSPACES :"coSpaces",
    USERS :"users",
    COSPACEUSERS:"coSpaceUsers",
    USERCOSPACES:"userCoSpaces",
    CALLS:"calls",
    CALL_LEGS:"callLegs"
}


 /** Logs Related Messages **/
module.exports.logMessages= {
        0 :"new meeting has been created",
        1 :"deleted a meeting",
        2 :"a meeting has been updated",
        3 :"new cospace has been created",
        4 :"cospace has been updated",
        5 :"added user in cospace",
        6 :"user deleted in cospace"
    }

 /** Logs Related Status **/
module.exports.logType={
    CREATE_MEETING:0,
    DELETE_MEETING:1,
    UPDATE_MEETING:2,
    CREATE_COSPACE:3,
    UPDATE_COSPACE:4,
    ADD_USER_IN_COSPACE:5,
    DELETE_USER:6
}