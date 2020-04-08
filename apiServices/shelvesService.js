import request from './baseService'

const API_NAME = 'shelves'

function getAll() {

  var requestFunction = request({
    url:    API_NAME,
    method: 'GET'
  });

  return requestFunction;
}

function create(shelf) {

  var requestFunction = request({
    url:  API_NAME,
    method: 'POST',
    data : shelf      
  });

  return requestFunction;
}


function update(shelf) {

  var requestFunction = request({
    url:     API_NAME + '/' + shelf.shelfId,
    method: 'PUT',    
    data : shelf   
  });

  return requestFunction;
}

function remove(shelfId) {

  var requestFunction = request({
    url:  API_NAME + '/' + shelfId,
    method: 'DELETE'   
  });

  return requestFunction;
}


const ShelvesService = {
    getAll, create, update, remove
}


export default ShelvesService;