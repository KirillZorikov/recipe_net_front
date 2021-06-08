import {RecipeUserService} from "../services/user.services";

export default {
  methods: {
    loadListRecipes(preferredFunc, param) {
      if (this.$route.name !== this.$options.name || this.loading) {
        return
      }
      let func = preferredFunc? preferredFunc: RecipeUserService.getListRecipes;
      this.loading = true;
      func(this.makeParams(), param).then(
          response => {
            this.loading = false;
            this.$store.commit('changeRecipes', response.data.response);
            this.totalPages = response.data['pages_count'];
          },
          error => {
            this.loading = false;
            if (error.response.status === 404) {
              this.$router.push({name: '404'})
            }
          }
      );
    }
  }
}