import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import { connect } from 'react-redux'
import { actions, States } from '../store'
import { Login } from './login'

class HomeScreen extends Component {
  render() {
    const { executeLogout, loggedIn, fullName } = this.props

    // Display login screen when user is not logged in
    if (!loggedIn) {
      return (
        <View>
          <Text>Awesome Project</Text>
          <Login />
        </View>
      )
    }

    // Display greeting with user full name displayed
    return (
      <View>
        <Text>Welcome {fullName}!</Text>
        <Button
          onPress={() => {
            executeLogout()
          }}
        >
          Logout
        </Button>
      </View>
    )
  }
}

export const Home = connect(

  // inject states to props
  (state: States) => ({
    loggedIn: state.user.loggedIn,
    fullName: state.user.fullName
  }),
  
  // inject actions to props
  dispatch => ({
    executeLogout: () => dispatch(actions.user.logout())
  })
)(HomeScreen)