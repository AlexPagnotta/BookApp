import request from './baseService'

const API_NAME = 'volumes'

function searchBook(searchText) {

  var requestFunction = request({
    url:    API_NAME + '?q=' + searchText,
    method: 'GET'
  }, false, true);

  return requestFunction;
}

const GoogleBookService = {
  searchBook
}

export default GoogleBookService;