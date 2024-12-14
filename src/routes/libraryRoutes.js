const express = require('express');
const router = express.Router();
const libraryController = require('../controllers/libraryController');
const { validateBorrow, validateReturn } = require('../middleware/validators');

router.post('/order', validateBorrow, libraryController.borrowItem);
router.post('/return', validateReturn, libraryController.returnItems);

module.exports = router;