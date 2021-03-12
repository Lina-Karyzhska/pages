let divs = document.querySelectorAll(".task");

divs.forEach((el) => el.style.display = "none")
divs[2].style.display = "block";
document.querySelector("#btns").onclick = (event) => {
    divs.forEach((el) => {
        if (event.target.tagName != "INPUT" && event.target.tagName != "LABEL") {
            return;
        } else if (el.id == `${event.target.id}-task`) {
            el.style.display = "block";
        } else {
            el.style.display = "none";
        }
    })
};

// 1. Создать HTML-страницу для отображения/редактирования текста. При открытии страницы текст отображается с помощью тега div. 
// При нажатии Ctrl + E, вместо div появляется textarea с тем же текстом, который теперь можно редактировать. 
// При нажатии Ctrl + , вместо textarea появляется div с уже измененным текстом. 
// Не забудьте выключить поведение по умолчанию для этих сочетаний клавиш.
(function() {
    let div = document.createElement("div");
    let textarea = document.createElement("textarea");

    div.innerHTML = "You can change this text on CTRL + E"

    textarea.style.display = "none"

    divs[0].append(div, textarea);

    function changeText(event) {

        if (event.ctrlKey && (event.code == "KeyE")) {
            event.preventDefault();

            div.style.display = "none";
            textarea.value = div.innerHTML;
            textarea.style.display = "block";
        }

        if (event.ctrlKey && (event.code == "NumpadAdd")) {
            event.preventDefault();

            textarea.style.display = "none";
            div.innerHTML = textarea.value;
            div.style.display = "block";
        }
    }

    document.addEventListener("keydown", changeText)
})();

// 2. Создать HTML-страницу с большой таблицей. При клике по заголовку колонки, необходимо отсортировать данные по этой колонке. 
// Учтите, что числовые значения должны сортироваться как числа, а не как строки.
(function() {
    let content = [
        {
            name: "Bob",
            age: 10
        },
        {
            name: "Mike",
            age: 7
        },
        {
            name: "Carl",
            age: 3
        },
        {
            name: "Nick",
            age: 5
        },
        {
            name: "Eve",
            age: 17
        },
        {
            name: "Lisa",
            age: 6
        },
        {
            name: "Ann",
            age: 11
        },
        {
            name: "Sara",
            age: 15
        },
        {
            name: "Trisha",
            age: 8
        },
        {
            name: "Zoi",
            age: 5
        },
    ]

    let table = document.createElement("table");
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");
    let headTr = document.createElement("tr");
    let name = document.createElement("th");
    let age = document.createElement("th");

    for (let el of content) {
        let tr = document.createElement("tr");
        let tdName = document.createElement("td");
        let tdAge = document.createElement("td");

        tdName.innerHTML = el.name;
        tdAge.innerHTML = el.age;

        tr.append(tdName, tdAge)

        tbody.append(tr);
    }

    name.innerHTML = "Name";
    age.innerHTML = "Age";

    headTr.append(name, age);
    thead.append(headTr);
    table.append(thead, tbody);
    divs[1].append(table);

    function sort(cell) {
        let rows = [...tbody.rows];
        
        switch (cell) {
            case "Name":
                rows.sort((a, b) => (a.cells[0].innerHTML).localeCompare(b.cells[0].innerHTML));
                break;
            case "Age":
                rows.sort((a, b) => (+a.cells[1].innerHTML - +b.cells[1].innerHTML));
                break;
        }

        tbody.append(...rows)
    }

    thead.addEventListener("click", (event) => sort(event.target.innerHTML))
})();

// 3. Создать HTML-страницу с блоком текста в рамочке. 
// Реализовать возможность изменять размер блока, если зажать мышку в правом нижнем углу и тянуть ее дальше.
(function() {
    let div = document.createElement("div");
    div.style.cssText = `
        border: 5px solid black;
        width: 100px;
        height: 100px;
    `;
    div.innerHTML = "You can change size of this block"
    divs[2].append(div);

    function changeSize(event) {
        let el = event.currentTarget
        let targetSquare = {
            xStart: el.getBoundingClientRect().right - el.clientLeft,
            yStart: el.getBoundingClientRect().bottom - el.clientTop,
            xEnd: el.getBoundingClientRect().right,
            yEnd: el.getBoundingClientRect().bottom,
        }
        
        let isInSquare = (event.clientX <= targetSquare.xEnd) && (event.clientX >= targetSquare.xStart) && (event.clientY <= targetSquare.yEnd) && (event.clientY >= targetSquare.yStart);

        if (isInSquare) {

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);

            function onMouseMove(event) {
                el.style.width = event.clientX - el.offsetLeft - el.clientLeft + "px";
                el.style.height = event.clientY - el.offsetTop - el.clientTop + "px";
            }

            function onMouseUp() {
                document.removeEventListener('mouseup', onMouseUp);
                document.removeEventListener('mousemove', onMouseMove);
            }
        }
    }
    
    div.addEventListener("mousedown", (event) => changeSize(event)) 
})();