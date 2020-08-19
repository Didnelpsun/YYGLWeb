<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  @import url('common/css/index.css');
  @import url('common/css/element.css');
  #app {
    height: 100%;
  }
</style>
