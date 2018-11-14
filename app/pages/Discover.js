
import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet
} from 'react-native'
import NavBar from '../component/NavBar'
// import MyWebView from '../component/MyWebView'
import Trend from '../component/TrendChart'
// import AirPubServiceCity from '../service/AirPubServiceCity'

export default class Discover extends Component {
  constructor(props){
      super(props)
      this.state = {
        //scrollY: new Animated.Value(0),
        allAQIData: [{
              STCode: "", // STCode
              STName: "", // STName
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
        aqi:[2, 4, 7, 2, 2, 7, 13, 16],
        cityname:['1月','2月','3月','4月','5月','6月','7月','8月']
      }
  }
  componentDidMount(){
      // SplashScreen.hide();
      // BackAndroid.addEventListener('hardwareBackPress', function () {
      //     BackAndroid.exitApp(0)
      //     return true
      // });
      // this.setState({gender:0});
      
      // new AirPubServiceCity(this).getCurrCityFromStore();
  }
  render(){
    // console.log("aaaaaaa",this)
    return (
      <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
        {/* <Text>123</Text> */}
        <NavBar title="趋势"/>
        <Trend />
      </View>
    )
  }
}

