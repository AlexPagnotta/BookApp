import React, { Component } from 'react'
import {StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import { actions, States } from '../store'
import { Icon, Tab, Layout, Text,Button, BottomNavigation } from '@ui-kitten/components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Books, Shelves } from './tabs';
import axios from 'axios';

class HomeScreen extends Component {

  constructor() {
    super();
  }

  componentDidMount() {

    //Get the token 
    this.props.getAuthToken().then(() => {

      //If token is not present go to login
      if(this.props.authToken == null || this.props.authToken === ''){
        this.props.navigation.replace('Login');
      }
    })

  }

  render() {

    const { executeLogout, name, lastName, authToken, navigation } = this.props

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
            <Text category='h4'>BookApp</Text>
            <Button
              onPress={() => navigation.navigate("Search")}>
              Search
            </Button>
            <Button
              onPress={() => executeLogout()}>
              Logout
            </Button>
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
    flex: 1,
  },
  statusBar: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10
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
    lastName: state.authentication.lastName,
    authToken: state.authentication.authToken
  }),
  
  // inject actions to props
  dispatch => ({
    executeLogout: () =>{ 
      dispatch(actions.authentication.logout())
    },
    getAuthToken: () => dispatch(actions.authentication.getAuthToken())
  })
)(HomeScreen)