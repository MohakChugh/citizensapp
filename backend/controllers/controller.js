const sms = require('../sms/sms')
const digitalSignature = require('../digitalSignatures/digitalSignatures');
const gql = require('../database/query');

const insertUser = async (req, res) => {
    // get data
    let { phoneNumber, password, name, email, area } = req.body;

    if (!(phoneNumber && password && name && email && area)) {
        return res.json({
            error: 'invalid request',
            success: false,
            response: false,
        });
    }

    // Processing
    let resp = await gql.insertUser(phoneNumber, password, name, email, area);
    return res.json({
        error: false,
        success: true,
        response: resp,
    });
}

const getUserByEmail = async (req, res) => {
    let { email } = req.body;
    if (!(email)) {
        return res.json({
            error: 'invalid request',
            success: false,
            response: false,
        });
    }
    // Processing
    let resp = await gql.getUserByEmail(email);
    return res.json({
        error: false,
        success: true,
        response: resp,
    });
}

const getUserPassword = async (req, res) => {
    let { email } = req.body;
    if (!(email)) {
        return res.json({
            error: 'invalid request',
            success: false,
            response: false,
        });
    }
    // Processing
    let resp = await gql.getUserPassword(email);
    return res.json({
        error: false,
        success: true,
        response: resp,
    });
}

// Image url removed
const insertProblem = async (req, res) => {
    let { areaid, department, description, title, userid } = req.body;
    console.log(`${areaid}, ${department}, ${description}, ${title}, ${userid}`)
    // Call sms function here
    if (!(areaid && department && description && title && userid)) {
        return res.json({
            error: 'invalid request',
            success: false,
            response: false,
        });
    }
    // Processing
    let resp = await gql.insertProblem(areaid, department, description, title, userid);
    console.log(resp);
    // sms.sendsms(9810178257, "Your problem has been updated! Someone from our team will contact you soon! Thank you for reaching out to us!")
    return res.json({
        error: false,
        success: true,
        response: resp,
    });
}

const getProblem = async (req, res) => {

    // Processing
    let resp = await gql.getProblem();
    return res.json({
        error: false,
        success: true,
        response: resp,
    });
}

const getProblemByAreaID = async (req, res) => {
    let { areaid } = req.body;
    if (!(areaid)) {
        return res.json({
            error: 'invalid request',
            success: false,
            response: false,
        });
    }
    // Processing
    let resp = await gql.getProblemByAreaID(areaid);
    return res.json({
        error: false,
        success: true,
        response: resp,
    });
}

const getProblemByUser = async (req, res) => {
    let { userid } = req.body;
    if (!(userid)) {
        return res.json({
            error: 'invalid request',
            success: false,
            response: false,
        });
    }
    // Processing
    let resp = await gql.getProblemByUser(userid);
    return res.json({
        error: false,
        success: true,
        response: resp,
    });
}

const getProblemByDepartent = async (req, res) => {
    let { department } = req.body;
    if (!(department)) {
        return res.json({
            error: 'invalid request',
            success: false,
            response: false,
        });
    }
    // Processing
    let resp = await gql.getProblemByDepartent(department);
    return res.json({
        error: false,
        success: true,
        response: resp,
    });
}

const upvoteProblem = async (req, res) => {
    let { problemid } = req.body;
    if (!(problemid)) {
        return res.json({
            error: 'invalid request',
            success: false,
            response: false,
        });
    }
    // Processing
    let upvotes = await gql.fetchUpvoteProblem(parseInt(problemid));
    let resp = [];
    if (upvotes.problems) {
        resp = await gql.upvoteProblem(problemid, upvotes.problems[0].upvote + 1);
    }
    return res.json({
        error: false,
        success: true,
        response: resp,
    });
}

const downvoteProblem = async (req, res) => {
    let { problemid } = req.body;
    if (!(problemid)) {
        return res.json({
            error: 'invalid request',
            success: false,
            response: false,
        });
    }
    // Processing
    let downvotes = await gql.fetchDownvoteProblem(parseInt(problemid));
    console.log(downvotes)
    let resp = [];
    if (downvotes.problems) {
        resp = await gql.downvoteProblem(problemid, downvotes.problems[0].downvote + 1);
    }
    return res.json({
        error: false,
        success: true,
        response: resp,
    });
}

const deleteProblem = async (req, res) => {
    let { problemid } = req.body;
    if (!(data)) {
        return res.json({
            error: 'invalid request',
            success: false,
            response: false,
        });
    }
    // Processing
    return res.json({
        error: false,
        success: true,
        response: {
            "message": "response",
        },
    });
}

const digiSignProblem = async (req, res) => {
    let { problemid, userid } = req.body;
    if (!(problemid && userid)) {
        return res.json({
            error: 'invalid request',
            success: false,
            response: false,
        });
    }
    // Processing
    let digitalsign = await digitalSignature.digitalSignature(problemid, userid);
    let resp = await gql.insertDigitalSignatures(problemid, userid, digitalsign);
    let resp2 = await gql.increaseDigitalSignature(problemid, 1)
    console.log(resp)
    if (!resp) {
        return res.json({
            error: true,
            success: false,
            response: null,
        });
    }
    return res.json({
        error: false,
        success: true,
        response: "digitally signed",
    });
}

const insertOfficial = async (req, res) => {
    let { name, password, email, phone, department, areaid } = req.body;
    if (!(name, password, email, phone, department, areaid)) {
        return res.json({
            error: 'invalid request',
            success: false,
            response: false,
        });
    }
    // Processing
    let resp = await gql.insertOfficial(name, password, email, phone, department, areaid);
    return res.json({
        error: false,
        success: true,
        response: resp,
    });
}

const verifyDigiSign = async (req, res) => {

    let { signature, problemid, userid } = req.body;

    if (!(signature && problemid && userid)) {
        return res.json({
            error: 'invalid request',
            success: false,
            response: false,
        });
    }

    // Processing
    let resp = await digitalSignature.verifyDigitalSignature(signature, problemid, userid);

    if (!resp) {
        return res.json({
            error: true,
            success: false,
            response: null,
        });
    }

    return res.json({
        error: false,
        success: true,
        response: "digitally verified",
    });
}

const getOfficialPassword = async (req, res) => {

    let { email } = req.body;

    if (!(email)) {
        return res.json({
            error: 'invalid request',
            success: false,
            response: false,
        });
    }

    // Processing
    let resp = await gql.getOfficialPassword(email);

    return res.json({
        error: false,
        success: true,
        response: resp,
    });
}

const getOfficialByArea = async (req, res) => {

    let { areaid } = req.body;

    if (!(areaid)) {
        return res.json({
            error: 'invalid request',
            success: false,
            response: false,
        });
    }

    // Processing
    let resp = await gql.getOfficialByArea(areaid);

    return res.json({
        error: false,
        success: true,
        response: resp,
    });
}

exports.insertUser = insertUser
exports.getUserByEmail = getUserByEmail
exports.getUserPassword = getUserPassword
exports.insertProblem = insertProblem
exports.getProblem = getProblem
exports.getProblemByAreaID = getProblemByAreaID
exports.getProblemByUser = getProblemByUser
exports.getProblemByDepartent = getProblemByDepartent
exports.upvoteProblem = upvoteProblem
exports.downvoteProblem = downvoteProblem
exports.deleteProblem = deleteProblem
exports.digiSignProblem = digiSignProblem
exports.insertOfficial = insertOfficial
exports.verifyDigiSign = verifyDigiSign
exports.getOfficialPassword = getOfficialPassword
exports.getOfficialByArea = getOfficialByArea