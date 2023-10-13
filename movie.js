const moviesListEl = document.querySelector(".movie-list");
const searchTitleEl = document.querySelector(".header__movie--search");

let title = "";
let searchPerformed = false;

async function renderMovies(filter) {
  searchPerformed = true;

  const movies = await fetch(
    `https://www.omdbapi.com/?apikey=53de5b3d&s=${title}`
  );

  moviesData = await movies.json();

  const moviesArray = moviesData.Search;

  if (filter === "Oldest_To_Newest") {
    moviesArray.sort((a, b) => a.Year - b.Year);
  } else if (filter === "Newest_To_Oldest") {
    moviesArray.sort((a, b) => b.Year - a.Year);
  }

  moviesListEl.innerHTML = moviesArray
    .map((movie) => movieHTML(movie))
    .slice(0, 6)
    .join("");

  searchTitleEl.innerHTML = `Search Results For: ${title}`;
}

function onSearchChange(event) {
  event.preventDefault();
  const loading = document.querySelector(".fa-spinner");
  const searchInputEl = document.getElementById("search");
  title = searchInputEl.value;

  if (searchPerformed) {
    moviesListEl.classList += " movie-list--hidden";
    setTimeout(() => {
      loading.classList += " spinner--visible";
    }, 400);
  }
  else {
    loading.classList += " spinner--visible";
  }

  setTimeout(() => {
    renderMovies(title)
      .then(() => {
        moviesListEl.classList.remove("movie-list--hidden");
        loading.classList.remove("spinner--visible");
      })
      .catch(() => {
        loading.classList.remove("spinner--visible");
        alert("No movies found. Try searching again.");
      });
  }, 1200);
}

function filterYear(event) {
  renderMovies(event.target.value);
}

function movieHTML(movie) {
  return `<div class="movie">
    <figure class="movie__img--wrapper">
      <img src="${movie.Poster}" alt="" class="movie__img" />
    </figure>
    <h4 class="movie__title">${movie.Title}</h4>
    <h4 class="movie__year">${movie.Year}</h4>
    </div>`;
}

function openMenu() {
  document.body.classList += " menu--open";
}

function closeMenu() {
  document.body.classList.remove("menu--open");
}
