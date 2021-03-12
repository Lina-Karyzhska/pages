"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var form = document.querySelector("#searchForm");
form.addEventListener("submit", function (event) {
  return searchFilm(event);
});
var url = "http://www.omdbapi.com/?apikey=ab601ba1&";
var req;
var films;

function searchFilm(event) {
  event.preventDefault();
  req = {
    title: document.querySelector("[name=film]").value,
    type: document.querySelector("[name=type]").value
  };
  fetch("".concat(url, "s=").concat(req.title, "&type=").concat(req.type)).then(function (r) {
    return r.json();
  }).then(function (r) {
    films = new Films(r.Search, r.totalResults);
    films.render();
    films.addPagination();
    var desc = document.querySelector(".description");
    if (desc) desc.parentNode.removeChild(desc);
  })["catch"](function () {
    var filmList = document.querySelector(".filmList");
    filmList.innerHTML = "Movie not found";
    var pagination = document.querySelector(".pagination");
    if (pagination) pagination.parentNode.removeChild(pagination);
  });
}

var Films =
/*#__PURE__*/
function () {
  function Films(films, quantity) {
    _classCallCheck(this, Films);

    this.films = _toConsumableArray(films);
    this.quantity = quantity;
    this.favFilmsId = [];
    this.counter = 0;
  }

  _createClass(Films, [{
    key: "render",
    value: function render() {
      var _this = this;

      var filmList = document.querySelector(".filmList");
      filmList.innerHTML = "";
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.films[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var film = _step.value;
          var item = document.createElement("li");
          var title = document.createElement("h4");
          var year = document.createElement("p");
          var img = document.createElement("img");
          var btns = document.createElement("div");
          var details = document.createElement("button");
          var fav = document.createElement("button");
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
          details.addEventListener("click", function (event) {
            return _this.showDetails(event);
          });
          fav.innerText = "FAV"; // if

          fav.setAttribute("data-filmid", film.imdbID);
          fav.setAttribute("data-isFav", "false");
          fav.addEventListener("click", function (event) {
            return _this.toggleFavFilm(event);
          });
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "addPagination",
    value: function addPagination() {
      var _this2 = this;

      var pagination = document.querySelector(".pagination");
      if (pagination) pagination.parentNode.removeChild(pagination);

      if (+this.quantity > 10) {
        pagination = document.createElement("div");
        pagination.classList.add("pagination");
        document.body.append(pagination);
        var numOfPages = Math.ceil(this.quantity / 10) < 10 ? Math.ceil(this.quantity / 10) : 10;

        for (var i = 1; i <= numOfPages; i++) {
          var btn = document.createElement("button");
          if (i == 1) btn.setAttribute("disabled", "true");
          btn.addEventListener("click", function (event) {
            return _this2.openOtherPage(event);
          });
          btn.innerText = i;
          pagination.append(btn);
        }
      }
    }
  }, {
    key: "openOtherPage",
    value: function openOtherPage(event) {
      var btns = _toConsumableArray(document.querySelectorAll(".pagination button"));

      btns.forEach(function (el) {
        return el.removeAttribute("disabled");
      });
      fetch("".concat(url, "s=").concat(req.title, "&type=").concat(req.type, "&page=").concat(event.target.innerText)).then(function (r) {
        return r.json();
      }).then(function (r) {
        films = new Films(r.Search, r.totalResults);
        films.render();
      });
      event.target.setAttribute("disabled", "true");
    }
  }, {
    key: "showDetails",
    value: function showDetails(event) {
      var id = event.target.dataset.filmid;
      var descripton = document.querySelector(".description");

      if (descripton) {
        descripton.parentNode.removeChild(descripton);
      }

      descripton = document.createElement("div");
      descripton.classList.add("description");
      var plot = document.createElement("p");
      var actors = document.createElement("p");
      var country = document.createElement("p");
      var director = document.createElement("p");
      var genre = document.createElement("p");
      var metascore = document.createElement("p");
      var rated = document.createElement("p");
      var released = document.createElement("p");
      var runtime = document.createElement("p");
      var writer = document.createElement("p");
      fetch("".concat(url, "i=").concat(id)).then(function (r) {
        return r.json();
      }).then(function (r) {
        console.log(r);
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
      });
      descripton.append(actors, country, director, genre, metascore, plot, rated, released, runtime, writer);
      document.body.append(descripton);
    }
  }, {
    key: "toggleFavFilm",
    value: function toggleFavFilm(event) {
      if (event.target.classList.contains("isFav")) {
        event.target.classList.toggle("isFav");
        var index = this.favFilmsId.indexOf(event.target.dataset.filmid);
        window.localStorage.removeItem(index);
        this.favFilmsId.slice(index, 1);
      } else {
        event.target.classList.toggle("isFav");
        window.localStorage.setItem(this.counter++, event.target.dataset.filmid);
        this.favFilmsId.push(event.target.dataset.filmid);
      } // window.localStorage.clear()

    }
  }]);

  return Films;
}();