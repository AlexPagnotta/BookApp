import React from 'react'
import { Card, Text, Layout, Icon, Button,  useTheme, OverflowMenu, MenuItem } from '@ui-kitten/components';
import {StyleSheet, Image,FlatList} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import BookCardItem from './bookCardItem'
import CircularButton from './circularButton';

function ShelfItem({ shelf, removeShelf, showModal }) {

  const theme = useTheme();
  
  const navigation = useNavigation();

  const EditIcon = (style) => (
    <Icon {...style} name='edit'/>
  );

  const DeleteIcon = (style) => (
    <Icon {...style} name='trash'/>
  );

  
  const renderToggleButton = () => (
    <Button >
      TOGGLE MENU
    </Button>
  );

  return (
    <Layout style={styles.shelfItemContainer}>
      <Layout style={styles.headerContainer}>
        <Text category='h6'>{shelf.name}</Text>
        <Layout style={styles.buttonsContainer}>
          <CircularButton 
            customStyle={styles.button}
            onPress={() => {showModal(shelf)}}        
            iconName={'edit-outline'}>     
          </CircularButton>
          <CircularButton 
            style={styles.button}
            onPress={() => {removeShelf(shelf.shelfId)}}        
            iconName={'trash-outline'}
            disabled={shelf.books.length !== 0}>     
          </CircularButton>
        </Layout>      
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
    justifyContent: 'space-between',
    height: 72,
    paddingLeft: 30,
    paddingRight: 30
  },
  buttonsContainer: {
    display: 'flex', 
    flexWrap: 'wrap',
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    marginRight: 20
  },
  bookList: {
    minHeight: 300,
    padding: 20,
    paddingLeft: 20
  },
})

export default ShelfItem;