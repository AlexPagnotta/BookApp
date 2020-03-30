import request from './baseService'

const API_NAME = 'login'

function login(username, password) {

  var requestFunction = request({
    url:    API_NAME,
    method: 'POST',
    data :{
        userName: username,
        password: password    
    }
    },false);

  return requestFunction;
}


const AuthenticationService = {
    login
}

export default AuthenticationService;