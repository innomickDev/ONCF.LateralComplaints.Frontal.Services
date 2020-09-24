let pki = require('node-forge').pki;
let fs = require('fs');

let caCert;
let caStore;

try {
    caCert = fs.readFileSync('C:/Users/admin/Downloads/certificate/server.crt').toString();
    caStore = pki.createCaStore([ caCert ]);
    console.log(caCert,caStore)
} catch (e) {
    console.log('Failed to load CA certificate (' + e + ')');
    return;
}

try {
    pki.verifyCertificateChain(caStore, [ caCert ]);
} catch (e) {
    console.log(e)
}