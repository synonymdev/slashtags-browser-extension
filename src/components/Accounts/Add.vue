<template>
<v-card
    class="mx-auto"
    max-width="344"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">
          Login
        </div>
        <v-list-item-title class="text-h5 mb-1">
          {{account.payload.title}}
        </v-list-item-title>
        <v-list-item-subtitle>{{account.payload.pubKey}}</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="80"
        color="grey"
      >
      <img :src="account.payload.image">
      </v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn v-on:click="closeWindow"
        outlined
        rounded
        text
      >
        Cancel
      </v-btn>
      <v-btn v-on:click="addAccount(account.payload)"
        outlined
        rounded
        text
      >
        Add
      </v-btn>
      <v-btn v-on:click="signIn"
        outlined
        rounded
        text
      >
        Login
      </v-btn>
    </v-card-actions>
  </v-card>
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

p {
  opacity: 0.4;
  font-size: 20px;
}
</style>
