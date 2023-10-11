function showMovies(id) {
  localStorage.setItem("id", id);
  window.location.href = `${window.location.origin}/movie.html`;
}

function searchHTML(movie) {
  return `<form action="" id="form" onsubmit="${showMovies(movie)}">
  <input type="text" placeholder="Find your movie!" />
  <div class="header__btn--wrapper">
    <button class="header__btn">
      <i class="fa-solid fa-magnifying-glass"></i>
    </button>
  </div>
</form>`;
}
