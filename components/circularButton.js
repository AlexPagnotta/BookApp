import React from 'react'
import { Icon, Button, useTheme } from '@ui-kitten/components';
import {StyleSheet} from 'react-native'

function CircularButton({onPress, iconName, disabled, customStyle}) {

  const theme = useTheme();

  const ButtonIcon = (style) => (
    <Icon {...style} name={iconName} fill={!disabled ? theme['color-primary-500'] : theme['color-primary-300']} />
  );

  return (
    <Button style={[
      styles.button, 
      {
        backgroundColor: theme['color-primary-200'],
        borderColor: theme['color-primary-200']
      }, 
      customStyle]}
      onPress={onPress}
      icon={ButtonIcon}
      disabled = {disabled}>
    </Button>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    width: 43,
    height: 43
  }
})

export default CircularButton;