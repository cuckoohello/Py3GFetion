var common = {};

(function(){
	common.clientHeight = document.documentElement.clientHeight;
	common.clientWidth = document.documentElement.clientWidth;
	
	common.mouseDownTime = 0;
	common.mouseUpTime = 0;
	
	common.shieldingLayerInit = function(){
		if($('#shieldingLayer').length > 0){
			common.shieldingLayerDestroy();
		}
		var inner = '<div id="shieldingLayer" ';
		inner += 'style="position:absolute;top:0px;left:0px;width:100%;height:100%;background-color:gray;opacity:0.6;z-index:99">';
//		inner += '<img src="'+basepath+'/img/loading.gif" ';
//		inner += 'style="margin-top:'+(common.clientHeight-32)/2+'px;margin-left:'+(common.clientWidth-32)/2+'px"/>';
		inner += '</div>';
		$(inner).insertBefore($('#main'));

	}
	
	common.shieldingLayerDestroy = function(){
		$('#shieldingLayer').remove();
	}
	
	common.mouseDown = function(){
		common.mouseDownTime = new Date().getTime();
	}
	
	common.ifLongPress = function(){
		common.mouseUpTime = new Date().getTime();
		if(common.mouseUpTime - common.mouseDownTime >= 1000){
			return true;
		}else{
			return false;
		}
	}
	
	common.date = new Date();
	
	common.getTime = function(){
		common.date = new Date();
		var hour = common.date.getHours();
		if(hour < 10){
			hour = "0" + hour;
		}
		var minute = common.date.getMinutes();
		if(minute < 10){
			minute = "0" + minute;
		}
		return hour+':'+minute;
	}
	
	common.getFullTime = function(){
		common.date = new Date();
		
		var year = common.date.getFullYear();
		var month = common.date.getMonth()+1;
		if(month < 10){
			month = "0"+month;
		}
		var day = common.date.getDate();
		if(day+1 < 10){
			day = "0"+(day+1)
		}
		var hour = common.date.getHours();
		if(hour < 10){
			hour = "0" + hour;
		}
		var minute = common.date.getMinutes();
		if(minute < 10){
			minute = "0" + minute;
		}
		var second = common.date.getSeconds();
		if(second < 10){
			second = "0" + second;
		}
		return year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;
	}
	
	
	common.getFullDay = function(){
		common.date = new Date();
		
		var year = common.date.getFullYear();
		var month = common.date.getMonth()+1;
		if(month < 10){
			month = "0"+month;
		}
		var day = common.date.getDate();
		if(day+1 < 10){
			day = "0"+(day+1)
		}
		
		return year+'-'+month+'-'+day;
	}
	
	//图片按比例缩放  
	common.DrawImage = function(ImgD,iwidth,iheight){
		//参数(图片,允许的宽度,允许的高度)  
		var image=new Image();  
		image.src=ImgD.src;  
		if(image.width>0 && image.height>0){
			if(image.width/image.height>= iwidth/iheight){  
				if(image.width>iwidth){   
					ImgD.width=iwidth;  
					ImgD.height=(image.height*iwidth)/image.width;  
				}else{  
					ImgD.width=image.width;   
					ImgD.height=image.height;  
				}  
				ImgD.alt=image.width+"×"+image.height;  
			}else{  
				if(image.height>iheight){   
					ImgD.height=iheight;  
					ImgD.width=(image.width*iheight)/image.height;   
				}else{  
					ImgD.width=image.width;   
					ImgD.height=image.height;  
				}  
				ImgD.alt=image.width+"×"+image.height;  
			}  
		}
		if(iwidth == 200){
			$(ImgD).click(function(){DrawImage(this,100,160)});
		}else{
			$(ImgD).click(function(){DrawImage(this,200,320)});
		}
		
	}
	
	common.setCookie = function(name,value,hours,path){  
	    var name = escape(name);  
	    var value = escape(value);  
	    var expires = new Date();  
	    expires.setTime(expires.getTime() + hours*3600000);  
	    path = path == "" ? "" : ";path=" + path;  
	    _expires = (typeof hours) == "string" ? "" : ";expires=" + expires.toUTCString();  
	    document.cookie = name + "=" + value + _expires + path;  
	}

	common. getCookieValue = function(name){
	    var name = escape(name);  
	    var allcookies = document.cookie;         
	    name += "=";  
	    var pos = allcookies.indexOf(name);      
	    if (pos != -1){
	        var start = pos + name.length;
	        var end = allcookies.indexOf(";",start);
	        if (end == -1) end = allcookies.length;
	        var value = allcookies.substring(start,end);
	        return unescape(value);
	        }
	    else return "";
	}

	common.deleteCookie = function(name,path){  
	    var name = escape(name);  
	    var expires = new Date(0);  
	    path = path == "" ? "" : ";path=" + path;  
	    document.cookie = name + "="+ ";expires=" + expires.toUTCString() + path;  
	}
})()