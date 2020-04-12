
chrome.runtime.onMessage.addListener(function(message, sender,sendResponse) {
	if(message === "getContent"){
		let content = crawlTaobaoItem();
		sendResponse({content:content})
	}
})
function crawlTaobaoItem() {
	let retVal = '';
	if(document.doctype){
		retVal = new XMLSerializer().serializeToString(document.doctype);
	}
	if(document.documentElement){
		retVal += document.documentElement.outerHTML;
	}
	return retVal;
}
