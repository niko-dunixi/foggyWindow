var msg = "Arbitrary Message Here."
var rsa = forge.pki.rsa;
var keypair = rsa.generateKeyPair({bits: 2048, e: 0x10001});
var ct = btoa(keypair.publicKey.encrypt(msg));
console.log(keypair.privateKey.decrypt(atob(ct)));

var nHere = JSON.stringify(keypair.publicKey.n);
var eHere = JSON.stringify(keypair.publicKey.e);
var newRsa = rsa.setPublicKey(JSON.parse(nHere), JSON.parse(eHere));
var newCt = btoa(newRsa.encrypt(msg));




var msg = "Arbitrary Message Here."
var rsa = forge.pki.rsa;
var keypair = rsa.generateKeyPair({bits: 2048, e: 0x10001});
var ct = btoa(keypair.publicKey.encrypt(msg));
console.log(keypair.privateKey.decrypt(atob(ct)));

var nHere = keypair.publicKey.n;
var eHere = keypair.publicKey.e;
var newRsa = rsa.setPublicKey(nHere, eHere);
var newCt = btoa(newRsa.encrypt(msg));