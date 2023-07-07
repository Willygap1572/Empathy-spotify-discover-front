<template>
  <div id="app">
    <HomePage/>
  </div>
</template>

<script>
import HomePage from './components/HomePage.vue';
export default {
  components: {
    HomePage
  },
  name: 'App'
};
</script>

<style>
#app {
  text-align: center;
  padding: 20px;
}

.router-link-exact-active {
  font-weight: bold;
}
</style>
