/**城市或点位实时AQI
 * @author 都玉新
 * @repo http://www.lijoy.cn
 */
'use strict';

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  TouchableNativeFeedback,
  Dimensions
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import px2dp from '../util'
import Button from './Button'
import AirAQIInfo from '../hb/AirAQIInfo'
import AQIDetailPage from '../pages/AQIDetailPage'
export default class Caqi extends Component {
  constructor(props){
      super(props)
  }
//  static propTypes = {
//     STCode: PropTypes.string.isRequired, // STCode
//     STName: PropTypes.string.isRequired, // STName
//     PName:PropTypes.string,
//     PCode:PropTypes.string,
//     Time: PropTypes.string,
//     CPI: PropTypes.string, //首要污染物
//     PLevel: PropTypes.string, //级别
//     AIRQualityStatus: PropTypes.string, // 空气质量
//     SO2: PropTypes.string, // SO2浓度
//     CO: PropTypes.string, // CO浓度
//     O3Hour1: PropTypes.string, // O3Hour1浓度
//     O3Hour8: PropTypes.string, // O3Hour8浓度
//     NO2: PropTypes.string, // NO2浓度
//     PM10: PropTypes.string, // PM10浓度
//     PM25: PropTypes.string, //PM25浓度
//     PM10_24: PropTypes.string, // PM10_24浓度
//     PM25_24: PropTypes.string, //PM25_24浓度
//     SO2AQI: PropTypes.string, //SO2AQI
//     COAQI: PropTypes.string, //COAQI
//     PM10AQI: PropTypes.string, //PM10AQI
//     PM10AQI_24: PropTypes.string, //PM10AQI_24
//     NO2AQI: PropTypes.string, //NO2AQI
//     O3Hour1AQI: PropTypes.string, //O3Hour1AQI
//     O3Hour8AQI: PropTypes.string, //O3Hour8AQI
//     PM25AQI: PropTypes.string, //PM25AQI
//     PM25AQI_24: PropTypes.string, //PM25AQI_24
//     AQI: PropTypes.string, //AQI
//     AQIDay: PropTypes.string, //AQIDay
//   }
  render(){
   const {PCode, PName, Time, CPI, PLevel, AIRQualityStatus, SO2, CO, O3Hour1, O3Hour8, NO2, PM10, PM25, PM10_24, PM25_24, SO2AQI,
          COAQI,PM10AQI,PM10AQI_24,NO2AQI,O3Hour1AQI,O3Hour8AQI,PM25AQI,PM25AQI_24,AQI,AQIDay
        } = this.props
    const{navigator} = this.props;
     //设置AQI相关信息
    let pAirAQIInfo=new AirAQIInfo(AQI);
    let AQICitystyle={
       fontSize:px2dp(15),
       textAlign: "center",
       width:70,
       "backgroundColor":  pAirAQIInfo.GradeColor=="" ? "#00FF00" : pAirAQIInfo.GradeColor
    };
    let itemtable={
        fontSize: px2dp(11), 
        color: "#666", 
        width:(Dimensions.get('window').width-20)/6
      };

    return (
      <Button onPress={() => {
        this.props.nav.navigation.push("AQIDetailPage",{
            component: AQIDetailPage,
            args:{PName:PName}
        })
      }
      }>
        <View style={styles.bzWrap}>
          <View style={styles.border}>
            <View style={[styles.bzContent,{flexDirection:'row',justifyContent:'space-between'}]}>
                    <View style={{flexDirection:'column',width:200}}>
                      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                          <Text>{PName}</Text>
                          <Text style={AQICitystyle}>{AIRQualityStatus}</Text>
                      </View>
                      <View style={{flexDirection:'row'}}>
                          <Text style={{fontSize: px2dp(11), color: "#666"}}>首要污染物：{CPI}</Text>
                      </View>
                    </View>
                    <View style={{flexDirection:'column'}}>
                        <Text style={{fontSize: px2dp(35),color: "#666"}}>{AQI}</Text>
                    </View>
                 </View>
               
          </View>
          <View style={styles.itemtablebox}>
                    <View style={[styles.itemheader, {marginTop: 1}]}>
                      <View style={{flexDirection: "row", flex: 1}}>
                          <View style={{flexDirection:'column'}}>
                            <Text style={[itemtable,{textAlign:"center"}]}>PM2.5</Text>
                            <Text style={[itemtable,{textAlign:"center"}]}>{PM25AQI}</Text>
                          </View>
                          <View style={{flexDirection:'column'}}>
                            <Text style={[itemtable,{textAlign:"center"}]}>PM10</Text>
                            <Text style={[itemtable,{textAlign:"center"}]}>{PM10AQI}</Text>
                          </View>
                          <View style={{flexDirection:'column'}}>
                            <Text style={[itemtable,{textAlign:"center"}]}>CO</Text>
                            <Text style={[itemtable,{textAlign:"center"}]}>{COAQI}</Text>
                          </View>
                          <View style={{flexDirection:'column'}}>
                            <Text style={[itemtable,{textAlign:"center"}]}>SO2</Text>
                            <Text style={[itemtable,{textAlign:"center"}]}>{SO2AQI}</Text>
                          </View>
                          <View style={{flexDirection:'column'}}>
                            <Text style={[itemtable,{textAlign:"center"}]}>NO2</Text>
                            <Text style={[itemtable,{textAlign:"center"}]}>{NO2AQI}</Text>
                          </View>
                          <View style={{flexDirection:'column'}}>
                            <Text style={[itemtable,{textAlign:"center"}]}>O3</Text>
                            <Text style={[itemtable,{textAlign:"center"}]}>{O3Hour1AQI}</Text>
                          </View>
                      </View>
                  </View>
                </View>
        </View>
      </Button>
    )
  }
}


const styles = StyleSheet.create({
  bzWrap: {
    backgroundColor: "#fff",
    paddingLeft: 10,
    paddingRight: 10,
  },
  border: {
    flexDirection: "row",
    paddingTop: 9,
    paddingBottom: 9,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5"
  },
  bzBox: {
    flexDirection: "row",
    paddingVertical: 10,
    
    borderTopWidth: 1,
    borderTopColor: "#f9f9f9"
  },
  bzLogo: {
    resizeMode: "contain",
    borderWidth: 1,
    borderColor: "#f9f9f9",
    width: px2dp(60),
    height: px2dp(60),
    backgroundColor: "#ffdc37"
  },
  bzContent: {
    marginLeft: 6,
    marginRight: 10,
    flex: 1
  },

  between: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center"
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 3
  },
  brand: {
    fontSize: 12,
    color: "#52250a",
    paddingHorizontal: 3,
    paddingVertical: 2,
    backgroundColor: "#ffdc37"
  },
  label: {
    fontSize: 10,
    color: "#999",
    borderWidth: 1,
    borderColor: "#eee",
    textAlign: "center",
    paddingHorizontal: 1,
    paddingVertical: 1,
    borderRadius: 3
  },
  label1: {
    fontSize: 10,
    color: "#00abff",
    borderWidth: 1,
    borderColor: "#00abff",
    textAlign: "center",
    paddingHorizontal: 1,
    paddingVertical: 1,
    borderRadius: 3
  },
  label2: {
    fontSize: 10,
    color: "#fff",
    backgroundColor: "#00abff",
    textAlign: "center",
    paddingHorizontal: 2,
    paddingVertical: 1,
  },
  line: {
    fontSize: px2dp(11),
    color: "#999",
    paddingHorizontal: 3
  },
  infoText: {
    fontSize: px2dp(11),
    color: "#666"
  },
  actives: {
    paddingTop: 4,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#f9f9f9"
  },
  itemheader: {
    backgroundColor: "#A1C7F4"
  },
  itemtablebox: {
    paddingVertical: 1,
    paddingRight: 5,
    borderTopWidth: 1,
    borderTopColor: "#fefefe"
  },
})
