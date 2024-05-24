document.getElementById('searchButton').addEventListener('click', searchMovies)

let api_key = 'fc0d25718c5227b998d7696d7286ef98'
let urlBase = 'https://api.themoviedb.org/3/search/movie'
let urlImage = 'https://image.tmdb.org/t/p/w200'

let resultContainer = document.getElementById('results')

function searchMovies(){
  resultContainer.innerHTML= 'Cargando...'
  let searchInput = document.getElementById('searchInput').value
  fetch(`${urlBase}?api_key=${api_key}&query=${searchInput}`)
  .then(response => response.json())
  .then(response => displayMovies(response.results))
}

function displayMovies(movies){
  resultContainer.innerHTML= ''

  if (movies.length === 0){
    resultContainer.innerHTML= '<p> No se encontraron resultados para tu busqueda</p>'
    return
  }

  movies.forEach(movie => {
    let movieDiv = document.createElement('div')
    movieDiv.classList.add('card', 'col-10', 'd-flex', 'flex-column', 'flex-md-row', 'm-3', 'border', 'border-danger')

    let movieDivInf = document.createElement('div')
    movieDivInf.classList.add('card-body')

    let title = document.createElement('h2')
    title.textContent = movie.title

    let release_date = document.createElement('p')
    release_date.textContent = 'La fecha de lanzamiento fue: ' + movie.release_date
  
    let overview = document.createElement('p')
    overview.textContent = movie.overview

    let posterPath = urlImage + movie.poster_path
    let poster = document.createElement('img')
    poster.classList.add('img-fluid', 'rounded-2')
    poster.src = posterPath

    movieDivInf.appendChild(title)
    movieDivInf.appendChild(release_date)
    movieDivInf.appendChild(overview)

    movieDiv.appendChild(poster)
    movieDiv.appendChild(movieDivInf)

    resultContainer.appendChild(movieDiv)

  })
}
