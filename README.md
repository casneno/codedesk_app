# CodeDesk

### All note-taking resources a prominent code student needs!
While learning to code and even during your coding sessions as a prominent developer have you ever felt like there was just so much new information being thrown at you at the same time that you had little to no time to take notes? Ever had a code snippet you really wanted to keep and comment but had no where to store it, other than a VS file? Or maybe even foudn yourself havinag to run multiple note-taking apps to manage all your notes, codes and references? If you answered yes to any of teh questions above, then CodeDesk is for you. 
### Description & Motivation
This CodeDesk app is the second of four projects in the General Assembly SEI Course.  The purpose of this project was for us to apply our knowledge of the second part of the course. This app was a solo development over the course of one week.  The game was developed using the following technologies: 
![HTML5](https://img.shields.io/badge/-HTML5-05122A?style=flat&logo=html5) ![CSS3](https://img.shields.io/badge/-CSS-05122A?style=flat&logo=css3) ![JavaScript](https://img.shields.io/badge/-JavaScript-05122A?style=flat&logo=javascript)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

### Try it out!
Since this is a free Web-based app, anyone can play it without any requirements. Just click this [link](https://codedesk-71e7862f6501.herokuapp.com/) to test the app!


### How to Use
Upon login you will be stationed in your virtual desk.  For now, the only functionality that has been implemented is the Post-its board.  Within the board, you will be able to generate new boards and within them, create and delete new posts, edit the board name, etc..

### Project Planning

The tool was first conceived within the Wireframe displayed below and it's display and functionalities were gradually improved as the development progressed.  The ERD was created taking into consideration future features of the app, such as the notebook and the laptop.  The steps were organized acording to a Pseudocode (see below) and the development stages were checked and added/removed using Evernote.

|CodeDesk Wireframe| [CodeDesk Wireframe](https://github.com/casneno/codedesk_app/blob/main/public/images/Desktop%20Wireframe.png)
|CodeDesk ERD| [CodeDesk ERD]("\\wsl.localhost\Ubuntu\home\lucasneno\code\codedesk_app\public\images\CodeDesk ERD.png")


### Pseudocode

Below is teh initial Pseudocode from the project:

* The user is prompted a login screen when first accessing the site
* Oauth kicks in
* User redirected to his desk page
* MYDESK PAGE
* User clicks in the board, flashing icon
* BOARD MENU
* User creates one or more boards OR
* User access one board OR
* User returns to myDesk
* BOARD PAGE
* He then creates as many post-its as he likes
* Double-click on a postit will render edit mode for the user to edit a post
* User can delete the Board or a post-it here
* User will be able to return to Board Menu

## Building the Code

From the start I wanted the app to be scaleable, which meant that the database would have to be coded in a way to accomodate for future modifications. This took me down the path of using referencing as the primary method of associating collections.
The user is referenced within the boards and these are in turn referenced by and to the posts.  Each user can have as many boards as he like and as many posts in each of these boards, but each post is unique to it's board.

I decided to start with the post-it functionallity which seemed to be the basis for everything to come.  By having posts written I would be able to then integrate them with the notebooke and laptop functionalities.
  
The first step involved generating the initial document structure using Express and setting up all of the packages I needed, including: Mongoose (for database operations), method-override (for updating and deleting) and Passport (for credentials).  Then I proceded to setting up my database: a .env file was setup to include the environmental variables, together with my database file with mongoose and finally a noSQL database in Atlas MongoDB.

Once the database was setup I continued by defining the Schemas: one for the User, onde for Boards and one for Post-Its in a models folder.  Then, I set up the routers that I was planning on using.  In my case I had a login router, a myDesk router to hadle future app expansion and one boards router to handle all of the CRUD in the PostIt section of the app.  With the routers in place I proceded to sketching in the Views a basic HTML and CSS, atributing Ids and classes to elements to begin positioning them on screen in order to get a very basic layout of what was to come. 


Once I was satisfied with the layout, I proceded to setting up authentication through OAuth in Google, since some aspects of my app would require them.  Finally, I proceded to apply a user-centric CRUD approach to the elements, starting at the homepage and working my way to the Post-It page.

Once the entire site was fuctional and the database responsive, I carried on to doing some improvements: 
- I eliminated the post Edit page and implemented editing capabilities by double-clicking a PostIt, using a JavaScript form with event listeners.  The same was also later done for the board's title and description.  
- Also, I tweaked the CSS so that the page would appear less static: gave the Add Boards and PostIts buttons some shading and effects and 
- Lastly, I created some 'tutorial' animations to orient first-time users as to where they should click when they first get started.

Below are a few snippets of some of the CRUD functionalities, the HTML and Routes as well as images of the final product:

| Board Menu | [Board Menu]("\\wsl.localhost\Ubuntu\home\lucasneno\code\codedesk_app\public\images\Board Menu.png")
| Boards Screen with Post-Its| [Board Screen]("\\wsl.localhost\Ubuntu\home\lucasneno\code\codedesk_app\public\images\Board Page.png")

*Display, Add, Delete and Delete Posts in the same page*
```sh
<div class="board">
  <% board.posts.forEach(function(post) { %> 
    <div class="post post-container">
      <div class="post show-post">
        <p><%= post.content %></p>
        <form class="delete-post-button" action="/posts/<%= post._id %>?_method=DELETE" method="POST">
          <button class="delete-post-button" type="submit">
            <svg class="X" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 25 20" overflow="visible" stroke="black" stroke-width="2" stroke-linecap="round">
              <line x2="20" y2="20" />
              <line x1="20" y2="20" />
            </svg>
          </button>
        </form>
      </div>
      <div class="edit-post">
        <form action="/posts/<%= post._id %>?_method=PUT" method="POST">
          <textarea class="edit-textarea" name="text"><%= post.content %></textarea>
          <button class="update-post-button" type="submit">Save Post</button>
        </form>
      </div>
    </div>
  <% }) %>
  <form action="/boards/<%= board._id %>/posts" method="POST">
    <button class="post add-post-it" type="submit">+</button>
  </form>
</div>
```

*Adding a new post*
```sh
 /* Add new post */
async function newPost(req, res) {
  try{
    const board = await Board.findById(req.params.id)
    const post = await PostIt.create({
      title: "New Post",
      content: "Click to add a comment...",
      favorite: false,
      board: req.params.id
    });
    board.posts.push(post._id)
    await board.save();
    console.log('post saved successfully')
  } catch (err) {
    console.log(err);
    res.redirect('/boards');
  };
  res.redirect(`/boards/${req.params.id}`);
}
```
*boards routes*
```sh
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
```

### Challenges

The app had a few challenges, namely the implementation of the update function that required for a previous JavaScript to be run in order to enable the edit features in the page.  Also, most of my CRUD happens in the same page, so I had to adjust the code to the req.params.id or appropriate reference, making food use of the Mongoose library methods.  Finally, the CSS was a challenge and if I were to restart the projects, I would have taken time to study and apply a framework, such as Bootstrap to make life a bit easier.  

### Wins

Having implemented successfully the first part of my app was a win itself! Although basic in fucnitonality, I am proud of the interface and the result as a whole. 

### Key Learnings

 * DEBUGGING through DevTools and console.logs.
 * How to CRUD and how to adjust the code, depending on how the routing was mounted.~
 * Oauth Authentication and Implementation
 * How to use the Mongoose library and MongoDB

### Bugs

* The MVP version has no Bugs in it and is fully functional.

### Future Improvements

Here is a list of future improvements:
 * Allow for post-its to be draggable
 * Include an inventory toolbar to allow for psot-its to be shared with other users or to be placed in other boards
 * Include the Notebook feature for users to keep their notes organized, with search and index features.
 * Include the Laptop feature for users to save useful code blocks and comment them.
