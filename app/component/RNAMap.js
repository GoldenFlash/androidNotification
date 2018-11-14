import React, {Component} from 'react'
import {
  StyleSheet,
  Alert,
  Text,
  Image,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import {MapView, Marker} from 'react-native-amap3d'
import AirPubServiceGIS from '../service/AirPubServiceGIS'
import AirPubService from '../service/AirPubService'
import AirAQIInfo from '../hb/AirAQIInfo'
const { width, height } = Dimensions.get('window')

export default class AMapView extends Component {
  static navigationOptions = {
    title: '添加标记',
  }

  state = {
    time: new Date(),
    PositionArr:[],
    allAQIData:[],
  }
  componentDidMount() {
    // this.mounted = true
    // setInterval(() => {
    //   if (this.mounted) {
    //     this.setState({time: new Date()})
    //   }
    // }, 1000)
  }
  _renderCustomMarker(name,aqi){
    let pAirAQIInfo=new AirAQIInfo(aqi);
    let bgColor=pAirAQIInfo.GradeColor;
    //bgColor=" "?"#00FF00":bgColor;
    return (<View style={[styles.customMarker,{backgroundColor:bgColor}]}>
      <Text style={styles.markerText}>{name+"\n"+aqi}</Text>
    </View>)
}
componentWillMount(){
  new AirPubServiceGIS(this).fetchAQIHourDataByGIS();
  new AirPubService(this).getStoreAQIInfo();
}
   AddAQI(){
     this.state.PositionArr.map((item,key)=>{//在GIS的数组中添加测点的AQI值
       this.state.allAQIData.map((value,keya)=>{
         if(item.PName==value.PName){
           item.AQI=value.AQI
         }
       })
     })
   }
    _renderMarker=()=>{//生成标记
    this.AddAQI();
    let rtnVal=[];
    this.state.PositionArr.map((item,key)=>{
      rtnVal.push(
        <Marker
        infoWindowEnabled={false}
        key={key}
        icon={this._renderCustomMarker.bind(this,item.PName,item.AQI)}
          coordinate={{
            latitude: parseFloat(item.Latitude),
            longitude: parseFloat(item.Longitude),
          }}
        />
      );
    })
    return rtnVal;
  }

  render() {
    return(
      // <Text>11</Text>  
      <MapView 
      zoomLevel={11.8}
      coordinate={{
          latitude: 40.836543,
          longitude: 111.67257,
        }} style={{width:width,height:height}}>
        {this._renderMarker()}
      </MapView>
    )
  }
}


const styles = StyleSheet.create({
  customMarker: {
    alignItems: 'center',
    borderRadius: 5,
    padding: 5,
  },
  markerText: {
    color: '#333',
  },
})