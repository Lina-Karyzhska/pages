"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

$(document).ready(function () {
  //slider
  $(".header__slider").slick({
    dots: true,
    dotsClass: "slider__dots",
    arrows: false
  }); //smooth scroll

  $(".nav__item").on("click", function (event) {
    return scroll(event);
  });
  $("[href='#gallery']").on("click", function (event) {
    return scroll(event);
  });

  function scroll(event) {
    event.preventDefault();
    var sectName = $(event.target).attr("href");
    sectName = sectName ? sectName : $(event.currentTarget).attr("href");
    var top = $(sectName).offset().top;
    $("html, body").animate({
      scrollTop: top
    }, 1000);
  } //burger menu


  (function () {
    $(".nav__openbtn").on("click", function (event) {
      return toggleNav(event);
    });

    function toggleNav(event) {
      $(event.currentTarget).toggleClass("nav__openbtn_active");
      $(".nav__list").toggleClass("nav__list_open");
    }
  })();
}); // filter images

var images = [{
  html: '<img src="sources/dist/img/building1.png" alt="building" />',
  src: 'sources/dist/img/building1.png',
  type: 'white'
}, {
  html: '<img src="sources/dist/img/building2.png" alt="building" />',
  src: 'sources/dist/img/building2.png',
  type: 'white'
}, {
  html: '<img src="sources/dist/img/building3.png" alt="building" />',
  src: 'sources/dist/img/building3.png',
  type: 'orange'
}, {
  html: '<img src="sources/dist/img/building4.png" alt="building" />',
  src: 'sources/dist/img/building4.png',
  type: 'blue'
}, {
  html: '<img src="sources/dist/img/building5.png" alt="building" />',
  src: 'sources/dist/img/building5.png',
  type: 'white'
}];
var linkImg = [{
  name: "class",
  value: "gallery__fancy"
}, {
  name: "data-fancybox",
  value: "gallery"
}, {
  name: "data-type",
  value: "image"
}, {
  name: "data-width",
  value: "580px"
}];
$("[name='filter']").on("click", function (event) {
  return render(event);
});

function render(event) {
  $(".gallery__content").remove();
  var imgContainer = document.querySelector("#images");
  var div = document.createElement("div");
  div.className = "gallery__content";
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = images[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var el = _step.value;

      if (el.type == event.target.dataset.filter || event.target.dataset.filter == "all") {
        var a = document.createElement("a");
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = linkImg[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var attr = _step2.value;
            a.setAttribute(attr.name, attr.value);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        a.setAttribute("href", el.src);
        a.innerHTML = el.html;
        div.append(a);
      }
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

  imgContainer.append(div);
  $(".gallery__fancy").fancybox({
    animationEffect: "zoom-in-out"
  });
} //add new sections


$(".gallery__btn").on("click", addSect);

function addSect() {
  var sect = document.querySelector(".gallery__content");
  var newSect = sect.cloneNode(true);
  $("#images").append(newSect);
  $(".gallery__fancy").fancybox({
    animationEffect: "zoom-in-out"
  });
} //zoom imgs


$(".gallery__fancy").fancybox({
  animationEffect: "zoom-in-out"
}); //validate form

$(".form__input").change(function (event) {
  return validate(event);
});

function validate(event) {
  event.target.dataset.isvalid = "true";
  $("[for='".concat(event.target.name, "']")).css("visibility", 'hidden');

  if (event.target.name == "fullname") {
    if (event.target.value.length < 4) {
      event.target.dataset.isvalid = "false";
    }
  } else {
    var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,6}\.)?[a-z]{2,6}$/i;

    if (!pattern.test(event.target.value)) {
      event.target.dataset.isvalid = "false";
    }
  }

  if (event.target.dataset.isvalid == "false") {
    $("[for='".concat(event.target.name, "']")).css("visibility", 'visible');
  }
}

$(".form").submit(function (event) {
  var inputs = _toConsumableArray(document.querySelectorAll(".form__input"));

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = inputs[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var i = _step3.value;

      if (i.dataset.isvalid == "false") {
        event.preventDefault();
        alert("You must check your fields");
        $(".form__btn").css("outline", "none");
        return false;
      }
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
        _iterator3["return"]();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return true;
}); //change first title

(function () {
  function debounce(f, t) {
    return function (arg) {
      var previousCall = this.lastCall;
      this.lastCall = Date.now();

      if (previousCall && this.lastCall - previousCall <= t) {
        clearTimeout(this.lastCallTimer);
      }

      this.lastCallTimer = setTimeout(function () {
        return f(arg);
      }, t);
    };
  }

  function checkSize(event) {
    $(".header__title").html("Simple & mordern");

    if (event.target.innerWidth < 768) {
      var text = $($(".header__title")[0]).text().split(" ").join("</br>");
      $(".header__title").html(text);
    }
  }

  var windowResize = debounce(checkSize, 100);
  window.addEventListener("resize", function (event) {
    return windowResize(event);
  });
})(); //make map


var map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: 40.654,
      lng: -73.871
    },
    zoom: 12.5,
    styles: [{
      featureType: "administrative",
      elementType: "labels.text.fill",
      stylers: [{
        color: "#696969"
      }]
    }, {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{
        color: "#919191"
      }]
    }, {
      featureType: "transit",
      elementType: "labels.text.fill",
      stylers: [{
        color: "#363636"
      }]
    }, {
      featureType: "poi",
      elementType: "labels.icon",
      stylers: [{
        color: "#8c8c8c"
      }]
    }, {
      featureType: "transit",
      elementType: "labels.icon",
      stylers: [{
        visibility: "off"
      }]
    }, {
      featureType: "road",
      elementType: "labels",
      stylers: [{
        visibility: "off"
      }]
    }, {
      featureType: "water",
      elementType: "labels",
      stylers: [{
        visibility: "off"
      }]
    }, {
      featureType: "water",
      elementType: "geometry",
      stylers: [{
        color: "#e7e7e7"
      }]
    }, {
      featureType: "poi",
      elementType: "geometry",
      stylers: [{
        color: "#d5d5d5"
      }]
    }, {
      featureType: "landscape",
      stylers: [{
        color: "#e9e9e9"
      }]
    }, {
      featureType: "road.arterial",
      stylers: [{
        color: "#e9e9e9"
      }]
    }, {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [{
        color: "#d6d6d6"
      }]
    }, {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{
        color: "#ffffff"
      }]
    }, {
      featureType: "road.local",
      stylers: [{
        color: "#e9e9e9"
      }]
    }, {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [{
        color: "#dfdfdf"
      }]
    }, {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [{
        color: "#ffffff"
      }]
    }],
    disableDefaultUI: true
  });
  new google.maps.Marker({
    position: {
      lat: 40.684,
      lng: -73.901
    },
    map: map,
    icon: {
      url: "./sources/dist/img/marker.png",
      anchor: new google.maps.Point(53, 53)
    }
  });
}