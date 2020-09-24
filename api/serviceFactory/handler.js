const station = require("./stationServiceFactory");
const category = require("./categoryServiceFactory");
const subCategory = require("./subCategoryServiceFactory");
const subSubCategory = require("./subSubCategoryServiceFactory");
const tarif = require("./tarifServiceFactory");
const trainType = require("./trainTypeServiceFactory");
const channel = require("./channelServiceFactory");

const handle = async function () {
    let instances = [
        station,
        category,
        subCategory,
        subSubCategory,
        trainType,
        tarif,
        channel
    ];
    await Promise.all(instances.map(async _instance => {
        await _instance.synchronize();
    }))
    return false;
}
//will be uncommented when cronTab api is running
//handle()
module.exports = {
    handle
}