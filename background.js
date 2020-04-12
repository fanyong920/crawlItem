

var reqUrl = 'http://localhost:8080/content';
var isClosePage = false;
var isCrawl = false;
var isBlockMedia = false;

chrome.storage.sync.get(['isCrawl', 'isClose', 'reqUrl','blockMedia'], function (result) {
	console.log("settting is get  ", result);
	if (result.isCrawl == true) {
		isCrawl = true;
		console.log("isCrawl", isCrawl);
		if (result.reqUrl) {
			reqUrl = result.reqUrl;
			console.log("reqUrl", reqUrl);
		}
	}
	if (result.isClose == true) {
		isClosePage = true;
		console.log("isClosePage", isClosePage);
	}
	if (result.blockMedia == true) {
		isBlockMedia = true;
		console.log("isBlockMedia", isClosePage);
	}
});

chrome.webNavigation.onCompleted.addListener(function (details) {
	console.log(details)
	if (details.frameId == 0 && details.parentFrameId === -1) {
		if (isCrawl) {
			chrome.tabs.sendMessage(details.tabId, "getContent", null, (result) => {
				var param = { "content": result.content };
				sendContent(reqUrl, param, details.tabId);
			})
		}
		if (isClosePage) {
			var tab = new Array(1);
			tab[0] = details.tabId;
			chrome.tabs.remove(tab);
		}
	}

})

chrome.webRequest.onBeforeRequest.addListener(
	function (details) {
		return { cancel: true };
	},
	{
		urls: ["*://*/*"],
		types: ["font", "image", "media"]
	},
	["blocking"]);

/**
 * 自动关闭设置
 * @param {!boolean} checked 
 */
function autoCloseSet(checked) {
	if (checked == true) {
		isClosePage = true
	} else {
		isClosePage = false;
	}
}

/**
 * 设置后台接受参数的接口
 * @param {String} url 
 */
function reqUrlSet(url) {
	reqUrl = url;
}

/**
 * 是否爬取页面
 * @param {boolean} checked 
 */
function isCrawlPage(checked) {
	isCrawl = checked;
}

/**
 * 是否不显示图片设置
 * @param {boolean} checked 
 */
function blockMediaSet(checked) {
	isBlockMedia = checked;
}
/**
 * 
 * @param {String} url request url
 * @param {String} param page content 
 * @param {*} sender 
 */
function sendContent(url, param, tabId) {
	var xmlhttp = null;
	if (window.XMLHttpRequest) {// code for all new browsers
		xmlhttp = new XMLHttpRequest();
	} else if (window.ActiveXObject) {// code for IE5 and IE6
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	if (xmlhttp != null) {
		xmlhttp.open("POST", url, true);
		xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
		let querySring = getQueryString(param);
		xmlhttp.send(querySring);
	} else {
		console.log("Your browser does not support XMLHTTP.");
	}
}

/**
 * 
 * @param {any} paramObj 
 */
function getQueryString(paramObj) {
	if (typeof paramObj == 'object') {
		let keys = Object.keys(paramObj);
		let querySring = '';
		for (let i = 0; i < keys.length; i++) {
			let key = keys[i];
			if (i == 0) {
				//encodeURIComponent(key) + '=' + encodeURIComponent(val)
				querySring = encodeURIComponent(key) + '=' + encodeURIComponent(paramObj[key]);
			} else {
				querySring = '&' + encodeURIComponent(key) + '=' + encodeURIComponent(paramObj[key]);
			}
		}
		return querySring;
	} else if (typeof paramObj === 'string') {
		return paramObj;
	} else {
		return null;
	}

}