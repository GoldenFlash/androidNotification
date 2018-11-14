/**
 * @author 都玉新
 * @repo http://www.lijoy.cn/
 */
'use strict';

import React, { Component } from 'react'
import {View,Text } from 'react-native'
import { createStackNavigator,createBottomTabNavigator } from 'react-navigation';

// import Wrapper from './component/Wrapper'
//import Events from './util/event'

// export default class DetailsScreen extends Component {
//   render() {
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:"red"}}>
//         <Text>Details Screen</Text>
//       </View>
//     );
//   }
// }

import HomePage from './pages/Home'
// import Discover from './pages/Discover'
// import Order from './pages/Order'
// import MapV from './pages/Map'
// import Other from './pages/Other'

export default createBottomTabNavigator({
  HomePage: {
    screen:HomePage,
    navigationOptions:{
      title:"首页"
    }
  },
  // Discover: Discover,
  // Order:Order,
  // Map:MapV,
  // Other:Other
},{
  initialRouteName:"HomePage",

})

