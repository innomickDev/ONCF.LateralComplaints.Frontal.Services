'use strict';
const webUrl = require("../../config/global")
const optionHelper = require("../helpers/optionParameterHelper")
const actionHelper = require("../helpers/actionHelper")
const customResponse = require("../../config/globalResponse").customResponse
const errorResponse = require("../../config/errorResponse").customError
const dataModifier = require("../helpers/modifyData")
const auth = require("../helpers/auth")
const logHelper = require('../helpers/logger')
const { uuid } = require('uuidv4')
const claimSource = require('../../config/global').claim_source
const validationHelper = require('../helpers/validationHelper')
const dataHelper = require('../helpers/dataHelper')
const errorMessage = require("../helpers/messageHelper")
const _ = require('lodash')
const channelServiceFactory = require('../serviceFactory/channelServiceFactory')
const cache = require('../../config/global').isCache

/**
 * @description: controller for GetTicketAttachment
 * @param {*} req 
 * @param {*} res 
 */
const getTicketAttachment = async function (req, res) {    
    // below reqid is callId for log function
    let reqid = uuid()
    logHelper.LogCallStart(reqid, "GetTicketAttachment", "Express Js", "GetTicketAttachment api is started successfully")
    const user = await auth.getUserCode(req);
    const code = req.swagger.params.code.value;
    if (!validationHelper.codeValidate(code)) {
        return res.send(errorResponse.errorHandler(errorResponse.badRequest, errorMessage.INVALID_REQUEST_PARAMETER))
    }
    const body = JSON.stringify({
        getTicketAttachmentClientRequest: {
            header: {
                namespace: "Oncf.ma/DataContracts/2020/02/Complaints/Gateway/v1",
                version: "1.0"
            },
            body: {
                code: code
            }
        },
        token: user.accessToken,
        rootCallId: reqid
    })
    const extraHeader = {
        "Accept-Language": req.swagger.params['Accept-Language'].raw
    }
    const option = optionHelper.createOption(`${webUrl.FRONT_URL}GetTicketAttachment`, extraHeader, body, null)
    const response = await actionHelper.actionHandler(option, 'ticketAttachmentResponse')
    if (response.isSuccess) {        
        // below called for log function
        logHelper.LogCallEnd(reqid, "GetTicketAttachment", "ExpressJs", response.error.errorCode, response.error.errorMessage)
        customResponse.isSuccess = true;
        customResponse.data = response.data;
        customResponse.error = { error: "", errorDescription: "" }
        return res.send(customResponse);
    } else {        
        // below called for log function
        logHelper.LogCallEnd(reqid, "GetTicketAttachment", "ExpressJs", response.error.errorCode, response.error.errorMessage)
        return res.send(response.errorData);
    }
}

/**
 * @description: controller for GetClaimAttachment
 * @param {*} req 
 * @param {*} res 
 */
const getClaimAttachment = async function (req, res) {    
    // below reqid is callId for log function
    let reqid = uuid()
    logHelper.LogCallStart(reqid, "GetClaimAttachment", "Express Js", "GetClaimAttachment api is started successfully")
    const user = await auth.getUserCode(req);
    const code = req.swagger.params.code.value;
    if (!validationHelper.codeValidate(code)) {
        return res.send(errorResponse.errorHandler(errorResponse.badRequest, errorMessage.INVALID_REQUEST_PARAMETER))
    }
    const body = JSON.stringify({
        getClaimAttachmentClientRequest: {
            header: {
                namespace: "Oncf.ma/DataContracts/2020/02/Complaints/Gateway/v1",
                version: "1.0"
            },
            body: {
                code: code
            }
        },
        token: user.accessToken,
        rootCallId: reqid
    })
    const extraHeader = {
        "Accept-Language": req.swagger.params['Accept-Language'].raw
    }
    const option = optionHelper.createOption(`${webUrl.FRONT_URL}GetClaimAttachment`, extraHeader, body, null)
    const response = await actionHelper.actionHandler(option, 'claimAttachmentResponse')
    if (response.isSuccess) {        
        // below called for log function
        logHelper.LogCallEnd(reqid, "GetClaimAttachment", "ExpressJs", response.error.errorCode, response.error.errorMessage)
        customResponse.isSuccess = true;
        customResponse.data = response.data;
        customResponse.error = { error: "", errorDescription: "" }
        return res.send(customResponse);
    } else {        
        // below reqid is callId for log function
        logHelper.LogCallEnd(reqid, "GetClaimAttachment", "ExpressJs", response.error.errorCode, response.error.errorMessage)
        return res.send(response.errorData);
    }
}

/**
 * @description: controller for UpdateTicketAttachment
 * @param {*} req 
 * @param {*} res 
 */
const updateTicketAttachment = async function (req, res) {    
    // below reqid is callId for log function
    let reqid = uuid()
    logHelper.LogCallStart(reqid, "UpdateTicketAttachment", "Express Js", "UpdateTicketAttachment api is started successfully")
    const user = await auth.getUserCode(req);
    const { code, attachment } = req.swagger.params['body'].value;
    if (!((validationHelper.codeValidate(code)) && (validationHelper.validateAttachment(attachment)))) {
        return res.send(errorResponse.errorHandler(errorResponse.badRequest, errorMessage.INVALID_REQUEST_PARAMETER))
    }
    const body = JSON.stringify({
        updateTicketAttachmentClientRequest: {
            header: {
                version: "1.0",
                namespace: "Oncf.ma/DataContracts/2020/02/Complaints/Gateway"
            },
            body: {
                code: code,
                attachment: attachment
            }
        },
        token: user.accessToken,
        rootCallId: reqid
    })
    const extraHeader = {
        "Accept-Language": req.swagger.params['Accept-Language'].raw
    }
    const option = optionHelper.createOption(`${webUrl.FRONT_URL}UpdateTicketAttachment`, extraHeader, body, null)
    const response = await actionHelper.actionHandler(option, 'updateTicketAttachmentResponse')
    if (response.isSuccess) {        
        // below called for log function
        logHelper.LogCallEnd(reqid, "UpdateTicketAttachment", "ExpressJs", response.error.errorCode, response.error.errorMessage)
        customResponse.isSuccess = true;
        customResponse.data = response.data;
        customResponse.error = { error: "", errorDescription: "" }
        return res.send(customResponse);
    } else {        
        // below called for log function
        logHelper.LogCallEnd(reqid, "UpdateTicketAttachment", "ExpressJs", response.error.errorCode, response.error.errorMessage)
        return res.send(response.errorData);
    }
}

/**
 * @description: controller for UpdateClaimAttachment
 * @param {*} req 
 * @param {*} res 
 */
const updateClaimAttachment = async function (req, res) {    
    // below reqid is callId for log function
    let reqid = uuid()
    logHelper.LogCallStart(reqid, "UpdateClaimAttachment", "Express Js", "UpdateClaimAttachment api is started successfully")
    const user = await auth.getUserCode(req);
    const { code, attachment } = req.swagger.params['body'].value;
    if (!((validationHelper.codeValidate(code)) && (validationHelper.validateAttachment(attachment)))) {
        return res.send(errorResponse.errorHandler(errorResponse.badRequest, errorMessage.INVALID_REQUEST_PARAMETER))
    }
    const body = JSON.stringify({
        updateClaimAttachmentClientRequest: {
            header: {
                version: "1.0",
                namespace: "Oncf.ma/DataContracts/2020/02/Complaints/Gateway"
            },
            body: {
                code: code,
                attachment: attachment
            }
        },
        token: user.accessToken,
        rootCallId: reqid
    })
    const extraHeader = {
        "Accept-Language": req.swagger.params['Accept-Language'].raw
    }
    //console.log(body)
    const option = optionHelper.createOption(`${webUrl.FRONT_URL}UpdateClaimAttachmentClient`, extraHeader, body, null)
    const response = await actionHelper.actionHandler(option, 'updateClaimAttachmentResponse')
    
    if (response.isSuccess) {        
        // below called for log function
        logHelper.LogCallEnd(reqid, "UpdateClaimAttachment", "ExpressJs", response.error.errorCode, response.error.errorMessage)
        customResponse.isSuccess = true;
        customResponse.data = response.data;
        customResponse.error = { error: "", errorDescription: "" }
        return res.send(customResponse);
    } else {        
        // below called for log function
        logHelper.LogCallEnd(reqid, "UpdateClaimAttachment", "ExpressJs", response.error.errorCode, response.error.errorMessage)
        return res.send(response.errorData);
    }
}


/**
 * @description: controller for GetClaimByCode
 * @param {*} req 
 * @param {*} res 
 */
const getClaimByCode = async function (req, res) {    
    // below reqid is callId for log function
    let reqid = uuid()
    logHelper.LogCallStart(reqid, "GetClaimByCode", "Express Js", "GetClaimByCode api is started successfully")
    const user = await auth.getUserCode(req)
    const code = req.swagger.params.code.value;
    if (!validationHelper.codeValidate(code)) {
        return res.send(errorResponse.errorHandler(errorResponse.badRequest, errorMessage.INVALID_REQUEST_PARAMETER))
    }
    const body = JSON.stringify({
        getClaimClientByCodeRequest: {
            header: {
                namespace: "",
                version: ""
            },
            body: {
                code: code
            }
        },
        token: user.accessToken,
        rootCallId: reqid
    })
    //console.log(body)
    const extraHeader = {
        "Accept-Language": req.swagger.params['Accept-Language'].raw
    }
    const option = optionHelper.createOption(`${webUrl.FRONT_URL}GetClaimByCode`, extraHeader, body, null)
    const response = await actionHelper.actionHandler(option, 'claimClientResponse')
    if (!response.data) {
        return res.send(errorResponse.errorHandler(errorResponse.resourceNotFound, errorMessage.NO_CLAIM_FOUND))
    }
    const result = response.data

    if(result.arrivalStationCode){
        result.arrivalStation = await dataHelper.getStationByCode(result.arrivalStationCode)
    }
    if(result.departureStationCode){
        result.departureStation = await dataHelper.getStationByCode(result.departureStationCode)
    }
    if(result.eventStationCode){
        result.eventStation = await dataHelper.getStationByCode(result.eventStationCode)
    }
    if(result.subSubCategoryCode)
    {            
        result.subSubCategory = await dataHelper.getSubSubCategoryByCode(result.subSubCategoryCode)
    }
    if(result.tarifCode)
    {            
        result.tarif = await dataHelper.getTarifByCode(result.tarifCode)
    }
    if(result.trainClassificationCode)
    {            
        result.trainType = await dataHelper.getTrainTypeByCode(result.trainClassificationCode)
    }
    if(result.claimStationCode)
    {
        result.claimStation = await dataHelper.getStationByCode(result.claimStationCode)
    }    
    if(result.claimSourceCode)
    {            
        result.claimSource = await dataHelper.getClaimChannelByCode(result.claimSourceCode)
    }
    result.category = await dataHelper.getCategoryByCode(result.categoryCode)
    result.subCategory = await dataHelper.getSubCategoryByCode(result.subCategoryCode)

    if (response.isSuccess) {        
        // below called for log function
        logHelper.LogCallEnd(reqid, "GetClaimByCode", "ExpressJs", response.error.errorCode, response.error.errorMessage)
        response.data = dataModifier.modifyDataByObject(response.data)
        customResponse.isSuccess = true;
        customResponse.data = response.data;
        customResponse.error = { error: "", errorDescription: "" }
        return res.send(customResponse);
    } else {        
        // below called for log function
        logHelper.LogCallEnd(reqid, "GetClaimByCode", "ExpressJs", response.error.errorCode, response.error.errorMessage)
        return res.send(response.errorData);
    }
}

/**
 * @description: controller for GetClaims
 * @param {*} req 
 * @param {*} res 
 */
const getClaims = async function(req, res){    
    // below called for log function
    let reqid = uuid()
    logHelper.LogCallStart(reqid, "GetClaims", "Express Js", "GetClaims api is started successfully")
    const user = await auth.getUserCode(req);
    let{page, pageSize, sortField, sortDirection, searchs } = req.swagger.params['body'].value;     
    let body = { 
        getClaimClientsRequest:{
            header:{
                namespace:"",
                version:""
            },
            body:{
                pagination:{
                    sortField:sortField || null,
                    sortDirection:sortDirection || null
                },
                search:searchs
                }
            },
        token: user.accessToken,
        rootCallId: reqid
    }
    
    //below condition is for pagination
    if(page && pageSize) {
        body.getClaimClientsRequest.body.pagination.page = page
        body.getClaimClientsRequest.body.pagination.pageSize = pageSize
    }
    body = JSON.stringify(body)   
    //console.log(body) 
    const extraHeader = {
        "Accept-Language":req.swagger.params['Accept-Language'].raw
    }
    const option = optionHelper.createOption(`${webUrl.FRONT_URL}GetFilteredClaimClients`,extraHeader,body,null)
    const response = await actionHelper.actionHandler(option,'claimClientResponse')
    
    if(!response.data){
        return res.send(errorResponse.errorHandler(errorResponse.resourceNotFound, errorMessage.NO_CLAIM_FOUND))
    }
    const result = response.data.claimClients
    
    let results = {stationResult : [],subCategoryResult : [],subSubCategoryResult : [], stationResult :[], tarifResult :[],
        trainTypeResult : [], claimChannelResult : [], categoryResult : []}
    
    Object.assign(results.categoryResult, await dataHelper.getCategories())
    Object.assign(results.subCategoryResult, await dataHelper.getSubCategories())        
    Object.assign(results.subSubCategoryResult, await dataHelper.getSubSubCategories())    
    Object.assign(results.stationResult, await dataHelper.getStations())    
    Object.assign(results.tarifResult, await dataHelper.getTarifs())    
    Object.assign(results.trainTypeResult, await dataHelper.getTrainTypes())    
    Object.assign(results.claimChannelResult, await dataHelper.getClaimChannels())    
    
    for (let i of result) {
        if(i.arrivalStationCode){            
            i.arrivalStation = _.find(results.stationResult.data.listGare, { codeGare: String(i.arrivalStationCode) })                         
        }
        if(i.departureStationCode){            
            i.departureStation = _.find(results.stationResult.data.listGare, { codeGare: String(i.departureStationCode) })          
        }
        if(i.claimStationCode){            
            i.claimStation = _.find(results.stationResult.data.listGare, { codeGare: String(i.claimStationCode) })
        }
        if(i.eventStationCode){            
            i.eventStation = _.find(results.stationResult.data.listGare, { codeGare: String(i.eventStationCode) })
        }
        if(i.claimSourceCode){            
            i.claimSource = _.find(results.claimChannelResult.data.channelClients, { code: String(i.claimSourceCode) })
        }
        if(i.subSubCategoryCode)
        {                        
            i.subSubCategory = _.find(results.subCategoryResult.data.subSubCategoryClients, { code: String(i.subSubCategoryCode)})
        }        
        if(i.tarifCode)
        {                        
            i.tarif = _.find(results.tarifResult.data.listTarif, { tarifId: Number(i.tarifCode) })
        }
        if(i.trainClassificationCode)
        {                     
            i.trainType = _.find(results.trainTypeResult.data.listClassification, { codeClassification: String(i.trainClassificationCode) })
        }   
        i.category = _.find(results.categoryResult.data.categoryClients, { code: String(i.categoryCode)})                  
        i.subCategory = _.find(results.subCategoryResult.data.subCategoryClients, { code: String(i.subCategoryCode)})                  
    }
    
    if(response.isSuccess){        
        // below called for log function
        logHelper.LogCallEnd(reqid,"GetClaims", "ExpressJs",response.error.errorCode,response.error.errorMessage)
        response.data = dataModifier.modifyData(response.data,"claimClients")
        customResponse.isSuccess=true;
        customResponse.data = response.data;
        customResponse.error = {error :"",errorDescription : ""} 
        return res.send(customResponse);
    }else{        
        // below called for log function
        logHelper.LogCallEnd(reqid,"GetClaims", "ExpressJs", response.error.errorCode,response.error.errorMessage) 
        return res.send(response.errorData);
    }
}   

/**
 * @description: controller for CreateClaimByAgent
 * @param {*} req 
 * @param {*} res 
 */
const createClaimByAgent = async function(req, res){    
    // below reqid is callId for log function
    let reqid = uuid()
    //console.log(req)
    logHelper.LogCallStart(reqid, "CreateClaimByAgent", "Express Js", "CreateClaimByAgent api is started successfully")
    const{ userCode, departureStationCode, arrivalStationCode, trainNumber, travelDate, categoryCode, subCategoryCode, 
            subSubCategoryCode, claimSubject, claimDetails, ticketAttachment, claimAttachment, userEmail,
        claimChannel, claimCode, claimSourceCode, claimStationCode,eventLocation, eventStationCode, trainClassificationCode,
        tarifCode, departureHour, arrivalHour, eventDate }
            = req.swagger.params['body'].value    

    if(userEmail && !validationHelper.validateEmail(userEmail)){
        return res.send(errorResponse.errorHandler(errorResponse.badRequest, errorMessage.INVALID_EMAIL))
    }
    if(!validationHelper.codeValidate(categoryCode)){
        return res.send(errorResponse.errorHandler(errorResponse.badRequest, errorMessage.INVALID_CATEGORY_CODE))
    }
    // if(!validationHelper.codeValidate(subCategoryCode)){
    //     return res.send(errorResponse.errorHandler(errorResponse.badRequest, errorMessage.INVALID_SUB_SUB_CATEGORY_CODE))
    // }
    if(!validationHelper.codeValidate(claimStationCode)){// source of claim
        return res.send(errorResponse.errorHandler(errorResponse.badRequest, errorMessage.INVALID_CLAIM_STATION_CODE))
    }
    // if(!validationHelper.validateAttachment(ticketAttachment)){    
    //     return res.send(errorResponse.errorHandler(errorResponse.badRequest, errorMessage.INVALID_TICKET_ATTACHMENT))
    // }
    // if(claimAttachment && !validationHelper.validateAttachment(claimAttachment)){    
    //     return res.send(errorResponse.errorHandler(errorResponse.badRequest, errorMessage.INVALID_CLAIM_ATTACHMENT))
    // }
    if(departureStationCode && !validationHelper.codeValidate(departureStationCode)){    
        return res.send(errorResponse.errorHandler(errorResponse.badRequest, errorMessage.INVALID_DEPARTURE_STATION_CODE))
    }
    if(arrivalStationCode && !validationHelper.codeValidate(arrivalStationCode)){    
        return res.send(errorResponse.errorHandler(errorResponse.badRequest, errorMessage.INVALID_ARRIVAL_STATION_CODE))
    }
    if(tarifCode && !validationHelper.codeValidate(tarifCode)){            
        return res.send(errorResponse.errorHandler(errorResponse.badRequest, errorMessage.INVALID_TARIF_CODE))
    }
    
    const user = await auth.getUserCode(req);
    const body = JSON.stringify({
        createClaimClientRequest :{
            header:{
                namespace : "Oncf.ma/DataContracts/2020/02/Complaints/Gateway/v1",
                version:"1.0"
            },
            body:
            {
                userCode: userCode,
                departureStationCode: departureStationCode,
                arrivalStationCode: arrivalStationCode,
                trainNumber: trainNumber,
                travelDate: travelDate,
                categoryCode: categoryCode,
                subCategoryCode: subCategoryCode,
                subSubCategoryCode: subSubCategoryCode ? subSubCategoryCode : null,  
                claimSubject: claimSubject,
                claimDetails: claimDetails,
                isONCFUser: false,
                ticketAttachment: ticketAttachment,
                claimAttachment: claimAttachment ? claimAttachment : null,
                userEmail: userEmail,
                claimChannel: claimChannel,
                claimCode: claimCode,
                claimSourceCode: claimSourceCode,
                claimStationCode: claimStationCode,
                eventLocation: eventLocation,
                eventStationCode: eventStationCode,
                trainClassificationCode: trainClassificationCode,
                tarifCode: tarifCode,
                departureHour: departureHour,
                arrivalHour: arrivalHour,
                eventDate: eventDate          
            }
        },
        token: user.accessToken,
        rootCallId: reqid
    })
    console.log(body)
    const extraHeader = {
        "Accept-Language":req.swagger.params['Accept-Language'].raw
    }
    const option = optionHelper.createOption(`${webUrl.FRONT_URL}IntiateClaimClient`,extraHeader,body,null)
    const response = await actionHelper.actionHandler(option,'claimClientResponse')
    if(response.isSuccess){         
         // below called for log function
         logHelper.LogCallEnd(reqid,"CreateClaimByAgent", "ExpressJs",response.error.errorCode,response.error.errorMessage)
        customResponse.isSuccess=true;
        customResponse.data = response.data;
        customResponse.error = {error :"",errorDescription : ""}
        return res.send(customResponse);
    }else{         
         // below called for log function
         logHelper.LogCallEnd(reqid,"CreateClaimByAgent", "ExpressJs", response.error.errorCode,response.error.errorMessage)
        return res.send(response.errorData);
    }
}

/**
 * @description: controller for GetClaimChannels
 * @param {*} req 
 * @param {*} res 
 */
const getClaimChannels = async function(req, res){    
    // below called for log function
    let reqid = uuid()
    logHelper.LogCallStart(reqid, "GetClaimChannels", "Express Js", "GetClaimChannels api is started successfully")
    const user = await auth.getUserCode(req);
    let{page, pageSize, sortField, sortDirection, searchs } = req.swagger.params['body'].value;
         
    if(cache){
        const result = channelServiceFactory.getListChannel()
        if(result){
            customResponse.isSuccess=true;
            customResponse.data = result;
            customResponse.error = {error :"",errorDescription : ""}
            return res.send(customResponse);
        }
        else{
            return res.send(errorResponse.errorHandler(errorResponse.resourceNotFound, errorMessage.SOMETHING_WENT_WRONG))
        }
    }
    else{        
        let body = { 
            getChannelClientsRequest:{
                header:{
                    namespace:"",
                    version:""
                },
                body:{
                    pagination:{
                        sortField:sortField || null,
                        sortDirection:sortDirection || null
                    },
                    search:searchs
                    }
                },
            token: user.accessToken,
            rootCallId: reqid
        }
        //below condition is for pagination
        if(page && pageSize) {
            body.getChannelClientsRequest.body.pagination.page = page
            body.getChannelClientsRequest.body.pagination.pageSize = pageSize
        }
        body = JSON.stringify(body)
        //console.log(body)
        const extraHeader = {
            "Accept-Language":req.swagger.params['Accept-Language'].raw
        }
        const option = optionHelper.createOption(`${webUrl.FRONT_URL}GetListChannel`,extraHeader,body,null)
        const response = await actionHelper.actionHandler(option,'channelClientResponse')
        //console.log(response)
        if(response.data == null){
            return res.send(errorResponse.errorHandler(errorResponse.resourceNotFound, errorMessage.NO_DATA_FOUND))
        }
        const result = response.data.channelClients
        //console.log(result)
        
        if(response.isSuccess){        
            // below called for log function
            logHelper.LogCallEnd(reqid,"GetClaimChannels", "ExpressJs",response.error.errorCode,response.error.errorMessage)
            response.data = dataModifier.modifyData(response.data,"channelClients")
            customResponse.isSuccess=true;
            customResponse.data = response.data;
            customResponse.error = {error :"",errorDescription : ""} 
            return res.send(customResponse);
        }else{        
            // below called for log function
            logHelper.LogCallEnd(reqid,"GetClaimChannels", "ExpressJs", response.error.errorCode,response.error.errorMessage) 
            return res.send(response.errorData);
        }
    }

}   


/**
 * @description: controller for UpdateClaimByAgent
 * @param {*} req 
 * @param {*} res 
 */
const updateClaimByAgent = async function(req, res){    
    // below reqid is callId for log function
    let reqid = uuid()
    //console.log(req)
    logHelper.LogCallStart(reqid, "UpdateClaimByAgent", "Express Js", "CreateClaimByAgent api is started successfully")
    const{ code, departureStationCode, arrivalStationCode, trainNumber, travelDate, categoryCode, subCategoryCode, 
            subSubCategoryCode, claimSubject, claimDetails, 
        claimChannel, claimCode, claimSourceCode, claimStationCode,eventLocation, eventStationCode, trainClassificationCode,
        tarifCode, departureHour, arrivalHour, eventDate }
            = req.swagger.params['body'].value    
    
    if(code && !validationHelper.codeValidate(code)){        
        return res.send(errorResponse.errorHandler(errorResponse.badRequest, errorMessage.INVALID_REQUEST_PARAMETER))
    }
    
    if(departureStationCode  && arrivalStationCode  && tarifCode  && !(validationHelper.codeValidate(departureStationCode)) 
        && !(validationHelper.codeValidate(arrivalStationCode)) && !(validationHelper.codeValidate(tarifCode))){
            console.log('station')
            return res.send(errorResponse.errorHandler(errorResponse.badRequest, errorMessage.INVALID_REQUEST_PARAMETER))
    }
    
    const user = await auth.getUserCode(req);
    // const claimResult = await getClaimByCode(code);
    // console.log(claimResult)
    const body = JSON.stringify({
        updateClaimClientRequest :{
            header:{
                namespace : "Oncf.ma/DataContracts/2020/02/Complaints/Gateway/v1",
                version:"1.0"
            },
            body:
            {
                code : code,                
                departureStationCode: departureStationCode ? departureStationCode : null,
                arrivalStationCode: arrivalStationCode ? arrivalStationCode : null,
                trainNumber: trainNumber ? trainNumber : null,
                travelDate: travelDate ? travelDate : null,
                categoryCode: categoryCode ? categoryCode : null,
                subCategoryCode: subCategoryCode ? subCategoryCode : null,
                subSubCategoryCode: subSubCategoryCode ? subSubCategoryCode : null,  
                claimSubject: claimSubject ? claimSubject : null,
                claimDetails: claimDetails ? claimDetails : null,                                
                claimChannel: claimChannel ? claimChannel : null,
                claimCode: claimCode ? claimCode : null,
                claimSourceCode: claimSourceCode ? claimSourceCode : null,
                claimStationCode: claimStationCode ? claimStationCode : null,
                eventLocation: eventLocation ? eventLocation : null,
                eventStationCode: eventStationCode ? eventStationCode : null,
                trainClassificationCode: trainClassificationCode ? trainClassificationCode : null,
                tarifCode: tarifCode ? tarifCode : null,
                departureHour: departureHour ? departureHour : null,
                arrivalHour: arrivalHour ? arrivalHour : null,
                eventDate: eventDate ? eventDate : null          
            }
        },
        token: user.accessToken,
        rootCallId: reqid
    })
    //console.log(body)
    const extraHeader = {
        "Accept-Language":req.swagger.params['Accept-Language'].raw
    }
    const option = optionHelper.createOption(`${webUrl.FRONT_URL}UpdateClaimClient `,extraHeader,body,null)
    const response = await actionHelper.actionHandler(option,'updateClaimClientResponse')
    if(response.isSuccess){         
        // below called for log function
        logHelper.LogCallEnd(reqid,"UpdateClaimByAgent", "ExpressJs",response.error.errorCode,response.error.errorMessage)
        customResponse.isSuccess=true;
        customResponse.data = response.data;
        customResponse.error = {error :"",errorDescription : ""}
        return res.send(customResponse);
    }else{         
         // below called for log function
         logHelper.LogCallEnd(reqid,"UpdateClaimByAgent", "ExpressJs", response.error.errorCode,response.error.errorMessage)
        return res.send(response.errorData);
    }
}

const approvedClaim = async function(req, res){    
    // below reqid is callId for log function
    let reqid = uuid()
    logHelper.LogCallStart(reqid, "ApprovedClaim", "Express Js", "ApprovedClaim api is started successfully")
    const user = await auth.getUserCode(req);
    const{claimCode, actionTaken} = req.swagger.params['body'].value
    //console.log(claimCode,)
    if(actionTaken && !validationHelper.codeValidate(claimCode))
    {
        return res.send(errorResponse.errorHandler(errorResponse.badRequest, errorMessage.INVALID_REQUEST_PARAMETER))
    }
    const body = JSON.stringify({
        approveClaimClientRequest:{
            header:{
                namespace : "",
                version : ""
            },
            body:
              {                  
                claimCode: claimCode,
                actionTaken: actionTaken || "ActionTaken"                  
              }
          },
        token: user.accessToken,
        rootCallId: reqid
    })
    const extraHeader = {
        "Accept-Language":req.swagger.params['Accept-Language'].raw
    }
    const option = optionHelper.createOption(`${webUrl.FRONT_URL}ApproveClaimByAgent`,extraHeader,body,null)
    const response = await actionHelper.actionHandler(option,'claimClientResponse')
    if(response.isSuccess){        
        // below called for log function
        logHelper.LogCallEnd(reqid,"ApprovedClaim", "ExpressJs",response.error.errorCode,response.error.errorMessage)
        customResponse.isSuccess=true;
        customResponse.data = response.data;
        customResponse.error = {error :"",errorDescription : ""}
        return res.send(customResponse);
    }else{        
        // below called for log function
        logHelper.LogCallEnd(reqid,"ApprovedClaim", "ExpressJs", response.error.errorCode,response.error.errorMessage)
        return res.send(response.errorData);
    }   
}


/**
 * @description: below module.exports is for exporting all the controllers above
*/
module.exports = {
    getTicketAttachment,
    getClaimAttachment,
    updateTicketAttachment,    
    getClaimByCode,
    getClaims,
    createClaimByAgent,
    getClaimChannels,
    updateClaimByAgent,
    approvedClaim,
    updateClaimAttachment        
}