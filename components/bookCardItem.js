import React from 'react'
import { Card, Text } from '@ui-kitten/components';
import {StyleSheet} from 'react-native'
import { BookDetail } from '../screens';
import { useNavigation } from '@react-navigation/native';

function BookCardItem({ book }) {

  const navigation = useNavigation();
  
  return (
    <Card style={styles.bookCard}
        onPress={() =>
          navigation.navigate('BookDetail', {
            bookId: book.bookId,
          })
        }>
      <Text>
        {book.bookId}
      </Text>
    </Card>
  )
}

const styles = StyleSheet.create({
  bookCard: {
    flex: 1/3,
    height: 200,
    margin: 10
  }
})

export default BookCardItem;