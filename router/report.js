const express = require('express');
const router = express.Router();
const reportController = require('../controller/reportController');
const auth = require('../middleware/auth');

//@route    POST api/report
//@desc     This is a report generation route
//@access   Private

router.get("/generate-reports",auth,reportController.generateReports);

//@route    POST api/report/:id
//@desc     This is a report generation route for a particular Character
//@access   Private

router.get("/generate-reports/:id",auth,reportController.generateCharacterReport);

module.exports = router;