/**
 * @author 都玉新
 * @repo http://www.lijoy.cn/
 */
'use strict';

import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  ScrollView
} from 'react-native'
import px2dp from '../util'
import NavBar from '../component/NavBar'
import Button from '../component/Button'
import EditAddress from './EditAddress'
import Icon from 'react-native-vector-icons/Ionicons'
import AirAQIInfo from '../hb/AirAQIInfo'
//FontAwesome
export default class Address extends Component {
  constructor(props){
      super(props)
      this.state = {
        address: [ ]
      }
  }
  add(){
    this.props.navigator.push({
        component: EditAddress,
        args: {
          pageType: 0,
          title: "新增地址"
        }
    })
  }
  edit(data){
    this.props.navigator.push({
        component: EditAddress,
        args: {
          pageType: 1,
          title: "修改地址",
          data
        }
    })
  }

  InfoList(){
      let aqiArr=[30,70,110,160,250,310];
      for(var i=0;i<=aqiArr.length-1;i++){
        let mAirAQIInfo = new AirAQIInfo(aqiArr[i]);
        this.state.address.push(
          mAirAQIInfo
        );
      }
  }
  AllInfo(){
    this.InfoList();
    let InfoArr=[];
    this.state.address.map((item,key)=>{
        InfoArr.push(
          <View key={key} style={{paddingHorizontal:4}}>
              <View style={{flexDirection:'row',justifyContent:'space-between',
              backgroundColor:item.GradeColor,
              marginBottom:3}}>
                <Text>空气质量指数:{item.scope}</Text>
                <Text>{item.GradeClass}</Text>
                <Text>{item.Grade}</Text>
              </View>
              <View>
                <Text>{item.JKYXQK+item.JYCQCS}</Text>
              </View>
          </View>
        )
    })
    return InfoArr
  }
  back(){
    this.props.navigation.pop()
  }
  render(){
    
    console.log(this.state.address);
    return (
      <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
        <NavBar
          title="       指数说明"
          leftIcon="ios-arrow-back"
          leftPress={this.back.bind(this)}
        />
        <ScrollView>
          {this.AllInfo()}
              {/*<Button key={i} onPress={this.edit.bind(this, item)}>
                <View style={styles.address}>
                  <View>
                    <Text style={{color: "#333", fontSize: px2dp(14)}}>{item.name+" "+item.phone}</Text>
                    <View style={styles.ads1List}>
                      <Text style={[styles.tag, {backgroundColor: item.color || "#0096ff", }]}>{item.tag}</Text>
                      <Text style={{color: "#bbb", fontSize: px2dp(13)}}>{item.address}</Text>
                    </View>
                  </View>
                  <Icon name="md-create" size={22} color="#ccc" />
                </View>
              </Button>*/}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  address: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#fbfbfb",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    paddingVertical: 8
  },
  tag: {
    color: "#fff",
    fontSize: px2dp(12),
    minWidth: px2dp(30),
    textAlign: "center",
    paddingVertical: 1,
    paddingHorizontal: 2,
    borderRadius: 5,
    marginRight: 5
  },
  ads1List: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 5
  }
})
