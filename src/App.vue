<template>
<!--  <div class="fs-1">-->
<!--    <i v-if="!checkout" @click="changeColor" class="far fa-circle"></i>-->
<!--    <i v-else @click="changeColor" class="fas fa-check-circle text-primary"></i>-->
<!--    <i class="far fa-clock"></i>-->
<!--    <i class="far fa-user"></i>-->
<!--  </div>-->
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
