var bitcoin = require("bitcoinjs-lib");
var bip39 = require("bip39");

class Keychain {
  constructor(config = {}) {

    config.network = config.network && Object.keys(bitcoin.networks).includes(config.network) ? config.network : "bitcoin"

    this._store = {}
    this._store.publicKeys = []
    this._network = bitcoin.networks[config.network]
    this._coinType = config.network == "bitcoin" ? 0 : 1;
    this._derivationRoot = `m/84'/${this._coinType}'/0'`
    if (config.mnemonic) {
      if (bip39.validateMnemonic(config.mnemonic)) {
        this._mnemonic = config.mnemonic
      } else {
        throw "Invalid Mnemonic"
      }
    } else {
      this._mnemonic = bip39.generateMnemonic()
    }
    this._seed = bip39.mnemonicToSeedSync(this.mnemonic)
    this._node = bitcoin.bip32.fromSeed(this._seed)
  }

  getPublicKey(index = 0, change = 0) {
    return this._node.derivePath(this._derivationRoot).derive(index).derive(change).publicKey
  }

  getKeypair(index = 0, change = 0) {
    var keypair = this._node.derivePath(this._derivationRoot).derive(index).derive(change)
    return {
      secretKey: keypair.privateKey,
      publicKey: keypair.publicKey
    }
  }
}

module.exports = {
  Keychain
}