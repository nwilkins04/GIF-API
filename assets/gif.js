console.log ("API loaded")

//inital array of topics
var topics = ["French Bulldog", "Mastiff", "Puggle"];

//using jquery to create buttons
function displayDogInfo () {

    var dog = $(this).attr("data-name");
    var queryURl = "https://api.giphy.com/v1/gifs/search?q=" + dog + "&api_key=1VzzyqPCQIAxhSBkMgMSQN5w6ARuwdLn&limit=10";

    //creates AJAX call for buttons clicked
    $.ajax({
        url: queryURl, 
        method: "GET"
    }).then(function (response) {

        var results = response.data;
        $("#dog-view").empty();
        for (var i = 0; i < results.length; i++) {

            //takes the photo if rating of pg-13 or less
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

                //creates div for GIF
                var GIFdiv = $("<div>");

                //storing item result
                var rating = results [i].rating;

                //create <p> with item results
                var p = $("<p>").text("Rating: " + rating);

                //creates image tag
                var dogImage = $("<img>");

                //gives image src from results
                dogImage.attr("src", results[i].images.fixed_height_still.url);
                dogImage.attr("data-still", results[i].images.fixed_height_still.url);
                dogImage.attr("data-animate", results[i].images.fixed_height.url);
                dogImage.attr("data-state", "still")

                //appents rating paragraph to GIF
                GIFdiv.append(p);
                GIFdiv.append(dogImage);

                //adds new GIF in HTML
                $("#dog-view").prepend(GIFdiv);
            }
        }
    });
}

//function for displaying dogs
function renderButtons() {
    //removes old topics before new ones are displayed
    $("#new-buttons").empty();

    for (var i =0; i < topics.length; i++) {

        //creates buttons from array
        var a = $("<button>");
        a.addClass("dog-button");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#new-buttons").append(a);

    }
}

//on click function for buttons
$("#add-dog").on("click", function (event){
    event.preventDefault();
    var dog = $("#dog-input").val().trim();
    $("#dog-input").val("");
    //adds to topic array
    topics.push(dog);
    renderButtons();

});

//event listener for all items of dog-button
$(document).on("click", ".dog-button", displayDogInfo);

renderButtons();

//new function to change data-state of img
$(document).on("click", "img", function (){
    if($(this).attr("data-state") === "still") {
        console.log("stuff here")
    $(this).attr("src", $(this).attr("data-animate"))
    $(this).attr("data-state", "animate")
    }
    else { $(this).attr("src", $(this).attr("data-still"))
    $(this).attr("data-state", "still")
        console.log("then this")
}
})