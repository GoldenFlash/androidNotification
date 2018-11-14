/**其它
 * @author 都玉新
 * @repo http://www.lijoy.cn
 */
'use strict';

import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
  Alert,
  AlertIOS,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  RefreshControl
} from 'react-native'
import NavBar from '../component/NavBar'
import Item from '../component/Item'
import Setting from './Setting'
import UserProfile from './UserProfile'
import Address from './Address'
import px2dp from '../util'

import Icon from 'react-native-vector-icons/Ionicons'
let {width, height} = Dimensions.get('window')

export default class Other extends Component {
  constructor(props){
      super(props)
      this.state = {
        isRefreshing: false
      }
      this.config = [
        
        {icon:"md-images", name:"空气质量指数及相关说明",onPress:this.goPage.bind(this, "address")},
        {icon:"ios-pin", name:"系统说明"},
        {icon:"ios-heart", name:"关于我们", color:"#fc7b53",onPress:this.aboutUs},
        //{icon:"logo-usd", name:" ", subName:"5元现金", color:"#fc7b53"},
        //{icon:"ios-cart", name:"积分商城", subName:"0元好物在这里", color:"#94d94a"},
        //{icon:"ios-medal", name:"饿了吗会员卡", subName:"未开通", color:"#ffc636"},
        // {icon:"md-flower", name:"帮助"},
        // {icon:"ios-outlet", name:"关于"},
        // {icon:"md-contacts", name:"加盟合作"},
      ]
  }
  aboutUs(){
    Alert.alert(
      '关于我们',
      "技术支持:\n上海丽正软件股份有限公司"
      );
  }
  goPage(key, data = {}){
    let pages = {
      "address": "Address"
    }
    if(pages[key]){
      this.props.navigation.push(pages[key],{
          component: pages[key],
          args: { data }
      })
    }
  }
  leftPress(){

  }
  componentDidMount(){
    this._onRefresh()
  }
  _onRefresh(){
    this.setState({isRefreshing: true});
    setTimeout(() => {
      this.setState({isRefreshing: false});
    }, 1500)
  }
  _renderListItem(){
    return this.config.map((item, i) => {
      if(i%3==0){
        item.first = true
      }
      return (<Item key={i} {...item}/>)
    })
  }
  render(){
    return (
      <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
        <NavBar
          title="其它"
        />
        <ScrollView
          style={styles.scrollView}
        >
          <View style={{minHeight: height - 64 - px2dp(46), paddingBottom: 100, backgroundColor: "#f3f3f3"}}>
            <View>
              {this._renderListItem()}
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  scrollView: {
    marginBottom: px2dp(46),
    backgroundColor: "#0398ff"
  },
})
