import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from './store'
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Login, BookDetail, Search } from './screens';
import { navigationRef } from './rootNavigation/rootNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const store = createStore()

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>     
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider mapping={mapping} theme={lightTheme}>
          <SafeAreaProvider>
            <NavigationContainer ref={navigationRef}>
              <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="BookDetail" component={BookDetail} />
                <Stack.Screen name="Search" component={Search} />
              </Stack.Navigator>
            </NavigationContainer>    
          </SafeAreaProvider> 
        </ApplicationProvider>
    </Provider>
  )
}

export default App