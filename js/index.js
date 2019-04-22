$(document).ready(function () {
    function makeAjaxCall(type, idOrBook, callback) {

        if (type === 'POST') {
            var dataSet = JSON.stringify(idOrBook);
            var contentTypeSet = "application/json";
            idOrBook = ''
        } else {
            var dataSet = {};
            var contentTypeSet = '';
        }

        $.ajax({
            url: "http://localhost:8080/books/" + idOrBook,
            data: dataSet,
            type: type,
            contentType: contentTypeSet,
            dataType: "json",
            success: callback
        })
    }

    var mainDiv = $('div')
    makeAjaxCall('GET', '', function (books) {
        for (const book of books) {
            var newLi = newLiElement(book);
            mainDiv.append(newLi)
        }
    });

    function newLiElement(book) {
        return $("<li data-id=" + book.id + ">" + book.title + " <a id='delete' href>Usuń</a></li><div style='display: none'><a id='authors'></a><br><a id = 'publisher'></a><br><a id='isbn'></a><br><a id='type'></a></div>")
    }

    $(mainDiv).on('click', 'li', function () {
        var nextDiv = $(this).next('div');
        if (nextDiv.is(":hidden")) {
            makeAjaxCall('GET', $(this).data('id'), function (book) {
                var divAuthors=nextDiv.children('#authors').text("Autor: " );
                authorsList(book.authors, divAuthors);
                nextDiv.children('#publisher').text("Wydawca: " + book.publisher);
                nextDiv.children('#isbn').text("Isbn: " + book.isbn);
                nextDiv.children('#type').text("Typ: " + book.type);
            })
        }
        nextDiv.toggle()
    });

    function authorsList(authors, nextDiv) {
        for (const author of authors) {
            var newA = newAElementAuthor(author);
            nextDiv.append(newA)
        }
    }

    function newAElementAuthor(author) {
        return $("<a data-id=" + author.id + ">" + author.firstName + " " + author.lastName + " </a>");
    }

    $('button').on('click', function () {
        event.preventDefault();
        var book = {
            "isbn": $('form input#isbn')[0].value,
            "title": $('form input#title')[0].value,
            "publisher": $('form input#publisher')[0].value,
            "type": $('form input#type')[0].value,
            "author": $('form input#author')[0].value
        };
        makeAjaxCall('POST', book, function () {
            location.reload();
        })
    });

    $(mainDiv).on('click', 'a#delete', function () {
        event.stopPropagation();
        event.preventDefault();
        event.stopImmediatePropagation();

        makeAjaxCall('DELETE', $(this).parent().data('id'), function () {
            location.reload();
        })
    });

    $(mainDiv).on('click', 'a#authors', function () {
        event.stopPropagation();
        event.preventDefault();
        event.stopImmediatePropagation();
        location.href = "authors.html";

    })

});
