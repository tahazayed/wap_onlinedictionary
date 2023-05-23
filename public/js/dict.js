
$(document).ready(function () {
    $("#loader").css("display", "none");

    function loadingAjax() {
        $("#card-none").css("display", "none");
        $("#loader").show();
        setTimeout(function () { lookup(); }, 2000);
    }

    function lookup() {
        var term = $("#term").val();
        $.ajax({
            url: "api/word",
            data: { 'term': term },
            dataType: "json",
            type: "GET",
            success: ajaxSuccess,
            error: ajaxFailure
        });
    };

    $("#lookupBtn").click(function () {
        loadingAjax();
    });

    $("#term").keydown(function (e) {
        if (e.keyCode == 13) {
            loadingAjax();
        }
    });

    function ajaxSuccess(data) {
        var callout_color = ["success", "default", "primary", "danger", "warning", "info"];
        console.log(data);
        var term = $("#term").val();
        var defs = "<div id='result' class='card-body'>";
        defs += "<h3> " + term + " </h3>";
        var i = 0;

        for (var x = 0; x < data.length; x++) {
            var count = x + 1;
            if (i > 5) {
                i = 0;
            }
            defs += "<div class='bs-callout bs-callout-" + callout_color[i] + "'>";
            defs += "<p>" + count;
            defs += "(" + data[x].wordtype + ")::";
            defs += data[x].definition + "</p>";
            defs += "</div>";
            i++;
        }
        defs += "</div>";
        $("#loader").hide();
        $("#result").replaceWith(defs);
        $("#card-none").css("display", "block");
    }
    function ajaxFailure(xhr, status, exception) {
        console.log(xhr, status, exception);

        var term = $("#term").val();
        var defs = "<div id='result' class='card-body'>";
        defs += "<h3> " + term + " </h3>";

        defs += "<div class='bs-callout bs-callout-danger'>";
        defs += "Not Found";
        defs += "</div>";

        defs += "</div>";
        console.log(defs);
        $("#loader").hide();
        $("#result").replaceWith(defs);
        $("#card-none").css("display", "block");
    }
});
