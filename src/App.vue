<template>
  <div id="app">
      <Navbar v-if="$route.name !== 'Login' && $route.name !== 'Registro' && $route.name !== 'Cliente' "/>
    <router-view/>
  </div>
</template>

<script>

import Navbar from '@/components/Navbar.vue'

export default {
  name: 'app',
  components:{
    Navbar,
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');

body{
  background: -webkit-linear-gradient(left, #25c481, #25b7c4);
  background: linear-gradient(to right, #25c481, #25b7c4);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
