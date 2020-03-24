import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Button
} from 'react-native'
import { connect } from 'react-redux'
import { actions, States } from '../store'

class LoginScreen extends Component {
    constructor(props) {
      super(props)
  
      // init local state
      this.state = {
        username: '',
        password: ''
      }
    }
  
    render() {
      const { loading, executeLogin } = this.props
  
      // show only loading indicator if loading state is true
      if (loading) {
        return <ActivityIndicator />
      }
  
  
      // display login screen
      return (
        <View style={styles.container}>
          <Text>Login</Text>
          <TextInput
            onChangeText={username => this.setState({ username })}
            value={this.state.username}
          />
          <TextInput
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          <Button
            onPress={() => {
                executeLogin(this.state.username, this.state.password)
            }}
          >
            Login
          </Button>
        </View>
      )
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      justifyContent: 'center'
    }
  })

  export const Login = connect(
  
    // inject states
    (state: States) => ({
      
      // props.loading -> modules.app.loading
      loading: state.user.isLoading
    }),
    
    // inject actions
    dispatch => ({
  
      // props.doLogin -> modules.login.login()
      executeLogin: (username, password) =>
        dispatch(actions.user.login(username, password))
    })
  )(LoginScreen)