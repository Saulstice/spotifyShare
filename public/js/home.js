// a GET request to figure out which user is logged in
//  updates the HTML on the page showing ther username



// ------------------------------------------------------------------------------------------------------------
// When user submits search, hide div that has new releases and then make API call
// render results  
$("#submit").on("click", function (e) {
    e.preventDefault();
    console.log("Searching");
    // clear previous results
    $("#songTable").empty();

    // getting  the searchTerm
    var searchTerm = $("#searchBar").val();
    console.log(searchTerm);


    // make API call to populate page with top releases ------------------------------------------------------
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://genius.p.rapidapi.com/search?q=" + searchTerm,
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "a2bf636d02msh0285b0bad0d167cp1bad37jsn53ce1d57c625",
            "x-rapidapi-host": "genius.p.rapidapi.com"
        }
    };

    $.ajax(settings).done(function (response) {

        var results = response.response.hits;
        console.log(results)

        for (var song of results) {
            console.log(song.result.title)
            var addButton = `<button type="button" class="songAdd btn btn-success">Add</button>`
            var songInfo =
                `<tr>
                <th scope="Add">${addButton}</th>
                <td>${song.result.title}</td>
                <td>${song.result.primary_artist.name}</td>
                </tr>`
            $("#songTable").append(songInfo);
        }

        // On click event  for Add buttons 
        $(".songAdd").on("click", function (e) {
            $.get("/api/user_data").then(data => {
                e.preventDefault();
                // getting our user info


                console.log(data);
                var user = data;

                // getting song info to pass to DB under this user
                var siblings = $(this).parent().siblings()
                for (let i = 0; i < 2; i++) {
                    if (i == 0) {
                        var songName = siblings[i].outerText;
                    }
                    else if (i == 1) {
                        var songArtist = siblings[i].outerText
                    }
                };

                console.log("songName: ", songName, "artist: ", songArtist);

                //creating object to send to DB
                var newSong = {
                    song: songName,
                    artist: songArtist,
                    UserId: user.id
                };
                console.log(newSong);

                $.post("/api/addSong", newSong, function (res) {
                    console.log(res);
                    console.log("Show added to addSong DB table");
                });

            })
        });

    });


});

