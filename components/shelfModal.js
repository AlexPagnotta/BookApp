import React from 'react'
import { Layout, Modal, Button, Text} from '@ui-kitten/components';
import {StyleSheet} from 'react-native'


function ShelfModal({ shelf, visible,hideModal }) {

  
  return (
    <Modal
      backdropStyle={styles.modalBackdrop}
      onBackdropPress={hideModal}
      visible={visible}>
      <Layout
        level='3'
        style={styles.modalContainer}>
        <Text category='h4'>{shelf.name}</Text>
        <Button style={styles.modalButton} onPress={hideModal}>Close</Button>
        <Button style={styles.modalButton}>Save</Button>
      </Layout>
    </Modal>   
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 24,
    margin: 0,
    borderRadius: 5
  },
  modalBackdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalButton: {
    marginTop: 24,
    alignSelf: 'flex-end'
  }
})

export default ShelfModal;