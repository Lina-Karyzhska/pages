//  1. Создать объект, описывающий автомобиль (производитель, модель, год выпуска, средняя скорость), и следующие функции для работы с этим объектом:
const car = {
    manufacturer: "Chevrolet",
    model: "Impala",
    yearOfIssue: 1967,
    averageSpeed: 100
}

// Функция для вывода на экран информации об автомобиле;
car.info = function () {
    console.log("Manufacturer:", this.manufacturer);
    console.log("Model:", this.model);
    console.log("year of issue:", this[yearOfIssue]);
    console.log("average speed:", `${this[averageSpeed]} km/h`);
}

// Функция для подсчета необходимого времени для преодоления переданного расстояния со средней скоростью. Учтите, что через каждые 4 часа дороги водителю необходимо делать перерыв на 1 час.
car.time = function (distance = 10) {
    let time = (distance / this[averageSpeed]) + Math.trunc((distance / this[averageSpeed]) / 4);
    console.log(`time required for ${distance} km:`, `${time} hours`);
}

console.log(car);
car.info();
car.time(10500);


// 2. Создать объект, хранящий в себе отдельно числитель и знаменатель дроби, и следующие функции для работы с этим объектом: 
function Fraction(numerator, denominator) {
    this.numerator = numerator;
    this.denominator = denominator
}

let fraction1 = new Fraction(1, 2);
let fraction2 = new Fraction(5, 6);
console.log(fraction1)
// Функция сложения 2-х объектов-дробей;
function sum(first, second) {
    let newNumerator = (first.numerator * second.denominator) + (second.numerator * first.denominator);
    let newDenominator = first.denominator * second.denominator;

    return new Fraction(newNumerator, newDenominator);
}

// Функция вычитания 2-х объектов-дробей;
function subtract(firstFraction, secondFraction) {
    let newNumerator = (firstFraction.numerator * secondFraction.denominator) - (secondFraction.numerator * firstFraction.denominator);
    let newDenominator = firstFraction.denominator * secondFraction.denominator;

    return new Fraction(newNumerator, newDenominator);
}

// Функция умножения 2-х объектов-дробей;
function multiply(firstFraction, secondFraction) {
    let newNumerator = firstFraction.numerator * secondFraction.numerator;
    let newDenominator = firstFraction.denominator * secondFraction.denominator;

    return new Fraction(newNumerator, newDenominator);
}

// Функция деления 2-х объектов-дробей;
function division(firstFraction, secondFraction) {
    let newNumerator = firstFraction.numerator * secondFraction.denominator;
    let newDenominator = firstFraction.denominator * secondFraction.numerator;

    return new Fraction(newNumerator, newDenominator);
}

// Функция сокращения объекта-дроби.
function reduce(fraction) {
    let a = Math.abs(fraction.numerator);
    let b = Math.abs(fraction.denominator);

    while(a != 0 && b != 0) {
        if (a > b) {
            a = a % b;
        } else {
            b = b % a;
        }
    }

    let gcd = a + b;

    let newNumerator = fraction.numerator / gcd;
    let newDenominator = fraction.denominator / gcd;

    return new Fraction(newNumerator, newDenominator);
}
 
let sumOfFractions = sum(fraction1, fraction2);
console.log("sumOfFractions", sumOfFractions);
console.log(reduce(sumOfFractions));

let subtractOfFractions = subtract(fraction1, fraction2);
console.log("subtractOfFractions", subtractOfFractions);
console.log(reduce(subtractOfFractions));

let multiplyOfFractions = multiply(fraction1, fraction2);
console.log("multiplyOfFractions", multiplyOfFractions);
console.log(reduce(multiplyOfFractions));

let divisionOfFractions = division(fraction1, fraction2);
console.log("divisionOfFractions", divisionOfFractions);
console.log(reduce(divisionOfFractions));


// 3. Создать объект, описывающий время (часы, минуты, секунды), и следующие функции для работы с этим объектом: 
let liveTime = new Date();

const time = {
    hours: liveTime.getHours(),
    minutes: liveTime.getMinutes(),
    seconds: liveTime.getSeconds(),
}

// Функция вывода времени на экран;
time.show = function () {
    let h = this.hours >= 10 ? this.hours : `0${this.hours}`;
    let m = this.minutes >= 10 ? this.minutes : `0${this.minutes}`;
    let s = this.seconds >= 10 ? this.seconds : `0${this.seconds}`;

    console.log(`${h}:${m}:${s}`)
}

// Функция изменения времени на переданное количество секунд;
time.changeSeconds = function (sec) {
    let s = this.seconds + sec;
    this.seconds = s % 60;

    this.changeMinutes(Math.trunc(s / 60));
}

// Функция изменения времени на переданное количество минут;
time.changeMinutes = function (min) {
    let m = this.minutes + min;
    this.minutes = m % 60;

    this.changeHours(Math.trunc(m / 60));
}

// Функция изменения времени на переданное количество часов. 
time.changeHours = function (hours) {
    this.hours = (this.hours + hours) % 24;

    this.show();
}

time.show();

time.changeSeconds(180);

time.changeMinutes(79);

time.changeHours(17);
// Учтите, что в последних 3-х функциях, при изменении одной части времени, может измениться и другая. Например, если ко времени «20:30:45» добавить 30 секунд, то должно получиться «20:31:15», а не «20:30:75».