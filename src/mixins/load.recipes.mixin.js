import {RecipeUserService} from "../services/user.services";

export default {
  methods: {
    loadListRecipes() {
      if (this.$route.name !== this.$options.name) {
        return
      }
      this.loading = true;
      RecipeUserService.getListRecipes(this.makeParams()).then(
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