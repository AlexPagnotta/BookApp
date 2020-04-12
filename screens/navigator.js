import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions, States } from '../store'
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from './home'
import { Login } from './login'
import { BookDetail } from './bookDetail'
import { Search } from './search'
import { Splash } from './splash'

const Stack = createStackNavigator();

class NavigatorHomeScreen extends Component {

  constructor() {
    super();
  }

  componentDidMount() {

    //Get the token 
    this.props.getAuthToken();

  }

  render() {

    const { authToken, showSplashScreen } = this.props

    if(showSplashScreen){
      return <Splash />;
    }

    return (
      <Stack.Navigator initialRouteName='Home'>
        {authToken == null || authToken == ''  ? (
          <Stack.Screen name="Login" component={Login} />
        ): (
          <>
            <Stack.Screen name="BookDetail" component={BookDetail} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
          </>
        )}
      </Stack.Navigator>
    )
  }
}

export const NavigatorHome = connect(

  // inject states to props
  (state: States) => ({
    showSplashScreen: state.authentication.showSplashScreen,
    authToken: state.authentication.authToken
  }),
  
  // inject actions to props
  dispatch => ({
    getAuthToken: async () => {
      await dispatch(actions.authentication.getAuthToken())
    }
  })
)(NavigatorHomeScreen)