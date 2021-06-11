<template v-if="recipe">
  <i class="fas fa-trash icon-image icon-image-red" style="top: 10px;"
     data-bs-toggle="modal" :data-bs-target="'#modal' + recipe.slug"></i>

  <!-- Modal -->
  <div class="modal fade" :id="'modal' + recipe.slug" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Удаление</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Вы точно хотите удалить этот рецепт?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="deleteRecipe">Удалить</button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal -->

  <router-link :to="{name: 'UpdateRecipe', params: {slug: recipe.slug}}">
    <i class="fas fa-pencil-alt icon-image icon-image-blue" style="top: 40px;"></i>
  </router-link>
</template>

<script>
import {RecipeUserService} from "../services/user.services";

export default {
  name: "ImageButtons",
  emits: ['recipe-deleted'],
  props: ['recipe'],
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    deleteRecipe() {
      RecipeUserService.deleteRecipe(this.recipe.slug).then(
          () => {
            this.$emit('recipe-deleted')
          }
      )
    }
  }
}
</script>

<style scoped>

</style>