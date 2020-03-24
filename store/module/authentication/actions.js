import * as types from './constants'
import axios from 'axios';

const url = 'http://192.168.1.107:5000/login'

/**
* Execute the login async call
* @param {string} username 
* @param {string} password
*/
export const login = (username: string, password: string) => {

  return dispatch => {

    //Start Login Action
    dispatch({
      type: types.AUTHENTICATION_LOGIN
    })

    return new Promise(() => {

      axios
        .post(url,{
          userName: username,
          password: password
        })
        .then(response => {

          var data = response.data;

          //Login has succeded
          dispatch({
            type: types.AUTHENTICATION_LOGIN_SUCCESS,
            payload: {
              userId: data.userId,
              userName: data.userName,
              name: data.name,
              lastName: data.lastName,
              token: data.token
            }
          })

        })
        .catch(error => {
  
          //Error on login
          dispatch({
            type: types.AUTHENTICATION_LOGIN_ERROR,
            payload: {
              callError: error
            }
          })
        })
    });
  }
}

/**
* Sign out method
*/
export const logout = () => {

  return {
    type: types.AUTHENTICATION_LOGOUT
  }
  
}
