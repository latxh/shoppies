// @ts-nocheck
let searchElm = document.getElementById('searchElm');
let bannerElm = document.getElementById('banner');
let resultsElm = document.getElementById('results');

// Containers
let cardContainerElm = document.getElementById('cardContainer');
let nominationsContainerElm = document.getElementById('nominations');

// Templates
let movieCardTemplate = document.getElementById('movieCard');
let cardPlaceholderTemplate = document.getElementById('cardPlaceholder');

async function search(isLandingPage) {

    // Hard coded an intial response for movies on the landin page
    let response = {
        "Search": [
            {
                "Title": "The Invisible Man",
                "Year": "2020",
                "imdbID": "tt1051906",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BZjFhM2I4ZDYtZWMwNC00NTYzLWE3MDgtNjgxYmM3ZWMxYmVmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg"
            },
            {
                "Title": "The Old Guard",
                "Year": "2020",
                "imdbID": "tt7556122",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BNDJiZDliZDAtMjc5Yy00MzVhLThkY2MtNDYwNTQ2ZTM5MDcxXkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_SX300.jpg"
            },
            {
                "Title": "Sonic the Hedgehog",
                "Year": "2020",
                "imdbID": "tt3794354",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BMDk5Yzc4NzMtODUwOS00NTdhLTg2MjEtZTkzZjc0ZWE2MzAwXkEyXkFqcGdeQXVyMTA3MTA4Mzgw._V1_SX300.jpg"
            },
            {
                "Title": "Eurovision Song Contest: The Story of Fire Saga",
                "Year": "2020",
                "imdbID": "tt8580274",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BYzRjYzA5NTQtOTE3MC00OTYzLWEzODItMzQxYWE1NDJkMDA0XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg"
            },
            {
                "Title": "The Hunt",
                "Year": "2020",
                "imdbID": "tt8244784",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BNjg4MjRhZjgtNTIxOS00MmRjLTg4NTEtNjBkNzkwZjAxMjMyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg"
            },
            {
                "Title": "The Call of the Wild",
                "Year": "2020",
                "imdbID": "tt7504726",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BZDA1ZmQ2OGMtZDhkMC00ZjRkLWE3ZTMtMzA5ZTk0YjM1OGRmXkEyXkFqcGdeQXVyNzI1NzMxNzM@._V1_SX300.jpg"
            },
            {
                "Title": "The Wrong Missy",
                "Year": "2020",
                "imdbID": "tt9619798",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BY2QwZWJlZjMtNzU5NC00NTA0LWI1MjQtYWQ1ZTg4NWZmNjdkXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_SX300.jpg"
            },
            {
                "Title": "The Way Back",
                "Year": "2020",
                "imdbID": "tt8544498",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BYjBjMTgyYzktN2U0Mi00YTJhLThkZDQtZmM1ZDlmNWMwZDQ3XkEyXkFqcGdeQXVyMDU5MDEyMA@@._V1_SX300.jpg"
            },
            {
                "Title": "The Half of It",
                "Year": "2020",
                "imdbID": "tt9683478",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BY2RlZmZkOTUtMDI5Ni00ZjZmLWI1OTItZmUwNWE4ZWVjNzFiXkEyXkFqcGdeQXVyMTkzODUwNzk@._V1_SX300.jpg"
            },
            {
                "Title": "To All the Boys: P.S. I Still Love You",
                "Year": "2020", "imdbID": "tt9354842",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BZjMwNDQ4NzMtOThmZi00NmMyLThkMWItMTA3MTg2YjdiZDRmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
            }
        ],
        "totalResults": "2102",
        "Response": "True"
    };

    if (!isLandingPage) {
        response = await (await fetch(`https://www.omdbapi.com/?apikey=1e95d568&type=movie&s=${searchElm.value}`, {
            cache: 'force-cache'
        })).json();
    }

    // Error catching for too many results and no results
    if (!response.Search) {
        response.Search = [];
    }

    // Results title
    if (isLandingPage) {
        resultsElm.textContent = "Recent Movies"
    } else {
        resultsElm.textContent = `${response.Search.length === 0 ? 'No' : response.totalResults} Results for "${searchElm.value}"`;
    }

    // See how many search results you have relative to card elements
    let dif = response.Search.length - cardContainerElm.children.length;

    if (dif > 0) {
        for (let i = 0; i < dif; i++) {
            cardContainerElm.appendChild(movieCardTemplate.content.cloneNode(true));
        }
    } else if (dif < 0) {
        let length = cardContainerElm.children.length;
        for (let i = 0; i < -dif; i++) {
            setTimeout(() => {
                cardContainerElm.children[length - 1 - i].classList.remove('visible');
                setTimeout(() => { cardContainerElm.removeChild(cardContainerElm.lastElementChild); }, 250);
            }, i * 100);
        }
    }

    // Iterate and create movies, append to UI container
    for (let i = 0; i < response.Search.length; i++) {
        const movie = response.Search[i];
        const movieElm = movieCardTemplate.content.cloneNode(true).querySelector('div');
        movieElm.querySelector('.title').textContent = movie.Title;
        movieElm.querySelector('.year').textContent = movie.Year;
        movieElm.querySelector('.poster').src = movie.Poster;

        setTimeout(() => {
            cardContainerElm.children[i].classList.remove("visible");
            setTimeout(() => {
                cardContainerElm.replaceChild(movieElm, cardContainerElm.children[i]);
                setTimeout(() => { movieElm.classList.add('visible'); }, 0);
            }, 250);
        }, 100 * i);
    }
}

function toggleNominated(movieElm) {

    // If movie is nominated
    if (movieElm.hasAttribute('nominated')) {
        bannerElm.classList.remove('banner-visible');
        cardContainerElm.classList.remove('nominations-full');

        movieElm.classList.remove('visible');
        const movieNominated = movieElm.cloneNode(true);
        movieNominated.removeAttribute('nominated');
        movieNominated.querySelector(".nominate").textContent = "NOMINATE";

        const placeholder = cardPlaceholderTemplate.content.cloneNode(true).querySelector("div");

        cardContainerElm.insertBefore(movieNominated, cardContainerElm.firstChild);

        // Animations
        setTimeout(() => { movieNominated.classList.add('visible'); }, 0);
        setTimeout(() => {
            nominationsContainerElm.replaceChild(placeholder, movieElm);
            setTimeout(() => { placeholder.classList.add('visible'); }, 0);
        }, 250);

    } else {
        let emptySpot = null;
        let foundSpots = 0;
        for (const spot of nominationsContainerElm.children) {
            if (!spot.hasAttribute('nominated')) {
                if (foundSpots === 0) {
                    emptySpot = spot;
                }

                foundSpots += 1;
            }
        }

        if (foundSpots === 0) {
            return;
        }

        if (foundSpots === 1) {
            bannerElm.classList.add('banner-visible');
            cardContainerElm.classList.add('nominations-full');
        }

        movieElm.classList.remove('visible');
        const movieNominated = movieElm.cloneNode(true);
        movieNominated.setAttribute('nominated', '');
        movieNominated.querySelector(".nominate").textContent = "NOMINATED";

        // Animations
        emptySpot.classList.remove('visible');
        setTimeout(() => {
            nominationsContainerElm.replaceChild(movieNominated, emptySpot);
            setTimeout(() => { movieNominated.classList.add('visible'); }, 0);
        }, 250);
        setTimeout(() => { cardContainerElm.removeChild(movieElm); }, 250);
    }
}

// Initial load, the predefinded list + create placeholders on load
window.addEventListener("load", () => {
    for (let i = 0; i < nominationsContainerElm.children.length; i++) {
        const child = nominationsContainerElm.children[i];
        setTimeout(() => { child.classList.add('visible'); }, 100 * i);
    }
    search(true);
});
