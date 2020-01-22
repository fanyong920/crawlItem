
$(function () {
	var url;
	url = document.URL;
	try {
		if ((url.indexOf("taobao.com") > -1 || url.indexOf("tmall.com") > -1) && url.indexOf("login.taobao.com") == -1 ) {
			crawlTaobaoItem(url);
		}else if(url.indexOf("login.taobao.com") >-1 || url.indexOf("login.tmall.com") >-1){//淘宝登录
			//J_Quick2Static
			// let switch_ele = document.querySelector("#J_Quick2Static");
			// if(switch_ele){
				// switch_ele.onclick();
				let	username_ele = document.querySelector("input#TPL_username_1");
				let	password_ele = document.querySelector("input#TPL_password_1");
				let	J_SubmitStatic = document.querySelector("button#J_SubmitStatic");
				if(username_ele && password_ele &&J_SubmitStatic){
					username_ele.value = "你的用户名";
					password_ele.value= "你的密码" ;
					let wait_time = 2000;
					try {
						wait_time = parseInt(Math.random()*(3000-1000+1)+1000,10)
					} catch (error) {
						wait_time
					}
					setTimeout("J_SubmitStatic.click()",wait_time)
				}
			// }
		}
	} catch (error) {
		console.log("发生异常");
		console.log(error)
		// window.location.href = "about:blank";
        // window.close();
	}
});


function crawlTaobaoItem(url) {
		
		let retVal = '';
		if(document.doctype){
		 	retVal = new XMLSerializer().serializeToString(document.doctype);
		}
		
		if(document.documentElement){
			retVal += document.documentElement.outerHTML;
		}
		//内容脚本不能使用tabs权限
		//console.log("chrome.tabs.id",chrome.windows);
		chrome.runtime.sendMessage(retVal);


}

