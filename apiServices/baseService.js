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
    //authToken = await SecureStore.getItemAsync(globalCostants.TOKEN_KEY); //TODO: Reimplement 
  }

  const client = axios.create({
    baseURL: isGoogleBooksApi ? globalCostants.API_URL_GOOGLE_BOOKS : globalCostants.API_URL,
    headers: isGoogleBooksApi ? {} : {'Authorization': 'Bearer '+ authToken}  
  });

  //Interceptors to handle success and errors
  client.interceptors.response.use(  (response) => {

    console.debug('Call Success: ' + response.config.url);

    return response.data;

  }, (error) => {

    //Get the request
    const request = error.config;

    console.debug('Request Failed:', error, request); 

    var errorMessage = '';

    var response = error.response;

    //Reeturn message if BadRequest
    if(response.status === 400){

      errorMessage = response.data.message;

      
    }
    //Try refresh token and retry call, logout if does not work
    else if(response.status === 401){

      return handleTokenRefresh(client, request);

    } 
    else{
      errorMessage = 'Error while executing Action.';
    }

    //Build error object
    var error = {
      error, errorMessage
    }

    return Promise.reject(error);

  });

  return client(options);
}

const handleTokenRefresh = async function (client, request) {

  try{

     //If a try has already been made, return to login
     if(request._retry){
      //Execute logout
      store.dispatch(actions.authentication.logout());
      return;
    }
    
    //Avoid loop
    request._retry = true;

    //Get refresh token

    var refreshToken = await SecureStore.getItemAsync(globalCostants.REFRESH_TOKEN_KEY)
    console.debug('Get Refresh Token: ' + refreshToken);

    var refreshTokenResponse = await client.post('refreshToken/' + refreshToken);

    //Update tokens on storage

    console.debug('Updated Token: ' + refreshTokenResponse.token);
    console.debug('Updated RefreshToken: ' + refreshTokenResponse.refreshToken);

    await SecureStore.setItemAsync(globalCostants.TOKEN_KEY,refreshTokenResponse.token);
    await SecureStore.setItemAsync(globalCostants.REFRESH_TOKEN_KEY,refreshTokenResponse.refreshToken);

    // Change Authorization header
    request.headers['Authorization'] = 'Bearer ' + refreshTokenResponse.token;

    console.debug('Set token on call: ' + request.headers['Authorization']);

    // Return request object with Axios.
    return client(request); 

  }
  catch(error){

    console.debug(error);
    //Execute logout
    store.dispatch(actions.authentication.logout());

  }
}

export default request;