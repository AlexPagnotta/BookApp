import React from 'react'
import { Provider } from 'react-redux'
import { Home } from './screens'
import { createStore } from './store'
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';

const store = createStore()

const App = () => {
  return (
    <Provider store={store}>
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <Home/>
      </ApplicationProvider>
    </Provider>
  )
}

export default App