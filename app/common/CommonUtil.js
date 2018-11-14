/**
 * Created by 都玉新
 * Author:2017/4/6
 * Function:存放一些通用的js方法
 * Desc:
 */

var CommonUtil = {};  

/*验证数据 是数字：返回true；不是数字：返回false */
CommonUtil.isNumeric = function(inputData) {
     //isNaN(inputData)不能判断空串或一个空格
     //如果是一个空串或是一个空格，而isNaN是做为数字0进行处理的，而parseInt与parseFloat是返回一个错误消息，这个isNaN检查不严密而导致的。
    if (parseFloat(inputData).toString() == "NaN") {
        　　　　//alert("请输入数字……");注掉，放到调用时，由调用者弹出提示。
        　　　　return false;
        } else {
        　　　　return true;
        }
 }

 /*获取当前的日期时间 格式“yyyy-MM-dd HH:MM:SS” */
CommonUtil.getNowFormatDate = function() {
     var date = new Date();
     var seperator1 = "-";
     var seperator2 = ":";
     var month = date.getMonth() + 1;
     var strDate = date.getDate();
     if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
     if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
     }
     var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
           + " " + date.getHours() + seperator2 + date.getMinutes()
           + seperator2 + date.getSeconds();
     return currentdate;
 }

 /*比较日前大小  */
CommonUtil.compareDate=function(checkStartDate, checkEndDate) {      
    var arys1= new Array();      
    var arys2= new Array();      
if(checkStartDate != null && checkEndDate != null) {      
    arys1=checkStartDate.split('-');      
      var sdate=new Date(arys1[0],parseInt(arys1[1]-1),arys1[2]);      
    arys2=checkEndDate.split('-');      
    var edate=new Date(arys2[0],parseInt(arys2[1]-1),arys2[2]);      
if(sdate > edate) {      
    //alert("日期开始时间大于结束时间");         
    return false;         
}  else {   
    //alert("通过");   
    return true;      
    }   
    }      
}     

/*判断日期，时间大小  */
CommonUtil.compareTime=function(startDate, endDate) {   
 if (startDate.length > 0 && endDate.length > 0) {   
    var startDateTemp = startDate.split(" ");   
    var endDateTemp = endDate.split(" ");   

    var arrStartDate = startDateTemp[0].split("-");   
    var arrEndDate = endDateTemp[0].split("-");   

    var arrStartTime = startDateTemp[1].split(":");   
    var arrEndTime = endDateTemp[1].split(":");   

    var allStartDate = new Date(arrStartDate[0], arrStartDate[1], arrStartDate[2], arrStartTime[0], arrStartTime[1], arrStartTime[2]);   
    var allEndDate = new Date(arrEndDate[0], arrEndDate[1], arrEndDate[2], arrEndTime[0], arrEndTime[1], arrEndTime[2]);   

    if (allStartDate.getTime() >= allEndDate.getTime()) {   
        //alert("startTime不能大于endTime，不能通过");   
        return false;   
    } else {   
        //alert("startTime小于endTime，所以通过了");   
        return true;   
    }   
    } else {   
       //alert("时间不能为空");   
       return false;   
    }   
}   
/*比较日期，时间大小 */ 
CommonUtil.compareCalendar=function(startDate, endDate) {   
   if (startDate.indexOf(" ") != -1 && endDate.indexOf(" ") != -1 ) {   
        //包含时间，日期  
        compareTime(startDate, endDate);               
   } else {   
      //不包含时间，只包含日期  
      compareDate(startDate, endDate);   
   }   
}

//调用该方法(主方法) 
CommonUtil.dateDiff=function(date1, date2){ 
    var type1 = typeof date1, type2 = typeof date2; 
    if(type1 == 'string') 
    date1 = stringToTime(date1); 
    else if(date1.getTime) 
    date1 = date1.getTime(); 
    if(type2 == 'string') 
    date2 = stringToTime(date2); 
    else if(date2.getTime) 
    date2 = date2.getTime(); 
    return (date1 - date2) / 1000 / 60 ;//除1000是毫秒，不加是秒 
   // return (date2 - date1) / 1000 / 60 / 60 / 24;//除1000是毫秒，不加是秒  
}
 
//字符串转成Time(dateDiff)所需方法 
function stringToTime(string){ 
    var f = string.split(' ', 2); 
    var d = (f[0] ? f[0] : '').split('-', 3); 
    var t = (f[1] ? f[1] : '').split(':', 3); 
    return (new Date( 
    parseInt(d[0], 10) || null, 
    (parseInt(d[1], 10) || 1)-1, 
    parseInt(d[2], 10) || null, 
    parseInt(t[0], 10) || null, 
    parseInt(t[1], 10) || null, 
    parseInt(t[2], 10) || null 
    )).getTime(); 
 
} 

export default CommonUtil;