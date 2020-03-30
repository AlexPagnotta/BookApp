import request from '../ApiCentral'

const API_NAME = 'books'

function getAll() {
  return request({
    url:    API_NAME,
    method: 'GET'
  });
}


const BooksService = {
    getAll
}

export default BooksService;