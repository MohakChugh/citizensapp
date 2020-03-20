var express = require('express');
var router = express.Router();

const controller = require('../controllers/controller')
// Users API Route

router.route('/insertUser')
    .post(controller.insertUser);

router.route('/getUserByEmail')
    .post(controller.getUserByEmail);

router.route('/getUserPassword')
    .post(controller.getUserPassword);

// Problems

router.route('/insertProblem')
    .post(controller.insertProblem);

router.route('/getProblem')
    .get(controller.getProblem);

router.route('/getProblemByAreaID')
    .post(controller.getProblemByAreaID);

router.route('/getProblemByUser')
    .post(controller.getProblemByUser);

router.route('/getProblemByDepartent')
    .post(controller.getProblemByDepartent);

router.route('/upvoteProblem')
    .post(controller.upvoteProblem);

router.route('/downvoteProblem')
    .post(controller.downvoteProblem);

router.route('/deleteProblem')
    .post(controller.deleteProblem);

router.route('/digiSignProblem')
    .post(controller.digiSignProblem);

router.route('/verifyDigiSign')
    .post(controller.verifyDigiSign);
// Government

router.route('/insertOfficial')
    .post(controller.insertOfficial);

router.route('/getOfficialPassword')
    .post(controller.getOfficialPassword);

router.route('/getOfficialByArea')
    .post(controller.getOfficialByArea);


module.exports = router;
