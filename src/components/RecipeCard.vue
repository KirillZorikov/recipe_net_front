<template v-if="recipe">
  <div v-if="!show_full" class="col-card ps-3 pe-3 pb-3">
    <div class="card h-100">
      <img :src="recipe.image" class="card-img-top">
      <div class="card-body d-flex justify-content-between flex-column">
        <h5 class="card-title">{{ recipe.title }}</h5>
        <div class="d-flex justify-content-start align-items-center">
          <template v-for="tag in recipe.tags" :key="tag">
            <span class="p-3 pt-1 pb-1 me-2" :class="
            { 'tag-green': tag.slug === 'obed',
              'tag-red': tag.slug === 'zavtrak',
              'tag-purple': tag.slug === 'uzhin'
            }">
              {{ tag.title }}
            </span>
          </template>
        </div>
        <span>
          <p class="card-text text-secondary mb-0 mt-2"><i class="far fa-clock"></i> {{ recipe.time }} мин.</p>
          <p class="card-text text-secondary mb-2"><i class="far fa-user"></i>
            {{ recipe.author.name ? recipe.author.name : recipe.author.username }}
          </p>
        </span>
        <div class="d-flex justify-content-between align-items-center">
          <button v-if="in_purchase" type="button" class="button button-transparent d-flex align-items-center">
            <i class="fas fa-check me-2"></i>Рецепт добавлен
          </button>
          <button v-else type="button" class="button button-light-blue d-flex align-items-center">
            <i class="fas fa-plus me-2"></i>Добавить в покупки
          </button>
          <span v-if="in_favorites" class="star">&#9733;</span>
          <span v-else class="star">&#9734;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

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
}
</script>

<style scoped>
</style>