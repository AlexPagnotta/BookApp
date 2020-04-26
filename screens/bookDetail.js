import React, { Component } from 'react'
import {StyleSheet, Image, ScrollView, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { actions, States } from '../store'
import { Layout, Text,Button, Select, Spinner } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import CircularButton from '../components/circularButton';

class BookDetailScreen extends Component {

  constructor() {
    super();

  }

  async componentDidMount() {

    let book = this.props.route.params.book;
  
    //Set current book on state
    let setCurrentBook = this.props.setCurrentBook;

    await this.props.getShelves();

    setCurrentBook(book);
  }


  render() {

    const {  loading, error,  shelvesSelect, route, navigation, onSelectShelfChanged, currentBook, shelfSelected } = this.props

    if(loading){
      return (
        <Layout style={
          styles.spinnerContainer}>
          <Spinner size='giant'></Spinner>
        </Layout>
      )
    }

    return (
      <SafeAreaView style={styles.mainContainer}>
        <Layout style={styles.statusBar}>
          <CircularButton
            onPress={() => navigation.goBack()}        
            iconName={'arrow-ios-back-outline'}>     
          </CircularButton>
        </Layout>
        <ScrollView>
          <Layout style={styles.bookImageHeader}>
            <Layout style={styles.bookImageContainer}>
              <Image 
                style={styles.bookImage}
                source={currentBook.imageUrl ? { uri: currentBook.imageUrl } : null}     
              />
            </Layout>          
          </Layout>
          <Layout style={styles.bookDetailContainer}>
            <Text style={styles.text} category='h2'>{currentBook.title} </Text>
            <Text style={styles.textSub} category='h6'>{currentBook.authors == null || currentBook.authors.length == 0 ? 'No Author' : currentBook.authors[0] } </Text>
            <Text style={styles.textSub} category='h6'>{currentBook.publisher } </Text>
            <Text style={styles.textSub} category='h6'>{currentBook.pageCount } Pages </Text>
            <Select
              style={styles.shelfSelect}
              data={shelvesSelect}
              selectedOption={shelfSelected}
              onSelect={value => onSelectShelfChanged(value.id)}
            />
            <Text style={styles.text} category='p1'>{currentBook.description} </Text>
            <FlatList
              style={styles.categoriesList}
              data={currentBook.categories}
              keyExtractor={item => item}
              renderItem={({ item }) =>
                <Layout style={styles.categoryPill}>
                <Text appearance='alternative'>{item}</Text>
                </Layout>
              }
              horizontal={true}          
            /> 
          </Layout>   
        </ScrollView>    
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
    width: '100%'
  },
  statusBar: {
    height: 72,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 30,
    paddingLeft: 30
  },
  mainContainer: {
    flex: 1,
  },
  bookImageHeader: {
    width: '100%',
    height: 300,
    backgroundColor: 'rgba(120,100,190,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bookImageContainer: {
    width: 140,
    height: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    backgroundColor: 'rgba(0,0,0,0)'
  },
  bookImage:{
    flex: 1,
    borderRadius: 8
  },
  bookDetailContainer: {
    padding: 30,
    alignItems: 'center'
  },
  text: {
    textAlign: 'center',
    marginBottom: 30
  },
  textSub: {
    textAlign: 'center',
    marginBottom: 10
  },
  shelfSelect: {
    width: '60%',
    marginTop: 30,
    marginBottom: 40
  },
  categoriesList:{
    width: '100%',
  },
  categoryPill:{
    backgroundColor: 'rgba(120,100,190,0.5)',
    padding: 15,
    borderRadius: 50,
    marginTop: 20
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
    getShelves: async () =>{ 
      await dispatch(actions.shelves.getShelves())
    }, 
    onSelectShelfChanged:async (selectedShelfId) =>{
      await dispatch(actions.bookDetail.onSelectShelfChanged(selectedShelfId))
    },
    setCurrentBook: (book) =>{
      dispatch(actions.bookDetail.setCurrentBook(book))
    },
    
  })
)(BookDetailScreen)