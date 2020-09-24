const webUrl = require('../../config/global')
const actionHelper = require('./actionHelper')
const optionHelper = require("./optionParameterHelper")
const _ = require('lodash')
const {uuid} = require('uuidv4')
const customResponse = require("../../config/globalResponse").customResponse
const dataModifier = require('../helpers/modifyData')
const cache = require('../../config/global').isCache
const stationServiceFactory = require('../serviceFactory/stationServiceFactory')
const categoryServiceFactory = require('../serviceFactory/categoryServiceFactory')
const subCategoryServiceFactory = require('../serviceFactory/subCategoryServiceFactory')
const subSubCategoryServiceFactory = require('../serviceFactory/subSubCategoryServiceFactory')
const tarifServiceFactory = require('../serviceFactory/tarifServiceFactory')
const trainTypeServiceFactory = require('../serviceFactory/trainTypeServiceFactory')
const channelServiceFactory = require('../serviceFactory/channelServiceFactory')

const getCategoryByCode = async function(catCode){
    try {
        if (cache) {
            const result = categoryServiceFactory.getCategoriesList()            
            const categoryObject = _.find(result.categoryClients, {code: String(catCode)})
            //console.log(categoryObject)
            if (categoryObject) {                
                return categoryObject;
            }
            else {
                return ''
            }
        }
        else
        {
            const body = JSON.stringify({
                getCategoryClientsRequest:{
                    header:{
                        namespace:"",
                        version:""
                    },
                    body:{}
                    },
                })
            const options = optionHelper.createOption(`${webUrl.FRONT_URL}GetListCategory`,null,body,null)
            const response = await actionHelper.actionHandler(options,'categoryClientResponse')
            const categoryObject = _.find(response.data.categoryClients, {code: String(catCode)})
            return categoryObject
    
        }
    } catch (error) 
    {
        return ''
    }    
}

const getStationByCode = async function(depCode){
    try {
        if (cache) {
            const result = stationServiceFactory.getStationsList()
            const stationObject = _.find(result.listGare, {codeGare: String(depCode)})                        
            if (stationObject) {                
                return stationObject;
            }
            else {
                return ''
            }
        }
        else
        {
            const body = JSON.stringify({ 
                gareRequest:{
                    head:{
                        namespace : "Oncf.ma/DataContracts/2020/02/Ecommerce/Gateway/v1",
                        version : "1.0"
                    },
                    body:{}
                    }
            })
            const option = optionHelper.createOption(`${webUrl.ECOMMERCE_URL}GetListGare`,null,body,null)
            const response = await actionHelper.stationActionHandler(option, 'gareResponse')
            //console.log(response)
            if(response.isSuccess){
                const stationObject = _.find(response.data.listGare, {codeGare: String(depCode)})            
                return stationObject
            }        
            return ''
    
        }
    } catch (error) 
    {
        return ''
    }    
}


const getSubCategoryByCode = async function(subCode){
    try {
        if (cache) {
            const result = subCategoryServiceFactory.getSubCategoriesList()
            const subCategoryObject = _.find(result.subCategoryClients, {code: String(subCode)}) 
            if (subCategoryObject) {                
                return subCategoryObject;
            }
            else {
                return ''
            }
        }
        else{
            const body = JSON.stringify({
                getSubCategoryClientsRequest:{
                    header:{
                        namespace:"",
                        version:""
                    },
                    body:{}
                    }
                })
            const option = optionHelper.createOption(`${webUrl.FRONT_URL}GetListSubCategory`,null,body,null)
            const response = await actionHelper.actionHandler(option,'subCategoryClientResponse')
            const subCategoryObject = _.find(response.data.subCategoryClients, {code: String(subCode)})    
            return subCategoryObject
        }
        
    } catch (error) {
        return ''
    }    
}

const getSubSubCategoryByCode = async function(subSubCode){
    try {
        if (cache) {
            const result = subSubCategoryServiceFactory.getSubSubCategoriesList()            
            const subSubCategoryObject = _.find(result.subSubCategoryClients, {code: String(subSubCode)})  
            if (subSubCategoryObject) {                
                return subSubCategoryObject;
            }
            else {
                return ''
            }
        }
        else{
            const body = JSON.stringify({
                getSubSubCategoryClientsRequest:{
                    header:{
                        namespace:"",
                        version:""
                    },
                    body:{}
                    }
                })
            const option = optionHelper.createOption(`${webUrl.FRONT_URL}GetListSubSubCategory`, null, body, null)
            const response = await actionHelper.actionHandler(option,'subSubCategoryClientResponse')
            const subSubCategoryObject = _.find(response.data.subSubCategoryClients, {code: String(subSubCode)})    
            return subSubCategoryObject
        }
        
    } catch (error) {
        return ''
    }    
}


const getTarifByCode = async function(tarifCode){
    try {
        if (cache) {
            const result = tarifServiceFactory.getTarifList()
            const tarifObject = _.find(result.listTarif, {tarifId: Number(tarifCode)})  
            if (tarifObject) {                
                return tarifObject;
            }
            else {
                return ''
            }
        }
        else{
            const body = JSON.stringify({ 
                gareRequest:{
                    head:{
                        namespace : "Oncf.ma/DataContracts/2020/02/Ecommerce/Gateway/v1",
                        version : "1.0"
                    },
                    body:{}
                    }
            })
            const option = optionHelper.createOption(`${webUrl.ECOMMERCE_URL}GetListTarif`,null,body,null)
            const response = await actionHelper.globalActionHandler(option, 'tarifResponse')
            //console.log(response.data)
            if(response.isSuccess){
                const tarifObject = _.find(response.data.listTarif, {tarifId: Number(tarifCode)})  
                console.log(tarifObject)          
                return tarifObject
            }
            return ''
        }
        
    } catch (error) {
        return ''
    }
    
}

const getTrainTypeByCode = async function(trainTypeCode){
    try {
        if (cache) {
            const result = trainTypeServiceFactory.getTrainTypeList()
            const trainTypeObject = _.find(result.listClassification, {codeClassification: String(trainTypeCode)}) 
            if (trainTypeObject) {                
                return trainTypeObject;
            }
            else {
                return ''
            }
        }
        else{
            const body = JSON.stringify({ 
                gareRequest:{
                    head:{
                        namespace : "Oncf.ma/DataContracts/2020/02/Ecommerce/Gateway/v1",
                        version : "1.0"
                    },
                    body:{}
                    }
            })
            const option = optionHelper.createOption(`${webUrl.ECOMMERCE_URL}GetListClassification`,null,body,null)
            const response = await actionHelper.globalActionHandler(option, 'classificationResponse')
            //console.log(response)
            if(response.isSuccess){
                //const trainTypeObject = _.find(response.data.listClassification, {classificationId: Number(trainTypeCode)}) 
                const trainTypeObject = _.find(response.data.listClassification, {codeClassification: String(trainTypeCode)}) 
                console.log(trainTypeObject)           
                return trainTypeObject
            }
            return ''
        }
        
    } catch (error) {
        return ''
    }
    
}

const getClaimChannelByCode = async function(channelCode){
    try {
        if (cache) {
            const result = channelServiceFactory.getListChannel()
            const categoryObject = _.find(result.channelClients, {code: String(channelCode)})
            if (categoryObject) {                
                return categoryObject;
            }
            else {
                return ''
            }
        }
        else{
            const body = JSON.stringify({
                getChannelClientsRequest:{
                    header:{
                        namespace:"",
                        version:""
                    },
                    body:{}
                    },
                })
            const options = optionHelper.createOption(`${webUrl.FRONT_URL}GetListChannel`,null,body,null)
            const response = await actionHelper.actionHandler(options,'channelClientResponse')
            const categoryObject = _.find(response.data.channelClients, {code: String(channelCode)})
            return categoryObject
        }
        
    } catch (error) {
        return ''
    }    
}




const getTarifs = async function (req, res) {
    if (cache) {
        const result = tarifServiceFactory.getTarifList()
        if (result) {
            customResponse.isSuccess = true;
            customResponse.data = result;
            customResponse.error = { error: "", errorDescription: "" }
            return customResponse;
        }
        else {
            return ''
        }
    }
    else{
        let reqid = uuid()
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
            //logEnd.LogCallEnd(reqid, "GetTarifs", "ExpressJs", response.error.errorCode, response.error.errorMessage)
            customResponse.isSuccess = true;
            customResponse.data = response.data;
            customResponse.error = { error: "", errorDescription: "" }
            //return res.send(customResponse);
            return customResponse
        } else {            
            // below called for log function
            //logEnd.LogCallEnd(reqid, "GetTarifs", "ExpressJs", response.error.errorCode, response.error.errorMessage)
            //return res.send(response.errorData);
            return customResponse
        }
    }
    
}

const getTrainTypes = async function (req, res) { 
    if (cache) {
        const result = trainTypeServiceFactory.getTrainTypeList()
        if (result) {
            customResponse.isSuccess = true;
            customResponse.data = result;
            customResponse.error = { error: "", errorDescription: "" }
            return customResponse;
        }
        else {
            return ''
        }
    }
    else{
        let reqid = uuid() 
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
        //console.log(response)
        if (response.isSuccess) {            
            // below called for log function
            //logEnd.LogCallEnd(reqid, "GetTraintTypes", "ExpressJs", response.error.errorCode, response.error.errorMessage)
            customResponse.isSuccess = true;
            customResponse.data = response.data;
            customResponse.error = { error: "", errorDescription: "" }
            //return res.send(customResponse);
            return customResponse
        } else {        
            // below called for log function
            //logEnd.LogCallEnd(reqid, "GetTraintTypes", "ExpressJs", response.error.errorCode, response.error.errorMessage)
            //return res.send(response.errorData);
            return customResponse
        }
    }  
    
}

const getClaimChannels = async function(req, res){ 
    if (cache) {
        const result = channelServiceFactory.getListChannel()
        if (result) {
            customResponse.isSuccess = true;
            customResponse.data = result;
            customResponse.error = { error: "", errorDescription: "" }
            return customResponse;
        }
        else {
            return ''
        }
    }
    else{
        // below called for log function
        let reqid = uuid()    
        //const user = await auth.getUserCode(req);
            
        let body = { 
            getChannelClientsRequest:{
                header:{
                    namespace:"",
                    version:""
                },
                body:{
                    pagination:{
                        sortField: null,
                        sortDirection: null
                    },
                    search: null
                    }
                },
            //token: user.accessToken,
            rootCallId: reqid
        }
        
        body = JSON.stringify(body)    
        const extraHeader = {
            "Accept-Language": "fr-FR"
        }
        const option = optionHelper.createOption(`${webUrl.FRONT_URL}GetListChannel`,extraHeader,body,null)
        const response = await actionHelper.actionHandler(option,'channelClientResponse')
        //console.log(response)
        if(response.data == null){
            return null //res.send(errorResponse.errorHandler(errorResponse.resourceNotFound, errorMessage.NO_DATA_FOUND))
        }
        const result = response.data.channelClients
        //console.log(result)
        
        if(response.isSuccess){        
            // below called for log function
            //logEnd.LogCallEnd(reqid,"GetClaimChannels", "ExpressJs",response.error.errorCode,response.error.errorMessage)
            response.data = dataModifier.modifyData(response.data,"channelClients")
            customResponse.isSuccess=true;
            customResponse.data = response.data;
            customResponse.error = {error :"",errorDescription : ""} 
            //return res.send(customResponse);
            return customResponse
        }else{        
            // below called for log function
            //logEnd.LogCallEnd(reqid,"GetClaimChannels", "ExpressJs", response.error.errorCode,response.error.errorMessage) 
            //return res.send(response.errorData);
            return customResponse
        }
    }   
    
} 

const getCategories = async (req, res) => {   
    if (cache) {
        const result = categoryServiceFactory.getCategoriesList()
        if (result) {
            customResponse.isSuccess = true;
            customResponse.data = result;
            customResponse.error = { error: "", errorDescription: "" }
            return customResponse;
        }
        else {
            return ''
        }
    }
    else{
        let reqid = uuid()
        const body = JSON.stringify({
            getCategoryClientsRequest: {
                header: {
                    namespace: "",
                    version: ""
                },
                body: {
                    pagination: {
                        page: null,
                        pageSize: null,
                        sortField: null,
                        sortDirection: null
                    },
                    search: null
                }
            },
            rootCallId: reqid
        })
        const extraHeader = {
            "Accept-Language": "fr-FR"
        }
        const options = optionHelper.createOption(`${webUrl.FRONT_URL}GetListCategory`, extraHeader, body, null)
        const response = await actionHelper.actionHandler(options, 'categoryClientResponse')
        //console.log(response)
        if (response.isSuccess) {
            customResponse.isSuccess = true;
            customResponse.data = response.data;
            customResponse.error = { error: "", errorDescription: "" }
            //return res.send(customResponse);
            return customResponse
        } else {
            //return res.send(response.errorData);
            return customResponse
        }

    } 
    
}

const getSubCategories = async function(req, res){   
    if (cache) {
        const result = subCategoryServiceFactory.getSubCategoriesList()
        if (result) {
            customResponse.isSuccess = true;
            customResponse.data = result;
            customResponse.error = { error: "", errorDescription: "" }
            return customResponse;
        }
        else {
            return ''
        }
    }
    else{
        let reqid = uuid()    
        const body = JSON.stringify({
            getSubCategoryClientsRequest:{
                header:{
                    namespace:"",
                    version:""
                },
                body:{
                    pagination:{
                        page: null,
                        pageSize:null,
                        sortField:null,
                        sortDirection:null
                    },
                    search:null
                    }
                },
            rootCallId: reqid
            })    
            const extraHeader = {
                "Accept-Language": "fr-FR"
            }
        const option = optionHelper.createOption(`${webUrl.FRONT_URL}GetListSubCategory`,extraHeader,body,null)
        const response = await actionHelper.actionHandler(option,'subCategoryClientResponse')
        //console.log(response)
        if(response.isSuccess){
            response.data = dataModifier.modifyData(response.data,"subCategoryClients")
            customResponse.isSuccess=true;
            customResponse.data = response.data;
            customResponse.error = {error :"",errorDescription : ""}
            //return res.send(customResponse);
            return customResponse
        }else{
            //return res.send(response.errorData);
            return customResponse
        }
    } 
    
}

const getSubSubCategories = async function(req, res){
    if (cache) {
        const result = subSubCategoryServiceFactory.getSubSubCategoriesList()
        if (result) {
            customResponse.isSuccess = true;
            customResponse.data = result;
            customResponse.error = { error: "", errorDescription: "" }
            return customResponse;
        }
        else {
            return ''
        }
    }
    else{
        let reqid = uuid()
        const body = JSON.stringify({
        getSubSubCategoryClientsRequest:{
            header:{
                namespace:"",
                version:""
            },
            body:{
                pagination:{
                    page:null,
                    pageSize:null,
                    sortField:null,
                    sortDirection:null
                },
                search:null,
                subCategoryCode: null
                }
            },
        rootCallId: reqid
        })
        const extraHeader = {
            "Accept-Language": "fr-FR"
        }
        const option = optionHelper.createOption(`${webUrl.FRONT_URL}GetListSubSubCategory`, extraHeader, body, null)
        const response = await actionHelper.actionHandler(option,'subSubCategoryClientResponse')
        const result = response.data.subSubCategoryClients
        //console.log(response)
        if(response.isSuccess){
            response.data = dataModifier.modifyData(response.data,"subSubCategoryClients")
            customResponse.isSuccess=true;
            customResponse.data =response.data;
            customResponse.error = {error :"",errorDescription : ""}
            //return res.send(customResponse);
            return customResponse
        }else{
            //return res.send(response.errorData);
            return customResponse
        }
    }
    
}

const getStations = async function (req, res) {
    if (cache) {
        const result = stationServiceFactory.getStationsList()
        if (result) {
            customResponse.isSuccess = true;
            customResponse.data = result;
            customResponse.error = { error: "", errorDescription: "" }
            return customResponse;
        }
        else {
            return ''
        }
    }
    else{
        let reqid = uuid()
        let body1 = {
            gareRequest: {
                head: {
                    namespace: "Oncf.ma/DataContracts/2020/02/Ecommerce/Gateway/v1",
                    version: "1.0"
                },
                body: {
                    pagination: {
                        sortField: null,
                        sortDirection: null
                    },
                    search: null
                }
            },
            rootCallId: reqid
        }
        
        body1 = JSON.stringify(body1)
        const option = optionHelper.createOption(`${webUrl.ECOMMERCE_URL}GetListGare`, null, body1, null)
        const response = await actionHelper.stationActionHandler(option, 'gareResponse')
        //console.log(response)
        if (response.isSuccess) {
            customResponse.isSuccess = true;
            customResponse.data = response.data;
            customResponse.error = { error: "", errorDescription: "" }
            //return res.send(customResponse);
            return customResponse
        } else {
            //return res.send(response.errorData);
            return customResponse
        }
    }
    
    }

    const identityErrorMessage = function(errorCode){
        switch(errorCode){
            case 0 : 
                return "à Opération réussie";                
            case 1 : 
                return "Validation échouée, Veuillez vérifier les informations saisies";
            case 2 : 
                return "à Une erreur est survenue, veuillez réessayer ultérieurement";
            case 8 : 
                return "à Votre compte est verrouillé, Veuillez l’activer"
            case 9 : 
                return "à Votre compte est bloqué, Veuillez l’activer"
            case 10 : 
                return "à Compte utilisateur introuvable"
            case 11 : 
                return "à Authentification échouée"
            case  999 :
                return "Une erreur est survenue, veuillez réessayer ultérieurement"
            case 9999: 
                return "Une erreur est survenue, veuillez réessayer ultérieurement."
        }
    
    }
    


module.exports = {
    getCategoryByCode,
    getStationByCode,    
    getSubCategoryByCode,
    getSubSubCategoryByCode,
    getTrainTypeByCode,
    getTarifByCode,
    getClaimChannelByCode,
    getTarifs,
    getTrainTypes,
    getClaimChannels,
    getCategories,
    getSubCategories,
    getSubSubCategories,
    getStations,
    identityErrorMessage
}