<template>
  <div id="app">
    <default-layout>
      <media-table />
    </default-layout>
  </div>
</template>

<script>
import DefaultLayout from "./layout/DefaultLayout";
import MediaTable from "./components/MediaTable";

export default {
  name: "App",
  components: {
    DefaultLayout,
    MediaTable
  }
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
