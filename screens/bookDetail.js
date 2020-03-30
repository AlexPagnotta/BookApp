import React, { Component } from 'react'
import {StyleSheet, Image} from 'react-native'
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
    const { book } = route.params;

    return (
      <Layout style={styles.container}>
        <Text category='h4'>BookDetail {book.bookId} </Text>
        <Text category='h4'>{book.title} </Text>
        <Text category='h4'>{book.imageUrl} </Text>
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