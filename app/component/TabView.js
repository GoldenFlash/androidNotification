/**TabView
 * @author 都玉新
 * @repo http://www.lijoy.cn
 */
'use strict';

import React, { Component } from 'react'
import {
  Text,
  Dimensions,
  StyleSheet,
  Animated,
  Image
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import TabNavigator from 'react-native-tab-navigator'
import px2dp from '../util'
let {width, height} = Dimensions.get('window')
import HomePage from '../pages/Home'
import Discover from '../pages/Discover'
import Order from '../pages/Order'
import Map from '../pages/Map'
import Other from '../pages/Other'

export default class TabView extends Component {
  constructor(props){
    super(props)
    this.state = {
        currentTab: 'HomePage',
        hideTabBar: false
    }
    this.tabNames = [
      ["趋势", "ios-trending-up-outline", "Discover", <Discover {...this.props}/>],
      ["排序", "ios-list-box-outline", "Order", <Order {...this.props}/>],
      ["首页", "logo-google", "HomePage", <HomePage {...this.props}/>],
      ["地图", "ios-globe-outline", "Map", <Map {...this.props}/>],
      ["其它", "ios-contact-outline", "Other", <Other {...this.props}/>]
    ]
    TabView.hideTabBar = TabView.hideTabBar.bind(this)
    TabView.showTabBar = TabView.showTabBar.bind(this)
  }
  static showTabBar(time){
    this.setState({hideTabBar: false})
  }
  static hideTabBar(time){
    this.setState({hideTabBar: true})
  }
  render(){
    return (
      <TabNavigator
        hidesTabTouch={true}
        tabBarStyle={[styles.tabbar,
          (this.state.hideTabBar?styles.hide:{})
        ]}
        sceneStyle={{ paddingBottom: styles.tabbar.height }}>
          {
            this.tabNames.map((item, i) => {
              return (
                <TabNavigator.Item
                    key={i}
                    tabStyle={styles.tabStyle}
                    title={item[0]}
                    selected={this.state.currentTab === item[2]}
                    selectedTitleStyle={{color: "#3496f0"}}
                    renderIcon={() => <Icon name={item[1]} size={px2dp(22)} color="#666" />}
                    renderSelectedIcon={() => <Icon name={item[1].replace(/\-outline$/, "")} size={px2dp(22)} color="#3496f0" />}
                    onPress={() => this.setState({ currentTab: item[2] })}>
                    {item[3]}
                </TabNavigator.Item>
              )
            })
          }
      </TabNavigator>
    )
  }
}

const styles = StyleSheet.create({
    tabbar: {
      height: px2dp(46),
      alignItems:'center',
      justifyContent: 'center',
      backgroundColor: '#fff'
    },
    hide: {
      transform: [
        {translateX:width}
      ]
    },
    tabStyle:{
      padding: px2dp(4)
    }
})
