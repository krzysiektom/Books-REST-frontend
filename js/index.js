$(document).ready(function () {
    var mainDiv = $('div')
    $.ajax({
        url: "http://localhost:8282/books/",
        data: {},
        type: "GET",
        dataType: "json"
    }).done(function (books) {
        console.log(books)
        for (const book of books) {
            var newDiv = $("<li data-id="+book.id+">" + book.title + "</li><div></div>");
            mainDiv.append(newDiv)
        }
    }).fail(function (xhr, status, err) {
    }).always(function (xhr, status) {
    });


});
