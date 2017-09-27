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
                    user.isFirstTime = false;
                    _updateUser(user)
                    return user;
                }                 
                else {
                    let hashString = utility.hashString(data.userPassword);
                    if(user.userPassword == hashString)
                        return user;
                    else
                        return Promise.reject(new errors.UnauthorizedError({message: "Password Mismatch", context: {errorType:cmsTypes.results.CUSTOM_ERROR, customErrCode: cmsTypes.status.PASSWORD_INCORRECT}}));
                }
            }
            else
                return Promise.reject(new errors.UnauthorizedError({message: "User not Exists", context: {errorType:cmsTypes.results.CUSTOM_ERROR, customErrCode: cmsTypes.status.UNKNOWN_USER}}));
        });
    };

    changeUserLoginPassword = (data)=>{
        return new Promise((resolve, reject) => resolve())
        .then(()=>_getLoginUserById(data.userID))
        .then((user)=>{
            user.userPassword = utility.hashString(data.userPassword);
            user.changePassword = true;
            return _updateUser(user);
        });
    };

/******---------------------------------------------- END OF ADAPTER METHODS ----------------------------------------------------------------------------------------***/
/******---------------------------------------------- BEGIN OF INNER METHODS ----------------------------------------------------------------------------------------***/

// BEGIN General Methods
    _updateUser = (user)=>{
        return new Promise((resolve, reject) => resolve())
        .then(()=>UserLogin.update(
                                    {userName: user.userName, userPassword: user.userPassword, userLevelID: user.userLevelID, lastLoginDate: user.lastLoginDate, changePassword: user.changePassword, isFirstTime: user.isFirstTime},
                                    {where: {userID: user.userID}}   
                                ));
        
    };

    _getLoginUserById =  (userId) => {
        return new Promise((resolve, reject) => resolve())
        .then(()=>UserLogin.findOne({
            where: {
                userID: userId
            }
        }))
        .then((user)=>{
            if(user == null)
                return Promise.reject(new errors.UnauthorizedError({message: "User not Exists", context: {errorType:cmsTypes.results.CUSTOM_ERROR, customErrCode: cmsTypes.status.UNKNOWN_USER}}));
            else
                return user;
        })
    }
// END General Methods

/******---------------------------------------------- END OF INNER METHODS ------------------------------------------------------------------------------------------***/

module.exports.authenticateUser = authenticateUser;
module.exports.changeUserLoginPassword = changeUserLoginPassword;