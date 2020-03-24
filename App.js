import React from 'react'
import { Provider } from 'react-redux'

import { Home } from './screens'
import { createStore } from './store'

const store = createStore()

const App = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  )
}

export default App