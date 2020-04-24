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
      <FlatList
        style={[
        styles.bookList, 
        {
          backgroundColor: theme['color-primary-200']
        }]}
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
  )
  
}

const styles = StyleSheet.create({
  bookList: {
    paddingTop: 40,
    paddingRight: 30,
    paddingLeft: 30,
    paddingBottom: 40
  },
})

export default BooksList;