import React, {useState} from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { navigationRef } from './rootNavigation/rootNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigatorHome } from './screens';
import { default as lightTheme } from './themes/light-theme.json';
import { default as mapping } from './mapping.json'; 
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

const loadFonts = () => {
  return Font.loadAsync({
    'Montserrat-Medium': require('./assets/Montserrat-Medium.ttf')
  });
};

//React Navigation themes, defines app background color
const ReactNavigationLightTheme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF'
  },
};

const ReactNavigationDarkTheme = {
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    background: '#303030'
  },
};


const App = () => {

  const[fontsLoaded, setFontsLoaded] = useState(false);

  if(!fontsLoaded){
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={()=>setFontsLoaded(true)}
      />
    );
  }

  return (
    <Provider store={store}>     
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider 
        {...eva} 
        theme={{ ...eva.light,  ...lightTheme}}
        customMapping={mapping}>
          <SafeAreaProvider>
            <NavigationContainer ref={navigationRef} theme={ReactNavigationLightTheme}>
              <NavigatorHome></NavigatorHome>
            </NavigationContainer>    
          </SafeAreaProvider> 
        </ApplicationProvider>
    </Provider>
  )
}

export default App
