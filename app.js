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

    document.getElementById('movie-title-search').value = '';
});



const parseResponse = (response) => {
    // parse the JSON response data to an object
    const movie = JSON.parse(response);

    // remove all error messaging every time event handler is called
    document.getElementById('status').innerHTML = '';

    // remove all movie info every time event handler is called
    removeMovieInfo();

    // if API sends back a property called 'Response' and it is False, it didn't find any results
    if(movie.Response === 'False') {
        let errorMsg = document.createElement('p');
        errorMsg.innerHTML = 'Sorry, your search did not return any results.';
        document.getElementById('status').appendChild(errorMsg);
    } else {
        document.getElementById('poster').innerHTML = `<img src="${movie.Poster}">`;
        document.getElementById('title-year').innerHTML = `${movie.Title} (${movie.Year})`;
        document.getElementById('critic-rating').innerHTML = `${movie.imdbRating}/10`;
        document.getElementById('rated').innerHTML = `${movie.Rated}`;
        document.getElementById('genre').innerHTML = `${movie.Genre}`;
        document.getElementById('runtime').innerHTML = `${movie.Runtime}`;
        document.getElementById('release-date').innerHTML= `${movie.Released}`;
        document.getElementById('starring').innerHTML = `${movie.Actors}`;
    }
}

const removeMovieInfo = () => {
    document.getElementById('poster').innerHTML = '';
    document.getElementById('title-year').innerHTML = '';
    document.getElementById('critic-rating').innerHTML = '';
    document.getElementById('rated').innerHTML = '';
    document.getElementById('genre').innerHTML = '';
    document.getElementById('runtime').innerHTML = '';
    document.getElementById('release-date').innerHTML= '';
    document.getElementById('starring').innerHTML = '';
}