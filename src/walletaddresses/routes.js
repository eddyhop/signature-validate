const express = require('express');

const { verifyTransaction } = require('./controller/index');

const router = express.Router();

router.post('', verifyTransaction);

module.exports = router;
