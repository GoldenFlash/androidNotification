/**
 * Created by 都玉新
 * Author:2017/6/3
 * Function:fetch util
 * Desc:
 */

var HttpUtil = {};  
  
/** 
 * 基于 fetch 封装的 GET请求 
 * @param url 
 * @param params {} 
 * @param headers 
 * @returns {Promise} 
 */  
HttpUtil.get = function(url, params, headers) {  
    if (params) {  
        let paramsArray = [];  
        //encodeURIComponent  
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))  
        if (url.search(/\?/) === -1) {  
            url += '?' + paramsArray.join('&')  
        } else {  
            url += '&' + paramsArray.join('&')  
        }  
    }  
    return new Promise(function (resolve, reject) {  
      fetch(url, {  
            method: 'GET',  
            headers: headers,  
          })  
          .then((response) => {  
              if (response.ok) {  
                  return response.json();  
              } else {  
                  reject({status:response.status})  
              }  
          })  
          .then((response) => {  
              resolve(response);  
          })  
          .catch((err)=> {  
            reject({status:-1});  
          })  
    })  
}  
  
  
/** 
 * 基于 fetch 封装的 POST请求  FormData 表单数据 
 * @param url 
 * @param formData   
 * @param headers 
 * @returns {Promise} 
 */  
HttpUtil.post = function(url, formData, headers) {  
    return new Promise(function (resolve, reject) {  
      fetch(url, {  
            method: 'POST',  
            headers: headers,  
            body:formData,  
          })  
          .then((response) => {  
              if (response.ok) {  
                  return response.json();  
              } else {  
                  reject({status:response.status})  
              }  
          })  
          .then((response) => {  
              resolve(response);  
          })  
          .catch((err)=> {  
            reject({status:-1});  
          })  
    })  
}  


/* 此方法为Ajax 调用Java Axis的web服务,调用举例如下: 
callAxisWsPost("远程方法名", new Array("参数名1","参数名2"...), new Array(参数值1,参数值2...), 
                         "wsdl地址", 
                         "命名空间", function (result) { 
                             //Ajax完成后的回调处理,result为服务端返回结果 
                         }, function () { 
                             //Ajax加载时的处理,如弹出loading遮罩层,提交按钮禁用等 
                         }); 
*/   
HttpUtil.callWsPost= function (method, variable, value, url, _Namespace, callback, loadProcess) {   
    function getlen(str) {  
        var bytesCount = 0;  
        for (var i = 0; i < str.length; i++) {  
            var c = str.charAt(i);  
            if (/^[\u0000-\u00ff]$/.test(c))   //匹配双字节  
            {  
                bytesCount += 1;  
            }  
            else {  
                bytesCount += 2;  
            }  
        }  
        return bytesCount;  
    }  
  
    var xmlhttp = new XMLHttpRequest();

    var data;  
    data = '<?xml version="1.0" encoding="utf-8"?>';  
    data = data + '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';  
    data = data + '<soap:Body>';  
    data = data + '<' + method + ' xmlns="' + _Namespace + '">';  
    for (var i = 0; i < variable.length; i++) {  
        data = data + '<' + variable[i] + '>' + value[i] + '</' + variable[i] + '>';  
  
    }  
    data = data + '</' + method + '>';  
    data = data + '</soap:Body>';  
    data = data + '</soap:Envelope>';  
    xmlhttp.onreadystatechange = function () {  
        if (xmlhttp.readyState == 1) {  
            // if (loadProcess)  
            //     loadProcess();  
        }  
        if (xmlhttp.readyState == 4) {  
            if (xmlhttp.status == 200) {  
                if (callback)  
                   callback(xmlhttp.responseText);  
            }  
        }  
    }  
    xmlhttp.open("POST", url, true);  
    xmlhttp.setRequestHeader("Content-Type","text/xml;charset=UTF-8");   
    //xmlhttp.setRequestHeader("Content-Length", getlen(data));  
   // xmlhttp.setRequestHeader("SOAPAction", _Namespace + method);  
    xmlhttp.send(data);  
}  

export default HttpUtil;  