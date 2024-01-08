<script setup lang="ts">
</script>

<template>
  <div class="container">
    <aside class="aside-left"></aside>
    <main class="app-main"></main>
    <aside class="aside-right"></aside>
  </div>
</template>

<style  lang="scss">
#app {
  background-color: #77c7f0;
}

.container {
  min-width: 800px;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-wrap: nowrap;
  background: {
    image: url("/bg.png");
    position: center center;
    repeat: no-repeat;
    size: 350px;
  }


  .aside-left,
  .aside-right
  {
    flex-grow: 0;
    width: 30vw;
    max-width: 350px;
    height: 100%;
  }
  .app-main {
    flex-grow: 1;
    min-width: 400px;
  }
}


@media screen and (max-width: 1000px) {
  .container {
    .aside-right,
    .aside-left {
      min-width: 150px;
      max-width: 200px;
      transition: all ease .1s;
    }
  }
}
</style>
