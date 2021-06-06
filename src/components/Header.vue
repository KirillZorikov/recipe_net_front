<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="wrapper">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
              aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto my-2 my-lg-0">
            <li class="nav-item li-nav">
              <a class="nav-link active-link text-dark p-0 m-2 mt-1" aria-current="page" href="#">Рецепты</a>
            </li>
            <li class="nav-item li-nav">
              <a class="nav-link text-dark" href="#">Мои подписки</a>
            </li>
            <li class="nav-item li-nav">
              <a class="nav-link text-dark" href="#">Создать рецепт</a>
            </li>
            <li class="nav-item li-nav">
              <a class="nav-link text-dark" href="#">Избранное</a>
            </li>
            <li class="nav-item li-nav">
              <a class="nav-link text-dark" href="#">Список покупок</a>
            </li>
          </ul>
          <template v-if="currentUser">
              <a class="nav-link text-dark" href="#" tabindex="-1" aria-disabled="true">Войти</a>
              <a class="nav-link text-dark" href="#" tabindex="-1" aria-disabled="true">Создать аккаунт</a>
          </template>
          <template v-else>
              <a class="nav-link text-dark" href="#" tabindex="-1" aria-disabled="true">Изменить пароль</a>
              <a class="nav-link text-dark" href="#" tabindex="-1" aria-disabled="true">Выход</a>
          </template>
        </div>
      </div>
    </div>
  </nav>

</template>

<script>
export default {
  name: "Nav",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
}
</script>

<style scoped>
.active-link{
  color: royalblue !important;
  border-bottom: 3px solid royalblue;
  padding-bottom: 5px;
}
.li-nav{
  width: fit-content;
}

</style>