$(document).ready(function () {
    function makeAjaxCall(table, type, idOrBook, callback) {

        if (type === 'POST') {
            var dataSet = JSON.stringify(idOrBook);
            var contentTypeSet = "application/json";
            idOrBook = ''
        } else {
            var dataSet = {};
            var contentTypeSet = '';
        }

        $.ajax({
            url: "http://localhost:8080/" + table + "/" + idOrBook,
            data: dataSet,
            type: type,
            contentType: contentTypeSet,
            dataType: "json",
            success: callback
        })
    }

    var mainDiv = $('div')
    makeAjaxCall('books', 'GET', '', function (books) {
        for (const book of books) {
            var newLi = newLiElement(book);
            mainDiv.append(newLi)
        }
    });

    function newLiElement(book) {
        return $("<li data-id=" + book.id + ">" + book.title + " <a id='delete' href>Usuń</a></li><div style='display: none'><a id='authors'></a><br><a id = 'publisher'></a><br><a id='isbn'></a><br><a id='type'></a></div>")
    }

    var select = $('select');
    makeAjaxCall('authors', 'GET', '', function (authors) {
        for (const author of authors) {
            var newLi = newOptionElement(author);
            select.append(newLi)
        }
    });

    function newOptionElement(author) {
        return $("<option data-id=" + author.id + ">" + author.firstName + " " + author.lastName + " </option>")
    }

    $(mainDiv).on('click', 'li', function () {
        var nextDiv = $(this).next('div');
        if (nextDiv.is(":hidden")) {
            makeAjaxCall('books', 'GET', $(this).data('id'), function (book) {
                var divAuthors = nextDiv.children('#authors').text("Autor: ");
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

    class Author {
        constructor(id) {
            this.id = id;
            this.firstName = "";
            this.lastName = "";
        }
    }

    $('button').on('click', function () {
        event.preventDefault();
        var arrayAuthors = [];
        $('select option:selected').each(function () {
            arrayAuthors.push(new Author($(this).data('id')));
        });
        var book = {
            "isbn": $('form input#isbn')[0].value,
            "title": $('form input#title')[0].value,
            "publisher": $('form input#publisher')[0].value,
            "type": $('form input#type')[0].value,
            "authors": arrayAuthors
        };
        makeAjaxCall('books', 'POST', book, function () {
            location.reload();
        })
    });

    $(mainDiv).on('click', 'a#delete', function () {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        makeAjaxCall('books', 'DELETE', $(this).parent().data('id'), function () {
            location.reload();
        })
    });

    $(mainDiv).on('click', 'a#authors a', function () {
        event.preventDefault();
        location.href = "authors.html";
    })

});
