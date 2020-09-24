'use strict';
const webUrl = require("../../config/global")
const optionHelper = require("../helpers/optionParameterHelper")
const actionHelper = require("../helpers/actionHelper")
const customResponse = require("../../config/globalResponse").customResponse
const logHelper = require('../helpers/logger')
const { uuid } = require('uuidv4')
const dataHelper = require('../serviceFactory/stationServiceFactory')
const cache = require('../../config/global').isCache
const errorMessage = require("../helpers/messageHelper")

/**
 * @description: controller for GetStations
 * @param {*} req 
 * @param {*} res 
 */
const getStations = async function (req, res) {    
    // below reqid is callId for log function
    let reqid = uuid()
    logHelper.LogCallStart(reqid, "GetStations", "Express Js", "GetStations api is started successfully")
    // const { searchs, page, pageSize, sortField, sortDirection }
    //     = req.swagger.params['body'].value;
    if (cache) {
        const result = dataHelper.getStationsList()
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
            gareRequest: {
                head: {
                    namespace: "Oncf.ma/DataContracts/2020/02/Ecommerce/Gateway/v1",
                    version: "1.0"
                },
                body: {}
            },
            rootCallId: reqid
        }        
        body = JSON.stringify(body)
        const option = optionHelper.createOption(`${webUrl.ECOMMERCE_URL}GetListGare`, null, body, null)
        const response = await actionHelper.stationActionHandler(option, 'gareResponse')
        if (response.isSuccess) {            
            // below called for log function
            logHelper.LogCallEnd(reqid, "GetStations", "ExpressJs", response.error.errorCode, response.error.errorMessage)
            customResponse.isSuccess = true;
            customResponse.data = response.data;
            customResponse.error = { error: "", errorDescription: "" }
            return res.send(customResponse);
        } else {            
            // below called for log function
            logHelper.LogCallEnd(reqid, "GetStations", "ExpressJs", response.error.errorCode, response.error.errorMessage)
            return res.send(response.errorData);
        }
    }
}

/**
 * @description: below module.exports is for exporting all the controllers above
*/
module.exports = {
    getStations
}