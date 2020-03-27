import React, { Component, Fragment } from 'react'
import {
  StyleSheet, ActivityIndicator, TouchableWithoutFeedback, Keyboard
} from 'react-native'
import { connect } from 'react-redux'
import { actions, States } from '../store'
import { Button, Input,Layout,Text ,Icon, Modal, Spinner } from '@ui-kitten/components';
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
      const { loading, callError, modalErrorVisible, executeLogin, hideErrorModal } = this.props

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
                    disabled={loading || !isValid}>
                      {loading ? 'Loading...': 'Login'}
                  </Button>     
                </Layout>
                <Modal
                  backdropStyle={styles.backdrop}
                  onBackdropPress={hideErrorModal}
                  visible={modalErrorVisible}>
                  <Layout
                    level='3'
                    style={styles.modalContainer}>
                    <Text>{callError}</Text>
                  </Layout>
                </Modal>   
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
    },
    modalContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 256,
      padding: 16,
    },
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  })

  export const Login = connect(
  
    // inject states
    (state: States) => ({
      
      loading: state.authentication.isLoading,
      callError: state.authentication.callError,
      modalErrorVisible: state.authentication.modalErrorVisible
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
      },
      hideErrorModal: () => {
        dispatch(actions.authentication.hideErrorModal())
      }           
    })

  )(LoginScreen)