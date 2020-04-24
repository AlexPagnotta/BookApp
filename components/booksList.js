import React, { Component} from 'react'
import {StyleSheet, ActivityIndicator,FlatList, View} from 'react-native'
import { Icon, Layout, Text,Button, Card,  useTheme } from '@ui-kitten/components';
import BookCardItem from './bookCardItem'

function BooksList({ books, loading, loadMore }) {

  const theme = useTheme();

  if(loading){
    return (
        <ActivityIndicator></ActivityIndicator>
    )
  }

  return (
    <Layout style={[
        styles.mainContainer, 
        {
          backgroundColor: theme['color-primary-200']
        }]}>
      <FlatList
        style={styles.bookList}
        data={books}
        renderItem={({ item }) => <BookCardItem book={item} />}
        keyExtractor={item => item.bookId === 0 ? item.apiBookId : item.bookId}
        numColumns={3}
        horizontal={false}
        onEndReachedThreshold = {0.5}
        onEndReached={(distanceFromEnd ) => {
          if (distanceFromEnd.distanceFromEnd >= 0 && loadMore != null) {
            loadMore();
          }
        }}    
      /> 
    </Layout>
       
  )
  
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    width: '100%'
  },
  bookList: {
    paddingTop: 40,
    paddingBottom: 40,
    flex: 1
  },
})

export default BooksList;