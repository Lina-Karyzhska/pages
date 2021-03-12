// 1. Создать страницу, которая выводит нумерованный список песен:
let playList = [
    {
        author: "LED ZEPPELIN",
        song:"STAIRWAY TO HEAVEN"
    },

    {
        author: "QUEEN",
        song:"BOHEMIAN RHAPSODY"
    },

    {
        author: "LYNYRD SKYNYRD",
        song:"FREE BIRD"
    },

    {
        author: "DEEP PURPLE",
        song:"SMOKE ON THE WATER"
    },

    {
        author: "JIMI HENDRIX",
        song:"ALL ALONG THE WATCHTOWER"
    },

    {
        author: "AC/DC",
        song:"BACK IN BLACK"
    },

    {
        author: "QUEEN",
        song:"WE WILL ROCK YOU"
    },

    {
        author: "METALLICA",
        song:"ENTER SANDMAN"
    }

];

let divs = document.querySelectorAll(".task");

divs.forEach((el) => el.style.display = "none")

document.querySelectorAll("[name='task']").forEach((el) => el.onclick = (event) => {
        divs.forEach((el) => {
            if (el.id == `${event.target.id}-task`) {
                el.style.display = "block";
            } else {
                el.style.display = "none";
            }
        })
    });

(function() {
    let div = document.querySelector("#first-task");
    let ul = document.createElement("ul");

    for (let el of playList) {
        let li =  document.createElement("li");

        let author = document.createElement("p");
        author.innerHTML = el.author;

        let song = document.createElement("p");
        song.innerHTML = el.song;

        li.append(author);
        li.append(song);

        ul.append(li);
    }

    div.append(ul);
})();

// 2. Создать HTML-страницу с кнопкой "Открыть" и модальным окном. На модальном окне должен быть текст и кнопка "Закрыть".
//  Изначально модальное окно не отображается. При клике на кнопку "Открыть" появляется модальное окно, на кнопку "Закрыть" – исчезает.
(function() {
    let div = document.querySelector("#second-task");

    let openBtn = document.createElement("button");
    let modal = document.createElement("div");
    let closeBtn = document.createElement("button");

    openBtn.innerHTML = "Open"
    modal.innerHTML = "blabla";
    closeBtn.innerHTML = "Close"

    modal.style.display = "none"

    div.append(openBtn);
    div.append(modal);
    modal.append(closeBtn);

    openBtn.onclick = () => modal.style.display = "block";
    closeBtn.onclick = () => modal.style.display = "none";
})();

// 3. Создать HTML-страницу со светофором и кнопкой, которая переключает светофор на следующий цвет.
(function() {
    let div = document.querySelector("#third-task");

    let trafficLights = [];

    let colors = ["red", "orange", "green"]
    for (let i = 0; i < 3; i++) {
        trafficLights.push(document.createElement("div"))
        trafficLights[i].style.cssText = `
            background-color: ${colors[i]};
            border-radius: 50%;
            width: 50px;
            height: 50px;
            opacity: 0.1
        `
        if (i == 0) trafficLights[i].style.opacity = 1;

        div.append(trafficLights[i]);
    }

    let btn = document.createElement("button");
    btn.innerHTML = "Change color";
    div.append(btn);

    let toggling;

    btn.onclick = () => {
        let on = trafficLights.filter((el) => el.style.opacity == 1);
        
        for (let el of trafficLights) {
            if (el == on[0]) {
                el.style.opacity = 0.1;
                let index = trafficLights.indexOf(el);
                if (el.style.backgroundColor == "red") {
                    toggling = "red"
                    trafficLights[index + 1].style.opacity = 1;
                } else if (el.style.backgroundColor == "green") {
                    toggling = "green"
                    trafficLights[index - 1].style.opacity = 1;
                } else {
                    if (toggling == "red") {
                        trafficLights[index + 1].style.opacity = 1;
                    } else {
                        trafficLights[index - 1].style.opacity = 1;
                    }
                }
            }
        }
    }
})()