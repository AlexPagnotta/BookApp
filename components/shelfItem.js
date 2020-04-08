import React from 'react'
import { Card, Text, Layout, Icon, Button} from '@ui-kitten/components';
import {StyleSheet, Image,FlatList} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import BookCardItem from './bookCardItem'

function ShelfItem({ shelf, removeShelf, showModal }) {

  const navigation = useNavigation();

  const EditIcon = (style) => (
    <Icon {...style} name='edit'/>
  );

  const DeleteIcon = (style) => (
    <Icon {...style} name='trash'/>
  );

  
  return (
    <Layout  style={styles.shelfItemContainer}>
      <Layout style={styles.headerContainer}>
        <Text category='h6'>{shelf.name}</Text>
        <Button onPress={() => {showModal(shelf);}} appearance='ghost' status='primary' icon={EditIcon}/>
        <Button onPress={() => {removeShelf(shelf.shelfId);}} disabled={shelf.books.length !== 0} style={styles.button} appearance='ghost' status='primary' icon={DeleteIcon}/>
      </Layout>
      <FlatList style={styles.bookList}
        data={shelf.books}
        renderItem={({ item }) => <BookCardItem book={item} />}
        keyExtractor={item => item.bookId}
        horizontal={true}
      />
    </Layout>
  )
}

const styles = StyleSheet.create({
  shelfItemContainer: {
    height: 300,
    padding: 20
  },
  headerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  button: {
    margin: 0,
    borderRadius: 100
  },
  bookList: {
    margin: 0,
  },
})

export default ShelfItem;