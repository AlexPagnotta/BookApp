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
  
      //Init local state
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
            title="Login"
            color="#f194ff"
            onPress={() => executeLogin(this.state.username, this.state.password)}
          />
        </View>
      )
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      justifyContent: 'center',
      margin: 100
    }
  })

  export const Login = connect(
  
    // inject states
    (state: States) => ({
      
      // props.loading -> modules.app.loading
      loading: state.authentication.isLoading
    }),
    
    // inject actions
    dispatch => ({ 
      executeLogin: (username, password) =>
        dispatch(actions.authentication.login(username, password))
    })

  )(LoginScreen)