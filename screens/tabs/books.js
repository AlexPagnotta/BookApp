import React, { Component } from 'react'
import {StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import { actions, States } from '../../store'
import { Icon, Layout, Text,Button } from '@ui-kitten/components';

class BooksTab extends Component {

  constructor() {
    super();
  }

  render() {

    return (
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text category='h1'>Books</Text>
      </Layout>
    )
  }
}

const styles = StyleSheet.create({

})

export const Books = connect(

  // inject states to props
  (state: States) => ({
    /*name: state.authentication.name*/
  }),
  
  // inject actions to props
  dispatch => ({
    /*executeLogout: () =>{ 
      dispatch(actions.authentication.logout())
    }*/
  })
)(BooksTab)