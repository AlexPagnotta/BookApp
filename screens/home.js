import React, { Component } from 'react'
import {StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import { actions, States } from '../store'
import { Icon, Tab, Layout, Text,Button, BottomNavigation } from '@ui-kitten/components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Books, Shelves } from './tabs';
import axios from 'axios';
import CircularButton from '../components/circularButton';

class HomeScreen extends Component {

  constructor() {
    super();
  }

  componentDidMount() {

  }

  render() {

    const { executeLogout, name, lastName, navigation } = this.props
    
    const SettingsScreen = () => (
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
        <Text category='h1'>Settings</Text>
      </Layout>
    );

    const BookIcon = (style) => (
      <Icon {...style} name='book-open-outline'/>
    );
    
    const ShelfIcon = (style) => (
      <Icon {...style} name='bookmark-outline'/>
    );
    
    const SettingIcon = (style) => (
      <Icon {...style} name='settings-outline'/>
    );

  

    //Bottom Tab Bar methods

    const BottomTab = createBottomTabNavigator();

    const BottomTabBar = ({ state }) => {

      const onTabSelect = (index) => {
        navigation.navigate(state.routeNames[index]);
      };
    
      return (
        
          <BottomNavigation selectedIndex={state.index} onSelect={onTabSelect}>
            <Tab icon={BookIcon} />
            <Tab icon={ShelfIcon} />
            <Tab icon={SettingIcon} />
          </BottomNavigation>

      );
    };


    return (
        <SafeAreaView style={styles.container}>
          <Layout style={styles.statusBar}>
            <Text category='h5'>BookApp</Text>
            <Layout style={styles.buttonsContainer}>
              <CircularButton  style={styles.statusBarButton}
                customStyle={styles.statusBarButton}
                onPress={() => navigation.navigate("Search")}        
                iconName={'search-outline'}>     
              </CircularButton>
              <CircularButton  
                customStyle={styles.statusBarButton}
                onPress={() => executeLogout()}        
                iconName={'person-outline'}>     
              </CircularButton>
            </Layout>
          </Layout>
          <BottomTab.Navigator tabBar={props => <BottomTabBar {...props} />}>
            <BottomTab.Screen name='Books' component={Books}/>
            <BottomTab.Screen name='Shelves' component={Shelves}/>
            <BottomTab.Screen name='Settings' component={SettingsScreen}/>
          </BottomTab.Navigator>
        </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  statusBar: {
    height: 72,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 30,
    paddingLeft: 30
  },
  buttonsContainer:{
    display: 'flex',
    flexDirection:'row'
  },
  statusBarButton:{
    marginLeft: 20
  },
  homeContainer: {
    flex: 1,
    padding: 10
  }
})

export const Home = connect(

  // inject states to props
  (state: States) => ({
    name: state.authentication.name,
    lastName: state.authentication.lastName
  }),
  
  // inject actions to props
  dispatch => ({
    executeLogout: () =>{ 
      dispatch(actions.authentication.logout())
    }
  })
)(HomeScreen)