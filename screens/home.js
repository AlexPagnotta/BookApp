import React, { Component } from 'react'
import { View, Text, Button,StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { actions, States } from '../store'

class HomeScreen extends Component {

  constructor() {
    super();
  }

  componentDidMount() {

    //Get the token 
    this.props.getAuthToken().then(() => {

      //If token is not present go to login
      if(this.props.authToken == null || this.props.authToken === ''){
        this.props.navigation.replace('Login');
      }

    })

  }

  render() {
    const { executeLogout, name, lastName, authToken } = this.props


    // Display greeting with user full name displayed
    return (
      <View>
        <Text>Welcome {authToken} {name} {lastName}!</Text>
        <Button
          title="LOGOUT"
          color="#f194ff"
          onPress={() => executeLogout()}
        />   
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 48
  }
})

export const Home = connect(

  // inject states to props
  (state: States) => ({
    name: state.authentication.name,
    lastName: state.authentication.lastName,
    authToken: state.authentication.authToken
  }),
  
  // inject actions to props
  dispatch => ({
    executeLogout: () =>{ 
      dispatch(actions.authentication.logout())
    },
    getAuthToken: () => dispatch(actions.authentication.getAuthToken())
  })
)(HomeScreen)