// Grab headlines as json

$.getJSON('/headlines', function (data) {
    for (var i = 0; i < data.length; i++) {
        $('#headlines').append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
});

$(document).on('click', 'p', function () {
    $("#comments").empty();
    
    var thisId = $(this).attr("data-id");
    console.log(thisId);
    

    $.ajax({
       method: "GET",
       url: "/headlines/" + thisId 
    })

    .then(function(data){
        console.log(data);
        //The title of the headline
        // $("#comments").append(`<h2> ${data.title} </h2>`);
        $("#comments").append(
            $("<h2>").text(`${ data.title }`)
        );
        //An input to enter a new title
        // $("#comments").append(
        //     $("<input>").attr("id", 'titleinput').attr("name", 'title')
        // );
        //A text area to add a new comment body
        $('#comments').append(
            $("<textarea>").attr({
                "id":'bodyinput',
                "name":'body',
            }));
        //A button to submit a new comment with the "id" of the headline saved to it
        $('#comments').append(
            $("<a>").attr({
                "class": "btn btn-primary btn-lg",
                "data-id": data._id,
                "id": 'savecomment',
            }).text("Save Comment")
        );
        
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
$(document).on("click", "#savecomment", function () {
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