const array = [1, 2, -3, 2.5, -4, 0, 8, 12];

// Дан массив с числами. Создайте новый массив, состоящий из квадратов этих чисел.
let arraySquare = [];

array.forEach(el => arraySquare.push(el**2));

console.log("arraySquare", arraySquare);

// Дан массив с числами. Найдите сумму этих чисел. 
let arraySum = 0;

array.forEach(el => arraySum += el);

console.log("arraySum", arraySum);

// Дан массив с числами. Сделайте из него массив, состоящий из квадратов этих чисел.

let arrayMap = array.map(el => el**2);

console.log("arrayMap", arrayMap);

// Дан массив с числами. Проверьте то, что все элементы в массиве больше нуля.

let areEveryPos = array.every(el => el > 0);

console.log("areEveryPos", areEveryPos);

// Дан массив с числами. Проверьте то, что в нем есть отрицательные элементы.

let areSomeNeg = array.some(el => el < 0);

console.log("areSomeNeg", areSomeNeg);

// Дан массив с числами. Оставьте в нем только отрицательные числа.

let arrayNeg = array.filter(el => el < 0);

console.log("arrayNeg", arrayNeg);

// Дан массив с числами. Оставьте в нем только четные числа.

let arrayEven = array.filter(el => !(el % 2));

console.log("arrayEven", arrayEven);

// Дан массив со строками. Оставьте в нем только те строки, длина которых больше 5-ти символов.

const arrayStrings = ['bla', 'bl', 'blabla', 'blablabla', 'b'];

let strMoreThan5 = arrayStrings.filter(el => el.length > 5);

console.log("strMoreThan5", strMoreThan5);

// Дан массив, в нем могут быть обычные элементы и подмассивы, например [1, 2, [3, 4], 5, [6, 7]]. Оставьте в нем только подмассивы.

const arr = [1, 2, [3, 4], 5, [6, 7]];

let arrayOfArrays = arr.filter(el => Array.isArray(el));

console.log("arrayOfArrays", arrayOfArrays);

// Дан массив с числами. Посчитайте количество отрицательных чисел в этом массиве.

let numOfNeg = array.filter(el => el < 0).length;

console.log("numOfNeg", numOfNeg)

// Дан массив с числами. Найдите сумму этих чисел. 

let sum = array.reduce((prevVal, curVal) => prevVal + curVal);

console.log("sum", sum);

//  Дан массив с числами. Найдите сумму первых N элементов до первого нуля. 
// Пример: [1, 2, 3, 0, 4, 5, 6] - суммируем первые 3 элемента, так как дальше стоит элемент с числом 0. 
let wasZero = false;

let sumBeforeZero = array.reduce((prevVal, curVal) => {
    if (curVal == 0 || wasZero) {
        wasZero = true;
        return prevVal;
    } else {
        return prevVal + curVal
    }
}, 0);

console.log("sumBeforeZero", sumBeforeZero);

// Дан массив с числами. Найдите сумму последних N элементов до первого нуля с конца. 
// Пример: [1, 2, 3, 0, 4, 5, 6] - суммируем последние 3 элемента, так как дальше стоит элемент с числом 0.
wasZero = false;

let sumBeforeZeroR = array.reduceRight((prevVal, curVal) => {
    if (curVal == 0 || wasZero) {
        wasZero = true;
        return prevVal;
    } else {
        return prevVal + curVal
    }
}, 0);

console.log("sumBeforeZeroR", sumBeforeZeroR);

//  Дан массив с числами. Узнайте сколько элементов с начала массива надо сложить, чтобы в сумме получилось больше 10-ти.

let quantity = 1;

array.reduce((prevVal, curVal) => {
    let sum = prevVal + curVal 
    if (sum < 10) {
        quantity++;
        return sum;
    }
});

console.log("quantity", quantity);

// Дан массив с числами. Узнайте сколько элементов с конца массива надо сложить, чтобы в сумме получилось больше 10-ти. 

quantity = 1;

array.reduceRight((prevVal, curVal) => {
    let sum = prevVal + curVal 
    if (sum < 10) {
        quantity++;
        return sum;
    }
});

console.log("quantityRight", quantity);

// Дан массив с числами. Оставьте в нем только положительные числа. Затем извлеките квадратный корень из этих чисел.

let sqrtArr = array.filter(el => el > 0).map(el => Math.sqrt(el));

console.log("sqrtArr", sqrtArr);




