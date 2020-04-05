import React, { Component } from 'react'
import {StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import { actions, States } from '../../store'
import BooksList from '../../components/booksList'

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
      <BooksList books={books} loading={loading} />
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