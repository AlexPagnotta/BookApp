import React, { Component, Fragment } from 'react'
import {StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import { actions, States } from '../../store'
import { Layout, Text, Button } from '@ui-kitten/components'
import ShelvesList from '../../components/shelvesList'
import ShelfModal from '../../components/shelfModal'

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
    const { loading, error, shelves, removeShelf, showModal, modalShelf, modalVisible, hideModal, saveShelf } = this.props

    return (
      <Fragment>
        <Layout>       
          <Layout style={styles.headerContainer}>
            <Button onPress={() => {showModal()}}> Add Shelf </Button>
          </Layout>      
          <ShelvesList shelves={shelves} loading={loading} removeShelf={removeShelf} showModal={showModal} />
        </Layout>
        <ShelfModal shelf={modalShelf} visible={modalVisible} hideModal={hideModal} loading={loading}></ShelfModal>
      </Fragment>
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
    shelves: state.shelves.shelves,
    modalVisible: state.shelfDetail.modalVisible,
    modalShelf: state.shelfDetail.modalShelf
  }), 
  
  // inject actions to props
  dispatch => ({
    getShelves: async () =>{ 
      await dispatch(actions.shelves.getShelves())
    },
    removeShelf: async (shelfId) =>{ 
      await dispatch(actions.shelves.removeShelf(shelfId))
    },
    showModal: (shelf) =>{ 
      dispatch(actions.shelfDetail.showModal(shelf))
    },
    hideModal: () =>{ 
      dispatch(actions.shelfDetail.hideModal())
    }
  })

)(ShelvesTab)