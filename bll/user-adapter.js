#!/bin/env node
"esversion:6";
"strict mode";

const errors = require('restify-errors');
const cmsTypes = require('../cms-types');
const model = require('../models/cms-models');

const UserLogin = model.userLogin;

/******---------------------------------------------- BEGIN OF ADAPTER METHODS --------------------------------------------------------------------------------------***/
    authenticateUser = (data)=>{
        return new Promise((resolve, reject) => resolve())
        .then(()=>UserLogin.findOne({
            where : {
                userName : data.userName
            },
            raw: true
        }))
        .then((user)=>{
            if(user != null){
                if(user.isFirstTime && (user.userPassword == data.password))
                    return user;
                else {
                    // to do encryption logic
                }
            }
            else
                return Promise.reject(new errors.UnauthorizedError({message: "User not Exists", context: {errorType:cmsTypes.results.CUSTOM_ERROR, customErrCode: cmsTypes.status.UNKNOWN_USER}}));
        })
    }

/******---------------------------------------------- END OF ADAPTER METHODS ----------------------------------------------------------------------------------------***/
/******---------------------------------------------- BEGIN OF INNER METHODS ----------------------------------------------------------------------------------------***/

/******---------------------------------------------- END OF INNER METHODS ------------------------------------------------------------------------------------------***/

module.exports.authenticateUser = authenticateUser;