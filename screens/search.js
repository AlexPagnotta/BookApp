import React, { Component,Fragment } from 'react'
import {StyleSheet, ActivityIndicator,FlatList} from 'react-native'
import { connect } from 'react-redux'
import { actions, States } from '../store'
import { Icon, Tab, Layout, Text,Button, Input } from '@ui-kitten/components';
import { Formik } from 'formik'

class SearchScreen extends Component {

  constructor() {
    super();
  }

  componentDidMount() {

  }

  render() {

    const { foundBooks, isLoading, callError, searchBook} = this.props
    
    
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
            <FlatList
              data={foundBooks}
              renderItem={({ item }) => <Text>{item.volumeInfo.title}</Text>}
              keyExtractor={item => item.id}
              horizontal={false}
            />
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
    callError: state.search.callError
  }),
  
  // inject actions to props
  dispatch => ({
    searchBook:async (searchText) =>{
      await dispatch(actions.search.searchBook(searchText))
    }
  })
)(SearchScreen)