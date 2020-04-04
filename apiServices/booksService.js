import request from './baseService'

const API_NAME = 'books'

function getAll() {

  var requestFunction = request({
    url:    API_NAME,
    method: 'GET'
  });

  return requestFunction;
}

function create(book) {

  var requestFunction = request({
    url:  API_NAME,
    method: 'POST',
    data : book      
  });

  return requestFunction;
}

function update(book) {

  var requestFunction = request({
    url:  API_NAME + '/' + book.bookId,
    method: 'PUT',
    data : book      
  });

  return requestFunction;
}


function remove(bookId) {

  var requestFunction = request({
    url:  API_NAME + '/' + bookId,
    method: 'DELETE'   
  });

  return requestFunction;
}


const BooksService = {
    getAll, create, update, remove
}

export default BooksService;