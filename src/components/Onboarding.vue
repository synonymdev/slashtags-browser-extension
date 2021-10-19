<template>
  <div>
    <h1>OnBoarding</h1>
    <p>{{ defaultText }}</p>
  </div>
</template>

<script>
export default {
  name: 'OnBoarding',
  mounted () {
    browser.runtime.sendMessage({})
  },
  computed: {
    defaultText () {
      return browser.i18n.getMessage('accountsNone')
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
