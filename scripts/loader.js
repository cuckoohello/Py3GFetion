var loader = {};

(function(){
   loader.files = [];
   
   //文件元信息
   var versionl = '2.0.3.4';

   loader.filemeta = [];
   loader.filemeta.push({name:'style.css', v:versionl});
   loader.filemeta.push({name:'jquery.js', v:versionl});
   loader.filemeta.push({name:'login.js', v:versionl});
   loader.filemeta.push({name:'index.js', v:'2.0.3.4.1'});
   loader.filemeta.push({name:'main.js', v:versionl});
   loader.filemeta.push({name:'group.js', v:versionl});
   loader.filemeta.push({name:'app.js', v:versionl});
   loader.filemeta.push({name:'ws.js', v:versionl});
   loader.filemeta.push({name:'chat.js', v:versionl});
   loader.filemeta.push({name:'user.js', v:versionl});
   loader.filemeta.push({name:'iscroll.js', v:versionl});
   loader.filemeta.push({name:'face.js', v:versionl});
   loader.filemeta.push({name:'setCookie.js', v:versionl});
   loader.filemeta.push({name:'noimage.js', v:versionl});
   loader.filemeta.push({name:'common.js', v:versionl});
   
   //根据地址加载文件
   loader.fileLoader = function(file, callBack){
     if(file && file.length>0){
    	 file.push(callBack);
    	 loader.files.push(file);
    	 
    	 for(var i=0; i<file.length-1; i++){
    	   var ready = false;
    	   
    	   var name = file[i].name;
    	   var url = file[i].url;
    	   var type = file[i].type;

	       //判断是否支持本地存储
	       if(ready==false && loader.localstorage()){
	   	      var content = loader.getItem(name);
	   		  if(typeof content!='undefined' && content!=null){
		   	     if(type == 'js'){
		   		    $('head:first').append($(('<script type="text/javascript">'+content+'</script>')));
		   	     }else if(type == 'css'){
		   	    	$('head:first').append($(('<style type="text/css">'+content+'</style>'))); 
		   	     }
		   	     ready = true;
		   	     loader.doCallBack(name);
	   		  }
	   	   }
	       //加载
	       if(ready == false){
	    	  loader.loadfile(file[i]);
    	   }
        } 
     }
   }
   
   //加载群组相关文件
   loader.getGroupFile = function(){
	   if(typeof common == 'undefined'){
		   loader.fileLoader([{name:"common.js", url:"js/html5/common.min.js", type:"js", async:false}]);
	   }
	   loader.fileLoader([{name:"group.js", url:"js/html5/group.min.js", type:"js", async:false}]);
   }
   
   //加载ws相关文件
   loader.getWsFile = function(){
	   loader.fileLoader([{name:"ws.js", url:"js/html5/ws.min.js", type:"js", async:false}]);
   }
   
   //加载应用相关文件
   loader.getAppFile = function(){
	   loader.fileLoader([{name:"app.js", url:"js/html5/app.min.js", type:"js", async:false}]);
   }
   
   //加载登录相关文件
   loader.getLoginFile = function(){
	   loader.fileLoader([{name:"login.js", url:"js/html5/login.min.js", type:"js", async:false}]);
   }
   
   //加载首页相关文件
   loader.getIndexFile = function(){
	   loader.getNoimageFile();
	   loader.loadStyleCss('style.css', 'css/html5/style.min.css');
	   if(typeof common == 'undefined'){
		   loader.fileLoader([{name:"common.js", url:"js/html5/common.min.js", type:"js", async:false}]);
	   }
	   loader.fileLoader([{name:"index.js", url:"js/html5/index.min.js", type:"js", async:false},
	                      {name:"face.js", url:"js/html5/face.min.js", type:"js", async:false}]);
   }
   
   //加载分组相关文件
   loader.getMainFile = function(){
	   loader.fileLoader([{name:"main.js", url:"js/html5/main.min.js", type:"js", async:false}]);
   }
   
   //加载iscroll相关文件
   loader.getIscrollFile = function(){
	   loader.fileLoader([{name:"iscroll.js", url:"js/libs/iscroll.js", type:"js", async:false}]);
   }
   
   //加载会话相关文件
   loader.getChatFile = function(){
	   loader.fileLoader([{name:"chat.js", url:"js/html5/chat.min.js", type:"js", async:false}]);
   }
   
   //加载会话相关文件
   loader.getUserFile = function(){
	   loader.fileLoader([{name:"user.js", url:"js/html5/user.min.js", type:"js", async:false}]);
   }
   
   //加载setCookie相关文件
   loader.getSetCookieFile = function(){
	   loader.fileLoader([{name:"setCookie.js", url:"js/libs/setCookie.js", type:"js", async:false}]);
   }
   
   //加载noimage相关文件
   loader.getNoimageFile = function(){
	   loader.fileLoader([{name:"noimage.js", url:"js/html5/noimage.h5.min.js", type:"js", async:false}]);
   }
   
   //加载文件
   loader.loadfile = function(file){
	  if(typeof file.async == 'undefined'){
		  file.async = 'true';
	  }
	  $.ajax({url:basepath+file.url+'?t='+new Date().getTime(), async:file.async, cache:false, success:function(data){loader.loadCallback(data, file)}});
   }
   
   //加载文件回调函数
   loader.loadCallback = function(data, file){
	  if(loader.localstorage()){
		  loader.setItem(file.name, data);
	  }
	  loader.doCallBack(file.name);
   }
   
   //执行加载回调函数
   loader.doCallBack = function(name){
	  for(var i=0; i<loader.files.length; i++){
		 var contain = false;
		 var allReady = true;
		 var file = loader.files[i];
		 if(file && file.length>0){
			 for(var j=0; j<file.length-1; j++){
				 if(file[j].name == name){
					 file[j].ready = true;
					 contain = true;
				 }
				 if(typeof file[j].ready=='undefined' || file[j].ready==false){
					 allReady = false;
				 }
			 }
			 
			 if(contain && allReady){
				 var callback = file[file.length-1];
				 if(typeof callback != 'undefined'){
					 callback();
				 }
			 }
		 }
	  } 
   }
   
   //加载jquery
   loader.loadJquery = function(files, callback){
       if(loader.localstorage()){
	       var jquery = loader.getItem('jquery.js');
		   if(typeof jquery!='undefined' && jquery!=null){
			   var script = document.createElement('script');
			   script.type = 'text/javascript';
			   script.innerHTML = jquery;
		   }else{
			   loader.getFile(basepath+'js/libs/jquery-1.4.2.min.js?t='+new Date().getTime(), false);
			   var script = document.createElement('script');
			   script.type = 'text/javascript';
			   script.innerHTML = loader.getFileResponse;
			   if(loader.localstorage()){
				   loader.setItem('jquery.js', loader.getFileResponse);
			   }
		   }
		   document.getElementsByTagName('head')[0].appendChild(script);
//		   loader.loadJqueryCallBack();
	   }else{
		   document.write('<script type="text/javascript" src="'+basepath+'js/libs/jquery-1.4.2.min.js"></script>');
//		   for(var i=0; i<files.length; i++){
//			   document.write('<script type="text/javascript" src="'+basepath+files[i].url+'"></script>');
//		   }
		   
//		   var oldOnload = window.onload;
//		   window.onload = function(){
//			   if(typeof oldOnload == 'function'){
//				   oldOnload();
//			   }
////			   callback();
//		   };
	   }
   }
   
   //判断是否支持本地存储
   loader.localstorage = function(){
//	   return false;
	   return !!window.localStorage;
   }
   
   //加载样式文件
   loader.loadStyleCss = function(name, url){
	   if(loader.localstorage()){
		   var style = loader.getItem('style.css');
		   if(typeof style!='undefined' && style!=null){
			   $('head').append('<style type="text/css">'+style+'</style>');
//			   document.write('<style type="text/css">'+style+'</style>');
			   return;
		   }
		   loader.getFile(basepath+url, false);
		   if(typeof loader.getFileResponse!='undefined' && loader.getFileResponse!=null && loader.getFileResponse!=''){
			   var content = loader.getFileResponse.replace(/\.\.\/\.\.\/images/g, '../images');
			   loader.setItem(name, content);
			   $('head').append('<style type="text/css">'+content+'</style>');
//			   document.write('<style type="text/css">'+ content +'</style>');
			   return;
		   }
	   }
	   document.write('<link href="'+basepath+'/css/html5/style.css" rel="stylesheet" type="text/css" />');
   }
   
   //保存本地缓存
   loader.setItem = function(key, value){
	   if(key != 'fileMeta'){
		   loader.saveOrUpdateFileMeta(key);
	   }
	   localStorage.setItem(key, value);
   }
   
   //获取本地缓存
   loader.getItem = function(key){
	   var fileMeta = loader.getLocalStorageFileMeta();
	   if(fileMeta!=null && loader.compareFileMetaInfo(key)){
		   return localStorage.getItem(key);
	   }else{
		   localStorage.removeItem(key);
		   return null;
	   }
	   
   }
   
   //获取本地缓存文件元信息
   loader.getLocalStorageFileMeta = function(){
	   var fileMeta = localStorage.getItem('fileMeta');
	   if(typeof fileMeta=='undefined' || fileMeta==null){
		   for(var i=0; i<localStorage.length; i++){
			   if(localStorage.key(i) != 'recentContact'){
				   localStorage.removeItem(localStorage.key(i));
				   i--;
			   }
		   }
		   fileMeta = null;
	   }
	   return fileMeta;
   }
   
   //获取最新文件元信息
   loader.getLoaderFileMetaInfo = function(key){
	   if(loader.filemeta && loader.filemeta.length>0){
		   for(var i=0; i<loader.filemeta.length; i++){
			   if(loader.filemeta[i].name == key){
				   return loader.filemeta[i];
			   }
		   }
	   }
	   return null;
   }
   
   //获取缓存数据元信息
   loader.getFileMetaInfo = function(key){
	   var fileMeta = loader.getLocalStorageFileMeta();
	   if(typeof fileMeta!='undefined' && fileMeta!=null){
		   var fileMetaList = fileMeta.split(';');
		   for(var i=0; i<fileMetaList.length; i++){
			   var info = eval('('+fileMetaList[i]+')'); 
			   if(info.name == key){
				   return info;
			   }
		   }
	   }
	   return null;
   }
   
   //比较缓存数据是否为最新版本
   loader.compareFileMetaInfo = function(key){
	   if(loader.filemeta && loader.filemeta.length>0){
		   for(var i=0; i<loader.filemeta.length; i++){
			   if(loader.filemeta[i].name == key){
				   var localMetaInfo = loader.getFileMetaInfo(key);
				   if(localMetaInfo!=null && localMetaInfo.v==loader.filemeta[i].v){
					   return true;
				   }else{
					   return false;
				   }
			   }
		   }
	   }
	   
	   return false;
   }
   
   //保存或更新数据文件元信息
   loader.saveOrUpdateFileMeta = function(key){
	   var metaInfo = loader.getLoaderFileMetaInfo(key);
	   var fileMeta = loader.getLocalStorageFileMeta();
	   if(fileMeta == null){
		   loader.setItem('fileMeta', '{name:"'+metaInfo.name+'",v:"'+metaInfo.v+'"}');
	   }else{
		   localStorage.removeItem('fileMeta');
		   var fileMetaList = fileMeta.split(';');
		   for(var i=0; i<fileMetaList.length; i++){
			   var info = eval('('+fileMetaList[i]+')'); 
			   if(info.name == key){
				   fileMetaList[i] = '{name:"'+metaInfo.name+'",v:"'+metaInfo.v+'"}';
				   loader.setItem('fileMeta', fileMetaList.join(';'));
				   return;
			   }
		   }
		   fileMeta += ';{name:"'+metaInfo.name+'",v:"'+metaInfo.v+'"}';
		   loader.setItem('fileMeta', fileMeta);
	   }
   }
   
   //获取文件
   loader.getFile = function(url, async, callback){
	 if(typeof callback != 'undefined'){
		 loader.getFileCallBack = callback;
	 }
	 if(window.XMLHttpRequest){
	     loader.xmlhttp = new XMLHttpRequest();
	 }else if(window.ActiveXObject){
	     loader.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	 }
	 if(loader.xmlhttp != null){
	     loader.xmlhttp.onreadystatechange = loader.getFileCallBack;
	     loader.xmlhttp.open("GET", url, async);
	     loader.xmlhttp.send(null);
	 }
   }
   
   //获取文件回调函数
   loader.getFileCallBack = function(data){
     if(loader.xmlhttp.readyState==4 && loader.xmlhttp.status==200){
    	 loader.getFileResponse = loader.xmlhttp.responseText; 
     }
   }
   
   	//弹层提示（提示内容、关闭、按钮。若type=2有两个按钮，type=1有一个按钮，type=0无按钮。type=3无关闭无按钮,type=4无关闭无按钮且3秒自动关闭）
    loader.alertDiv = function(type, content, btn1Act, btn1Content, btn2Act, btn2Content, align){
    	var width = document.documentElement.clientWidth;
    	var height = document.documentElement.clientHeight;
    	if(height < 400){
    		height = 400;
    	}
    	if(typeof width == 'undefined' || width == null || width == 0){
    		width = 320;
        	height = 400;
    	}
    	
    	var ahtml = '<div class="tcBG" style="width:'+width+'px;height:'+(height+50)+'px;display:-webkit-box;-webkit-box-align:center;-webkit-box-pack:center;text-align:center;" id="tcBGid">';
		ahtml += '<div class="loginTcBox">';
		ahtml += '<div class="txt_spe"><p>'+content+'</p>';	
		
		//第一行：关闭
		if(type != '3' && type != '4' && type != '5'){
			ahtml += '<div class="txt_spe_close" onclick="loader.closeAlertDiv(\'tcBGid\');"><div class="hx"></div><div class="sx"></div></div></div>';
		}else{
			ahtml += '</div>';
		}
		if(type == '3' || type == '4'){
			setTimeout("loader.closeAlertDiv('tcBGid')", 3000);
		}
		if(type == '5'){
			setTimeout("loader.closeAlertDiv('tcBGid')", 10000);
		}
		//第二行：操作按钮
		if(type == '1'){
			ahtml += '<div class="login-btn"><button onclick="'+btn1Act+'">'+btn1Content+'</button></div>';
		}else if(type == '2'){
			ahtml += '<div class="login-btn"><button onclick="'+btn1Act+'" style="float:left;width:80px;">'+btn1Content+'</button><button onclick="'+btn2Act+'" style="float:right;width:80px;">'+btn2Content+'</button></div>';
		}
		ahtml += '</div></div>';
		$('body').append(ahtml);
		document.body.scrollTop = 0;
	}
	
    loader.closeAlertDiv = function(divid){
		if(typeof divid == 'undefined' || divid == ''){
			divid = 'tcBGid';
		}
		$("#" + divid).remove();
	}
    
    loader.goBackTo = function(){
    	try{
    		window.history.go(-1);return false;
    	}catch(e){
    		window.location.href=document.referrer;
    	}
    }
    
	//其他客户端在线提示
    loader.alertNotOnline = function(type, content, btn1Act, btn1Content, btn2Act, btn2Content, align){
    	var width = document.documentElement.clientWidth;
    	var height = document.documentElement.clientHeight;
    	if(height < 400){
    		height = 600;
    	}
    	if(typeof width == 'undefined' || width== null || width == 0){
    		width = 320;
        	height = 400;
    	}
		var ahtml = '<div class="tcBG" style="width:'+width+'px;height:'+height+'px;display:-webkit-box;-webkit-box-align:center;-webkit-box-pack:center;text-align:center;" id="tcBGid"><div class="loginTcBox">';
		
		//左对齐,适用于两行
		ahtml += '<div class="txt_spe"><p>'+content+'</p>';		
		
		//关闭
		ahtml += '<div class="txt_spe_close" onclick="loader.closeAlertDiv(\'tcBGid\');login.login();"><div class="hx"></div><div class="sx"></div></div></div>';
		
		//第二行：操作按钮
		ahtml += '<div class="login-btn"><button type="button" onclick="'+btn1Act+'">'+btn1Content+'</button></div>';
		
		//ahtml += '<div class="login-btn"><span class="spanBtn" onclick="javascript:login.login();">重新登陆</span></div>'
		
		ahtml += '</div></div>';
		$('body').append(ahtml);
		document.body.scrollTop = 0;
	}
    
    //Offline提示
    loader.offlineDiv = function(){
    	var width = document.documentElement.clientWidth;
    	var height = document.documentElement.clientHeight;
    	if(height < 400){
    		height = 600;
    	}
    	if(typeof width == 'undefined' || width== null || width == 0){
    		width = 320;
        	height = 400;
    	}
		var ahtml = '<div class="tcBG" style="width:'+width+'px;height:'+height+'px;display:-webkit-box;-webkit-box-align:center;-webkit-box-pack:center;text-align:center;" id="tcBGOfflineId"><div class="loginTcBox">';
		
			ahtml += '<div class="txt-logout">'+'网络不可用，请检查网络设置'+'</div>';
		
		ahtml += '</div></div>';
		$('body').append(ahtml);
		document.body.scrollTop = 0;
	}
    loader.closeOfflineDiv = function(divid){
		if(typeof divid == 'undefined' || divid == ''){
			divid = 'tcBGOfflineId';
		}
		$("#" + divid).remove();
		if(getListMsgType == 'ws' && (typeof ws == 'undefined' || ws.socket == null || ws.socket.readyState == '2' || ws.socket.readyState == '3')){
			loader.getWsFile();
			ws.newWs();
		}
	}
    
    loader.checkOnlineStatus = function(event) {
        if (navigator.onLine) {
        	if($("#tcBGOfflineId").length > 0){
        		loader.closeOfflineDiv('tcBGOfflineId');
        	}
        } else {
        	if($("#tcBGOfflineId").length > 0){
        		;
        	} else {
        		loader.closeAlertDiv();
        	    loader.offlineDiv();
        	}
        }
        
        setTimeout('loader.checkOnlineStatus', 1000);
    }
    
})()
