<template>
  <div id="app">
    <div id="nav">
      <span class="text">abcd</span>
    </div>
    <router-view/>
  </div>
</template>
<script>
  export default {}
  document.addEventListener('DOMContentLoaded', () => {
    let fontSize = window.innerWidth / 10
    fontSize = fontSize > 50 ? 50 : fontSize
    const html = document.querySelector('html')
    html.style.fontSize = fontSize + 'px'
  })
</script>
<style lang="scss">
  @import "./assets/styles/global";
  .text {
    font-family: 'Days One';
    font-size: px2rem(20);
    color:orange;
  }
</style>
