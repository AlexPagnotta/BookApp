import React, { Component } from 'react'
import {StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { actions, States } from '../store'
import { Login } from './login'
import { Button, Input,Layout,Text ,Icon, Spinner } from '@ui-kitten/components';

class HomeScreen extends Component {
  render() {
    const { executeLogout, loggedIn, name, lastName } = this.props

    // Display login screen when user is not logged in
    if (!loggedIn) {
      return (
        <Layout style={styles.container}>
          <Login />
        </Layout>
      )
    }

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
    loggedIn: state.authentication.loggedIn,
    name: state.authentication.name,
    lastName: state.authentication.lastName
  }),
  
  // inject actions to props
  dispatch => ({
    executeLogout: () => dispatch(actions.authentication.logout())
  })
)(HomeScreen)