$(document).ready(function () {
    function makeAjaxCall(type, idOrAuthor, callback) {

        if (type === 'POST') {
            var dataSet = JSON.stringify(idOrAuthor);
            var contentTypeSet = "application/json";
            idOrAuthor = ''
        } else {
            var dataSet = {};
            var contentTypeSet = '';
        }

        $.ajax({
            url: "http://localhost:8080/authors/" + idOrAuthor,
            data: dataSet,
            type: type,
            contentType: contentTypeSet,
            dataType: "json",
            success: callback
        })
    }

    var mainDiv = $('div')
    makeAjaxCall('GET', '', function (authors) {
        for (const author of authors) {
            var newLi = newLiElement(author);
            mainDiv.append(newLi)
        }
    });

    function newLiElement(author) {
        return $("<li data-id=" + author.id + ">" + author.firstName + " " + author.lastName + " <a id='delete' href>Usuń</a></li><div style='display: none'><a id='books'></a></div>")
    }

    $(mainDiv).on('click', 'li', function () {
        var nextDiv = $(this).next('div');
        if (nextDiv.is(":hidden")) {
            makeAjaxCall('GET', $(this).data('id'), function (author) {
                var divAuthors = nextDiv.children('#books').text("Książki: ");
                booksList(author.books, divAuthors);
            })
        }
        nextDiv.toggle()
    });

    function booksList(books, nextDiv) {
        for (const book of books) {
            var newA = newAElementBook(book);
            nextDiv.append(newA)
        }
    }

    function newAElementBook(book) {
        return $("<a data-id=" + book.id + ">" + book.title + " </a>");
    }

    $('button').on('click', function () {
        event.preventDefault();
        var author = {
            "firstName": $('form input#firstName')[0].value,
            "lastName": $('form input#lastName')[0].value,
        };
        makeAjaxCall('POST', author, function () {
            location.reload();
        })
    });

    $(mainDiv).on('click', 'a#books', function () {
        event.stopPropagation();
        event.preventDefault();
        event.stopImmediatePropagation();
        location.href = "index.html";
    });

    $(mainDiv).on('click', 'a#delete', function () {
        event.stopPropagation();
        event.preventDefault();
        event.stopImmediatePropagation();
        makeAjaxCall('DELETE', $(this).parent().data('id'), function () {
            location.reload();
        })
    })

});
