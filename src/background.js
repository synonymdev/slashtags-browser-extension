// eslint-disable-next-line no-unused-vars
browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request.page)
})

chrome.contextMenus.create({
  title: "Login: %s", 
  contexts:["selection"], 
  onclick: function(info) {
    console.log("Word " + info.selectionText + " was clicked.");
    chrome.windows.create({
      url: "popup.html#/account/link/" + btoa(info.selectionText),
      type: "popup",
      width: 300,
      height:300
    } , () => {

    })
  }
});

// eslint-disable-next-line no-unused-vars
chrome.runtime.onMessage.addListener(function(request, send, sendResponse) {
  if (request.uri) {
    chrome.windows.create({
      url: "popup.html#/account/link/" + btoa(request.uri),
      type: "popup",
      width: 300,
      height:300
    } , () => {

    })
    //console.log("Uri",request.uri.replace("slash","slashtags"))
    //sendResponse(parse(request.uri.replace("slash","slashtags")))
  }
})