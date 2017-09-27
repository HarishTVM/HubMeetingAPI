#!/bin/env node
"esversion:6";
"strict mode";

const errors = require('restify-errors');
const cmsTypes = require('../cms-types');
const model = require('../models/cms-models');
const utility = require('../helpers/utility');

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
                if(user.isFirstTime && (user.userPassword == data.password)){
                    let _user = user;
                    user.isFirstTime = false;
                    updateUser(user);
                    return _user;
                }                 
                else {
                    let hashString = utility.hashString(user.userPassword);
                    if(user.password == hashString)
                        return user;
                    else
                        return Promise.reject(new errors.UnauthorizedError({message: "Password Mismatch", context: {errorType:cmsTypes.results.CUSTOM_ERROR, customErrCode: cmsTypes.status.PASSWORD_INCORRECT}}));
                }
            }
            else
                return Promise.reject(new errors.UnauthorizedError({message: "User not Exists", context: {errorType:cmsTypes.results.CUSTOM_ERROR, customErrCode: cmsTypes.status.UNKNOWN_USER}}));
        });
    };

/******---------------------------------------------- END OF ADAPTER METHODS ----------------------------------------------------------------------------------------***/
/******---------------------------------------------- BEGIN OF INNER METHODS ----------------------------------------------------------------------------------------***/

// BEGIN General Methods
    updateUser = (user)=>{
        return new Promise((resolve, reject) => resolve())
        .then(()=>UserLogin.update(
                                    {userName: user.userName, userPassword: user.userPassword, userLevelID: user.userLevelID, lastLoginDate: user.lastLoginDate, changePassword: user.changePassword, isFirstTime: user.isFirstTime},
                                    {where: {userID: user.userID}}   
                                ));
        
    };
// END General Methods

/******---------------------------------------------- END OF INNER METHODS ------------------------------------------------------------------------------------------***/

module.exports.authenticateUser = authenticateUser;