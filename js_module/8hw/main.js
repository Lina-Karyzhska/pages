// 1) Реализовать класс, описывающий окружность. В классе должны быть следующие компоненты:

// поле, хранящее радиус окружности;
// get-свойство, возвращающее радиус окружности;
// set-свойство, устанавливающее радиус окружности;
// get-свойство, возвращающее диаметр окружности;
// метод, вычисляющий площадь окружности;
// метод, вычисляющий длину окружности.
class Circle {
    constructor(r = 1) {
        this.radius = r;
    }

    get radius() {
        console.log("radius", this._radius);
    }

    get diameter() {
        let diameter = 2 * this._radius;
        console.log("diameter", diameter);
    }

    set radius(value) {
        if (value <= 0) {
            console.log("Wrong radius");
            return;
        }

        this._radius = value;
    }

    calcSquare() {
        let square = (Math.PI * this._radius ** 2).toFixed(2);
        console.log("square", square);
    }

    calcLength() {
        let length = (2 * Math.PI * this._radius).toFixed(2);
        console.log("length", length);
    }
}

// Продемонстрировать работу свойств и методов. 
let circle = new Circle(2);
circle.radius;
circle.radius = 5;
circle.radius;
circle.diameter;
circle.calcSquare();
circle.calcLength();

// 2) Реализовать класс, описывающий простой маркер. В классе должны быть следующие компоненты:

// поле, которое хранит цвет маркера;
// поле, которое хранит количество чернил в маркере (в процентах);
// метод для печати (метод принимает строку и выводит текст соответствующим цветом; текст выводится до тех пор, пока в маркере есть чернила; 
// один не пробельный символ – это 0,5% чернил в маркере).
// Реализовать класс, описывающий заправляющийся маркер, унаследовав его от простого маркера и добавив метод для заправки маркера.
class Marker {
    constructor(color = "black", percentage = 100) {
        this.color = color;
        this.loaded = percentage;
    }

    print(text) {
        let index;

        for (let letter of text) {
            index = text.indexOf(letter);

            if (letter != " ") {
                if (this.loaded) {
                    this.loaded -= 0.5;
                } else break;
            }
        }

        let printedText = text.substr(0, index);

        document.write(`<p style="color: ${this.color}">${printedText}</p>`);
    }
}

class LoadingMarker extends Marker {
    loading(percentage) {
        if (percentage >= 0) {
            let ink = this.loaded + percentage;
            this.loaded = ink > 100 ? 100 : ink;
        } else console.log("ERROR");
    }
}

// Продемонстрировать работу написанных методов. 
let marker = new LoadingMarker("green", 8);
marker.print("fghjk vbb!!? nnkkkll fghjklffff");
marker.loading(3);
console.log(marker.loaded);
marker.loading(100);
console.log(marker.loaded);
marker.loading(-1);

// 3) Реализовать класс Employee, описывающий работника, и создать массив работников банка.
class Employee {
    constructor(fullName, position) {
        this.fullName = fullName;
        this.position = position;
    }
}

let bankEmployees = [
    new Employee("Peter Parker", "financial analyst"),
    new Employee("Bartholomew Henry Allen", "accountant"),
    new Employee("Bruce Wayne", "credit expert"),
]

// Реализовать класс EmpTable для генерации HTML-кода таблицы со списком работников банка.
//Массив работников необходимо передавать через конструктор, а получать HTML-код с помощью метода getHtml().
class EmpTable {
    constructor(table = bankEmployees) {
        this.table = [...table];
    }

    getHtml() {
        document.write("<table border='1px' cellpadding='3px' cellspacing='0'>");
        for (let emp of this.table) {
            document.write(`
            <tr>
                <td>${emp.fullName}</td>
                <td>${emp.position}</td>
            </tr>
            `)
        }
        document.write("</table>")
    }
}

// Создать объект класса EmpTable и вывести на экран результат работы метода getHtml().

let empTable = new EmpTable();
empTable.getHtml();