const express = require('express');
const router = express.Router();
const boardCtrl = require('../controllers/boards');
const ensureLoggedIn = require('../config/ensureLoggedIn');

/* ------------------INDEX PAGE----------------------- */

// Access Board Index page, get all boards
router.get('/boards', ensureLoggedIn, boardCtrl.boardIndex);

//Create a Board
router.post('/boards', ensureLoggedIn, boardCtrl.newBoard);

//Show Board Detail
router.get('/boards/:id', ensureLoggedIn, boardCtrl.showBoard);

/* --------------DETAILS PAGE---------------------- */

//Update this Board
router.put('/boards/:id', ensureLoggedIn, boardCtrl.updateBoard);

//Delete this Board
router.delete('/boards/:id', ensureLoggedIn, boardCtrl.deleteBoard);

//Create a Post Form
router.post('/boards/:id/posts', ensureLoggedIn, boardCtrl.newPost);

//Update a Post Form
router.put('/posts/:id', ensureLoggedIn, boardCtrl.updatePost);

//Delete a Post Form
router.delete('/posts/:id', ensureLoggedIn, boardCtrl.deletePost);



module.exports = router;