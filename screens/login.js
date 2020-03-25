import React, { Component } from 'react'
import {
  StyleSheet,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import { connect } from 'react-redux'
import { actions, States } from '../store'
import { Button, Input,Layout,Text ,Icon } from '@ui-kitten/components';

class LoginScreen extends Component {
    constructor(props) {
      super(props)
  
      //Init local state
      this.state = {
        username: '',
        password: '', 
        secureTextEntry: true
      }
    }
  
    render() {

      const { loading, executeLogin } = this.props

      const passwordEyeIcon = (style) => (
        <Icon {...style} name={this.state.secureTextEntry ? 'eye-off' : 'eye'}/>
      );

      const onSecureTextIconPress = () => {
        this.setState({secureTextEntry : !this.state.secureTextEntry});
      };
  
      // show only loading indicator if loading state is true
      if (loading) {
        return <ActivityIndicator />
      }
  
  
      // display login screen
      return (
        <TouchableWithoutFeedback 
          onPress={ () => { Keyboard.dismiss() }}>
          <Layout 
            style={styles.container}
            onPress={Keyboard.dismiss()}>
            <Layout style={styles.logoContainer}>
              <Text category='h1'>BookApp</Text>
            </Layout>
            <Layout style={styles.inputsContainer}>
              <Input style={styles.input}
                label='Email'
                onChangeText={username => this.setState({ username })}
                value={this.state.username}
              />
              <Input
                icon={passwordEyeIcon}
                label='Password'
                secureTextEntry={this.state.secureTextEntry}
                onIconPress={onSecureTextIconPress}
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
              />
            </Layout>
            <Layout style={styles.buttonsContainer}>
              <Button style={styles.button}
                onPress={() => executeLogin(this.state.username, this.state.password)}>
                  LOGIN
              </Button>     
            </Layout>      
          </Layout>
        </TouchableWithoutFeedback>
      )
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32
    },
    logoContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    inputsContainer: {
      flex: 3
    },
    buttonsContainer: {
      flex: 1,
      flexDirection: 'column-reverse'
    },
    input: {
      marginBottom: 20
    },
    button: {
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