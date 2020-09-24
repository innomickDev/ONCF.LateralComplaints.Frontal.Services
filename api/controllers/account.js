'use strict';
const webUrl = require("../../config/global")
const optionHelper = require("../helpers/optionParameterHelper")
const actionHelper = require("../helpers/actionHelper")
const customResponse = require("../../config/globalResponse").customResponse
const errorResponse = require("../../config/errorResponse").customError
const logHelper = require('../helpers/logger')
const { uuid } = require('uuidv4')
const validationHelper = require('../helpers/validationHelper')
const auth = require('../helpers/auth')
const errorMessage = require("../helpers/messageHelper")


/**
 * @description: controller for ChangePassword
 * @param {*} req 
 * @param {*} res  
 */
const accountChangePassword = async function(req, res){    
    // below acpid means accountChangePassword's callId for logging
    let acpid = uuid()
    logHelper.LogCallStart(acpid, "ChangePassword", "Express Js", "ChangePassword api is started successfully")
    const user = await auth.getUserCode(req);
    let{email, oldPassword, newPassword} = req.swagger.params['body'].value;
    if(!validationHelper.validateEmail(email))
    {
       return res.send(errorResponse.errorHandler(errorResponse.badRequest, errorMessage.INVALID_REQUEST_PARAMETER))
    }
    if(!validationHelper.validatePassword(oldPassword))
    {
        return res.send(errorResponse.errorHandler(errorResponse.badRequest, errorMessage.INVALID_OLD_PASSWORD))
    }
    if(!validationHelper.validatePassword(newPassword))
    {
        return res.send(errorResponse.errorHandler(errorResponse.badRequest, errorMessage.INVALID_NEW_PASSWORD))
    }
    const body = JSON.stringify({
            changePasswordRequest:{
                header:{
                    namespace : "Oncf.ma/DataContracts/2020/02/Complaints/Gateway/v1",
                    version :"1.0"
                },
                body:{
                  email : email,
                  oldPassword : oldPassword,
                  newPassword : newPassword
                }
            },
            token: user.accessToken,
            rootCallId: acpid
        }) 
        const extraHeader = {
            "Accept-Language":req.swagger.params['Accept-Language'].raw
        }
        const option = optionHelper.createOption(`${webUrl.BOUSER_URL}ChangePassword`,extraHeader,body,null)
        const response = await actionHelper.actionHandler(option,'changePasswordClientResponse')
        if(response.isSuccess){            
            // below called for logging
            logHelper.LogCallEnd(acpid,"ChangePassword", "ExpressJs",response.error.errorCode,response.error.errorMessage)
            customResponse.isSuccess=true;
            customResponse.data = response.data;
            customResponse.error = {error :"",errorDescription : ""}
            return res.send(customResponse);
        }
        else
        {            
            // below callId for logging
            logHelper.LogCallEnd(acpid,"ChangePassword", "ExpressJs", response.error.errorCode,response.error.errorMessage)
            return res.send(response.errorData);
        }
    }

/**
 * @description: controller for ConfirmForgottenPassword
 * @param {*} req 
 * @param {*} res  
 */
const confirmForgottenPassword = async function(req, res){    
    // below cfpid means BackOffice ConfirmForgottenPassword's called for logging
    let cfpid = uuid()
    logHelper.LogCallStart(cfpid, "ConfirmForgottenPassword", "Express Js", "ConfirmForgottenPassword api is started successfully")
        let{confirmationCode, email, newPassword} = req.swagger.params['body'].value;
        if(!validationHelper.validateEmail(email))
        {
          return res.send(errorResponse.errorHandler(errorResponse.badRequest, errorMessage.INVALID_REQUEST_PARAMETER))
        }
        if(!validationHelper.validatePassword(newPassword))
        {
            return res.send(errorResponse.errorHandler(errorResponse.badRequest, errorMessage.INVALID_NEW_PASSWORD))
        }
        const body = JSON.stringify({
            confirmForgottonPasswordRequest:{
                header:{
                    namespace : "Oncf.ma/DataContracts/2020/02/Complaints/Gateway/v1",
                    version :"1.0"
                },
                body:{
                  email : email,
                  confirmationCode : confirmationCode,
                  newPassword : newPassword
                }
            }
        })
        const extraHeader = {
            "Accept-Language":req.swagger.params['Accept-Language'].raw
        }
        const option = optionHelper.createOption(`${webUrl.BOUSER_URL}ConfirmForgottonPassword`,extraHeader,body,null)
        const response = await actionHelper.actionHandler(option,'confirmForgottonPasswordResponse')
        if(response.isSuccess){            
             // below called for logging
             logHelper.LogCallEnd(cfpid,"ConfirmForgottenPassword", "ExpressJs",response.error.errorCode,response.error.errorMessage)
            customResponse.isSuccess=true;
            customResponse.data = response.data;
            customResponse.error = {error :"",errorDescription : ""}
            return res.send(customResponse);
        }else{            
            // below called for logging
            logHelper.LogCallEnd(cfpid,"ConfirmForgottenPassword", "ExpressJs", response.error.errorCode,response.error.errorMessage)
            return res.send(response.errorData);
        }
    }


/**
 * @description: controller for ForgotPassword
 * @param {*} req 
 * @param {*} res  
 */
const forgotPassword = async function(req, res){        
        // below bfpid means backoffice forgot password callId for log function
        let bfpid = uuid()
        logHelper.LogCallStart(bfpid, "ForgotPassword", "Express Js", "ForgotPassword api is started successfully")
        const email = req.swagger.params.email.value;
        if(!validationHelper.validateEmail(email))
        {
            return res.send(errorResponse.errorHandler(errorResponse.badRequest, errorMessage.INVALID_REQUEST_PARAMETER))
        }
        const body = JSON.stringify({
            forgotPasswordClientRequest:{
                header:{
                    namespace : "",
                    version :""
                },
                body:{
                  email : email,
                }
            }
        })
        const extraHeader = {
            "Accept-Language":req.swagger.params['Accept-Language'].raw
        }
        const option = optionHelper.createOption(`${webUrl.BOUSER_URL}ForgotPassword`,extraHeader,body,null)
        const response = await actionHelper.actionHandler(option,'forgotPasswordResponse')
        if(response.isSuccess){            
            // below called for log function
            logHelper.LogCallEnd(bfpid,"ForgotPassword", "ExpressJs",response.error.errorCode,response.error.errorMessage)
            customResponse.isSuccess=true;
            customResponse.data = response.data;
            customResponse.error = {error :"",errorDescription : ""}
            return res.send(customResponse);
        }else{            
            // below called for log function
            logHelper.LogCallEnd(bfpid,"ForgotPassword", "ExpressJs", response.error.errorCode,response.error.errorMessage)
            return res.send(response.errorData);
        }
    }
    
/**
 * @description: controller for MyProfile
 * @param {*} req 
 * @param {*} res  
 */
const myProfile = async function(req, res){    
    //below reqid is callId for log function
    let reqid = uuid()
    logHelper.LogCallStart(reqid, "MyProfile", "Express Js", "MyProfile api is started successfully")
    const user = await auth.getUserCode(req);
    console.log(user)
    const body = JSON.stringify({
        getUserClientByCodeRequest:{
            header:{
                namespace : "",
                version : ""
            },
            body:{
                code:user.userCode
            }
        },
        token: "user.accessToken",
        rootCallId: ""
    })
    const extraHeader = {
        "Accept-Language":req.swagger.params['Accept-Language'].raw
    }
    const option = optionHelper.createOption(`${webUrl.BOUSER_URL}GetUserByCode`,extraHeader,body,null)
    const response = await actionHelper.actionHandler(option,'userClientResponse')
    if(response.isSuccess){        
        // below called for log function
        logHelper.LogCallEnd(reqid,"MyProfile", "ExpressJs",response.error.errorCode,response.error.errorMessage)
        customResponse.isSuccess=true;
        customResponse.data = response.data;
        customResponse.error = {error :"",errorDescription : ""}
        return res.send(customResponse);
    }else{        
        // below called for log function
        logHelper.LogCallEnd(reqid,"MyProfile", "ExpressJs", response.error.errorCode,response.error.errorMessage)
        return res.send(response.errorData);
    }
}


module.exports = {
    accountChangePassword,
    confirmForgottenPassword,    
    forgotPassword,
    myProfile   
}