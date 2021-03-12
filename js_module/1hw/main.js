// 1. Запросите у пользователя его имя и выведите в ответ: «Привет, его имя!».
let name = prompt("What's your name?", "noname");
let greeting = `Hello, ${name}!`;
alert(greeting);

// 2. Запросите у пользователя год его рождения, посчитайте, сколько ему лет и выведите результат. Текущий год укажите в коде как константу.
const THIS_YEAR = 2020;
let year_of_birth = prompt("Your year of birth is:");

let age = THIS_YEAR - year_of_birth;
alert(`You are ${age} years old.`);

// 3. Запросите у пользователя длину стороны квадрата и выведите периметр такого квадрата.
let length = prompt("Side length of a square is:");
let perimeter = 4 * length;
alert(`Perimeter of the square is ${perimeter}.`)

// 4. Запросите у пользователя радиус окружности и выведите площадь такой окружности.
const PI = 3.14;
let radius = prompt("Radius of a circle is:");
let circle_square = PI * radius**2;
alert(`Square of the circle is ${circle_square}`);

// 5. Запросите у пользователя расстояние в км между двумя городами и за сколько часов он хочет добраться. Посчитайте скорость, с которой необходимо двигаться, чтобы успеть вовремя.
let distance = prompt("What is the distance between cities? (km)");
let time = prompt("How much time do you have? (hours)");
let velocity = distance / time;
alert(`Your velocity must be ${velocity} km per hour.`);

// 6. Реализуйте конвертор валют. Пользователь вводит доллары, программа переводит в евро. Курс валюты храните в константе.
const K = 0.84;
let dollars = prompt("How much dollars do you have?");
let euro = dollars * K;
alert(`You can buy ${euro} euro.`);

// 7. Пользователь указывает объем флешки в Гб. Программа должна посчитать, сколько файлов размером в 820 Мб помещается на флешку.
const FILES_WEIGHT = 820;
let memory = prompt("How much memory do you have?");
let quantity = (memory - (memory % FILES_WEIGHT)) / FILES_WEIGHT;
alert(`Quantity of files is ${quantity}`);

// 8. Делали на уроке

// 9. Запросите у пользователя трехзначное число и выведите его задом наперед. Для решения задачи вам понадобится оператор % (остаток от деления).
let number = prompt("Enter three-digit number.")
let first_digit = number % 10;
let second_digit = ((number % 100) - (number % 10)) / 10;
let third_digit = (number - (number % 100)) / 100;
let number_reverse = first_digit * 100 + second_digit * 10 + third_digit;
alert(number_reverse);

// 10. Пользователь вводит сумму вклада в банк на 2 месяца, с процентной ставкой депозита 5% годовых. Вывести сумму начисленных процентов.
let month_interest_rate = 0.05 / 12;
let deposit = prompt("Enter your deposit.");
let simple_interest = Math.round(deposit * month_interest_rate * 2);
let compund_interest = Math.round((deposit * (1 + month_interest_rate)**2) - deposit);
alert(`Simple interest: ${simple_interest}; \nCompond interest: ${compund_interest}.`);

// Работа с переменными
// важность: 2
// 1.	Объявите две переменные: admin и name.
// 2.	Запишите строку "Джон" в переменную name.
// 3.	Скопируйте значение из переменной name в admin.
// 4.	Выведите на экран значение admin, используя функцию alert (должна показать «Джон»).

let admin,
    Name;

Name = "John";

admin = Name;
alert(admin);

// Шаблонные строки
// важность: 5
// Что выведет этот скрипт?
// let name = "Ilya";

// alert( `hello ${1}` ); // hello 1

// alert( `hello ${"name"}` ); // hello name

// alert( `hello ${name}` ); // hello Ilya



// Исправьте сложение
// Ниже приведён код, который запрашивает у пользователя два числа и показывает их сумму.
// Он работает неправильно. Код в примере выводит 12 (для значения полей по умолчанию).
// В чём ошибка? Исправьте её. Результат должен быть 3.
let a = prompt("Первое число?", 1);
let b = prompt("Второе число?", 2);

alert(+a + +b); // 3




