'use strict';

document.getElementById('submit').addEventListener('click', (event) => {
    let url = 'https://www.omdbapi.com/?';
    // convert search string to have '+' signs instead of spaces, and prefix 't=' to it for title search for API
    let searchString = `t=${document.getElementById('movie-title-search').value.split(' ').join('+')}`;
    let apiKey = '&apikey=ffa4b7e4';

    console.log(`${url}${searchString}${apiKey}`);

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
    document.getElementById('title').innerHTML = `${movie.Title} (${movie.Year})`;
    document.getElementById('starring').innerHTML = `Starring: ${movie.Actors}`;
}