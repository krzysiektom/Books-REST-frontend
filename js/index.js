$(document).ready(function () {
    var mainDiv = $('div')
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
        return $("<li data-id=" + book.id + ">" + book.title + " <a href>Usuń</a></li><div style='display: none'><a id='author'></a><br><a id = 'publisher'></a><br><a id='isbn'></a><br><a id='type'></a></div>")
    }

    $(mainDiv).on('click', 'li', function () {
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
        nextDiv.children('a#author').text("Autor: " + book.author)
        nextDiv.children('a#publisher').text("Wydawca: " + book.publisher)
        nextDiv.children('a#isbn').text("Isbn: " + book.isbn)
        nextDiv.children('a#type').text("Typ: " + book.type)
    }

    $('button').on('click', function () {
        event.preventDefault()
        var book = $('form input#title')

        $.ajax({
            url: "http://localhost:8282/books",
            data: JSON.stringify({
                "isbn": $('form input#isbn')[0].value,
                "title": $('form input#title')[0].value,
                "publisher": $('form input#publisher')[0].value,
                "type": $('form input#type')[0].value,
                "author": $('form input#author')[0].value
            }),
            type: "POST",
            contentType: "application/json",
            dataType: "json"
        }).done(function (status) {
            location.reload();
        }).fail(function (xhr, status, err) {
            console.log(err)
        }).always(function (xhr, status) {
        });
    })

    $(mainDiv).on('click', 'a', function () {
        event.stopPropagation()
        event.preventDefault()

        $.ajax({
            url: "http://localhost:8282/books/" + $(this).parent().data('id'),
            data: {},
            type: "DELETE",
            dataType: "json"
        }).done(function (books) {
            location.reload();
        }).fail(function (xhr, status, err) {
        }).always(function (xhr, status) {
        });
    })

});
