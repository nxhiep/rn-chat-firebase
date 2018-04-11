import * as CryptoJS from 'crypto-js';
import md5 from 'md5';

export function encryptPassword(account, password){
    var key = md5(account + '.' + password)
    return encryptByDES(password, key);
}

export function encryptByDES(message, key) {
    var keyHex = CryptoJS.enc.Utf8.parse(key);
    var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
        mode : CryptoJS.mode.ECB,
        padding : CryptoJS.pad.Pkcs7
    });
    console.log('encrypted', encrypted);
    return encrypted.toString();
};

export function decryptByDES(ciphertext, key) {
    var keyHex = CryptoJS.enc.Utf8.parse(key);
    var decrypted = CryptoJS.DES.decrypt({
        ciphertext : CryptoJS.enc.Base64.parse(ciphertext)
    }, keyHex, {
        mode : CryptoJS.mode.ECB,
        padding : CryptoJS.pad.Pkcs7
    });
    console.log('decrypted', decrypted);
    return decrypted.toString(CryptoJS.enc.Utf8);
};