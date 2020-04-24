import React, { Component } from 'react'
import {StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { actions, States } from '../../store'
import BooksList from '../../components/booksList'
import { Layout, Text } from '@ui-kitten/components'
import { withStyles } from '@ui-kitten/components';

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

    return (
        <Layout style={styles.mainContainer}>          
          <Layout style={styles.libraryContainer}>
            <Text style={styles.title} category="h2">Your Library</Text>
            <Text style={styles.subTitle}>Here you can find all your books</Text>
            <BooksList books={books} loading={loading} />
          </Layout>
        </Layout>
    )
  }
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  libraryContainer: {
    paddingTop: 30,
    flex:1
  },
  title: {
    paddingRight: 30,
    paddingLeft: 30
  },
  subTitle: {
    paddingTop: 10,
    paddingRight: 30,
    paddingLeft: 30,
    paddingBottom: 30
  }
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