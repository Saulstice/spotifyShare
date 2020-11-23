$(document).ready(() => {
    // refresh button to refresh page since feed isn't updated automatically
    $("#refresh").on("click", function (e) {
        e.preventDefault();
        location.reload();
    });

    // Get request to get User's information
    $.get("/api/user_data").then(user => {
        $(".member-name").prepend(user.username);
    });
    
    // get request to get all information for the feed
    $.get("/api/feed").then(music => {
        console.log(music);

        
    });

});