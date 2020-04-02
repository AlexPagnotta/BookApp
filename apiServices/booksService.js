import request from './baseService'

const API_NAME = 'books'

function getAll() {

  var requestFunction = request({
    url:    API_NAME,
    method: 'GET'
  });

  return requestFunction;
}


function update(book) {

  var requestFunction = request({
    url:    API_NAME,
    method: 'PUT',
    data : book      
  });

  return requestFunction;
}



const BooksService = {
    getAll,update
}

export default BooksService;