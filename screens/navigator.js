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

    //Check if the user is already logged
    this.props.checkIsLogged();
  }

  render() {

    const { isLogged, showSplashScreen } = this.props


    if(showSplashScreen){
      return <Splash />;
    }

    return (
      <Stack.Navigator initialRouteName='Home'>
        {!isLogged  ? (
          <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        ): (
          <>
            <Stack.Screen name="BookDetail" component={BookDetail} options={{headerShown: false}}/>
            <Stack.Screen name="Search" component={Search} options={{headerShown: false}}/>
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
    isLogged: state.authentication.isLogged
  }),
  
  // inject actions to props
  dispatch => ({
    checkIsLogged: async () => {
      await dispatch(actions.authentication.checkIsLogged())
    }
  })
)(NavigatorHomeScreen)