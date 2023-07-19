const { ConnectionPoolClosedEvent } = require('mongodb');
const Board = require('../models/boards')
const PostIt = require('../models/postit');
const user = require('../models/user');

module.exports = {
  boardIndex,
  newBoard,
  showBoard,
  deleteBoard,
  newPost,
  updatePost,
};

/* Display Boards Page */
async function boardIndex(req, res) {
  try {
    const boards = await Board.find({}).sort('position').populate('posts');
    res.render('boards', {  title: 'Boards', boards }); //here we send to an EJS file inside a folder
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
}

/* Create a new Board */
async function newBoard(req, res){
  try{
    const board = await Board.create({
      title: "New Board",
      description: "Insert a description for your board...",
      favorite: false,
      user: req.user._id, //adds user ID to this board
    });
    await board.save();
    console.log('board saved successfully')
    res.redirect('/boards')
  } catch (err) {
    console.log(err);
    res.redirect('/boards');
  }
}

/* Show Board Detail */

async function showBoard(req, res) {
  try{    
    const board = await Board.findById(req.params.id).populate('posts');
    const posts = await PostIt.find({ board: req.params.id});
    res.render(`boards/details`, {
      title: 'Board Details',
      board,
      posts,
    });
  } catch (err) {
    console.log(err);
    res.redirect('/boards');
  }
}


/* Delete Board */

async function deleteBoard(req, res) {
  await Board.findOneAndDelete({_id: req.params.id, user: req.user._id});
  // Deleted book, so must redirect to index
  res.redirect('/boards');
}


 /* Add new post */
async function newPost(req, res){
  try{
    const board = await Board.findById(req.params.id)
    const post = await PostIt.create({
      title: "New Post",
      content: "Now Post Text Here...",
      favorite: false,
      board: req.params.id
    })
    board.posts.push(post._id)
    await board.save();
    console.log('post saved successfully')
  } catch (err) {
    console.log(err);
    res.redirect('/boards');
  }
  res.redirect(`/boards/${req.params.id}`); //here we redirect to an URLL
}

/* Update Post */
async function updatePost(req, res){
  console.log("Checkpoint 1")
  const post = await PostIt.findById(req.params.id).populate('board');
  console.log(post)
  //console.log('ID:', req.params.id)
  try {
    //const update = await PostIt.findOneAndUpdate({_id:req.params.id}, {content: req.body.text})
    //if(!update) console.log('TEST FAILED');
    //const post = await PostIt.findById(req.params.id);
    // const boardId = await Board.findById({'post._id': req.params.id});
    //console.log(board._id)
    //const postSubdoc = board.posts.id(req.params.id);
    if(!post.board.user._id.equals(req.user._id)) return res.redirect(`/boards/${post.board._id}`);
    console.log("Checkpoint 1")
    post.content = req.body.text;
    await post.save();
  } catch (err) {
    console.log('error');
  }
  res.redirect(`/boards/${post.board._id}`);
}

function deletePost(){

}





/* javascript */


// const board = document.getElementById("board")
// const post = board.querySelector("post")
// const addPostIt = board.querySelector(".add-post-it")

// async function getPost(req, res){
//   const PostIt = await Board.findById(req.params.id).populate

// }


// function createPost (id, content){
  


//   const element = document.createElement("textarea")

//   element.classList.add("post-it");
//   element.value = content;
//   element.placeholder = "Write your note...";

//   element.addEventListener("change", ()=>{
//     updatePost(id, element.value);
//   });
// }