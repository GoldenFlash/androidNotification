/**
 * Created by 都玉新
 * Date:2017/4/9
 * Function:存放一些常量
 * Desc:如：接口地址，字符串常量等
 */
const constants = {
   /**
     * 字符串常量
   */
   app_name_desc: "呼市空气质量",
   app_name_short:"呼和浩特市环境空气质量发布系统",
   app_ver:"Ver 1.0.0",
   hello:"欢迎光临呼和浩特市环境空气质量发布系统！",
   pubunit:"内蒙古环境保护厅",
   tech_support_unit:"技术支持：上海丽正软件股份有限公司",
   datatip:"小时数据未经人工审核、不排除仪器故障等情况引起的数据异常，仅供参考", //AQI tip

    //WebService 
    cache_filename:"pubService.obj",
    namespace:"http://localhost:8010/webservices/PageServices/AirServices.asmx",
    namespace_gis:"http://localhost:8020/service/PUBServicForGisLiving.asmx",
    host_province:"http://222.74.25.182:10086",
    host_wh:"http://222.74.25.182:10086",
    update_time_province:"25",
    update_time_wh:"25",
    update_time_yc:"25",
    update_time_jz:"25",
    path_webservice:"services/PageServices/AirServices.asmx",
    path_webservice_gis:"http://222.74.25.182:10086/services/PUBServicForGisLiving.asmx",
    stcode_province:"1501",
    stcode_capital:"150100",
    stype_province:"城市",
    stype_city:"测点",
    iday:"1",
    
     //在线更新 
    update_server:"http://222.74.25.182:10086/EMCPHONE/",
    update_apkname:"EMCPHONE_Android_HHHT.apk",
    update_verjson:"ver_hhht.json",
    update_savename:"updatedEMCPHONE_Android_HHHT.apk",

    //AQI级别名称
    aqi_level_name1:"优",
    aqi_level_name2:"良",
    aqi_level_name3:"轻度",
    aqi_level_name4:"中度",
    aqi_level_name5:"重度",
    aqi_level_name6:"严重",

}

export default constants;