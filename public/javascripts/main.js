function togglePostEdit() {
  const editPosts = document.querySelectorAll('.post');

  editPosts.forEach((post) => {
    const showPost = post.querySelector('.show-post');
    const editPost = post.querySelector('.edit-post');

    showPost.addEventListener('dblclick', () => {
      post.classList.add('active');
    });

    editPost.addEventListener('dblclick', () => {
      post.classList.remove('active');
    });
  });
}

togglePostEdit();

function myFunction() {
  var x = document.getElementById("myDIV");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}