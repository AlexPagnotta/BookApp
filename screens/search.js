import React, { Component } from 'react'
import {StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import { actions, States } from '../store'
import { Icon, Tab, Layout, Text,Button } from '@ui-kitten/components';

class SearchScreen extends Component {

  constructor() {
    super();
  }

  componentDidMount() {

  }

  render() {

    const { } = this.props
    
    
    return (
      <Layout style={styles.container}>
        <Text>Search</Text>
      </Layout>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export const Search = connect(

  // inject states to props
  (state: States) => ({
  }),
  
  // inject actions to props
  dispatch => ({
  })
)(SearchScreen)