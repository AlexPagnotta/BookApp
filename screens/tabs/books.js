import React, { Component } from 'react'
import {StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { actions, States } from '../../store'
import BooksList from '../../components/booksList'
import HeaderList from '../../components/headerList'
import { Layout, Text } from '@ui-kitten/components'
import { ScrollView } from 'react-native-gesture-handler'

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
      <ScrollView contentContainerStyle={{flexGrow: 1}}>          
        <Layout style={styles.libraryContainer}>     
          <HeaderList title='Your Library' subtitle='Here you can find all your books'></HeaderList>
          <BooksList  books={books} loading={loading}/>
        </Layout>
      </ScrollView>
    )
  }
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  libraryContainer: {
    flex:1
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