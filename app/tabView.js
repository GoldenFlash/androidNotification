
import React, { Component } from 'react'
import {View,Text } from 'react-native'
import { createStackNavigator,createBottomTabNavigator } from 'react-navigation';
import Icons from 'react-native-vector-icons/Ionicons'

import HomePage from './pages/Home'
import Discover from './pages/Discover'
import Order from './pages/Order'
import MapV from './pages/Map'
import Other from './pages/Other'

var tabItems =  {
    HomePage: {name:"趋势", icon:"ios-trending-up-outline"},
    Discover:{name:"排序", icon:"ios-list-box-outline"},
    Order:{name:"首页", icon:"logo-google"},
    MapV:{name:"地图", icon:"ios-globe-outline"},
    Other:{name:"其它", icon:"ios-contact-outline"},
}
export default createBottomTabNavigator({
    Discover: {
        screen:Discover,
        navigationOptions:{
          title:"趋势"
        }
    },
    Order: {
        screen:Order,
        navigationOptions:{
          title:"排序"
        }
    },
    HomePage: {
        screen:HomePage,
        navigationOptions:{
            title:"首页"
        }
    },
    MapV: {
        screen:MapV,
        navigationOptions:{
            title:"地图"
        }
    },
      Other: {
        screen:Other,
        navigationOptions:{
          title:"其他"
        }
      },
},{
    initialRouteName:"HomePage",
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName = tabItems[routeName].icon
        return <Icons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#3496f0',
      inactiveTintColor: 'gray',
    },
  

})

