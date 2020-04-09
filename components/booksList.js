import React, { Component } from 'react'
import {StyleSheet, ActivityIndicator,FlatList} from 'react-native'
import { Icon, Layout, Text,Button, Card } from '@ui-kitten/components';
import BookCardItem from './bookCardItem'

function BooksList({ books, loading, loadMore }) {


  if(loading){
    return (
        <ActivityIndicator></ActivityIndicator>
    )
  }

  return (
    <FlatList
      data={books}
      renderItem={({ item }) => <BookCardItem book={item} />}
      keyExtractor={item => item.bookId === 0 ? item.apiBookId : item.bookId}
      numColumns={2}
      horizontal={false}
      onEndReached={({ distanceFromEnd }) => {
      if(loadMore != null && distanceFromEnd <= 50){
          loadMore();
        }
      }}
    />
  )
  
}

const styles = StyleSheet.create({
})

export default BooksList;