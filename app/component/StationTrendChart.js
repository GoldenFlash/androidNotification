import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Animated,
  Platform,
  document
} from 'react-native';

import ChartView  from 'react-native-highcharts';
import Dimensions from 'Dimensions';
import store from '../common/Store'
import CommonUtil from '../common/CommonUtil'
import AirAQIInfo from '../hb/AirAQIInfo'
import px2dp from '../util'

const {width,height} = Dimensions.get('window');
export default class AllOrderHChart extends Component {

  constructor(props) {
      super(props);
      this.state = {
        scrollY: new Animated.Value(0),
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
  
     //从缓存中获取当前所有城市AQI信息
    _getFromStoreAQIInfo() {
        var _self = this;
        //获取所有城市AQI
        store.get("allHourAQIData").then((value) => {
            if (value == null) {
                console.log("111")
                return true;
            }
            _self.setState({ allAQIData: JSON.parse(value) });
            _self.state.cityname.splice(0,_self.state.cityname.length);
            _self.state.aqi.splice(0,_self.state.aqi.length);
            
            _self.state.allAQIData.map((item) =>{
                if(item.PName == this.props.nav){
                    if(this.props.Item == 'PM2.5'){//判断选取的因子是什么
                        _self.state.cityname.push(item.Time+'时');
                        _self.state.aqi.push(parseInt(item.PM25AQI));
                    }else if(this.props.Item == 'PM10'){
                        _self.state.cityname.push(item.Time+'时');
                        _self.state.aqi.push(parseInt(item.PM10AQI));
                    }else if(this.props.Item == 'O₃'){
                        _self.state.cityname.push(item.Time+'时');
                        _self.state.aqi.push(parseInt(item.O3Hour1AQI));
                    }else if(this.props.Item == 'NO₂'){
                        _self.state.cityname.push(item.Time+'时');
                        _self.state.aqi.push(parseInt(item.NO2AQI));
                    }else if(this.props.Item == 'SO₂'){
                        _self.state.cityname.push(item.Time+'时');
                        _self.state.aqi.push(parseInt(item.SO2AQI));
                    }else if(this.props.Item == 'CO'){
                        _self.state.cityname.push(item.Time+'时');
                        _self.state.aqi.push(parseInt(item.COAQI));
                    }else if(this.props.Item == 'PM2.5(1小时)'){//浓度
                        _self.state.cityname.push(item.Time+'时');
                        _self.state.aqi.push(parseInt(item.PM25));
                    }else if(this.props.Item == 'PM2.5(24小时)'){
                        _self.state.cityname.push(item.Time+'时');
                        _self.state.aqi.push(parseInt(item.PM25_24));
                    }else if(this.props.Item == 'PM10(1小时)'){
                        _self.state.cityname.push(item.Time+'时');
                        _self.state.aqi.push(parseInt(item.PM10));
                    }else if(this.props.Item == 'PM10(24小时)'){
                        _self.state.cityname.push(item.Time+'时');
                        _self.state.aqi.push(parseInt(item.PM10_24));
                    }else if(this.props.Item == 'O₃(1小时)'){
                        _self.state.cityname.push(item.Time+'时');
                        _self.state.aqi.push(parseInt(item.O3Hour1));
                    }else if(this.props.Item == 'O₃(8小时)'){
                        _self.state.cityname.push(item.Time+'时');
                        _self.state.aqi.push(parseInt(item.O3Hour8));
                    }else if(this.props.Item == 'NO₂(1小时)'){
                        _self.state.cityname.push(item.Time+'时');
                        _self.state.aqi.push(parseInt(item.NO2));
                    }else if(this.props.Item == 'SO₂(1小时)'){
                        _self.state.cityname.push(item.Time+'时');
                        _self.state.aqi.push(parseInt(item.SO2));
                    }else if(this.props.Item == 'CO(1小时)'){
                        _self.state.cityname.push(item.Time+'时');
                        _self.state.aqi.push(parseInt(item.CO));
                    }
                }
            })
        }).catch((error) => { console.log(error) });
    }
    drawLine(){
     var Highcharts='Highcharts';
     var chartHeight=this.height-20;
     var conf={
            chart: {
                type: 'line',
                //animation: Highcharts.svg, // don't animate in old IE
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
            credits: {
            	text: ' ',
            	href: ' '//hightcharts去掉右下角的水印
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
            },
            yAxis: {
                title: {
                    text: this.props.AQI?'AQI':'浓度'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            scrollbar: {
               enabled: false
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
        return conf
    }
  render() {
     this._getFromStoreAQIInfo();//从缓存中获取当前所有城市AQI信息
     let conf=this.drawLine();
     return (
        <View >
            <ChartView style={{height:height/2,width:500}} config={conf}></ChartView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  scrollView: {
    marginBottom: px2dp(46)
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