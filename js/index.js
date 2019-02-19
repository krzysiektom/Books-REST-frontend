$(document).ready(function () {
    var mainDiv = $('div')
    //$(mainDiv).find('div').hide()
    console.log(mainDiv.children())
    $.ajax({
        url: "http://localhost:8282/books/",
        data: {},
        type: "GET",
        dataType: "json"
    }).done(function (books) {
        for (const book of books) {
            var newLi = newLiElement(book);
            mainDiv.append(newLi)
        }
    }).fail(function (xhr, status, err) {
    }).always(function (xhr, status) {
    });

    function newLiElement(book) {
        return $("<li data-id=" + book.id + ">" + book.title + "</li><div style='display: none'><a id='author'></a><br><a id = 'publisher'></a><br><a id='isbn'></a></div>")
    }

    $(mainDiv).on('click', 'li', function () {
        console.log($(this).data('id'));
        var nextDiv = $(this).next('div')
        $.ajax({
            url: "http://localhost:8282/books/" + $(this).data('id'),
            data: {},
            type: "GET",
            dataType: "json"
        }).done(function (book) {
            fillBook(nextDiv, book)
            nextDiv.toggle()

        }).fail(function (xhr, status, err) {
        }).always(function (xhr, status) {
        });
    });

    function fillBook(nextDiv, book) {
        console.log(nextDiv.children('a#author'))
        nextDiv.children('a#author').text("Autor: " + book.author)
        nextDiv.children('a#publisher').text("Wydawca: " + book.publisher)
        nextDiv.children('a#isbn').text("Isbn: " + book.isbn)
    }
});
