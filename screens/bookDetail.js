import React, { Component } from 'react'
import {StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import { actions, States } from '../store'
import { Layout, Text,Button } from '@ui-kitten/components';

class BookDetailScreen extends Component {

  constructor() {
    super();
  }

  componentDidMount() {

  }

  render() {

    const { route, navigation } = this.props

    //Get the id of the book from react navigation
    const { bookId } = route.params;

    return (
      <Layout style={styles.container}>
        <Text category='h4'>BookDetail {bookId} </Text>
      </Layout>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export const BookDetail = connect(

  // inject states to props
  (state: States) => ({
  }),
  
  // inject actions to props
  dispatch => ({
  })
)(BookDetailScreen)