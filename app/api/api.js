import axios from 'axios';
import Constants from '../common/Constants'
var getAQIHourData = function () {
    let params = {
        STCode: Constants.stcode_province,
        sType: "城市",
    }
    let wsurl = Constants.host_province + "/" + Constants.path_webservice;
    let wsmethod = "GetAQIDayReport";
    return axios.post(wsurl + '/' + wsmethod, params)
}
export default{
    getAQIHourData
}