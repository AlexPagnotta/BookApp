import React from 'react'
import { Card, Text } from '@ui-kitten/components';
import {StyleSheet} from 'react-native'


function BookCardItem({ book }) {
  return (
    <Card style={styles.bookCard}>
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