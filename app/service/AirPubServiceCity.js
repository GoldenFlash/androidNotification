/**
 * Created by 付豪
 * Author:2017/7/28
 * Function:空气相关的服务----获取城市的24小时数据
 * Desc:
 */

import { Colors, Images, CommonStyles, Constants, CommonUtil, HttpUtil, XMLParserUtil, Json, store } from '../common/'
import data from '../data'
import AirAQIInfo from '../hb/AirAQIInfo'
import {CityAqi} from '../api/index'
/** 
 * 获取空气实时AQI数据
 */

class AirPubServiceCity {
    constructor(context) {
        this._self = context; //调用此类的上下文
    }
    fetchAQICityHourData() {
       return new Promise((resolve,reject)=>{
        let aqi = new CityAqi();
        aqi.GetTrendAQIOrDensity(Constants.stcode_capital, "1","城市",response=>{
            let data = response.data.d;
            if(data){
                resolve(data)
            }else{
                reject(response)
            }
            // _self.setState({ allAQIData: data }); //设置所有城市AQI实时信息
            // _self.setState({ isRefreshing: false });
            //缓存当前AQI信息
            // _selfCurr.saveStoreAQIInfo();
            // _selfCurr._getFromStoreAQIInfo();
        })
       })

    }

    //从缓存中获取当前AQI信息
    getStoreTrendAQIInfo() {
        var _self = this._self;
        //获取所有城市AQI
        store.get("AllCityHourData").then((value) => {
            if (value == null) {
                this.fetchAQICityHourData(_self);
                return true;
            }
            _self.setState({ allAQIData: JSON.parse(value) });
            //this._getCurrAQIFromStore();//从缓存中读取当前默认城市AQI
            _self.setState({ currAQI: JSON.parse(value)[0] });
            //判断是否可以读取缓存
            let currTime = CommonUtil.getNowFormatDate();
            let cacheTime = JSON.parse(value)[0].Time + ":00:00"
                //if(CommonUtil.dateDiff(currTime,cacheTime)<60+parseInt(Constants.update_time_province)){ //判断是否当前数据
            if (CommonUtil.dateDiff(currTime, cacheTime) < 90) { //判断是否当前数据
                _self.setState({ isRefreshing: false });
                return true;
            } else {
                this.fetchAQICityHourData();
            }

        }).catch((error) => { this.fetchAQICityHourData(); });

    }

    //从缓存中读取当前默认城市AQI
    getCurrCityFromStore() {
        var _self = this._self;
        //获取当前城市AQI
        store.get("AllCityHourData").then((value) => {
            if (value == null) {
               this.fetchAQICityHourData();
                return true;
            } else if (eval("(" + value + ")").STCode == "") {
                this.fetchAQICityHourData();
                return true;
            } else if (value[0] == "[") {
                this.fetchAQICityHourData();
                return true;
            }
            _self.setState({ currAQI: JSON.parse(value) });
            return true;
        }).catch((error) => { return false; });
    }

    //缓存当前AQI信息
    saveStoreAQIInfo() {
        store.save("AllCityHourAQI", JSON.stringify(this._self.state.currAQI))
            .catch((error) => { console.log(error) });
        store.save("AllCityHourData", JSON.stringify(this._self.state.allAQIData))
            .catch((error) => { console.log(error) });
    }
    //清除缓存
    deleteStoreAQIInfo(){
        store.delete("AllCityHourAQI")
            .catch((error)=>{console.log(error)});
        store.delete("AllCityHourData")
            .catch((error)=>{console.log(error)});
    }

     _getFromStoreAQIInfo() {//获取AQI并赋值给页面的横轴，纵轴
        var _self = this._self;
            _self.state.allAQIData.map((item) =>{
            _self.state.cityname.push(item.Time+"时");
            _self.state.aqi.push(parseInt(item.AQI));
        })
    }

}

export default AirPubServiceCity;