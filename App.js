import React from 'react'
import { Provider } from 'react-redux'
import { Home } from './screens'
import { createStore } from './store'
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';


const store = createStore()

const App = () => {
  return (
    <Provider store={store}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <Home/>
      </ApplicationProvider>
    </Provider>
  )
}

export default App