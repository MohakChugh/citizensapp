const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const salt = 10;

/**
 * 
 * @param {number} problemid 
 * @param {number} userid 
 */
const digitalSignature = async (problemid, userid) => {
    // hex is generated
    let hex = problemid.toString() + userid.toString()
    let encryptedHex = ''

    // hex is encrypted and saved in encryptedhex
    encryptedHex = await bcrypt.hash(hex, salt)
        .then(async hash => {
            encryptedHex = hash
            return encryptedHex
        })
    
    // encryptedhex is signed
    let digitalSign = jwt.sign({ encryptedHex }, config.EncryptionSecretKey)

    // encrypted hex is returned
    return digitalSign
}

/**
 * 
 * @param {string} signature 
 * @param {number} problemid 
 * @param {number} userid 
 */
const verifyDigitalSignature = async (signature, problemid, userid) => {
    var decodedstring = ''

    // generating new hex for comparision
    let hex = problemid.toString() + userid.toString()

    decodedstring = await jwt.verify(signature, config.EncryptionSecretKey, (err, dec) => {
        decodedstring = dec.encryptedHex
        return decodedstring
    });
    // decoded stores encrypted value

    let isVerified = await bcrypt.compare(hex, decodedstring)
    return isVerified
}

exports.verifyDigitalSignature = verifyDigitalSignature
exports.digitalSignature = digitalSignature