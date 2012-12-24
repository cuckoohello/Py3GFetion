function noimage(img){
	var headsrc = "../images/html5/1.jpg";
	img.src = headsrc;
	img.onerror=null;
}

function goBackTo(){
	try{
		window.history.go(-1);return false;
	}catch(e){
		window.location.href=document.referrer;
	}
}