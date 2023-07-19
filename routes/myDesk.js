var express = require('express');
var router = express.Router();
const passport = require('passport');
const deskCtrl = require('../controllers/myDesk');
const ensureLoggedIn = require('../config/ensureLoggedIn');


/* GET myDesk page. */
router.get('/', ensureLoggedIn, deskCtrl.showDesk)


module.exports = router;