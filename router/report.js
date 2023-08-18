const express = require('express');
const router = express.Router();
const reportController = require('../controller/reportController');
const auth = require('../middleware/auth');

//@route    POST api/report
//@desc     This is a report generation route
//@access   Public

router.get("/generate-reports",auth,reportController.generateReports);


module.exports = router;