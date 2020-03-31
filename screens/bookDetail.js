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
    //Load shelves
    this.props.getShelves();
  }


  render() {

    const {  loading, error, shelves , route, navigation } = this.props

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
          data={shelves}
          keyExtractor={item => item.shelfId}
          //selectedOption={selectedOption}
          //onSelect={setSelectedOption}
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
    shelves: state.shelves.shelves
  }),
  
  // inject actions to props
  dispatch => ({
    getShelves: () =>{ 
      dispatch(actions.shelves.getShelves())
    }
  })
)(BookDetailScreen)