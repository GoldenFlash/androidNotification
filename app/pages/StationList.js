/**
 * @author 付豪
 * @repo http://www.lijoy.cn/
 * 测点信息列表
 * 
 */
'use strict';

import React, { Component } from 'react'
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Animated,
  RefreshControl,
  ActivityIndicator,
  BackAndroid,
  Dimensions
} from 'react-native'
import NavBar from '../component/NavBar'
import Item from '../component/Item'
import Caqi from '../component/Caqi'
import AirPubService from '../service/AirPubService'
import AirAQIInfo from '../hb/AirAQIInfo'
import px2dp from '../util'
import SplashScreen from 'react-native-splash-screen'
import AQIDetailPage from './AQIDetailPage'
const { width, height } = Dimensions.get('window')
//FontAwesome
export default class StationList extends Component {
  constructor(props){
      super(props)
      this.state = {
          timeid:null,
          scrollY: new Animated.Value(0),
          isRefreshing: true,
          allAQIData: [{
              STCode: "", // STCode
              STName: "", // STName
              PName:"",
              PCode:"",
              Time: "",
              CPI: "", //首要污染物
              PLevel: "", //级别
              AIRQualityStatus: "", // 空气质量
              SO2: "", // SO2浓度
              CO: "", // CO浓度
              O3Hour1: "", // O3Hour1浓度
              O3Hour8: "", // O3Hour8浓度
              NO2: "", // NO2浓度
              PM10: "", // PM10浓度
              PM25: "", //PM25浓度
              PM10_24: "", // PM10_24浓度
              PM25_24: "", //PM25_24浓度
              SO2AQI: "", //SO2AQI
              COAQI:"", //COAQI
              PM10AQI: "", //PM10AQI
              PM10AQI_24: "", //PM10AQI_24
              NO2AQI: "", //NO2AQI
              O3Hour1AQI: "", //O3Hour1AQI
              O3Hour8AQI: "", //O3Hour8AQI
              PM25AQI: "", //PM25AQI
              PM25AQI_24: "", //PM25AQI_24
              AQI: "", //AQI
              AQIDay: "", //AQIDay
            }],//所有城市实时AQI信息
      }
  }
  componentWillMount(){
      new AirPubService(this).getStoreAQIInfo();//获取空气AQI实时数据
  }
  back(){
    this.props.navigation.pop()
  }
  _onRefresh(){
    this.setState({isRefreshing: true});
    setTimeout(() => {
      this.setState({isRefreshing: false});
    },2000 )
  }
  _renderCaqi(){
    return this.state.allAQIData.map((item, i) => {
      return (<Caqi nav={this.props} {...item} key={i}/>)
    })
  }
  render(){
    return (
      <View style={{height:Dimensions.get('window').height ,backgroundColor: "#f3f3f3"}}>
        <NavBar
          title="      测点详情"
          leftIcon="ios-arrow-back"
          leftPress={this.back.bind(this)}
        />
        <ScrollView
          style={styles.scrollView}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
              )}
              scrollEventThrottle={16}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isRefreshing}
                  onRefresh={this._onRefresh.bind(this)}
                  colors={['#ddd', '#0398ff']}
                  progressBackgroundColor="#ffffff"
                />
              }
          >
            <View style={styles.aqiitemlist}>
                {this._renderCaqi()}
            </View>
        </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
    scrollView: {
    flex:1,
    marginBottom: px2dp(46)
  },aqiitemlist:{
    
  }

})
