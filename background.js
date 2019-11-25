// chrome.runtime.onInstalled.addListener(function() {
//   chrome.storage.sync.set({color: '#3aa757'}, function() {
//     console.log('The color is green.');
//   });
//   chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//     chrome.declarativeContent.onPageChanged.addRules([{
//       conditions: [new chrome.declarativeContent.PageStateMatcher({
//         pageUrl: {hostEquals: 'http://*.*.*/*'},
//       })
//       ],
//           actions: [new chrome.declarativeContent.ShowPageAction()]
//     }]);
//   });

  chrome.runtime.onMessage.addListener(function(message ,send,response){
    console.log(message)
    $.ajax({
      url: "http://localhost:8089/getUrl",
      type: "POST",
      data: message,
      crossDomain: true, 
      xhrFields: {          //携带cookie
        withCredentials: false
    },
      contentType:"application/x-www-form-urlencoded; charset=UTF-8",
      complete:function(xhr,status){
        response({"isDone":true})
      }
    })
  })
// });
