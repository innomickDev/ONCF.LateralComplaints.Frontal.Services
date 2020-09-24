const fs = require('fs')
const _ = require('lodash')
const path = require('path')
const actionHelper = require("../helpers/actionHelper")
const optionHelper = require("../helpers/optionParameterHelper")
const globalConst = require("../../config/global")
const eCache = require("./eCache.js");
const log4js = require("log4js");

log4js.configure({
    appenders: { trainType: { type: 'file', filename: 'cache.log' } },
    categories: { default: { appenders: ['trainType'], level: 'error' } }
});

const logger = log4js.getLogger('trainTypes');

const getTrainTypeList = function() {
    const trainTypeDataPath = eCache.getDataFilePath("trainTypes");
    const data = fs.readFileSync(trainTypeDataPath, "utf8")
    const result = JSON.parse(data)
    return {listClassification: result}
}

const getTrainTypeByCode = function(trainTypeCode){
    const trainTypeObject = _.find(getTrainTypeList().listClassification, {codeTrainType: String(trainTypeCode)})
    return trainTypeObject
}

const synchronize = async function() {
    // set request parameters
    //return false;
    const body = JSON.stringify({
        classificationRequest : {
            head: {
                namespace: "",
                version: ""
            },
            body: {}
        }
    })    
    const option = optionHelper.createOption(`${globalConst.ECOMMERCE_URL}GetListClassification`, null, body, null)
    const response = await actionHelper.globalActionHandler(option, 'classificationResponse')    
    if (response.isSuccess && response.data && response.data.listClassification) {
        eCache.setCache("trainTypes", response.data.listClassification);
    } 
    else if(response.data == null){
        eCache.setCache("trainTypes", []);
    }   
    else {
        logger.level = "error"
        logger.error("error on setting cache at" + new Date().toDateString());
    }
}

//synchronize();

module.exports = {
    getTrainTypeByCode,
    getTrainTypeList,
    synchronize    
}