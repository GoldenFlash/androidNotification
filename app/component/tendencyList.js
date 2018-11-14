
import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Animated,
  RefreshControl,
  Dimensions,
  AsyncStorage,
  TouchableWithoutFeedback
} from 'react-native'
import layout from '../util/mixin';
import px2dp from '../util/px2dp';
const { width, height } = Dimensions.get('window')
import ChartView from './webViewChart'
// import ChartView from 'react-native-highcharts';
export default class ListPicker extends Component{
    constructor(props){
        super(props)
        this.loaded = false
        this.state = {
            
        }
    }
    componentWillMount(){
        let {list,title,timeType} = this.props
        var chartData = this.formateData(list,timeType)
        this.title = title
        this.list = list
        this.chartData = chartData
        console.log("chartData",chartData)
        // this.setState({
        //     title:title,
        //     list : list,
        //     chartData:chartData
        // })
    }
    
    // shouldComponentUpdate(nextProps,nextState) {
    //     // console.log("shouldComponentUpdat",this.props.list !== nextProps.list)
    //     if(this.props.list!==nextProps.list){
    //         this.update(nextProps)
    //     }
    //     return true
    // }
    componentWillUpdate(){
        this.update(this.props)
    }
    update(nextProps){
        let {list,timeType,title} = nextProps
        var oldList = JSON.stringify(this.state.list)
        if(oldList===JSON.stringify(list)){
            return
        }else{
            var chartData = this.formateData(list,timeType)
            this.title = title
            this.list = list
            this.chartData = chartData
            // this.setState({
            //     title:title,
            //     list : list,
            //     chartData:chartData
            // })
        } 
    }
    formateData(list,timeType){
            var timeArr=[]
            var dataArr=[]
            var colorArr=[]
            if(timeType==="hour"){
                list.forEach((item,index)=>{
                    var date = new Date(parseInt(item.time))
                    var timeStr = date.getMonth()+1+"."+date.getDate() +" "+date.toTimeString().slice(0,5)
                    item.timeStr = timeStr
                    timeArr.push(timeStr)
                    dataArr.push({
                        color: this.getAQIColor(parseInt(item.value)),
                        y: parseInt(item.value)
                    })
                    colorArr.push(this.getAQIColor(parseInt(item.value)))
                })
            }else if(timeType==="day"){
               
                list.forEach((item,index)=>{
                    var date = new Date(parseInt(item.time))
                    var timeStr = date.getMonth()+1+"."+date.getDate()
                    item.timeStr = timeStr
                    timeArr.push(timeStr)
                    dataArr.push({
                        color: this.getAQIColor(parseInt(item.value)),
                        y: parseInt(item.value)
                    })
                    colorArr.push(this.getAQIColor(parseInt(item.value)))
                })
            }else if(timeType==="month"){
                list.forEach((item,index)=>{
                    var date = new Date(parseInt(item.time))
                    var timeStr = date.getFullYear()+"."+(date.getMonth()+1)
                    item.timeStr = timeStr
                    timeArr.push(timeStr)
                    dataArr.push({
                        color: this.getAQIColor(parseInt(item.value)),
                        y: parseInt(item.value)
                    })
                    colorArr.push(this.getAQIColor(parseInt(item.value)))
                })
            }
     
        return {
            timeArr:timeArr,
            dataArr:dataArr,
            colorArr:colorArr
        }
    }
    getAQIColor(AQI){
        if (AQI < 51) {
            return "#3DD588"
        } else if (AQI > 50 && AQI < 101) {
            return "#fce54d"
        } else if (AQI > 100 && AQI < 151) {
            return "#FF7E00"
        } else if (AQI > 150 && AQI < 201) {
            return "#FF0000"
        } else if (AQI > 200 && AQI < 301) {
            return  "#7B62D4"
        } else if(AQI>300) {
            return "#9F4972"
        }else{
            return "#3DD588"
        }
    }
    renderTitle(){
        return (
            <View style={styles.title}>
                {this.title.map((item,index)=>{
                    return (
                        <View key={index} style={[{flex:1,paddingTop:10,paddingBottom:10},index!=0?layout.borderLeft("solid","#c0c0c0",1):null]}>
                            <Text style={{textAlign:"center",fontSize:12}}>{item}</Text>
                        </View>
                    )
                })}
            </View>
        )
    }
    renderListItem(){
        var list = JSON.parse(JSON.stringify(this.list)).reverse()
        return (
            <View style={{flex:1}}>
                {  
                    list.map((item,index)=>{
                        return (
                            <View key={index} style={styles.list}>
                                
                                <View style = {styles.ListItem}>
                                    <Text style={{textAlign:"center",fontSize:12,color:"#999999"}}>{item.timeStr}</Text>
                                </View>
                                <View style = {styles.ListItem}>
                                    <Text style={{textAlign:"center",fontSize:12,color:"#999999"}}>{item.value}</Text>
                                </View>
                                
                            </View> 
                        )   
                
                    })
                }
            </View>
        )
    }
    renderChartView(){
        var conf = {
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            subtitle: {
                text:""
            },
            credits: {
                    enabled:false
                },
            legend: {                                                                  
                enabled: false                                                         
            },
            plotOptions: {
                column: {
                //     animation:true,
                //   pointPadding: 10,
                //   borderWidth: 0,
                //   groupPadding: 0,
                //   shadow: false,
                  pointWidth:5,
                //   maxPointWidth:10,
                    // pointInterval:1,
                //   pointPlacement:"on"
                }
            },
            xAxis: {
                categories:this.chartData.timeArr,
                // gridLineWidth:5
                // labels:{
                //     step:6
                // },
                // tickLength:0
                scrollbar: {
                    enabled: true,
                    showFull: false
                },
                
            },
            yAxis: {
                labels: {
                    x: -15
                },
                title: {
                    text: ''
                },
                tickPositions:[0,50,100,150],
                offset:30
            },
            series: [{
                name: '',
                // data: [],
                // colors:[]
                data: this.chartData.dataArr,
                colors:this.chartData.colorArr,
                
            }],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        xAxis: {
                            labels: {
                                formatter: function () {
                                    return this.value.replace('月', '')
                                }
                            }
                        },
                        yAxis: {
                            labels: {
                                align: 'left',
                                x: 0,
                                y: -2
                            },
                            title: {
                                text: ''
                            }
                        }
                    }
                }]
            }
        }
        var conf1 ={
            chart: {
                type: 'column',
                panning:true,
                // scrollablePlotArea:{
                //     minWidth:200
                // }
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            plotOptions: {
                column: {
                    animation:true,
                  pointPadding: -10,
                  borderWidth: 0,
                  groupPadding: 0,
                  shadow: false,
                  pointWidth:1,
                //   maxPointWidth:10,
                    pointInterval:0.1,
                //   pointPlacement:"on"
                }
            },
           tooltip:{
            followTouchMove:false
           },
            xAxis: {
                categories: this.chartData.timeArr,
                // max:10,
                scrollbar: {
                    enabled: true,
                    showFull: false
                }
            },
            yAxis: {
                title: {
                    text: ''
                },
                // tickPositions:[0,50,100]
                // labels: {
                //     formatter: function () {
                //         return this.value;
                //     }
                // }
            },
            tooltip: {
                crosshairs: true,
                shared: true
            },
            plotOptions: {
                spline: {
                    marker: {
                        radius: 4,
                        lineColor: 'transparent',
                        lineWidth: 1
                    }
                }
            },
            series: [{
                colors:this.chartData.colorArr,
                data: this.chartData.dataArr
            }]
        }
        return(
            <ChartView style={{ height:200,width:width}} config={conf}></ChartView>
        )
       
    }

    render(){
        console.log("render")
        return (
            <View style={{flex:1,}}>
            
                {this.renderChartView()}
                {/* {this.renderEcharts()} */}
                {this.renderTitle()}
               <ScrollView>
                {this.renderListItem()}
               </ScrollView>
            </View>
        );
    }
}
const styles = {
    title:{
        width:width,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        // ...layout.padding(10,0),
        ...layout.borderTop("solid","#c0c0c0",1),
        ...layout.borderBottom("solid","#c0c0c0",1)
    },
    titleItem:{
        flex:1,
    },
    list:{
        width:width,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        ...layout.borderBottom("solid","#c0c0c0",1)
    },
    ListItem:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        ...layout.padding(10,0),
        ...layout.borderLeft("solid","#c0c0c0",1)
    },

}
