
/**
点击popup.html先检查配置
*/

window.onload = function () {

	document.getElementById('todo-01').addEventListener('click', function () {
		let todo01 = document.getElementById("todo-01");
		let div01 = document.getElementById("div-01");
		if (todo01.checked) {
			var bg = chrome.extension.getBackgroundPage();
			bg.isCrawlPage(true);
			div01.style.display = "inline";
			chrome.storage.sync.set({ isCrawl: true }, function () {
				console.log("isCrawl is set to ", true)
			})
		} else {
			var bg = chrome.extension.getBackgroundPage();
			bg.isCrawlPage(false);
			div01.style.display = "none";
			chrome.storage.sync.set({ isCrawl: false }, function () {
				console.log("isCrawl is set to ", false)
			})
		}
	});


	document.getElementById('todo-02').addEventListener('click', function () {
		let todo02 = document.getElementById("todo-02");
		if (todo02.checked) {
			var bg = chrome.extension.getBackgroundPage();
			bg.autoCloseSet(true);
			chrome.storage.sync.set({ isClose: true }, function () {
				console.log("isClose is set to ", true);
			});

		} else {
			var bg = chrome.extension.getBackgroundPage();
			bg.autoCloseSet(false);

			chrome.storage.sync.set({ isClose: false }, function () {
				console.log("isClose is set to ", false);
			});
		}
	});



	document.getElementById('todo-03').addEventListener('blur', function () {
		let todo03 = document.getElementById("todo-03");
		//在返回的对象上调用background.js 里面的函数
		var bg = chrome.extension.getBackgroundPage();
		bg.reqUrlSet(todo03.value);

		chrome.storage.sync.set({ reqUrl: todo03.value }, function () {
			console.log("reqUrl is set to ", todo03.value);
		});
	});

	document.getElementById('todo-04').addEventListener('click', function () {
		let todo04 = document.getElementById("todo-04");
		if (todo04.checked) {
			var bg = chrome.extension.getBackgroundPage();
			bg.blockMediaSet(true);
			chrome.storage.sync.set({ blockMedia: true }, function () {
				console.log("blockMedia is set to ", true);
			});

		} else {
			var bg = chrome.extension.getBackgroundPage();
			bg.blockMediaSet(false);
			chrome.storage.sync.set({ blockMedia: false }, function () {
				console.log("blockMedia is set to ", false);
			});
		}
	});

	chrome.storage.sync.get(['isCrawl', 'isClose', 'reqUrl','blockMedia'], function (result) {
		console.log("settting is get  ", result);
		if (result.isCrawl == true) {
			let todo01 = document.getElementById('todo-01');
			todo01.checked = true;
			let div01 = document.getElementById('div-01');
			div01.style.display = "inline"
			if (result.reqUrl) {
				let todo03 = document.getElementById("todo-03");
				todo03.value = result.reqUrl;
			}
			//在返回的对象上调用background.js 里面的函数
		}
		if (result.isClose == true) {
			let todo02 = document.getElementById('todo-02');
			todo02.checked = true;
		}
		if (result.blockMedia == true) {
			let todo04 = document.getElementById('todo-04');
			todo04.checked = true;
		}
	});

}












