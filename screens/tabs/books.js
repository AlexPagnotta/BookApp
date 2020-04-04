import React, { Component } from 'react'
import {StyleSheet, ActivityIndicator,FlatList} from 'react-native'
import { connect } from 'react-redux'
import { actions, States } from '../../store'
import { Icon, Layout, Text,Button, Card } from '@ui-kitten/components';
import BookCardItem from '../../components/bookCardItem'

class BooksTab extends Component {

  constructor() {
    super();
  }

  componentDidMount(){
    //Load books
    this.props.getBooks();
  }

  render() {

    //Props from Redux
    const { loading, error, books } = this.props

    function Item({ book }) {
      return (
        <Layout>
          <Text >{ book.bookId}</Text>
        </Layout>
      );
    }

    if(loading){
      return (
          <ActivityIndicator></ActivityIndicator>
      )
    }

    return (
      <FlatList
        data={books}
        renderItem={({ item }) => <BookCardItem book={item} />}
        keyExtractor={item => item.bookId}
        numColumns={3}
        horizontal={false}
      />
    )
  }
}

const styles = StyleSheet.create({
})

export const Books = connect(

  // inject states to props
  (state: States) => ({
    loading: state.books.isLoading,
    error: state.books.error,
    books: state.books.books
  }),
  
  // inject actions to props
  dispatch => ({
    getBooks: async () =>{ 
      await dispatch(actions.books.getBooks())
    }
  })
)(BooksTab)