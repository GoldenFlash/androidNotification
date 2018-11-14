/**
 * Created by 都玉新
 * Author:2017/6/6
 * Function:空气质量指数相关信息类
 * Desc:
 */
import CommonUtil from '../common/CommonUtil'

class AirAQIInfo {
  constructor(strAQI) {
    this.AQI=""; //空气质量指数
    this.Grade="";//空气质量指数级别
    this.GradeNum=0;//空气质量级别数
    this.GradeClass="";//空气质量指数类别
    this.GradeColor="";//空气质量指数表示颜色
    this.JKYXQK="";//对健康影响情况
    this.JYCQCS="";//建议采取的措施
    this.scope="";//取值范围

    var dblAQI = 0;
    if (strAQI != "")
    {
      
       if(CommonUtil.isNumeric(strAQI)==true)
       {
                 dblAQI = parseFloat(strAQI);
		             if (dblAQI >=0 && dblAQI <=50)
		             {
		                 this.AQI = strAQI;
		                 this.Grade = "一级";
		                 this.GradeNum=1;
		                 this.GradeClass = "优";
		                 //this.GradeColor = Color.argb(255,0,288,0);//绿色
		                 this.GradeColor = "#00FF00";//绿色
                    	 this.JKYXQK = "空气质量令人满意，基本无空气污染";
		                 this.JYCQCS = "各类人群可正常活动";
						 this.scope = "0~50";
		             }
		
		             if (dblAQI >= 51 && dblAQI <= 100)
		             {
		                 this.AQI = strAQI;
		                 this.Grade = "二级";
		                 this.GradeNum=2;
		                 this.GradeClass = "良";
		                 //this.GradeColor =  Color.argb(255,255,255,0);//黄色
		                 this.GradeColor = "#FFFF00";//黄色
                     this.JKYXQK = "空气质量可接受，但某些污染物可能对极少数异常敏感人群健康有较弱影响";
		                 this.JYCQCS = "极少数异常敏感人群应减少户外活动";
						 this.scope = "51~100";
		               
		             }
		
		             if (dblAQI >= 101 && dblAQI <= 150)
		             {
		                 this.AQI = strAQI;
		                 this.Grade = "三级";
		                 this.GradeNum=3;
		                 this.GradeClass = "轻度污染";
		                 //this.GradeColor =  Color.argb(255,255,126,0);//橙色
		                 this.GradeColor =  "#FF7E00";//橙色
                     this.JKYXQK = "易感人群症状有轻度加剧，健康人群出现刺激症状";
		                 this.JYCQCS = "儿童、老年人及心脏病、呼吸系统疾病患者应减少长时间、高强度的户外锻炼";
						this.scope = "101~150";
		             }
		
		             if (dblAQI >= 151 && dblAQI <= 200)
		             {
		                 this.AQI = strAQI;
		                 this.Grade = "四级";
		                 this.GradeNum=4;
		                 this.GradeClass = "中度污染";
		                 //this.GradeColor = Color.argb(255,255,0,0);//红色
                     this.GradeColor = "#FF0000";//红色
		                 this.JKYXQK = "进一步加剧易感人群症状，可能对健康人群\n心脏、呼吸系统有影响";
		                 this.JYCQCS = "儿童、老年人及心脏病、呼吸系统疾病患者应避免长时间、高强度的户外锻炼，一般人群适量减少户外运动";
						this.scope = "151~200";
		             }
		
		             if (dblAQI >= 201 && dblAQI <= 300)
		             {
		                 this.AQI = strAQI;
		                 this.Grade = "五级";
		                 this.GradeNum=5;
		                 this.GradeClass = "重度污染";
		                 //this.GradeColor = Color.argb(255,153,0,76);//紫色
                     this.GradeColor ="#99004C";//紫色
		                 this.JKYXQK = "心脏病和肺病患者症状显著加剧，运动耐受力降低，健康人群普遍出现症状";
		                 this.JYCQCS = "儿童、老年人及心脏病、呼吸系统疾病患者应停留在室内，停止户外活动，一般人群应避免户外活动";
						 this.scope = "201~300";
		             }
		
		             if (dblAQI >300)
		             {
		                 this.AQI = strAQI;
		                 this.Grade = "六级";
		                 this.GradeNum=6;
		                 this.GradeClass = "严重污染";
		                 //this.GradeColor =  Color.argb(255,126,0,35);//褐红色
                     this.GradeColor =  "#7E0023";//褐红色
		                 this.JKYXQK = "健康人群运动耐受力降低，有明显强烈症状，提前出现某些疾病";
		                 this.JYCQCS = "儿童、老年人及心脏病、呼吸系统疾病患者应停留在室内，避免体力消耗，一般人群应避免户外活动";
						 this.scope = ">300";
		             }
       }else{
		   this.GradeColor="#00FF00";
	   }
     }
  }
}

export default AirAQIInfo;