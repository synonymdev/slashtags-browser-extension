const providerManager = () => `
class InjectedProvider {
  constructor (asset) {
    this.asset = asset
  }

  setClient () {}

  getMethod (method) {
    return (...args) => window.providerManager.proxy('CAL_REQUEST', {
      asset: this.asset,
      method,
      args
    })
  }
}

class ProviderManager {
  constructor () {
    this.cache = {}
  }

  proxy (type, data) {
    return new Promise((resolve, reject) => {
      const id = Date.now() + '.' + Math.random()

      window.addEventListener(id, ({ detail }) => {
        const response = JSON.parse(detail)
        if (response.error) reject(new Error(response.error))
        else resolve(response.result)
      }, {
        once: true,
        passive: true
      })
      console.log("Calling Post Message", id, type, data)
      window.postMessage({
        id,
        type,
        data
      }, '*')
    })
  }

  getProviderFor (asset) {
    if (this.cache[asset]) return this.cache[asset]

    this.cache[asset] = new InjectedProvider(asset)

    return this.cache[asset]
  }

  enable () {
    return this.proxy('ENABLE_REQUEST')
  }
}
console.log("Adding provider 2")
// eslint-disable-next-line no-unused-vars
window.providerManager = new ProviderManager()`

const slashtagsUriHandler = () => `
document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', async (e) => {
      const element = e.target
      if (!element || !element.closest) return
      const uri = element.closest('[href^="slashtags:"]')
        
      if (uri) {
        e.preventDefault() // prevent invoking protocol handler 
        console.log('Slashtags URI detected')
        console.log("URI", uri)
        const href = uri.getAttribute('href')
        //window.providerManager.proxy('HANDLE_SLASHTAG_URI', { uri: href })
        chrome.runtime.sendMessage({text: "hey"}, function(response) {
          console.log("Response: ", response);
        });
        // await window.providerManager.enable()
        //const href = uri.getAttribute('href')
/*        const includesAmount = href.includes('value=') || href.includes('amount=')
        if (includesAmount) {
          e.preventDefault()
          await window.providerManager.enable()
          window.providerManager.proxy('HANDLE_PAYMENT_URI', { uri: href })
        }
      */
    }
    })
})`

export { providerManager, slashtagsUriHandler }