<template>
  <div class="container mt-3">
    <div class="wrapper">
      <div class="row">
        <div class="col-12">
          <div class="d-flex justify-content-between align-items-center p-3">
            <span><h1 class="d-inline">Рецепты</h1> <span v-show="loading" class="spinner-border ms-4"></span></span>
            <FilterTags/>
            <!--            <span class="fs-6 d-flex flex-row">-->
            <!--          <div class="d-flex align-items-center">-->
            <!--            <i class="fas fa-check-circle color-red fs-4 me-2"></i> Завтрак-->
            <!--          </div>-->
            <!--          <div class="d-flex align-items-center">-->
            <!--            <i class="far fa-circle color-green fs-4 ms-3 me-2"></i> Обед-->
            <!--          </div>-->
            <!--          <div class="d-flex align-items-center">-->
            <!--            <i class="far fa-circle color-purple fs-4 ms-3 me-2"></i> Ужин-->
            <!--          </div>-->
            <!--        </span>-->
          </div>
        </div>
      </div>
      <div class="row p-3">
        <template v-for="recipe in recipes" :key="recipe">
          <RecipeCard :recipe="recipe" :show_full="false" @recipe-deleted="loadListRecipes()"/>
        </template>
      </div>
      <div class="d-flex justify-content-center mb-5">
        <Paginator :total="totalPages"/>
      </div>
    </div>
  </div>
</template>

<script>
import RecipeCard from "../components/RecipeCard";
import {loadRecipesMixin, initUrlParamsMixin, watchPageMixin, computedPageMixin} from "../mixins"
import Paginator from "../components/Paginator";
import FilterTags from "../components/FilterTags";

export default {
  name: 'Home',
  mixins: [loadRecipesMixin, initUrlParamsMixin, watchPageMixin, computedPageMixin],
  components: {FilterTags, RecipeCard, Paginator},
  props: [
    'message'
  ],
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
      this.loadListRecipes();
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