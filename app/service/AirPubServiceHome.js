/**
 * Created by 都玉新
 * Author:2017/6/3
 * Function:空气相关的服务----获取城市的当前数据
 * Desc:
 */

import { Colors, Images, CommonStyles, Constants, CommonUtil, HttpUtil, XMLParserUtil, Json, store } from '../common/'
import data from '../data'
import AirAQIInfo from '../hb/AirAQIInfo'
import {CityAqi} from '../api/index'
/** 
 * 获取空气实时AQI数据
 */

class AirPubService {
    constructor(context) {
        this._self = context; //调用此类的上下文
    }
    fetchAQIHourData() {
        var _self = this._self;//调用此类的上下文
        var _selfCurr=this; //当前类的上下文
        let aqi = new CityAqi();
        aqi.GetAQIByDate(Constants.stcode_province, "城市",response=>{
            let data = response.data.d;
            _self.setState({ allAQIHomeData: data[0] }); //设置所有城市AQI实时信息
            _self.setState({ currHomeAQI: data[0]}); //是设置的默认城市
            _self.setState({ isRefreshing: false });
             //缓存当前AQI信息
            _selfCurr.saveStoreAQIInfo();
        })
        // let wsurl = Constants.host_province + "/" + Constants.path_webservice;
        // let wsmethod = "GetAQIDayReport";
        // let namespace = Constants.namespace;
        // let arrPara = new Array("STCode", "sType");
        // let arrParaValue = new Array(Constants.stcode_province, "城市");
        // HttpUtil.callWsPost(wsmethod, arrPara, arrParaValue, wsurl, namespace, function(result) {
        //     //alert("请求成功！"+result);
        //     console.log(result);
        //     var xml = new XMLParserUtil().parseFromString(result); // Assume xmlText contains the example XML
        //     data.listaqi.splice(0, data.listaqi.length); //清空数组 
        //     var k = 0;
        //     var json = new Json();
        //     for (var i = 0; i <= xml.getElementsByTagName("PointItemHourInfo").length - 1; i++) {
        //         let aqijson = [{
        //             STCode: "", // STCode
        //             STName: "", // STName
        //             PName:"",
        //             PCode:"",
        //             Time: "",
        //             CPI: "", //首要污染物
        //             PLevel: "", //级别
        //             AIRQualityStatus: "", // 空气质量
        //             SO2: "", // SO2浓度
        //             CO: "", // CO浓度
        //             O3Hour1: "", // O3Hour1浓度
        //             O3Hour8: "", // O3Hour8浓度
        //             NO2: "", // NO2浓度
        //             PM10: "", // PM10浓度
        //             PM25: "", //PM25浓度
        //             PM10_24: "", // PM10_24浓度
        //             PM25_24: "", //PM25_24浓度
        //             SO2AQI: "", //SO2AQI
        //             COAQI: "", //COAQI
        //             PM10AQI: "", //PM10AQI
        //             PM10AQI_24: "", //PM10AQI_24
        //             NO2AQI: "", //NO2AQI
        //             O3Hour1AQI: "", //O3Hour1AQI
        //             O3Hour8AQI: "", //O3Hour8AQI
        //             PM25AQI: "", //PM25AQI
        //             PM25AQI_24: "", //PM25AQI_24
        //             AQI: "", //AQI
        //             AQIDay: "", //AQIDay
        //         }];
        //         var tag = xml.getElementsByTagName("PointItemHourInfo")[i];
        //         //获取标签指定属性值
        //         var arrObject = tag.children;

        //         for (var j = 0; j <= arrObject.length - 1; j++) {
        //             var item = arrObject[j];
        //             var sname = item.name;
        //             aqijson[0][sname] = item.value;
        //         }
        //         var ss = JSON.stringify(aqijson);
        //         let aqiObj = eval("(" + ss.replace("[", "").replace("]", "") + ")");
        //         data.listaqi.push(aqiObj);
        //         //console.log(data.listaqi);
        //         var pCurrStcode = json.get(aqiObj, "STCode");
        //     //     if (pCurrStcode == Constants.stcode_capital) { //是设置的默认城市
        //     //         //_self.setState({currHomeAQI:aqiObj});
        //     //         //设置AQI相关信息
                    
        //     //     }
        //     //console.log(_self.state.currAirAQIInfo);
        //      }
        //     var pAirAQIInfo = new AirAQIInfo(data.listaqi[0].AQI);
            
           
            

        // }, function() {

        // })
    }

    //从缓存中获取当前AQI信息
    getStoreAQIInfo() {
        var _self = this._self;
        //获取所有城市AQI
        store.get("allAQIHomeData").then((value) => {
            if (value == null) {
                this.fetchAQIHourData(_self);
                return true;
            }
            _self.setState({ allAQIHomeData: JSON.parse(value) });
            //this._getCurrAQIFromStore();//从缓存中读取当前默认城市AQI
            _self.setState({ currHomeAQI: JSON.parse(value)[0] });
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
        store.get("currHomeAQI").then((value) => {
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
            _self.setState({ currHomeAQI: JSON.parse(value) });
            return true;
        }).catch((error) => { return false; });
    }

    //缓存当前AQI信息
    saveStoreAQIInfo() {
        store.save("currHomeAQI", JSON.stringify(this._self.state.currHomeAQI))
            .catch((error) => { console.log(error) });
        store.save("allAQIHomeData", JSON.stringify(this._self.state.allAQIHomeData))
            .catch((error) => { console.log(error) });
    }
    //清除缓存
    deleteStoreAQIInfo(){
        store.delete("currHomeAQI")
            .catch((error)=>{console.log(error)});
        store.delete("allAQIHomeData")
            .catch((error)=>{console.log(error)});
    }

}

export default AirPubService;