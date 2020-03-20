const axios = require('axios')
const smskey = require('../config/config')

const sendsms = async (phoneNumber, message) => {
    // todo: move api key to config folder
    const url = `http://2factor.in/API/V1/${smskey.smsApiKey}/ADDON_SERVICES/SEND/PSMS`
    var form = {
        From: "Citizens App",
        To: phoneNumber,
        Msg: message
    }

    let result = axios.default.post(url, form)
        .then(resp => {
            return resp
        })
        .catch(err => {
            return err
        })
    return result
}

exports.sendsms = sendsms
