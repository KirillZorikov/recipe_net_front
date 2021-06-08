<template>
  <Loading v-if="loading" class="loading_message"/>
  <div v-else class="wrapper mt-5">
    <RecipeCard :recipe="recipe" :show_full="true" @recipe-deleted="router.push({name: 'Home'})"/>
  </div>
</template>

<script>
import {RecipeUserService} from '../services/user.services';
import RecipeCard from "../components/RecipeCard";
import Loading from "../components/Loading";
export default {
  name: "Recipe",
  components: {Loading, RecipeCard},
  props: ['slug'],
  data() {
    return {
      recipe: '',
      loading: false
    }
  },
  created() {
    this.loadRecipe();
  },
  methods: {
    loadRecipe() {
      this.loading = true;
      RecipeUserService.getRecipe(this.slug).then(
          response => {
            this.recipe = response.data;
            this.loading = false;
          },
          error => {
            this.loading = false;
            if (error.response.status === 404) {
              this.$router.push({name: '404'})
            }
          }
      )
    }
  }
}
</script>

<style scoped>

</style>