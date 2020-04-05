import React from 'react'
import { Card, Text, Layout, Icon, Button} from '@ui-kitten/components';
import {StyleSheet, Image,FlatList} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import BookCardItem from './bookCardItem'

function ShelfItem({ shelf }) {

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
        <Button style={styles.button} appearance='ghost' status='primary' icon={EditIcon}/>
        <Button style={styles.button} appearance='ghost' status='primary' icon={DeleteIcon}/>
      </Layout>
      <FlatList
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
    height: 200,
    padding: 20
  },
  headerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 50,
    alignItems: 'center'
  },
  button: {
    margin: 0,
    borderRadius: 100
  },
})

export default ShelfItem;