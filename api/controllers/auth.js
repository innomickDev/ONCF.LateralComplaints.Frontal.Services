'use strict';
const auth = require("../helpers/auth")
const webUrl = require("../../config/global")
const optionHelper = require("../helpers/optionParameterHelper")
const actionHelper = require("../helpers/actionHelper")
const customResponse = require("../../config/globalResponse").customResponse
const errorResponse = require("../../config/errorResponse").customError
const logHelper = require('../helpers/logger')
const { uuid } = require('uuidv4')
const validationHelper = require('../helpers/validationHelper')
const errorMessage = require("../helpers/messageHelper")

/**
 * @description: controller for BackOffice Login
 * @param {*} req 
 * @param {*} res 
 */
const login = async function(req, res) {      
      // below reqid is callId for log function
      let reqid = uuid()
      logHelper.LogCallStart(reqid,"BackOfficeLogin", "Express Js", "BackOfficeLogin api is started successfully")
      const {email,password} = req.swagger.params['body'].value;      
      if(!validationHelper.validateEmail(email))
      {
        return res.send(errorResponse.errorHandler(errorResponse.badRequest, errorMessage.INVALID_EMAIL))
      }
      if(!validationHelper.validatePassword(password))
      {
        return res.send(errorResponse.errorHandler(errorResponse.badRequest, errorMessage.INVALID_PASSWORD))
      }
      const body = JSON.stringify({
        loginClientRequest:{
          header:{
            namespace:"",
            version:""
          },
          body:{
            email:email,
            password:password,
            sourceOfLogin:"2"
          }
        }
      })
      const extraHeader = {
        "Accept-Language":req.swagger.params['Accept-Language'].raw
    }
      console.log(body)// it is required to know the user login details
      const backOption = optionHelper.createOption(`${webUrl.BOUSER_URL}LoginClient`,extraHeader,body,null)
      const backResponse = await actionHelper.actionHandler(backOption,"loginClientResponse")
      //console.log(backResponse)
      if(backResponse.isSuccess){        
        // below called for log function
        logHelper.LogCallEnd(reqid,"BackOfficeLogin", "ExpressJs",backResponse.error.errorCode,backResponse.error.errorMessage)
        //below body is the body of MyProfile to get userId of agent User
        const body = JSON.stringify({
          getUserClientByCodeRequest:{
              header:{
                  namespace : "",
                  version : ""
              },
              body:{
                  code:backResponse.data.userCode
              }
          },
          token: backResponse.data.accessToken
      })
      const extraHeader = {
        "Accept-Language":req.swagger.params['Accept-Language'].raw
    }
      const option = optionHelper.createOption(`${webUrl.BOUSER_URL}GetUserByCode`,extraHeader,body,null)
      const response = await actionHelper.actionHandler(option,'userClientResponse')
      //console.log(response)
      //console.log(response.data.role)
      //below permissionArray is to store permissions for every user
      let permissonArray = []
      response.data.roles.map(role => {
        permissonArray = [...permissonArray, ...role.permissions];
      });
      let permissionUnion = [...new Set(permissonArray)];
      //below method is to push the default permission if there are no permission for user
      permissionUnion.push('grcAgent')
      //console.log(permissionUnion)
      const token = auth.issueToken({accessToken:backResponse.data.accessToken, userCode:backResponse.data.userCode,role:JSON.stringify((permissionUnion))});
      // const token = auth.issueToken({userId:backResponse.data.userId,role:'mobile'}); it is required for purpose
        backResponse.data.token = token
        customResponse.isSuccess=true;
        customResponse.data = backResponse.data;
        customResponse.error = {error :"",errorDescription : ""}
        return res.send(customResponse);
      }
      else
      {        
        // below called for log function
        logHelper.LogCallEnd(reqid,"BackOfficeLogin", "ExpressJs", backResponse.error.errorCode,backResponse.error.errorMessage)
        return res.send(backResponse.errorData);
      }
    
    }

/**
 * @description: controller for Back Office Logout
 * @param {*} req 
 * @param {*} res  
 */
const logout = async function(req, res){  
  // below reqid is callId for log function
      let reqid = uuid()
      //console.log(req)
      logHelper.LogCallStart(reqid, "Back Office Logout", "Express Js", "Back Office Logout api is started successfully")
      const user = await auth.getUserCode(req);
      const{code, email} = req.swagger.params['body'].value;
      if(!((validationHelper.validateEmail(email)) && (validationHelper.codeValidate(code))))
      {
        return res.send(errorResponse.errorHandler(errorResponse.badRequest, errorMessage.INVALID_REQUEST_PARAMETER))
      }
      const body = JSON.stringify({
          logoutClientRequest:{
              header:{
                  namespace:"",
                  version:""
              },
              body:{
                  code:code,
                  email: email
              }
          },
          token: "user.accessToken",
          rootCallId: reqid
      })
      const extraHeader = {
        "Accept-Language":req.swagger.params['Accept-Language'].raw
    }
  const options = optionHelper.createOption(`${webUrl.BOUSER_URL}LogoutClient`,extraHeader,body,null)
  const response = await actionHelper.actionHandler(options,'logoutClientResponse')
  if(response.isSuccess){      
      // below called for log function
      logHelper.LogCallEnd(reqid,"Back Office Logout", "ExpressJs",response.error.errorCode,response.error.errorMessage)
      customResponse.isSuccess=true;
      customResponse.data = response.data;
      customResponse.error = {error :"",errorDescription : ""}
      return res.send(customResponse);
  }else{      
      // below reqid is callId for log function
      logHelper.LogCallEnd(reqid,"Back Office Logout", "ExpressJs", response.error.errorCode,response.error.errorMessage) 
      return res.send(response.errorData);
  }
}  
    
/**
 * @description: below module.exports is for exporting all the controllers above
*/
module.exports = {
    login,
    logout
}