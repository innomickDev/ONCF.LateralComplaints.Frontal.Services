const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const regBase64 = /^[a-zA-Z0-9\+/]*={0,3}$/i;
const regPassword = /^(?=.{8,})((?=.*\d)(?=.*[a-z])(?=.*[A-Z])|(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_])|(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])).*$/
const regex  =/(?=.{8,})((?=.*\d)(?=.*[a-z])(?=.*[A-Z])|(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_])|(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])).*/
const base64Type = {
    maxSize: 10485760,
    bmpType: "/9J/4",
    jpgType: "/9J/4",
    pngType: "IVBOR",
    pdfType: "JVBER",
    gifType: "ROIGO"
}

const validateEmail = function (email) {
    return regEmail.test(String(email).toLowerCase());
}

const validatePassword = function (paasword) {
    return regPassword.test(String(paasword));
}
const validatePassword1 = function(newPassword){

    if(regex.test(newPassword)){
    return false
    }
    return true
}
const validateInt = function (depCode, arvCode, catCode, subCode) {
    if (Number(depCode) > 0 && Number(arvCode) > 0 && Number(catCode) > 0 && Number(subCode) > 0) {
        return true;
    } else {
        return false
    }
}

const validateAttachment = function (base64Value) {
    var fileSize = String(base64Value).length
    var fileType = String(base64Value).substring(0, 5).toUpperCase();
    if ((fileSize) % 4 == 0 && String(base64Value).match(regBase64) && (fileSize < base64Type.maxSize)) {
        if ((base64Type.bmpType == fileType) || (base64Type.jpgType == fileType) || (base64Type.pdfType == fileType)
            || (base64Type.gifType == fileType) || (base64Type.pngType == fileType)) {
            return true
        }
        else {
            return false
        }
    }
    return false
}

const codeValidate = function (id) {
    if (parseInt(id) > 0) {
        return true
    }
    else {
        return false
    }
}

function createRandomPassword(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

module.exports = {
    validateEmail,
    validateInt,
    validateAttachment,
    codeValidate,
    createRandomPassword,
    validatePassword,
    validatePassword1
}