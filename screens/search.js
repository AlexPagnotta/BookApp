import React, { Component,Fragment } from 'react'
import {StyleSheet,FlatList} from 'react-native'
import { connect } from 'react-redux'
import { actions, States } from '../store'
import { Icon, Tab, Layout, Text,Button, Input, Spinner } from '@ui-kitten/components';
import { Formik } from 'formik'
import BooksList from '../components/booksList'
import { SafeAreaView } from 'react-native-safe-area-context';
import CircularButton from '../components/circularButton';

class SearchScreen extends Component {

  constructor() {
    super();
  }

  componentDidMount() {

    //Reset Search
    this.props.resetSearch();

  }

  render() {

    const { foundBooks, isLoading, callError, searchBook, loadMore, isLoadingMore,navigation} = this.props
    

    return (
      <SafeAreaView style={styles.container}>
      <Layout style={styles.statusBar}>
        <CircularButton
          onPress={() => navigation.goBack()}        
          iconName={'arrow-ios-back-outline'}>     
        </CircularButton>
        <Formik 
          initialValues={{ searchText: '' }}
          onSubmit={values => {
            searchBook(values.searchText)
          }}>
          {({  values, handleChange,handleSubmit }) => (
          <Fragment>
            <Input
                style={styles.searchInput}
                name='searchText'
                placeholder='Search...'
                size='medium'
                onChangeText={handleChange('searchText')}
                value={values.password}
            />
            <CircularButton
              onPress={handleSubmit}        
              iconName={'search-outline'}>     
            </CircularButton> 
          </Fragment> 
          )}
        </Formik> 
      </Layout> 
        <BooksList books={foundBooks} loading={isLoading} loadMore={loadMore} />     
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: 72,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 30,
    paddingLeft: 30
  },
  searchInput:{
    flex: 1,
    marginRight: 20,
    marginLeft: 20,
  }
})

export const Search = connect(

  // inject states to props
  (state: States) => ({
    foundBooks: state.search.foundBooks,
    isLoading: state.search.isLoading,
    isLoadingMore: state.search.isLoadingMore,
    callError: state.search.callError
  }),
  
  // inject actions to props
  dispatch => ({
    searchBook:async (searchText) =>{
      await dispatch(actions.search.searchBook(searchText))
    },
    loadMore: async () =>{
      await dispatch(actions.search.loadMoreBooks()) 
    },
    resetSearch:() =>{
      dispatch(actions.search.resetSearch())
    }
  })
)(SearchScreen)