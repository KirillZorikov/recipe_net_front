<template>
  <Header/>
  <router-view/>
  <Footer/>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: 'App',
  components: {Header, Footer},
}
</script>

<style>
@import "assets/style.css";
#app{
  font-family: 'Montserrat', sans-serif;
}
</style>
