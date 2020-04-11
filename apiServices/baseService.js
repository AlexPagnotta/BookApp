import axios from 'axios';
import { AsyncStorage } from 'react-native'
import * as globalCostants from '../constants/globalConstants'
import * as RootNavigation from '../rootNavigation/rootNavigation'
import * as SecureStore from 'expo-secure-store';
import {store,  actions } from '../store';

 /**
  * Request Wrapper with default success/error actions
  * @param {*} options 
  * @param {*} isHeader 
  */
const request = async function (options, isHeader = true, isGoogleBooksApi = false) {

  
  let authToken = null;

  if (isHeader) {
    //authToken = await SecureStore.getItemAsync(globalCostants.TOKEN_KEY); /// Add header
  }

  const client = axios.create({
    baseURL: isGoogleBooksApi ? globalCostants.API_URL_GOOGLE_BOOKS : globalCostants.API_URL,
    headers: isGoogleBooksApi ? {} : {'Authorization': 'Bearer '+ authToken}  
  });

  const onSuccess = function (response) {
    
    return response.data;

  }

  const onError = async function (error) {

    //Get the request
    const originalRequest = error.config;

    console.debug('Request Failed:', error, originalRequest);

    var errorMessage = '';

    var response = error.response;

    //Reeturn message if BadRequest
    if(response.status === 400){
      errorMessage = response.data.message;
    }
    //Try refresh token and retry call, logout if does not work
    else if(response.status === 401){

      //Get refresh token
      var refreshToken = await SecureStore.getItemAsync(globalCostants.REFRESH_TOKEN_KEY);

      //TODO: Refresh token

      //TODO: Set the refreshed token

      //TODO: Retry call

      //Execute logout
      store.dispatch(actions.authentication.logout());
      
    }
    else{
      errorMessage = 'Error while executing Action.';
    }

    //Build error object
    var error = {
      error, errorMessage
    }

    return Promise.reject(error);
  }


  return client(options)
    .then(onSuccess)
    .catch(onError);
}

export default request;