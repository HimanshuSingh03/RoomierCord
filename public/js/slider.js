
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

SelectValue3.innerHTML = slider2.value;

slider3.oninput = function () {
    SelectValue3.innerHTML = this.value;
    selector3.style.left = this.value;
}
