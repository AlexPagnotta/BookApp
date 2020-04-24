import React, { Component } from 'react'
import {StyleSheet, ActivityIndicator,FlatList} from 'react-native'
import { Icon, Layout, Text,Button, Card } from '@ui-kitten/components';
import ShelfItem from './shelfItem'

function ShelvesList({ shelves, loading,  removeShelf, showModal }) {

  if(loading){
    return (
        <ActivityIndicator></ActivityIndicator>
    )
  }

  return (
    <FlatList
      data={shelves}
      renderItem={({ item }) => <ShelfItem shelf={item} removeShelf={removeShelf} showModal={showModal} />}
      keyExtractor={item => item.shelfId.toString()}
      horizontal={false}
    />
  )
  
}

const styles = StyleSheet.create({
})

export default ShelvesList;