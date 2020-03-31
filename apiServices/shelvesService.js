import request from './baseService'

const API_NAME = 'shelves'

function getAll() {

  var requestFunction = request({
    url:    API_NAME,
    method: 'GET'
  });

  return requestFunction;
}


const ShelvesService = {
    getAll
}

export default ShelvesService;