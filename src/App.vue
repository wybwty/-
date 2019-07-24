<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
$margin: 100;
$padding: 100;
body {
  margin: $margin;
  padding: $padding;
}
</style>
