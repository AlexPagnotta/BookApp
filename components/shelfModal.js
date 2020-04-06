import React, { Component, Fragment } from 'react'
import { Button, Modal,Input,Layout,Text, Spinner } from '@ui-kitten/components';
import {StyleSheet} from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'


function ShelfModal({ shelf, visible,hideModal, loading }) {

  //Validation Form
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .label('Name')
      .required('Name cannot be empty')
  })
  
  return (
    <Modal
      backdropStyle={styles.modalBackdrop}
      onBackdropPress={hideModal}
      visible={visible}>
      <Layout
        level='3'
        style={styles.modalContainer}>
        <Text category='h4'>{shelf.shelfId === 0 ? 'Add a Shelf' : 'Edit Shelf'}</Text>
        <Formik 
          initialValues={{ name: shelf.name}}
          onSubmit={values => { /*TODO: Save*/ }}
          validationSchema={validationSchema}>
          {({ 
            handleChange, 
            handleBlur, 
            values, 
            handleSubmit, 
            errors, 
            touched, 
            isValid }) => (
          <Fragment>
            <Layout style={styles.inputsContainer}>
              <Input style={styles.input}
                name='name'
                label='Name'
                onChangeText={handleChange('name')}
                value={values.name}
                caption={touched.name ? errors.name : ''}
                onBlur={handleBlur('name')}
                status={touched.name && errors.name ? 'danger' : ''}
              />
            </Layout>
            <Layout style={styles.buttonsContainer}>
              <Button style={styles.modalButton}
                onPress={handleSubmit}
                disabled={loading || !isValid}>
                  {loading ? 'Loading...': 'Save'}
              </Button>   
              <Button style={styles.modalButton} onPress={hideModal}>Close</Button>
            </Layout>  
          </Fragment> 
          )}
        </Formik>
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
  },
  inputsContainer: {
      flex: 3
  },
  
  buttonsContainer: {
    flex: 1,
    flexDirection: 'column-reverse'
  },
  input: {
    marginBottom: 20
  },
})

export default ShelfModal;