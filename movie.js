const moviesListEl = document.querySelector(".movie-list");
const searchTitleEl = document.querySelector(".header__movie--search");

async function renderMovies(filter) {
  searchTitleEl.innerHTML += ` ${title}`;
  const movies = await fetch(
    `http://www.omdbapi.com/?apikey=53de5b3d&s=${title}`
  );

  const moviesData = await movies.json();

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
}

function filterYear(event) {
  console.log(event.target.value)
  renderMovies(event.target.value);
}

function onSearchChange(event) {
  title = event.target.value;
  event.preventDefault();
  renderMovies();
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

// function sortMovieYear(event) {
//   renderMovies(event.target.value);
// }

// function openMenu() {
//   document.body.classList += " menu--open";
// }

// function closeMenu() {
//   document.body.classList.remove("menu--open");
// }
