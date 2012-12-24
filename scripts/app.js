var app = {};

(function(){
	app.showApp = function(){
		var inner = index.getHeader();
		var height = index.getClientHeight();
		var ash = height - 110 + 60;
		inner += '<section id="listAppScroll" class="square" style="height:'+ash+'px;">';
		inner += '<div class="square-block">';
		inner += '<p>';
		inner += '<a href="javascript:app.showRecommendBuddy()"><img src="data:image/png;base64,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" style="position:absolute;width:35px;top:9px;left:24px;"/>';
		inner += '<i></i></a>';
		inner += '</p>';
		inner += '<span>你可能认识的人</span>';
		inner += '</div>';
		if(isWap == 'true'){
			inner += '<div class="square-block">';
			inner += '<p>';
			inner += '<a href="http://f.10086.cn/im/?tp=im5"><img src="data:image/png;base64,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" style="position:absolute;width:35px;top:8px;left:24px;" />';
			inner += '<i></i></a>';
			inner += '</p>';
			inner += '<span>WAP飞信</span>';
			inner += '</div><br>';
		}
		inner += '<div class="square-block">';
		inner += '<p>';
		inner += '<a href="http://f.10086.cn/?tp=im5"><img src="data:image/png;base64,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" style="position:absolute;width:35px;top:8px;left:24px;" />';
		inner += '<i></i></a>';
		inner += '</p>';
		inner += '<span>手机飞信网</span>';
		inner += '</div>';
		inner += '</section>';
		
		inner += index.getFooter();
		$('body').html(inner);
		$('#appTab').addClass('on');
//		index.onloading('appTab');
		scroll = new iScroll('listAppScroll', {hScroll:false, hideScrollbar:true, bounce:false});
		index.hideLocationBar();
	}
	
	//显示推荐好友
	
	var curpage = 0;
	var perpage = 10;
	app.showRecommendBuddy = function(back){
		var listRecommendBuddy = $.data(Array, 'app.listRecommendBuddy');
		
		if(typeof listRecommendBuddy == 'undefined'){
			app.getRecommendBuddy();
			listRecommendBuddy = $.data(Array, 'app.listRecommendBuddy');
		}
		
		var inner = '<div class="wrap">';
		inner += '<header>';
		if(typeof back!='undefined' && back=='index'){
			inner += '<a href="javascript:index.init()"><div class="return"></div></a>';
		}else{
			inner += '<a href="javascript:app.showApp()"><div class="return"></div></a>';
		}
		if(typeof back!='undefined' && back=='index'){
			inner += '<div class="header-text">朋友们正在玩飞信</div>';
		}else{
			inner += '<div class="header-text">你可能认识的人</div>';
		}
		inner += '</header>';
		var height = index.getClientHeight();
		var lrb = height - 50;
		inner += '<section id="listRecommendBuddyScroll" style="height:'+lrb+'px;">';
		inner += '<section class="list_spe_style">';
		inner += '<ul class="user_sub_list user_sub_list1">';

		if(listRecommendBuddy!=null && listRecommendBuddy.length>0){
			for(var i=curpage*perpage; i<((curpage+1)*perpage>=listRecommendBuddy.length?listRecommendBuddy.length:(curpage+1)*perpage); i++){
				var recommendBuddy = listRecommendBuddy[i];
				var nickname = '';
				var reason = '';
				
				if(recommendBuddy != null){
					nickname = typeof recommendBuddy.nickname=='undefined'||recommendBuddy.nickname==null?'':recommendBuddy.nickname;
					reason = typeof recommendBuddy.reason=='undefined'||recommendBuddy.reason==null?'':recommendBuddy.reason;
				}
				
				var	width = document.documentElement.clientWidth - 180;

				inner += '<li>';
				inner += '<div onclick="app.toChat('+recommendBuddy.idUser+', \''+nickname+'\')">';
				inner += '<div class="person_img">';
				inner += '<img alt="" src="'+basepath+'images/html5/1.jpg">';
				inner += '<em class="icon icon-news2"></em>';
				inner += '</div>';
				inner += '<div class="user_cont" style="width:'+width+'px">';
				inner += '<p class="name">'+index.subString(nickname, 14)+'</p>';
				inner += '<p class="mood">'+index.subString(reason, 20)+'</p>';
				inner += '</div><div id="toChatId'+recommendBuddy.idUser+'" style="float:left;width:20px;height:20px;"></div>';
				inner += '</div>';
				inner += '<div id="addF_'+recommendBuddy.idFetion+'" onclick="app.addRecommendBuddy('+recommendBuddy.idFetion+', this)" class="select"><div class="hx"></div><div class="sx"></div></div>';
				inner += '</li>';
			}
			
			if(listRecommendBuddy.length > perpage){
				inner += '<a href="javascript:app.showRecommendBuddy(\''+back+'\')"><li><div class="person_more">换一批</div></li></a>';
			}
		}
		inner += '</ul>';
		inner += '</section>';
		inner += '</section>';
		inner += '</div>';
		
		$('body').html(inner);
		index.hideLocationBar();
		if(listRecommendBuddy==null || listRecommendBuddy.length==0 || (curpage+1)*perpage>=listRecommendBuddy.length){
			curpage = 0;
		}else{
			curpage++;
		}
		
		if(typeof listRecommendBuddy=='undefined' || listRecommendBuddy==null || listRecommendBuddy.length==0){
			index.showToRemind('你还没有可能认识的人');
		}else{
			scroll = new iScroll('listRecommendBuddyScroll', {hScroll:false, hideScrollbar:true, bounce:false});
		}
	}
	
	//跳转到聊天页面
	app.toChat = function(idUser, pName){
		$("#toChatId"+idUser).html('<img src="'+basepath+'images/html5/loading.gif"/>');
		loader.getChatFile();
		chat.init(idUser, pName);
	}
	
	//添加推荐好友
	app.addRecommendBuddy = function(idFetion, div){
		index.addFriendSubmit(idFetion, 1, 'addF_'+idFetion, div);
		$.removedData(Array, 'app.listRecommendBuddy');
	}
	
	//获取推荐好友
	app.getRecommendBuddyEvent = null;
	app.getRecommendBuddy = function(){
		$.ajax({type:'POST',async:false,url: basepath+'index/recommendBuddies.action'+'?t='+new Date().getTime(),data:{size:40, page:0},
  	       cache: false,
  	       success: function(data){
			    clearTimeout(app.getRecommendBuddyEvent);
			    if(typeof data!='undefined' && data!=null){
					$.data(Array, 'app.listRecommendBuddy', data.returnBuddies);
					app.getRecommendBuddyEvent = setTimeout(
					    function(){
				    	   $.removeData('app.listRecommendBuddy');
				        }, 
				        300000);
			    }
		   },
        });
	}

})()