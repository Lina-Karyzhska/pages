(function() {
    let btns = [...$(".sect__btn")];
    let tabs = [...$(".tab")];

    $(".sect__btns").on("click", (event) => activate(event));

    function activate(event) {
        if (!$($(event.target).parent(".sect__btn_wrapper")).hasClass("active-tab") && $(event.target)[0].tagName == "BUTTON") {
            let activeBtn = btns.find((el) => $($(el).parent(".sect__btn_wrapper")).hasClass("active-tab"));
            $($(activeBtn).parent(".sect__btn_wrapper")).toggleClass("active-tab")

            let index = btns.findIndex((el) => el == activeBtn);
            $(tabs.find((el) => tabs.indexOf(el) == index)).css("display", "none")

            $($(event.target).parent(".sect__btn_wrapper")).toggleClass("active-tab");
            $(tabs.find((el) => btns.indexOf(event.target) == tabs.indexOf(el))).css("display", "flex")
        }
    }
})();

(function() {
    $(".btn").on("click", (event) => newcalculator.calculator(event));

    class Display {
        constructor() {
            this._inpuField = $(".inputField")[0];
            this._span = $(".inputField span:last-child")[0];
            this._btn;
            this._index = 0;
            this._res = $(".res")[0];
        }

        get index() {
            return this._index;
        }
        
        get span() {
            return this._span;
        }

        setSpan() {
            this._span = $(".inputField span:last-child")[0];
        }

        writeInInputField(event) {
            this._btn = $(event.target).text();
            this._processInput();
        }
        
        writeResult(result) {
            let res = $(".res")[0];
            if ($(this._inpuField).text() == "0") {
                $($(res).children()).remove(); 
                return;
            }

            if ($(res).text() == "") {
                $(res).append($("<span></span>").text("="), $("<span id='res'></span>").text(`${result}`))
            } else {
                $("#res").text(`${result}`)
            }
        }
        
        _isActionRepeated() {
            return ((this._btn == "." && $(this._span).text().includes(".")) || (this._isPreviousInputAnAction() && $(this._span).text() == ` ${this._btn} `));
        }

        _isInputFirst() {
            return (this._index == 0 && $(this._inpuField).text() == "0") ? true : false;
        }

        _isPreviousInputAnAction() {
            return $(this._span).hasClass("act");
        }

        _writeDigit() {
            if (this._isInputFirst() && this._btn != ".") {
                    $(`#0`).text(this._btn);
            } else {
                if (this._isPreviousInputAnAction()) {
                    let newSpan = $(`<span id="${this._index + 1}"></span>`).text(`${this._btn}`);
                    $(this._inpuField).append(newSpan);
                    ++this._index;
                } else {
                    let text = $(this._span).text() + this._btn;
                    $(this._span).text(text);
                }
            }
        }

        _deleteLastSign() {
            if (this._isPreviousInputAnAction())  {
                $(this._span).remove();
            } else {
                let text = $(this._span).text();
                text = [...text];
                text.pop();

                if (text.length) {
                    $(this._span).text(text.join(""))
                } else {
                    if (this._index == 0 ) {
                        $(this._span).text("0")
                    } else {
                        --this._index; 
                        $(this._span).remove();
                    }
                }
            }
        }

        _cleanDisplay() {
            $(this._inpuField).children().remove();
            let newSpan = $(`<span id="0"></span>`).text("0");
            $(this._inpuField).append(newSpan);
            this._index = 0;
        }

        _writeAnAction() {
            if (this._isPreviousInputAnAction()) {
                $(this._span).text(` ${this._btn} `);
            } else {
                let spanBtn = $(`<span class="act"></span>`).text(` ${this._btn} `);
                $(this._inpuField).append(spanBtn);
            }
        }

        _getPercentage() {
            let value;
            if (this._index) {
                value = +$(`#${this._index - 1}`).text() * +$(this._span).text() / 100;
            } else {
                value = +$(this._span).text() / 100;
            }

            $(this._span).text(value);
        }

        _targetResult() {
            if (!this._isPreviousInputAnAction() && $(this._span).text() != "0" && !$(this._res).hasClass("target")) {
                $(".inputField").toggleClass("target");
                $(".res").toggleClass("target");
                this._index = 0;
            }
        }

        _getPrevRes() {
            if ($(this._res).hasClass("target") && this._btn != "=") {
                $(".prev__act").text($(".inputField").text());
                $(".prev__res").text($(".res").text());
                this._cleanDisplay();
                $(".res").text("");
                $(".inputField").toggleClass("target");
                $(".res").toggleClass("target");
            }
        }

        _handleInput() {
            this._getPrevRes()
            if (!isNaN(this._btn) || this._btn == ".") {
                this._writeDigit();
            } else {
                switch(this._btn) {
                    case "del": 
                        this._deleteLastSign();
                        break;

                    case "C": 
                        this._cleanDisplay();
                        break;

                    case "%":
                        if (this._isPreviousInputAnAction()) break;
                        this._getPercentage();
                        break;
                    
                    case "=":
                        this._targetResult();
                        break;

                    default:
                        this._writeAnAction();
                        break;
                }
            }
        }

        _processInput() {
            if (this._isActionRepeated()) return;
            this._handleInput();
        }


    }

    class Operations {
        constructor() {
            this._action;
            this._value = "0";
            this._prevRes = [];
            this._result = 0;
            this._index;
            this._span;
            this._actNum = 0;
        }

        set value(value) {
            this._value = value;
        }

        set result(value) {
            this._result = value;
        }

        set index(value) {
            this._index = value;
        }

        set span(value) {
            this._span = value;
        }

        _handleOperations(operation) {
            switch(operation) {
                case "+":
                    this._result += +this._value;
                    break;

                case "-":
                    this._result -= +this._value;
                    break;

                case "*":
                     this._result *= +this._value;
                    break;

                case "/":
                    this._result /= +this._value;
                    break;

                case "^":
                    this._result **= +this._value;
                    break;
            }
        }

        _cacheResult() {
            this._prevRes.unshift(this._result);
        }

        _calculate() {
            if (this._value == ` ${this._action} `) {
                if (this._index == 0 && !this._result) {
                    this._cacheResult();
                } else {
                    this._result = this._prevRes[0];
                }
            } else {
                if (this._actNum != this._index) {
                    --this._actNum;
                    this._result = this._prevRes[this._value.length - 1];
                }

                if (this._index == 0 && !isNaN(+this._value)) {
                    this._result = +this._value;
                } else {
                    this._handleOperations(this._action)
                }
                this._result = +this._result.toFixed(5)
                this._cacheResult();
            }
            ++this._actNum;
            return this._result;
        }

        getResult(event) { 
            this._action = $(".act").last().text()[1]
            let result = 0;
            
            if ($(event.target).text() == "del") {
                if (!$(this._span).hasClass("act")) {
                    this._prevRes.shift();
                    this._result = this._prevRes[0];
                }
                result = this._result;
            } else if ($(event.target).text() == "C") {
                this._prevRes = [];
                this._result = 0;
            } else if ( $(event.target).text() == "=") {
                this._prevRes = [];
                this._actNum = 0;
                result = this._result;
                this._result = 0;
            } else {
                result = this._calculate()
            }

            return result;
        }
    }

    class Calculator {
        constructor() {
            this.display = new Display();
            this.operations = new Operations();
        }

        calculator(event) {
            // this.display.getPrevRes();
            this.display.writeInInputField(event);
            this.operations.index = this.display.index;
            this.operations.span = this.display.span;
            this.display.setSpan();
            this.operations.value = $(this.display.span).text();

            let result = this.operations.getResult(event);
            this.display.writeResult(result)
    }
    }
    
    const newcalculator = new Calculator();
    
})()