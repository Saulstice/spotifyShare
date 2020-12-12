$(document).ready(() => {

    // First get this user's information so we can find their stuff in DB
    $.get("/api/user_data").then(data => {
        console.log(data);
        $(".member-name").text(data.username);
        var id = data.id;
        console.log(id);

        // Call to Get the user's music from the DB using their ID and then render results
        $.get("/api/songs/" + id).then(songs => {
            console.log(songs);

            for (i = songs.length - 1; i >= 0; i--) {
                makeSong(songs[i]);
            }

        });




        var makeSong = function (song) {
            var sendButton = `<span type="button" class="btn btn-success" data-toggle="modal" 
                                    data-target="#${song.id}"> <i class="fas fa-paper-plane"> </i> Send</span>
                                    
                                    <!-- The Modal -->
    <div class="modal fade" id="${song.id}">
      <div class="modal-dialog">
        <div class="modal-content">
        
          <!-- Modal Header -->
          <div class="modal-header center">
            <h4 class="modal-title center">${song.song}</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          
          <!-- Modal body -->
          <div class="modal-body">
            <div class="row align-items-center">
                <div class="col">
                    <img class="card-img-top" src="${song.albumCover}" alt="${song.title} Image">
                </div>
                <div class="row">
                <div class="col">
                    <div class="container">
                    <div class="input-group flex-nowrap">
                    <span class="input-group-text" id="addon-wrapping">Send To:</span>
                    <input type="text" id="${song.id}recipient" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping">
                  </div>
                    </div>
                

                </div>
            </div>

        </div>
        <!-- Modal footer -->
          <div class="row justify-content-center">
          <div class="modal-footer center">
            
          <button type="button"  class="btn btn-danger" data-dismiss="modal"><i class="far fa-window-close"> </i> Cancel</button>
          <button type="button" id="${song.id}Send" class="btn btn-primary send" data-dismiss="modal"><i class="fas fa-paper-plane"> </i> Send</button>

          </div>
          </div>
      </div>
    </div>`
            var songInfol =
                `<tr>
                    <td>${sendButton}</td>
                    <td>${song.song}</td>
                    <td>${song.artist}</td>
                    </tr>`

            $("#songTablel").append(songInfol);

            $(`#${song.id}Send`).on("click", function (e) {
                e.preventDefault();
                console.log($(`#${song.id}recipient`).val());

                var recipient = $(`#${song.id}recipient`).val();
                $(`#${song.id}recipient`).empty()

                $.get("/api/users/" + recipient).then(friend => {
                    if (!friend) {
                        console.log("This user doesn't exist");
                        alert("This user doesn't exist, please try again");
                    }
                    console.log(friend);

                    var newRec = {
                        song: song.song,
                        songId: song.id,
                        artist: song.artist,
                        albumCover: song.albumCover,
                        sender: data.username,
                        recipientId: friend.id,
                        UserId: data.id
                    }

                    $.post("/api/sendRec", newRec, function (req, res) {
                        console.log(res);
                        console.log("Rec added to Rec DB table");
                    })
                });
            });

        }
    });

});