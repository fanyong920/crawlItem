该插件适用chrome,360,搜狐等浏览器
## 起源
起初是想写一个爬取淘淘宝天猫商品的插件，现在这个插件抓取所有网站的整个网页内容。由于抓取的是整个网页内容，你得到整个网页内容后需要自己解析所需要的信息。下面是这个插件的使用步骤：

**1.下载该项目到本地电脑，解压，得到crawlItem文件夹**

**2.打开chrome浏览器，在地址栏直接输入chrome://extensions/ 打开扩展程序页面**
**<br/>或者点击界面右上角三点->更多工具->扩展程序也可实现同样的效果**

**3.在打开的页面右上点击开发者模式按钮，打开开发者模式**

**4.点击加载已解压的扩展程序，选择刚才的crwalItem文件夹，安装谷歌插件，稍等片刻，就能看到页面多了一个插件，如果安装的插件没有自动打开，请点击插件右下角的按钮，打开插件，同时在浏览器右上角也多了一个图标**
**5.点击图标，看到有两个选项，根据所需打开相关选项。**



```java
打开爬取页面功能：勾选该复选框，才会向后台接口发送页面内容，同时接收数据接口出现
自动关闭页面：勾选该复选框，爬取页面完成后，页面自动关闭。
接收数据接口：接收页面数据的接口，需要自己定义，默认http://localhost:8080/content,与 打开爬取页面功能 联动
```
接收数据接口样例：
```java
package com.molikam.shop.controller;


import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class CrawlerController {
	
	AtomicInteger count = new AtomicInteger(0);
	@RequestMapping(value="/content",method={RequestMethod.POST})
	public void getContent(String content){
		
		System.out.println(count.incrementAndGet());
		System.out.println(content);
		
	}
}

```
当您打开网页爬取功能，并且定义好接收数据接口，此时，您可以随意打开一个网页，如果顺利的话，接口会打印出网页的内容。
已经发布到谷歌商店，可搜索下载
！[image.png] （https://i.loli.net/2020/04/10/6yxNbqOljRBdk94.png）
链接：[点我](https://chrome.google.com/webstore/detail/chromecrawl/pcadbaceejnkfhkoomcbdifcpfefkmbl?authuser=0&hl=zh-CN)
