'use strict';
const webUrl = require("../../config/global")
const optionHelper = require("../helpers/optionParameterHelper")
const actionHelper = require("../helpers/actionHelper")
const customResponse = require("../../config/globalResponse").customResponse
const logHelper = require('../helpers/logger')
const { uuid } = require('uuidv4')
const serviceFactory = require('../serviceFactory/trainTypeServiceFactory')
const cache = require('../../config/global').isCache
const errorMessage = require("../helpers/messageHelper")
/**
 * @description: controller for global service
 * @param {*} req 
 * @param {*} res 
 */
const getTrainTypes = async function (req, res) {    
    // below reqid is callId for log function
    let reqid = uuid()
    logHelper.LogCallStart(reqid, "GetTrainTypes", "Express Js", "GetTrainTypes api is started successfully")    
    if (cache) {
        const result = serviceFactory.getTrainTypeList()
        if (result) {
            customResponse.isSuccess = true;
            customResponse.data = result;
            customResponse.error = { error: "", errorDescription: "" }
            return res.send(customResponse);
        }
        else {
            return res.send(errorResponse.errorHandler(errorResponse.resourceNotFound, errorMessage.SOMETHING_WENT_WRONG))
        }
    }
    else {
        let body = {
            classificationRequest : {
                head: {
                    namespace: "Oncf.ma/DataContracts/2020/02/Ecommerce/Gateway/v1",
                    version: "1.0"
                },
                body: {}
            },
            rootCallId: reqid
        }
        //below condition is for pagination purpose
        body = JSON.stringify(body)
        const option = optionHelper.createOption(`${webUrl.ECOMMERCE_URL}GetListClassification`, null, body, null)
        const response = await actionHelper.globalActionHandler(option, 'classificationResponse')
        if (response.isSuccess) {            
            // below called for log function
            logHelper.LogCallEnd(reqid, "GetTraintTypes", "ExpressJs", response.error.errorCode, response.error.errorMessage)
            customResponse.isSuccess = true;
            customResponse.data = response.data;
            customResponse.error = { error: "", errorDescription: "" }
            return res.send(customResponse);
        } else {        
            // below called for log function
            logHelper.LogCallEnd(reqid, "GetTraintTypes", "ExpressJs", response.error.errorCode, response.error.errorMessage)
            return res.send(response.errorData);
        }
    }
}

/**
 * @description: below module.exports is for exporting all the controllers above
*/
module.exports = {
    getTrainTypes
}