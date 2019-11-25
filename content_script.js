
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
		console.log("发生异常")
		// window.location.href = "about:blank";
        // window.close();
	}
});
function crawlTaobaoItem(url) {

	var taobaoItem = {
		"seller_cids": []
	};
	let login_ele = document.querySelector("#page2");
	if(login_ele){
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
	}
	//获取标题 h3.tb-main-title
	//获取商品iid

	//判定商品平台
	let platform = document.querySelector("title");
	if (platform) {
		if (platform.outerText && platform.outerText.indexOf("-淘宝网") > -1) {
			taobaoItem.userType = 'C';
		} else if (platform.outerText && platform.outerText.indexOf("-tmall.com天猫") > -1) {
			taobaoItem.userType = 'B';
		}
	}

	if (taobaoItem.userType == 'B') { //天猫

		let num_iid_null = true;
		let iid_pattern = /^\d+(\.\d+)?$/;
		num_iid_ele = document.querySelector("#LineZing");
		if (num_iid_ele) {
			taobaoItem.num_iid = num_iid_ele.getAttribute("itemid");
			taobaoItem.shopid = num_iid_ele.getAttribute("shopid");
		} else {
			num_iid_ele = document.querySelector("div[itemid]");
			if (num_iid_ele) {
				taobaoItem.num_iid = num_iid_ele.getAttribute("itemid");
				taobaoItem.shopid = num_iid_ele.getAttribute("shopid");
			}
		}
		if (iid_pattern.test(taobaoItem.num_iid)) {//是一串數字
			num_iid_null = false;
		}
		if (num_iid_null) {
			let splits = url.split("=");
			if (splits.length > 1) {
				taobaoItem.num_iid = splits[1];
				if (iid_pattern.test(taobaoItem.num_iid)) {//是一串數字
					num_iid_null = false;
				}
			}
		}


		if (!num_iid_null) {
			let title = document.querySelector("input[name='title'");
			if (title) {
				taobaoItem.title = title.getAttribute("value")
			}
		let	userId_ele = document.querySelector("meta[name='microscope-data']");
			if (userId_ele) {
				let user_contentText = userId_ele.getAttribute("content");
				if (user_contentText) {
					let user_id_pattern = /userid=\d+?;/im
					let user_id_text = user_id_pattern.exec(user_contentText);
					if (user_id_text && user_id_text.length >0) {
						taobaoItem.user_id = user_id_text[0].replace("userid=","").replace(";","")
					}
				}
			}
			//获取价格 tb-rmb-num
			let price = document.querySelector(".tm-price");
			if (price) {
				taobaoItem.price = price.outerText;//outerText
			}

			//获取促销价格
		let	promotionPrice = document.querySelector("em#J_PromoPriceNum");
			if (promotionPrice) {
				taobaoItem.mPrice = promotionPrice.outerText;//outerText
			}


		let	num = document.querySelector("#J_EmStock");
			if (num && num.outerText) {
				taobaoItem.num = num.outerText.replace("库存", "").replace("件", "");
			}


			//自定义分类 span.title[data-spm-anchor-id] .tshop-pbsm-shop-nav-ch .menu-list .menu
			let seller_cids = document.querySelector("[data-cat-id]");
			if (seller_cids) {
				taobaoItem.cids = seller_cids.getAttribute("data-cat-id");//outerText
			}

			let imgEle = document.querySelector("#J_UlThumb");
			if (imgEle) {
				let item_imgs = [];
				let imgs = imgEle.getElementsByTagName("img");
				if (imgs && imgs.length > 0) {
					for (let i = 0; i < imgs.length; i++) {
						let img = imgs[i];
						let imgUrl = img.getAttribute("src");
						item_imgs.push({ "position": i, "url": imgUrl });
					}
				}
				taobaoItem.item_imgs = JSON.stringify(item_imgs);
			}


			//卖家名字 .tb-shop-name a

			let nick = document.querySelector("input[name='seller_nickname']");
			if (nick) {
				taobaoItem.nick = nick.getAttribute("value");
			}


			//获取非销售属性 ul.attributes-list 证书编号
		let	other_prop_ele = document.querySelector(".attributes-list");
			if (other_prop_ele) {
				let other_props = other_prop_ele.getElementsByTagName("li");
				for (let i = 0; i < other_props.length; i++) {
					let prop = other_props[i];
					let prop_text = prop.outerText;
				}
			}

			//获取主图视频url
		let	video_ele = document.querySelector("video source");
			if (video_ele) {
				let video_url = video_ele.getAttribute("src");
				if (video_url && video_url.startsWith("//")) {
					taobaoItem.video_url = "http:" + video_url;
				}
			}
			var scripts = document.getElementsByTagName("script");
			if (scripts) {
				for (let i = 0; i < scripts.length; i++) {
					let script = scripts[i];
					let textContent = script.text;
					if (textContent) {
						//获取电脑详情url
						if (textContent.indexOf("dsc.taobaocdn.com") > -1) {
							pattern = new RegExp("dsc.taobaocdn.com(.*?)\"", "im");
							descUrl = pattern.exec(textContent);
							if (descUrl && descUrl.length > 0) {//天猫商品
								taobaoItem.descUrl = descUrl[0].substring(0, descUrl[0].length - 1);
							}


						} else if (textContent.indexOf("desc.alicdn.com") > -1) {

							pattern = new RegExp("desc.alicdn.com(.*?)\"", "im");
							descUrl = pattern.exec(textContent);
							if (descUrl && descUrl.length > 0) {//天猫商品
								taobaoItem.descUrl = descUrl[0].substring(0, descUrl[0].length - 1);
							}

						} else if (textContent.indexOf("\"tfsUrl\":\"") > -1) {//飞猪
							let pattern = new RegExp("\"tfsUrl\":\".*?\"", "im"); //i 大小写不敏感，m执行多行匹配
							let descUrl = pattern.exec(textContent);
							if (descUrl && descUrl.length > 0) {//淘宝商品
								taobaoItem.descUrl = descUrl[0].replace("\"tfsUrl\":\"", "").substring(0, descUrl[0].length - 1);
								if (taobaoItem.descUrl && taobaoItem.descUrl.startsWith("//")) {
									taobaoItem.descUrl = taobaoItem.descUrl.substring(2, taobaoItem.descUrl.length);
								}
							}
						} else if (textContent.indexOf("dscnew.taobao.com") > -1) {

							pattern = new RegExp("dscnew.taobao.com(.*?)\"", "im");
							descUrl = pattern.exec(textContent);
							if (descUrl && descUrl.length > 0) {//天猫商品
								taobaoItem.descUrl = descUrl[0].substring(0, descUrl[0].length - 1);
							}

						}
						if (textContent.indexOf("skuMap") > -1) {
							let skuMapStr = '';
							let pattern = new RegExp("skuMap\":(.*?),\"valLoginIndicator", "im");
							let skuMap = pattern.exec(textContent);
							if (skuMap && skuMap.length > 0) {
								skuMapStr = skuMap[0].substring(0, skuMap[0].length - 1);
							}

							if (skuMapStr) {
								if (skuMapStr.indexOf("skuMap     : ") > -1) {
									let start = skuMapStr.indexOf("{");
									let end = skuMapStr.indexOf("            ,propertyMemoMa");
									skuMapStr = skuMapStr.substring(start, end);
								}

							}
							//获取skuWebData
							let pvDataMap = new Map();
							let skuPV = document.querySelectorAll("li[data-value]");
							if (skuPV && skuPV.length > 0) {
								for (let i = 0; i < skuPV.length; i++) {
									let pv = skuPV[i];
									pvDataMap.set(pv.getAttribute("data-value"), pv.outerHTML)
								}
								if (pvDataMap.length > 0) {
									taobaoItem.pidNameMapStr = JSON.stringify(pvDataMap);
								}
							}
						}
						if (!taobaoItem.price && 'B' == taobaoItem.userType) {
							if (textContent.indexOf("defaultItemPrice") > -1) {
								let pattern = new RegExp("\"defaultItemPrice\":\"([\d\D]+)*?\"", "img");
								let pricematch = pattern.exec(textContent);
								if (pricematch && pricematch.length > 0) {
									let priceStr = pricematch[0].replace("\"defaultItemPrice\":\"", "");
									priceStr = priceStr.substring(0, priceStr.length - 2);
									pattern = new RegExp("\d+(\.\d+)?", "im");
									let prices = pattern.exec(priceStr);
									if (prices && prices.length > 0) {
										taobaoItem.price = prices[0];
									}
								}
							}
						}
					}
				}
			}
			//获取商品卖点
			let subtitleEle = document.querySelector("p.tb-subtitle");
			if (subtitleEle) {
				taobaoItem.subTitle = subtitleEle.outerText;
				if (taobaoItem.subTitle) {
					taobaoItem.subTitle = taobaoItem.subTitle.trim();
				}
			}
			//获取是否二手/代购/定制商品 tb-stuff-status 
			let subTitle = document.querySelector(".tb-stuff-status");
			if (subTitle) {
				if (subTitle.outerText == '二手') {
					taobaoItem.isSecond = true;
				} else if (subTitle.outerText == '代购') {
					taobaoItem.isGlobal = true;
				} else if (subTitle.outerText == '定制') {
					taobaoItem.isCustomerMade = true;
				}

			}


			//获取工业产品许可证 .tb-validity
			let induPermitEle = document.querySelector(".tb-validity");
			if (induPermitEle) {
				let induEles = induPermitEle.getElementsByTagName("a");
				if (induEles && induEles.length > 0) {
					for (let i = 0; i < induEles.length; i++) {
						let induEle = induEles[i];
						if (induEle && induEle.outerText && induEle.outerText.indexOf("工业产品生产许可证号") > -1) {
							let induSrc = induEle.getAttribute("src");
							if (induSrc && induSrc.indexOf("wd=")) {
								let split = induSrc.split("wd=");
								if (split && split.length > 1) {
									taobaoItem.induCerCode = split[1];
								}
							}
						}
					}
				}
			}


			chrome.runtime.sendMessage(taobaoItem,function(res){
				// window.location.href = "about:blank";
				// window.close();
			})
		}

	} else if (taobaoItem.userType == 'C') {

		//获取店铺id
		let iid_pattern = /^\d+(\.\d+)?$/;
		let num_iid_null = true;
		let shop_id_ele = document.querySelector("#J_Pine");
		if (shop_id_ele) {
			taobaoItem.shopid = shop_id_ele.getAttribute("data-shopid");//outerText
			taobaoItem.cid = shop_id_ele.getAttribute("data-catid");//outerText
			taobaoItem.num_iid = shop_id_ele.getAttribute("data-itemid");//outerText
		} else {
			num_iid_ele = document.querySelector("input[item_id_num]");
			if (num_iid_ele) {
				taobaoItem.num_iid = num_iid_ele.getAttribute("value");
			} else {
				num_iid_ele = document.querySelector("input[item_id_num]");
				if (num_iid_ele) {
					taobaoItem.num_iid = num_iid_ele.getAttribute("value");
				}
			}
		}

		if (iid_pattern.test(taobaoItem.num_iid)) {//是一串數字
			num_iid_null = false;
		}
		if (num_iid_null) {
			let splits = url.split("=");
			if (splits.length > 1) {
				taobaoItem.num_iid = splits[1];
				if (iid_pattern.test(taobaoItem.num_iid)) {//是一串數字
					num_iid_null = false;
				}
			}
		}





		if (!num_iid_null) {
			//获取标题
			let title = document.querySelector(".tb-main-title");
			if (title) {
				taobaoItem.title = title.getAttribute("data-title");//outerText
			}
			//获取userId  name="microscope-data"
			let	userId_ele = document.querySelector("meta[name='microscope-data']");
			if (userId_ele) {
				let user_contentText = userId_ele.getAttribute("content");
				if (user_contentText) {
					let user_id_pattern = /userid=\d+?;/im
					let user_id_text = user_id_pattern.exec(user_contentText);
					if (user_id_text && user_id_text.length > 0) {
						taobaoItem.user_id = user_id_text[0].replace("userid=","").replace(";","")
					}
				}
			}
			//获取淘宝价格 tb-rmb-num
			// price = document.querySelector("em.tb-rmb-num");
			// if (price) {
			// 	taobaoItem.price = price.outerText;//outerText
			// }
			//获取一口价input[name = 'current_price']
			let priceEle = document.querySelector("input[name='current_price'");
			if (priceEle) {//淘宝
				taobaoItem.price = priceEle.getAttribute("value");
			}

			//获取促销价格
			let promotionPrice = document.querySelector("em#J_PromoPriceNum");
			if (promotionPrice) {
				taobaoItem.mPrice = promotionPrice.outerText;//outerText
			}

			//获取库存 span#J_SpanStock.tb-count
			let num = document.querySelector("span#J_SpanStock.tb-count");
			if (num) {
				taobaoItem.num = num.outerText;//outerText
			}

			//自定义分类 span.title[data-spm-anchor-id] .tshop-pbsm-shop-nav-ch .menu-list .menu
			let seller_cids = document.querySelectorAll("[data-cat-id]");
			if (seller_cids && seller_cids.length > 0) {
				seller_cids.forEach(seller_cid => {
					taobaoItem.seller_cids.push(seller_cid.getAttribute("data-cat-id"));
				});
			}
			//获取主图
			let imgs = document.querySelectorAll("li[data-index] img");
			let item_imgs = [];
			if (imgs && imgs.length > 0) {
				for (let i = 0; i < imgs.length; i++) {
					let img = imgs[i];
					let imgUrl = img.getAttribute("data-src");
					item_imgs.push({ "position": i, "url": imgUrl });
				}
				taobaoItem.item_imgs = item_imgs;
			}

			//卖家名字 .tb-shop-name a
			let nick = document.querySelector(".tb-shop-name a");
			if (nick) {//淘宝
				taobaoItem.nick = nick.outerText;
			}

			//获取非销售属性 ul.attributes-list 证书编号
			let other_prop_ele = document.querySelector(".attributes-list");
			if (other_prop_ele) {
				let other_props = other_prop_ele.getElementsByTagName("li");
				for (let i = 0; i < other_props.length; i++) {
					let prop = other_props[i];
					let prop_text = prop.outerText;
				}
			}


			var scripts = document.getElementsByTagName("script");
			if (scripts) {
				for (let i = 0; i < scripts.length; i++) {
					let script = scripts[i];
					let textContent = script.text;
					if (textContent) {
						//获取电脑详情url
						if (textContent.indexOf("dsc.taobaocdn.com") > -1) {
							let pattern = new RegExp("dsc.taobaocdn.com(.*?)\' :", "im"); //i 大小写不敏感，m执行多行匹配
							let descUrl = pattern.exec(textContent);
							if (descUrl && descUrl.length > 0) {//淘宝商品
								taobaoItem.descUrl = descUrl[0].substring(0, descUrl[0].length - 3);
							}

						} else if (textContent.indexOf("desc.alicdn.com") > -1) {
							let pattern = new RegExp("desc.alicdn.com(.*?)\'", "im"); //i 大小写不敏感，m执行多行匹配
							let descUrl = pattern.exec(textContent);
							if (descUrl && descUrl.length > 0) {//淘宝商品
								taobaoItem.descUrl = descUrl[0].substring(0, descUrl[0].length - 1);
							}
						} else if (textContent.indexOf("\"tfsUrl\":\"") > -1) {//飞猪
							let pattern = new RegExp("\"tfsUrl\":\".*?\"", "im"); //i 大小写不敏感，m执行多行匹配
							let descUrl = pattern.exec(textContent);
							if (descUrl && descUrl.length > 0) {//淘宝商品
								taobaoItem.descUrl = descUrl[0].replace("\"tfsUrl\":\"", "").substring(0, descUrl[0].length - 1);
								if (taobaoItem.descUrl && taobaoItem.descUrl.startsWith("//")) {
									taobaoItem.descUrl = taobaoItem.descUrl.substring(2, taobaoItem.descUrl.length);
								}
							}
						} else if (textContent.indexOf("dscnew.taobao.com") > -1) {
							let pattern = new RegExp("dscnew.taobao.com(.*?)\'", "im"); //i 大小写不敏感，m执行多行匹配
							let descUrl = pattern.exec(textContent);
							if (descUrl && descUrl.length > 0) {//淘宝商品
								taobaoItem.descUrl = descUrl[0].substring(0, descUrl[0].length - 1);
							}
						}
						if (textContent.indexOf("skuMap") > -1) {
							let skuMapStr = '';
							let pattern = new RegExp("skuMap     : (.*?),propertyMemoMap", "im");
							let skuMap = pattern.exec(textContent);
							if (skuMap && skuMap.length > 0) {//淘宝
								skuMapStr = skuMap[0].substring(0, skuMap[0].length - 1);
							}
							if (skuMapStr) {
								if (skuMapStr.indexOf("skuMap\":") > -1) {//淘宝
									let start = skuMapStr.indexOf("{");
									let end = skuMapStr.indexOf(",\"valLoginIndicato");
									skuMapStr = skuMapStr.substring(start, end);
								}


							}
							//获取skuWebData
							let pvDataMap = new Map();
							let skuPV = document.querySelectorAll("li[data-value]");
							if (skuPV && skuPV.length > 0) {
								for (let i = 0; i < skuPV.length; i++) {
									let pv = skuPV[i];
									pvDataMap.set(pv.getAttribute("data-value"), pv.outerHTML)
								}
								if (pvDataMap.length > 0) {
									taobaoItem.pidNameMapStr = JSON.stringify(pvDataMap);
								}
							}
						}

						if (!taobaoItem.user_id) {

							if (textContent.indexOf("userid=")) {
								let user_id_pattern = /userid=\d+?;/;
								let user_id_text = user_id_pattern.exec(textContent);
								if (user_id_text && user_id_text.length > 0) {
									taobaoItem.user_id = user_id_text[0].replace("userid=","").replace(";","");
								}
							}
						}
						//获取主图视频url \"videoId\":\"\\d+?\"
						if (textContent.indexOf("videoId") > -1) {
							let vedio_pattern = /\"videoId\":\"\d+?\"/im;
							let videoText = vedio_pattern.exec(textContent);
							if (videoText && videoText.length > 0) {
								let video_id = videoText[0].replace('"videoId":',"")
								if (taobaoItem.user_id) {
									taobaoItem.video_url = "//cloud.video.taobao.com/play/u/" + taobaoItem.user_id + "/p/2/e/6/t/1/" + video_id + ".mp4";
								}
							}
						}
					}
				}
			}
			//获取商品卖点
			let subtitleEle = document.querySelector("p.tb-subtitle");
			if (subtitleEle) {
				taobaoItem.subTitle = subtitleEle.outerText;
				if (taobaoItem.subTitle) {
					taobaoItem.subTitle = taobaoItem.subTitle.trim();
				}
			}
			//获取是否二手/代购/定制商品 tb-stuff-status 
			let subTitle = document.querySelector(".tb-stuff-status");
			if (subTitle) {
				if (subTitle.outerText == '二手') {
					taobaoItem.isSecond = true;
				} else if (subTitle.outerText == '代购') {
					taobaoItem.isGlobal = true;
				} else if (subTitle.outerText == '定制') {
					taobaoItem.isCustomerMade = true;
				}

			}


			//获取工业产品许可证 .tb-validity
			let induPermitEle = document.querySelector(".tb-validity");
			if (induPermitEle) {
				let induEles = induPermitEle.getElementsByTagName("a");
				if (induEles && induEles.length > 0) {
					for (let i = 0; i < induEles.length; i++) {
						let induEle = induEles[i];
						if (induEle && induEle.outerText && induEle.outerText.indexOf("工业产品生产许可证号") > -1) {
							let induSrc = induEle.getAttribute("src");
							if (induSrc && induSrc.indexOf("q=")) {
								let split = induSrc.split("q=");
								if (split && split.length > 1) {
									taobaoItem.induCerCode = split[1];
								}
							}
						}
					}
				}
			}


			chrome.runtime.sendMessage(taobaoItem,function(res){
				// window.location.href = "about:blank";
        // window.close();
			})
		}



	}



}
