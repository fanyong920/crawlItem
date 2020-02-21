/* chrome.tabs.onCreated.addListener(function(tab){
	chrome.windows.getCurrent(function(currentWindow){
		if(currentWindow.state != "minimized"){
			chrome.windows.update(tab.windowId, {"state":"minimized"});
		}
	})
	
}) */

/* chrome.windows.onCreated.addListener(function (currentWindow){
	console.log("浏览器启动了");
	if(currentWindow.state != "minimized"){
			chrome.windows.update(tab.windowId, {"state":"minimized"});
		}
}) */

var reqUrl = 'http://localhost:8080/content';
var isClosePage = false;
var isCrawl = false;


chrome.storage.sync.get(['isCrawl','isClose','reqUrl'],function(result){
	console.log("settting is get  ",result);
	if(result.isCrawl == true){
		isCrawl = true;
		console.log("isCrawl",isCrawl);
		if(result.reqUrl){
			reqUrl = result.reqUrl;
			console.log("reqUrl",reqUrl);
		}
	}
	if(result.isClose == true){
		isClosePage = true;
		console.log("isClosePage",isClosePage);
	}	
});

/* let isCrawlStorage = localStorage.getItem("isCrawl");
if(isCrawlStorage == "true"){
			isCrawl = true;
			console.log("isCrawl",isCrawl);
			let reqUrlStorage = localStorage.getItem("reqUrl");
			
		if(reqUrlStorage){
				reqUrl = reqUrlStorage;
				console.log("reqUrl",reqUrl);
			}
		//再在返回的对象上调用background.js 里面的函数
	
		}
		
		let isCloseStorage = localStorage.getItem("isClose");
		if(isCloseStorage == "true"){
			isClosePage = true;
			console.log("isClosePage",isClosePage);
		} */

chrome.runtime.onMessage.addListener(function(message,sender,response){
if(isCrawl){
	var param ={
		"content":message
	}
	//jquery
	/* $.ajax({
	  url: reqUrl,
	  type: "POST",
	  data: param,
	  contentType:"application/x-www-form-urlencoded; charset=UTF-8",
	  complete:function(XMLHttpRequest, textStatus){
		  if(isClosePage){
			var tab = new Array(1);
			tab[0] = send.tab.id;
			chrome.tabs.remove(tab);
		  }
		}
	}); */
	sendContent(reqUrl,param,sender);
}
})

function autoCloseSet(checked){
	if(checked == true){
		isClosePage = true
	}else{
		isClosePage = false;
	}
}

function reqUrlSet(url){
	reqUrl = url;
}

function isCrawlPage(checked){
	isCrawl = checked;
}

 
function sendContent(url,param,sender){
	var xmlhttp = null;
	if (window.XMLHttpRequest){// code for all new browsers
		xmlhttp = new XMLHttpRequest();
	}else if (window.ActiveXObject){// code for IE5 and IE6
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	if (xmlhttp != null){
		 xmlhttp.addEventListener('loadend', e => {
			if(isClosePage){
				var tab = new Array(1);
				tab[0] = sender.tab.id;
				chrome.tabs.remove(tab);
				chrome.windows.create({"url":"https://www.baidu.com/","focused":false,"type":"detached_panel"});
			}
		});
		xmlhttp.onreadystatechange = state_Change(xmlhttp);
		xmlhttp.open("POST",url,true);
		xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");
		let querySring = getQueryString(param);
		xmlhttp.send(querySring);
	}else{
		console.log("Your browser does not support XMLHTTP.");
	}
}

function state_Change(xmlhttp){
	if (xmlhttp.readyState == 4){// 4 = "loaded"
		
	}
}
function getQueryString(paramObj){
	if( typeof paramObj == 'object'){
		let keys = Object.keys(paramObj); 
		let querySring = '';
		for(let i = 0;i < keys.length;i++){
			let key = keys[i];
			if(i == 0){
				//encodeURIComponent(key) + '=' + encodeURIComponent(val)
				querySring = encodeURIComponent(key) + '=' + encodeURIComponent(paramObj[key]);
			}else{
				querySring = '&' + encodeURIComponent(key) + '=' + encodeURIComponent(paramObj[key]);
			}
		}
		return querySring;
	}else if(typeof paramObj === 'string'){
		return paramObj;
	}else{
		return null;
	}
	
}