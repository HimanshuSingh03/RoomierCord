
var slider = document.getElementById("slider");
var selector = document.getElementById("selector");
var SelectValue = document.getElementById("SelectValue");

SelectValue.innerHTML = slider.value;

slider.oninput = function () {
    SelectValue.innerHTML = this.value;
    selector.style.left = this.value;
}

var slider2 = document.getElementById("slider2");
var selector2 = document.getElementById("selector2");
var SelectValue2 = document.getElementById("SelectValue2");

SelectValue2.innerHTML = slider2.value;

slider2.oninput = function () {
    SelectValue2.innerHTML = this.value;
    selector2.style.left = this.value;
}

var slider3 = document.getElementById("slider3");
var selector3 = document.getElementById("selector3");
var SelectValue3 = document.getElementById("SelectValue3");

SelectValue3.innerHTML = slider3.value;

slider3.oninput = function () {
    SelectValue3.innerHTML = this.value;
    selector3.style.left = this.value;
}

var slider4 = document.getElementById("slider4");
var selector4 = document.getElementById("selector4");
var SelectValue4 = document.getElementById("SelectValue4");

SelectValue4.innerHTML = slider4.value;

slider4.oninput = function () {
    SelectValue4.innerHTML = this.value;
    selector4.style.left = this.value;
}

var slider5 = document.getElementById("slider5");
var selector5 = document.getElementById("selector5");
var SelectValue5 = document.getElementById("SelectValue5");

SelectValue5.innerHTML = slider5.value;

slider5.oninput = function () {
    SelectValue5.innerHTML = this.value;
    selector5.style.left = this.value;
}