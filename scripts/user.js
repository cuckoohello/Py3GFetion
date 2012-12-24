var user = {};

(function(){
	user.useragent = window.navigator.userAgent;
	
	user.selfCenter = function(nickName){
		
		if(typeof nickName == 'undefined'){
			nickName = '';
		}
		
		user.selfCenterHtml(nickName);
		user.getSelfInfo();
		index.hideLocationBar();
		//$("#uInfoScroll").height($("#uInfoScroll").height()+10);
	}
	
	user.selfCenterHtml = function(nickName){
		var height = index.getClientHeight();
		var uInfoHeight = height - 50;
		var thtml = '<div class="wrap"><header><a href="#" onclick="index.init();"><div class="return"></div></a><div class="header-text">个人中心</div></header>';
		thtml += '<section id="uInfoScroll"><section class="group-data user-data"><dl>';
		thtml += '<dt><div class="person_img"><a href="#"><img alt="" src="'+headURL+'"  onerror="noimage(this);"></a>';
		if(false && user.useragent.indexOf('iPhone')==-1 && user.useragent.indexOf('iPod')==-1){
			thtml += '<em class="icon icon-news3" onclick="user.updateHeadImg()"></em>';
		}
		thtml += '</div></dt><dd class="min-width"><label>姓名</label><span class="input_bk"><input type="text" id="nickname" maxlength="20" value="'+nickName+'" onchange="user.editNickname();" style="margin-top:-4px;"></span></dd>';
		thtml += '<dd class="min-width"><label>性别</label><span id="fmaleid" onclick="user.editGender(\'f\');">女&emsp;&nbsp;&emsp;</span><span class="on" id="maleid" onclick="user.editGender(\'m\');">男<em></em></span></dd>';
		thtml += '<dd><label>心情短语</label><span class="input_bk">&emsp;&emsp;<input type="text" id="impresain" maxlength="20" onchange="user.updateImpresa();" style="margin-top:-4px;"/></span></dd>';
		thtml += '<dd><label>详情资料</label><a href="#" onclick="user.loadSelfInfo();">点击编辑</a><div id="selfInfoId"></div><em class="icon icon-bj" onclick="user.selfInfo();"></em></dd>';
		thtml += '<dd><label>声音提示</label><a href="#" onclick="user.setVoiceState();"><div id="fvoice"></div></a><em class="icon icon-kq" id="voice_state_id" onclick="user.setVoiceState();"></em></dd>';
		thtml += '<dd><label>清除缓存</label><a href="#" onclick="user.clearLocalStorage();">点击清除</a><em class="icon icon-qc" onclick="user.clearLocalStorage();"></em></dd>';
		thtml += '<dd><label>意见反馈</label><a href="#" onclick="user.suggest();">点击填写</a><em class="icon icon-tx" onclick="user.suggest();"></em></dd>';
		thtml += '</dl><p class="quit" onclick="user.logout();">退出飞信</p></section></section></div><script type="text/javascript" src="'+basepath+'js/libs/setCookie.js"></script>';
		$('body').html(thtml);
		index.hideLocationBar();
		/*scroll = new iScroll('uInfoScroll', {
			hScroll:false,
			hideScrollbar:true,
			bounce:false,
			onBeforeScrollStart: function(e){
			var target = e.target;
			while (target.nodeType != 1) target = target.parentNode;
			if(target.tagName!='SELECT' && target.tagName!='OPTION' && target.tagName!='INPUT')
				e.preventDefault();
		    }
		});*/
		
		user.getInitVoiceState();
	}
	
	user.loadSelfInfo = function(){
		$("#selfInfoId").html(' <img src="../images/html5/loading.gif"/>');
		user.selfInfo();
	}
	
	user.selfInfo = function(){
		var userinfo = $.data(Object,'userinfo');
		user.selfInfoHtml(userinfo);
		window.scrollTo(0, 1);
	}
	
	user.selfInfoHtml = function(userinfo){
		var thtml = '<div class="wrap"><header><a href="#" onclick="user.selfCenter();"><div class="return"></div></a><div class="header-text">详细资料</div></header>';
		thtml += '<section><section class="group-data data"><dl>';
		var birthday = userinfo.birth;
		if(birthday != null && birthday.length > 11){
			birthday = birthday.substring(0,10);
		}else if(typeof birthday == 'undefined' || birthday == null){
			birthday = "";
		}
		thtml += '<dd><label>生日</label><span class="gray">'+birthday+'</span></dd>';
		thtml += '<dd><label>星座</label><span id="constellation">'+userinfo.constellation+'</span></dd>';
		thtml += '<dd><label>城市</label><span>'+userinfo.region+'</span></dd>';
		var bloodType = userinfo.bloodType;
		if(typeof bloodType == 'undefined' || bloodType == null || bloodType == ''){
			bloodType = "未知";
		}
		thtml += '<a href="#bt" onclick="user.selectBloodType();"><dd><label>血型</label><span class="blue" id="bloodtypeid">'+bloodType+'</span><em class="icon icon-look"></em></dd></a>';
		thtml += '</dl><div class="sever"><em class="icon icon-left"></em><em class="icon icon-right"></em></div>';
		thtml += '<dl><dd><label>飞信</label><span class="gray">'+userinfo.idFetion+'</span></dd>';
		thtml += '<dd><label>手机</label><span>'+userinfo.mobileNo+'</span></dd>';
		thtml += '<dd><label>等级</label><span>'+userinfo.scoreLevel+'级</span><label>积分</label><span>'+userinfo.scoreValue+'</span></dd>';
		thtml += '</dl><div class="modelist" style="display:none;"><ul>';
		thtml += '<li><span></span><a href="#" onclick="user.editBloodType(\'1\',\'A\');">A型</a></li>';
		thtml += '<li><span></span><a href="#" onclick="user.editBloodType(\'2\',\'B\');">B型</a></li>';
		thtml += '<li><span></span><a href="#" onclick="user.editBloodType(\'3\',\'AB\');">AB型</a></li>';
		thtml += '<li><span></span><a href="#" onclick="user.editBloodType(\'4\',\'O\');">O型</a></li></ul></div>';
		thtml += '</section></section></div>';
		$('body').html(thtml);
	}
	
	user.getSelfInfo = function(){
		$.ajax({type:'POST',url: basepath+'user/selfInfo.action'+'?t='+new Date().getTime(),
		       cache: false,
		       success: function(data){
				  if(typeof data != 'undefined' && data != null){
					  if(typeof data.userinfo != 'undefined' && data.userinfo != null){
						  $.data(Object,'userinfo',data.userinfo);
						  if(data.userinfo.nickname != ''){
							  $("#nickname").val(data.userinfo.nickname);
						  }
						  if(data.userinfo.impresa != ''){
							  $("#impresain").val(data.userinfo.impresa);
						  }
					  }
					  if(typeof data.xingbie != 'undefined' && data.xingbie != null){
						  if(data.xingbie == '女'){
							  $("#fmaleid").removeClass().addClass("on");
							  $("#fmaleid").html('女<em></em>');
							  $("#maleid").removeClass();
							  $("#maleid").html('男');
						  }else if(data.xingbie == '男'){
							  $("#fmaleid").removeClass();
							  $("#fmaleid").html('女&emsp;&nbsp;&emsp;');
							  $("#maleid").removeClass().addClass("on");
							  $("#maleid").html('男<em></em>');
						  }else{
							  $("#fmaleid").removeClass();
							  $("#fmaleid").html('女&emsp;&nbsp;&emsp;');
							  $("#maleid").removeClass();
							  $("#maleid").html('男');
						  }
					  }
				  }
	           },
	           error: function(){
	        	   
	           }
	      });
	}
	
	user.friendInfo = function(touserid, localName){
		user.friendInfoHtml(touserid, localName);
		$.ajax({type:'POST',url: basepath+'user/userInfo.action',data:{touserid:touserid},
		       cache: false,
		       success: function(data){
				  user.handleInfosHtml(data);
	           },
	           error: function(){
	        	   
	           }
        });
		window.scrollTo(0, 1);
	}
	
	user.friendInfoHtml = function(touserid, localName){
		if(typeof chat == 'undefined'){
			loader.getChatFile();
		}
		localName = localName.replace("<","&lt;");
		var thtml = '<div class="wrap"><header><a href="#" onclick="chat.init(\''+ touserid +'\',\''+localName+'\');"><div class="return"></div></a><div class="header-text">TA的资料</div></header>';
		thtml += '<div><img class="loading" src="'+basepath+'images/html5/loading.gif" /></div>';
		thtml += '<section id="userinfoDiv" style="display:none;"><section class="group-data"><dl><dt><div class="person_img"><a href="#"><img alt="" id="headurl" src="../images/html5/1.jpg" onerror="noimage(this);"></a><em class="icon icon-news2" onclick="chat.init(\''+touserid+'\',\''+localName+'\');"></em></div></dt>';
		thtml += '<dd class="min-width" id="frnickname"><b>'+localName+'</b><span id="region"></span></dd>';
		thtml += '<dd class="min-width"><span id="frimpera"></span></dd>';
		//好友
		thtml += '<div id="frinfoid" style="display:none;"><dd><strong>备注</strong><div id="frremark">无</div><strong>性别</strong><div id="frgender"></div></dd>';
		thtml += '<dd><strong>星座</strong><div id="frconstell"></div><strong>血型</strong><div id="frblood"></div></dd>';
		thtml += '<dd><strong>生日</strong><div id="frbirth"></div></dd>';
		thtml += '<dd><strong>飞信</strong><div id="frfetion"></div><strong>等级</strong><div id="frlevel"></div></dd>';
		thtml += '<dd><strong>手机</strong><div id="frmobile"></div><strong>会员</strong><div id="frvip"></div></dd></div>';
		//陌生人
		thtml += '<div id="strinfoid" style="display:none;"><dd><strong>性别</strong><div id="strgender"></div><strong>年龄</strong><div id="strage"></div></dd>';
		thtml += '<dd><strong>血型</strong><div id="strblood"></div><strong>等级</strong><div id="strlevel"></div></dd>';
		thtml += '<dd><strong>飞信</strong><div id="strfetion"></div></dd></div>';
		
		thtml += '</dl></section></section></div>';
		$('body').html(thtml);
	}
	
	user.handleInfosHtml = function(data){
		if(typeof data != 'undefined' && data != null){
			if(typeof data.headSrc != 'undefined' && data.headSrc != null && data.headSrc !=''){
				$("#headurl").attr("src",data.headSrc);
			}
			if(typeof data.friendinfo != 'undefined' && data.friendinfo != null && data.friendinfo.nickname !=''){
				data.friendinfo.nickname = data.friendinfo.nickname.replace("<","&lt;");
				$("#frnickname").html("<b>" + index.subString(data.friendinfo.nickname, 8) + "</b>");
			}
			if(typeof data.friendinfo != 'undefined' && data.friendinfo != null && data.friendinfo.impresa !=''){
				$("#frimpera").html(index.subString(data.friendinfo.impresa,16));
			}
			$('.loading').remove();
			$('#userinfoDiv').show(50);
			if(typeof data.flag != 'undefined' && data.flag != null && data.flag =='fr'){
				$("#frinfoid").show(50);
				if(typeof data.friendinfo != 'undefined' && data.friendinfo != null){
					if(data.csd != null && data.csd.localName !=''){
						data.csd.localName = data.csd.localName.replace("<","&lt;");
						$("#frremark").html(index.subString(data.csd.localName, 8));
					} else {
						$("#frremark").html('无');
					}
					var gender = '未知';
					if(data.friendinfo.gender == 1){
						gender = '男';
					}else if(data.friendinfo.gender == 2){
						gender = '女';
					}
					$("#frgender").html(gender);
					$("#frconstell").html(data.friendinfo.constellation);
					$("#frblood").html(data.friendinfo.bloodType);
					var birthday = data.friendinfo.birthday;
					if(birthday != null && birthday.length > 11){
						birthday = birthday.substring(0,10);
					}else if(typeof birthday == 'undefined' || birthday == null || birthday == ''){
						birthday = "未知";
					}
					$("#frbirth").html(birthday);
					$("#frfetion").html(data.friendinfo.idFetion);
					if(typeof data.friendinfo.scoreLevel != 'undefined' && data.friendinfo.scoreLevel != null && data.friendinfo.scoreLevel !=''){
					    $("#frlevel").html(data.friendinfo.scoreLevel+'级');
					} else {
						$("#frlevel").html('无');
					}
					var mobileno = data.friendinfo.mobileNo;
					if(typeof mobileno == 'undefined' || mobileno == null || mobileno == ''){
						mobileno = "保密";
					}
					$("#frmobile").html(mobileno);
					var services = data.friendinfo.services;
					if(typeof services == 'undefined' || services == null || services == ''){
						services = "否";
					}else if(services.indexOf("50") > -1 || services.indexOf("51") > -1 || services.indexOf("52") > -1){
						services = "是 ";
					}else {
						services = "否";
					}
					$("#frvip").html(services);
					var inner = '<div class="operate">';
					inner += '<p onclick="loader.alertDiv(\'2\', \'确定删除好友'+index.replaceStr(index.subString(data.friendinfo.nickname, 8))+'吗?\', \'user.deleteFriend('+data.friendinfo.idUser+')\', \'确定\', \'loader.closeAlertDiv()\',\'取消\');"><em class="icon icon-del"></em>删除好友</p>';
					if(typeof data.mobilePermission != 'undefined' && data.mobilePermission != null && data.mobilePermission == '保密'){
						inner += '<span id="permissionid"><p onclick="user.mobilePermissions(0, \''+data.friendinfo.idUser+'\')"><em class="icon icon-secret"></em>保密手机号</p></span>';
					}else if(typeof data.mobilePermission != 'undefined' && data.mobilePermission != null && data.mobilePermission == '公开'){
						inner += '<span id="permissionid"><p onclick="user.mobilePermissions(1, \''+data.friendinfo.idUser+'\')"><em class="icon icon-secret"></em>公开手机号</p></span>';
					}
					if(data.csd != null && typeof data.csd.isBlocked != 'undefined' && data.csd.isBlocked != null && data.csd.isBlocked == 0){
						inner += '<span id="blacklid"><p onclick="user.handleBlacklist(1, \''+data.friendinfo.idUser+'\')"><em class="icon icon-nix"></em>加黑名单</p></span>';
					}else if(data.csd != null && typeof data.csd.isBlocked != 'undefined' && data.csd.isBlocked != null && data.csd.isBlocked == 1){
						inner += '<span id="blacklid"><p onclick="user.handleBlacklist(0, \''+data.friendinfo.idUser+'\')"><em class="icon icon-nix"></em>撤黑名单</p></span>';
					}
					inner += '</div>';
//					if(data.csd != null && typeof data.csd.contactType != 'undefined' && data.csd.contactType != null && data.csd.contactType == 2){
//						inner += '<section class="addfriend" onclick="index.addFriendSubmit(\''+ data.friendinfo.idFetion +'\', \'1\',\'\', this)"><h3></h3><h4>再次加友<p><em class="sx"></em><em class="hx"></em></p></h4></section>';
//					}
					$(".group-data").append(inner);
				}
				
			}else if(typeof data.flag != 'undefined' && data.flag != null && data.flag =='str'){
				$("#strinfoid").show(50);
				if(typeof data.friendinfo != 'undefined' && data.friendinfo != null){
					var gender = '未知';
					if(data.friendinfo.gender == 1){
						gender = '男';
					}else if(data.friendinfo.gender == 2){
						gender = '女';
					}
					$("#strgender").html(gender);
					var age = data.friendinfo.age;
					if(typeof age == 'undefined' || age == null || age == 0){
						age = '未知';
					}
					$("#strage").html(age);
					$("#strblood").html(data.friendinfo.bloodType==''?'未知':data.friendinfo.bloodType);
					var level = data.friendinfo.scoreLevel;
					if(typeof level == 'undefined' || level == null || level == 0){
						$("#strlevel").html('暂无');
					} else {
						$("#strlevel").html(level+'级');
					}
					var number = data.friendinfo.idFetion;
					var type = 1;
					if(number == null || number == 0){
						number = data.friendinfo.mobileNo;
						type = 0;
					}
					$("#strfetion").html(data.friendinfo.idFetion<=0?'未知':data.friendinfo.idFetion);
					if(typeof number != 'undefined' && number != null && number != '0'){
						var inner = '<section class="addfriend" onclick="index.addFriendSubmit(\''+ number +'\', \''+type+'\',\'\', \'aa\')"><h3></h3><h4>添加好友<p><em class="sx"></em><em class="hx"></em></p></h4></section>';
						$(".group-data").append(inner);
					}
				}
			}
		}else{
			loader.alertDiv("0",'对不起，没有找到这个好友', "","","","", "left");
		}
	}
	
	user.updateHeadImg = function(){		
		var button = $('#btn_pic');
      	var uploadUrl = 'user/updateHeadImg.action';
		new AjaxUpload(button,{
			action:uploadUrl,
			name:'uploadFile',
			onChange:function(file,ext){
            
			},
			onSubmit:function(file,ext){
					if(file != null && file.length > 30){
						loader.alertDiv("0", "文件名过长，请控制在25个字符以内", "","","","", "left");
	                    return false;
					}
					if(file && /[\s\!\@\#\$\%\^\&\*\(\)\<\>\?\/\,\:\;\[\]\{\}]/.test(file)){
						loader.alertDiv("0", "文件名包含特殊字符", "","","","", "left");
						return false;
					}
	                if (ext && /^(jpg|png|jpeg|gif|bmp)$/.test(ext)){
	                	loader.alertDiv("0", "上传中，请稍候...<img src=\"../images/html5/loading.gif\" class=\"loading\">");
	                } else{
	                	loader.alertDiv("0", "请上传jpg,png,jpeg,gif,bmp格式图片", "","","","", "left");
	                    return false;
	                }
	               
			},
			onComplete:function(file,response){
//				var result = eval('('+response+')');
				loader.closeAlertDiv();
				loader.alertDiv("0",response.tip, "","","","", "left");
			}
		});
	}
	
	user.deleteFriend = function(touserid){
//		if(!window.confirm('你确认要删除这个好友吗?')){
//			return;
//		}
		$.ajax({type:'POST',url: basepath+'user/deletefriend.action'+'?t='+new Date().getTime(),data:{touserid:touserid},
  	       cache: false,
  	       async:false,
  	       success: function(data){
			if(typeof data.tip != 'undefined' && data.tip != null && data.tip != ""){
				loader.closeAlertDiv();
				loader.alertDiv("0",data.tip, "","","","", "left");
				if(data.tip.indexOf("成功") > -1){
					$.data(Array, 'main.friends.contactsgroups', null);
					main.init();
				}
			}
		   },
		   error: function(){
			   
		   }
        });
	}
	
	user.mobilePermissions = function(mobilePermission, touserid){
		$.ajax({type:'POST',url: basepath+'user/mobilePermissions.action',data:{mobilePermission:mobilePermission,touserid:touserid},
  	       cache: false,
  	       success: function(data){
			if(typeof data.tip != 'undefined' && data.tip != null && data.tip != ""){
				if(mobilePermission == '0'){
					$("#permissionid").html('<p onclick="user.mobilePermissions(1, \''+touserid+'\')"><em class="icon icon-secret"></em>公开手机号</p>');
				}else{
					$("#permissionid").html('<p onclick="user.mobilePermissions(0, \''+touserid+'\')"><em class="icon icon-secret"></em>保密手机号</p>');
				}
				loader.alertDiv("0",data.tip, "","","","", "left");
			}
		   },
		   error: function(){
			   
		   }
        });
	}
	
	user.handleBlacklist = function(handleid, touserid){
		var url = '';
		if(handleid == '1'){
			url = 'user/Addblacklist.action';
		}else{
			url = 'user/Removeblacklist.action';
		}
		$.ajax({type:'POST',url: basepath + url,data:{touserid:touserid},
  	       cache: false,
  	       async:false,
  	       success: function(data){
			if(typeof data.tip != 'undefined' && data.tip != null && data.tip != ""){
				if(handleid == '1' && data.tip.indexOf("成功") > -1){					
					$("#blacklid").html('<p onclick="user.handleBlacklist(0, \''+touserid+'\')"><em class="icon icon-nix"></em>撤黑名单</p>');
				}else if(handleid == '0' && data.tip.indexOf("成功") > -1){
					$("#blacklid").html('<p onclick="user.handleBlacklist(1, \''+touserid+'\')"><em class="icon icon-nix"></em>加黑名单</p>');
				}
				loader.alertDiv("0",data.tip, "","","","", "left");
				$.data(Array, 'main.friends.contactsgroups', null);
			}
		   },
		   error: function(){
			   
		   }
        });
	}
	
	//编辑昵称
	user.editNickname = function(){
		var nickname = $.trim($("#nickname").val());
		var csrfToken = $("#csrfToken").val();
		if(nickname == ''){
			$("#nickname").val(nickName);
			loader.alertDiv("0","昵称不能为空,请正确输入", "","","","", "left");
			return;
		}else if(nickname.length > 10){
			loader.alertDiv("0","昵称过长,请重新输入", "","","","", "left");
			$("#nickname").val(nickname.substring(0,10));
			return;
		}
    	$.ajax({type:'POST',url: basepath+'user/editNickname.action',data:{nickname:nickname,csrfToken:csrfToken},
  	       cache: false,
  	       async:false,
  	       success: function(data){
    		$("#nickname").val(nickname);
    		$("#nicknn").html(nickname);
			if(typeof data.tip != 'undefined' && data.tip != null && data.tip != ""){
				loader.alertDiv("0",data.tip, "","","","", "left");
				if(data.tip.indexOf("成功") > -1){
					nickName = nickname;
				}
			}
		   },
		   error: function(){
			   loader.alertDiv("0","输入有误,请正确输入", "","","","", "left");
		   }
        });
	}
	
	//更新心情短语
    user.updateImpresa = function(){
    	var impresa = $.trim($("#impresain").val());
    	var csrfToken = $("#csrfToken").val();
    	$.ajax({type:'POST',url: basepath+'user/editimpresaSubmit.action',data:{impresa:impresa,csrfToken:csrfToken},
  	       cache: false,
  	       async:false,
  	       success: function(){
				//$("#impresa").val(impresa);
				$("#impresain").blur();
		   },
		   error: function(){
			   loader.alertDiv("0","输入有误，请正确输入", "","","","", "left");
		   }
        });
    }
    
    user.selectBloodType = function(){
    	$(".modelist").show(200);
    }
    
    user.editBloodType = function(bid, btype){
    	$.ajax({type:'POST',url: basepath+'user/editbloodTypeSubmit.action',data:{bloodType:bid},
   	       cache: false,
   	       async:false,
   	       success: function(){
 		       $("#bloodtypeid").html(btype + '型');
 		      $(".modelist").hide();
 		   },
 		   error: function(){
 			   
 		   }
         });
    }
	
	user.editGender = function(sex){
		if(sex != 'f' && sex != 'm'){
			return;
		}
		if(sex == 'f'){
			$("#fmaleid").removeClass().addClass("on");
			$("#fmaleid").html('女<em></em>');
			$("#maleid").removeClass();
			$("#maleid").html('男');
		}else if(sex == 'm'){
			$("#fmaleid").removeClass();
			$("#fmaleid").html('女&emsp;&nbsp;&emsp;');
			$("#maleid").removeClass().addClass("on");
			$("#maleid").html('男<em></em>');
		}
		$.ajax({type:'POST',url: basepath+'user/editsexsubmit.action',data:{sex:sex},
		       cache: false,
		       success: function(data){
				  
	           },
	           error: function(){
	        	   
	           }
	      });
	}
	
	user.openWdatePicker = function(){
		if(user.useragent.indexOf('iPhone')!=-1 || user.useragent.indexOf('iPad')!=-1){
			WdatePicker({onpicked:function(){user.editBirthday();},lang:'zh-cn',skin:'whyGreen',maxDate:'%y-%M-%d',position:{left:20,top:50},isShowClear:false});
		}else{
			WdatePicker({onpicked:function(){user.editBirthday();},lang:'zh-cn',skin:'whyGreen',maxDate:'%y-%M-%d',isShowClear:false});				
		}
	}
	
	//编辑生日
	user.editBirthday = function(){
		var birthday = $("#birthday").val();
    	$.ajax({url: basepath+'user/editBirthday.action?birthday='+birthday,
  	       cache: false,
  	       success: function(data){
			if(typeof data.constellation != 'undefined' && data.constellation != null && data.constellation != ""){
				$("#constellation").html(data.constellation);
			}
		   },
		   error: function(){
			   loader.alertDiv("0","操作有误,请重新尝试", "","","","", "left");
		   }
        });
	}
	
	user.friendsCurPN = -1;
	user.friendsPgSize = 10;
	user.friendsPgNum = 1;
	
	user.queryFriendsInit = function(){
		if(typeof app == 'undefined'){
			loader.getAppFile();
		}
		var thtml = '<div class="wrap"><header><a href="#" onclick="main.init();"><div class="return"></div></a><div class="header-text">搜索好友</div></header>';
		thtml += '<div class="seach"><input type="text" placeholder="输入姓名或手机号搜索好友" class="text" id="queryKey" /><input type="button" class="btn" id="btnDivId" onclick="user.searchFriendsByQueryKey();"></div>';
		thtml += '<section class="min-height"><section class="list_spe_style"><ul class="user_sub_list user_sub_list1" id="user_sub_list">';
		
		thtml += '</ul></section><div class="not-seach">不知道搜谁?<br>看看你<a href="#" onclick="app.showRecommendBuddy()">可能认识的人</a>!</div></section></div>';
		$('body').html(thtml);
		window.scrollTo(0, 1);
	}
	
	//搜友
    user.searchFriendsByQueryKey = function(queryKey){
    	if(typeof queryKey == 'undefined' || queryKey == null || queryKey == ""){
    		queryKey = $.trim($("#queryKey").val());
    	}else{
    		$("#queryKey").val(queryKey);
    	}
    	if(typeof queryKey != 'undefined' && queryKey != null && queryKey != ""){
    		$('#user_sub_list').html('<p id="friends_loading"><img  src="../images/html5/loading.gif" class="loading"/></p>');
        	$('#btnDivId').attr("disabled", "disabled");
        	$.ajax({type:'POST',url: basepath+'index/searchFriendsByQueryKey.action',data:{queryKey:queryKey},
  	  	       cache: false,
  	  	       success: function(data){
  					if(typeof data != 'undefined' && data != null){
  						$('#user_sub_list').empty();
  						user.saveFriendsData(data);
  						$('#friends_loading').remove();
  						user.addFriends(1);
  					}else{
  						$('#user_sub_list').empty();
  						loader.alertDiv("0","没有找到满足条件的好友", "","","","", "left");
  					}
  					$('#btnDivId').removeAttr("disabled");
  			   },
  			   error: function(){
  				   $('#friends_loading').remove();
  				   $('#btnDivId').removeAttr("disabled");
  			   }
  	        });
     	}else{
     		$('.user_sub_list').empty();
     		$('#friends_con').hide();
     		$('#tipbox').show();
     		loader.alertDiv("0","请输入姓名或手机号搜索好友", "","","","", "left");
     	}
    }
    
    //缓存好友列表数据
    user.saveFriendsData = function(data){
	   if(typeof data!='undefined' && data != null){	
		   $.data(Number, 'user.friendsTotal', 0);
		   $.data(Array, 'user.friends.contacts', null);
		   if(typeof data.total != 'undefined' && data.total != null && data.total != ""){
			   $.data(Number, 'user.friendsTotal', data.total);
			   if((data.total % user.friendsPgSize) == 0){
				   user.friendsPgNum = data.total / user.friendsPgSize;
				}else{
					user.friendsPgNum = parseInt(data.total / user.friendsPgSize) + 1;
				}
		   }
		   if(data.contacts && data.contacts.length>0){
			   if($.data(Array, 'user.friends.contacts') == null){
				   $.data(Array, 'user.friends.contacts', data.contacts);
			   }else{
				   for(var i=0; i<data.contacts.length; i++){
					   $.data(Array, 'user.friends.contacts').push(data.contacts[i]);					   
				   }
			   }
		   }
	   }
    }
    
    //查询好友列表回调函数
	user.queryFriendsCallBack = function(){
	   user.friendsCurPN==-1?user.friendsCurPN=1:user.friendsCurPN++;	   
	   user.addFriends(user.friendsCurPN);
	}
    
	//添加好友列表
	user.addFriends = function(pn){		
		var data = $.data(Array, 'user.friends.contacts');
		if(data && data.length>0){
			user.friendsCurPN==-1?user.friendsCurPN=1:user.friendsCurPN=user.friendsCurPN;
			for(var i=(pn-1)*user.friendsPgSize;i<(pn*user.friendsPgSize>data.length?data.length:pn*user.friendsPgSize);i++){
				user.appendFriendList(i);
				user.changeUserImg(i);
			}
			$('#friends_loading').remove();
			$('#data_loading').remove();
			if(user.friendsCurPN < user.friendsPgNum){
				$(".input_bt").show();
				$(".show_more").show();
			}else{
				$(".show_more").hide();
			}
			
		}
	}
	
	//追加好友列表
	user.appendFriendList = function(i){
		var inner = '';
		var data = $.data(Array, 'user.friends.contacts');
		var contact = data[i];
		if(contact){
			var localName = contact.localName;
		      if(null == localName || "" == localName || typeof localName == "undefined"){
				  var idFetion = contact.idFetion;
				  if(null != idFetion && "" != idFetion && typeof idFetion != "undefined"){
					  localName = idFetion;
				  }else{
					  localName = "好友";
				  }
			  }
		      localName = localName.toString().replace("<","&lt;");
			  inner += '<li onclick="chat.init(\''+ contact.idContact +'\',\''+localName+'\');">';
			  inner += '<div class="person_img">';
			  inner += '<a id="uimg'+ contact.idContact +'" href="#ch">';
			  var headcrc = basepath+"images/html5/1.jpg";
			  var imgsrc = '';
			  imgsrc = '<img src="' + headcrc + '" alt="" onerror="noimage(this);" />';
			  inner += imgsrc+'<em class="icon icon-news2"></em></a></div>';
		      inner += '<div class="user_cont">';
		      
		      if(localName.length > 6){
				  localName = localName.substring(0, 6) + '..';
			  }
			  var relationStatus = contact.relationStatus;
			  var contactType = contact.contactType;
			  var statuStr = "";
			  var isBlacked = contact.isBlocked;
			  if(typeof isBlacked != "undefined" && isBlacked != null && isBlacked == "1"){
				  statuStr = " [黑名单]";
			  }
			  var isClosed = contact.basicServiceStatus;
			  if(typeof isClosed != "undefined" && isClosed != null && isClosed == "0"){
				  statuStr = " [关闭服务]";
			  }
			  if(typeof contactType != 'undefined' && contactType != null && contactType == "2"){
				  statuStr = " [陌生人]";
			  }else{
				  if(typeof relationStatus != 'undefined' && relationStatus != null && relationStatus == "0"){
					  statuStr = " [待验证]";
				  }else if(typeof relationStatus != 'undefined' && relationStatus != null && relationStatus == "2"){
					  statuStr = " [拒绝]";
				  }
			  }			  
			  if(statuStr != ""){
				  localName = localName + statuStr;
			  }
			  var impresa = contact.impresa;
			  if(null == impresa || typeof impresa == "undefined"){
				  impresa = "";
			  }
			  impresa = impresa.replace("<","&lt;");
			  if(impresa.length > 10){
				  impresa = impresa.substring(0, 10) + '..';
			  }
			  inner += '<p class="name">'+localName+'</p>';
			  inner += '<p class="mood">'+index.subString(impresa, 24)+'&nbsp;</p></div></li>';
			  contactType = "";
			  $('#user_sub_list').append(inner);
			  inner = '';
		   }
	}
	
	//变换真实头像
	user.changeUserImg = function(i){
		var data = $.data(Array, 'user.friends.contacts');
		var contact = data[i];
		var headcrc = basepath+"images/html5/1.jpg";
		var asrc = new Array(2);
		if(contact){
			  var presenceBasic = contact.presenceBasic;			  
			  if(typeof contact.portraitCrc != "undefined" && null != contact.portraitCrc && "" != contact.portraitCrc && "0" != contact.portraitCrc){
					var base = new Base64();
					var idContact = (contact.idContact).toString();
					var idmod1 = idContact % 100;
					var idmod2 = idContact.substring(0, 2);
					var idUser = base.encode(idContact);
					headcrc = "http\://f.10086.cn/images/im/f/" + idmod1 + "/" + idmod2 + "/" + idUser + "/60.jpg";
			  }
			  if(headcrc.indexOf("1.jpg") == -1){
				  asrc[0] = headcrc;
				  asrc[1] = '';
			  }else{
				  asrc[0] = basepath+"images/html5/1.jpg";
				  asrc[1] = '';
			  }
			  
			  user.loadRealUserImg(contact.idContact, asrc[0], asrc[1]);
		 }
		
	}
	
	user.loadRealUserImg = function(cid, visrc, viem){
		var inner = "";
		if(visrc != ""){
			inner = '<img src="' + visrc + '" alt="" onerror="noimage(this)" /><em class="icon icon-news2"></em>';
			//if(viem != ""){
			//	inner += '<em class="' + viem + '"></em>';
			//}
			$('#uimg'+cid).html(inner);
		}
	}
	
	//声音设置
	user.setVoiceState = function(){
		var vstate = $("#voice_state_id").hasClass("icon icon-kq");
		if(vstate){
			$("#voice_state_id").removeClass("icon icon-kq").addClass("icon icon-horn");
			setCookie("voice_state","off",720,"/");
			$("#fvoice").text('点击开启');
		}else{
			$("#voice_state_id").removeClass("icon icon-horn").addClass("icon icon-kq");
			setCookie("voice_state","on",720,"/");
			$("#fvoice").text('点击关闭');
		}
	}
	
	user.getInitVoiceState = function(){
		var val = getCookieValue("voice_state");
		if(val == 'off'){
			$("#voice_state_id").removeClass("icon icon-kq").addClass("icon icon-horn");
			$("#fvoice").text('点击开启');
		} else {
			$("#fvoice").text('点击关闭');
		}
	}
	
	//清除缓存
	user.clearLocalStorage = function(){
		if(window.localStorage){
//			window.localStorage.clear();
			for(var i=0; i<localStorage.length; i++){
				if(localStorage.key(i) != 'recentContact'){
					localStorage.removeItem(localStorage.key(i));
					i--;
				}
			}
			setCookie("voice_state","",720,"/");
			setCookie("audioUnread",0,720,"/");
			if(window.localStorage == null || window.localStorage.length == 0 || (window.localStorage.length==1 && localStorage.key(0)=='recentContact')){
				loader.alertDiv("0","缓存已清除", "","","","", "center");
			}
		}else{
			loader.alertDiv("0","你的浏览器暂不支持清除缓存", "","","","", "left");
		}
	}
	
	//反馈
	user.suggest = function(){
		var thtml = '<div class="wrap"><header><a href="#" onclick="user.selfCenter();"><div class="return"></div></a><div class="header-text">意见反馈</div></header>';
		thtml += '<section><section class="report"><textarea name="suggestContent" id="suggestContent" cols="" rows="" placeholder="请输入你的宝贵意见" maxlength="200"></textarea>';
		thtml += '<button onclick="user.suggestSubmit();">提交</button></section></section></div>';
		$('body').html(thtml);
		window.scrollTo(0, 1);
	}
	
	user.suggestSubmit = function(){
		var suggestContent  = $.trim($("#suggestContent").val());
		if(suggestContent == ""){
			loader.alertDiv("0","请输入你的宝贵意见", "","","","", "left");
//			$("#suggestContent").focus();
			return;
		}else if(suggestContent.length < 5){
			loader.alertDiv("0","多写点吧，5个字以上", "","","","", "left");
//			$("#suggestContent").focus();
			return;
		}else if(suggestContent.length > 200){
			loader.alertDiv("0","请将你的意见控制在200字以内", "","","","", "left");
//			$("#suggestContent").focus();
			return;
		}
		$.ajax({type:'POST',url: basepath+'index/suggestSubmit.action',data:{suggestContent:suggestContent},
  	       cache: false,
  	       success: function(data){
			if(typeof data.tip != 'undefined' && data.tip != null && data.tip != ""){
				loader.alertDiv("4",data.tip, "","","","", "");
				$("#suggestContent").val('');
			}
		   },
		   error: function(){
			   loader.alertDiv("0","操作有误,请重新尝试", "","","","", "left");
		   }
        });
	}
	
	//退出飞信
	user.logout = function(){
	   	user.alertDiv('2','退出3G飞信?','user.logoutSubmit()','确定','user.closeAlertDiv()','取消', 'center');	   	
	}
	
	user.logoutSubmit = function(){
		$("#logout_txt").html('&nbsp;<img src="../images/html5/loading.gif"/>');
	    $.ajax({type:'POST',url: basepath+'index/logoutsubmit.action'+'?t='+new Date().getTime(),
  	       cache: false,
  	       success: function(){
	    	  deleteCookie("cell_cookie","/");
	    	  window.location = basepath + 'login/login.action?type=logout';
		   },
		   error: function(){
			   
		   },
        });
	}
	
	user.alertDiv = function(type, content, btn1Act, btn1Content, btn2Act, btn2Content, align){
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
		ahtml += '<div class="txt_spe"><p>'+content+'<a id="logout_txt"></a></p>';	
		
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
	
    user.closeAlertDiv = function(divid){
		if(typeof divid == 'undefined' || divid == ''){
			divid = 'tcBGid';
		}
		$("#" + divid).remove();
	}
})()