var group = {};

(function(){
	group.headerImg = 'data:image/png;base64,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';
	group.curGuri = '';
	
	
	//显示群列表页面
	group.getGindexEvent = null;
	group.showGlist = function(reget){
		clearTimeout(this.getGindexEvent);
		var listGroup = $.data(Array, 'group.listGroup');	
		
		//判断群组信息是否推送过来, 若未推送过来则延迟再查2次
		if((typeof listGroup=='undefined' || listGroup==null || listGroup.length==0) && (typeof reget=='undefined' || reget<=2)){
			this.getGlist(true, group.showGlistCallBack, reget);
			listGroup = $.data(Array, 'group.listGroup');
		}
		
		var inner = index.getHeader();
		var height = index.getClientHeight();
		var glistHeight = height - 110;
		inner += '<section id="gListScroll" style="height:'+glistHeight+'px;">';
		inner += '<section class="list_spe_style list_spe_style1">';
		inner += '<ul class="user_sub_list">';
		
		if(typeof listGroup!='undefined' && listGroup!=null && listGroup.length>0){
			inner += this.getGlistInner(listGroup);
		}else{
			//显示等待图标
			inner += '<li><img src="'+basepath+'images/html5/loading.gif" class="loading" /></li>';
			index.onloading('groupTab');
		}
		
		inner += '</ul>';
		inner += '</section>';
		inner += '</section>';

		inner += index.getFooter();
		$('body').html(inner);
		
		//显示grouptab
		$('#groupTab').addClass('on');
		
		$("#tab_loading").remove();
		if(typeof listGroup=='undefined' || listGroup==null || listGroup.length==0){
//			index.showToRemind('你还没有加入的群组');
		}else{
			scroll = new iScroll('gListScroll', {hScroll:false, hideScrollbar:true, bounce:false});
		}
		index.hideLocationBar();
		$("#gListScroll").height($("#gListScroll").height()+50);
	}
	
	//显示群列表回调函数
	group.showGlistCallBack = function(reget){
		var listGroup = $.data(Array, 'group.listGroup');
		
		if(typeof reget=='undefined' || reget<2){
			if(typeof listGroup=='undefined' || listGroup==null || listGroup.length==0 || typeof listGroup[0].name=='undefined' || listGroup[0].name==null || listGroup[0].name==''){
				reget = (typeof reget=='undefined')?1:reget;
				this.getGindexEvent = setTimeout(new Function('group.showGlist('+(reget+1)+')'), 2*1000);
				return false;
			}
		}
		
		var inner = '';
		if(typeof listGroup!='undefined' && listGroup!=null && listGroup.length>0){
            inner = group.getGlistInner(listGroup);
		}
		
		$('#gListScroll ul').html(inner);
		if(inner != ''){
			scroll = new iScroll('gListScroll', {hScroll:false, hideScrollbar:true, bounce:false});
		}
	}
	
	//获取群列表内容
	group.getGlistInner = function(listGroup){
		var inner = '';
		for(var i=0; i<listGroup.length; i++){
			var group = listGroup[i];
			var gName = group.name==null||group.name==''?this.getGId(group.groupUri):group.name;
			var groupUri = group.groupUri;
			var gMsgReceiverPolicy = group.msgReceiverPolicy;
			var gBulletin = group.bulletin;
			var gIdentity = group.identity;
			
			if(gIdentity <= 3){
				inner += '<a href="javascript:group.showGchat(\''+groupUri+'\', \''+gName+'\', \'1\')">';
			}else{
				inner += '<a href="javascript:index.showToRemind(\'你还不是该群成员，不能聊天\')">';
			}
			inner += '<li>';
			inner += '<div class="person_img"><img src="'+this.headerImg+'" /></div>';
			inner += '<div class="user_cont">';
			if(gIdentity == 4){
				inner += '<p class="name">'+index.subString(gName, 8)+'[待验证]</p>';
			}else if(gIdentity == 5){
				inner += '<p class="name">'+index.subString(gName, 8)+'[被拒绝]</p>';
			}else{
				inner += '<p class="name">'+index.subString(gName, 18)+'</p>';
			}
			inner += '<p class="mood">'+index.subString(gBulletin, 18)+'</p>';
			inner += '</div>';
			inner += '</li>';
			inner += '</a>';
		}
		
		return inner;
	}
	
	//显示群聊天页面
	group.showGchat = function(gUri, gName, back){
		group.curGuri = gUri;
		group.curGname = gName;
		
		//初始化ws
		if(getListMsgType == 'ws' && typeof ws == 'undefined'){
			loader.getWsFile();
		}
		
		//如果为轮询方式，设定轮询定时器
//		if(getListMsgType == 'lx'){
//			group.queryNewMsg(gUri);
//			group.addQueryNewMsgEventListener(gUri);
//		}
		
		var listgGroupNewMsg = $.data(Array, 'listGmsg_new_'+gUri);
		if(typeof listgGroupNewMsg!='undefined' && listgGroupNewMsg!=null && listgGroupNewMsg.length>0){
//			var gmsg = group.getGmsgLx(listgGroupNewMsg);
			group.saveGmsgLx(gUri, listgGroupNewMsg);
			
			$.data(Array, 'listGmsg_new_'+gUri, null);
			group.queryNewMsg(gUri);
			index.messagenum = index.messagenum - listgGroupNewMsg.length;
			index.h5total_size = index.h5total_size - listgGroupNewMsg.length;
			if(index.fromGroupIds.indexOf(","+gUri) > -1){
				index.fromGroupIds = index.fromGroupIds.replace(","+gUri,"");
			}
		}
		
		var listGroupRecord = $.data(Array, 'listGmsg_'+gUri);
		
		var inner = '<div class="wrap">';
		inner += '<header>';
		if(typeof back != 'undefined'){
			inner += '<a href="javascript:group.showGlist()"><div class="return"></div></a>';
		}else{
			inner += '<a href="javascript:index.init()"><div class="return"></div></a>';
		}
        inner += '<div class="header-text">'+index.subString(gName, 14)+'</div>';
		inner += '<a href="javascript:group.showGinfo(\''+gUri+'\', \''+gName+'\')"><div class="Awrite"></div></a>';
	    inner += '</header>';
	    var height = index.getClientHeight();
		var gch = height - 130;
		inner += '<section id="listGmsgScroll" class="AduihuaList" style="height:'+gch+'px;">';
		inner += '<ul id="listGmsg">';
		
		group.msgPerPage = 10;
		
		if(listGroupRecord!=null && listGroupRecord.length>0){
			group.msgCurHisMsg = listGroupRecord.length;
			for(var i=(listGroupRecord.length<=group.msgPerPage?0:listGroupRecord.length-group.msgPerPage); i<listGroupRecord.length; i++){
				var gmsg = listGroupRecord[i];
				
				var from = gmsg.from;
				var nickname = gmsg.nickname;
				var msg = gmsg.msg;
				var sendtime = gmsg.sendtime;
				
				if(from == 'self'){
					inner += '<li class="fan">'+face.filterFaceImg(msg)+'<em></em><div class="time">'+sendtime+'</div></li>';
				}else{
					inner += '<li><span>'+index.subString(nickname, 14)+'</span>'+face.filterFaceImg(msg)+'<em></em><div class="time">'+sendtime+'</div></li>';
				}
				
				group.msgCurHisMsg--;
			}
		}else{
			group.msgCurHisMsg = 0;
		}
		
		inner += '</ul>';
		inner += '</section>';
		inner += '<section class="sendtxt">';
		inner += '<div id="g_sendtips" class="sendTips none" style="width:25%">';
		inner += '<ul>';
		inner += '<li id="gChatShowFace" onclick="group.showFace()" style="width:98%"><img src="'+basepath+'images/html5/003_on.png" width="25"/>表情</li>';
		inner += '</ul>';
		inner += '<div class="sendJiao"></div>';
		inner += '</div>';
		inner += '<div id="faces"></div>'
		inner += '<div class="sendBox">';
		inner += '<div class="sendSlect1" onclick="group.showGtips(this.className)"></div>';
		inner += '<input id="gMessage" type="text" maxlength="180" onblur="group.scrollTop();" />';
		inner += '<div class="sendbotton"><button onclick="group.sendGmsg(\''+gUri+'\')">发送</button></div>';
		inner += '</div>';
		inner += '</section>';
		inner += '</div>';
		
		$('body').html(inner);
		
		scroll = new iScroll('listGmsgScroll', {
			hScroll:false, 
			hideScrollbar:true,
			bounce:false,
			onScrollEnd: function(){
				if(this.y == 0){
					group.showMoreHisMsg(gUri);
				}
			}
		});
		
		if(scroll.maxScrollY < 0){
			scroll.scrollToElement(group.getLastListMsg(), 500);
		}
		index.hideLocationBar();
		var useragent = window.navigator.userAgent;
		if(false && useragent.indexOf('iPhone')==-1 && useragent.indexOf('iPod')==-1){
//			$("#listGmsgScroll").height($("#listGmsgScroll").height()+10);
		}else{
			$("#listGmsgScroll").height($("#listGmsgScroll").height()+60);
		}
	}
	
	//显示历史聊天记录
	group.showMoreHisMsg = function(gUri){
		if(group.msgCurHisMsg == 0){
			return;
		}
		var listGroupRecord = $.data(Array, 'listGmsg_'+gUri);
		
		var listMoreHisEnd = 0; 
		if(group.msgCurHisMsg-group.msgPerPage > 0){
			listMoreHisEnd = group.msgCurHisMsg-group.msgPerPage;
		}
		
		var mHisMsg = new Array();
		for(var i=group.msgCurHisMsg-1; i>=listMoreHisEnd; i--){
			mHisMsg.push(listGroupRecord[i]);
			group.msgCurHisMsg--;
		}
		
		group.showAddGmsg(mHisMsg, 'back');
	}
	
	//增加显示群聊天记录
	group.showAddGmsg = function(gmsg, back){
		var addListGmsg = null;

		if(!(gmsg instanceof Array)){
			addListGmsg = new Array();
			addListGmsg.push(gmsg);
		}else{
			addListGmsg = gmsg;
		}

		if(addListGmsg.length>0){
			for(var i=0; i<addListGmsg.length; i++){
				var addMsg = addListGmsg[i];
				var inner = '';
				if(addMsg.from == 'self'){
					inner += '<li class="fan">'+face.filterFaceImg(addMsg.msg)+'<em></em><div class="time">'+addMsg.sendtime+'</div></li>';
				}else{
					inner += '<li><span>'+addMsg.nickname+'</span>'+face.filterFaceImg(addMsg.msg)+'<em></em><div class="time">'+addMsg.sendtime+'</div></li>';
				}
				if(typeof back != 'undefined'){
					$('#listGmsg').prepend(inner);
				}else{
					$('#listGmsg').append(inner);
				}
			}
		}
		
		scroll.refresh();
		
		if(typeof back == 'undefined'){
			if(scroll.maxScrollY < 0){
				scroll.scrollToElement(group.getLastListMsg(), 500);
			}
		}
	}
	
	//获取最后一条聊天记录
	group.getLastListMsg = function(){
		var ulGmsg = document.getElementById('listGmsg');
		var liGmsg = ulGmsg.getElementsByTagName('li');
		return liGmsg[liGmsg.length-1];
	}
	
	//显示发送表情
	group.showGtips = function(sendSlect){
		if(sendSlect == 'sendSlect'){
			$('.sendSlect').removeClass("sendSlect").addClass("sendSlect1");
			$('#g_sendtips').hide(200);
		}else{
			$('.sendSlect1').removeClass("sendSlect1").addClass("sendSlect");
			$('#g_sendtips').show(200);
		}
	}
	
	//显示选择表情
	group.showFace = function(){
		group.showGtips('sendSlect');
		face.showFace('faces');
	}
	
	//显示群信息页面
	group.showGinfo = function(gUri, gName){
		if(typeof gName == 'undefined'){
			var gName = group.curGname;
		}
		var inner = '<div class="wrap">';
		inner += '<header>';
		inner += '<a href="javascript:group.showGlist()"><div class="return"></div></a>';
	    inner += '<div class="header-text">'+index.subString(gName, 14)+'</div>';
	    inner += '</header>';
	    var height = index.getClientHeight();
		var gih = height - 50;
		inner += '<section id="gInfoScroll" style="height:'+gih+'px;">';
		inner += '<div id="loading"><img src="'+basepath+'images/html5/loading.gif" class="loading" /></div>';
		inner += '</section>';
		inner += '</div>';
		
		$('body').html(inner);
		index.hideLocationBar();

		this.getGinfoInner(gUri);
	}
	
	//获群组信息内容
	group.getGinfoInner = function(gUri){
		if(typeof gUri == 'undefined'){
			var gUri = group.curGuri;
		}
		var gInfo = group.getGroupByGuri(gUri, group.getGinfoInner);
		if(typeof gInfo=='undefined' || gInfo==null){
			return;
		}
		
		var gNo = '';
		var gName = '';
		var gMangerName = '';
		var gBulletin = '';
		var gIntroduce = '';
		
		if(typeof gInfo!='undefined' && gInfo!=null){
			if(typeof gInfo.manager!='undefined' && gInfo.manager!=null && gInfo.manager.length>0){
				gMangerName = gInfo.manager;
			}else{
				group.getGmanager(gInfo.groupUri);
				gInfo = group.getGroupByGuri(gUri);
				if(typeof gInfo.manager!='undefined' && gInfo.manager!=null && gInfo.manager.length>0){
					gMangerName = gInfo.manager;
				}			
			}
			gNo = group.getGId(gInfo.groupUri);
			gName = gInfo.name;
			gBulletin = gInfo.bulletin;
			gIntroduce = gInfo.introduce;
		}
		
		var inner = '';
		
		inner += '<section class="group-data">';
		inner += '<dl>';
		inner += '<dt><div class="person_img"><img src="'+group.headerImg+'">';
		if(typeof gInfo.identity!='undefined' && gInfo.identity<=3){
			inner += '<a href="javascript:group.showGchat(\''+gInfo.groupUri+'\', \''+gName+'\', \'1\')">';
		}else{
			inner += '<a href="javascript:index.showToRemind(\'你还不是该群组成员，无法聊天\')">';
		}
		inner += '<em class="icon icon-news2"></em></a></div></dt>';
		inner += '<dd class="min-width"><label>群号</label><span>'+gNo+'</span></dd>';
		inner += '<dd class="min-width"><label>超级管理员</label><span id="gManager">'+index.subString(gMangerName, 10)+'</span></dd>';
		inner += '<dd><label>群公告</label><span>'+index.subString(gBulletin, 20)+'</span></dd>';
		inner += '<dd><label>群简介</label><span>'+index.subString(gIntroduce, 20)+'</span></dd>';
		inner += '<dd><label>群成员</label>';
		if(typeof gInfo.identity!='undefined' && gInfo.identity<=3){
			inner += '<a href="javascript:group.showGperson(\''+gInfo.groupUri+'\')">点击查看</a>';
			inner += '<a href="javascript:group.showGperson(\''+gInfo.groupUri+'\')"><em class="icon icon-look"></em></a>';
		}else{
			inner += '<a href="javascript:index.showToRemind(\'你还不是该群组成员，无法查看\')">点击查看</a>';
			inner += '<a href="javascript:index.showToRemind(\'你还不是该群组成员，无法查看\')"><em class="icon icon-look"></em></a>';
		}
		inner += '</dd>';
		inner += '<dd id="setGetGmsg">';
		inner += '<label>接收群消息</label>';

		if(gInfo!=null && typeof gInfo.msgReceiverPolicy!='undefined'){
			if(gInfo.msgReceiverPolicy==1 || gInfo.msgReceiverPolicy==2){
				if(gInfo.identity <= 3){
					inner += '<a href="javascript:group.setGetGmsg(\''+gUri+'\', 3, \'off\')">点击关闭</a>';
					inner += '<a href="javascript:group.setGetGmsg(\''+gUri+'\', 3, \'off\')"><p class="icon icon-select"><em><i></i></em></p></a>';
				}else{
					inner += '<a href="javascript:index.showToRemind(\'你还不是该群组成员，无法设置\')">点击关闭</a>';
					inner += '<a href="javascript:index.showToRemind(\'你还不是该群组成员，无法设置\')"><p class="icon icon-select"><em><i></i></em></p></a>';
				}
			}else if(gInfo.msgReceiverPolicy == 3){
				if(gInfo.identity <= 3){
					inner += '<a href="javascript:group.setGetGmsg(\''+gUri+'\', 1, \'on\')">点击打开</a>';
					inner += '<a href="javascript:group.setGetGmsg(\''+gUri+'\', 1, \'on\')"><p class="icon icon-select"><em></em></p></a>';
				}else{
					inner += '<a href="javascript:index.showToRemind(\'你还不是该群组成员，无法设置\')">点击打开</a>';
					inner += '<a href="javascript:index.showToRemind(\'你还不是该群组成员，无法设置\')"><p class="icon icon-select"><em></em></p></a>';
				}
			}
		}
		
	    inner += '</dd>';
		inner += '</dl>';
		if(gInfo != null){
			if(typeof gInfo.identity!='undefined' && gInfo.identity>1 && gInfo.identity<4){
				inner += '<div id="gInfoQuitDiv"><a href="javascript:group.quitConfirm(\''+gUri+'\')"><p class="quit">退出群</p></a></div>';
			}else if(typeof gInfo.identity!='undefined' && ((gInfo.identity<1 && gInfo.joinApprovedType!=2) || gInfo.identity>=4)){
				inner += '<div id="gInfoAddDiv" ><a href="javascript:group.addGroup(\''+gUri+'\', group.infoAddGroupCallBack)"><section class="addfriend"><h3></h3><h4><i></i>加入群<p><em class="sx"></em><em class="hx"></em></p></h4></section></a></div>';
				inner += '<div id="gInfoQuitDiv" style="display:none"><a href="javascript:group.quitConfirm(\''+gUri+'\')"><p class="quit">退出群</p></a></div>';
			}else{
				inner += '<p style="height:80px;"></p>';
			}
		}
		inner += '</section>';
		
		$('#gInfoScroll').html(inner);
		scroll = new iScroll('gInfoScroll', {hScroll:false, hideScrollbar:true, bounce:false});
		$("#gInfoScroll").height($("#gInfoScroll").height()+10);
	}
	
	//设置是否接收群消息
	group.setGetGmsg = function(groupUri, msgRecvPolicy, setStatus){
		$.ajax({type:'Get',url: basepath+'gset/setgroupmessages.action'+'?t='+new Date().getTime(),data:{groupUri:groupUri,msgRecvPolicy:msgRecvPolicy},
  	       cache: false,
  	       success: function(data){
				if(typeof data == "undefined" || data == null){
					return;
				}
				if(typeof data.tip != "undefined" && data.tip != ''){
					if(data.tip.indexOf('成功') > -1){
						group.setGetGmsgCallBack(groupUri, msgRecvPolicy, setStatus);
					}
				}
		   },
		   error: function(){
			   
		   }
        });
	}
	
	group.setGetGmsgCallBack = function(groupUri, msgRecvPolicy, setStatus){
		var gGroup = group.getGroupByGuri(groupUri);
		
		if(setStatus == 'on'){
			$('#setGetGmsg').html('<label>接收群消息</label><a href="javascript:group.setGetGmsg(\''+groupUri+'\', 3, \'off\')">点击关闭</a><a href="javascript:group.setGetGmsg(\''+groupUri+'\', 3, \'off\')"><p class="icon icon-select"><em><i></i></em></p></a>');
			gGroup.msgReceiverPolicy = 1;
		}else if(setStatus == 'off'){
			$('#setGetGmsg').html('<label>接收群消息</label><a href="javascript:group.setGetGmsg(\''+groupUri+'\', 1, \'on\')">点击打开</a><a href="javascript:group.setGetGmsg(\''+groupUri+'\', 1, \'on\')"><p class="icon icon-select"><em></em></p></a>');
			gGroup.msgReceiverPolicy = 3;
		}
		group.updateGroupByGuri(gGroup);
	} 
	
	//显示群成员页面
	group.showGperson = function(gUri){
		var listGperson = $.data(Array, 'group.listGperson'+gUri);
		
		if(typeof listGperson=='undefined' || listGperson==null){
			group.getGperson(gUri);
			listGperson = $.data(Array, 'group.listGperson'+gUri);
		}
		
		var inner = '<div class="wrap">';
		inner += '<header>';
		inner += '<a href="javascript:group.showGinfo(\''+gUri+'\')"><div class="return"></div></a>';
		inner += '<div class="header-text">群成员</div>';    
		inner += '</header>';
		var height = index.getClientHeight();
		var gph = height - 50;
		inner += '<section id="gMemberScroll" style="height:'+gph+'px;">';
		inner += '<section class="list_spe_style">';
		inner += '<ul class="user_sub_list user_sub_list1">';
		
		if(listGperson!=null && listGperson.length>0){
			for(var i=0; i<listGperson.length; i++){
				var gPerson = listGperson[i];
				var pName = typeof gPerson.groupNickName=='undefined'||gPerson.groupNickName==null?
						(gPerson.iicNickName=='undefined'||gPerson.iicNickName==null?''
								:gPerson.iicNickName):gPerson.groupNickName;
			    var pIdentity = '';
			    if(typeof gPerson.identity!='undefined' && gPerson.identity!=null && gPerson.identity!=''){
			    	if(gPerson.identity == 1){
			    		pIdentity = '超级管理员';
			    	}else if(gPerson.identity == 2){
			    		pIdentity = '管理员';
			    	}
			    }
			    
			    var width;
			    if(idUser==gPerson.idMember || gPerson.isContact==1){
			    	width = document.documentElement.clientWidth - 105;
				}else{
					width = document.documentElement.clientWidth - 170;
				}
			    
			    
				inner += '<li>';
				if(idUser != gPerson.idMember){
					inner += '<div onclick="group.toChat('+gPerson.idMember+', \''+pName+'\')">';
				}else{
					inner += '<div onclick="index.showToRemind(\'你不能和自己聊天\')">';
				}
				inner += '<div class="person_img">';
				inner += '<img alt="" src="'+basepath+'images/html5/1.jpg">';
				if(idUser != gPerson.idMember){
					inner += '<a href="javascript:group.toChat('+gPerson.idMember+', \''+pName+'\')"><em class="icon icon-news2"></em></a>';
				}else{
					inner += '<a href="javascript:index.showToRemind(\'你不能和自己聊天\')"><em class="icon icon-news2"></em></a>';
				}
				inner += '</div>';
				inner += '<div class="user_cont" style="width:'+width+'px">';
				inner += '<p class="name">'+index.subString(pName, 14)+'</p>';
				inner += '<p class="mood">'+pIdentity+'</p>';
				inner += '</div><div id="toChatId'+gPerson.idMember+'" style="float:left;width:20px;height:20px;"></div>';
				inner += '</div>';
				
				if(idUser!=gPerson.idMember && gPerson.isContact==0){
					inner += '<div id="addF_'+gPerson.idFetion+'" onclick="index.addFriendSubmit('+gPerson.idFetion+', 1, \'addF_'+gPerson.idFetion+'\', this)" class="select '+(gPerson.isContact==1?'on':'')+'">';
					inner += '<div class="hx"></div><div class="sx"></div>';
					inner += '</div>';
				}
				
				inner += '</li>';
			}
		}
		

		//inner += '<li><div class="person_more">换一批</div></li>		';
		inner += '</ul>';
		inner += '</section>';
		inner += '</section>';
		inner += '</div>';
		
		$('body').html(inner);
		
		scroll = new iScroll('gMemberScroll', {hScroll:false, hideScrollbar:true, bounce:false});
		index.hideLocationBar();
		$("#gMemberScroll").height($("#gMemberScroll").height()+10);
	}
	
	//跳转到聊天页面
	group.toChat = function(idUser, pName){
		$("#toChatId"+idUser).html('<img src="'+basepath+'images/html5/loading.gif"/>');
		loader.getChatFile();
		chat.init(idUser, pName);
	}
	
	//显示搜索群页面
	group.showGsearch = function(){
		var inner = '<div class="wrap">';
		inner += '<header>';
		inner += '<a href="javascript:index.init()"><div class="return"></div></a>';
	    inner += '<div class="header-text">添加好友/群</div>';
		inner += '</header>';
		var height = index.getClientHeight();
		var gsh = height - 50;
		inner += '<section id="gSearchScroll" style="height:'+gsh+'px;">';
		inner += '<ul>';
		inner += '<li>';
		inner += '<ul class="findfriend">';
		inner += '<a href="javascript:index.addFriends()"><li>查找好友<p></p></li></a>';
		inner += '<li><span>查找群</span></li>';
		inner += '</ul>';
		inner += '<div class="seach">';
		inner += '<input id="gNo" type="text" placeholder="请输入群号，精确查找" class="text" maxlength="20"/><input type="button" class="btn" onclick="group.gSearchByNo()">';
		inner += '</div>';
		inner += '<div class="br"></div>';
		inner += '<section class="s_sp1">';
		inner += '<section class="condition-find">';
		inner += '<h3>按条件查找</h3>';
		inner += '<ul>';
		inner += '<li><label>关键字</label><input type="text" id="gSearchKeyword" maxlength="65" /></li>';
		inner += '<li><label>分类</label><div class="sort-list">';
		inner += '<select id="gSearchCategoryId">';
		inner += '<option value="0" >全部</option>';
		var listGcategory = $.data(Array, 'group.listGcategory');
		
		if(!listGcategory){
			group.getGroupCategory();
			listGcategory = $.data(Array, 'group.listGcategory');
		}

		if(listGcategory && listGcategory.length>0){
			for(var i=0; i<listGcategory.length; i++){
				var gCategory = listGcategory[i];
				inner += '<option value="'+gCategory.idCategory+'">'+gCategory.categoryName+'</option>';
			}
		}
		inner += '</select>';
        inner += '<p><em class="up"></em><em class="down"></em></p></div></li>';
		inner += '</ul>';
		inner += '<a href="javascript:group.gSearchByKeyword()">查找</a>';
		inner += '<div id="gsbk" style="text-align: center;"></div></section>';
		inner += '</section>';
		inner += '</li>';
		inner += '</ul>';
		inner += '</section>';
		inner += '</div>';
		
		$('body').html(inner);
		window.scrollTo(0, 1);
//		scroll = new iScroll('gSearchScroll', {
//			onBeforeScrollStart: function(e){
//				var target = e.target;
//				while (target.nodeType != 1) target = target.parentNode;
//
//				if(target.tagName!='SELECT' && target.tagName!='OPTION' && target.tagName!='INPUT')
//					e.preventDefault();
//			}
//		});
	}
	
	
	//显示群搜索结果页面
    group.showGsearchResult = function(){
    	var listGsearchResult = $.data(Array, 'group.gSearchResult');	

    	if(listGsearchResult==null || listGsearchResult.length==0){
    		group.showGsearch();
    		index.showToRemind('你搜索的群不存在!');
    		$(".br").height(1);
			$(".br").html('');
    		return;
    	}
    	
    	var inner = '<div class="wrap">';
    	inner += '<header>';
    	inner += '<a href="javascript:group.showGsearch()"><div class="return"></div></a>';
    	inner += '<div class="header-text">查找群</div>';
    	inner += '</header>';
    	var height = index.getClientHeight();
		var gsrh = height - 50;
    	inner += '<section id="gSearchRScroll" class="min-height" style="height:'+gsrh+'px">';
    	inner += '<section class="list_spe_style">';
    	inner += '<ul class="user_sub_list user_sub_list1">';
    	
    	if(listGsearchResult!=null && listGsearchResult.length>0){
        	for(var i=0; i<listGsearchResult.length; i++){
        		var gSearchResult = listGsearchResult[i];
        		var gUri = gSearchResult.groupUri;
        		var gName = gSearchResult.groupName;
        		var gIntroduce = gSearchResult.introduce;
            	
            	inner += '<li>';
            	inner += '<div class="person_img">';
            	inner += '<img src="'+this.headerImg+'">';
            	inner += '</div>';
            	inner += '<div class="user_cont">';
            	inner += '<p class="name">'+index.subString(gName, 14)+'</p>';
            	inner += '<p class="mood">'+index.subString(gIntroduce, 14)+'</p>';
            	inner += '</div>';
            	inner += '<a href="javascript:group.addGroup(\''+gUri+'\', group.searchAddGroupCallBack)">';
            	inner += '<div id="sr_'+group.getGId(gUri)+'" class="select">';
            	inner += '<div class="hx"></div><div class="sx"></div>';
                inner += '</div>';
                inner += '</a>';
            	inner += '</li>';
        	}
    	}

    	inner += '</ul>';
    	inner += '</div>';
    	
    	$('body').html(inner);
    	
    	scroll = new iScroll('gSearchRScroll', {hScroll:false, hideScrollbar:true, bounce:false});
    	
    	index.hideLocationBar();
    	$("#gSearchRScroll").height($("#gSearchRScroll").height()+10);
    }
    
	//显示验证消息输入
	group.showGverification = function(gUri, callBack){
		var divHeight = 240;
		
		var maginTop = (document.documentElement.clientHeight-divHeight)/2;
		var inner = '<div id="gVerificationDiv" class="tcBG" style="width:100%;height:'+document.documentElement.clientHeight+'px">';
		inner += '<div class="loginTcBox" style="margin-top:'+maginTop+'px;">';
		inner += '<div class="txt_spe" style="padding:0 0 5px 5px;">';
		inner += '请输入验证内容:<input id="gDesc" type="text" style="width:150px;height:25px" maxlength="50"/>';
		inner += '<div class="txt_spe_close" style="right:5px;" onclick="group.closeGverification()"><div class="hx"></div><div class="sx"></div></div>';
		inner += '</div>';
		inner += '<div class="login-btn"><input type="button" value="加入群组" onclick="group.addGroup(\''+gUri+'\', null, 1)" class="login-btn1"></div>';
		inner += '</div>';
		inner += '</div>';
		
		$('body').append(inner);
	}
	
	//关闭验证消息输入
	group.closeGverification = function(){
		$('#gVerificationDiv').remove();
	}
    
    //获取群组列表
	group.getGlistEvent = null;
    group.getGlist = function(async, callback, reget){
    	if(typeof async == 'undefined'){
    		var async = false;
    	}
		$.ajax({type:'POST',async:async,url: basepath+'index/groupindex.action'+'?t='+new Date().getTime(),
  	       cache: false,
  	       success: function(data){
			   clearTimeout(group.getGlistEvent);
			   $.data(Array, 'group.listGroup', data.groupList);
			   group.getGlistEvent = setTimeout(
			   function(){
		    	  $.removeData(Array, 'group.listGroup');
		       }, 
		       120000);
			   if(typeof callback != 'undefined'){
				   if(typeof reget != 'undefined'){
					   callback(reget);
				   }else{
                       callback();					   
				   }
			   }
		   }
        });
    }
    
    //获取群组成员
    group.getGpersonEvent = null;
    group.getGperson = function(gUri){
		$.ajax({type:'GET',async:false,url: basepath+'guser/groupuserlist.action?groupUri='+gUri+'&t='+new Date().getTime(),
  	       cache: false,
  	       success: function(data){
			    clearTimeout(group.getGlistEvent);
			    $.data(Array, 'group.listGperson'+gUri, data.groupMembersInfo);
			    group.getGpersonEvent = setTimeout(
				    function(){
			    	   $.removeData(Array, 'group.listGperson'+gUri);
			        }, 
			        120000);
		   }
        });
    }
    
    //获取群组管理员
    group.getGmanager = function(gUri){
		$.ajax({type:'Get',async:true,url: basepath+'gset/getgroupmanager.action?groupUri='+gUri+'&t='+new Date().getTime(),
  	       cache: false,
  	       success: function(data){
				var listGroup = $.data(Array, 'group.listGroup');
				if(listGroup!=null && listGroup.length>0){
					for(var i=0; i<listGroup.length; i++){
						if(gUri === listGroup[i].groupUri){
							var gInfo = listGroup[i];
							gInfo.manager = typeof data.manager=='undefined'||data.manager==null?'':data.manager;
							listGroup[i] = gInfo;
							$.data(Array, 'group.listGroup', listGroup);
							$('#gManager').html(gInfo.manager);
						}
					}
				}
		   }
        });
    }
    
    //根据群组号搜索群组
	group.gSearchByNo = function(){
		$(".br").height(20);
		$(".br").html('<img src="../images/html5/loading.gif"/>');
		var gNo = $('#gNo').val();		
		if(!/^[1-9][0-9]{3,9}$/g.test(gNo)){
			index.showToRemind('请输入正确群号搜索, 5-10位数字');
			$(".br").height(1);
			$(".br").html('');
			$("#gsbk").html('');
			return;
		}

		$.ajax({type:'Get',url:basepath+'gsearch/accuratesearchgroup2.action'+'?t='+new Date().getTime(),data:{groupno:gNo},
  	       cache: false,
  	       success: function(data){
				$.data(Array, 'group.gSearchResult', data);
				group.showGsearchResult();
		   },
        });
	}
	
	//查询群分类
	group.getGroupCategory = function(){
		$.ajax({type:'POST',async:false,url: basepath+'gsearch/sortsearchgroup.action'+'?t='+new Date().getTime(),
  	       cache: false,
  	       success: function(data){
			   $.data(Array, 'group.listGcategory', data);
		   },
        });
	}
	
	//根据关键字搜索群
	group.gSearchByKeyword = function(){
		$("#gsbk").html('<img src="../images/html5/loading.gif"/>');
		var keywords = $('#gSearchKeyword').val();
		var idCategoryId = $('#gSearchCategoryId').val();

		$.ajax({type:'POST',url: basepath+'gsearch/sortsearchgroup3.action'+'?t='+new Date().getTime(),data:{keywords:keywords,groupCategory:idCategoryId,pageNo:0},
  	       cache: false,
  	       success: function(data){
			   $.data(Array, 'group.gSearchResult', data.listSearchGroupInfos);
			   group.showGsearchResult();
		   },
        });
	}
    
    //发消息
	group.sendGmsg = function(gUri){
		var msg = $('#gMessage').val();
		if(msg == ''){
			index.showToRemind('消息内容不能为空');
			return;
		}
		
	    $('#gMessage').val('');
	    var gmsg = group.getGmsg('self', '', face.filterSendMsg(msg));
	    group.saveGmsg(gUri, gmsg);
	    group.showAddGmsg(gmsg);
	    
	    var gInfo = group.getGroupByGuri(gUri)
	    index.saveLocalRecentContact({groupUri:gUri, groupName:gInfo.name, msg:('→'+msg), sendtime:common.getFullTime()});
		  
		var checkchat = $('#checkchat').val();
		var csrfToken = $("#csrfToken").val();
		$.ajax({type:'POST',url: basepath+'gchat/sendNewMsg.action'+'?t='+new Date().getTime(),data:{groupUri:gUri,msg:face.filterSendMsg(msg),checkchat:checkchat,fromUrl:'',csrfToken:csrfToken},
  	       cache: false,
  	       success: function(data){
			   if(typeof data!='undefined' && data.total!=null && data.total=='938'){
				   $.removeData(Array, 'group.listGroup');
				   group.showGlist();
				   index.showToRemind('你不是该群成员, 无法发言');
			   }
		   },
		   error: function(){

		   },		   
        });
		//setTimeout( function(){ window.scrollTo(0, 1); }, 0 );
	}
	
	//群聊天记录
	group.getGmsg = function(from, nickname, msg, sendtime, groupUri1, groupName1){
		var gmsg = {};
		gmsg.from = from;
		if(typeof groupUri1 == 'undefined' || groupUri1 == null){
			groupUri1 = '';
		}
		gmsg.groupUri = groupUri1;
		if(typeof groupName1 == 'undefined' || groupName1 == null){
			groupName1 = '';
		}
		gmsg.groupName = groupName1;
		gmsg.nickname = nickname;
		gmsg.msg = msg;
		if(typeof sendtime == 'undefined'){
			var date = new Date();
			var hour = date.getHours();
			var minute = date.getMinutes()
			gmsg.sendtime = (hour>=10?hour:('0'+hour))+':'+(minute>=10?minute:('0'+minute));
		}else{
			gmsg.sendtime = sendtime;
		}
		
		return gmsg;
	}
	
	group.saveGmsg = function(gUri, gMsg){
		var listGmsg = $.data(Array, 'listGmsg_'+gUri);
		if(typeof listGmsg=='undefined' || listGmsg==null){
			listGmsg = new Array();
		}
		
		listGmsg.push(gMsg);
		$.data(Array, 'listGmsg_'+gUri, listGmsg);
	}
	
	//缓存群新消息
	group.saveNewGmsg = function(gUri, gMsg){
		var listGmsg = $.data(Array, 'listGmsg_new_'+gUri);
		if(typeof listGmsg=='undefined' || listGmsg==null){
			listGmsg = new Array();
		}		
		listGmsg.push(gMsg);
		$.data(Array, 'listGmsg_new_'+gUri, listGmsg);
	}
	
	//轮询方式下保存群新消息
	group.saveNewGmsgLx = function(gUri, listGmsg){
		if(typeof listGmsg!='undefined' && listGmsg.length>0){
			if($.data(Array, 'listGmsg_new_'+gUri)==null){
				$.data(Array, 'listGmsg_new_'+gUri, listGmsg);
			}else{
				$.data(Array, 'listGmsg_new_'+gUri, $.data(Array, 'listGmsg_new_'+gUri).concat(listGmsg));
			}
		}
	}
	
	//轮询方式下保存群聊天记录
	group.saveGmsgLx = function(gUri, listGmsg){
		if(typeof listGmsg!='undefined' && listGmsg.length>0){
			if($.data(Array, 'listGmsg_'+gUri)==null){
				$.data(Array, 'listGmsg_'+gUri, listGmsg);
			}else{
				$.data(Array, 'listGmsg_'+gUri, $.data(Array, 'listGmsg_'+gUri).concat(listGmsg));
			}
		}
	}
	
	group.getGmsgLx = function(dataGmsg){
		var listGmsg = new Array();
		
		for(var i=0; i<dataGmsg.length; i++){
			var gMsg = dataGmsg[i];
			if(typeof gMsg.message=='undefined' || typeof gMsg.sendTime=='undefined'){
				continue;
			}
			
			var tlen = gMsg.sendTime.length;
			var gmsg = {};
			gmsg.from = gMsg.idSender==idUser?'self':'gBuddy';
			gmsg.nickname = gMsg.senderDispName;
			gmsg.msg = gMsg.message;
			gmsg.sendtime = gMsg.sendTime.substring(tlen-8,tlen-3);
			
			listGmsg.push(gmsg);
		}
		
		return listGmsg;
	}
	
	//退出群确认
	group.quitConfirm = function(gUri){
	   	loader.alertDiv('2','退出该群？','group.infoQuitgroup(\''+gUri+'\')','确定','loader.closeAlertDiv()','取消', 'center');	   	
	}
	
	//退出群
	group.infoQuitgroup = function(gUri){
		$.ajax({type:'POST',url: basepath+'gchat/quitgroupsubmit.action'+'?t='+new Date().getTime(),data:{groupUri:gUri},
  	       cache: false,
  	       success: function(data){
				if(typeof data == "undefined" || data == null){
					return;
				}
				if(typeof data.tip != "undefined" && data.tip != ''){
					if(data.tip.indexOf('已经') > -1){
						var listGroup = $.data(Array, 'group.listGroup');
						if(listGroup!=null && listGroup.length>0){
							for(var i=0; i<listGroup.length; i++){
								if(gUri === listGroup[i].groupUri){
									index.showToRemind('你已退出群"'+listGroup[i].name+'"');
									listGroup = index.removeIndexOf(i, listGroup);
									$.data(Array, 'group.listGroup', listGroup);
									group.showGlist();
									break;
								}
							}
						}
					}
				}
		   },
		   error: function(){
			   
		   }
        });
	}
	
	
	//加入群
	group.addGroup = function(gUri, callBack, sub){
		var gDesc = $("#gDesc").val();
		if(typeof sub == 'undefined'){
			sub = '';
		}
		
		// 关闭输入验证消息层
		group.closeGverification();
		
		$.ajax({type:'POST',url: basepath+'gsearch/addgroup.action'+'?t='+new Date().getTime(),data:{groupUri:gUri,desc:gDesc,sub:sub},
  	       cache: false,
  	       success: function(data){
			    $.removeData(Array, 'group.listGroup');
				if(typeof data == "undefined" || data == null){
					return;
				}
				if(typeof data.tip!="undefined" && data.tip!=''){
					if(data.tip.indexOf('需要群主审批')>-1){
						group.showGverification(gUri, callBack);
					}else{
						index.showToRemind(data.tip);
						if(data.tip.indexOf('等待审批') < 0){
							if(callBack != null){
								callBack();
							}
						}
					}
				}else{
					index.showToRemind('你的加群申请失败,请稍后再试');
				}
		   },
		   error: function(){
			   index.showToRemind('加群申请出错,请稍后再试');
		   }
        });
	}
	
	//群资料加入群回调函数
    group.infoAddGroupCallBack = function(){
    	$('#gInfoAddDiv').css('display', 'none'); 
    	$('#gInfoQuitDiv').css('display', 'block'); 
	}
	
	//搜索群加入群回调函数
	group.searchAddGroupCallBack = function(gUri){
		$('#sr_'+group.getGId(gUri)).addClass('on');
	}
	
	//取最近群聊天记录
	group.queryRecentMsg = function(gUri){
		$.ajax({type:'POST',async:false,url: basepath+'gchat/getRecentGroupChatMsg.action'+'?t='+new Date().getTime(),data:{groupUri:gUri,fromUrl:'qunchat'},
  	       cache: false,
  	       success: function(data){
				if(typeof data!="undefined" && data!=null && data.length>0){
					group.saveGmsgLx(gUri, data, 'recent');
				}
		   },
		   error: function(){
			   
		   }
        });
	}
	
	//查询群未读消息
	group.queryNewMsg = function(gUri){
		index.removeMessagesEventListener();
		$.ajax({type:'POST',url: basepath+'gchat/getNewGroupChatMsg.action'+'?t='+new Date().getTime(),data:{groupUri:gUri,fromUrl:'qunchat',t:new Date().getTime()},
  	       cache: false,
  	       success: function(data){
			   index.addMessagesEventListener();
		   }
        });
	}
	
	//增加轮询查询群未读消息事件监听
	group.addQueryNewMsgEventListener = function(gUri){
		if(typeof group.queryNewMsgEventListener == 'undefined'){
			group.queryNewMsgEventListener = setInterval('group.queryNewMsg(\''+gUri+'\')', 10000);
		}
	}
	
	//删除轮询查询群未读消息事件监听
	group.removeQueryNewMsgEventListener = function(){
		clearInterval(group.queryNewMsgEventListener);
		group.queryNewMsgEventListener = 'undefined';
	}
	
	//根据guri获取gid
	group.getGId = function(groupUri){
		if(typeof groupUri!='undefined' && groupUri!=null){
			return groupUri.substring(6,groupUri.indexOf('@'));
		}
		
		return '';
	}
	
	// 根据guri获取群信息
	group.getGroupByGuri = function(gUri, callback){
		var listGroup = $.data(Array, 'group.listGroup');
		if(listGroup==null || listGroup.length==0){
			if(typeof callback != 'undefined'){
				group.getGlist(true, callback);
			}else{
				group.getGlist();
			}
			listGroup = $.data(Array, 'group.listGroup');
		}
		
		if(listGroup!=null && listGroup.length>0){
			for(var i=0; i<listGroup.length; i++){
				if(gUri === listGroup[i].groupUri){
                    return listGroup[i];
				}
			}
		}
	}
	
	// 根据guri更新群信息
	group.updateGroupByGuri = function(gUri, gGroup){
		var listGroup = $.data(Array, 'group.listGroup');
		if(listGroup!=null && listGroup.length>0){
			for(var i=0; i<listGroup.length; i++){
				if(gUri === listGroup[i].groupUri){
                    listGroup[i] = gGroup;
                    $.data(Array, 'group.listGroup', listGroup);
				}
			}
		}
	}
	
	group.scrollTop = function(){
		setTimeout( function(){ window.scrollTo(0, 1); }, 0 );
	}
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

})()