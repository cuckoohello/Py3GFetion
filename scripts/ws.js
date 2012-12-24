ws = {};

(function(){
	ws.socket = null;
	var sid = 'shfiwlefhisfekw';	
	if(typeof sessionId != 'undefined' && sessionId != null && sessionId != 'null' && sessionId != ''){
		sid = sessionId;
	}
	ws.host = wsIp+'im_wss?sessionId='+sid+'&userId='+idUser;
	
	ws.newWs = function(){
		if('WebSocket' in window){
	    	try{
	    		ws.socket = new WebSocket(ws.host);
	    	}catch(e){
	    		getListMsgType = 'lx';
	    		return;
	    	}
	    }else if('MozWebSocket' in window){
	    	try{
	    		ws.socket = new window.MozWebSocket(ws.host);
	    	}catch(e){
	    		getListMsgType = 'lx';
	    		return;
	    	}
	    }else{
	    	getListMsgType = 'lx';
	    	if($("#messagesDivId").length > 0){
        		index.init();
        	}
	        return;
	    }
		//打开
    	ws.socket.onopen = function(){
	        ws.socket.onmessage = function(message){
	        	ws.onmessage(message);
//	        	console.log('Client received a message', event); 
	        }
        };
        //关闭
        ws.socket.onclose = function(){
        	ws.newWs();
        	//如果不能使用ws，改为lx
//    		if(ws.socket == null || ws.socket.readyState == '2' || ws.socket.readyState == '3'){
//            	getListMsgType = 'lx';
//            	if($("#messagesDivId").length > 0){
//            		index.init();
//            	}
//            	ws.removeUpdateSessionEventListener();
//    		}
        	console.log('Client notified socket has closed', event); 
        };
        //出错
        ws.socket.onerror = function(){
        	ws.removeUpdateSessionEventListener();
        	console.log('Socket Error: ' + socket.readyState);
        };
		ws.addUpdateSessionEventListener();
	}
	
	//接收新消息
	ws.onmessage = function(event){
		var message = eval('('+event.data+')');
		if(message.messageName == 'newGroupMessages'){		//接收群组消息
			var notifyMsg = '{"messageName":"notifyGroupMessagesAreOld",';
    		notifyMsg += '"idUser":"'+idUser;
    		notifyMsg += '","updateOnlineSession":"true",';
    		notifyMsg += '"idMessages":"' + message.idMessage + '"}';    		
    		ws.socket.send(notifyMsg);
    		if(typeof group == 'undefined'){
				loader.getGroupFile();
			}
			if(index.hadNewGMsg(message.groupUri, message.idMessage)){
				return;
			}
			if(index.fromGroupIds.indexOf(message.groupUri) == -1){
				index.fromGroupIds += ',' + message.groupUri;
			}
			var gmsg = ws.getGmsg(message);
			var gname = '群组';
			var listGroup = $.data(Array, 'group.listGroup');
			if(typeof listGroup != 'undefined' && listGroup != null && listGroup.length>0){
				for(var n=0;n<listGroup.length;n++){
					if(listGroup[n].groupUri == gmsg.groupUri){
						gname = listGroup[n].name;
						break;
					}
				}
			}else{
				group.getGlist();
				var listGroup = $.data(Array, 'group.listGroup');
				if(typeof listGroup != 'undefined' && listGroup != null && listGroup.length>0){
					for(var n=0;n<listGroup.length;n++){
						if(listGroup[n].groupUri == gmsg.groupUri){
							gname = listGroup[n].name;
							break;
						}
					}
				}
			}
			if(gname == '群组'){
				var gno = message.groupUri;
				if(gno != null && gno.indexOf('@') > -1){
					gname = gno.substring(6,gno.indexOf('@'));
				}
			}
			gmsg['groupName'] = gname;
			ws.saveGmsg(gmsg);			
			if($('#listGmsgScroll').length > 0 && message.groupUri==group.curGuri){
				index.saveLocalRecentContact(gmsg);
				group.saveGmsg(message.groupUri, gmsg);
				group.showAddGmsg(gmsg);
				$.data(Array, 'listGmsg_new_'+message.groupUri, null);
				index.messagenum = index.messagenum - 1;
				index.h5total_size = index.h5total_size - 1;
			}			
		}else if(message.messageName == 'messages'){		//接收二人消息
			var notifyMsg = '{"messageName":"notifyMessagesAreOld",';
    		notifyMsg += '"idUser":"'+idUser;
    		notifyMsg += '","updateOnlineSession":"true",';
    		notifyMsg += '"idMessages":"' + message.idMessage + '"}';
    		ws.socket.send(notifyMsg);
    		if(typeof chat == 'undefined'){
				loader.getChatFile();
			}
			if(index.hadNewMsg(message.fromIdUser, message.idMessage)){
				return;
			}
			if(index.fromIdUsers.indexOf(',' + message.fromIdUser) == -1){
				index.fromIdUsers += ',' + message.fromIdUser;
			}
			var fnickName = '好友';
			var allFriends = $.data(Array, 'main.allfriends');
			if(allFriends != null){
				fnickName = main.getFriendLocalName(allFriends[message.fromIdUser]);
			}
			message['fromNickname'] = fnickName;
			ws.saveChatMsg(message);
			if($('#chat_info2').length > 0 && chat.toiduser == message.fromIdUser){
				index.saveLocalRecentContact(message);
				$('#chat_info2').append(chat.showRecentMsgs(message));
				scroll.refresh();
				if(scroll.maxScrollY < 0){
					scroll.scrollToElement(chat.getLastListMsg());
				}
				chat.saveChatMsgs(message.fromIdUser, message);
				$.data(Array, 'listChatmsg_new_'+message.fromIdUser, null);
				index.messagenum = index.messagenum - 1;
				index.h5total_size = index.h5total_size - 1;
				if(index.fromIdUsers.indexOf(","+message.fromIdUser) > -1){
					index.fromIdUsers = index.fromIdUsers.replace(","+message.fromIdUser,"");
				}
			}
		}else if(message.messageName == 'addContactRequests'){
			var notifyMsg = '{"messageName":"notifyAddContactRequestsAreOld",';
    		notifyMsg += '"idUser":"'+idUser;
    		notifyMsg += '","updateOnlineSession":"true",';
    		notifyMsg += '"idMessages":"' + message.idAddContactRequest + '"}';
    		ws.socket.send(notifyMsg);
			var addContactRequests = $.data(Array, 'box_addfrRequest_messages');
			if(typeof addContactRequests=='undefined' || addContactRequests==null){
				addContactRequests = new Array();
			}
			addContactRequests.push(message);
			$.data(Array, 'box_addfrRequest_messages', addContactRequests);
		}else if(message.messageName == 'addContactResponses'){
			var notifyMsg = '{"messageName":"notifyAddContactResponsesAreOld",';
    		notifyMsg += '"idUser":"'+idUser;
    		notifyMsg += '","updateOnlineSession":"true",';
    		notifyMsg += '"idMessages":"' + message.idAddContactResponse + '"}';
    		ws.socket.send(notifyMsg);
			var addContactResponses = $.data(Array, 'box_addfrResponse_messages');
			if(typeof addContactResponses=='undefined' || addContactResponses==null){
				addContactResponses = new Array();
			}
			addContactResponses.push(message);
			$.data(Array, 'box_addfrResponse_messages', addContactResponses);
		}else if(message.messageName == 'sysMessages'){
			var notifyMsg = '{"messageName":"notifySystemMessagesAreOld",';
    		notifyMsg += '"idUser":"'+idUser;
    		notifyMsg += '","updateOnlineSession":"true",';
    		notifyMsg += '"idMessages":"' + message.idSysMessage + '"}';
    		ws.socket.send(notifyMsg);
			var sysMessagesDetail = $.data(Array, 'box_sys_messages');
			if(typeof sysMessagesDetail=='undefined' || sysMessagesDetail==null){
				sysMessagesDetail = new Array();
			}
			sysMessagesDetail.push(message);
			$.data(Array, 'box_sys_messages', sysMessagesDetail);
		}else if(message.messageName == 'handleGroupSysMessages'){
			var notifyMsg = '{"messageName":"notifyHandleGrouySysMessagesAreOld",';
    		notifyMsg += '"idUser":"'+idUser;
    		notifyMsg += '","updateOnlineSession":"true",';
    		notifyMsg += '"idMessages":"' + message.idHandleGroupSysMessage + '"}';
    		ws.socket.send(notifyMsg);
			var handleGroupSysMessagesDetails = $.data(Array, 'box_addGroupRequest_messages');
			if(typeof handleGroupSysMessagesDetails=='undefined' || handleGroupSysMessagesDetails==null){
				handleGroupSysMessagesDetails = new Array();
			}
			handleGroupSysMessagesDetails.push(message);
			$.data(Array, 'box_addGroupRequest_messages', handleGroupSysMessagesDetails);
		}else if(message.messageName == 'approveInviteJoinMessages'){
			var notifyMsg = '{"messageName":"notifyApproveInviteJoinMessagesAreOld",';
    		notifyMsg += '"idUser":"'+idUser;
    		notifyMsg += '","updateOnlineSession":"true",';
    		notifyMsg += '"idMessages":"' + message.idApproveInviteJoinMessage + '"}';
    		ws.socket.send(notifyMsg);
			var approveInviteJoinMessageDetails = $.data(Array, 'box_approveInviteJoin_messages');
			if(typeof approveInviteJoinMessageDetails=='undefined' || approveInviteJoinMessageDetails==null){
				approveInviteJoinMessageDetails = new Array();
			}
			approveInviteJoinMessageDetails.push(message);
			$.data(Array, 'box_approveInviteJoin_messages', approveInviteJoinMessageDetails);
		}else if(message.messageName == 'inviteJoinGroupMessages'){
			var notifyMsg = '{"messageName":"notifyInviteJoinGroupMessagesAreOld",';
    		notifyMsg += '"idUser":"'+idUser;
    		notifyMsg += '","updateOnlineSession":"true",';
    		notifyMsg += '"idMessages":"' + message.idInviteJoinGroupMessage + '"}';
    		ws.socket.send(notifyMsg);
			var inviteJoinGroupMessageDetails = $.data(Array, 'box_inviteJoinGroup_messages');
			if(typeof inviteJoinGroupMessageDetails=='undefined' || inviteJoinGroupMessageDetails==null){
				inviteJoinGroupMessageDetails = new Array();
			}
			inviteJoinGroupMessageDetails.push(message);
			$.data(Array, 'box_inviteJoinGroup_messages', inviteJoinGroupMessageDetails);
		}
		if(message != null && message.messageName != 'extSystemMessages'){
			index.messagenum = index.messagenum + 1;
			index.h5total_size = index.h5total_size + 1;
			index.displayMessagenum(index.messagenum);
		}
		if($("#messagesDivId").length > 0){
			index.messagesHtml();
		}
	}
	
	//转换群消息格式
	ws.getGmsg = function(message){
		var gmsg = {};
		gmsg.groupUri = message.groupUri;
		gmsg.from = message.idSender==idUser?'self':'other';
		gmsg.nickname = message.senderDispName;
		gmsg.msg = message.message;
		var tlen = message.sendTime.length;
		gmsg.sendtime = message.sendTime.substring(tlen-8,tlen-3);
		
		return gmsg;
	}
	
	//保存群聊天记录
	ws.saveGmsg = function(gmsg){
		var listGmsg = $.data(Array, 'listGmsg_new_'+gmsg.groupUri);
		if(typeof listGmsg=='undefined' || listGmsg==null){
			listGmsg = new Array();
		}
		listGmsg.push(gmsg);
		
		$.data(Array, 'listGmsg_new_'+gmsg.groupUri, listGmsg);
	}
	
	//保存会话消息
	ws.saveChatMsg = function(message){
		var listChatmsg = $.data(Array, 'listChatmsg_new_'+message.fromIdUser);
		if(typeof listChatmsg == 'undefined' || listChatmsg == null){
			listChatmsg = new Array();
		}
		listChatmsg.push(message);
		$.data(Array, 'listChatmsg_new_'+message.fromIdUser, listChatmsg);
	}
	
	//发送心跳消息
	ws.updateSession = function(){
		try{
			if(ws.socket == null || ws.socket.readyState == '2' || ws.socket.readyState == '3'){
				ws.newWs();
			}
	    	var message = '{"messageName":"updateOnlineSession","idUser":"'+idUser+'","sessionId":"'+sid+'"}';
	    	if (ws.socket != null) {
	    		ws.socket.send(message);
	    	}
	    	//如果不能使用ws，改为lx
//    		if(ws.socket == null || ws.socket.readyState == '2' || ws.socket.readyState == '3'){
//            	getListMsgType = 'lx';
//            	if($("#messagesDivId").length > 0){
//            		index.init();
//            	}
//            	ws.removeUpdateSessionEventListener();
//    		}
		}catch(e){
			console.log('send updateSession error : ', e);
		}
    }
	
	ws.addUpdateSessionEventListener = function(){
		if(typeof ws.updateSessionEventListener == 'undefined'){
			ws.updateSessionEventListener = setInterval('ws.updateSession()', 30000);
		}
	}
	
	ws.removeUpdateSessionEventListener = function(){
		clearInterval(ws.updateSessionEventListener);
		ws.updateSessionEventListener = undefined;
	}
	
	//初始化	
	if(getListMsgType == 'ws'){
		ws.newWs();
	}
}	
)()