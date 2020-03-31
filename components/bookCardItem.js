import React from 'react'
import { Card, Text} from '@ui-kitten/components';
import {StyleSheet, Image} from 'react-native'
import { BookDetail } from '../screens';
import { useNavigation } from '@react-navigation/native';

function BookCardItem({ book }) {

  const navigation = useNavigation();
  
  const CardHeader = () => (
    <React.Fragment>  
      <Image
        style={styles.headerCardImage}
        source={{ uri: book.imageUrl }}
      />
    </React.Fragment>
  );
  
  return (
    <Card header={CardHeader} style={styles.bookCard}
        onPress={() =>
          navigation.navigate('BookDetail', {
            book: book,
          })
        }>
        <Text>{book.title}</Text>
    </Card>
  )
}

const styles = StyleSheet.create({
  bookCard: {
    flex: 1/2,
    height: 360,
    margin: 20,
    padding: 0
  },
  headerCardImage: {
    flex: 1
  },
})

export default BookCardItem;