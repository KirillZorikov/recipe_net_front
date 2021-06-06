<template>
  <footer class="mt-auto text-light bg-dark">
    <div class="wrapper">
      <div class="d-flex justify-content-between align-items-center">
        <span class="m-3 ms-lg-5">
          <router-link :to="{name: 'Home'}" class="text-light btn bg-transparent shadow-none">
            Продуктовый помощник
          </router-link>
        </span>
        <span class="m-3 me-lg-5">
          <router-link :to="{name: 'About'}" class="text-light btn bg-transparent shadow-none">
            Об авторе
          </router-link>
          <router-link :to="{name: 'Tech'}" class="text-light ms-4 btn bg-transparent shadow-none">
            Технологии
          </router-link>
        </span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>
</style>