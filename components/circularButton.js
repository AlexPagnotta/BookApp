import React from 'react'
import { Icon, Button, useTheme } from '@ui-kitten/components';
import {StyleSheet} from 'react-native'

function CircularButton({onPress, iconName, customStyle}) {

  const theme = useTheme();

  const ButtonIcon = (style) => (
    <Icon {...style} name={iconName} fill={theme['color-primary-500']} />
  );

  return (
    <Button style={[
      styles.button, 
      {
        backgroundColor: theme['color-primary-200'],
        borderColor: theme['color-primary-200'], 
        fill: 'red'
      }, 
      customStyle]}
      onPress={onPress}
      icon={ButtonIcon}>
    </Button>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    width: 43,
    height: 43,
    backgroundColor: 'red',
  }
})

export default CircularButton;