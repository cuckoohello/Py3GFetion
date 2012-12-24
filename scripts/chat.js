var chat = {};

(function(){
	chat.toiduser = 0;	
	chat.sendFileUrl = '';
	chat.hdsUrl = '';
	chat.fsid = '';
	chat.touri = '';
	chat.tsid = '';
	upload_count = 0;
	chat.offine = '';
	chat.userCarrier = '';
	chat.toCarrier = '';
	
	//入口
	chat.init = function(toidUser, localName, where){		
		chat.toiduser = toidUser;
		chat.appendHtml(toidUser, localName, where);
		if(typeof main == 'undefined'){
			loader.getMainFile();
		}
		if(typeof user == 'undefined'){
			loader.getUserFile();
		}
		if(getListMsgType == 'ws' && typeof ws == 'undefined'){
			loader.getWsFile();
		}
		setTimeout('chat.getFriendInfos('+toidUser+')', 500);
		var chats11 = $.data(Array, 'listChatmsg_new_'+toidUser);
		if(typeof chats11 != "undefined" && chats11 != null && chats11.length > 0){
			index.messagenum = index.messagenum - chats11.length;
			index.h5total_size = index.h5total_size - chats11.length;
			var idMsgs = new Array();
			var inner = '';
			for(var i = 0;i < chats11.length;i++){
				if(typeof chats11[i].message == 'undefined' || typeof chats11[i].sendTime == 'undefined'){
					continue;
				}
//				chats11[i].message = chats11[i].message.replace(/&amp;/g,"&");
//				var tlen = chats11[i].sendTime.length;
//				inner += '<li>'+face.filterFaceImg(chats11[i].message)+'<em></em><div class="time">'+chats11[i].sendTime.substring(tlen-8,tlen-3)+'</div></li>';
				idMsgs.push(chats11[i].idMessage);
			}
//			$('#chat_info2').append(inner);
			//标读新消息
			if(idMsgs != null && idMsgs.length > 0){
				if(typeof index == 'undefined'){
					loader.getIndexFile();
				}
				if(getListMsgType != 'ws'){
					index.removeMessagesEventListener();
				}
				try{
					//同步分开执行
					if(idMsgs.length <= 50){
						chat.queryNewMsg(idMsgs.toString());
					}else{
						for(var len=0;len < idMsgs.length;len+=49){
							if(len+49 >= idMsgs.length){
								chat.queryNewMsg(idMsgs.slice(len,idMsgs.length-1).toString());
							}else{
								chat.queryNewMsg(idMsgs.slice(len,len+49).toString());
							}
						}
					}
					idMsgs = new Array();
				}catch(e){
					
				}
				if(getListMsgType != 'ws'){
					index.addMessagesEventListener();
				}
			}
//			$("#chat_info2").scrollTop(10000);
			chat.saveChatMsgLx(toidUser, chats11);
			$.data(Array, 'listChatmsg_new_'+toidUser, null);
		}
		index.fromIdUsers = index.fromIdUsers.replace(","+toidUser,"");
		chat.msgPerPage = 10;
		var listChatRecord = $.data(Array, 'listChatmsg_'+toidUser);
		if(typeof listChatRecord != "undefined" && listChatRecord != null && listChatRecord.length > 0){
			chat.msgCurHisMsg = listChatRecord.length;
			var inner = '';
			for(var i = (listChatRecord.length<=chat.msgPerPage?0:listChatRecord.length-chat.msgPerPage);i < listChatRecord.length;i++){
				if(typeof listChatRecord[i].message == 'undefined' || listChatRecord[i].message == null || typeof listChatRecord[i].sendTime == 'undefined'){
					continue;
				}
				listChatRecord[i].message = listChatRecord[i].message.replace(/&amp;/g,"&");
				var tlen = listChatRecord[i].sendTime.length;
//				inner += '<li>'+listChatRecord[i].message+'<em></em><div class="time">'+listChatRecord[i].sendTime.substring(tlen-8,tlen-3)+'</div></li>';
				var stime = listChatRecord[i].sendTime;
				if(tlen > 10){
					stime = stime.substring(tlen-8,tlen-3);
				}
				if(listChatRecord[i].fromIdUser == toidUser){
					inner += '<li>'+face.filterFaceImg(listChatRecord[i].message)+'<em></em><div class="time">'+stime+'</div></li>';
				}else{
					inner += '<li class="fan">'+face.filterFaceImg(listChatRecord[i].message)+'<em></em><div class="time">'+stime+'</div></li>';
				}
				chat.msgCurHisMsg--;
			}
			$('#chat_info2').append(inner);
//			$("#chat_info2").scrollTop(10000);
		}else{
			chat.msgCurHisMsg = 0;
		}
		scroll = new iScroll('chatListScroll', {hScroll:false, hideScrollbar:true,
			onScrollEnd: function(){
				if(this.y == 0){
					chat.showMoreHisMsg(toidUser);
				}
			}
		});
		scroll.refresh();
		if(scroll.maxScrollY < 0){
			scroll.scrollToElement(chat.getLastListMsg());
		}
		if(typeof index == 'undefined'){
			loader.getIndexFile();
		}
		index.hideLocationBar();
		var useragent = window.navigator.userAgent;
		if(false && useragent.indexOf('iPhone')==-1 && useragent.indexOf('iPod')==-1){
			$("#chatListScroll").height($("#chatListScroll").height()-20);
		}else{
			$("#chatListScroll").height($("#chatListScroll").height()+60);
		}
//		chat.queryRecentMsg();
		
		//如果为轮询方式，获取聊天记录
		if(getListMsgType == 'lx'){
//			chat.queryNewMsg();
//			chat.addQueryNewMsgEventListener();
		}
		
	}
	
	//显示更多历史聊天记录
	chat.showMoreHisMsg = function(toidUser){
		if(chat.msgCurHisMsg == 0){
			return;
		}
		var listChatRecord = $.data(Array, 'listChatmsg_'+toidUser);
		
		var listMoreHisEnd = 0; 
		if(chat.msgCurHisMsg-chat.msgPerPage > 0){
			listMoreHisEnd = chat.msgCurHisMsg-chat.msgPerPage;
		}
		var mHisMsg = new Array();
		for(var i=chat.msgCurHisMsg-1; i>=listMoreHisEnd; i--){
			mHisMsg.push(listChatRecord[i]);			
			chat.msgCurHisMsg--;			
		}
		chat.showOtherMsg(mHisMsg);
	}
	
	chat.showOtherMsg = function(cmsg){
		var addListGmsg = null;

		if(!(cmsg instanceof Array)){
			addListGmsg = new Array();
			addListGmsg.push(cmsg);
		}else{
			addListGmsg = cmsg;
		}
		if(addListGmsg.length>0){
			for(var i=0; i<addListGmsg.length; i++){
				var inner = '';
				addListGmsg[i].message = addListGmsg[i].message.replace(/&amp;/g,"&");
				var tlen = addListGmsg[i].sendTime.length;
				var stime = addListGmsg[i].sendTime;
				if(tlen > 10){
					stime = stime.substring(tlen-8,tlen-3);
				}
				if(addListGmsg[i].fromIdUser == chat.toiduser){
					inner += '<li>'+face.filterFaceImg(addListGmsg[i].message)+'<em></em><div class="time">'+stime+'</div></li>';
				}else{
					inner += '<li class="fan">'+face.filterFaceImg(addListGmsg[i].message)+'<em></em><div class="time">'+stime+'</div></li>';
				}
				$('#chat_info2').prepend(inner);
			}
		}
		scroll.refresh();
	}
	
	//页面
	chat.appendHtml = function(toidUser, localName, where){
		var height = index.getClientHeight();
		var chatlistHeight = height - 130;
		localName = localName.replace("<","&lt;");
		
		var clickMethod = "main.init()";
		if(where == 'main'){
			clickMethod = "index.init()";
		}
		
		var thtml = '<div class="wrap"><header><a href="#" onclick="'+clickMethod+';"><div class="return"></div></a><div class="header-text">'+index.subString(localName, 12)+'</div><a href="#" onclick="user.friendInfo(\''+toidUser+'\', \''+localName+'\');"><div class="Awrite"></div></a></header><div id="addFrTip" style="width:100%;height:14px;font-size:12px;background:#FFF9C5;display:none;"></div>';
		thtml += '<section ><section id="chatListScroll" style="height:'+chatlistHeight+'px;" class="AduihuaList"><ul id="chat_info2" ></ul></section><section class="sendtxt">';
		thtml += '<div class="sendTips none" id="sendSelectsId" onclick="chat.showSendSelects();"><ul>';
		thtml += '<li id="gChatShowFace" onclick="chat.showFaces()"><img src="'+basepath+'images/html5/003_on.png" width="25"/>表情</li>';
		thtml += '<li onclick="chat.modifySendType(\'2\');"><img src="'+basepath+'images/html5/004.png" id="sendSMSId" width="25"/>发短信</li>';
		var useragent = window.navigator.userAgent;
		if(false && useragent.indexOf('iPhone')==-1 && useragent.indexOf('iPod')==-1){
			thtml += '<li id="btn_pic" onclick="chat.uploadPic(\''+toidUser+'\');"><img src="'+basepath+'images/html5/005.png" width="25"/>传图片</li>';
			thtml += '<li id="btn_file" onclick="chat.uploadFile();"><img src="'+basepath+'images/html5/006.png" width="25"/>传文件</li>';
		}
		thtml += '</ul><div class="sendJiao"></div></div><div id="faces"></div>';
		thtml += '<div class="sendBox"><div class="sendSlect1" id="sendSlect1" onclick="chat.showSendSelects();"></div><input type="text" id="msg" maxlength="1000" onblur="chat.scrollTop();" /><div class="sendbotton"><button onclick="chat.submitChat(\''+localName+'\');">发送</button></div></div>';
		thtml += '<input type="hidden" id="sendType" value="msg"/></section></section></div><script type="text/javascript" src="'+basepath+'js/html5/face.js"></script><script type="text/javascript" src="'+basepath+'js/html5/common.js"></script>';
		
		$('body').html(thtml);
		
	}
	
	//获取最后一条聊天记录
	chat.getLastListMsg = function(){
		var ulCmsg = document.getElementById('chat_info2');
		var liCmsg = ulCmsg.getElementsByTagName('li');
		return liCmsg[liCmsg.length-1];
	}
	
	//获取好友信息
	chat.getFriendInfos = function(toidUser){
		$.ajax({type:'POST',url: basepath+'chat/toChatMsg.action'+'?t='+new Date().getTime(),data:{touserid:toidUser},
			   dataType: 'json',
		       cache: false,
		       success: function(data){
					if(typeof data != 'undefined' && data != null){
						if(data.blocked == 'Y'){
							$("#sendSelectsId").remove();
							$("#msg").attr("readonly","readonly");
							$(".sendbotton").html("<button>发送</button>");
//							$('.sendtxt').hide();
						}
						chat.sendFileUrl = data.sendFileUrl;
						chat.hdsUrl = data.hdsUrl;
						chat.fsid = data.fsid;
						chat.touri = data.touri;
						chat.tsid = data.tsid;
						if(data.isStranger == "Y" && chat.tsid != '' && chat.tsid != '0'){
							var atype = '1';
							if(chat.tsid.length == 11){
								atype = '0';
							}
							$("#addFrTip").html('对方还不是你的好友，你可以<a href="#ad" onclick="index.addFriendSubmit('+chat.tsid+','+atype+',\'\',\'\')" style="color:blue; text-decoration:underline;">添加对方为好友</a>');
							$("#addFrTip").show();
						}
						if(data.isBlack == "Y"){
							$("#addFrTip").html('对方在你的黑名单中，不能会话。<a href="#ad" onclick="user.handleBlacklist(0, \''+toidUser+'\');" style="color:blue; text-decoration:underline;">撤销黑名单</a>');
							$("#addFrTip").show();
						}
						chat.offine = data.offine;
						chat.userCarrier = data.userCarrier;
						chat.toCarrier = data.toCarrier;
						if((chat.offine != "" && chat.offine == "0") || chat.userCarrier != "CMCC" || chat.toCarrier != "CMCC"){
							$("#sendSMSId").attr("src",basepath+"images/html5/004_off.png");
						}
						
						if(typeof data.tip != "undefined" && data.tip != null && data.tip != ''){
							loader.alertDiv("0",data.tip, "","","","", "");
						}
					}
	           },
	           error: function(){
	        	   
	           }
	      });
	}
	
	chat.showFaces = function(){
		face.showFace('faces');
	}
	
	//验证发送消息
	chat.submitChat = function(nickname){
		var msg = $.trim($("#msg").val());
		if(msg == ""){
			loader.alertDiv("0","消息不能为空,请正确输入消息内容", "","","","", "");
			return;
		}else if(msg.length > 1000){
			loader.alertDiv("0","消息过长,请重新输入消息内容", "","","","", "left");
			return;
		}
		var stype = $("#sendType").val();
		if(stype == "short"){
			chat.sendShortMessage(nickname);
		}else{
			chat.sendMessage(nickname);
		}
		
	}
	
	//显示发送项目
	chat.showSendSelects = function(){
		if($("#sendSlect1").hasClass('sendSlect')){
			$("#sendSlect1").removeClass("sendSlect").addClass("sendSlect1");
			$("#sendSelectsId").hide(200);
		}else{
			$("#sendSlect1").removeClass("sendSlect1").addClass("sendSlect");
			$("#sendSelectsId").show(200);
		}
	}
	
	//发短信时
	chat.modifySendType = function(type){
		if((chat.offine != "" && chat.offine == "0") || chat.userCarrier != "CMCC" || chat.toCarrier != "CMCC"){
			return;
		}
		if(type == '2'){
			$("#sendType").val("short");
			$("#msg").attr("placeholder", "免费短信发送");
		}else{
			$("#sendType").val("msg");
			$("#msg").attr("placeholder", "");
		}
	}
	
	//页面显示即时发送的消息
	chat.sendMessage = function(nickname){
		var msg = $('#msg').val();
		var touserid = chat.toiduser;
		if(msg != ''){
			msg = msg.replace(/</g,"&lt;");
//			var html_msg = filter_facepath(msg);
//			var code_msg = filter_facecode(msg);
			msg = msg.replace(/&lt;/g,"<");
			chat.saveChatData(touserid, msg);
			var mm = chat.initMessage(idUser, touserid, face.filterSendMsg(msg), common.getTime());
			chat.saveChatMsgs(touserid, mm);
			var inner = '<li class="fan">'+face.filterFaceImg(face.filterSendMsg(msg))+'<em></em><div class="time">'+common.getTime()+'</div></li>';
			$('#chat_info2').append(inner);
//			$("#chat_info2").scrollTop(10000);
			scroll.refresh();
			if(scroll.maxScrollY < 0){
				scroll.scrollToElement(chat.getLastListMsg());
			}
		}
		$('#msg').val('');
		//setTimeout( function(){ window.scrollTo(0, 1); }, 0 );
		index.saveLocalRecentContact({fromIdUser:touserid, fromNickname:nickname, message:('→'+msg), sendtime:common.getFullTime()});
	}
	
	//文件传输
	chat.sendUpload = function(url){
		var touserid = chat.toiduser;
		chat.saveChatData(touserid, url);
		var mm = chat.initMessage(idUser, touserid, url, common.getTime());
		chat.saveChatMsgs(touserid, mm);
		var inner = '<li class="fan"><a href="'+url+'"></a><em></em><div class="time">'+common.getTime()+'</div></li>';
		$('#chat_info2').append(inner);
//		$("#chat_info2").scrollTop(10000);
		scroll.refresh();
		if(scroll.maxScrollY < 0){
			scroll.scrollToElement(chat.getLastListMsg());
		}
		//setTimeout( function(){ window.scrollTo(0, 1); }, 0 );
	}
	
	//消息实例
	chat.initMessage = function(toIdUser,fromIdUser,msg,sendtime){
		var msg1 = {};
		msg1.toIdUser = fromIdUser;
		msg1.fromIdUser = toIdUser;
		msg1.message = msg;
		if(typeof sendtime == 'undefined'){
			var date = new Date();
			var hour = date.getHours();
			var minute = date.getMinutes();
			msg1.sendTime = (hour>=10?hour:('0'+hour))+':'+(minute>=10?minute:('0'+minute));
		}else{
			msg1.sendTime = sendtime;
		}
		return msg1;
	}
	
	//消息发送
	chat.saveChatData = function(touserid, msg){
		var csrfToken = $("#csrfToken").val();
		$.ajax({type:'POST',url: basepath+'chat/sendNewMsg.action',data:{touserid:touserid,msg:face.filterSendMsg(msg),csrfToken:csrfToken},
  	       cache: false,
  	       success: function(data){
			 if(data != null && data.sendCode == 'false' && data.info != ''){
				 var inner = '<li class="fan">'+face.filterFaceImg(data.info)+'<em></em><div class="time">'+common.getTime()+'</div></li>';
				 $('#chat_info2').append(inner);
				 scroll.refresh();
				 if(scroll.maxScrollY < 0){
					scroll.scrollToElement(chat.getLastListMsg());
				 }
			 }
		   },
		   error: function(){
			   var inner = '<li class="fan">"'+face.filterFaceImg(msg)+'"消息发送失败<em></em><div class="time">'+common.getTime()+'</div></li>';
			   $('#chat_info2').append(inner);
			   scroll.refresh();
			   if(scroll.maxScrollY < 0){
				  scroll.scrollToElement(chat.getLastListMsg());
			   }
		   },		   
        });
	}
	
	//页面显示即时发送的短信
	chat.sendShortMessage = function(nickname){
		var msg = $('#msg').val();
		var touserid = chat.toiduser;
		if(msg != ''){
			chat.modifySendType('1');
			msg = msg.replace(/</g,"&lt;");
//			var html_msg = filter_facepath(msg);
//			var code_msg = filter_facecode(msg);
			msg = msg.replace(/&lt;/g,"<");
			chat.saveShortChatData(touserid, msg);
			var mm = chat.initMessage(idUser, touserid, face.filterSendMsg(msg), common.getTime());
			chat.saveChatMsgs(touserid, mm);
			var inner = '<li class="fan">'+face.filterFaceImg(face.filterSendMsg(msg))+'<em></em><div class="time">'+common.getTime()+'</div></li>';
			$('#chat_info2').append(inner);
//			$("#chat_info2").scrollTop(10000);
			scroll.refresh();
			if(scroll.maxScrollY < 0){
				scroll.scrollToElement(chat.getLastListMsg());
			}
		}
		$('#msg').val('');
		//setTimeout( function(){ window.scrollTo(0, 1); }, 0 );
		index.saveLocalRecentContact({fromIdUser:touserid, fromNickname:nickname, message:('→'+msg), sendtime:common.getFullTime()});
	}
	
	//文件发送
	chat.saveUploadData = function(touserid, msg, type,filename){
		var csrfToken = $("#csrfToken").val();
		$.ajax({type:'POST',url: basepath+'chat/sendUploadMsg.action'+'?t='+new Date().getTime(),data:{touserid:touserid,url:msg,type:type,filename:filename,csrfToken:csrfToken},
  	       cache: false,
  	       success: function(){
			 if(data != null && data.sendCode == 'false' && data.info != ''){
				 var inner = '<li class="fan">'+data.info+'<em></em><div class="time">'+common.getTime()+'</div></li>';
				 $('#chat_info2').append(inner);
				 scroll.refresh();
				 if(scroll.maxScrollY < 0){
					scroll.scrollToElement(chat.getLastListMsg());
				 }
			 }
		   },
		   error: function(){
			   var inner = '<li class="fan">文件发送失败<em></em><div class="time">'+common.getTime()+'</div></li>';
			   $('#chat_info2').append(inner);
			   scroll.refresh();
			   if(scroll.maxScrollY < 0){
				  scroll.scrollToElement(chat.getLastListMsg());
			   }
		   }
        });
		
	}
	
	//短信发送
	chat.saveShortChatData = function(touserid, msg){
		var csrfToken = $("#csrfToken").val();
		$.ajax({type:'POST',url: basepath+'chat/sendNewShortMsg.action'+'?t='+new Date().getTime(),data:{touserid:touserid,msg:face.filterSendMsg(msg),csrfToken:csrfToken},
  	       cache: false,
  	       success: function(data){
			 if(data != null && data.sendCode == 'false' && data.info != ''){
				 var inner = '<li class="fan">'+face.filterFaceImg(data.info)+'<em></em><div class="time">'+common.getTime()+'</div></li>';
				 $('#chat_info2').append(inner);
				 scroll.refresh();
				 if(scroll.maxScrollY < 0){
					scroll.scrollToElement(chat.getLastListMsg());
				 }
			 }
		   },
		   error: function(){
			   var inner = '<li class="fan">"'+face.filterFaceImg(msg)+'"短信发送失败<em></em><div class="time">'+common.getTime()+'</div></li>';
			   $('#chat_info2').append(inner);
			   scroll.refresh();
			   if(scroll.maxScrollY < 0){
				  scroll.scrollToElement(chat.getLastListMsg());
			   }
		   }
        });
		
	}
	
	//标读新消息
	chat.queryNewMsg = function(idcmsgs){
//		if($('#chat_info2').length == 0){
//			chat.removeQueryNewMsgEventListener();
//			return;
//		}
//		var touserid = chat.toiduser;
		$.ajax({url: basepath+'chat/queryNewMsg.action'+'?t='+new Date().getTime(),data:{idMsgs:idcmsgs,t:new Date().getTime()},
  	       cache: false,
  	       async:false,
  	       success: function(data){
//				if(typeof data == "undefined" || data == null || data.length == 0){
//					return;
//				}
//				chat.saveChatMsgLx(touserid, data);
//				var inner = '';
//				for(var i = 0;i < data.length;i++){
//					if(typeof data[i].message == 'undefined' || typeof data[i].sendTime == 'undefined'){
//						continue;
//					}
//					data[i].message = data[i].message.replace(/&amp;/g,"&");
//					var tlen = data[i].sendTime.length;
//					inner += '<li>'+data[i].message+'<em></em><div class="time">'+data[i].sendTime.substring(tlen-8,tlen-3)+'</div></li>';
//				}
//				$('#chat_info2').append(inner);
//				$("#chat_info2").scrollTop(10000);
		   },
		   error: function(){
			   
		   }
        });
	}
	
	//获取最近消息
	chat.queryRecentMsg = function(){
		var touserid = chat.toiduser;
		$.ajax({url: basepath+'chat/queryRecentMsg.action?fromUrl=&touserid='+touserid,
  	       cache: false,
  	       success: function(data){
				if(typeof data == "undefined" || data == null || data.length == 0){
					return;
				}
				chat.saveChatMsgLx(touserid, data, 'recent');
				var inner = '';
				for(var i = 0;i < data.length;i++){
					if(typeof data[i].message == 'undefined' || typeof data[i].sendTime == 'undefined'){
						continue;
					}					
					inner = chat.showRecentMsgs(data[i]);
				}
				$('#chat_info2').append(inner);
				$("#chat_info2").scrollTop(10000);
		   },
		   error: function(){
			   
		   }
        });
	}
	
	//显示消息
	chat.showRecentMsgs = function(mesages){
		mesages.message = mesages.message.replace(/&amp;/g,"&");
		var tlen = mesages.sendTime.length;
		var inner = '';
		if(mesages.fromIdUser == chat.toiduser){						
			inner += '<li>'+mesages.message+'<em></em><div class="time">'+mesages.sendTime.substring(tlen-8,tlen-3)+'</div></li>';
		}else{
			inner += '<li class="fan">'+mesages.message+'<em></em><div class="time">'+mesages.sendTime.substring(tlen-8,tlen-3)+'</div></li>';
		}
		return inner;
	}
	
	//缓存即时发送的消息
	chat.saveChatMsgs = function(fidUser, msg){
		var listMsg = $.data(Array, 'listChatmsg_'+fidUser);
		if(typeof listMsg == 'undefined' || listMsg == null){
			listMsg = new Array();
		}		
		listMsg.push(msg);
		$.data(Array, 'listChatmsg_'+fidUser, listMsg);
	}
	
	//缓存新消息
	chat.saveNewChatMsgs = function(fidUser, msg){
		var listMsg = $.data(Array, 'listChatmsg_new_'+fidUser);
		if(typeof listMsg == 'undefined' || listMsg == null){
			listMsg = new Array();
		}		
		listMsg.push(msg);
		$.data(Array, 'listChatmsg_new_'+fidUser, listMsg);
	}
	
	//缓存新消息
	chat.saveNewChatMsgLx = function(fidUser, listMsg){
		if(typeof listMsg != 'undefined' && listMsg.length > 0){
			if($.data(Array, 'listChatmsg_new_'+fidUser)==null){
				$.data(Array, 'listChatmsg_new_'+fidUser, listMsg);
			}else{
				$.data(Array, 'listChatmsg_new_'+fidUser, $.data(Array, 'listChatmsg_new_'+fidUser).concat(listMsg));
			}
		}
	}
	
	//缓存历史消息
	chat.saveChatMsgLx = function(fidUser, listMsg){
		if(typeof listMsg != 'undefined' && listMsg.length > 0){
			if($.data(Array, 'listChatmsg_'+fidUser)==null){
				$.data(Array, 'listChatmsg_'+fidUser, listMsg);
			}else{
				$.data(Array, 'listChatmsg_'+fidUser, $.data(Array, 'listChatmsg_'+fidUser).concat(listMsg));
			}
		}
	}
	
	//使用AjaxUpload发送文件
	chat.uploadFile = function(touserid){
      	var button = $('#btn_file');
      	var hdsUrl = chat.hdsUrl + '?vt=im5&act=file&st=1&touserid='+touserid+'&fsid='+chat.fsid+'&toUri='+chat.touri+'&tsid='+chat.tsid;
      	var uploadUrl = chat.sendFileUrl + '?vt=im5&act=file&st=1&touserid='+touserid+'&fsid='+chat.fsid;
      	var hdsResult = false;
		new AjaxUpload(button,{
		action:uploadUrl,
		name:'uploadFile',
		onChange:function(file,ext){
			$("#btn_pic").click();
            $("#btn_file").click();
		},
		onSubmit:function(file,ext){
            	upload_count = upload_count + 1;
				var upload_id = 'upload'+upload_count;
				if(file != null && file.length > 30){
					var inner = '<div id="'+upload_id+'" class="self">文件名过长，请控制在25个字符以内<em></em></div>';
                	$('.chat_info2').append(inner);
                	$("#btn_pic").click();
                	$("#btn_file").click();
                    return false;
				}
				if(file && /[\s\!\@\#\$\%\^\&\*\(\)\<\>\?\/\,\:\;\[\]\{\}]/.test(file)){
					var inner = '<div id="'+upload_id+'" class="self">文件名包含特殊字符<em></em></div>';
                	$('.chat_info2').append(inner);
                	$("#btn_pic").click();	
                	$("#btn_file").click();
                	return false;
				}
                if (ext && /^(jpg|png|jpeg|gif|bmp|mp3|wma|wav|mid|ogg|mp4|3gp|mpg|avi|wmv|flv|swf|rmvb|flv|apk|sis|sisx|jar|jad|rar|zip|txt|doc|docx|xls|xlsx|ppt|pptx)$/.test(ext)){
                	var inner = '<div id="'+upload_id+'" class="self">正在上传文件..<em></em></div>';
                	$('.chat_info2').append(inner);
                	$("#btn_pic").click();	
                	$("#btn_file").click();
                } else {
                	var inner = '<div id="'+upload_id+'" class="self">不支持的文件类型<em></em></div>';
                	$('.chat_info2').append(inner);	
                	$("#btn_pic").click();
                	$("#btn_file").click();
                    return false;               
                }
                var tempUrl = uploadUrl;
                var timestamp = (new Date()).valueOf();
                $.ajax({
                	url:basepath+'chat/checkFileSupport.action?touserid='+touserid+'&t='+timestamp,
                	async:false,
                	success:function(response){
                	//alert(response.info);
                		 if(response.info !='failure'){
                		 	tempUrl = hdsUrl;
                		 	hdsResult =true;
                		 }
                	},
                });
                //alert(tempUrl);
                      this._settings.action = tempUrl;
		},
		onComplete:function(file,response){
			var result = eval('('+response+')');
			if(result.responseCode == 200){
				filepath = result.content;
				filename = result.filename;							
				var toid = touserid;	
				if(hdsResult != true)		
					chat.saveUploadData(toid,filepath,'file',filename);
					
				if(filename != null && filename.length > 14 && filename.lastIndexOf(".") > -1){
					var stmp = filename.substring(filename.lastIndexOf("."));
					filename = filename.substring(0, 14 - stmp.length) + "…" + stmp;
				}
				
				var tonickname = '${tonickname}';
				tonickname = tonickname.replace(/</g,"&lt;");
				$('#upload'+upload_count).html('发送了文件“<a href="'+filepath+'" class="a_blue" target="_blank">'+filename+'</a>”给['+tonickname+']<time>('+common.getTime()+')</time><em></em>');
			}else{
				$('#upload'+upload_count).html(result.content+'<time>('+common.getTime()+')</time><em></em>');
			}
			$("#btn_pic").click();
			$("#btn_file").click();
		}
	});
   	}
	
	//使用AjaxUpload发送图片
   	chat.uploadPic = function(touserid){
      	var button = $('#btn_pic');
      	var hdsUrl = chat.hdsUrl + '?vt=im5&act=img&st=1&touserid='+touserid+'&fsid='+chat.fsid+'&toUri='+chat.touri+'&tsid='+chat.tsid;
      	var uploadUrl = chat.sendFileUrl + '?vt=im5&act=img&st=1&touserid='+touserid+'&fsid='+chat.fsid;
      	var hdsResult = false;
		new AjaxUpload(button,{
			action:uploadUrl,
			name:'uploadFile',
			onChange:function(file,ext){
	            $("#btn_pic").click();
	            $("#btn_file").click();
			},
			onSubmit:function(file,ext){							
	            	upload_count = upload_count+1;
					var upload_id = 'upload'+upload_count;
					if(file != null && file.length > 30){
						var inner = '<div id="'+upload_id+'" class="self">文件名过长，请控制在25个字符以内<em></em></div>';
	                	$('.chat_info2').append(inner);
						$("#btn_pic").click();
						$("#btn_file").click();
	                    return false;
					}
					if(file && /[\s\!\@\#\$\%\^\&\*\(\)\<\>\?\/\,\:\;\[\]\{\}]/.test(file)){
						var inner = '<div id="'+upload_id+'" class="self">文件名包含特殊字符<em></em></div>';
	                	$('.chat_info2').append(inner);
	                	$("#btn_pic").click();
	                	$("#btn_file").click();
						return false;
					}
	                if (ext && /^(jpg|png|jpeg|gif|bmp)$/.test(ext)){
	                	var inner = '<div id="'+upload_id+'" class="self">正在上传图片..<em></em></div>';
	                	$('.chat_info2').append(inner);
	                	$("#btn_pic").click();	
	                	$("#btn_file").click();
	                } else{
	                	var inner = '<div id="'+upload_id+'" class="self">请上传jpg,png,jpeg,gif,bmp格式图片<em></em></div>';
	                	$('.chat_info2').append(inner);	
						$("#btn_pic").click();
						$("#btn_file").click();		                    
	                    return false;               
	                }
	                var tempUrl = uploadUrl;
	                var timestamp = (new Date()).valueOf();
	                $.ajax({
	                	url:basepath+'chat/checkFileSupport.action?touserid='+touserid+'&t='+timestamp,
	                	async:false,
	                	success:function(response){
	                                               //alert(response.info);
	                		 if(response.info !='failure'){
	                		 	tempUrl = hdsUrl;
	                		 	hdsResult = true;
	                		 }
	                	},
	                });
	                      //alert(tempUrl);
	                      this._settings.action = tempUrl;
			},
			onComplete:function(file,response){
				var result = eval('('+response+')');
				if(result.responseCode == 200){
					$('#upload'+upload_count).html('<img src="'+result.content+'" onload="DrawImage(this,100,160);"/><br/><time>('+common.getTime()+')</time><em></em>');
					var toid = touserid;
					if(hdsResult != true)
						chat.saveUploadData(toid,result.content,'img',result.filename);
				}else{
					$('#upload'+upload_count).html(result.content+'<time>('+common.getTime()+')</time><em></em>');
				}
				$("#btn_pic").click();
				$("#btn_file").click();
			}
		});
   	}
   	
   	//增加轮询新消息事件监听
	chat.addQueryNewMsgEventListener = function(){
//		chat.queryNewMsgEventListener = setInterval('chat.queryNewMsg()', 10000);
	}
	
	//删除轮询新消息事件监听
	chat.removeQueryNewMsgEventListener = function(){
		clearInterval(chat.queryNewMsgEventListener);
	}
	
	chat.scrollTop = function(){
		setTimeout( function(){ window.scrollTo(0, 1); }, 0 );
	}
})()