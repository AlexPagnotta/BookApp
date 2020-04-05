import React, { Component } from 'react'
import {StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import { actions, States } from '../../store'
import { Layout, Text,Button } from '@ui-kitten/components';

class ShelvesTab extends Component {

  constructor() {
    super();
  }

  componentDidMount(){
  }

  render() {

    //Props from Redux
    const {  } = this.props

    return (
      <Text>Shelves</Text>
    )
  }
}

const styles = StyleSheet.create({
})

export const Shelves = connect(

  // inject states to props
  (state: States) => ({
  }),
  
  // inject actions to props
  dispatch => ({
  })

)(ShelvesTab)