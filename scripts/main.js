var main = {};

(function(){	
	main.friendsCurPN = -1;
	main.friendsPgSize = 10;
	main.friendsPgNum = 1;
	main.friendGroupIds = '';
	main.reGetDataCounts = 1;
	main.groupNum = 0;
	
	main.init  = function(){
		if(typeof chat == 'undefined'){
			loader.getChatFile();
		}
		main.appendHtml();
		
		$('#mainTab').addClass('on');
		index.onloading('mainTab');
		if(index.messagenum > 0){
			$("#messagenumid").html('<i></i>' + index.messagenum);
			$("#messagenumid").show();
		}
		var groupListData = $.data(Array, 'main.friends.contactsgroups');
		if(typeof groupListData != "undefined" && groupListData != null ){
			if($('#friendListScroll').html() == ''){
				  main.appendGroupList(groupListData);
				  main.getOneGroupFriends();
				  main.addGroupListEventListener();
			}
		}else{
			main.getGroupList("groups", main.getOneGroupFriends);
			main.addGroupListEventListener();
		}
		window.scrollTo(0, 1);
//		scroll = new iScroll('friendListScroll', {hScroll:false, hideScrollbar:true, bounce:false});
	}
	
	main.appendHtml = function(){
		if(typeof user == 'undefined'){
			loader.getUserFile();
		}
//		var height = index.getClientHeight();
//		var frlistHeight = height - 145;
		var thtml = index.getHeader();
		thtml += '<div class="seach"><input type="text" class="text" id="queryKey" placeholder="输入姓名或手机号搜索好友"><input type="button" class="btn" onclick="main.queryFriendsByKey()"></div>';
		thtml += '<div id="loading" ><img src="'+basepath+'images/html5/loading.gif" class="loading" /></div>';
		thtml += '<div class="list_spe_style" id="friendListScroll" style="min-height:300px"></div>';
		thtml += index.getFooter();
		thtml += '<script type="text/javascript" src="'+basepath+'js/libs/base64.h5.js"></script>';
		$('body').html(thtml);

//		scroll.refresh();
	}
	
	main.queryFriendsByKey = function(){
		var queryKey = $.trim($("#queryKey").val());
		if(typeof queryKey == 'undefined' || queryKey == null || queryKey == ""){
			loader.alertDiv("0","请输入姓名或手机号搜索好友", "","","","", "left");
			return;
		}
		user.queryFriendsInit();
		user.searchFriendsByQueryKey(queryKey);
	}
	
	//通过id去获取每个分组的好友
	main.getOneGroupFriends = function(){
		var friendGroupIds = $.data(String, 'main.friendGroupIds');
		if(friendGroupIds != null && friendGroupIds.indexOf(",") > -1){
			var fgids = new Array();
	    	fgids = friendGroupIds.split(',');
	    	for(var i = 0;i < fgids.length;i++){
	    		var groupData = $.data(Array, 'main.friends.contacts' + fgids[i]);
	    		var groupTotal = $.data(Number, 'main.friendsTotal' + fgids[i]);
	    		if((typeof groupData == 'undefined' || groupData == null)
	    				&& (typeof groupTotal == 'undefined' || groupTotal == null)){	    			
	    			main.queryFriendsLocked = false;
	    			setTimeout('main.getFriends(main.queryFriendsCallBack, '+fgids[i]+')', 300);
	    		}
//	    		else{
//	    			main.queryFriendsLocked = true;
//	    			main.queryFriendsCallBack(fgids[i]);
//	    		}
	    	}
	    }
	}
	
	//查询、显示 好友列表
	main.queryFriends = function(callback, groupId){
	   if(typeof main.queryFriendsLocked == 'undefined' || !main.queryFriendsLocked){
          var inner = '<div id="friends_loading_' + groupId + '"><li style="height:45px;"><div style="text-align:center;"><img src="'+basepath+'images/html5/loading.gif" width="40" height="40"/></div></li></div>';
          $('#user_sub_list_' + groupId).append(inner);
          main.queryFriendsLocked = true;
          main.getFriends(main.queryFriendsCallBack);
	   }
	}
	
	//查询好友列表回调函数
	main.queryFriendsCallBack = function(groupId){
	   main.friendsCurPN==-1?main.friendsCurPN=1:main.friendsCurPN++;
	   if(main.queryFriendsLocked){
		   main.addFriends(groupId, main.friendsCurPN);
	   }
	   main.queryFriendsLocked = false;
	}
	
	//添加好友列表
	main.addFriends = function(groupId){
		var data = $.data(Array, 'main.friends.contacts' + groupId);
		var groupContactsData = $.data(Array, 'main.friends.contacts' + groupId +'tmp');
		$('#friends_loading_'+groupId).remove();
		main.friendsCurPN==-1?main.friendsCurPN=1:main.friendsCurPN=main.friendsCurPN;
		$("#infosId").remove();
		if((groupContactsData == null || groupContactsData.length == 0) && data != null && data.length > 0 && data[0] != null && (typeof data[0].changeType == 'undefined' || data[0].changeType == null || data[0].changeType == '')){
			var gnum = 0;
			if(data.length > 20){
				gnum = data.length;
				for(var i=0;i<20;i++){
					if($("#"+groupId+"_"+data[i].idContact).length == 0){
						main.appendFriendList(groupId, data[i]);
						main.changeUserImg(groupId, data[i]);
//						gnum++;
					}				
				}
				setTimeout(function(){
							for(var j=20;j<data.length;j++){
								if($("#"+groupId+"_"+data[j].idContact).length == 0){
									main.appendFriendList(groupId, data[j]);
									main.changeUserImg(groupId, data[j]);
//									gnum++;
								}
							}
				}, 2000);
			}else{
				for(var i=0;i<data.length;i++){
					if($("#"+groupId+"_"+data[i].idContact).length == 0){
						main.appendFriendList(groupId, data[i]);
						main.changeUserImg(groupId, data[i]);
						gnum++;
					}				
				}
			}			
			$("#groupTotal" + groupId).html(gnum);
		}else if(data != null && data.length > 0 && data[0] != null && data[0].changeType != null && data[0].changeType != ''){
			var gnum = 0;
			if(data.length > 20){
				gnum = data.length;
				for(var i=0;i<20;i++){
					var contact = data[i];
					if(contact.changeType == 'del'){
						$("#user_sub_list_"+ groupId+" li:eq("+contact.position-1+")").remove();
					}else if(contact.changeType == 'add'){
						if($("#"+groupId+"_"+contact.idContact).length == 0){
							if(data.length > contact.position){
								main.appendFriendList(groupId, contact, contact.idContact, 'before', contact.position);
							}else{
								main.appendFriendList(groupId, contact, contact.idContact, 'after', contact.position);
							}
							main.changeUserImg(groupId, contact);
//							gnum++;
						}					
					}else if(contact.changeType == 'change'){
						$('#' + groupId + '_' + contact.idContact).remove();
						if($("#"+groupId+"_"+contact.idContact).length == 0){
							if(data.length > contact.position){
								main.appendFriendList(groupId, contact, contact.idContact, 'before', contact.position);
							}else{
								main.appendFriendList(groupId, contact, contact.idContact, 'after', contact.position);
							}
							main.changeUserImg(groupId, contact);
//							gnum++;
						}
					}				
				}
				//20~20+
				setTimeout(function(){
					for(var j=20;j<data.length;j++){
						var contact = data[j];
						if(contact.changeType == 'del'){
							$("#user_sub_list_"+ groupId+" li:eq("+contact.position-1+")").remove();
						}else if(contact.changeType == 'add'){
							if($("#"+groupId+"_"+contact.idContact).length == 0){
								if(data.length > contact.position){
									main.appendFriendList(groupId, contact, contact.idContact, 'before', contact.position);
								}else{
									main.appendFriendList(groupId, contact, contact.idContact, 'after', contact.position);
								}
								main.changeUserImg(groupId, contact);
//								gnum++;
							}					
						}else if(contact.changeType == 'change'){
							$('#' + groupId + '_' + contact.idContact).remove();
							if($("#"+groupId+"_"+contact.idContact).length == 0){
								if(data.length > contact.position){
									main.appendFriendList(groupId, contact, contact.idContact, 'before', contact.position);
								}else{
									main.appendFriendList(groupId, contact, contact.idContact, 'after', contact.position);
								}
								main.changeUserImg(groupId, contact);
//								gnum++;
							}
						}				
					}
				}, 2000);
			}else{
				for(var i=0;i<data.length;i++){
					var contact = data[i];
					if(contact.changeType == 'del'){
						$("#user_sub_list_"+ groupId+" li:eq("+contact.position-1+")").remove();
					}else if(contact.changeType == 'add'){
						if($("#"+groupId+"_"+contact.idContact).length == 0){
							if(data.length > contact.position){
								main.appendFriendList(groupId, contact, contact.idContact, 'before', contact.position);
							}else{
								main.appendFriendList(groupId, contact, contact.idContact, 'after', contact.position);
							}
							main.changeUserImg(groupId, contact);
							gnum++;
						}					
					}else if(contact.changeType == 'change'){
						$('#' + groupId + '_' + contact.idContact).remove();
						if($("#"+groupId+"_"+contact.idContact).length == 0){
							if(data.length > contact.position){
								main.appendFriendList(groupId, contact, contact.idContact, 'before', contact.position);
							}else{
								main.appendFriendList(groupId, contact, contact.idContact, 'after', contact.position);
							}
							main.changeUserImg(groupId, contact);
							gnum++;
						}
					}				
				}
			}
			if(gnum > 0){
				$("#groupTotal" + groupId).html(gnum);
			}
		}else if(groupContactsData != null && groupContactsData.length > 0 && data != null && data.length > 0 && data[0] != null && (typeof data[0].changeType == 'undefined' || data[0].changeType == null || data[0].changeType == '')){
			$("#user_sub_list_"+ groupId).html('');
			var gnum = 0;
			if(data.length > 20){
				gnum = data.length;
				for(var i=0;i<20;i++){
					if($("#"+groupId+"_"+data[i].idContact).length == 0){
						main.appendFriendList(groupId, data[i]);
						main.changeUserImg(groupId, data[i]);
//						gnum++;
					}
				}
				setTimeout(function(){
					for(var j=20;j<data.length;j++){
						if($("#"+groupId+"_"+data[j].idContact).length == 0){
							main.appendFriendList(groupId, data[j]);
							main.changeUserImg(groupId, data[j]);
//							gnum++;
						}
					}
				}, 2000);
			}else{
				for(var i=0;i<data.length;i++){
					if($("#"+groupId+"_"+data[i].idContact).length == 0){
						main.appendFriendList(groupId, data[i]);
						main.changeUserImg(groupId, data[i]);
						gnum++;
					}
				}
			}
			$("#groupTotal" + groupId).html(gnum);
		}
		$("#pgroupId" + groupId).html('');
	}
			
	//向页面填充好友列表
	main.appendFriendList = function(groupId, contact, idUser, toAppend, position){
		var inner = '';
		//var data = $.data(Array, 'main.friends.contacts' + groupId);
		//var contact = data[i];
		if(contact){
			  var localName = main.getFriendLocalName(contact);
			  var nickname = localName;
			  if(nickname.indexOf(" [黑名单]") > -1 || nickname.indexOf(" [未开通]") > -1 || nickname.indexOf(" [陌生人]") > -1 || nickname.indexOf(" [待验证]") > -1 || nickname.indexOf(" [拒绝]") > -1){
				  nickname = nickname.replace(" [黑名单]","");
				  nickname = nickname.replace(" [未开通]","");
				  nickname = nickname.replace(" [陌生人]","");
				  nickname = nickname.replace(" [待验证]","");
				  nickname = nickname.replace(" [拒绝]","");
			  }
			  inner += '<li id="'+groupId+'_'+contact.idContact+'" onclick="main.toChatInit(\''+ contact.idContact +'\',\''+nickname+'\');">';
			  inner += '<a href="#ch"><div class="person_img" id="uimg' + groupId + contact.idContact +'">';
			  var headcrc = basepath+"images/html5/1.jpg";
			  var imgsrc = '<img src="' + headcrc + '" alt="" onerror="noimage(this);" />';
			  inner += imgsrc+'</div>';
		      inner += '<div class="user_cont">';
		     
		      inner += '<p class="name">'+index.subString(localName, 24)+'&nbsp;</p>';
		      var impresa = main.getFriendImpresa(contact);
		      inner += '<p class="mood">'+index.subString(impresa, 24)+'&nbsp;</p></div>';
			  inner += '<p id="ptoChatId'+contact.idContact+'"></p></a></li>';
			  contactType = "";
			  if(typeof position == 'undefined' || typeof toAppend == 'undefined'){
				  $('#user_sub_list_' + groupId).append(inner);
			  }else{
				  if(toAppend == 'after'){
					  $("#user_sub_list_"+ groupId+" li:eq("+position-1+")").after(inner);
				  }else if(toAppend == 'before'){
					  $("#user_sub_list_"+ groupId+" li:eq("+position+1+")").before(inner);
				  }
			  }
			  inner = '';
		   }else{
			   inner = '<div id="friends_loading_'+groupId+'"><li style="height:45px;"><div style="text-align:center;"><img src="'+basepath+'images/html5/loading.gif" width="40" height="40"/></div></li><li style="height:45px;"></li><li style="height:45px;"></li><li style="height:45px;"></li><li style="height:45px;"></li></div>';
		       $('#user_sub_list_' + groupId).append(inner);
		   }
//		   scroll.refresh();
	}
	
	main.toChatInit = function(idUser, nickName){
		$("#ptoChatId"+idUser).html('<img src="'+basepath+'images/html5/loading.gif" class="loading" style="margin-top:15px;margin-left:15px;"/>');
		chat.init(idUser, nickName);
	}
	
	//生成好友昵称
	main.getFriendLocalName = function(contact){
		if(typeof contact == 'undefined' || contact == null){
			return "好友";
		}
		var localName = contact.localName;
	      if(null == localName || "" == localName || typeof localName == "undefined"){
			  var idFetion = contact.idFetion;
			  if(null != idFetion && "" != idFetion && typeof idFetion != "undefined"){
				  localName = idFetion;
			  }else{
				  localName = "好友";
			  }
		  }
		  localName = localName.replace("<","&lt;");
		  //if(isvip == 'true'){
			  //localName = '<font color="red">' + localName + '</font>';
		  //}
		  var relationStatus = contact.relationStatus;
		  var contactType = contact.contactType;
		  var statuStr = "";
		  var isBlacked = contact.isBlocked;
		  if(typeof isBlacked != "undefined" && isBlacked != null && isBlacked == "1"){
			  statuStr = " [黑名单]";
		  }
		  var uri = contact.uri;
		  var isClosed = contact.basicServiceStatus;
		  if((typeof isClosed != "undefined" && isClosed != null && isClosed == "0") && (typeof uri == "undefined" || uri == null || uri.indexOf('tel') == -1)){
			  statuStr = " [未开通]";
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
		  return localName;
	}
	
	//生成好友的心情
	main.getFriendImpresa = function(contact){
	  var impresa = contact.impresa;
	  if(null == impresa || typeof impresa == "undefined"){
		  impresa = "";
	  }
	  impresa = impresa.replace("<","&lt;");	  
	  return impresa;
	}
	
	var allFriends = {};
	//加载单个分组好友列表数据
    main.getFriends = function(callBack, groupId){
	  $.ajax({url: basepath+'index/contactlistView.action?fromUrl=&idContactList='+groupId+'&t='+new Date().getTime(),
		   timeout: 10000,
	       dataType: 'json',
	       cache: false,
	       success: function(data){		  	  
			  if(data != null && data.contacts != null){
				  var contacts = data.contacts;
				  for(var i=0;i<contacts.length;i++){
					  allFriends[contacts[i].idContact] = contacts[i];
				  }
			  }
			  main.groupNum--;
			  if(main.groupNum == 0 && allFriends != null){
				  $.data(Array, 'main.allfriends', allFriends);
				  if(getListMsgType == 'ws' && typeof ws == 'undefined'){
					  loader.getWsFile();
				  }
			  }
		      main.saveFriendsData(groupId, data);
		      if(typeof callBack != 'undefined' && callBack != null && callBack != ""){
		    	 callBack(groupId); 
		      }
           },
           error: function(){
//        	   var uslhtml = $('#user_sub_list_' + groupId).html();
//        	   if(uslhtml == ''){
//        		   var inner = '<p style="text-align:center;" id="infosId">因网络问题未显示，请点击&nbsp;<a class=\"a_blue\" href=\"'+basepath+'index/html5.action?t='+new Date().getTime()+'\">刷新</a></p>';
//    			   $('#user_sub_list_' + groupId).html(inner);
//        	   }
        	   var groupListData = $.data(Array, 'main.friends.contactsgroups');
        	   if((typeof groupListData == "undefined" || groupListData == null) && main.reGetDataCounts <= 3){
        		   main.reGetDataCounts++;
	        	   main.init();
        	   }
           }
      });
    }
    
    //获取分组列表
    main.getGroupList = function(groupId, callBack){
//    	if($('#friendListScroll').length == 0){
//    		main.removeGroupListEventListener();
//    		return;
//    	}
    	$.ajax({url: basepath+'index/loadGroupContactsAjax.action?fromUrl=&t='+new Date().getTime(),
 	       dataType: 'json',
 	       cache: false,
 	       async:false,
 	       success: function(data){
    		  if(data != null && data.contacts != null){
    			  main.groupNum = data.contacts.length;
    		  }
    		  main.clearGroupFriendList();
    		  if($('#friendListScroll').html() == ''){
				  main.appendGroupList(data.contacts);
			  }
    		  if($('#friendListScroll').length > 0){
				  var groupData = $.data(Array, 'main.friends.contacts' + groupId);
				  if(typeof groupData != 'undefined' && groupData != null){
					  main.grepGroupList(groupId, data);
				  }
    		  }
 		      main.saveFriendsData(groupId, data); 	
 		      if(typeof callBack != 'undefined' && callBack != null && callBack != ""){
 		    	 callBack(groupId);
 		      }
 		      if($('#friendListScroll').length > 0){
 		    	 main.init();
 		      }
            },
            error: function(){
         	  
            }
       });
    }
    
    main.clearGroupFriendList = function(){
    	var friendGroupIds = $.data(String, 'main.friendGroupIds');
		if(friendGroupIds != null && friendGroupIds.indexOf(",") > -1){
			var fgids = new Array();
	    	fgids = friendGroupIds.split(',');
	    	for(var i = 0;i < fgids.length;i++){
	    		$.data(Array, 'main.friends.contacts' + fgids[i], null);
	    		$.data(Number, 'main.friendsTotal' + fgids[i], null);
	    	}
//	    	$.data(Array, 'main.allfriends', null);
	    }
    }
    
    //比对分组列表，新获取的json与原来$.data存储的数组对比
    main.grepGroupList = function(groupId, data){
    	var groupTotal = $.data(Number, 'main.friendsTotal' + groupId);
    	var groupData = $.data(Array, 'main.friends.contacts' + groupId);
    	var groupDataNew = new Array();
    	groupDataNew = eval(data.contacts);
    	for(var i = 0;i < groupData.length;i++){
    		var isExist = false;
    		for(var j = 0;j < groupDataNew.length;j++){
    			if(groupData[i].idContactList == groupDataNew[j].idContactList){
    				isExist = true;
    			}
    		}
    		if(!isExist){
    			$("#groupId" + groupData[i].idContactList).parents("dt").remove();
    			$("#user_sub_list_" + groupData[i].idContactList).remove();
    		}
    	}
		for(var m = 0;m < groupDataNew.length;m++){
    		var isExist = false;
    		for(var n = 0;n < groupData.length;n++){
    			if(groupData[n].idContactList == groupDataNew[m].idContactList){
    				isExist = true;
    				if(groupData[n].contactListName != groupDataNew[m].contactListName){
    					$("#groupId" + groupData[n].idContactList).html(groupDataNew[m].contactListName);
    				}else if(groupData[n].onlineContactTotal != groupDataNew[m].onlineContactTotal || groupData[n].contactTotal != groupDataNew[m].contactTotal){
    					$("#groupTotal" + groupData[n].idContactList).html('[' + groupDataNew[m].contactTotal + ']');
    				}
    				break;
    			}
    		}
    		if(!isExist){
    			var inner = '<div class="list-unfold" onclick="main.showGroupFriends('+groupDataNew[m].idContactList+',1);">'
					+'<span id="groupTotal'+groupDataNew[m].idContactList+'">['+groupDataNew[m].contactTotal+']</span>'
					+'<p><em class="icon icon-down" id="groupId'+groupDataNew[m].idContactList+'"></em>'+index.subString(groupDataNew[m].contactListName, 10)+'</p><p id="pgroupId'+gdata[n].idContactList+'"></p></div>'
					+'<ul class="user_sub_list" id="user_sub_list_'+groupDataNew[m].idContactList+'" style="display: none;"></ul>';
    			if(m == 0){    				
    				$("#groupId" + groupData[0].idContactList).before(inner);
    			}else{
    				$("#user_sub_list_" + groupDataNew[m-1].idContactList).after(inner);
    			}
    		}
    	}
//		scroll.refresh();
    }
    
    //向页面填充整个分组列表
    main.appendGroupList = function(gdata){
    	var inner = ''
    	if(typeof gdata != 'undefined' && gdata != null && gdata.length > 0){
    		for(var n = 0;n < gdata.length;n++){
    			inner += '<div class="list-unfold" onclick="main.showGroupFriends('+gdata[n].idContactList+',1);">'
	    			+'<span id="groupTotal'+gdata[n].idContactList+'">'+gdata[n].contactTotal+'</span>'
	    			+'<p><em class="icon icon-down" id="groupId'+gdata[n].idContactList+'"></em>'+index.subString(gdata[n].contactListName, 10)+'</p><p id="pgroupId'+gdata[n].idContactList+'"></p></div>'
	    			+'<ul class="user_sub_list" id="user_sub_list_'+gdata[n].idContactList+'" style="display: none;"></ul>';
    		}
    	}
		$('#friendListScroll').html(inner);
		$('#loading').remove();
		$("#tab_loading").remove();
//		scroll.refresh();
    }
          
    //缓存好友列表数据
    main.saveFriendsData = function(groupId, data){
       var groupFriendsData = $.data(Array, 'main.friends.contacts' + groupId);
       if(typeof groupFriendsData!='undefined'){
    	   $.data(Array, 'main.friends.contacts' + groupId +'tmp', groupFriendsData);
       }
	   if(typeof data!='undefined' && data != null){	
		   $.data(Number, 'main.friendsTotal' + groupId, 0);
		   $.data(Array, 'main.friends.contacts' + groupId, null);
		   
		   if(typeof data.total != 'undefined' && data.total != null && data.total != ""){
			   $.data(Number, 'main.friendsTotal' + groupId, data.total);
			   if((data.total % main.friendsPgSize) == 0){
				    main.friendsPgNum = data.total / main.friendsPgSize;
				}else{
					main.friendsPgNum = parseInt(data.total / main.friendsPgSize) + 1;
				}
		   }
		   if(data.contacts && data.contacts.length>0){
			   if($.data(Array, 'main.friends.contacts' + groupId) == null){
				   $.data(Array, 'main.friends.contacts' + groupId, data.contacts);
			   }else{
				   for(var i=0; i<data.contacts.length; i++){
					   $.data(Array, 'main.friends.contacts' + groupId).push(data.contacts[i]);
				   }
			   }
		   }
		   if(typeof data.friendGroupIds != 'undefined' && data.friendGroupIds != null && data.friendGroupIds != ""){
			   $.data(String, 'main.friendGroupIds', data.friendGroupIds);
		   }
	   }
    }
    
  //加载在线好友列表数据
    main.getOnlineFriends = function(callBack){
	  $.ajax({url: basepath+'index/loadOnlineFirends.action?fromUrl=&t='+new Date().getTime(),
		   timeout: 10000,
	       dataType: 'json',
	       cache: false,
	       success: function(data){
			  if(typeof data != 'undefined' && data != null && typeof data.total != 'undefined' && data.total != null){
				  $('#onlines_total').html('[ ' + data.total + ' ]');
			  }
			  if(data == null || data.total == 0){
				  $('#user_sub_list_onlines').html('');
			  }
		      main.saveFriendsData('onlines', data);
		      if(typeof callBack != 'undefined' && callBack != null && callBack != ""){
		    	 callBack('onlines');
		      }
           },
           error: function(){
//			   var uslhtml = $('#user_sub_list_onlines').html();
//        	   if(uslhtml == ''){
//        		   var inner = '<p style="text-align:center;" id="infosId">因网络问题未显示，请点击&nbsp;<a class=\"a_blue\" href=\"'+basepath+'index/html5.action?t='+new Date().getTime()+'\">刷新</a></p>';
//    			   $('#user_sub_list_onlines').html(inner);
//        	   }
           }
      });
    }
	
    //替换用户真实头像
	main.changeUserImg = function(groupId, contact){
		//var data = $.data(Array, 'main.friends.contacts' + groupId);
		//var contact = data[i];
		var headcrc = basepath+"images/html5/1.jpg";
		if(contact){
			  headcrc = main.getUserRealHead(contact);
			  if(headcrc.indexOf("1.jpg") == -1){
				  main.loadRealUserImg(groupId, contact.idContact, headcrc);
			  }
			  //main.changeUserState(contact, groupId);
		 }
		
	}
	
	//加载好友真实头像
	main.getUserRealHead = function(contact){
		var headcrc = basepath+"images/html5/1.jpg";
		if(typeof contact.portraitCrc != "undefined" && null != contact.portraitCrc && "" != contact.portraitCrc && "0" != contact.portraitCrc){
			var base = new Base64();
			var idContact = (contact.idContact).toString();
			var idmod1 = contact.idContact % 100;
			var idmod2 = idContact.substring(0, 2);
			var idUser = base.encode(idContact);
			headcrc = "http\://f.10086.cn/images/im/f/" + idmod1 + "/" + idmod2 + "/" + idUser + "/60.jpg";
	    }
		return headcrc;
	}
	
	//更新好友状态图标
	main.changeUserState = function(contact, groupId){
		var stateIcon = '';
		var presenceBasic = contact.presenceBasic;
		if(typeof presenceBasic != "undefined" && (null == presenceBasic || presenceBasic == "" || presenceBasic == "0")){
			var smsOnline = contact.smsOnlineStatus;
//			if(typeof smsOnline != "undefined" && null != smsOnline && (smsOnline == "0.00:00:00" || smsOnline == "0.0:0:0")){
//				stateIcon = 'iconsms smson';
//			}else 
			if(typeof smsOnline != "undefined" && null != smsOnline && (smsOnline == "36500.00:00:00" || smsOnline == "36500.0:0:0")){
				var headcrc = main.getUserRealHead(contact);
				var headcrc2 = canvasImage(headcrc);
				if(headcrc != headcrc2 && headcrc2.indexOf(";base64") != -1){
					headcrc = headcrc2;
				}else{
					headcrc = basepath+"images/html5/3.jpg";
				}
				if(headcrc.indexOf("1.jpg") == -1){
					main.loadRealUserImg(groupId, contact.idContact, headcrc);
				}
			}else{
				stateIcon = 'iconsms smson';
			}
		}else if(typeof presenceBasic != "undefined" && null != presenceBasic && (presenceBasic == "500" || presenceBasic == "600")){
			stateIcon = 'icon busy';
		}else if(typeof presenceBasic != "undefined" && null != presenceBasic && presenceBasic == "100"){
			stateIcon = 'icon leave';
		}
		//$('#uimg'+groupId+contact.idContact+' > img').after('<em class="' + stateIcon + '" id="em'+groupId+contact.idContact+'"></em>');
		if(stateIcon == ''){
			$('#em'+groupId+contact.idContact).removeClass();
		}else{
			$('#em'+groupId+contact.idContact).removeClass().addClass(stateIcon);
		}		
	}
	
	//替换好友头像
	main.loadRealUserImg = function(groupId, cid, visrc){
		var inner = "";
		if(visrc != ""){
			inner = '<img src="' + visrc + '" alt="" onerror="noimage(this)" />';
			$('#uimg' + groupId + cid).html(inner);
		}
	}
			
	//查询在线用户总数
	main.queryOnlineFriendsTotal = function(){
		main.getOnlineFriendsTotal();
	}
	
	//显示在线用户总数
	main.showOnlineFriendsTotal = function(){
	   var total = $.data(Number, 'main.friendsTotal');
	   var onlineContactTotal = $.data(Number, 'main.onlineFriendsTotal');
	   if(typeof total!='undefined' && typeof onlineContactTotal!='undefined'){
		   $('#online_info').html('在线：'+total);
	   }else{
		   $('#online_info').html('');
	   }
	}
	
    //加载当前在线用户数
    main.getOnlineFriendsTotal = function(callBack){
	  $.ajax({url: basepath+'index/queryOnlineFriends.action'+'?t='+new Date().getTime(),
	        dataType: 'json',
	        cache: false,
	        success: function(data){
		      main.saveOnlineFriendsTotalData(data);
		      if(typeof callBack != 'undefined'){
		    	 callBack();
		      }
            },
            error: function(){
//	              common.doRequestError(xhr.status);
            }
      });
    }   
   
   
    //缓存当前在线用户数
    main.saveOnlineFriendsTotalData = function(data){
	   if(typeof data != 'undefined'){
		  $.data(Number, 'main.friendsTotal', data.total);
		  $.data(Number, 'main.onlineFriendsTotal', data.onlineContactTotal);
	   }
    }
    
    main.showGroupFriends = function(groupId,sid){
      	var uslgi = $("#user_sub_list_" + groupId);
      	var groupf = uslgi.css("display");
    	if(groupf == "none"){
    		$("#pgroupId" + groupId).html('<img src="'+basepath+'images/html5/loading.gif" class="loading" style="margin-top:15px;margin-left:15px;"/>');
    		main.queryFriendsLocked = true;
    		var groupData = $.data(Array, 'main.friends.contacts' + groupId);
    		if(typeof groupData == 'undefined' || groupData == null){
    			main.getFriends(main.queryFriendsCallBack, groupId);
    		}else{
    			main.queryFriendsCallBack(groupId);
    		}
    		uslgi.show();
    		$("#groupId" + groupId).removeClass("icon icon-down").addClass("icon icon-and");
    	}else if(groupf == "block"){
    		$("#pgroupId" + groupId).html('');
    		uslgi.hide();
    		$("#groupId" + groupId).removeClass("icon icon-and").addClass("icon icon-down");
    	}
//    	scroll.refresh();
    }
    
    //设置用户登录状态
    main.setLoginStatus = function(lgstatus){
    	$.ajax({url: basepath+'index/setLoginStatus.action?loginstatus='+lgstatus,
 	       cache: false,
 	       success: function(data){
	    		if(data.msg == "success"){
	    		  $(".droplist").hide();
	 		      $("#loginStatus").empty();
	 		      var tempStauts = '';
	 		      if(lgstatus == "600"){
	 		    	 tempStauts = '[ <em class="icon busy"></em> 忙碌';
	 		      }else if(lgstatus == "100"){
	 		    	 tempStauts = '[ <em class="icon leave"></em> 离开';
	 		      }else if(lgstatus == "0"){
	 		    	 tempStauts = '[ <em class="icon hide"></em> 隐身';
	 		      }else{
	 		    	 tempStauts = '[ <em class="icon online"></em> 在线';
	 		      }
	 		      $("#loginStatus").append(tempStauts + '<em class="icon dropdown"></em>]');
	    		}
    		},
    		error: function(){
    			loader.alertDiv("0","操作有误，请稍后重试", "","","","", "left");
    		}
       });
    }
    
    main.exit = function(){
    	var stat = confirm('确定退出3G飞信？');
    	if(stat == true){
    		location.href = basepath+'index/logoutsubmit.action';
    	}
    	
    }
    
    //搜友
    main.searchFriendsByQueryKey = function(){
    	var queryKey = $("#queryKey").val();
    	if(typeof queryKey != 'undefined' && queryKey != null && queryKey != ""){
    		$.ajax({type:'POST',url: basepath+'index/searchFriendsByQueryKey.action'+'?t='+new Date().getTime(),data:{queryKey:queryKey},
 	  	       cache: false,
 	  	       success: function(data){
 					if(typeof data != 'undefined' && data != null){
 						//clearInterval(autoRefresh);
 						$('#user_sub_list_' + groupId).empty();
 						main.saveFriendsData(data);
 						$('#friends_loading').remove();
 						main.addFriends(1);
 					}else{
 						loader.alertDiv("0","未找到满足条件的好友", "","","","", "left");
 					}
 			   },
 			   error: function(){
 				   
 			   }
 	        });
     	}else if(queryKey == "" || queryKey == null){
    		//autoRefresh = setInterval('main.autoRefreshList()', 30000);
    		main.friendsCurPN = -1;
    		main.queryFriendsLocked = false;
    		main.showMainCon('friends');
    	}
    }
    
  //消息轮询
	main.addGroupListEventListener = function(){
		if(typeof main.groupListEventListener == 'undefined'){
			main.groupListEventListener = setInterval('main.getGroupList("groups", main.getOneGroupFriends)', 60000);
		}
	}
	
	main.removeGroupListEventListener = function(){
		clearInterval(main.groupListEventListener);
		main.groupListEventListener = undefined;
	}
    
    main.sleeping = function(){
    	return;
    }
})()