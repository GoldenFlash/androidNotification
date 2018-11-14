import axios from 'axios';
import { Constants } from '../common/index.js'
import AirAQIInfo from '../hb/AirAQIInfo'
class CityAqi {

    /**
     * description：获取城市AQI数据（实时数据）
     * author:徐雍文
     * date:2017-07-29
     * @param {any} STCode 城市代码
     * @param {any} sType  测点类型
     * @param {function} callback 取得数据后回调函数
     * @memberof CityAqi
     */
    GetAQIByDate(STCode, sType, callback) {
        let params = {
            STCode: STCode,
            sType: sType,
        }
        let wsurl = Constants.host_province + "/" + Constants.path_webservice;
        let wsmethod = "GetAQIDayReport";
        axios.post(wsurl + '/' + wsmethod, params)
            .then(response => {
                response.data.d.map(item => { //给返回数据增加对应AQI值颜色、空气质量级别、健康指引、建议采取措施
                    let AirAQIInfos = new AirAQIInfo(item.AQI);
                    item.GradeColor = AirAQIInfos.GradeColor;//AQI值颜色
                    item.Grade = AirAQIInfos.Grade;//空气质量级别（文字）
                    item.JKYXQK = AirAQIInfos.JKYXQK;//健康指引
                    item.JYCQCS = AirAQIInfos.JYCQCS;//建议采取措施
                    item.GradeNum = AirAQIInfos.GradeNum;//空气质量级别（数字）
                    item.HourTime = this.upDateTime(item.Time + ":00:00");
                })
                if (typeof callback === "function") {
                    callback(response);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    /**
     * description：获取单个城市变化趋势数据
     * author:徐雍文
     * date:2017-08-02
     * @param {any} STCode 城市代码
     * @param {any} iDay 天数
     * @param {any} sType 测点类型
     * @param {function} callback 取得数据后回调函数
     * @memberof CityAqi
     */
    GetTrendAQIOrDensity(STCode, iDay, sType, callback) {
        let params = {
            STCode: STCode,
            iDay: iDay,
            sType: sType
        }
        let wsurl = Constants.host_province + "/" + Constants.path_webservice;
        let wsmethod = "GetTrendAQIOrDensity";
        axios.post(wsurl + '/' + wsmethod, params)
            .then(response => {
                response.data.d.map(item => { //给返回数据增加对应AQI值颜色
                    let AirAQIInfos = new AirAQIInfo(item.AQI);
                    item.GradeColor = AirAQIInfos.GradeColor;
                    item.GradeNum = AirAQIInfos.GradeNum;//空气质量级别（数字）
                    item.HourTime = this.upDateTime(item.Time + ":00:00");
                })
                if (typeof callback === "function") {
                    callback(response);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    /**
     * description：取得城市AQI日报
     * author:徐雍文
     * date:2017-08-04
     * @param {any} STCode 城市代码
     * @param {any} Pcode  点位代码 取城市填-1
     * @param {any} BDate 开始时间
     * @param {any} EDate 结束时间
     * @param {any} sType 测点类型 测点或城市
     * @param {any} fldSource 数据源 1
     * @param {function} callback 取得数据后回调函数
     * @memberof CityAqi
     */
    GetCityAQIDayReport(STCode, Pcode, BDate, EDate, sType, fldSource,callback) {
        let params = {
            STCode: STCode,
            Pcode: Pcode,
            BDate: BDate,
            EDate: EDate,
            sType: sType,
            fldSource: fldSource
        }
        let wsurl = Constants.host_province + "/" + Constants.path_webservice;
        let wsmethod = "GetCityAQIDayReport";
        axios.post(wsurl + '/' + wsmethod, params)
            .then(response => {
                //console.log(response);
                response.data.d.map(item => { //给返回数据增加对应AQI值颜色
                    let AirAQIInfos = new AirAQIInfo(item.AQI);
                    item.GradeColor = AirAQIInfos.GradeColor;
                    item.GradeNum = AirAQIInfos.GradeNum;//空气质量级别（数字）
                })
                if (typeof callback === "function") {
                    callback(response);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    /**
     * description：获取区县AQI数据（实时数据）
     * author:徐雍文
     * date:2017-07-29
     * @param {any} STCode 城市代码
     * @param {any} sType  测点类型
     * @param {function} callback 取得数据后回调函数
     * @memberof CityAqi
     */
    GetCountyAQIByDate(STCode, sType, callback) {
        let params = {
            STCode: STCode,
            sType: sType,
        }
        // let wsurl = Constants.host_province + "/" + Constants.path_webservice;
        // let wsmethod = "GetAQIDayReport";
        let wsurl = '/mock/countyaqi.json'
        axios.get(wsurl)
            .then(response => {
                response.data.map(item => { //给返回数据增加对应AQI值颜色、空气质量级别、健康指引、建议采取措施
                    let AirAQIInfos = new AirAQIInfo(item.AQI);
                    item.GradeColor = AirAQIInfos.GradeColor;//AQI值颜色
                    item.Grade = AirAQIInfos.Grade;//空气质量级别（文字）
                    item.JKYXQK = AirAQIInfos.JKYXQK;//健康指引
                    item.JYCQCS = AirAQIInfos.JYCQCS;//建议采取措施
                    item.GradeNum = AirAQIInfos.GradeNum;//空气质量级别（数字）
                    //item.HourTime = this.upDateTime(item.Time + ":00:00");
                })
                if (typeof callback === "function") {
                    callback(response);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    /**
     * description：获取大气、水质的经纬度
     * author:徐雍文
     * date:2017-08-09
     * @param {any} modType 业务类型
     * @param {any} callback 取得数据后回调函数
     * @memberof CityAqi
     */
    GetLatitudeAndLongitude(modType,callback) {
        let params = {
            modType: modType
        }
        let wsurl = Constants.namespace_gis;
        let wsmethod = "GetLatitudeAndLongitude";
        axios.post(wsurl + '/' + wsmethod, params)
            .then(response => {
                if (typeof callback === "function") {
                    callback(response);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }


    /**
     * description：格式化时间
     * author:徐雍文
     * date:2017-08-04 
     * @param {any} time 时间字符串
     * @returns 小时
     * @memberof CityAqi
     */
    upDateTime(time) {
        //根据日期字符串转换成日期 
        var regEx = new RegExp("\\-", "gi");
        time = time.replace(regEx, "/");
        var dependedDate = new Date(time);
        return dependedDate.getHours() + "时";
    }
}
export default CityAqi;