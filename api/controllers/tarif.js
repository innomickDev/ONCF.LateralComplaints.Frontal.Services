'use strict';
const webUrl = require("../../config/global")
const optionHelper = require("../helpers/optionParameterHelper")
const actionHelper = require("../helpers/actionHelper")
const customResponse = require("../../config/globalResponse").customResponse
const logHelper = require('../helpers/logger')
const { uuid } = require('uuidv4')
const serviceFactory = require('../serviceFactory/tarifServiceFactory')
const cache = require('../../config/global').isCache
const errorMessage = require("../helpers/messageHelper")

/**
 * @description: controller for global service
 * @param {*} req 
 * @param {*} res 
 */
const getTarifs = async function (req, res) {
    // below reqid is callId for log function
    let reqid = uuid()
    logHelper.LogCallStart(reqid, "GetTarifs", "Express Js", "GetTarifs api is started successfully")    
    if (cache) {
        const result = serviceFactory.getTarifList()
        if (result) {
            customResponse.isSuccess = true;
            customResponse.data = result;
            customResponse.error = { error: "", errorDescription: "" }
            return res.send(customResponse);
        }
        else {
            return res.send(errorResponse.errorHandler(errorResponse.resourceNotFound, errorMessage.INVALID_REQUEST_PARAMETER))
        }
    }
    else {
        let body = {
            tarifRequest: {
                head: {
                    namespace: "Oncf.ma/DataContracts/2020/02/Ecommerce/Gateway/v1",
                    version: "1.0"
                },
                body: {}
            },
            rootCallId: reqid
        }        
        body = JSON.stringify(body)
        const option = optionHelper.createOption(`${webUrl.ECOMMERCE_URL}GetListTarif`, null, body, null)
        const response = await actionHelper.globalActionHandler(option, 'tarifResponse')
        //console.log(response)
        if (response.isSuccess) {            
            // below called for log function
            logHelper.LogCallEnd(reqid, "GetTarifs", "ExpressJs", response.error.errorCode, response.error.errorMessage)
            customResponse.isSuccess = true;
            customResponse.data = response.data;
            customResponse.error = { error: "", errorDescription: "" }
            return res.send(customResponse);
        } else {            
            // below called for log function
            logHelper.LogCallEnd(reqid, "GetTarifs", "ExpressJs", response.error.errorCode, response.error.errorMessage)
            return res.send(response.errorData);
        }
    }
}

/**
 * @description: below module.exports is for exporting all the controllers above
*/
module.exports = {
    getTarifs
}