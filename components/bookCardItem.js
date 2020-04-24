import React from 'react'
import { Card, Text} from '@ui-kitten/components';
import {StyleSheet, Image} from 'react-native'
import { useNavigation } from '@react-navigation/native';

function BookCardItem({ book }) {

  const navigation = useNavigation();
  
  const CardHeader = () => (
    <React.Fragment>  
      <Image
        style={styles.headerCardImage}
        source={book.imageUrl ? { uri: book.imageUrl } : null} 
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
    </Card>
  )
}

const styles = StyleSheet.create({
  bookCard: {
    flex: 1/3,
    height: 190,
    margin: 10,
    padding: 0
  },
  headerCardImage: {
    flex: 1
  },
})

export default BookCardItem;