var login = {};

(function(){
	
	// 中国移动手机号正则表达式
	var isChinaMobileNo = /^(134|135|136|137|138|139|147|150|151|152|157|158|159|182|183|187|188)[\d]{8}$/;
	// 中国联通手机号正则表达式
	var isChinaUnicomNo = /^(130|131|132|155|156|185|186)[\d]{8}$/;
	// 中国电信手机号正则表达式
	var isChinaTelecomNo = /^(133|153|180|189|181)[\d]{8}$/;
	// 合法的飞信号
	var isValidSid= /^\d{1,10}$/;
	//对电子邮件的验证
	var isEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	
	login.init = function(){
		login.appendStyle();
		login.appendHtml();
		if(checkCodeKey == 'true'){
			$("#checkCodeLid").show();
		}
//		alert(document.height + " " + window.outerHeight + " " + document.documentElement.clientHeight);
		setTimeout(function(){window.scrollTo(0, 1);},50);
	}
	
	login.appendHtml = function(){
		var thtml = '<div class="wrap"><ul class="login"><h1><img src="../images/html5/logo.png" alt="飞信" /></h1><ul><li><input type="text" id="m1" name="m" placeholder="请输入手机号、飞信号、邮箱"  required="required" maxlength="30"/></li>';
		thtml += '<li><input type="password" id="pass1" name="pass" placeholder="请输入密码"  required="required" maxlength="30"/></li>';
		thtml += '<li id="checkCodeLid" style="display:none;"><input type="text" id="captchaCode" name="captchaCode" placeholder="请输入验证码" maxlength="20" style="width:32%;text-indent:13%;" required="required">&nbsp;&nbsp;';
		thtml += '<img src="'+basepath+'systemimage/verifycode'+new Date().getTime()+'.jpeg?t='+new Date().getTime()+'" id="checkCodeId" alt="f" />&nbsp;&nbsp;';
		thtml += '<a href="#lg" onclick="login.changeCheckCode();" style="font-size:14px;color: #bbb;">看不清，换一个</a><input type="hidden" name="checkCodeKey" value="'+checkCodeKey+'"></li>';
		thtml += '</ul><div class="wjmm"><a href="#" onclick="loader.alertDiv(\'0\',\'移动用户发送P到<br/>12520获取密码\');">忘记密码</a></div><div class="loginBtn"><button onclick="login.submitLogin();">登录</button><button class="btnzc" onclick="login.regist();">免费注册</button></div></ul></div>';		
		
		$('body').html(thtml);
		
		$("#m1").change(function(){$("#pass1").val("");});
	}
	
	login.submitLogin = function(){
		var mval = $.trim($("#m1").val());
		var passval = $.trim($("#pass1").val());
		/*if(mval == ""){
			loader.alertDiv("4","请你输入手机号登录3G飞信");
			$("#m1").focus();
			return false;
		}*/
		
		if (!isChinaMobileNo.test(mval) && !isChinaUnicomNo.test(mval) && !isChinaTelecomNo.test(mval) && !isValidSid.test(mval) && !isEmail.test(mval)){
	        loader.alertDiv("4","请输入有效的手机号/飞信号/邮箱", "","","","", "left");
//	        $("#m1").focus();
	        return false;
	    }
		
		if(passval == ""){
			loader.alertDiv("4","请输入你的密码", "","","","", "left");
//			$("#pass1").focus();
			return false;
		}
		var captchaCode = $.trim($("#captchaCode").val());
		if(checkCodeKey == 'true' && (captchaCode == '' || captchaCode.length != 4)){
			loader.alertDiv("0","请你正确输入验证码");
		//	$("#captchaCode").focus();
			return false;
		}
	 	//document.getElementById("loginfrm").submit();
		//loader.alertDiv('3', '登录中，请稍候...<img src="../images/html5/loading.gif" class="loading">');
		loader.alertDiv('5', '<img  src="../images/html5/loading.gif" class="loading"/>登录中，请稍候...');
		var tdate = new Date().getTime();
		$.ajax({type:'POST',url: basepath+'login/loginHtml5.action'+'?t='+new Date().getTime(),data:{m:mval, pass:passval, captchaCode:captchaCode, checkCodeKey:checkCodeKey},
		       cache: false,
		       success: function(data){
				  $("#tcBGid").remove();
			      login.saveUserData(data);
	           },
	           error: function(data){
        		   //var inner = '<p style="text-align:center;" id="infosId">因网络问题未正常显示，请点击&nbsp;<a class=\"a_blue\" href=\"'+basepath+'index/html5.action?t='+new Date().getTime()+'\">刷新</a></p>';
    			   //$('body').html(inner);
	        	   $("#tcBGid").remove();
	        	   loader.alertDiv('4', '网络异常，请稍后再试', "","","","", "left");
	           }
	      });
	}
	
	login.saveUserData = function(data){
//		console.dir(data);
		if(typeof data!='undefined' && data != null){
			if(typeof data.headurl != 'undefined' && data.headurl != null && data.headurl != ''){
				headURL = data.headurl;
			}
			if(typeof data.nickname != 'undefined' && data.nickname != null && data.nickname != ''){
				nickName = data.nickname;
			}
			if(typeof data.loginstatus != 'undefined' && data.loginstatus != null && data.loginstatus != ''){
				loginStatus = data.loginstatus;
			}
			if(typeof data.loginstate != 'undefined' && data.loginstate != null && data.loginstate != ''){
				loginstate = data.loginstate;
			}
			if(typeof data.idUser != 'undefined' && data.idUser != null && data.idUser != ''){
				idUser = data.idUser;
			}
			if(typeof data.sessionId != 'undefined' && data.sessionId != null && data.sessionId != ''){
				sessionId = data.sessionId;
			}
			if(typeof data.gender != 'undefined' && data.gender != null && data.gender != ''){
				userGender = data.gender;
			}
			if(typeof data.checkCodeKey != 'undefined' && data.checkCodeKey != null && data.checkCodeKey != ''){
				checkCodeKey = data.checkCodeKey;
			}
			if(typeof data.tip != 'undefined' && data.tip != null && data.tip != ''){
				loader.alertDiv('4', data.tip, "","","","", "");
				if(checkCodeKey == 'true'){
					$("#checkCodeLid").show();
				}
				login.changeCheckCode();
				return;
			}			
			if(typeof index == 'undefined'){
			    loader.getIndexFile();
		    }
			index.init();
		}
	}
	
	login.changeCheckCode = function(){
		$("#checkCodeId").attr("src", basepath+'systemimage/verifycode'+new Date().getTime()+'.jpeg?t='+new Date().getTime());
		$("#captchaCode").val('');
	}
	
	login.changeStatus = function(){
		var cstatus = document.getElementById("statusId").innerHTML;
		if(cstatus == '<em><i></i></em>'){
			document.getElementById("statusId").innerHTML = '<em></em>';
			document.getElementById("loginstatus").value = '1';
		}else{
			document.getElementById("statusId").innerHTML = '<em><i></i></em>';
			document.getElementById("loginstatus").value = '4';
		}
	}
	
	login.appendStyle = function(){
		var style = '<style>';
		style += '*{padding:0;margin:0;}';
		style += 'body{height:100%; font:16px "微软雅黑","黑体",Verdana;word-wrap:break-word;word-break:break-all;background:#f6f6f6;color:#414a56;-webkit-tap-highlight-color: rgba(0, 0, 0, 0);}';
		style += 'li{list-style:none outside;}';
		style += 'h1,h2,h3,h4,h5,h6{font-size:100%;}';
		style += 'img{border:0;}';
		style += 'html{background:#f6f6f6;}';
		style += 'input,select,img{vertical-align:middle;}';
		style += 'body{overflow-x:hidden;background:#F1F5FB; }';
		style += '.wrap{width:100%;height:100%;overflow:hidden;margin:0 auto;position:relative; }';
		style += '.login h1{ height:152px; text-align:center;}';
		style += '.login h1 img{ margin-top:32px;}';
		style += '.login .yinsheng{ color:#a8a8a8;font-size:14px; line-height:20px; text-align:right; padding-right:4%; margin:15px 0 11px;}';
		style += '.login .yinsheng .icon{position: relative;margin-right:10px;}';
		style += '.login .yinsheng .icon-select{width:13px;height:13px;border:3px solid #91d7f0;border-radius:3px; vertical-align:middle}';
		style += '.login .yinsheng .icon-select em{width:11px;height:11px;background:#91d7f0;display:block;border-radius:2px;border:1px solid #425358;}';
		style += '.login .yinsheng .icon-select i{background:url(../../images/html5/icon.png) no-repeat -197px -198px;width:8px;height:7px;position:absolute;top:3px;left:3px;}';
		style += '.login .wjmm{color:#33b5e5;font-size:14px; line-height:30px; text-align:right; padding-right:4%; margin-bottom:18px;}';
		style += '.login .wjmm a{color:#33b5e5; text-decoration:underline}';
		style += '.login .loginBtn{ background:#eee; border-top:solid 1px #d8d8d8; padding:20px 0 50px;}';
		style += '.login h3{ color:#808080; font-weight:normal; font-size:14px; text-align:center; line-height:33px;}';
		style += '.login button{ width:94%; height:45px; background:#81cfec; border:0; color:#fff; font:16px/45px "微软雅黑"; display:block; margin:0px auto;}';
		style += '.login .btnzc{ background:#77c84e; margin-top:12px;}';
		style += '.login h4{ font-size:14px; font-weight:normal; line-height:35px; text-indent:6%;color:#333;}';
		style += '.login ul{width:94%; margin:0 auto 10px;; border:solid 1px #ddd; border-bottom:0;}';
		style += '.login li{ background:#fff; line-height:45px; border-bottom:solid 1px #ddd; height:45px; overflow:hidden;}';
		style += '.login li input{width:100%; color:#808080; font:14px/16px "微软雅黑"; border:0; float:left; text-indent:4%;height:45px;background:#fff;}';
		style += '.tcBG{width:100%;height:500px; background:#000;background:rgba(0,0,0,0.3);position:absolute; left:0; top:0; z-index:10;overflow:hidden}';
		style += '.loginTcBox{width:191px; overflow:hidden;margin:9% auto 0;}';
		style += '.loginTcBox .txt_spe{width:191px;float:left;background:#000;background:rgba(0,0,0,0.8); color:#fff; font-size:14px;border-top:1px solid #5e5e5e;line-height:24px;position:relative;  }';
		style += '.loginTcBox .txt_spe p{width:140px;padding:7px 10px 7px;}';
		style += '.loginTcBox .txt1{text-align:center;line-height:53px;height:53px; padding:0px;}';
		style += '.loginTcBox .refresh{ width:53px; height:63px; float:left; background:#000;background:rgba(0,0,0,0.8); margin-left:1px; position:relative;border-top:1px solid #5e5e5e}';
		style += '.icon-refresh{width:21px;height:26px;background-position:-99 -139px;margin:13px auto 0;display:block;cursor:pointer;}';
		style += '.loginTcBox .close,.loginTcBox .correct{ width:53px; height:63px; float:left; background:#000;background:rgba(0,0,0,0.8); margin-left:1px; position:relative;border-top:1px solid #5e5e5e}';
		style += '.loginTcBox .close .hx{ width: 3px;height: 16px;background: #fff;position: absolute;left: 51%;top: 37%; -webkit-transform: rotate(-45deg);-moz-transform: rotate(-45deg);-o-transform: rotate(-45deg);} ';
		style += '.loginTcBox .close .sx{ width: 16px;height: 3px;background: #fff;position: absolute;left: 39%;top: 48%;-webkit-transform: rotate(-45deg);-moz-transform: rotate(-45deg);-o-transform: rotate(-45deg);}';
		style += '.loginTcBox .correct .hx{width:3px; height:9px;background:#fff; position:absolute; left:40%; top:45%; -webkit-transform: rotate(-48deg);-moz-transform: rotate(-48deg);-o-transform: rotate(-48deg);}';
		style += '.loginTcBox .correct .sx{width:19px; height:3px;background:#fff; position:absolute; left:41%; top:45%;-webkit-transform: rotate(-47deg);-moz-transform: rotate(-47deg);-o-transform: rotate(-47deg);}';
		style += '.loginTcBox .txt_spe_close{position:absolute; width:18px;height:18px;right:1px;top:1px;cursor:pointer;}';
		style += '.loginTcBox .txt_spe_close .hx{ width:2px; height:14px; background:#fff; position:absolute; left:8px; top:2px; -webkit-transform: rotate(-45deg);-moz-transform: rotate(-45deg);-o-transform: rotate(-45deg);} ';
		style += '.loginTcBox .txt_spe_close .sx{ width:14px; height:2px; background:#fff; position:absolute; right:2px; top:8px;-webkit-transform: rotate(-45deg);-moz-transform: rotate(-45deg);-o-transform: rotate(-45deg);}';
		style += '.login-btn{background:#000;background:rgba(0,0,0,0.8); float:left;margin-top:1px;width:171px;height:60px;text-align:center;padding:5px 10px 0 10px;}';
		style += '.login-btn input .inputBtn{width:165px;height:55px;border:0;background:#7abc58;color:#fff;font:14px "微软雅黑"}';
		style += '.login-btn input{width:165px;height:55px;border:0;background:#7abc58;color:#fff;font:14px "微软雅黑"}';
		style += '.login-btn input.login-btn1{background:#7abc58 url(../../images/html5/001.png) no-repeat 104px 15px;-webkit-background-size:15% auto;text-indent:-36px;}';
		style += '.login-btn input.login-btn2{background:#7abc58 url(../../images/html5/001.png) no-repeat 104px 19px}';
		style += '.login-btn button{width:100%;height:55px;background:#77c84e;color:#fff;font-size:14px;text-align:center;line-height:44px;border:solid 1px #2F2F2F;display:block;}';
		style += '.loading{display:block;width:18px;height:18px;margin:5px auto 0}';
		style += '</style>';
		$('head').append(style);
	}
	
	login.regist = function(){
		window.location = basepath + 'register/reg.action';
	}
	
	login.login = function(){
		loader.getSetCookieFile();
		deleteCookie("cell_cookie","/");
		
		//$.data(String, 'loginstate', null);
		//loginstate = "";
		window.location = basepath + 'login/login.action';
	}
	
})()