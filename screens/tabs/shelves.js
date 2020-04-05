import React, { Component } from 'react'
import {StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import { actions, States } from '../../store'
import { Layout, Text, Button } from '@ui-kitten/components';
import ShelvesList from '../../components/shelvesList'

class ShelvesTab extends Component {

  constructor() {
    super();
  }

  componentDidMount(){
    //Load shelves
    this.props.getShelves();
  }

  render() {

    //Props from Redux
    const { loading, error, shelves } = this.props

    return (
      <Layout>       
        <Layout style={styles.headerContainer}>
          <Button> Add Shelf </Button>
        </Layout>      
        <ShelvesList shelves={shelves} loading={loading} />
      </Layout>
    )
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: 10
  }
})

export const Shelves = connect(

  // inject states to props
  (state: States) => ({
    loading: state.shelves.isLoading,
    error: state.shelves.error,
    shelves: state.shelves.shelves
  }),
  
  // inject actions to props
  dispatch => ({
    getShelves: async () =>{ 
      await dispatch(actions.shelves.getShelves())
    }
  })

)(ShelvesTab)