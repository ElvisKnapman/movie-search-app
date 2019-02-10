'use strict';

document.getElementById('submit').addEventListener('click', (event) => {
    let url = 'https://www.omdbapi.com/?';
    // convert search string to have '+' signs instead of spaces, and prefix 't=' to it for title search for API
    let searchString = `t=${document.getElementById('movie-title-search').value.split(' ').join('+')}`;
    let apiKey = '&apikey=ffa4b7e4';

    const xhr = new XMLHttpRequest();

    xhr.open('GET', `${url}${searchString}${apiKey}`, true);

    xhr.onload = function() {
        if (xhr.status == 200) {
          console.log(xhr.response)  ;
          parseResponse(xhr.response);
        }
    }
    
    xhr.send();
});



const parseResponse = function(response) {
    // parse the JSON response data to an object
    const movie = JSON.parse(response);
    document.getElementById('poster').innerHTML = `<img src="${movie.Poster}">`;
    document.getElementById('title-year').innerHTML = `${movie.Title} (${movie.Year})`;
    document.getElementById('critic-rating').innerHTML = `${movie.imdbRating}/10`;
    document.getElementById('rated').innerHTML = `${movie.Rated}`;
    document.getElementById('genre').innerHTML = `${movie.Genre}`;
    document.getElementById('runtime').innerHTML = `${movie.Runtime}`;
    document.getElementById('release-date').innerHTML= `${movie.Released}`;
    document.getElementById('starring').innerHTML = `${movie.Actors}`;

}