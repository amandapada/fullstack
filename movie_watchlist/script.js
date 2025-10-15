let searchInput = document.getElementById("search_bar");
const clearBtn = document.getElementById("clear_search");
let message = document.getElementById("message");
const movieResults = document.getElementById("movie_results");
const template = document.querySelector(".movie_card");

const willWatchContainer = document.getElementById("watchlist_movies");
const watchingContainer = document.getElementById("watching");
const watchedContainer = document.getElementById("watched");

let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
let watching = JSON.parse(localStorage.getItem("watching")) || [];
let watched = JSON.parse(localStorage.getItem("watched")) || [];

renderAllLists();

async function search(query) {
    const proxy = "https://api.allorigins.win/raw?url=";
    const url = encodeURIComponent(`https://imdb.iamidiotareyoutoo.com/search?q=${query}`);

    try {
        const response = await fetch(proxy + url);
        if (!response.ok) throw new Error("Network error");

        const data = await response.json();
        movieResults.innerHTML = `<h4 id="message"></h4>`;

        if (!data || !data.description || data.description.length === 0) {
        message.innerHTML = "Movie not found.";
        template.style.display = "none";
        return;
        }

        message.innerHTML = "";
        data.description.forEach(movie => {
        const card = template.cloneNode(true);
        card.style.display = "block";
        card.querySelector(".movie_image").src = movie["#IMG_POSTER"];
        card.querySelector(".title").textContent = movie["#TITLE"];
        card.querySelector(".year").textContent = movie["#YEAR"];
        card.querySelector(".actors").textContent = movie["#ACTORS"];
        movieResults.appendChild(card);
        });
    } catch (error) {
        message.innerHTML = `Search failed: ${error.message}`;
    }
}

searchInput.addEventListener("input", async (e) => {
    clearBtn.style.display = "block";
    const query = e.target.value.trim();
    if (query.length > 2) await search(query);
});

clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    message.innerHTML = "";
    clearBtn.style.display = "none";
    movieResults.innerHTML = "";
});

movieResults.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-plus")) {
        const card = e.target.closest(".movie_card");
        const title = card.querySelector(".title").textContent;
        const year = card.querySelector(".year").textContent;
        const actors = card.querySelector(".actors").textContent;
        const img = card.querySelector(".movie_image").src;

        const movie = { title, year, actors, img };

        if (!watchlist.some((m) => m.title === title)) {
        watchlist.push(movie);
        saveAll();
        renderAllLists();
        }
    }
});

document.addEventListener("click", (e) => {
    const title = e.target.closest(".watchlist_card")?.querySelector(".title")?.textContent;
    if (!title) return;

    if (e.target.id === "to_watching") {
        moveMovie(title, watchlist, watching);
    }

    if (e.target.id === "to_watched") {
        moveMovie(title, watching, watched);
    }

    if (e.target.classList.contains("fa-trash")) {
        removeMovie(title);
    }
});

function moveMovie(title, fromList, toList) {
    const movie = fromList.find((m) => m.title === title);
    if (movie && !toList.some((m) => m.title === title)) {
        toList.push(movie);
        fromList.splice(fromList.indexOf(movie), 1);
        saveAll();
        renderAllLists();
    }
}

function removeMovie(title) {
    watchlist = watchlist.filter((m) => m.title !== title);
    watching = watching.filter((m) => m.title !== title);
    watched = watched.filter((m) => m.title !== title);
    saveAll();
    renderAllLists();
}

function saveAll() {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    localStorage.setItem("watching", JSON.stringify(watching));
    localStorage.setItem("watched", JSON.stringify(watched));
}

function renderAllLists() {
    renderList(willWatchContainer, watchlist, true, false);
    renderList(watchingContainer, watching, false, true);
    renderList(watchedContainer, watched, false, false);
}

function renderList(container, list, showToWatching = false, showToWatched = false) {
    container.innerHTML = "";
    list.forEach(movie => {
        const card = document.createElement("div");
        card.classList.add("watchlist_card");
        card.style.display = "block";
        card.innerHTML = `
        <img src="${movie.img}" alt="${movie.title}" class="movie_image">
        <div class="movie_text">
            <p class="title">${movie.title}</p>
            <p class="year">${movie.year}</p>
            <p class="actors">${movie.actors}</p>
        </div>
        <div class="watch_icons">
            ${showToWatching ? '<i class="fa-solid fa-plus" id="to_watching"></i>' : ""}
            ${showToWatched ? '<i class="fa-solid fa-plus" id="to_watched"></i>' : ""}
            <i class="fa-solid fa-trash"></i>
        </div>
        `;
        container.appendChild(card);
    });
}
