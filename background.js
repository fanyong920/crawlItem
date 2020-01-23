//https://blog.it2048.cn/article-puppeteer-speed-up/ 优化puppeteer
//http://www.sanfenzui.com/pyppeteer-install-chrome-extensions-and-test.html 命令行插件
chrome.tabs.onCreated.addListener(function(tab){
	chrome.windows.getCurrent(function(currentWindow){
		if(currentWindow.state != "minimized"){
			chrome.windows.update(tab.windowId, {"state":"minimized"});
		}
	})
	
})
chrome.runtime.onMessage.addListener(function(message,send,response){
var param ={
	"content":message
}
$.ajax({
  url: "http://localhost:8089/getUrl",
  type: "POST",
  data: message,
  contentType:"application/x-www-form-urlencoded; charset=UTF-8",
  complete:function(XMLHttpRequest, textStatus){
	  var tab = new Array(1);
	  tab[0] = send.tab.id;
	  chrome.tabs.remove(tab);
  }
})
})
