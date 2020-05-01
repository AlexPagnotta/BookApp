import React from 'react'
import { Text, useTheme , Layout} from '@ui-kitten/components';
import {StyleSheet} from 'react-native'

function HeaderList({title, subtitle}) {

  const theme = useTheme();

  return (
    <Layout style={[
      {
        backgroundColor: theme['color-primary-100']
      }]}>
      <Text style={styles.title} category="h2">{title}</Text>
      <Text style={styles.subTitle} category="s1">{subtitle}</Text>
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