
/* Toggle Edit or View Post */

function togglePostViewEdit() {
  const posts = document.querySelectorAll('.post-container');
  const body = document.querySelector('body');

  posts.forEach((post) => {
    const showPost = post.querySelector('.show-post');
    const editPost = post.querySelector('.edit-post');

    showPost.addEventListener('dblclick', () => {
      post.classList.add('active');
    });
    body.addEventListener('click', () => {
      if(!editPost.contains(event.target)) post.classList.remove('active');
    });
  });
}

togglePostViewEdit();

/* ---------------------------------------- */

/* Toggle Edit or View Title */

function toggleTitleViewEdit() {
  const body = document.querySelector('body');
  const showTitle = document.querySelector('.view-board-title');
  const editTitle = document.querySelector('.edit-board-title');
  const title = document.querySelector('.title')

    showTitle.addEventListener('click', () => {
      title.classList.add('active');
    });
    body.addEventListener('dblclick', () => {
      if(!editTitle.contains(event.target)) title.classList.remove('active');
    });
  }


toggleTitleViewEdit();