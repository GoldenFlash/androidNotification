/**城市排序
 * @author 都玉新
 * @repo http://www.lijoy.cn/
 */
'use strict';

import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Animated,
  RefreshControl
} from 'react-native'
import NavBar from '../component/NavBar'

import TakeOut from './TakeOut'
import Breakfast from './Breakfast'
import TabViewBar from '../component/TabViewBar'
import HChart from '../component/OrderHChart'
// import ScrollableTabView from 'react-native-scrollable-tab-view'
import px2dp from '../util'
export default class Order extends Component {
  constructor(props){
      super(props)
       this.state = {
        isRefreshing: false
      }
  }

  _onRefresh(){
    this.setState({isRefreshing: true});
    setTimeout(() => {
      this.setState({isRefreshing: false});
    }, 1500)
  }
  render(){
    return (
      <View style={{flex: 1, backgroundColor: "#FFF"}}>
        <NavBar title="排序"/>
        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh.bind(this)}
              tintColor="#fff"
              colors={['#ddd', '#0398ff']}
              progressBackgroundColor="#ffffff"
            />
          }
        >
           <View style={{flex:1,backgroundColor:"red",justifyContent:"flex-end",}}>
            <HChart/>
           </View>
        </ScrollView>
 
      </View>
    )
  }
}
const styles = StyleSheet.create({
  scrollView: {
    flex:1,
    


    // marginBottom: px2dp(46),

  },
})
