
const express       = require('express');
const router = express.Router();
const textcontroller  = require('../../controllers/textController')

router.get("/Serial1",textcontroller.Serial1);

module.exports = router;