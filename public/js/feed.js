$(document).ready(() => {
    // refresh button to refresh page since feed isn't updated automatically
    $("#refresh").on("click", function (e) {
        e.preventDefault();
        location.reload();
    });

    // Get request to get User's information
    $.get("/api/user_data").then(user => {
        if(user){
            console.log(user.username);
             //add name to page

            var userName =
                `<h1>
                <span class="member-name"></span>${user.username.toUpperCase()}'S FEED
                </h1>`
            $("#welcome").append(userName);
        
        }
    });
    let date_ob=Date.now();
    $.get("/api/feed").then(music=>{
        for(i=music.length-1;i>=0;i--){
            console.log(music[i]);
            var songfeed=
            `<div class="card">
                <h5 class="card-header">${music[i].User.username.toUpperCase()}</h5>
                <div class="card-body">
                    <h5 class="card-title">${music[i].song} by ${music[i].artist} 
                        added to ${music[i].User.username}'s library</h5>
                    <p class="card-time">${music[i].createdAt}</p>
                </div>
            </div>`
            $("#feedDiv").append(songfeed);
        }  
   });
    
   

});