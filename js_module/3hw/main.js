// Подсчитать сумму всех чисел в заданном пользователем диапазоне.
let first_number;
let last_number;
let result = 0;

do {
    first_number = +prompt("Enter a first number from your range");
    last_number = +prompt("Enter a last number from your range");
} while (!first_number || !last_number || first_number > last_number)

let first_addend = first_number % 1 == 0 ? first_number : first_number + (1 - first_number % 1);

for (let i = first_addend; i <= last_number; i++) {
    result += i;
}

console.log(result);

// Запросить 2 числа и найти только наибольший общий делитель.
let first_num;
let second_num; 

do {
    first_num = +prompt("Enter a frist number");
    second_num = +prompt("Enter a second num"); 
} while (first_num <= 0 || second_num <= 0 || first_num % 1 != 0 || second_num % 1 != 0)

while (first_num != 0 && second_num != 0) {
    if ( first_num > second_num) {
        first_num = first_num % second_num;
    } else {
        second_num = second_num % first_num;
    }
}

first_num == 0 ? console.log(second_num) : console.log(first_num);

// Запросить у пользователя число и вывести все делители этого числа.
let number;

do {
    number = +prompt("Enter your number");
} while (number <= 0 || number % 1 != 0)

for (let i = 1; i <= number; i++) {
    if (number % i == 0) {
        console.log(i);
    }
}

// Определить количество цифр в введенном числе.
let num;

do {
    num = +prompt("Enter your number");
} while (num % 1 != 0)

let j = 1;

for (let i = 10; ; i *= 10) {
    if (Math.abs(num) < i) {
        console.log(`Your number has ${j} digits`);
        break;
    } else {
        j++;
    }
}

// Запросить у пользователя 10 чисел и подсчитать, сколько он ввел положительных, отрицательных и нулей. При этом также посчитать, 
// сколько четных и нечетных. Вывести статистику на экран. Учтите, что достаточно одной переменной (не 10) для ввода чисел пользователем.
let num1;
let pos = 0,
    neg = 0,
    zeros = 0,
    odds = 0,
    evens = 0,
    i = 0;

do {
    num1 = +prompt("Enter a number");

    if (num1 % 1 != 0) {
    } else {
        if (num1 > 0) {
            pos++;
        } else if (num1 < 0) {
            neg++;
        } else {
            zeros++;
            i++;
            continue;
        }
        
        if (num1 % 2 == 0) {
            evens++;
        } else {
            odds++;
        }

        i++;
    }

} while (num1 % 1 != 0 || i < 10)

console.log(`positive numbers: ${pos}; \nnegative numbers: ${neg}; \nzeros: ${zeros}; \neven numbers: ${evens}; \nodd numbers: ${odds}`);

// Зациклить калькулятор. Запросить у пользователя 2 числа и знак, решить пример, вывести результат и спросить, 
// хочет ли он решить еще один пример. И так до тех пор, пока пользователь не откажется.
let number1,
    number2,
    action;
let result1;
let answer;

do {
    number1 = +prompt("Enter a first number");
    number2 = +prompt("Enter a second number");
    action = prompt("Enter an action");

    if (number1 && number2) {
        switch (action) {
            case "+":
                result1 = number1 + number2;
                break;
            case "-":
                result1 = number1 - number2;
                break;
            case "*":
                result1 = number1 * number2;
                break;
            case "/":
                result1 = number1 / number2;
                break;
            case "^":
                result1 = number1 ** number2;
                break;
            default:
                continue;  
            }
        } else {
            continue;
        }

        do {
             answer = prompt(`Result: ${result1}. \nDo you want to solve one more equation? (yes or no)`)
        } while (answer != "yes" && answer != "no")
} while (answer != "no")

// Запросить у пользователя число и на сколько цифр его сдвинуть. Сдвинуть цифры числа и вывести результат 
// (если число 123456 сдвинуть на 2 цифры, то получится 345612).
let numeric,
    shift;
let new_numeric = "";

do {
    numeric = prompt("Enter a number");
    shift = +prompt("Enter a shift");
} while (+numeric % 1 != 0 || shift % 1 != 0 || +numeric <= 0 || shift <= 0 || shift > numeric.length)

for (let i = 0; i < numeric.length - shift; i++) {
    new_numeric += numeric[i + shift];
}

for (let j = 0; j < shift; j++) {
    new_numeric += numeric[j];
}

console.log(new_numeric)

// Зациклить вывод дней недели таким образом: «День недели. Хотите увидеть следующий день?» и так до тех пор, пока пользователь нажимает OK.
let i = 1;
let bool;

do {
    switch(i) {
        case 1:
            bool = confirm("Monday. \nDo you want to see the next day?");
            break;
        case 2:
            bool = confirm("Tuesday. \nDo you want to see the next day?");
            break;
        case 3:
            bool = confirm("Wednesday. \nDo you want to see the next day?");
            break;
        case 4:
            bool = confirm("Thursday. \nDo you want to see the next day?");
            break;
        case 5:
            bool = confirm("Friday. \nDo you want to see the next day?");
            break;
        case 6:
            bool = confirm("Saturday. \nDo you want to see the next day?");
            break;
        case 7:
            bool = confirm("Sunday. \nDo you want to see the next day?");
            break;
    }
    if (i == 7) {
        i = 1;
    } else {
        i++
    }
} while (bool);

// Вывести таблицу умножения для всех чисел от 2 до 9. Каждое число необходимо умножить на числа от 1 до 10.
document.write("<div style = 'display: flex; justify-content: space-around;'>")
for (let i = 2; i <= 9; i++) {
    document.write("<div>")

    for (let j = 1; j <= 10; j++) {
        document.write(`<p> ${i} * ${j} = ${i * j} </p>`)
    }

    document.write("</div>")
}
document.write("</div>")

// Игра «Угадай число». Предложить пользователю загадать число от 0 до 100 и отгадать его следующим способом: каждую итерацию 
// цикла делите диапазон чисел пополам, записываете результат в N и спрашиваете у пользователя «Ваше число > N, < N или == N?». 
// В зависимости от того, что указал пользователь, уменьшаете диапазон. Начальный диапазон от 0 до 100, поделили пополам и получили 50. 
// Если пользователь указал, что его число > 50, то изменили диапазон на от 51 до 100. И так до тех пор, пока пользователь не выберет == N.
alert("Pick a number from 0 to 100.");
let answer;
let i = 100; 
let j = 0;
let n;

while (answer != "==") {
    n = ((i + j) - ((i + j) % 2)) / 2;

    do {
        answer = prompt(`Ваше число > ${n}, < ${n} или == ${n}?`);
    } while (answer != "<" && answer != ">" && answer != "==") 

    if (answer == "==") {
        numeric1 = i;
        break;
    } else if (answer == "<") {
        i = n;
    } else {
        j = n;
    }
}

console.log(n);