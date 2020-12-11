$(document).ready(() => {

    // First get this user's information so we can find their stuff in DB
    $.get("/api/user_data").then(data => {
        console.log(data);
        $(".member-name").text(data.username);
        var id = data.id;

        // Call to Get the user's music from the DB using their ID and then render results
        $.get("/api/songs/" + id).then(songs => {
            console.log(songs);

            for(i=songs.length-1;i>=0;i--){
                console.log(songs[i]);
                var songInfol =
                    `<tr>
                    <td>${songs[i].song}</td>
                    <td>${songs[i].artist}</td>
                    </tr>`
                $("#songTablel").append(songInfol);
            } 
      


        });
    });

});