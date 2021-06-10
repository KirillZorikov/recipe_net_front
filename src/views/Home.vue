<template>
  <div class="container mt-3">
    <div class="wrapper">
      <div class="row">
        <div class="col-12">
          <div class="d-flex justify-content-between align-items-center p-3">
            <span><h1 class="d-inline">Рецепты</h1> <span v-show="loading" class="spinner-border ms-4"></span></span>
            <FilterTags/>
          </div>
        </div>
      </div>

      <div v-if="message && showMessage" class="row mt-1 mb-1 d-flex justify-content-center">
        <div class="alert alert-success d-flex align-items-center" style="width: fit-content;" role="alert">
          {{ message }}
          <button type="button" class="ml-1 p-0 ms-2 btn bg-transparent shadow-none" @click="deleteMessage"
                  data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true" class="fs-3">&times;</span>
          </button>
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

export default {
  name: 'Home',
  mixins: [loadRecipesMixin, initUrlParamsMixin, watchPageMixin, computedPageMixin],
  components: {Loading, FilterTags, RecipeCard, Paginator},
  props: [
    'message'
  ],
  data() {
    return {
      loading: false,
      showMessage: true,
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
    },
    deleteMessage() {
      this.showMessage = false;
    }
  }
}
</script>

<style scoped>

</style>