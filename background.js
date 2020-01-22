
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
