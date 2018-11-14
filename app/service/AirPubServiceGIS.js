/**
 * Created by 都玉新
 * Author:2017/6/3
 * Function:获取空气实时AQI数据,GIS发布系统用
 * Desc:
 */
 
/** 
 * 获取空气实时AQI数据,GIS发布系统用
 */  
import {Colors,Images,CommonStyles,XMLParserUtil,Constants,HttpUtil,Json} from '../common/'

class AirPubServiceGIS {  
 constructor(context) {
        this._self = context; //调用此类的上下文
    }
   fetchAQIHourDataByGIS = function() { 
      var _self = this._self; 
      let wsurl=Constants.path_webservice_gis;
      let wsmethod="GetLatitudeAndLongitude";
      let namespace=Constants.namespace_gis;
      let arrPara = new Array("modType");
      let arrParaValue = new Array("大气");
      HttpUtil.callWsPost(wsmethod,arrPara,arrParaValue ,wsurl,namespace, function (result) {  
         //alert("请求成功！"+result);
         var xml = new XMLParserUtil().parseFromString(result);
         var  json=new Json();
         var Plist = [];
         for (var i = 0; i <= xml.getElementsByTagName("PointInfo").length - 1; i++) {
                let aqijson = [{
                    PCode:"",
                    PName:"",
                    Longitude:"",
                    Latitude:"",
                }];
                var tag = xml.getElementsByTagName("PointInfo")[i];
                //获取标签指定属性值
                var arrObject = tag.children;
                for (var j = 0; j <= arrObject.length - 1; j++) {
                    var item = arrObject[j];
                    var sname = item.name;
                    aqijson[0][sname] = item.value;
                }

                var ss = JSON.stringify(aqijson);
                
                //console.log(ss);
                let aqiObj = eval("(" + ss.replace("[", "").replace("]", "") + ")");
                //var pCurrStcode = json.get(aqiObj, "STCode"); 
                Plist.push(aqiObj);
         }
      _self.setState({PositionArr:Plist});
      });  
}  
  
}
export default AirPubServiceGIS;  