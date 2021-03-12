// 1. Создать массив «Список покупок». Каждый элемент массива является объектом, который содержит название продукта, 
// необходимое количество и куплен или нет. Написать несколько функций для работы с таким массивом.
function Product(name, quantity, isBought = false) {
    this.name = name;
    this.quantity = quantity;
    this.isBought = isBought;
}

const productList = [
    new Product("bread", 2, true),
    new Product("milk", 1, false),
    new Product("juice", 1, false),
    new Product("butter", 1, true),
    new Product("eggs", 15, false),
]

// Вывод всего списка на экран таким образом, чтобы сначала шли некупленные продукты, а потом – купленные.
function showProductList(arr = productList) {
    // let notBought = arr.filter(el => !el.isBought);
    // let bought = arr.filter(el => el.isBought);
    // let sort = [].concat(notBought, bought);

    let sortArr = [...arr]
    sortArr.sort( (prevItem, nextItem) => prevItem.isBought - nextItem.isBought );

    sortArr.forEach(item => console.log(`sort: name - ${item.name}; quantity - ${item.quantity}; isBougth - ${item.isBought}`));
    console.log("end")
}

// Добавление покупки в список. Учтите, что при добавлении покупки с уже существующим в списке продуктом, 
// необходимо увеличивать количество в существующей покупке, а не добавлять новую.
function addProduct(name, quantity, arr = productList) {
    for (let item of arr) {
        if (item.name == name) {
            item.quantity += quantity;
            item.isBought = false;
            break;
        } else if (arr.indexOf(item) == (arr.length - 1)) {
            arr.push(new Product(name, quantity))
        }
    }
}

// Покупка продукта. Функция принимает название продукта и отмечает его как купленный.
function purchase(name, arr = productList) {
    arr.find(item => item.name == name).isBought = true;
}

productList.forEach(item => console.log(`default: name - ${item.name}; quantity - ${item.quantity}; isBougth - ${item.isBought}`));
console.log("end")
showProductList();
addProduct("bread", 1)
showProductList();
addProduct("orange", 5);
showProductList();
purchase("orange");
showProductList();

// 2. Создать массив, описывающий чек в магазине. Каждый элемент массива состоит из названия товара, количества и цены за единицу товара. 
function Product2(name, quantity, price) {
    this.name = name;
    this.quantity = quantity;
    this.price = price;
}

const bill = [
    new Product2("bread", 2, 10),
    new Product2("milk", 1, 20),
    new Product2("juice", 1, 30),
    new Product2("butter", 1, 17),
    new Product2("eggs", 15, 2.8),
];

// Распечатка чека на экран;
function showBill(arr = bill) {
    bill.forEach(item => console.log(`${item.name}: ${item.quantity} x ${item.price} hrn`));

    this.total();
}
// Подсчет общей суммы покупки;
function total(arr = bill) {
    let prices = arr.map(item => item.quantity * item.price);
    let totalPrice = prices.reduce((sum, curr) => sum + curr);
    console.log(`total: ${totalPrice}`);
}

// Получение самой дорогой покупки в чеке;
function  maxPrice(arr = bill) {
    let prices = arr.map(item => item.quantity * item.price);
    let maxPrice = prices.reduce((max, next) => max > next ? max : next);
    console.log("maxPrice", maxPrice);
}

// Подсчет средней стоимости одного товара в чеке.
function averagePrice(arr = bill) {
    let averagePrice = arr.reduce((prev, next) => prev + next.price, 0) / arr.length;
    console.log("averagePrice", averagePrice.toFixed(2))
}

showBill();
maxPrice();
averagePrice();

// 3. Создать массив CSS-стилей (цвет, размер шрифта, выравнивание, подчеркивание и т. д.). 
// Каждый элемент массива – это объект, состоящий из двух свойств: название стиля и значение стиля. 
function Style(prop, value) {
    this.prop = prop;
    this.value = value;
}

const styles = [
    new Style("color", "red"),
    new Style("font-size", "20px"),
    new Style("letter-spacing", "1.5px"),
    new Style("font-weight", "bold")
]

// Написать функцию, которая принимает массив стилей и текст, и выводит этот текст с помощью document.write() в тегах <p></p>, 
// добавив в открывающий тег атрибут style со всеми стилями, перечисленными в массиве.
function addText(arr, text) {
    let styles = "";
    for (let style of arr) {
        styles += `${style.prop}: ${style.value}; `;
    }

    document.write(`<p style = "${styles}">${text}</p>`);
}

addText(styles, "blalalala")
// 4. Создать массив аудиторий академии. Объект-аудитория состоит из названия, количества посадочных мест (от 10 до 20) 
// и названия факультета, для которого она предназначена. Написать несколько функций для работы с ним.
function Auditorium(name, places, faculty) {
    this.name = name;
    this.places = places;
    this.faculty = faculty;
}

const auditoriums = [
    new Auditorium("A201", 15, "f-m"),
    new Auditorium("C202", 12, "f-m"),
    new Auditorium("Z102", 17, "inform"),
    new Auditorium("P302", 12, "fil"),
    new Auditorium("K302", 13, "fil"),
    new Auditorium("U303", 19, "fil"),
]

// Вывод на экран всех аудиторий;
function showAuditoriums(arr = auditoriums) {
    arr.forEach(item => console.log(`name - ${item.name}; places - ${item.places}; faculty - ${item.faculty}`)); 
    console.log("end");
}

// Вывод на экран аудиторий для указанного факультета;
function showFacultyAuditoriums(faculty, arr = auditoriums) {
    showAuditoriums(arr.filter(item => item.faculty == faculty));
}

// Вывод на экран только тех аудиторий, которые подходят для переданной группы. 
// Объект-группа состоит из названия, количества студентов и названия факультета;
const group = {
    name: "BI-401",
    quantity: 14,
    faculty: "fil",
}

function showGroupsAuditoriums(gr = group, arr = auditoriums) {
    showAuditoriums(arr.filter(item => (item.faculty == gr.faculty && item.places >= gr.quantity)));
}

// Функция сортировки аудиторий по количеству мест;
function sortAuditoriums(arr = auditoriums) {
    let sortArr = [...arr];
    sortArr.sort((a, b) => (a.places - b.places));
    showAuditoriums(sortArr);
}

// Функция сортировки аудиторий по названию (по алфавиту).

function sortByAlphabeth(arr = auditoriums) {
    let sortArr = [...arr];
    sortArr.sort((a, b) => (a.name).localeCompare(b.name));
    showAuditoriums(sortArr);
}

showAuditoriums();
showFacultyAuditoriums("f-m");
showGroupsAuditoriums();
sortAuditoriums();
sortByAlphabeth();
