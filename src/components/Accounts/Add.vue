<template>
  <div class="card">
    <h1>Login Request</h1>
    <p>Do you wabnt to login to:</p>
    <div class="row">
      <div class="column">
      <img :src="account.payload.image">
      </div>
      <div class="column">
        Tag: {{account.payload.title}}

        {{account.payload}}
      </div>
    </div>
    <div class="footer">
      <button v-on:click="signIn">sign</button>
    <button v-on:click="addAccount(account.payload);">Allow</button>
    <button v-on:click="closeWindow">Cancel</button>
    </div>
  </div>
</template>

<script>
import { parse } from '@synonymdev/slashtags-url'
import { createAuth } from '@synonymdev/slashtags-auth';
import { secp256k1 as curve } from 'noise-curve-tiny-secp';
import { mapActions } from 'vuex'
import bint from 'bint8array';

export default {
  name: 'Accounts',
  props: ['tag'],
  mounted () {
    console.log("Router", parse(atob(this.$route.params.tag)))
  }, 
  methods: {
    ...mapActions([
        'addAccount'
    ]),
    closeWindow: function () {		
			window.close();	
    },
    signIn: async function() {
      var reqPayload = parse(atob(this.$route.params.tag));
      var username = "John Carvalho"
      var userKeyPair = curve.generateSeedKeyPair(username);
      console.log("uaer", userKeyPair);
      const { initiator } = createAuth(userKeyPair, {
        metadata: {
          name: username,
          image: 'www.example.com/image.png',
        },
      });
      
      var authPayload = reqPayload.payload;

      const { attestation, verifyResponder } = initiator.respond(
        bint.fromString(authPayload.pubKey, 'hex'),
        bint.fromString(authPayload.challenge, 'hex'),
      );

      const url = new URL(authPayload.cbURL);
      const res = await fetch(url.toString(), {
        method: 'POST',
        body: JSON.stringify({
          attestation: Buffer.from(attestation).toString('hex'),
        }),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      });
      const { responderAttestation } = await res.json();

      const { responderPK, metadata } = verifyResponder(
        Buffer.from(responderAttestation, 'hex'),
      );
      
      console.log("initiator", initiator, attestation, verifyResponder,responderPK, metadata)
    }
  },
  computed: {
    account: function() {
      return parse(atob(this.$route.params.tag))
    },
    tagData() {
        return "test"
    }
  }
}
</script>

<style scoped>

.card {

}
.column {
  float: left;
}

.left {
  width: 25%;
}

.right {
  width: 75%;
}

.row img {
  width:40px;
}
.row {
  background:#2b2b2b;
  
}

.row:after {
  content: "";
  display: table;
  clear: both;
}

.footer {
  clear:both;
}

p {
  opacity: 0.4;
  font-size: 20px;
}
</style>
