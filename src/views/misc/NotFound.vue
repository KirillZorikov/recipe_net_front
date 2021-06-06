<template>
  <main role="main" class="container">
    <div class="row">
      <div class="col-md-12">
        <h1>Ошибка 404</h1>
        <p class="lead">Страница <code>{{ from_url }}</code> не найдена</p>
        <p class="lead"><router-link :to="{name: 'Home'}">Вернуться на главную</router-link></p>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "NotFound",
  title: '404',
  props: [
      'from_url'
  ]
}
</script>

<style scoped>

</style>