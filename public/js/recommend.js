$(document).ready(() => {
    // refresh button to refresh page since feed isn't updated automatically
    $("#refresh").on("click", function (e) {
        e.preventDefault();
        location.reload();
    });

    // Get request to get User's information
    $.get("/api/user_data").then(user => {
        if (user) {
            console.log(user.username);
            //add name to page

            var userName =
                `<h1>
                <span class="member-name"></span>${user.username.toUpperCase()}'S RECS
                </h1>`
            $("#welcome").append(userName);

        }


        $.get("/api/recs/" + user.id).then(music => {
            console.log(music)
            for (i = music.length - 1; i >= 0; i--) {
                console.log(music[i]);
                var songfeed =
                    `<div class="row justify-content-center ">
                <div class="card mb-3" style="width: 40rem;">
                    <div class="row justify-content-center align-items-center">
                        <div class="col-md-4">
                            <img src="${music[i].albumCover}" class="card-img">
                        </div>
                        <div class="col-md-6">
                            <div class="card-body">
                                <h3 class="card-title">
                                ${music[i].sender.toUpperCase()} sent you:
                                </h3>
    
                                <h4>${music[i].song} </h4>
                                by ${music[i].artist} 
                                
                            </div>
                        </div>
                        <div class="col-md-2 align-middle">
                        <button class="btn btn-primary addBtn" value="${music[i].songId}"><i class="fas fa-plus">  </i> Add</button>
                        </div>
                    </div>
                </div>
                </div>`
                $("#feedDiv").append(songfeed);
            }
            $(".addBtn").on("click", function (e) {
                e.preventDefault();
                $.get("/api/user_data").then(data => {
                    var user = data;

                    var songId = $(this).val();
                    console.log(songId);
                    $.get("/api/oneSong/" + songId).then(song => {
                        console.log(song);
                        var newSong = {
                            song: song.song,
                            artist: song.artist,
                            UserId: user.id,
                            albumCover: song.albumCover
                        };
                        $.post("/api/addSong", newSong, function (res) {
                            console.log(res);
                            console.log("Show added to addSong DB table");
                        });

                        // Show added alert animation
                        $("#addedAlertRes").fadeTo(2000, 500).slideUp(500, function () {
                            $("#addedAlertRes").slideUp(500);
                        });
                    });
                })
            });
        });


    });
});