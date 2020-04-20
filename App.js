import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './rootNavigation/rootNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigatorHome } from './screens';
import { default as lightTheme } from './themes/light-theme.json';
import { default as mapping } from './mapping.json'; 

const App = () => {
  return (
    <Provider store={store}>     
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider 
        {...eva} 
        theme={{ ...eva.light,  ...lightTheme}}
        customMapping={mapping}>
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
