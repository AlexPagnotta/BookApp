import * as costants from './constants'
import * as globalCostants from '../../../constants/globalConstants'
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import * as RootNavigation from '../../../rootNavigation/rootNavigation'
import AuthenticationService from '../../../apiServices/authenticationService';

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

      var loginPromise = AuthenticationService.login(username, password);

      var response = await loginPromise;

      //Save token
      await SecureStore.setItemAsync(globalCostants.TOKEN_KEY, response.token)
      await SecureStore.setItemAsync(globalCostants.REFRESH_TOKEN_KEY, response.refreshToken)

      dispatch({
        type: costants.AUTHENTICATION_LOGIN_SUCCESS,
        payload: {
          userId: response.userId,
          userName: response.userName,
          name: response.name,
          lastName: response.lastName,
          authToken: response.token
        }
      })
      
    }
    catch (error) {

      //Error on login
      dispatch({
        type: costants.AUTHENTICATION_LOGIN_ERROR,
        payload: {
          callError: error.errorMessage
        }
      }) 
    }
  }
}

/**
* Method that check if a token is present
*/
export const checkIsLogged = () => {

  return async dispatch => {

    dispatch({
      type: costants.AUTHENTICATION_CHECK_IS_LOGGED
    })

    try{

      var token = await SecureStore.getItemAsync(globalCostants.TOKEN_KEY)

      dispatch({
        type: costants.AUTHENTICATION_CHECK_IS_LOGGED_SUCCESS,
        payload: {
          isLogged: token != null && token !== ''
        }
      })

    }
    catch(error){

      dispatch({
        type: costants.AUTHENTICATION_CHECK_IS_LOGGED_ERROR,
        payload: {
          callError: error
        }
      })
    }    
  }
}


/**
* Hide error modal method
*/
export const hideErrorModal = () => {
  return {
    type: costants.AUTHENTICATION_HIDE_ERROR_MODAL
  } 
}

/**
* Toggle secure text entry method
*/
export const toggleSecureTextEntry = () => {
  return {
    type: costants.AUTHENTICATION_TOGGLE_SECURE_TEXT_ENTRY
  } 
}

/**
* Sign out method
*/
export const logout = () => {

  return async dispatch => {

    await SecureStore.setItemAsync(globalCostants.TOKEN_KEY, '')
    await SecureStore.setItemAsync(globalCostants.REFRESH_TOKEN_KEY, '')

    dispatch({
      type: costants.AUTHENTICATION_LOGOUT
    })
  }
}
