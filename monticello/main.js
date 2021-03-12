$(document).ready(function () {
    //slider
    $(".header__slider").slick({
        dots: true,
        dotsClass: "slider__dots",
        arrows: false,
    });

    //smooth scroll
    $(".nav__item").on("click", (event) => scroll(event));
    $("[href='#gallery']").on("click", (event) => scroll(event));

    function scroll(event) {
        event.preventDefault();
        let sectName = $(event.target).attr("href");
        sectName = sectName ? sectName : $(event.currentTarget).attr("href");
        let top = $(sectName).offset().top;
        $("html, body").animate({
            scrollTop: top,
        }, 1000)
    }

    //burger menu
(function() {

  $(".nav__openbtn").on("click", (event) => toggleNav(event));

  function toggleNav(event) {
      $(event.currentTarget).toggleClass("nav__openbtn_active");
      $(".nav__list").toggleClass("nav__list_open");

    }
})();
});

// filter images
let images = [
    {
        html: '<img src="sources/dist/img/building1.png" alt="building" />',
        src: 'sources/dist/img/building1.png',
        type: 'white'
    },
    {
        html: '<img src="sources/dist/img/building2.png" alt="building" />',
        src: 'sources/dist/img/building2.png',
        type: 'white'
    },
    {
        html: '<img src="sources/dist/img/building3.png" alt="building" />',
        src: 'sources/dist/img/building3.png',
        type: 'orange'
    },
    {
        html: '<img src="sources/dist/img/building4.png" alt="building" />',
        src: 'sources/dist/img/building4.png',
        type: 'blue'
    },
    {
        html: '<img src="sources/dist/img/building5.png" alt="building" />',
        src: 'sources/dist/img/building5.png',
        type: 'white'
    }
];

let linkImg = [
    {
        name: "class",
        value: "gallery__fancy"
    },
    {
        name: "data-fancybox",
        value: "gallery"
    },
    {
        name: "data-type",
        value: "image"
    },
    {
        name: "data-width",
        value: "580px"
    },
]

$("[name='filter']").on("click", (event) => render(event))

function render(event) {
    $(".gallery__content").remove();

    let imgContainer = document.querySelector("#images");

    let div = document.createElement("div");
    div.className = "gallery__content";

    for (let el of images) {
        if((el.type == event.target.dataset.filter) || (event.target.dataset.filter == "all")) {
            let a = document.createElement("a");

            for (let attr of linkImg) {
                a.setAttribute(attr.name, attr.value);
            }

            a.setAttribute("href", el.src)

            a.innerHTML = el.html
            div.append(a)
        }
    }

    imgContainer.append(div)

    $(".gallery__fancy").fancybox({
        animationEffect: "zoom-in-out",
    });
}

//add new sections
$(".gallery__btn").on("click", addSect);

function addSect() {
    let sect = document.querySelector(".gallery__content");
    let newSect = sect.cloneNode(true);
    $("#images").append(newSect);

    $(".gallery__fancy").fancybox({
        animationEffect: "zoom-in-out",
    });
}

//zoom imgs
$(".gallery__fancy").fancybox({
        animationEffect: "zoom-in-out",
});

//validate form
$(".form__input").change((event) => validate(event));

function validate(event) {
      event.target.dataset.isvalid = "true";
   $(`[for='${event.target.name}']`).css("visibility", 'hidden');

  if (event.target.name == "fullname") {
    if (event.target.value.length < 4) {
      event.target.dataset.isvalid = "false";
    }
  } else {
    let pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,6}\.)?[a-z]{2,6}$/i;
    if(!pattern.test(event.target.value)) {
      event.target.dataset.isvalid = "false";
  }}
  if (event.target.dataset.isvalid == "false") {
   $(`[for='${event.target.name}']`).css("visibility", 'visible');
  }
}

$(".form").submit(function(event) {
  let inputs = [...document.querySelectorAll(".form__input")];

  for (let i of inputs) {
    if (i.dataset.isvalid == "false") {
      event.preventDefault();

      alert("You must check your fields");
      $(".form__btn").css("outline", "none");

      return false;
    }
  }
  return true;
});

//change first title
(function() {  
  function debounce(f, t) {
  return function (arg) {
    let previousCall = this.lastCall;
    this.lastCall = Date.now();
    if (previousCall && ((this.lastCall - previousCall) <= t)) {
      clearTimeout(this.lastCallTimer);
    }
    this.lastCallTimer = setTimeout(() => f(arg), t);
  }
}

function checkSize(event) {
  $(".header__title").html("Simple & mordern")
  if (event.target.innerWidth < 768) {
    let text = $($(".header__title")[0]).text().split(" ").join("</br>");
    $(".header__title").html(text);
  }
}

let windowResize = debounce(checkSize, 100);

window.addEventListener("resize", (event) => windowResize(event))
})();

//make map
let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 40.654, lng: -73.871 },
    zoom: 12.5,
    styles: [
      {
        featureType: "administrative",
        elementType: "labels.text.fill",
        stylers: [{ color: "#696969" }],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#919191" }],
      },
      {
        featureType: "transit",
        elementType: "labels.text.fill",
        stylers: [{ color: "#363636" }],
      },
      {
        featureType: "poi",
        elementType: "labels.icon",
        stylers: [{ color: "#8c8c8c" }],
      },
      {
        featureType: "transit",
        elementType: "labels.icon",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "road",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "water",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#e7e7e7" }],
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [{ color: "#d5d5d5" }],
      },
      {
        featureType: "landscape",
        stylers: [{ color: "#e9e9e9" }],
      },
      {
        featureType: "road.arterial",
        stylers: [{ color: "#e9e9e9" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [{ color: "#d6d6d6" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#ffffff" }],
      },
      {
        featureType: "road.local",
        stylers: [{ color: "#e9e9e9" }],
      },
      {
        featureType: "transit.station",
        elementType: "geometry",
        stylers: [{ color: "#dfdfdf" }],
      },
      {
        featureType: "transit.line",
        elementType: "geometry",
        stylers: [{ color: "#ffffff" }],
      },
    ],
    disableDefaultUI: true,
  });

  new google.maps.Marker({
    position: { lat: 40.684, lng: -73.901 },
    map,
    icon: {
      url: "./sources/dist/img/marker.png",
      anchor: new google.maps.Point(53, 53),
    },
  });
}
