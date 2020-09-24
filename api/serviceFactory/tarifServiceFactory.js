const fs = require('fs')
const _ = require('lodash')
const actionHelper = require("../helpers/actionHelper")
const optionHelper = require("../helpers/optionParameterHelper")
const globalConst = require("../../config/global")
const eCache = require("./eCache.js");
const log4js = require("log4js");

log4js.configure({
    appenders: { tarif: { type: 'file', filename: 'cache.log' } },
    categories: { default: { appenders: ['tarif'], level: 'error' } }
});

const logger = log4js.getLogger('tarifs');

const getTarifList = function() {
    const tarifDataPath = eCache.getDataFilePath("tarifs");
    const data = fs.readFileSync(tarifDataPath, "utf8")
    const result = JSON.parse(data)
    return {listTarif: result}
}

const getTarifByCode = function(tarifCode){
    const tarifObject = _.find(getTarifList().listTarif, {codeTarif: String(tarifCode)})
    return tarifObject
}

const synchronize = async function() {
    // set request parameters
    //return false;
    const body = JSON.stringify({
        tarifRequest: {
            head: {
                namespace: "",
                version: ""
            },
            body: {}
        }
    })    
    const option = optionHelper.createOption(`${globalConst.ECOMMERCE_URL}GetListTarif`, null, body, null)
    const response = await actionHelper.globalActionHandler(option, 'tarifResponse')
    if (response.isSuccess && response.data && response.data.listTarif) {
        eCache.setCache("tarifs", response.data.listTarif);
    } 
    else if(response.data == null){
        eCache.setCache("tarifs", []);
    }   
    else {
        logger.level = "error"
        logger.error("error on setting cache at" + new Date().toDateString());
    }
}

//synchronize();

module.exports = {
    getTarifByCode,
    getTarifList,
    synchronize    
}