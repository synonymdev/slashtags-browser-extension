document.addEventListener('DOMContentLoaded', () => {    
document.body.addEventListener('click', async (e) => {
    const element = e.target
    switch (element.tagName) {
        case "PRE":
            var href = element.innerText
            if (href) {
                chrome.runtime.sendMessage({uri: href}, function(response) {
                    console.log("Response: ", response);
                    console.log("Response: ", response.payload.title, response.payload.image);
                });
            }
            break;
        default:
            if (!element || !element.closest) return
                var uri = element.closest('[href^="slashtags:"]')
                if (uri) {
                    e.preventDefault() // prevent invoking protocol handler 
                    const href = uri.getAttribute('href')
                    chrome.runtime.sendMessage({uri: href}, function(response) {
                        console.log("Response: ", response);
                        console.log("Response: ", response.payload.title, response.payload.image);
                    });
                }
    }        
    })
})