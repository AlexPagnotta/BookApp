import React, { Component } from 'react'
import {StyleSheet, ActivityIndicator,FlatList} from 'react-native'
import { Icon, Layout, Text,Button, Card , Spinner, useTheme } from '@ui-kitten/components';
import ShelfItem from './shelfItem'

function ShelvesList({ shelves, loading,  removeShelf, showModal }) {

  const theme = useTheme();

  if(loading){
    return (
      <Layout style={[
        styles.spinnerContainer, 
        {
          backgroundColor: theme['color-primary-200']
        }]}>
        <Spinner size='giant'></Spinner>
      </Layout>
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
  spinnerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
    width: '100%'
  }
})

export default ShelvesList;