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

    //Load book initial shelf
    this.props.setSelectedShelf({
      "id": 2,
      "text": "Da Leggere",
    }); //TODO: DUMMY change with shelf from bookand map it correctly

    //Load shelves
    this.props.getShelves();
  }


  render() {

    const {  loading, error,  shelvesSelect, route, navigation, selectedShelf, onSelectShelfChanged } = this.props

    //Get the id of the book from react navigation
    const { book } = route.params;

    return (
      <Layout style={styles.container}>
        <Text category='h4'>BookDetail {book.bookId} </Text>
        <Text category='h4'>{book.title} </Text>
        <Image
          style={styles.bookImage}
          source={{ uri: book.imageUrl }}
        />
        <Select
          data={shelvesSelect}
          selectedOption={selectedShelf}
          onSelect={value => onSelectShelfChanged(book, value)}
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
    selectedShelf: state.bookDetail.selectedShelf
  }),
  
  // inject actions to props
  dispatch => ({
    getShelves: () =>{ 
      dispatch(actions.shelves.getShelves())
    }, 
    onSelectShelfChanged: (book, selectedShelf) =>{
      dispatch(actions.bookDetail.onSelectShelfChanged(book, selectedShelf))
    },
    setSelectedShelf: (selectedShelf) =>{  
      dispatch(actions.bookDetail.setSelectedShelf(selectedShelf))
    }
    
  })
)(BookDetailScreen)