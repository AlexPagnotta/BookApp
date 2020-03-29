import React, { Component } from 'react'
import {StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import { actions, States } from '../store'
import { Icon, Tab, Layout, Text,Button, BottomNavigation } from '@ui-kitten/components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Books } from './tabs';
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
      //Set token in axios
      else{
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.props.authToken}`;
      }

    })

  }

  render() {

    const { executeLogout, name, lastName, authToken, navigation } = this.props

    /*TODO: Move in separate file*/
    const ShelvesScreen = () => (
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text category='h1'>Shelves</Text>
      </Layout>
    );

    const SettingsScreen = () => (
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
        <SafeAreaView>
          <BottomNavigation selectedIndex={state.index} onSelect={onTabSelect}>
            <Tab icon={BookIcon} />
            <Tab icon={ShelfIcon} />
            <Tab icon={SettingIcon} />
          </BottomNavigation>
        </SafeAreaView>
      );
    };
    
    
    return (
      <Layout style={styles.container}>
        <Layout style={styles.statusBar}>
          <Text category='h4'>BookApp</Text>
          <Button
            onPress={() => executeLogout()}>
            Logout
          </Button>
        </Layout>
        <BottomTab.Navigator tabBar={props => <BottomTabBar {...props} />}>
          <BottomTab.Screen name='Books' component={Books}/>
          <BottomTab.Screen name='Shelves' component={ShelvesScreen}/>
          <BottomTab.Screen name='Settings' component={SettingsScreen}/>
        </BottomTab.Navigator>
      </Layout>
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
    backgroundColor: 'red',
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