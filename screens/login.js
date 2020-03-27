import React, { Component, Fragment } from 'react'
import {
  StyleSheet, ActivityIndicator, TouchableWithoutFeedback, Keyboard
} from 'react-native'
import { connect } from 'react-redux'
import { actions, States } from '../store'
import { Button, Input,Layout,Text ,Icon } from '@ui-kitten/components';
import { Formik } from 'formik'
import * as Yup from 'yup'

class LoginScreen extends Component {

    constructor(props) {
      super(props)
  
      //Init local state
      this.state = { 
        secureTextEntry: true
      }

    }
  
    render() {

      //Props from Redux
      const { loading, executeLogin } = this.props

      //Icon Hide Password Methods
      const passwordEyeIcon = (style) => (
        <Icon {...style} name={this.state.secureTextEntry ? 'eye-off' : 'eye'}/>
      );

      const onSecureTextIconPress = () => {
        this.setState({secureTextEntry : !this.state.secureTextEntry});
      };

      //Validation Form
      const validationSchema = Yup.object().shape({
        username: Yup.string()
          .label('Username')
          .required('Username cannot be empty'),
        password: Yup.string()
          .label('Password')
          .required('Password cannot be empty')
          .min(5, 'Password must have at least 5 characters ')
      })
  
      // Loading Indicator on Loading
      if (loading) {
        return <ActivityIndicator />
      }
  
      // Login Screen
      return (
        <TouchableWithoutFeedback 
          onPress={ () => { Keyboard.dismiss() }}
          accessible={false}>
          <Layout 
            style={styles.container}>
            <Layout style={styles.logoContainer}>
              <Text category='h1'>BookApp</Text>
            </Layout>
            <Formik 
              initialValues={{ username: '', password: '' }}
              onSubmit={values => {executeLogin(values)}}
              validationSchema={validationSchema}>
              {({ 
                handleChange, 
                handleBlur, 
                values, 
                handleSubmit, 
                errors, 
                touched, 
                isValid }) => (
              <Fragment>
                <Layout style={styles.inputsContainer}>
                  <Input style={styles.input}
                    name='username'
                    label='Username'
                    onChangeText={handleChange('username')}
                    value={values.username}
                    caption={touched.username ? errors.username : ''}
                    onBlur={handleBlur('username')}
                    status={touched.username && errors.username ? 'danger' : ''}
                  />
                  <Input
                    icon={passwordEyeIcon}
                    name='password'
                    label='Password'
                    secureTextEntry={this.state.secureTextEntry}
                    onIconPress={onSecureTextIconPress}
                    onChangeText={handleChange('password')}
                    value={values.password}
                    caption={touched.password ? errors.password : ''}
                    onBlur={handleBlur('password')}
                    status={touched.password && errors.password ? 'danger' : ''}
                  />
                </Layout>
                <Layout style={styles.buttonsContainer}>
                  <Button style={styles.button}
                    onPress={handleSubmit}
                    disabled={!isValid}>
                      LOGIN
                  </Button>     
                </Layout>   
              </Fragment> 
              )}
            </Formik>                        
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
      executeLogin: (values) => {

        if (values.username.length > 0 && values.password.length > 0) {
          dispatch(actions.authentication.login(values.username, values.password))
        }
        else{
          alert('error')
        } 
      }       
    })

  )(LoginScreen)