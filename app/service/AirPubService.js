/**
 * Created by 都玉新
 * Author:2017/6/3
 * Function:空气相关的服务---获取测点的当前数据
 * Desc:
 */

import { Colors, Images, CommonStyles, Constants, CommonUtil, HttpUtil, XMLParserUtil, Json, store } from '../common/'
import {CityAqi} from '../api/index'
/** 
 * 获取空气实时AQI数据
 */

class AirPubService {
    constructor(context) {
        this._self = context; //调用此类的上下文
    }


    fetchAQIHourData() {
        var aqi = new CityAqi();
        var _self = this._self;//调用此类的上下文
        var _selfCurr=this; //当前类的上下文
        aqi.GetAQIByDate(Constants.stcode_province,"测点",response=>{
            let data = response.data.d;
            _self.setState({ allAQIData: data }); //设置所有城市AQI实时信息
            _self.setState({ isRefreshing: false });
            //缓存当前AQI信息
            _selfCurr.saveStoreAQIInfo();
        })
    }

    //从缓存中获取当前AQI信息
    getStoreAQIInfo() {
        var _self = this._self;
        //获取所有城市AQI
        store.get("allAQIData").then((value) => {
            if (value == null) {
                this.fetchAQIHourData(_self);
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
                this.fetchAQIHourData();
            }

        }).catch((error) => { this.fetchAQIHourData(); });

    }

    //从缓存中读取当前默认城市AQI
    getCurrAQIFromStore() {
        var _self = this._self;
        //获取当前城市AQI
        store.get("currAQI").then((value) => {
            if (value == null) {
               this.fetchAQIHourData();
                return true;
            } else if (eval("(" + value + ")").STCode == "") {
                this.fetchAQIHourData();
                return true;
            } else if (value[0] == "[") {
                this.fetchAQIHourData();
                return true;
            }
            _self.setState({ currAQI: JSON.parse(value) });
            return true;
        }).catch((error) => { return false; });
    }

    //缓存当前AQI信息
    saveStoreAQIInfo() {
        store.save("currAQI", JSON.stringify(this._self.state.currAQI))
            .catch((error) => { console.log(error) });
        store.save("allAQIData", JSON.stringify(this._self.state.allAQIData))
            .catch((error) => { console.log(error) });
    }
    //清除缓存
    deleteStoreAQIInfo(){
        store.delete("currAQI")
            .catch((error)=>{console.log(error)});
        store.delete("allAQIData")
            .catch((error)=>{console.log(error)});
    }

}

export default AirPubService;