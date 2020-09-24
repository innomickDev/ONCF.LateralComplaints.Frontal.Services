//const env = require("dotenv")
//env.config({ path: '.././.env' });
// Comment above code b'z env variable not loading properly
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const BASE_URL = process.env.BASE_URL;
const BO_URL = process.env.BO_URL;
const BOUSER_URL = process.env.BOUSER_URL;
const FRONT_URL = process.env.FRONT_URL;
const ACTIVATE_ACCOUNT = process.env.ACTIVATE_ACCOUNT;
const LOGGING_URL = process.env.LOGGING_URL;
const ECOMMERCE_URL = process.env.ECOMMERCE_URL;
const IDENTITY_URL = process.env.IDENTITY_URL;
const MIN_PASSWORD_LENGTH = process.env.MIN_PASSWORD_LENGTH;
const is_Deployed = false;
const isCache = process.env.IS_CACHE == 1 ? true : false;
const claim_source = "GRC"; //"GRC";
const IS_PRODUCTION = false;// will change depend on dev or prod
//console.log(process.env)
module.exports = {
  BASE_URL,
  BO_URL,
  BOUSER_URL,
  FRONT_URL,
  ACTIVATE_ACCOUNT,
  LOGGING_URL,
  ECOMMERCE_URL,
  is_Deployed,
  claim_source,
  isCache,
  IS_PRODUCTION,
  IDENTITY_URL,
  MIN_PASSWORD_LENGTH
};