import React from 'react'
import { Card, Text, Layout} from '@ui-kitten/components';
import {StyleSheet, Image, TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native';

function BookCardItem({ book, horizontalList }) {

  const navigation = useNavigation();
  
  return (
    <TouchableOpacity
    style={[
      horizontalList ? { width: 110 } : { flex: 1/3 },
      styles.bookCard
      ]}
    onPress={() =>
        navigation.navigate('BookDetail', {
          book: book
        })
      }>
      <Image 
        style={styles.Image}
        source={book.imageUrl ? { uri: book.imageUrl } : null} 
      />    
    
    </TouchableOpacity>     
  )
}

const styles = StyleSheet.create({
  bookCard: {
    height: 190,
    margin: 10,
    marginBottom: 20,
    marginTop: 20,
    padding: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
    backgroundColor: 'rgba(0,0,0,0)'
  },
  Image: {
    flex: 1,
    borderRadius: 8
  },
})

export default BookCardItem;