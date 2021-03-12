"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

(function () {
  var btns = _toConsumableArray($(".sect__btn"));

  var tabs = _toConsumableArray($(".tab"));

  $(".sect__btns").on("click", function (event) {
    return activate(event);
  });

  function activate(event) {
    if (!$($(event.target).parent(".sect__btn_wrapper")).hasClass("active-tab") && $(event.target)[0].tagName == "BUTTON") {
      var activeBtn = btns.find(function (el) {
        return $($(el).parent(".sect__btn_wrapper")).hasClass("active-tab");
      });
      $($(activeBtn).parent(".sect__btn_wrapper")).toggleClass("active-tab");
      var index = btns.findIndex(function (el) {
        return el == activeBtn;
      });
      $(tabs.find(function (el) {
        return tabs.indexOf(el) == index;
      })).css("display", "none");
      $($(event.target).parent(".sect__btn_wrapper")).toggleClass("active-tab");
      $(tabs.find(function (el) {
        return btns.indexOf(event.target) == tabs.indexOf(el);
      })).css("display", "flex");
    }
  }
})();

(function () {
  $(".btn").on("click", function (event) {
    return newcalculator.calculator(event);
  });

  var Display =
  /*#__PURE__*/
  function () {
    function Display() {
      _classCallCheck(this, Display);

      this._inpuField = $(".inputField")[0];
      this._span = $(".inputField span:last-child")[0];
      this._btn;
      this._index = 0;
      this._res = $(".res")[0];
    }

    _createClass(Display, [{
      key: "setSpan",
      value: function setSpan() {
        this._span = $(".inputField span:last-child")[0];
      }
    }, {
      key: "writeInInputField",
      value: function writeInInputField(event) {
        this._btn = $(event.target).text();

        this._processInput();
      }
    }, {
      key: "writeResult",
      value: function writeResult(result) {
        var res = $(".res")[0];

        if ($(this._inpuField).text() == "0") {
          $($(res).children()).remove();
          return;
        }

        if ($(res).text() == "") {
          $(res).append($("<span></span>").text("="), $("<span id='res'></span>").text("".concat(result)));
        } else {
          $("#res").text("".concat(result));
        }
      }
    }, {
      key: "_isActionRepeated",
      value: function _isActionRepeated() {
        return this._btn == "." && $(this._span).text().includes(".") || this._isPreviousInputAnAction() && $(this._span).text() == " ".concat(this._btn, " ");
      }
    }, {
      key: "_isInputFirst",
      value: function _isInputFirst() {
        return this._index == 0 && $(this._inpuField).text() == "0" ? true : false;
      }
    }, {
      key: "_isPreviousInputAnAction",
      value: function _isPreviousInputAnAction() {
        return $(this._span).hasClass("act");
      }
    }, {
      key: "_writeDigit",
      value: function _writeDigit() {
        if (this._isInputFirst() && this._btn != ".") {
          $("#0").text(this._btn);
        } else {
          if (this._isPreviousInputAnAction()) {
            var newSpan = $("<span id=\"".concat(this._index + 1, "\"></span>")).text("".concat(this._btn));
            $(this._inpuField).append(newSpan);
            ++this._index;
          } else {
            var text = $(this._span).text() + this._btn;

            $(this._span).text(text);
          }
        }
      }
    }, {
      key: "_deleteLastSign",
      value: function _deleteLastSign() {
        if (this._isPreviousInputAnAction()) {
          $(this._span).remove();
        } else {
          var text = $(this._span).text();
          text = _toConsumableArray(text);
          text.pop();

          if (text.length) {
            $(this._span).text(text.join(""));
          } else {
            if (this._index == 0) {
              $(this._span).text("0");
            } else {
              --this._index;
              $(this._span).remove();
            }
          }
        }
      }
    }, {
      key: "_cleanDisplay",
      value: function _cleanDisplay() {
        $(this._inpuField).children().remove();
        var newSpan = $("<span id=\"0\"></span>").text("0");
        $(this._inpuField).append(newSpan);
        this._index = 0;
      }
    }, {
      key: "_writeAnAction",
      value: function _writeAnAction() {
        if (this._isPreviousInputAnAction()) {
          $(this._span).text(" ".concat(this._btn, " "));
        } else {
          var spanBtn = $("<span class=\"act\"></span>").text(" ".concat(this._btn, " "));
          $(this._inpuField).append(spanBtn);
        }
      }
    }, {
      key: "_getPercentage",
      value: function _getPercentage() {
        var value;

        if (this._index) {
          value = +$("#".concat(this._index - 1)).text() * +$(this._span).text() / 100;
        } else {
          value = +$(this._span).text() / 100;
        }

        $(this._span).text(value);
      }
    }, {
      key: "_targetResult",
      value: function _targetResult() {
        if (!this._isPreviousInputAnAction() && $(this._span).text() != "0" && !$(this._res).hasClass("target")) {
          $(".inputField").toggleClass("target");
          $(".res").toggleClass("target");
          this._index = 0;
        }
      }
    }, {
      key: "_getPrevRes",
      value: function _getPrevRes() {
        if ($(this._res).hasClass("target") && this._btn != "=") {
          $(".prev__act").text($(".inputField").text());
          $(".prev__res").text($(".res").text());

          this._cleanDisplay();

          $(".res").text("");
          $(".inputField").toggleClass("target");
          $(".res").toggleClass("target");
        }
      }
    }, {
      key: "_handleInput",
      value: function _handleInput() {
        this._getPrevRes();

        if (!isNaN(this._btn) || this._btn == ".") {
          this._writeDigit();
        } else {
          switch (this._btn) {
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
    }, {
      key: "_processInput",
      value: function _processInput() {
        if (this._isActionRepeated()) return;

        this._handleInput();
      }
    }, {
      key: "index",
      get: function get() {
        return this._index;
      }
    }, {
      key: "span",
      get: function get() {
        return this._span;
      }
    }]);

    return Display;
  }();

  var Operations =
  /*#__PURE__*/
  function () {
    function Operations() {
      _classCallCheck(this, Operations);

      this._action;
      this._value = "0";
      this._prevRes = [];
      this._result = 0;
      this._index;
      this._span;
      this._actNum = 0;
    }

    _createClass(Operations, [{
      key: "_handleOperations",
      value: function _handleOperations(operation) {
        var _this;

        switch (operation) {
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
            _this = this, _this["_result"] = Math.pow(_this["_result"], +this._value);
            break;
        }
      }
    }, {
      key: "_cacheResult",
      value: function _cacheResult() {
        this._prevRes.unshift(this._result);
      }
    }, {
      key: "_calculate",
      value: function _calculate() {
        if (this._value == " ".concat(this._action, " ")) {
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
            this._handleOperations(this._action);
          }

          this._result = +this._result.toFixed(5);

          this._cacheResult();
        }

        ++this._actNum;
        return this._result;
      }
    }, {
      key: "getResult",
      value: function getResult(event) {
        this._action = $(".act").last().text()[1];
        var result = 0;

        if ($(event.target).text() == "del") {
          if (!$(this._span).hasClass("act")) {
            this._prevRes.shift();

            this._result = this._prevRes[0];
          }

          result = this._result;
        } else if ($(event.target).text() == "C") {
          this._prevRes = [];
          this._result = 0;
        } else if ($(event.target).text() == "=") {
          this._prevRes = [];
          this._actNum = 0;
          result = this._result;
          this._result = 0;
        } else {
          result = this._calculate();
        }

        return result;
      }
    }, {
      key: "value",
      set: function set(value) {
        this._value = value;
      }
    }, {
      key: "result",
      set: function set(value) {
        this._result = value;
      }
    }, {
      key: "index",
      set: function set(value) {
        this._index = value;
      }
    }, {
      key: "span",
      set: function set(value) {
        this._span = value;
      }
    }]);

    return Operations;
  }();

  var Calculator =
  /*#__PURE__*/
  function () {
    function Calculator() {
      _classCallCheck(this, Calculator);

      this.display = new Display();
      this.operations = new Operations();
    }

    _createClass(Calculator, [{
      key: "calculator",
      value: function calculator(event) {
        // this.display.getPrevRes();
        this.display.writeInInputField(event);
        this.operations.index = this.display.index;
        this.operations.span = this.display.span;
        this.display.setSpan();
        this.operations.value = $(this.display.span).text();
        var result = this.operations.getResult(event);
        this.display.writeResult(result);
      }
    }]);

    return Calculator;
  }();

  var newcalculator = new Calculator();
})();