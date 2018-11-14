/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */


import React, { Component } from 'react';
import { TextInput, StyleSheet, Text, View, TouchableOpacity, Alert ,StatusBar} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import BackgroundJob from 'react-native-background-job';
import SplashScreen from 'react-native-splash-screen'

import NotifService from './NotifService';
import appConfig from './app.json';
import TabView from './app/tabView'
import stationList from './app/pages/StationList'
import AQIDetailPage from './app/pages/AQIDetailPage'
import Address from './app/pages/Address'

// import AirAQIInfo from './app/hb/AirAQIInfo'

import api from './app/api/api'
// BackgroundJob.schedule(backgroundSchedule);

const RootStack = createStackNavigator({
  TabView: {
    screen: TabView,
    navigationOptions: {
      header: null
    }
  },
  StationList: {
    screen: stationList,
    navigationOptions: {
      header: null
    }
  },
  AQIDetailPage: {
    screen: AQIDetailPage,
    navigationOptions: {
      header: null
    }
  },
  Address: {
    screen: Address,
    navigationOptions: {
      header: null
    }
  }
},
  {
    initialRouteName: 'TabView',
  });


type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props);
    this.notif = new NotifService(this.onRegister.bind(this), this.onNotif.bind(this));
    this.state = {
      senderId: appConfig.senderID
    };

  }
  getDetailMessage(strAQI) {

    dblAQI = parseFloat(strAQI);
    if (dblAQI >= 0 && dblAQI <= 50) {
      return {
        Grade: "一级",
        GradeClass: "优",
        GradeColor: "#00FF00",
        JKYXQK: "空气质量令人满意，基本无空气污染",
        JYCQCS: "各类人群可正常活动",
        scope: "0~50"
      }
    }

    if (dblAQI >= 51 && dblAQI <= 100) {
      return {
        Grade: "二级",
        GradeClass: "良",
        GradeColor: "#FFFF00",//黄色
        JKYXQK: "空气质量可接受，但某些污染物可能对极少数异常敏感人群健康有较弱影响",
        JYCQCS: "极少数异常敏感人群应减少户外活动",
        scope: "51~100"
      }

    }

    if (dblAQI >= 101 && dblAQI <= 150) {
      return {
        Grade: "三级",
        GradeNum: 3,
        GradeClass: "轻度污染",
        GradeColor: "#FF7E00",//橙色
        JKYXQK: "易感人群症状有轻度加剧，健康人群出现刺激症状",
        JYCQCS: "儿童、老年人及心脏病、呼吸系统疾病患者应减少长时间、高强度的户外锻炼",
        scope: "101~150",
      }
    }

    if (dblAQI >= 151 && dblAQI <= 200) {
      return {
        Grade: "四级",
        GradeNum: 4,
        GradeClass: "中度污染",
        GradeColor: "#FF0000",//红色
        JKYXQK: "进一步加剧易感人群症状，可能对健康人群\n心脏、呼吸系统有影响",
        JYCQCS: "儿童、老年人及心脏病、呼吸系统疾病患者应避免长时间、高强度的户外锻炼，一般人群适量减少户外运动",
        scope: "151~200",
      }

    }

    if (dblAQI >= 201 && dblAQI <= 300) {
      return {
        Grade: "五级",
        GradeNum: 5,
        GradeClass: "重度污染",
        GradeColor: "#99004C",//紫色
        JKYXQK: "心脏病和肺病患者症状显著加剧，运动耐受力降低，健康人群普遍出现症状",
        JYCQCS: "儿童、老年人及心脏病、呼吸系统疾病患者应停留在室内，停止户外活动，一般人群应避免户外活动",
        scope: "201~300",
      }
    }

    if (dblAQI > 300) {
      return {
        Grade: "六级",
        GradeNum: 6,
        GradeClass: "严重污染",
        GradeColor: "#7E0023",//褐红色
        JKYXQK: "健康人群运动耐受力降低，有明显强烈症状，提前出现某些疾病",
        JYCQCS: "儿童、老年人及心脏病、呼吸系统疾病患者应停留在室内，避免体力消耗，一般人群应避免户外活动",
        scope: ">300",
      }
    }

  }
  backgroundHandel() {
    api.getAQIHourData().then((res) => {
      console.log("res", res)
      res.data.d.forEach((item) => {
        if (item.STName === "呼和浩特市" && parseInt(item.AQI) > 100) {
          console.log("AQI", item.AQI)
          let AirAQIInfo = this.getDetailMessage(item.AQI)
          console.log("AQI", AirAQIInfo)
          var message = "空气质量：" + item.AIRQualityStatus + "， " + "指数：" + item.AQI
          var detail = AirAQIInfo.JKYXQK + AirAQIInfo.JYCQCS;
          console.log("message", message)
          console.log("detail", detail)
          this.notif.localNotif(message,detail)
        }
      })

    })
  }
  componentDidMount() {
    SplashScreen.hide();

    const backgroundJob = {
      jobKey: "myJob",
      job: () => this.backgroundHandel()
    };

    BackgroundJob.register(backgroundJob);

    BackgroundJob.schedule({
      jobKey: "myJob",//后台运行任务的key
      // period: 7200000,                     //任务执行周期
      period: 3600000,                     //任务执行周期
      exact: true,                     //安排一个作业在提供的时间段内准确执行
      allowWhileIdle: true,            //允许计划作业在睡眠模式下执行
      allowExecutionInForeground: false,//允许任务在前台执行
    });

  }
  render() {
    return (
      <View style={{ flex: 1 }}>
      <StatusBar
        backgroundColor="#3496f0"
        barStyle="light-content"
      />
        <RootStack />
        {/* <Text style={styles.title}>Example app react-native-push-notification</Text>
        <View style={styles.spacer}></View>
        <TextInput style={styles.textField} value={this.state.registerToken} placeholder="Register token" />
        <View style={styles.spacer}></View>

        <TouchableOpacity style={styles.button} onPress={() => { this.notif.localNotif() }}><Text>Local Notification (now)</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { this.notif.scheduleNotif() }}><Text>Schedule Notification in 30s</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { this.notif.cancelNotif() }}><Text>Cancel last notification (if any)</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { this.notif.cancelAll() }}><Text>Cancel all notifications</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { this.notif.checkPermission(this.handlePerm.bind(this)) }}><Text>Check Permission</Text></TouchableOpacity>

        <View style={styles.spacer}></View>
        <TextInput style={styles.textField} value={this.state.senderId} onChangeText={(e) => {this.setState({ senderId: e })}} placeholder="GCM ID" />
        <TouchableOpacity style={styles.button} onPress={() => { this.notif.configure(this.onRegister.bind(this), this.onNotif.bind(this), this.state.senderId) }}><Text>Configure Sender ID</Text></TouchableOpacity>
        {this.state.gcmRegistered && <Text>GCM Configured !</Text>}

        <View style={styles.spacer}></View> */}
      </View>
    );
  }

  onRegister(token) {
    Alert.alert("Registered !", JSON.stringify(token));
    console.log(token);
    this.setState({ registerToken: token.token, gcmRegistered: true });
  }

  onNotif(notif) {
    console.log(notif);
    // Alert.alert(notif.title, notif.message);
  }

  handlePerm(perms) {
    console.log(perms);
    Alert.alert("Permissions", JSON.stringify(perms));
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: "#000000",
    margin: 5,
    padding: 5,
    width: "70%",
    backgroundColor: "#DDDDDD",
    borderRadius: 5,
  },
  textField: {
    borderWidth: 1,
    borderColor: "#AAAAAA",
    margin: 5,
    padding: 5,
    width: "70%"
  },
  spacer: {
    height: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  }
});
