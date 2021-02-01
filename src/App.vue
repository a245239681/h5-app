<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  destroyed() {
    window.onbeforeunload = function() {
      window.localStorage.clear()
    }
    // window.addEventListener('beforeunload', () => {
    //   localStorage.clear()
    // })
  },
}
</script>

<style lang="less"></style>
