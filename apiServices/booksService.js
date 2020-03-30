import request from './baseService'

const API_NAME = 'books'

function getAll() {

  var requestFunction = request({
    url:    API_NAME,
    method: 'GET'
  });

  return requestFunction;
}


const BooksService = {
    getAll
}

export default BooksService;