import React from 'react'
import { Text, useTheme , Layout} from '@ui-kitten/components';
import {StyleSheet} from 'react-native'

function HeaderList({title, subtitle}) {

  const theme = useTheme();

  return (
    <Layout style={[
      styles.button, 
      {
        backgroundColor: theme['color-primary-100']
      }]}>
      <Text style={styles.title} category="h2">Your Library</Text>
      <Text style={styles.subTitle} category="s1">Here you can find all your books</Text>
    </Layout>
  )
}

const styles = StyleSheet.create({
  title: {
    paddingTop: 30,
    paddingRight: 30,
    paddingLeft: 30
  },
  subTitle: {
    paddingTop: 10,
    paddingRight: 30,
    paddingLeft: 30,
    paddingBottom: 30
  }
})

export default HeaderList;