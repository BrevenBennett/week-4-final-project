function showMovies(title) {
  localStorage.setItem("title", title);
  window.location.href = `${window.location.origin}/movie.html`;
}

function searchHTML(title) {
  return `<button class="header__btn" onclick="showMovies(${title})">
    <i class="fa-solid fa-magnifying-glass"></i>
  </button>`;
}