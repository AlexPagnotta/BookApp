import React, { Component, Fragment } from 'react'
import {StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import { actions, States } from '../../store'
import { Layout, Text, Button } from '@ui-kitten/components'
import ShelvesList from '../../components/shelvesList'
import ShelfModal from '../../components/shelfModal'
import CircularButton from '../../components/circularButton';

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
        <Layout style={styles.mainContainer}>       
          <Layout style={styles.headerContainer}>
            <CircularButton 
              onPress={() => {showModal()}}        
              iconName={'plus-outline'}>     
            </CircularButton>
          </Layout>      
          <ShelvesList shelves={shelves} loading={loading} removeShelf={removeShelf} showModal={showModal} />
        </Layout>
        <ShelfModal shelf={modalShelf} visible={modalVisible} hideModal={hideModal} loading={loading} saveShelf={saveShelf}></ShelfModal>
      </Fragment>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex:1
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 72,
    marginRight: 30
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
    },
    saveShelf: async (shelf) =>{ 
      await dispatch(actions.shelfDetail.saveShelf(shelf))
    }
  })

)(ShelvesTab)