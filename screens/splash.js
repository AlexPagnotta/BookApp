import React, { Component } from 'react'
import {StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import { actions, States } from '../store'
import { Layout, Text, } from '@ui-kitten/components';


class SplashScreen extends Component {

  constructor() {
    super();
  }

  componentDidMount() {

  }

  render() {

    const {  } = this.props

    return (
      <Layout style={styles.container}>
        <Text category='h4'>BookApp</Text>
      </Layout>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export const Splash = connect(

  // inject states to props
  (state: States) => ({
  }),
  
  // inject actions to props
  dispatch => ({
  })
)(SplashScreen)