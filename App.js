import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from './store'
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './rootNavigation/rootNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigatorHome } from './screens';

const store = createStore()

const App = () => {
  return (
    <Provider store={store}>     
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider mapping={mapping} theme={lightTheme}>
          <SafeAreaProvider>
            <NavigationContainer ref={navigationRef}>
              <NavigatorHome></NavigatorHome>
            </NavigationContainer>    
          </SafeAreaProvider> 
        </ApplicationProvider>
    </Provider>
  )
}

export default App