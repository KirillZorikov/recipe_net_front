<template v-if="follow">
  <div class="col-card d-flex justify-content-between flex-column ps-3 pe-3 pb-3">
    <div class="card h-100d-flex justify-content-between flex-column ps-3 pe-3 pb-3" style="border-radius: 3%;">
      <h5 class="card-title mt-4 mb-5 fs-3">
        <router-link :to="{name: 'Author', params: {username: follow.username}}" class="text-dark text-decoration-none">
          {{ follow.name ? follow.name : follow.username }}
        </router-link>
      </h5>
      <template v-if="showingRecipes.length">
        <template v-for="recipe in showingRecipes" :key="recipe">
      <span class="d-flex justify-content-between">
        <span>
          <router-link :to="{name: 'Recipe', params: {slug: recipe.slug}}"
                       class="card-text text-dark text-decoration-none mb-1">
            {{ recipe.title }}
          </router-link>
          <p class="card-text mb-1 mt-2 font-light"><i class="far fa-clock"></i> {{ recipe.time }} мин.</p>
        </span>
        <img :src="changePath(recipe.image)" class="thumbnail">
      </span>
          <hr v-if="follow.recipes.length > 1">
        </template>
      </template>
      <template v-else>
        <p class="card-text fs-5">У этого автора нет рецептов!</p>
      </template>
      <router-link :to="{name: 'Author', params: {username: follow.username}}" v-if="leftRecipesCount"
                   class="text-decoration-none">
        Еще {{ leftRecipesCount }} рецепт{{ wordEnd }}...
      </router-link>
      <span class="d-flex justify-content-center mt-4">
        <button type="button" @click="removeFollow"
                class="button button-light-blue button-follow justify-content-center d-flex align-items-center">
          Отписаться
        </button>
      </span>
    </div>
  </div>
</template>

<script>
import {FollowService} from "../services/user.services";
import {constants} from "../constants";

export default {
  name: "FollowCard",
  emits: ['follow-deleted'],
  props: ['follow'],

  RECIPES_FOR_SHOW: 3,

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showingRecipes() {
      return this.follow.recipes.slice(0, this.$options.RECIPES_FOR_SHOW);
    },
    leftRecipesCount() {
      let count = this.follow.recipes.length - this.$options.RECIPES_FOR_SHOW;
      return count > 0 ? count : 0;
    },
    wordEnd() {
      let result = '';
      let count = this.leftRecipesCount.toString();
      if (count.endsWith('11') || count.endsWith('12') || count.endsWith('13') || count.endsWith('14')) {
        result = 'ов';
      } else if (count.endsWith('1')) {
        result = '';
      } else if (count.endsWith('2') || count.endsWith('3') || count.endsWith('4')) {
        result = 'a';
      } else {
        result = 'ов';
      }
      return result;
    }
  },
  methods: {
    removeFollow() {
      FollowService.deleteFollow(this.follow.username).then(
          () => {
            this.$emit('follow-deleted');
          })
    },
    changePath(url) {
      let search = 'media/'
      return constants.MEDIA_DIR_URL + url.slice(url.indexOf(search) + search.length);
    }
  }
}
</script>

<style scoped>

</style>