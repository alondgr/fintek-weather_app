const express = require('express');
const router = express.Router();
const controller = require('./controller')

router.get('/weather/:location', controller.search);

module.exports = router;


















































