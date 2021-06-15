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
              <router-link :to="{name: 'Home'}" class="nav-link text-dark"
                           :class="{'active-link p-0 m-2 mt-1': ['Home', 'Recipe', 'Author'].includes(currentRouteName)}">
                Рецепты
              </router-link>
            </li>
            <li class="nav-item li-nav">
              <router-link :to="{name: 'Follow'}" class="nav-link text-dark"
                           :class="{'active-link p-0 m-2 mt-1': currentRouteName === 'Follow'}">
                Мои подписки
              </router-link>
            </li>
            <li class="nav-item li-nav">
              <router-link :to="{name: 'AddRecipe'}" class="nav-link text-dark"
                           :class="{'active-link p-0 m-2 mt-1': currentRouteName === 'AddRecipe'}">
                Создать рецепт
              </router-link>
            </li>
            <li class="nav-item li-nav">
              <router-link :to="{name: 'Favorites'}" class="nav-link text-dark"
                           :class="{'active-link p-0 m-2 mt-1': currentRouteName === 'Favorites'}">
                Избранное
              </router-link>
            </li>
            <li class="nav-item li-nav">
              <router-link :to="{name: 'ShopList'}" class="nav-link text-dark"
                           :class="{'active-link p-0 m-2 mt-1': currentRouteName === 'ShopList'}">
                Список покупок<span v-if="currentUser" class="badge rounded-pill bg-primary ms-2 mb-1">{{
                  purchasesCount
                }}</span>
              </router-link>
            </li>
          </ul>
          <template v-if="!currentUser">
            <router-link :to="{name: 'Login'}" class="nav-link text-dark">Войти</router-link>
            <router-link :to="{name: 'Register'}">
              <button class="button button-blue" href="#" tabindex="-1" aria-disabled="true">Создать аккаунт</button>
            </router-link>
          </template>
          <template v-else>
            <router-link :to="{name: 'ChangePassword'}" class="nav-link text-dark">Изменить пароль</router-link>
            <router-link :to="{name: 'Logout'}" class="nav-link text-dark">Выход</router-link>
          </template>
        </div>
      </div>
    </div>
  </nav>

</template>

<script>
import {MiscService} from "../services/user.services";

export default {
  name: "Nav",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    purchasesCount() {
      return this.$store.state.purchasesCount;
    },
    currentRouteName() {
      return this.$route.name;
    }
  },
  created() {
    this.loadPurchasesCount();
  },
  methods: {
    loadPurchasesCount() {
      if (!this.currentUser) {
        return
      }
      MiscService.getPurchasesCount().then(
          response => {
            this.$store.commit('changePurchasesCount', response.data['purchases_count']);
          }
      )
    }
  },
  watch: {
    $route(to, from) {
      if (from.name === 'Login' && to.name === 'Home') {
        this.loadPurchasesCount();
      }
    },
  }
}
</script>

<style scoped>
.active-link {
  color: royalblue !important;
  border-bottom: 3px solid royalblue;
}

.li-nav {
  width: fit-content;
}

</style>