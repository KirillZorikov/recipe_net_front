<template v-if="recipe">
  <div v-if="!show_full" class="col-card ps-3 pe-3 pb-3">
    <div class="card h-100">
      <router-link :to="{name: 'Recipe', params: {slug: recipe.slug}}">
        <img :src="recipe.image" class="card-img-top rounded-3">
      </router-link>
      <div class="card-body d-flex justify-content-between flex-column">
        <h5 class="card-title">
          <router-link :to="{name: 'Recipe', params: {slug: recipe.slug}}" class="text-dark text-decoration-none">
            {{ recipe.title }}
          </router-link>
        </h5>
        <div class="d-flex justify-content-start align-items-center">
          <template v-for="tag in recipe.tags" :key="tag">
            <router-link :to="{name: 'Home', query: {tag: tag.slug}}"
                         class="p-3 pt-1 pb-1 me-2 text-decoration-none" :class="
            { 'tag-green': tag.slug === 'obed',
              'tag-red': tag.slug === 'zavtrak',
              'tag-purple': tag.slug === 'uzhin'
            }">
              {{ tag.title }}
            </router-link>
          </template>
        </div>
        <span>
          <p class="card-text text-secondary mb-0 mt-2"><i class="far fa-clock"></i> {{ recipe.time }} мин.</p>
          <router-link :to="{name: 'Author', params: {username: recipe.author.username}}"
                       class="card-text text-secondary mb-2 text-decoration-none"><i class="far fa-user"></i>
            {{ recipe.author.name ? recipe.author.name : recipe.author.username }}
          </router-link>
        </span>
        <div class="d-flex justify-content-between align-items-center">
          <button v-if="in_purchase" type="button" class="button button-transparent d-flex align-items-center"
                  @click="actionPurchase('delete')">
            <i class="fas fa-check me-2"></i>Рецепт добавлен
          </button>
          <button v-else type="button" class="button button-light-blue d-flex align-items-center"
                  @click="actionPurchase('add')">
            <i class="fas fa-plus me-2"></i>Добавить в покупки
          </button>
          <span @click="actionFavorites('delete')" v-if="in_favorites" class="star">&#9733;</span>
          <span @click="actionFavorites('add')" v-else class="star">&#9734;</span>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="card border-0 mb-3">
      <div class="row g-0">
        <div class="col-md-5 ps-1">
          <img :src="recipe.image" class="recipe-img">
        </div>
        <div class="col-md-7 ps-4">
          <div class="card-body pt-0">
            <span class="d-flex justify-content-between">
              <h1 class="card-title d-inline">{{ recipe.title }}</h1>
              <span @click="actionFavorites('delete')" v-if="in_favorites" class="star">&#9733;</span>
              <span @click="actionFavorites('add')" v-else class="star">&#9734;</span>
            </span>
            <div class="d-flex justify-content-start align-items-center">
              <template v-for="tag in recipe.tags" :key="tag">
                <router-link :to="{name: 'Home', query: {tag: tag.slug}}"
                             class="p-3 pt-1 pb-1 me-2 text-decoration-none" :class="
                { 'tag-green': tag.slug === 'obed',
                  'tag-red': tag.slug === 'zavtrak',
                  'tag-purple': tag.slug === 'uzhin'
                }">
                  {{ tag.title }}
                </router-link>
              </template>
            </div>
            <p class="card-text mb-0 mt-3 font-light"><i class="far fa-clock"></i> {{ recipe.time }} мин.</p>
            <span>
              <router-link :to="{name: 'Author', params: {username: recipe.author.username}}"
                           class="card-text mb-2 d-inline me-3 font-light text-dark"><i class="far fa-user"></i>
                {{ recipe.author.name ? recipe.author.name : recipe.author.username }}
              </router-link>
              <a class="text-dark font-light" href="#">Редактировать рецепт</a>
            </span>
            <span class="d-flex align-items-start mt-4">
              <button v-if="in_purchase" type="button" class="button button-blue d-flex align-items-center"
                      @click="actionPurchase('delete')">
                <i class="fas fa-check me-2"></i>Рецепт добавлен
              </button>
              <button v-else type="button" class="button button-blue d-flex align-items-center"
                      @click="actionPurchase('add')">
                <i class="fas fa-plus me-2"></i>Добавить в покупки
              </button>
              <template v-if="currentUser && currentUser.username !== recipe.author.username">
                <button v-if="!do_follow" type="button" class="button button-light-blue d-flex align-items-center ms-2"
                        @click="actionFollow('add')">
                  <i class="fas fa-pen me-2"></i>Подписаться на автора
                </button>
                <button v-else type="button" class="button button-light-blue d-flex align-items-center ms-2"
                        @click="actionFollow('delete')">
                  <i class="far fa-times-circle me-2"></i>Отписаться от автора
                </button>
              </template>
            </span>
            <h3 class="mt-4 mb-3">Ингридиенты:</h3>
            <template v-for="ingredient in recipe.ingredients" :key="ingredient">
              <p class="mb-0">{{ ingredient.title }} - {{ ingredient.quantity }} {{ ingredient.unit }}.</p>
            </template>
            <h3 class="mt-5 mb-3">Описание:</h3>
            <p class="card-text">{{ recipe.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {FavoritesUserService} from "../services/user.services";
import {FollowService} from "../services/user.services";
import {PurchasesUserService} from "../services/user.services";

export default {
  name: "RecipeCard",
  emits: ['recipe-deleted'],
  props: ['recipe', 'show_full'],
  data() {
    return {
      in_favorites: this.recipe.in_favorites,
      do_follow: this.recipe.do_follow,
      in_purchase: this.recipe.in_purchase,
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    actionFavorites(action) {
      if (!this.currentUser) {
        this.$router.push({name: 'Login'});
        return
      }
      let func = action === 'add' ? FavoritesUserService.addToFavorites : FavoritesUserService.deleteFromFavorites
      func(this.recipe.slug).then(
          () => {
            this.in_favorites = !this.in_favorites
          })
    },
    actionFollow(action) {
      if (!this.currentUser) {
        this.$router.push({name: 'Login'});
        return
      }
      let func = action === 'add' ? FollowService.addFollow : FollowService.deleteFollow
      func(this.recipe.author.username).then(
          () => {
            this.do_follow = !this.do_follow
          })
    },
    actionPurchase(action) {
      if (!this.currentUser) {
        this.$router.push({name: 'Login'});
        return
      }
      let func = action === 'add' ? PurchasesUserService.addToPurchases : PurchasesUserService.deleteFromPurchases
      func(this.recipe.slug).then(
          () => {
            this.in_purchase = !this.in_purchase
          })
    },
  }
}
</script>

<style scoped>
</style>