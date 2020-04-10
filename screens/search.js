import React, { Component,Fragment } from 'react'
import {StyleSheet, ActivityIndicator,FlatList} from 'react-native'
import { connect } from 'react-redux'
import { actions, States } from '../store'
import { Icon, Tab, Layout, Text,Button, Input } from '@ui-kitten/components';
import { Formik } from 'formik'
import BooksList from '../components/booksList'

class SearchScreen extends Component {

  constructor() {
    super();
  }

  componentDidMount() {

    //Reset Search
    this.props.resetSearch();

  }

  render() {

    const { foundBooks, isLoading, callError, searchBook, loadMore, isLoadingMore} = this.props
    
    
    return (
      <Layout style={styles.container}>
       <Formik 
          initialValues={{ searchText: '' }}
          onSubmit={values => {
            searchBook(values.searchText)
          }}>
          {({  values, handleChange,handleSubmit }) => (
          <Fragment>
            <Input
                name='searchText'
                label='Search'
                onChangeText={handleChange('searchText')}
                value={values.password}
            />
            <Button
              onPress={handleSubmit}
              disabled={isLoading}>
                {isLoading ? 'Loading...': 'Search'}
            </Button>   
          </Fragment> 
          )}
        </Formik>  
        <BooksList books={foundBooks} loading={isLoading} loadMore={loadMore} />
        {isLoadingMore && <ActivityIndicator></ActivityIndicator>}
      </Layout>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    loadMore:async () =>{
      await dispatch(actions.search.loadMoreBooks()) 
    },
    resetSearch:() =>{
      dispatch(actions.search.resetSearch())
    }
  })
)(SearchScreen)