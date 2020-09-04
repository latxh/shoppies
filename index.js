// @ts-nocheck
let searchElm = document.getElementById('searchElm');
let movieCardElm = document.getElementById('movieCard');
let cardContainerElm = document.getElementById('cardContainer');
let bannerElm = document.getElementById('banner');
let nominationsElm = document.getElementById('nominations');
let resultsElm = document.getElementById('results');
let cardPlaceholderElm = document.getElementById('cardPlaceholder');

let nominations = [null, null, null, null, null];

async function search(first) {

    // console.log("Searched", first, searchElm.value);

    let response = { "Search": [{ "Title": "The Invisible Man", "Year": "2020", "imdbID": "tt1051906", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BZjFhM2I4ZDYtZWMwNC00NTYzLWE3MDgtNjgxYmM3ZWMxYmVmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg" }, { "Title": "The Old Guard", "Year": "2020", "imdbID": "tt7556122", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BNDJiZDliZDAtMjc5Yy00MzVhLThkY2MtNDYwNTQ2ZTM5MDcxXkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_SX300.jpg" }, { "Title": "Sonic the Hedgehog", "Year": "2020", "imdbID": "tt3794354", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BMDk5Yzc4NzMtODUwOS00NTdhLTg2MjEtZTkzZjc0ZWE2MzAwXkEyXkFqcGdeQXVyMTA3MTA4Mzgw._V1_SX300.jpg" }, { "Title": "Eurovision Song Contest: The Story of Fire Saga", "Year": "2020", "imdbID": "tt8580274", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BYzRjYzA5NTQtOTE3MC00OTYzLWEzODItMzQxYWE1NDJkMDA0XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg" }, { "Title": "The Hunt", "Year": "2020", "imdbID": "tt8244784", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BNjg4MjRhZjgtNTIxOS00MmRjLTg4NTEtNjBkNzkwZjAxMjMyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg" }, { "Title": "The Call of the Wild", "Year": "2020", "imdbID": "tt7504726", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BZDA1ZmQ2OGMtZDhkMC00ZjRkLWE3ZTMtMzA5ZTk0YjM1OGRmXkEyXkFqcGdeQXVyNzI1NzMxNzM@._V1_SX300.jpg" }, { "Title": "The Wrong Missy", "Year": "2020", "imdbID": "tt9619798", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BY2QwZWJlZjMtNzU5NC00NTA0LWI1MjQtYWQ1ZTg4NWZmNjdkXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_SX300.jpg" }, { "Title": "The Way Back", "Year": "2020", "imdbID": "tt8544498", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BYjBjMTgyYzktN2U0Mi00YTJhLThkZDQtZmM1ZDlmNWMwZDQ3XkEyXkFqcGdeQXVyMDU5MDEyMA@@._V1_SX300.jpg" }, { "Title": "The Half of It", "Year": "2020", "imdbID": "tt9683478", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BY2RlZmZkOTUtMDI5Ni00ZjZmLWI1OTItZmUwNWE4ZWVjNzFiXkEyXkFqcGdeQXVyMTkzODUwNzk@._V1_SX300.jpg" }, { "Title": "To All the Boys: P.S. I Still Love You", "Year": "2020", "imdbID": "tt9354842", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BZjMwNDQ4NzMtOThmZi00NmMyLThkMWItMTA3MTg2YjdiZDRmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg" }], "totalResults": "2102", "Response": "True" };
    // console.log(response.Search.length);
    if (!first) {
        response = await (await fetch(`https://www.omdbapi.com/?apikey=1e95d568&type=movie&s=${searchElm.value}`, {
            cache: 'force-cache'
        })).json();
        console.log(first);
    }

    if (!response.Search) {
        response.Search = [];
    }

    if (first) {
        resultsElm.textContent = "Recent Movies"
    } else {
        resultsElm.textContent = ((response.Search.length === 0 || !response.totalResults) ? 'No ' : response.totalResults + " ") + `Results for "${searchElm.value}"`;
    }

    // console.log("Response", response);

    for (const movie of response.Search) {
        let nominated = nominations.find(a => a && a.imdbID === movie.imdbID);
        if (nominated) {
            let nominatedInd = response.Search.findIndex(a => a.imdbID === nominated.imdbID);
            response.Search.splice(nominatedInd, 1);
        }
    }

    let dif = response.Search.length - cardContainerElm.children.length;

    if (dif > 0) {
        for (let i = 0; i < dif; i++) {
            cardContainerElm.appendChild(movieCardElm.content.cloneNode(true));
        }
    } else if (dif < 0) {
        for (let i = 0; i < -dif; i++) {
            cardContainerElm.removeChild(cardContainerElm.lastElementChild);
        }
    }

    for (let i = 0; i < response.Search.length; i++) {
        const movie = response.Search[i];
        let elm = cardContainerElm.children[i];

        elm.getElementsByClassName('title')[0].textContent = movie.Title;
        elm.getElementsByClassName('year')[0].textContent = "RELEASED " + movie.Year;
        elm.getElementsByClassName('poster')[0].src = movie.Poster;

        // elm.addEventListener('click', () => { nominateClick(elm, movie) });

        // remove previously binded event listener;
        elm.removeEventListener('click', nominateClickHandler, false);

        // add the new listener;
        elm.addEventListener('click', nominateClickHandler, false);

        // set data to be fetched on click event;
        elm.setAttribute("data-movie", btoa(JSON.stringify(movie)))

        setTimeout(() => {
            elm.classList.add('visible');
        }, i * 100);
    }
}

var nominateClickHandler = function (event) {
    // event.srcElements gives card element but we need its parent hence the parent node is taken;
    let elm = event.srcElement.closest(".movie-card-containter");
    let movie = elm.getAttribute("data-movie") ? atob(elm.getAttribute("data-movie")) : "{}";
    movie = JSON.parse(movie);

    // nominate the movie;
    nominateClick(elm, movie);
}

function nominateClick(elm, movie) {

    let nominatedInd = nominations.findIndex(a => a && a.imdbID === movie.imdbID);
    if (nominatedInd !== -1) { return; }

    let nullInd = nominations.findIndex(a => !a);
    if (nullInd === -1) { return; }
    nominations[nullInd] = movie;

    elm.classList.remove('visible');
    let clone = elm.cloneNode(true);
    // clone.addEventListener('click', () => { nominatedClick(clone, movie) });

    // remove previously binded event listener;
    clone.removeEventListener('click', nominatedClickHandler, false);

    // add the new listener;
    clone.addEventListener('click', nominatedClickHandler, false);

    // set data to be fetched on click event;
    clone.setAttribute("data-movie", btoa(JSON.stringify(movie)))

    clone.getElementsByClassName('nominate')[0].textContent = "NOMINATED";

    setTimeout(() => {
        cardContainerElm.removeChild(elm);
    }, 250);

    nominationsElm.replaceChild(clone, nominationsElm.children[nullInd]);
    setTimeout(() => {
        clone.classList.add('visible');
    }, 0);


    if (!nominations.includes(null)) {
        bannerElm.classList.add('banner-visible');
        cardContainerElm.classList.add('nominations-full');
    }
}


var nominatedClickHandler = function (event) {
    // event.srcElements gives card element but we need its parent hence the parent node is taken;
    let clone = event.srcElement.closest(".movie-card-containter");
    let movie = clone.getAttribute("data-movie") ? atob(clone.getAttribute("data-movie")) : "{}";
    movie = JSON.parse(movie);

    // nominate the movie;
    nominatedClick(clone, movie);
}

function nominatedClick(elm, movie) {
    console.log("nominations -> ", nominations);
    console.log("movie ->", movie);
    let nominatedInd = nominations.findIndex(a => a && a.imdbID === movie.imdbID);
    if (nominatedInd === -1) { return; }

    nominations[nominatedInd] = null;

    elm.classList.remove('visible');
    let clone = elm.cloneNode(true);

    // clone.addEventListener('click', () => { nominateClick(clone, movie) });

    // remove previously binded event listener
    clone.removeEventListener('click', nominateClickHandler, false);

    // add the new listener
    clone.addEventListener('click', nominateClickHandler, false);

    // set data to be fetched on click event
    clone.setAttribute("data-movie", btoa(JSON.stringify(movie)))

    clone.getElementsByClassName('nominate')[0].textContent = "NOMINATE";

    setTimeout(() => {
        nominationsElm.replaceChild(cardPlaceholderElm.content.cloneNode(true), elm);
    }, 250);

    cardContainerElm.appendChild(clone);
    setTimeout(() => {
        clone.classList.add('visible');
    }, 0);

    if (nominations.includes(null)) {
        bannerElm.classList.remove('banner-visible');
        cardContainerElm.classList.remove('nominations-full');
    }
}

window.onload = () => {
    search(true);
}