import React, { Component } from 'react'
import {StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { actions, States } from '../store'
import { Button, Input,Layout,Text ,Icon, Spinner } from '@ui-kitten/components';

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
      <Layout style={styles.container}>
        <Layout style={styles.statusBar}>
          <Text category='h4'>BookApp</Text>
          <Button
            onPress={() => executeLogout()}>
            Logout
          </Button>
        </Layout>
        <ScrollView style={styles.homeContainer}>
        </ScrollView>
          
      </Layout>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 48
  },
  statusBar: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10
  },
  homeContainer: {
    flex: 1,
    backgroundColor: 'red',
    padding: 10
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