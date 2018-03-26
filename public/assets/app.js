// Grab headlines as json

$.getJSON('/headlines', (data) => {
    for (var i = 0; i < data.length; i++) {
        $('#headlines').append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
});

$(document).on('click', 'p', () => {
    $("#comments").empty();
    
    var thisId = $(this).attr("data-id");

    $.ajax({
       method: "GET",
       url: "/headlines/" + thisId 
    })

    .then(function(data){
        console.log(data);
        //The title of the headline
        $("#comments").append(`<h2> ${data.title} </h2>`);
        //An input to enter a new title
        $("#comments").append(`<input id='titleinput' name='title>`);
        //A text area to add a new comment body
        $('#comments').append(`<textarea id='bodyinput' name='body'></textarea>`);
        //A button to submit a new comment with the id of the headline saved to it
        $('#comments').append("<button data-id='" + data._id + "' id='savecomment'>Save Comment</button>");
        
        //if there is no comment in the headline

        if(data.comment) {
            //place the title of the comment in the title input
            $('#titelinput').val(data.comment.title);
            //place the body of the comment in the title input
            $('#bodyinput').val(data.comment.body);
        }
    });
});

// When you click the savecomment button
$(document).on("click", "#savecomment", () => {
    // Grab the id associated with the headline from the submit button
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the comment, using what's entered in the inputs
    $.ajax({
        method: "POST",
        url: "/headlines/" + thisId,
        data: {
            // Value taken from title input
            title: $("#titleinput").val(),
            // Value taken from Comment textarea
            body: $("#bodyinput").val()
        }
    })
        // With that done
        .then(function (data) {
            // Log the response
            console.log(data);
            // Empty the comments section
            $("#comments").empty();
        });

    // Also, remove the values entered in the input and textarea for comment entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
});