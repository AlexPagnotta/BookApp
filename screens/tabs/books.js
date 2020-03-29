import React, { Component } from 'react'
import {StyleSheet, ActivityIndicator} from 'react-native'
import { connect } from 'react-redux'
import { actions, States } from '../../store'
import { Icon, Layout, Text,Button, List, ListItem } from '@ui-kitten/components';

class BooksTab extends Component {

  constructor() {
    super();
  }

  componentDidMount(){
      this.props.getBooks();
  }

  render() {

    //Props from Redux
    const { loading, error, books } = this.props

    const renderItem = ({ item, index }) => (
      <ListItem title={`${item.bookId} ${index + 1}`}/>
    );

    if(loading){
      return (
          <ActivityIndicator></ActivityIndicator>
      )
    }
    return (
      <List style={styles.list}
          data={books}
          renderItem={renderItem}
      />
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  },
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
    getBooks: () =>{ 
      dispatch(actions.books.getBooks())
    }
  })
)(BooksTab)