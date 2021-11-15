// eslint-disable-next-line no-unused-vars

/*
browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request.page)
})
*/

chrome.contextMenus.create({
  title: "Login: %s", 
  contexts:["selection"], 
  onclick: function(info) {
    chrome.windows.create({
      url: "popup.html#/account/link/" + btoa(info.selectionText),
      type: "popup",
      width: 375,
      height: 610,

    } , () => {

    })
  }
});

// eslint-disable-next-line no-unused-vars
chrome.runtime.onMessage.addListener(function(request, send, sendResponse) {
  if (request.uri) {
    chrome.windows.create({
      url: "popup.html#/account/link/" + encodeURIComponent(btoa(request.uri)),
      type: "popup",
      width: 375,
      height: 640
    } , () => {

    })
    //console.log("Uri",request.uri.replace("slash","slashtags"))
    //sendResponse(parse(request.uri.replace("slash","slashtags")))
  }
})