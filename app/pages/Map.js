/**地图页面
 * @author 都玉新
 * @repo http://www.lijoy.cn
 */
'use strict';

import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableHighlight,
  Dimensions
} from 'react-native'
const { width, height } = Dimensions.get('window')
import NavBar from '../component/NavBar'
import AMapView from '../component/RNAMap'
export default class Map extends Component {
  constructor(props){
      super(props)
  }
  componentDidMount(){
    
  }
  render(){
    
    return (
      <View style={{flex:1, backgroundColor: "#f3f3f3"}}>
        <NavBar title="地图"/>
        <AMapView style={{width:500,height:Dimensions.get('window').height}} />
      </View>
    )
  }
}
