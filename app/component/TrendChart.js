import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    ScrollView,
    Text,
    View,
    Animated,
    Platform,
    TouchableWithoutFeedback,
    RefreshControl,
    ActivityIndicator,
    Dimensions
} from 'react-native';

import ChartView from 'react-native-highcharts';
// import Dimensions from 'Dimensions';
// import store from '../common/Store'
// import CommonUtil from '../common/CommonUtil'
// import AirAQIInfo from '../hb/AirAQIInfo'
import px2dp from '../util'
import layout from '../util/mixin'
import AirPubServiceCity from '../service/AirPubServiceCity'
import Echarts from 'native-echarts';

const { width, height } = Dimensions.get('window');
export default class Trend extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scrollY: new Animated.Value(0),
            allAQIData: [],
            aqi: [],
            isRefreshing: true,
            cityname: [],
            options: [
                { label: "AQI", value: "AQI" },
                { label: "PM2.5", value: "PM25AQI" },
                { label: "PM10", value: "PM10AQI" },
                { label: "SO2", value: "SO2AQI" },
                { label: "NO2", value: "NO2AQI" },
                { label: "O3", value: "O3Hour8AQI" },
                { label: "CO", value: "COAQI" }],
            selectOptions: 1,
            selectItem: { label: "AQI", value: "AQI" },
            AQIColor: ['#C33531', '#EFE42A', '#64BD3D', '#EE9201', '#29AAE3', '#B74AE5', '#0AAF9F', '#E89589', '#16A085', '#4A235A', '#C39BD3 ', '#F9E79F', '#BA4A00', '#ECF0F1', '#616A6B', '#EAF2F8', '#4A235A', '#3498DB']

        }
    }
    componentWillMount() {
        new AirPubServiceCity(this).fetchAQICityHourData().then((res) => {
            console.log("AirPubServiceCity", res)
            var cityname = []
            var aqi = []
            res.forEach((item, index) => {
                cityname.push(item.Time + "时")
                aqi.push(parseInt(item.AQI))
            })
            this.setState({
                allAQIData: res,
                aqi: aqi,
                cityname: cityname,
                isRefreshing: false
            })
        })
    }
    _onRefresh() { }
    changeOptions(selectOptions) {
        console.log("selectOptions", this.state.options[selectOptions - 1])
        var selectItem = this.state.options[selectOptions - 1]
        var allAQIData = this.state.allAQIData
        var AQI = []
        var AQIColor = []
        allAQIData.forEach((item, index) => {
            AQI.push(parseFloat(item[selectItem.value]))
            AQIColor.push(this.getAQIColor(item[selectItem.value]))
        })
        // console.log("asdasdasda", AQIColor)
        this.setState({
            selectOptions: selectOptions,
            selectItem: this.state.options[selectOptions - 1],
            aqi: AQI,
            AQIColor: AQIColor
        }, () => {
            // this.setState({
            //     aqi: AQI
            // })

        })
    }
    getAQIColor(AQI) {
        if (AQI < 51) {
            return "#3DD588"
        } else if (AQI > 50 && AQI < 101) {
            return "#fce54d"
        } else if (AQI > 100 && AQI < 151) {
            return "#FF7E00"
        } else if (AQI > 150 && AQI < 201) {
            return "#FF0000"
        } else if (AQI > 200 && AQI < 301) {
            return "#7B62D4"
        } else if (AQI > 300) {
            return "#9F4972"
        } else {
            return "#3DD588"
        }
    }
    drawLine() {
        var Highcharts = 'Highcharts';
        var chartHeight = this.height - 20;
        var conf = {
            chart: {
                type: 'column',
                marginRight: 10,
                marginBottom: 100,

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
                categories: this.state.cityname,
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
                    text: 'AQI'
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
                data: this.state.aqi
            }]
        };
        return conf
    }
    renderOptions() {
        var options = this.state.options
        return (
            <View style={styles.options}>
                {options.map((item, index) => {
                    return (
                        <TouchableWithoutFeedback key={index} onPress={this.changeOptions.bind(this, index + 1)}>
                            <View style={[styles.optionsItem, this.state.selectOptions === index + 1 ? layout.borderBottom("solid", "#3496f0", 1) : null]}>
                                <Text style={[{ textAlign: "center" }, this.state.selectOptions === index + 1 ? { color: "#3496f0" } : null]}>{item.label}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    )
                })}
            </View>
        )
    }
    renderEchart() {
        var selectItem = this.state.selectItem.label
        console.log("his.state.aqi", this.state.aqi)
        const option = {
            title: {
                text: ''
            },
            tooltip: {},
            xAxis: {
                data: this.state.cityname
            },
            yAxis: {},
            series: [{
                name: selectItem,
                type: 'bar',
                barMaxWidth: '40%',

                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                // color: ["#3496f0"],
                data: this.state.aqi,

            }],
        };
        var Highcharts = 'Highcharts';
        var conf = {
            chart: {
                type: 'column',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                marginBottom: 100,
            },
            title: {
                text: ''
            },
            xAxis: {
                type: 'string',
                categories: this.state.cityname,
                labels: {
                    rotation: -45,
                    style: {
                        fontSize: '10px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                },
                max: 12
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
                data: this.state.aqi
            }]
        };
        var conf2 = {
            chart: {
                type: 'column'
            },
            exporting:{ enabled:false },
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
                categories:this.state.cityname,
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
                data: this.state.aqi,
                // colors:this.chartData.colorArr
                
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
        return (
            // <Echarts option={option} width={width} height={200} />

            <View>
                <ChartView style={{ height: 200,width:width }} config={conf2}></ChartView>
            </View>

        );
    }
    renderListItem() {
        var list = JSON.parse(JSON.stringify(this.state.allAQIData)).reverse()
        return (
            <View style={{ flex: 1 }}>
                <View style={[styles.list, layout.borderTop("solid", "#c0c0c0", 1)]}>
                    <View style={styles.ListItem}>
                        <Text style={{ textAlign: "center", fontSize: 12, color: "#999999" }}>时间</Text>
                    </View>
                    <View style={styles.ListItem}>
                        <Text style={{ textAlign: "center", fontSize: 12, color: "#999999" }}>{this.state.selectItem.label}</Text>
                    </View>
                </View>
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        {
                            list.map((item, index) => {
                                return (
                                    <View key={index} style={styles.list}>
                                        <View style={styles.ListItem}>
                                            <Text style={{ textAlign: "center", fontSize: 12, color: "#999999" }}>{item.Time}</Text>
                                        </View>
                                        <View style={styles.ListItem}>
                                            <Text style={{ textAlign: "center", fontSize: 12, color: "#999999" }}>
                                                {item[this.state.selectItem.value]}
                                            </Text>
                                        </View>

                                    </View>
                                )

                            })
                        }
                    </View>
                </ScrollView>

            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 ,backgroundColor:"#FFF"}}>
                <View style={{ flex: 1, alignItems: "center" }}>
                    {this.state.isRefreshing ? <View style={{ width: 40, height: 40, backgroundColor: "#c0c0c0", justifyContent: "center", alignItems: "center", borderRadius: 50, marginTop: 20 }}>
                        <ActivityIndicator size={25} color="#FFF" />
                    </View> : null}
                    {/* {this.renderOptions()} */}
                    {this.state.allAQIData.length ? this.renderOptions() : null}
                    {this.state.aqi.length ? this.renderEchart() : null}
                    {this.state.allAQIData.length ? this.renderListItem() : null}
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        marginBottom: px2dp(46)
    },
    titleView: {
        height: Platform.OS == 'ios' ? 64 : 44,
        paddingTop: Platform.OS == 'ios' ? 14 : 0,
        backgroundColor: '#ff6400',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
    options: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom:15
    },
    optionsItem: {
        flex: 1,
        ...layout.margin(0, 5),
        ...layout.padding(10, 0)
    },
    list: {
        width: width,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        ...layout.borderBottom("solid", "#c0c0c0", 1)
    },
    ListItem: {
        // height:50,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        ...layout.padding(10, 0),
        ...layout.borderLeft("solid", "#c0c0c0", 1)
    },
});