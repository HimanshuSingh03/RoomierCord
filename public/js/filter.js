var party_range;
var clean_range;
var age_range;
var cooking_range;
var budget_range;
var maxdistance_range;

$.fn.dataTable.ext.search.push(
    function (settings, data, dataIndex) {
        var min = parseFloat(age_range.slider("values", 0));
        var max = parseFloat(age_range.slider("values", 1));
        var col = parseFloat(data[2]) || 0; // data[number] = column number
        if ((isNaN(min) && isNaN(max)) ||
            (isNaN(min) && col <= max) ||
            (min <= col && isNaN(max)) ||
            (min <= col && col <= max)) {
            return true;
        }
        return false;
    },
    function (settings, data, dataIndex) {
        var min = parseFloat(party_range.slider("values", 0));
        var max = parseFloat(party_range.slider("values", 1));
        var col = parseFloat(data[7]) || 0; // data[number] = column number
        if ((isNaN(min) && isNaN(max)) ||
            (isNaN(min) && col <= max) ||
            (min <= col && isNaN(max)) ||
            (min <= col && col <= max)) {
            return true;
        }
        return false;
    },
    function (settings, data, dataIndex) {
        var min = parseFloat(clean_range.slider("values", 0));
        var max = parseFloat(clean_range.slider("values", 1));
        var col = parseFloat(data[8]) || 0; // data[number] = column number
        if ((isNaN(min) && isNaN(max)) ||
            (isNaN(min) && col <= max) ||
            (min <= col && isNaN(max)) ||
            (min <= col && col <= max)) {
            return true;
        }
        return false;
    },
    function (settings, data, dataIndex) {
        var min = parseFloat(cooking_range.slider("values", 0));
        var max = parseFloat(cooking_range.slider("values", 1));
        var col = parseFloat(data[9]) || 0; // data[number] = column number
        if ((isNaN(min) && isNaN(max)) ||
            (isNaN(min) && col <= max) ||
            (min <= col && isNaN(max)) ||
            (min <= col && col <= max)) {
            return true;
        }
        return false;
    },
    function (settings, data, dataIndex) {
        var min = parseFloat(budget_range.slider("values", 0));
        var max = parseFloat(budget_range.slider("values", 1));
        var col = parseFloat(data[10]) || 0; // data[number] = column number
        if ((isNaN(min) && isNaN(max)) ||
            (isNaN(min) && col <= max) ||
            (min <= col && isNaN(max)) ||
            (min <= col && col <= max)) {
            return true;
        }
        return false;
    },
    function (settings, data, dataIndex) {
        var min = parseFloat(maxdistance_range.slider("values", 0));
        var max = parseFloat(maxdistance_range.slider("values", 1));
        var col = parseFloat(data[11]) || 0; // data[number] = column number
        if ((isNaN(min) && isNaN(max)) ||
            (isNaN(min) && col <= max) ||
            (min <= col && isNaN(max)) ||
            (min <= col && col <= max)) {
            return true;
        }
        return false;
    },

);


$(document).ready(function () {
    age_range = $("#age_range");
    clean_range = $("#val_range_clean");
    party_range = $("#party_range");
    cooking_range = $("#cooking_range");
    budget_range = $("#budget_range");
    maxdistance_range = $("#maxdistance_range");

    var live_range_age = $("#live_range_age");
    var live_range_party = $("#live_range_party");
    var val_range_clean = $("#live_range_clean");
    var live_range_cooking = $("#live_range_cooking");
    var live_range_budget = $("#live_range_budget");
    var live_range_maxdistance = $("#live_range_maxdistance");

    age_range.slider({
        range: true,
        min: 0,
        max: 30,
        step: 1,
        values: [0, 30],
        slide: function (event, ui) {
            live_range_age.val(ui.values[0] + " - " + ui.values[1]);
        },
        stop: function (event, ui) {
            table.draw();
        }
    });

    party_range.slider({
        range: true,
        min: 0,
        max: 10,
        step: 1,
        values: [0, 10],
        slide: function (event, ui) {
            live_range_party.val(ui.values[0] + " - " + ui.values[1]);
        },
        stop: function (event, ui) {
            table.draw();
        }
    });

    clean_range.slider({
        range: true,
        min: 0,
        max: 10,
        step: 1,
        values: [0, 10],
        slide: function (event, ui) {
            val_range_clean.val(ui.values[0] + " - " + ui.values[1]);
        },
        stop: function (event, ui) {
            table.draw();
        }
    });

    cooking_range.slider({
        range: true,
        min: 0,
        max: 10,
        step: 1,
        values: [0, 10],
        slide: function (event, ui) {
            live_range_cooking.val(ui.values[0] + " - " + ui.values[1]);
        },
        stop: function (event, ui) {
            table.draw();
        }
    });

    budget_range.slider({
        range: true,
        min: 0,
        max: 1500,
        step: 250,
        values: [0, 1500],
        slide: function (event, ui) {
            live_range_budget.val(ui.values[0] + " - " + ui.values[1]);
        },
        stop: function (event, ui) {
            table.draw();
        }
    });

    maxdistance_range.slider({
        range: true,
        min: 0,
        max: 25,
        step: 1,
        values: [0, 25],
        slide: function (event, ui) {
            live_range_maxdistance.val(ui.values[0] + " - " + ui.values[1]);
        },
        stop: function (event, ui) {
            table.draw();
        }
    });

    live_range_age.val(age_range.slider("values", 0) + " - " + age_range.slider("values", 1));
    live_range_party.val(party_range.slider("values", 0) + " - " + party_range.slider("values", 1));
    val_range_clean.val(clean_range.slider("values", 0) + " - " + clean_range.slider("values", 1));
    live_range_cooking.val(cooking_range.slider("values", 0) + " - " + cooking_range.slider("values", 1));
    live_range_budget.val(budget_range.slider("values", 0) + " - " + budget_range.slider("values", 1));
    live_range_maxdistance.val(maxdistance_range.slider("values", 0) + " - " + maxdistance_range.slider("values", 1));


    var table = $("#sort_table").DataTable({
        "bPaginate": false,
        "bFilter": true,

        "columnDefs": [
            {
                "targets": [12, 13],
                "orderable": false
            }
        ]
    });


    // Reload on record filter radio button clicks 
    $(document).on("click", "#smoking-filters", function () {
        table.draw();
    });

    $(document).on("click", "#pets-filters", function () {
        table.draw();
    });

});
