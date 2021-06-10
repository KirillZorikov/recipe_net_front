<template>
  <div class="container mt-3">
    <div class="wrapper">
      <div class="row">
        <div class="col-12">
          <div class="d-flex justify-content-between align-items-center p-3">
            <span><h1 class="d-inline">Избранное</h1> <span v-show="loading" class="spinner-border ms-4"></span></span>
            <FilterTags/>
          </div>
          <div v-if="!loading && !recipes.length" class="d-flex justify-content-center mt-5">
            <p class="p-3 fs-3">Ваш список избранного пуст!</p>
          </div>
        </div>
      </div>
      <Loading v-if="loading" class="loading_message"/>
      <template v-else>
        <div class="row p-3">
          <template v-for="recipe in recipes" :key="recipe">
            <RecipeCard :recipe="recipe" :show_full="false" @recipe-deleted="loadData"/>
          </template>
        </div>
        <div v-if="recipes.length" class="d-flex justify-content-center mb-5">
          <Paginator :total="totalPages"/>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import RecipeCard from "../components/RecipeCard";
import {loadRecipesMixin, initUrlParamsMixin, watchPageMixin, computedPageMixin} from "../mixins"
import Paginator from "../components/Paginator";
import FilterTags from "../components/FilterTags";
import Loading from "../components/Loading";
import {FavoritesUserService} from "../services/user.services";

export default {
  name: 'Favorites',
  mixins: [loadRecipesMixin, initUrlParamsMixin, watchPageMixin, computedPageMixin],
  components: {Loading, FilterTags, RecipeCard, Paginator},
  data() {
    return {
      loading: false,
      totalPages: 1
    }
  },
  created() {
    this.initUrlParams(this.page, this.filtering);
    this.loadData();
  },
  methods: {
    loadData() {
      this.loadListRecipes(FavoritesUserService.getListFavoritesRecipes);
    },
    makeParams() {
      return {
        page: this.page,
        tags: this.filtering.toString()
      };
    }
  }
}
</script>

<style scoped>

</style>