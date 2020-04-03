import React, { Component } from 'react'
import {StyleSheet, Image} from 'react-native'
import { connect } from 'react-redux'
import { actions, States } from '../store'
import { Layout, Text,Button, Select } from '@ui-kitten/components';



class BookDetailScreen extends Component {

  constructor() {
    super();

  }

  componentDidMount() {

    let book = this.props.route.params.book;
    this.props.setCurrentBook(book);

    //Load shelves
    this.props.getShelves();
  }


  render() {

    const {  loading, error,  shelvesSelect, route, navigation, onSelectShelfChanged, currentBook, shelfSelected } = this.props

    return (
      <Layout style={styles.container}>
        <Text category='h4'>{currentBook.title} </Text>
        <Text category='h4'>BookDetail {currentBook.bookId} </Text>
        <Text category='h4'>{currentBook.title} </Text>
        <Image
          style={styles.bookImage}
          source={{ uri: currentBook.imageUrl }}
        />
        <Select
          data={shelvesSelect}
          selectedOption={shelfSelected}
          onSelect={value => onSelectShelfChanged(value.id)}
        />
      </Layout>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bookImage:{
    width: 200,
    height: 300
  }
})

export const BookDetail = connect(

  // inject states to props
  (state: States) => ({
    loading: state.shelves.isLoading,
    error: state.shelves.error,
    shelvesSelect: state.shelves.shelvesSelect,
    currentBook: state.bookDetail.currentBook,
    shelfSelected: state.bookDetail.shelfSelected
  }),
  
  // inject actions to props
  dispatch => ({
    getShelves: () =>{ 
      dispatch(actions.shelves.getShelves())
    }, 
    onSelectShelfChanged: (selectedShelfId) =>{
      dispatch(actions.bookDetail.onSelectShelfChanged(selectedShelfId))
    },
    setCurrentBook: (book) =>{
      dispatch(actions.bookDetail.setCurrentBook(book))
    },
    
  })
)(BookDetailScreen)