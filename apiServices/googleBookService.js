import request from './baseService'

const API_NAME = 'volumes'

function searchBook(searchText, startIndex = 0) {

  var requestFunction = request({
    url:    API_NAME + '?q=' + searchText + '&startIndex=' + startIndex,
    method: 'GET'
  }, false, true);

  return requestFunction;
}

const GoogleBookService = {
  searchBook
}

export default GoogleBookService;