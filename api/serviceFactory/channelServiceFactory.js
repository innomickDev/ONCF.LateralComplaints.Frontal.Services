const fs = require('fs')
const _ = require('lodash')
const actionHelper = require("../helpers/actionHelper")
const optionHelper = require("../helpers/optionParameterHelper")
const globalConst = require("../../config/global")
const eCache = require("./eCache");
const log4js = require("log4js");
log4js.configure({
    appenders: { channels: { type: 'file', filename: 'cache.log' } },
    categories: { default: { appenders: ['channels'], level: 'error' } }
});

const logger = log4js.getLogger('channels');

const getListChannel = function() {
    const channelPath = eCache.getDataFilePath("channels")
    const data = fs.readFileSync(channelPath, "utf8")
    const result = JSON.parse(data)
    return {channelClients: result}
}

const synchronize = async function() {
    // set request parameters
    const body = JSON.stringify({
        getListProfileRequest: {
            header: {
                namespace: "",
                version: ""
            },
            body: {

            }
        }
    })    
    const options = optionHelper.createOption(`${globalConst.FRONT_URL}GetListChannel`, null, body, null)
    const response = await actionHelper.actionHandler(options, 'channelClientResponse')    
        //save data to files
    if (response.isSuccess && response.data && response.data.channelClients) {
        eCache.setCache("channels", response.data.channelClients);
    }
    else if(response.data == null){
        eCache.setCache("channels", []);
    }    
    else {

        logger.level = "error"
        logger.error("error on setting cache at" + new Date().toDateString());
    }
}
//synchronize();

module.exports = {
    getListChannel,    
    synchronize
}