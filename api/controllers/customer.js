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
const dob = "1900-01-01T10:00:00+01:00"
const errorMessage = require("../helpers/messageHelper")
var randomize = require('randomatic');
const identityHelper = require('../helpers/dataHelper')

/**
 * @description: controller for Client Registration
 * @param {*} req 
 * @param {*} res  
 */
const customerRegistration =async function(req, res){    
    // below reqid is callId for log function
    let reqid = uuid()
    logHelper.LogCallStart(reqid, "Client Registration", "Express Js", "Client Registration api is started successfully")
    let{profession,prenom, nom, tel, adresse, ville, pays, email,civility}
            = req.swagger.params['body'].value;
    if(!validationHelper.validateEmail(email))
    {
        return res.send(errorResponse.errorHandler(errorResponse.Validation, identityHelper.identityErrorMessage(1)))   
    }
    let newRandomPassword = "";
    do {
        newRandomPassword =  randomize('AA')+ randomize('Aa0',webUrl.MIN_PASSWORD_LENGTH)+ '@' + randomize('00') + randomize('aa');
    }while(validationHelper.validatePassword1(newRandomPassword))
    //const password = validationHelper.createRandomPassword(10); // randomize('Aa0',webUrl.MIN_PASSWORD_LENGTH) //
    console.log(newRandomPassword)
    const body = JSON.stringify({
       head: {
           namespace: "Oncf.ma/DataContracts/2019/04/Payment/Gateway/v1",
           version: "v1"
       },
       body: {
           email: email,
           civilite: civility,
           prenom: prenom,
           nom: nom,
           dateNaissance: dob,           
           adresse: adresse,
           ville: ville,
           pays: pays,
           login: email,
           pwd: newRandomPassword,
           provider: "",
           nomAr: "",
           prenomAr: "",
           emailConfirmation: true,
           tel: tel,
           telConfirmation: false,
           nomAffichage: "",
           codeClient: "",
           profilDemographique: "",
           profession: profession || "",
           employeur: "",
           properties: null,
           activationUrl : webUrl.ACTIVATE_ACCOUNT
       }
    })
    //console.log(body)
    const frontOption = optionHelper.createOption(`${webUrl.IDENTITY_URL}CreateUser`,null,body,null);
    const frontResponse = await actionHelper.frontEndActionHandler(frontOption)
    //console.log(frontResponse)
    if(frontResponse.isSuccess){               
        // below reqid is callId for log function
        logHelper.LogCallEnd(reqid, "Client Registration", "ExpressJs", frontResponse.error.errorCode, frontResponse.error.errorMessage)
        const body = JSON.stringify({
            customerClientRegistrationRequest:
            {
                header:
                {
                    namespace: "",
                    version: ""
                },
                body:
                {
                    email: email,
                    password : newRandomPassword,
                    userName : prenom.concat(' ', nom)
                }
            }
        })
        //console.log(body)
        const extraHeader = {
            "Accept-Language": req.swagger.params['Accept-Language'].raw
        }
        const option = optionHelper.createOption(`${webUrl.FRONT_URL}RecordCustomerRegistration`, extraHeader, body, null);
        await actionHelper.actionHandler(option, 'customerClientResponse')
        customResponse.isSuccess = true;
        customResponse.data = frontResponse.data;
        customResponse.error = { error: frontResponse.error.errorCode,
             errorDescription: identityHelper.identityErrorMessage(frontResponse.error.errorCode) }
        return res.send(customResponse);
    }else{        
        // below called for log function
        logHelper.LogCallEnd(reqid,"ClientRegistration", "ExpressJs", frontResponse.error.errorCode,frontResponse.error.errorMessage)
        return res.send(errorResponse.errorHandler(frontResponse.error.errorCode, 
            identityHelper.identityErrorMessage(frontResponse.error.errorCode)));
    }
}
  
/**
* @description: controller for MyProfile
* @param {*} req 
* @param {*} res  
*/
const getCustomer = async function(req, res){   
    // below reqid is callId for log function
    let reqid = uuid()
    logHelper.LogCallStart(reqid, "MyProfile", "Express Js", "MyProfile api is started successfully")
    const userEmail= req.swagger.params.userEmail.value;
    //const user = await auth.getUserCode(req);
    const body = JSON.stringify({
       head:
       {
           namespace: "Oncf.ma/DataContracts/2019/04/Identity/Gateway/v1",
           version: "v1"
       },
       body : 
       {
           login: userEmail
       }
    })
    const option = optionHelper.createOption(`${webUrl.IDENTITY_URL}GetUserProfile`,null,body,null)
    const response = await actionHelper.frontEndActionHandler(option)
    if(response.isSuccess){        
        // below called for log function
        logHelper.LogCallEnd(reqid,"MyProfile", "ExpressJs",response.error.errorCode,response.error.errorMessage)
        customResponse.isSuccess=true;
        customResponse.data = response.data;
        customResponse.error = {error : response.error.errorMessage, 
            errorDescription : identityHelper.identityErrorMessage(response.error.errorCode)}
        return res.send(customResponse);
    }else{        
        // below called for log function
        logHelper.LogCallEnd(reqid,"MyProfile", "ExpressJs", response.error.errorCode,response.error.errorMessage)
        //return res.send(response.errorData);
        return res.send(errorResponse.errorHandler(response.error.errorCode, 
            identityHelper.identityErrorMessage(response.error.errorCode)));
    }
}

module.exports = {    
    getCustomer,
    customerRegistration    
}