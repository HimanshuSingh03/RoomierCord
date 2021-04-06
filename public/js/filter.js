var party_range;
var clean_range;
var age_range;

$.fn.dataTable.ext.search.push(
    function (settings, data, dataIndex) {
        var min = parseFloat(age_range.slider("values", 0));
        var max = parseFloat(age_range.slider("values", 1));
        var col = parseFloat(data[3]) || 0; // data[number] = column number
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
        var min = parseFloat(clean_range.slider("values", 0));
        var max = parseFloat(clean_range.slider("values", 1));
        var col = parseFloat(data[9]) || 0; // data[number] = column number
        if ((isNaN(min) && isNaN(max)) ||
            (isNaN(min) && col <= max) ||
            (min <= col && isNaN(max)) ||
            (min <= col && col <= max)) {
            return true;
        }
        return false;
    }

);

$(document).ready(function () {
    age_range = $("#age_range");
    clean_range = $("#val_range_clean");
    party_range = $("#party_range");
    
    var live_range_age = $("#live_range_age");
    var live_range_party = $("#live_range_party");
    var val_range_clean = $("#live_range_clean");
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

    live_range_age.val(age_range.slider("values", 0) + " - " + age_range.slider("values", 1));
    live_range_party.val(party_range.slider("values", 0) + " - " + party_range.slider("values", 1));
    val_range_clean.val(clean_range.slider("values", 0) + " - " + clean_range.slider("values", 1));

    var table = $("#sort_table").DataTable({
        "bPaginate": false,
        "bFilter": true,
    });
});