import axios from 'axios';
import { AsyncStorage } from 'react-native'
import * as globalCostants from '../constants/globalConstants'
import * as RootNavigation from '../rootNavigation/rootNavigation'
import * as SecureStore from 'expo-secure-store';

 /**
  * Request Wrapper with default success/error actions
  * @param {*} options 
  * @param {*} isHeader 
  */
const request = async function (options, isHeader = true) {

  let authToken = null;

  if (isHeader) {
    authToken = await SecureStore.getItemAsync(globalCostants.TOKEN_KEY); /// Add header
  }

  const client = axios.create({
    baseURL: globalCostants.API_URL,
    headers: {'Authorization': 'Bearer '+ authToken}
  });

  const onSuccess = function (response) {

    return response.data;

  }

  const onError = function (error) {

    console.debug('Request Failed:', error.config);

    var errorMessage = '';

    var response = error.response;

    //Reeturn message if BadRequest
    if(response.status === 400){
      errorMessage = response.data.message;
    }
    //Go to login if not aithenticated
    else if(response.status === 401){
      RootNavigation.replace('Login');
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