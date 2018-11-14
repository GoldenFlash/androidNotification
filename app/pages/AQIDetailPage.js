/**
 * 某个城市或测点AQI显示
 * @author 付豪
 *time:2017-7-28
 */
'use strict';

import React, { Component } from 'react'
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  Animated,
  AlertIOS,
  Platform,
  findNodeHandle,
  ToastAndroid,
  Image,
  BackAndroid,
  SplashScreen,
  TouchableOpacity,
  TouchableHighlight 
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import px2dp from '../util'
import data from '../data'
import NavBar from '../component/NavBar'
import TabViewBar from '../component/TabViewBar'
import GoodsList from '../pages/GoodsList'
import Comments from '../pages/Comments'
import SideMenu from 'react-native-side-menu'
import Menu from '../component/Menu'
import NdMenu from '../component/NdMenu'
import AirPubServiceTrend from '../service/AirPubServiceTrend'
import HChart from '../component/StationTrendChart'

const {width, height} = Dimensions.get('window')
export default class DetailPage extends Component {
  constructor(props){
    super(props)
    this.state = {
       isOpen:false,
       selectedItem:'PM2.5',
       changed:true,
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
    };
  }
  toggle(){
    // ToastAndroid.show('', ToastAndroid.SHORT);
      this.setState({
        isOpen: !this.state.isOpen,
      });
  }
  updateMenuState(isOpen){
      this.setState({isOpen : isOpen
      });
   }
  onMenuItemSelected= (item) =>{
    this.setState({
      isOpen:false,
      selectedItem:item,
    });
  }
  componentDidMount(){//组件挂载完成后
    // //  SplashScreen.hide();
    //   BackAndroid.addEventListener('hardwareBackPress', function () {
    //       BackAndroid.exitApp(0)
    //       return true
    //   });
  }
  componentWillUnmount(){

  }
  componentWillMount(){
    new AirPubServiceTrend(this).getStoreTrendAQIInfo();
  }
  back(){//返回上一层
    this.props.navigation.pop()
  }
  selectAQI(){//点击AQI按钮
      this.setState({changed:true});
      this.setState({selectedItem:'PM2.5'})
  }
  selectND(){//点击浓度按钮
      this.setState({changed:false});
      this.setState({selectedItem:'PM2.5(1小时)'})
  }
  render(){
    
    const menu = this.state.changed?<NdMenu onItemSelected = 
    {this.onMenuItemSelected}/>:<Menu onItemSelected = {this.onMenuItemSelected}/>
    return (
      <SideMenu
        menu={menu}
        isOpen ={this.state.isOpen}
        onChange={(isOpen)=>this.updateMenuState(isOpen)}
      >
        <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
          <NavBar
            title="     浓度详情"
            leftIcon="ios-arrow-back"
            leftPress={this.back.bind(this)}
            rightIcon="md-menu"
            rightPress={this.toggle.bind(this)}
          />
          <View>
            <Text>{this.state.selectedItem}</Text>
                    <View style={{flexDirection:'row',justifyContent:'center'}}>
                          <Text onPress={this.selectAQI.bind(this)} 
                          style={[this.state.changed?styles.aqibutton:styles.ndbutton,styles.border]}>AQI</Text>
                          <Text onPress={this.selectND.bind(this)} 
                          style={this.state.changed?styles.ndbutton:styles.aqibutton}>浓度</Text>  
                    </View>
                    <ScrollView
                    horizontal={true} 
                    showsHorizontalScrollIndicator ={false}
                    >
                      <HChart AQI={this.state.changed} Item={this.state.selectedItem} nav={this.props.PName}/>
                    </ScrollView>

           </View>
         </View>
       </SideMenu>
    )
  }
}
const styles = StyleSheet.create({
  aqibutton:{
    backgroundColor:'#20A0FF',
    padding:8,
    color:'#fff',
    marginTop:10,
    marginBottom:10,
    borderRadius:5,
  },
  ndbutton:{
    backgroundColor:'#50BFFF',
    padding:8,
    color:'#fff',
    marginTop:10,
    marginBottom:10,
    borderRadius:5,
  },
  border:{
    marginRight:2,
    borderRightWidth:1,
    borderColor:'#fff'
  }
})
