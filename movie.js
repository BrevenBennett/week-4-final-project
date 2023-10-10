const movieListEl = document.querySelector(".movie-list");
const title = localStorage.getItem("title")

async function renderMovies(title) {
  const movie = await fetch(`http://www.omdbapi.com/?apikey=53de5b3d&s=fast`);
  const movieData = await movie.json();
  movieListEl.innerHTML = movieData
    .map((title) => movieHTML(title))
    .join("")
    .slice(0, 6);
}

function movieHTML(movie) {
  return `<div class="movie">
    <figure class="movie__img--wrapper">
    <img src="${movie.Poster}" alt="" class="movie__img" />
    </figure>
    <h4 class="movie__title">${movie.Title}</h4>
    <h4 class="movie__year">${movie.Year}</h4>`;
}

renderMovies();
