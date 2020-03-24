import * as costants from './constants'
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

/**
* Execute the login async call
* @param {string} username 
* @param {string} password
*/
export const login = (username: string, password: string) => {

  return async dispatch => {

    //Start Login Action
    dispatch({
      type: costants.AUTHENTICATION_LOGIN
    })

    try{

      var loginPromise = axios
                      .post(costants.API_URL,{
                        userName: username,
                        password: password
                      });

      var response = await loginPromise;
      
      var data = response.data;

      //Save token
      await SecureStore.setItemAsync(costants.AUTHENTICATION_TOKEN_KEY, data.token)

      dispatch({
        type: costants.AUTHENTICATION_LOGIN_SUCCESS,
        payload: {
          userId: data.userId,
          userName: data.userName,
          name: data.name,
          lastName: data.lastName,
          token: data.token
        }
      })
      
    }
    catch (error) {

      console.log(error);

      //Error on login
      dispatch({
        type: costants.AUTHENTICATION_LOGIN_ERROR,
        payload: {
          callError: error
        }
      })
      
      
    }
  }
}

/**
* Sign out method
*/
export const logout = () => {

  return async dispatch => {

    await SecureStore.setItemAsync(costants.AUTHENTICATION_TOKEN_KEY, '')

    dispatch({
      type: costants.AUTHENTICATION_LOGOUT,
    })
  }
  
  
}
