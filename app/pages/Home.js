/**首页
 * @author 付豪
 * @repo https://www.lijoy.cn
 */
'use strict';

import React, { Component } from 'react'
import {
  Text,
  View,
  // BackAndroid,
  ScrollView,
  StyleSheet,
  RefreshControl,
  AlertIOS,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableHighlight,
  Image,
  TextInput,
  Platform,
  TouchableWithoutFeedback,
  Dimensions,
  Animated,
  ImageBackground
} from 'react-native'
import px2dp from '../util'
import Icon from 'react-native-vector-icons/Ionicons'
import IconFont from 'react-native-vector-icons/FontAwesome'
import Swiper from 'react-native-swiper'
import SplashScreen from 'react-native-splash-screen'

import MarqueeLabel from 'react-native-lahk-marquee-label'

import {Colors, Images,CommonStyles,Constants,CommonUtil,HttpUtil,XMLParserUtil,Json, store} from '../common/'

// import LbsModal from '../component/LbsModal'
// import TabView from '../component/TabView'
import NavBar from '../component/NavBar'
// import Caqi from '../component/Caqi'
// import Button from '../component/Button'
// import Setting from './Setting'
import StationList from './StationList'
// import DetailPage from './DetailPage'

import AirPubServiceHome from '../service/AirPubServiceHome'
import AirAQIInfo from '../hb/AirAQIInfo'


const isIOS = Platform.OS == "ios"
const { width, height } = Dimensions.get('window')
const headH = px2dp(isIOS?140:120)
const topbarHeight = (Platform.OS === 'ios' ? 64 : 42)
const InputHeight = px2dp(28)

export default class HomePage extends Component {
  constructor(props){
      super(props)
      this.state = {
        // scrollY:new Animated.Value(0),
        isRefreshing: true,
        searchBtnShow: true,
        listLoading: false,
        gender: null,
        currAQI: [{
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
            }],//当前城市AQI对象，如昆明市
          allAQIHomeData:[{
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
          }],
          jycs:"",
      }
  }
  componentDidMount(){
      // SplashScreen.hide();
      // BackAndroid.addEventListener('hardwareBackPress', function () {
      //     BackAndroid.exitApp(0)
      //     return true
      // });
      this.setState({gender:0});
      
  }
  componentWillMount(){
     new AirPubServiceHome(this).fetchAQIHourData();//获取空气AQI实时数据
  }
 leftPress(){
     //new AirPubServiceHome(this).getStoreAQIInfo();
  }
  _onRefresh(){
    this.setState({isRefreshing: true});
    setTimeout(() => {
      this.setState({isRefreshing: false});
    },2000 )
  }
  //Header部分
   _renderHeader(){
      let app_name_desc='首页';//获取应用名称
      return (
        <NavBar
          title={app_name_desc}
          leftIcon="md-refresh"
          refreshing={this.state.isRefreshing}
          leftPress={this.leftPress.bind(this)}
        />
     );
  }
 
  //点击当前城市
  _onPresscity(){
    this.props.navigation.push("StationList",{
        component: StationList,
        args: {}
    })
  }
  
  //当前选中城市AQI部分
  _renderAQIHeader(){
    let datatip=Constants.datatip;//数据提示
    let AQIstyle={"fontSize":px2dp(60)}  
    this.state.jycs=this.state.allAQIHomeData.JKYXQK+this.state.allAQIHomeData.JYCQCS;
    return (
      <View style={styles.aqiheader}>
          {/**
           * 第一行
           */}
          <View style={styles.aqiheaderrow}>
              <TouchableOpacity onPress={this._onPresscity.bind(this)}>
                  <View style={styles.aqiheaderrowview}>
                    <Text style={styles.aqicityname}>{this.state.allAQIHomeData.STName}</Text>
                    <Icon style={{marginLeft:20}} name="ios-arrow-dropright-circle" size={px2dp(30)} color="#fff" />
                  </View>
                </TouchableOpacity>
          </View>
         {/**
           * 第二行
           */}
           <View style={styles.aqiheaderrowview}>
                  <Text style={styles.aqilabel}>空气质量指数/AQI</Text>
          </View>
           {/**
           * 第三行
           */}
           <View style={styles.aqiheaderrow}>
                <View style={styles.aqiheaderrowview}>
                    <Text style={AQIstyle}>{this.state.allAQIHomeData.AQI}</Text>
                    <View style={{marginLeft:50}}>
                      <Text style={styles.aqicitystatus}>{this.state.allAQIHomeData.AIRQualityStatus}</Text>
                      <Text style={styles.aqiheadertext}>{"更新于"+this.state.allAQIHomeData.Time+":00"}</Text>
                   </View>
                </View>

          </View>
          {/**
           * 第四行
           */}
          <View style={styles.aqiheaderrow}>
                <View style={styles.aqiheaderrowview}>
                    <Text style={styles.aqiheadertext}>{"首要污染物："}</Text>
                    <Text style={styles.aqiheadertext}>{this.state.allAQIHomeData.CPI}</Text>
                </View>
                 <View style={styles.aqiheaderrowview}>
                </View>
          </View>
          {/**
           * 第五行，中间轮播文字部分
           */}
          <View style={styles.texttip}>
            <View style={styles.textview}>
              <Icon style={{fontSize:px2dp(20),marginLeft:60,color:'#fff'}} name="md-bicycle"></Icon>
              {this.state.jycs?
                <MarqueeLabel
                  duration={8000}
                  speed={15}
                  text={this.state.jycs}
                  textContainerHeight={30}
                  textStyle={{ fontSize: 13, color: 'white' }}
                />:null 
              }
            </View>
          </View>
          {/**
          *第六行，下边各个因子浓度值--下标：₀ ₁ ₂ ₃ ₄ ₅ ₆ ₇ ₈ ₉ ₊ ₋ ₌ ₍ ₎
          **/}
          <View style={{flexDirection:'row',borderBottomWidth:2,borderColor:'#fff'}}>
              <View style={styles.cell}>
                <Text>PM₂.₅</Text>
                <Text style={styles.welcome}>
                  {this.state.allAQIHomeData.PM25+" μg/m3"}
                </Text>
              </View>
              <View style={styles.cell}>
                <Text>PM₁₀</Text>
                <Text style={styles.welcome}>
                  {this.state.allAQIHomeData.PM10+" μg/m3"}
                </Text>
              </View>
              <View style={styles.cell}>
                <Text>NO₂</Text>
                <Text style={styles.welcome}>
                  {this.state.allAQIHomeData.NO2+" μg/m3"}
                </Text>
              </View>
          </View>
          <View style={styles.flexContainer}>
              <View style={styles.cell}>
                <Text>SO₂</Text>
                <Text style={styles.welcome}>
                  {this.state.allAQIHomeData.SO2+" μg/m3"}
                </Text>
              </View>
              <View style={styles.cell}>
                <Text>O₃</Text>
                <Text style={styles.welcome}>
                  {this.state.allAQIHomeData.O3Hour1+" μg/m3"}
                </Text>
              </View>
              <View style={styles.cell}>
                <Text>CO</Text>
                <Text style={styles.welcome}>
                  {this.state.allAQIHomeData.CO+" mg/m3"}
                </Text>
              </View>
          </View>
      </View>
    )
  }
  render(){
    return (
        <ScrollView style={{height:Dimensions.get('window').height, backgroundColor: "#fff"}}
           onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
              )}
              scrollEventThrottle={50}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isRefreshing}
                  onRefresh={this._onRefresh.bind(this)}
                  colors={['#ddd', '#0398ff']}
                  progressBackgroundColor="#ffffff"
                />
              }
        >
          <ImageBackground style={styles.backgroundImage} source={require('../images/bg4.jpg')}>
            <View>
                  {this._renderHeader()}
              <View >
                  {this._renderAQIHeader()}
              </View>
            </View>
          </ImageBackground>  
        </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
   backgroundImage:{
    flex:1,
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height-topbarHeight,
    resizeMode:'stretch',
    backgroundColor:'rgba(0,0,0,0)',
   },
  aqicityname: {
    fontSize: px2dp(30),
    fontWeight: "bold"
  },
  aqicitystatus:{
    fontSize:px2dp(25),
  },
  aqilabel: {
    fontSize: px2dp(14),
    // fontWeight: "bold"
  },
  header: {
    backgroundColor: "#0398ff",
   // height: headH,
    height:topbarHeight,
    paddingTop: px2dp(isIOS?30:10),
    paddingHorizontal: 16
  },
  aqiheader: {
    marginTop: 2,
    paddingHorizontal: 6,
    paddingVertical: 2
  },
  texttip:{
    backgroundColor:'#1D4970',
    marginTop:60,
    marginBottom:80,
    borderRadius:5,
    justifyContent:'center',
    alignItems:'center',
  },
  textview:{
    justifyContent:'center',
    flexDirection:'row',
    alignItems:'center',
  },
  centertext:{
    color:"#fff",
  },
  flexContainer:{
    flexDirection:'row',
  },
  cell:{
    flex:1,
    height:50,
    justifyContent:'center',
    alignItems:'center',
  },
  aqiheaderrow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical:2
  },
  aqiheaderrowview: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft:10,
  },
  aqiheadertext: {
    fontSize: px2dp(12),
    //color: "#333",
    marginRight: 3
  },
 
  active: {
    borderColor: "#81c2ff",
    color: "#0096ff"
  },
  radio: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: "#666",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    fontSize: px2dp(13),
    backgroundColor: "#fff"
  },
})
