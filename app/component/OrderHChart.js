import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Animated,
  Platform

} from 'react-native';

import ChartView  from 'react-native-highcharts';
import Dimensions from 'Dimensions';
import store from '../common/Store'
import CommonUtil from '../common/CommonUtil'
import Json from '../common/JSONUtil'
import AirAQIInfo from '../hb/AirAQIInfo'
import px2dp from '../util'
import AirPubService from '../service/AirPubService'
const {width,height} = Dimensions.get('window');
export default class OrderHChart extends Component {

  constructor(props) {
      super(props);
      this.state = {
        scrollY: new Animated.Value(0),
        allAQIData: [{
              STCode: "", // STCode
              STName: "", // STName
              PName:'',
              PCode:'',
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
        new AirPubService(this).getStoreAQIInfo();
    }
     //从缓存中获取当前所有城市AQI信息
    _getFromStoreAQIInfo() {
        var _self = this;
        //获取所有城市AQI
        store.get("allAQIData").then((value) => {
            if (value == null) {
                console.log("获取AQI数据失败")
                return true;
            }
            var JsonSort = new Json();
            value = JsonSort.JsonSort(JSON.parse(value),'AQI',false);
            _self.setState({ allAQIData: value });

            _self.state.cityname.splice(0,_self.state.cityname.length);
            _self.state.aqi.splice(0,_self.state.aqi.length);
            _self.state.allAQIData.map((item) =>{
                let cityName=item.PName;
                let pAQI=item.AQI;
                
                _self.state.cityname.push(cityName);

                if(CommonUtil.isNumeric(pAQI))
                {
                  // _self.state.aqi.push(parseInt(pAQI));
                     //设置AQI相关信息
                    var pAirAQIInfo = new AirAQIInfo(pAQI);
                  _self.state.aqi.push({y:parseInt(pAQI),
                                        color:pAirAQIInfo.GradeColor});
                }else{
                   _self.state.aqi.push(0);
                }
            })
        }).catch((error) => { console.log(error) });

    }
 
  render() {
     this._getFromStoreAQIInfo();//从缓存中获取当前所有城市AQI信息

     var Highcharts='Highcharts';
     var chartHeight=this.height-20;
     var conf={
            chart: {
                type: 'column',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                marginBottom: 100,
                events: {
                    load: function () {

                        // set up the updating of the chart each second
                        // var series = this.series[0];
                        // setInterval(function () {
                        //     var x = (new Date()).getTime(), // current time
                        //         y = Math.random();
                        //     series.addPoint([x, y], true, true);
                        // }, 1000);
                    }
                }
            },
            title: {
                text: ''
            },
            xAxis: {
                type: 'string',
                categories:this.state.cityname,
                labels: {
                   rotation: -45,
                   style: {
                     fontSize: '10px',
                     fontFamily: 'Verdana, sans-serif'
                   }
                 },
                 max:12
            },
            yAxis: {
                title: {
                    text: 'AQI'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            scrollbar: {
               enabled: true
          },
          credits: {
            	text: ' ',
            	href: ' '//hightcharts去掉右下角的水印
        	},
            tooltip: {
                formatter: function () {
                    return '<b>' + this.x + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 0);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'AQI',
                data:this.state.aqi
            }]
        };
    return (
        <View style={styles.container}>
            <ChartView style={{height:500}} config={conf}></ChartView>
        </View>
        );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:"flex-end",
    backgroundColor:"#FFF"
  },
  scrollView: {
    // marginBottom: px2dp(46)
  },
  titleView:{
    height:Platform.OS=='ios'?64:44,
    paddingTop:Platform.OS=='ios'?14:0,
    backgroundColor:'#ff6400',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title:{
    color:'white',
    fontSize:20,
    textAlign:'center',
  },
});