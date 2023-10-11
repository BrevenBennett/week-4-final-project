const moviesListEl = document.querySelector(".movie-list");
const searchTitleEl = document.querySelector(".header__movie--search");
const loadingSpinEl = document.querySelector(".movie__loading");
const sortEl = document.querySelector(".year__select");
const id = localStorage.getItem("id");

async function renderMovies(filter) {
  setTimeout(() => {
    loadingSpinEl.classList += " movie__loading--spinner";
  }, 500);

  moviesListEl.style.visibility = "hidden";

  const movies = await fetch(
    `http://www.omdbapi.com/?apikey=53de5b3d&s=${title}`
  );
  const moviesData = await movies.json();

  const moviesArray = moviesData.Search.slice(0, 6);

  if (filter === "Oldest_To_Newest") {
    moviesArray.sort((a, b) => b.Year - a.Year);
  } else if (filter === "Newest_To_Oldest") {
    moviesArray.sort((a, b) => a.Year - b.Year);
  }

  setTimeout(() => {
    moviesListEl.style.visibility = "visible";
    moviesListEl.innerHTML = moviesArray
      .map((movie) => movieHTML(movie))
      .join("");
    searchTitleEl.innerHTML += ` ${title}`;
    loadingSpinEl.classList.remove("movie__loading");
  }, 1200);
}

function onSearchChange(event) {
  title = event.target.value;
  event.preventDefault();
  renderMovies()
}

function movieHTML(movie) {
  return `<div class="movie">
    <figure class="movie__img--wrapper">
    <img src="${movie.Poster}" alt="" class="movie__img" />
    </figure>
    <h4 class="movie__title">${movie.Title}</h4>
    <h4 class="movie__year">${movie.Year}</h4>`;
}

function sortMovieYear(event) {
  renderMovies(event.target.value);
}

function openMenu() {
  document.body.classList += " menu--open";
}

function closeMenu() {
  document.body.classList.remove("menu--open");
}
