<template>
  <div class="home">
    <div id="read">
        <span class="icon-bookmark"></span>
        <span class="icon-clock"></span>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Epub from 'epubjs'
global.ePub = Epub
export default {
  name: 'home'
}
</script>
