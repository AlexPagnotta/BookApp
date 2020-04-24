import React from 'react'
import { Card, Text, Layout, Icon, Button,  useTheme } from '@ui-kitten/components';
import {StyleSheet, Image,FlatList} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import BookCardItem from './bookCardItem'

function ShelfItem({ shelf, removeShelf, showModal }) {

  const theme = useTheme();
  
  const navigation = useNavigation();

  const EditIcon = (style) => (
    <Icon {...style} name='edit'/>
  );

  const DeleteIcon = (style) => (
    <Icon {...style} name='trash'/>
  );

  
  return (
    <Layout style={styles.shelfItemContainer}>
      <Layout style={styles.headerContainer}>
        <Text category='h6'>{shelf.name}</Text>
        <Button onPress={() => {showModal(shelf);}} appearance='ghost' status='primary' icon={EditIcon}/>
        <Button onPress={() => {removeShelf(shelf.shelfId);}} disabled={shelf.books.length !== 0} style={styles.button} appearance='ghost' status='primary' icon={DeleteIcon}/>
      </Layout>
      <FlatList
        style={[
          styles.bookList, 
          {
            backgroundColor: theme['color-primary-200']
          }
        ]}
        data={shelf.books}
        renderItem={({ item }) => <BookCardItem book={item} />}
        keyExtractor={item => item.bookId.toString()}
        horizontal={true}
      />
    </Layout>
  )
}

const styles = StyleSheet.create({
  shelfItemContainer: {
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 72,
    paddingLeft: 30
  },
  button: {
    borderRadius: 100
  },
  bookList: {
    padding: 20,
    paddingLeft: 20
  },
})

export default ShelfItem;