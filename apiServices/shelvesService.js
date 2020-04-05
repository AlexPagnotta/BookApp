import request from './baseService'

const API_NAME = 'shelves'

function getAll() {

  var requestFunction = request({
    url:    API_NAME,
    method: 'GET'
  });

  return requestFunction;
}


function update(shelf) {

  var requestFunction = request({
    url:    API_NAME,
    method: 'PUT'
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
    getAll, update, remove
}


export default ShelvesService;