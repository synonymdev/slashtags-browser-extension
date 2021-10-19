import { parse } from '@synonymdev/slashtags-url'

// eslint-disable-next-line no-unused-vars
browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('Hello from the background browser')
  console.log(request.page)
})

chrome.contextMenus.create({
  title: "Login: %s", 
  contexts:["selection"], 
  onclick: function(info) {
    console.log("Word " + info.selectionText + " was clicked.");
    chrome.windows.create({
      url: "popup.html#/account/add/" + btoa(info.selectionText),
      type: "popup",
      width: 320,
      height:500
    } , () => {

    })
  }
});

// eslint-disable-next-line no-unused-vars
chrome.runtime.onMessage.addListener(function(request, send, sendResponse) {
  if (request.uri) {
    chrome.windows.create({
      url: "popup.html#/account/add/" + btoa(request.uri),
      type: "popup",
      width: 320,
      height:500
    } , () => {

    })
    
    sendResponse(parse(request.uri))
  }
})