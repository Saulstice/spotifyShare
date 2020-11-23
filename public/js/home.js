$(document).ready(() => {
    // a GET request to figure out which user is logged in
    //  updates the HTML on the page showing ther username
    $.get("/api/user_data").then(data => {
        console.log(data);
        $(".member-name").text(data.username);
    });

    // make API call to populate page with new releases
    $.ajax(settings).done(function (response) {
        



    });

    // When user submits search, hide div that has new releases and then make API call
    // render results  
    $("#submit").on("click", function (e) {
        e.preventDefault();
        console.log("Searching");
        $("#newDisplay").addClass("hide");


        // spotify API call to get search results, clear prev results then render
        $.ajax(settings).done(function (response) {
            console.log(response);
            $("#results").empty();
       


        });

    });

});

