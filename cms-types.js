#!/bin/env node
"esversion:6";
"strict mode";

module.exports.results = {
    OK: "OK",
    KNOWN_ERROR: "KNOWN_ERROR",
    CUSTOM_ERROR: "CUSTOM_ERROR",
    INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR"
};

module.exports.status = {
    SUCCESS: 200,

    /** User Login Related Status **/
    UNKNOWN_USER: 1,
    PASSWORD_INCORRECT: 2,

    /** CMS API Related Status **/
    USERNAME_OR_PASSWORD_INCORRECT:100
};

module.exports.userLevel = {
    ADMINISTRATOR:0
};

module.exports.CmsApis = {
    COSPACES :"coSpaces",
    USERS :"users",
    COSPACEUSERS:"coSpaceUsers",
    USERCOSPACES:"userCoSpaces"
}
