let form = document.querySelector("#searchForm");
form.addEventListener("submit", (event) => searchFilm(event));
let url = "http://www.omdbapi.com/?apikey=ab601ba1&";

let req;
let films;

function searchFilm(event) {
    event.preventDefault();

    req = {
        title: document.querySelector("[name=film]").value, 
        type: document.querySelector("[name=type]").value
    };

    fetch(`${url}s=${req.title}&type=${req.type}`)
    .then(r => r.json())
    .then(r => {
        films = new Films(r.Search, r.totalResults);
        films.render();
        films.addPagination();
        let desc = document.querySelector(".description");
        if (desc) desc.parentNode.removeChild(desc);
    })
    .catch(() => {
        let filmList = document.querySelector(".filmList");
        filmList.innerHTML = "Movie not found";
        let pagination = document.querySelector(".pagination");
        if (pagination) pagination.parentNode.removeChild(pagination);
    })
}

class Films {
    constructor(films, quantity) {
        this.films = [...films];
        this.quantity = quantity;
        this.favFilmsId = [];
        this.counter = 0;
    }

    render() {
        let filmList = document.querySelector(".filmList");
        filmList.innerHTML = "";

        for (let film of this.films) {
            let item = document.createElement("li");
            let title = document.createElement("h4");
            let year = document.createElement("p");
            let img = document.createElement("img");
            let btns = document.createElement("div");
            let details = document.createElement("button");
            let fav = document.createElement("button");

            filmList.append(item);
            btns.append(details, fav);
            item.append(title, year, img, btns);

            title.innerText = film.Title;
            year.innerText = film.Year;
            img.setAttribute("src", film.Poster);
            img.setAttribute("alt", "poster");

            btns.classList.add("btns");

            details.classList.add("details");
            details.innerText = "Details";
            details.setAttribute("data-filmid", film.imdbID);
            details.addEventListener("click", (event) => this.showDetails(event));

            fav.innerText = "FAV";
            // if
            fav.setAttribute("data-filmid", film.imdbID);
            fav.setAttribute("data-isFav", "false");
            fav.addEventListener("click", (event) => this.toggleFavFilm(event));
        }
    }

    addPagination() {
        let pagination = document.querySelector(".pagination");
        if (pagination) pagination.parentNode.removeChild(pagination);

        if (+this.quantity > 10) {
            pagination = document.createElement("div");
            pagination.classList.add("pagination");

            document.body.append(pagination);
            
            let numOfPages = Math.ceil(this.quantity / 10) < 10 ? Math.ceil(this.quantity / 10) : 10

            for (let i = 1; i <= numOfPages; i++) {
                let btn = document.createElement("button");
                if (i == 1) btn.setAttribute("disabled", "true");
                btn.addEventListener("click", (event) => this.openOtherPage(event))
                btn.innerText = i;
                pagination.append(btn);
            }
        }
    }

    openOtherPage(event) {
        let btns = [...document.querySelectorAll(".pagination button")];
        btns.forEach((el) => el.removeAttribute("disabled"));

        fetch(`${url}s=${req.title}&type=${req.type}&page=${event.target.innerText}`)
        .then(r => r.json())
        .then(r => {
            films = new Films(r.Search, r.totalResults);
            films.render();
        });

        event.target.setAttribute("disabled", "true");
    }

    showDetails(event) {
        let id = event.target.dataset.filmid;

        let descripton = document.querySelector(".description");

        if (descripton) {
            descripton.parentNode.removeChild(descripton);
        }

        descripton = document.createElement("div");
        descripton.classList.add("description")

        let plot = document.createElement("p");
        let actors = document.createElement("p");
        let country = document.createElement("p");
        let director = document.createElement("p");
        let genre = document.createElement("p");
        let metascore = document.createElement("p");
        let rated = document.createElement("p");
        let released = document.createElement("p");
        let runtime = document.createElement("p");
        let writer = document.createElement("p");
        
        fetch(`${url}i=${id}`)
        .then(r => r.json())
        .then(r => {
            console.log(r)
            actors.innerText = r.Actors;
            country.innerText = r.Country;
            director.innerText = r.Director;
            genre.innerText = r.Genre;
            metascore.innerText = r.Metascore;
            plot.innerText = r.Plot;
            rated.innerText = r.Rated;
            released.innerText = r.Released;
            runtime.innerText = r.Runtime;
            writer.innerText = r.Writer;
        })

        descripton.append(actors, country, director, genre, metascore, plot, rated, released, runtime, writer);
        document.body.append(descripton);
    }

    toggleFavFilm(event) {
        if (event.target.classList.contains("isFav")) {
            event.target.classList.toggle("isFav");
            let index = this.favFilmsId.indexOf(event.target.dataset.filmid)
            window.localStorage.removeItem(index);
            this.favFilmsId.slice(index, 1);
        } else {
            event.target.classList.toggle("isFav");
            window.localStorage.setItem(this.counter++, event.target.dataset.filmid);
            this.favFilmsId.push(event.target.dataset.filmid);
        }
        // window.localStorage.clear()
    }
}

